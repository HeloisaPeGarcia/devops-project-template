const autocannon = require('autocannon');
const { fork } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

const serverPath = path.join(__dirname, '..', 'index.js');
const readmePath = path.join(__dirname, '..', 'README.md');
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;

const SKIP_SERVER_START = process.env.SKIP_SERVER_START === 'true';
let serverProcess = null;

if (!SKIP_SERVER_START) {
  console.log('Iniciando o servidor da API para teste de carga...');
  serverProcess = fork(serverPath, [], { silent: true });

  serverProcess.stderr.on('data', (data) => {
    console.error(`[Server Error]: ${data}`);
  });
} else {
  console.log('Pulando início do servidor local (conectando ao alvo externo)...');
}

// Função para formatar bytes
function formatThroughput(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB/s`;
  }
  return `${(bytes / 1024).toFixed(2)} KB/s`;
}

// Função para verificar se a API está online antes de rodar o teste
function waitForServer(url, timeoutMs, callback) {
  const start = Date.now();
  const interval = setInterval(() => {
    http
      .get(`${url}/health`, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          callback(null);
        }
      })
      .on('error', () => {
        if (Date.now() - start > timeoutMs) {
          clearInterval(interval);
          callback(new Error('Servidor não ficou online a tempo.'));
        }
      });
  }, 250);
}

waitForServer(URL, 15000, (err) => {
  if (err) {
    console.error(err.message);
    if (serverProcess) serverProcess.kill();
    process.exit(1);
  }

  console.log('API está online! Iniciando o teste de carga com Autocannon...');

  autocannon(
    {
      url: `${URL}/health`,
      connections: 10,
      pipelining: 1,
      duration: 5
    },
    (err, result) => {
      // Encerrar o servidor se criado localmente
      if (serverProcess) serverProcess.kill();

      if (err) {
        console.error('Erro durante o teste de carga:', err);
        process.exit(1);
      }

      console.log('Teste de carga concluído. Processando métricas...');

      const totalReqs = result.requests.total || 0;
      const durationSec = result.duration || 5;
      const reqsPerSec = result.requests.average || totalReqs / durationSec;
      const throughput = result.throughput.average || 0;
      const errors = result.errors || 0;
      const timeouts = result.timeouts || 0;
      const non2xx = result.non2xx || 0;
      const unsuccessful = errors + timeouts + non2xx;
      const successRate =
        totalReqs > 0 ? (((totalReqs - unsuccessful) / totalReqs) * 100).toFixed(1) : '0.0';

      const latMin = result.latency.min || 0;
      const latMax = result.latency.max || 0;
      const latAvg = result.latency.average || 0;
      const lat50 = result.latency.p50 || 0;
      const lat90 = result.latency.p90 || 0;
      const lat99 = result.latency.p99 || 0;

      const testTime = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

      let markdownReport = '<!-- START_LOAD_TEST_RESULTS -->\n';
      markdownReport += '### ⚡ Relatório de Teste de Carga Automático\n\n';
      markdownReport += `Executado em: \`${testTime}\` | Alvo: \`${URL}/health\` | Conexões: \`10\` | Duração: \`${durationSec}s\`\n\n`;

      markdownReport += '#### 📊 Resumo Métricas Principais\n';
      markdownReport += '| Métrica | Valor |\n';
      markdownReport += '| :--- | :--- |\n';
      markdownReport += `| **Requisições Totais** | ${totalReqs.toLocaleString()} |\n`;
      markdownReport += `| **Média de Requisições / Seg** | ${reqsPerSec.toFixed(1)} req/s |\n`;
      markdownReport += `| **Taxa de Transferência (Throughput)** | ${formatThroughput(throughput)} |\n`;
      markdownReport += `| **Sucesso (Status 2xx)** | \`${successRate}%\` |\n`;
      markdownReport += `| **Erros / Timeouts / Não-2xx** | ${errors} / ${timeouts} / ${non2xx} |\n\n`;

      markdownReport += '#### ⏱️ Latência (Milissegundos)\n';
      markdownReport += '| Mínimo | Média | Mediana (p50) | p90 | p99 | Máximo |\n';
      markdownReport += '| :--- | :--- | :--- | :--- | :--- | :--- |\n';
      markdownReport += `| ${latMin} ms | ${latAvg.toFixed(1)} ms | ${lat50} ms | ${lat90} ms | ${lat99} ms | ${latMax} ms |\n\n`;

      markdownReport +=
        '*Nota: Os dados acima são coletados dinamicamente executando o autocannon na pipeline.* \n';
      markdownReport += '<!-- END_LOAD_TEST_RESULTS -->';

      console.log('Atualizando README.md com os resultados...');
      if (!fs.existsSync(readmePath)) {
        console.error(`README.md não encontrado em: ${readmePath}`);
        process.exit(1);
      }

      let readmeContent = fs.readFileSync(readmePath, 'utf8');
      const startMarker = '<!-- START_LOAD_TEST_RESULTS -->';
      const endMarker = '<!-- END_LOAD_TEST_RESULTS -->';

      const startIndex = readmeContent.indexOf(startMarker);
      const endIndex = readmeContent.indexOf(endMarker);

      if (startIndex === -1 || endIndex === -1) {
        console.warn(
          'Marcadores de teste de carga não encontrados. Anexando ao final do README.md.'
        );
        readmeContent += `\n\n${markdownReport}`;
      } else {
        readmeContent =
          readmeContent.substring(0, startIndex) +
          markdownReport +
          readmeContent.substring(endIndex + endMarker.length);
      }

      fs.writeFileSync(readmePath, readmeContent, 'utf8');
      console.log('README.md atualizado com sucesso com os resultados do teste de carga!');
    }
  );
});

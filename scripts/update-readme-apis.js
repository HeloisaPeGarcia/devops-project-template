const fs = require('fs');
const path = require('path');

const swaggerPath = path.join(__dirname, '..', 'src', 'swagger.json');
const readmePath = path.join(__dirname, '..', 'README.md');

try {
  console.log('Lendo especificações do Swagger...');
  if (!fs.existsSync(swaggerPath)) {
    throw new Error(`Arquivo swagger.json não encontrado em: ${swaggerPath}`);
  }

  const swaggerData = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
  const paths = swaggerData.paths || {};

  let markdownTable = '<!-- START_API_LIST -->\n';
  markdownTable += '### 📋 Endpoints da API Detectados via Swagger\n\n';
  markdownTable +=
    'Abaixo estão listadas as rotas da API identificadas automaticamente a partir das especificações do OpenAPI/Swagger:\n\n';
  markdownTable += '| Método | Endpoint | Resumo | Descrição |\n';
  markdownTable += '| :--- | :--- | :--- | :--- |\n';

  let hasPaths = false;
  for (const [route, methods] of Object.entries(paths)) {
    for (const [method, details] of Object.entries(methods)) {
      hasPaths = true;
      const methodUpper = method.toUpperCase();
      let badge = '';
      if (methodUpper === 'GET') badge = '`GET`';
      else if (methodUpper === 'POST') badge = '`POST`';
      else if (methodUpper === 'PUT') badge = '`PUT`';
      else if (methodUpper === 'DELETE') badge = '`DELETE`';
      else badge = `\`${methodUpper}\``;

      const summary = details.summary || '-';
      const description = details.description || '-';

      markdownTable += `| **${badge}** | \`${route}\` | ${summary} | ${description} |\n`;
    }
  }

  if (!hasPaths) {
    markdownTable += '| - | - | Nenhum endpoint cadastrado | - |\n';
  }

  markdownTable += '\n<!-- END_API_LIST -->';

  console.log('Atualizando o README.md...');
  if (!fs.existsSync(readmePath)) {
    throw new Error(`README.md não encontrado em: ${readmePath}`);
  }

  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  const startMarker = '<!-- START_API_LIST -->';
  const endMarker = '<!-- END_API_LIST -->';

  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    console.warn(
      'ATENÇÃO: Marcadores de API list (<!-- START_API_LIST --> e <!-- END_API_LIST -->) não encontrados no README.md. Anexando ao final do arquivo.'
    );
    readmeContent += `\n\n${markdownTable}`;
  } else {
    readmeContent =
      readmeContent.substring(0, startIndex) +
      markdownTable +
      readmeContent.substring(endIndex + endMarker.length);
  }

  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log('README.md atualizado com sucesso com os endpoints da API!');
} catch (error) {
  console.error('Erro ao atualizar README.md com APIs do Swagger:', error);
  process.exit(1);
}

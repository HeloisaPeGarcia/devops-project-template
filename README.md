# Meu Projeto DevOps Moderno

![CI](https://github.com/user/repo/actions/workflow/ci.yml/badge.svg)
![CD](https://github.com/user/repo/actions/workflow/cd.yml/badge.svg)

Um projeto com arquitetura de ponta a ponta focada em boas práticas de DevOps, integração contínua (CI), entrega contínua (CD) e Infraestrutura como Código (IaC).

## 🚀 Sobre o Projeto

Este repositório não é apenas um código-fonte, mas sim um ecossistema completo. Ele demonstra o uso de pipelines automatizados para testes de segurança, build de imagens Docker e deploy em ambientes provisionados via IaC (Terraform/Pulumi).

## 📋 Pré-requisitos

Para rodar este projeto localmente, você vai precisar de:
* [Docker](https://www.docker.com/get-started) e Docker Compose instalados.
* [Git](https://git-scm.com/)

## 🛠️ Como executar localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/meu-projeto.git
cd meu-projeto
```

2. Suba o ambiente utilizando Docker Compose:
```bash
docker-compose up --build
```
A aplicação estará disponível em `http://localhost:3000`.

## 🏗️ Arquitetura DevOps

### Branching Strategy
Utilizamos uma estratégia baseada em:
* `main`: Branch protegida, refletindo o ambiente de produção.
* `develop`: Branch de integração principal.
* `feature/*`: Branches dedicadas para desenvolvimento de novas funcionalidades.
**Regras de proteção:** Pull Requests exigem revisão de código e aprovação na pipeline de CI antes do merge.

### CI/CD Pipelines (GitHub Actions)
* **CI (Continuous Integration)**: Disparado em PRs e pushes. Realiza o build da imagem Docker, roda testes automatizados e executa análises de segurança utilizando `Trivy`.
* **CD (Continuous Deployment)**: Disparado no push para a branch `main`. Publica a imagem no GitHub Container Registry (GHCR) e realiza o deploy no Kubernetes nos ambientes de `staging` e, mediante aprovação manual, `production`.

### Infraestrutura como Código (IaC)
A pasta `/infra` é reservada para automação de infraestrutura. Utilizamos ferramentas como Terraform para garantir a reprodutibilidade do ambiente na nuvem.

## 📖 Documentação da API

<!-- START_API_LIST -->
### 📋 Endpoints da API Detectados via Swagger

Abaixo estão listadas as rotas da API identificadas automaticamente a partir das especificações do OpenAPI/Swagger:

| Método | Endpoint | Resumo | Descrição |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/` | Página Inicial | Retorna informações básicas do status da API. |
| **`GET`** | `/health` | Verificação de Saúde (Health Check) | Retorna o status atual do serviço para monitoramento. |

<!-- END_API_LIST -->

## ⚡ Testes de Performance & Carga

Uma etapa automatizada realiza testes de carga na aplicação, registrando métricas de tempo de resposta e vazão diretamente abaixo:

<!-- START_LOAD_TEST_RESULTS -->
### ⚡ Relatório de Teste de Carga Automático

Executado em: `2026-07-01 13:38:35 UTC` | Alvo: `http://localhost:3000/health` | Conexões: `10` | Duração: `6.01s`

#### 📊 Resumo Métricas Principais
| Métrica | Valor |
| :--- | :--- |
| **Requisições Totais** | 114.711 |
| **Média de Requisições / Seg** | 19120.0 req/s |
| **Taxa de Transferência (Throughput)** | 5.61 MB/s |
| **Sucesso (Status 2xx)** | `100.0%` |
| **Erros / Timeouts / Não-2xx** | 0 / 0 / 0 |

#### ⏱️ Latência (Milissegundos)
| Mínimo | Média | Mediana (p50) | p90 | p99 | Máximo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 ms | 0.1 ms | 0 ms | 0 ms | 1 ms | 9 ms |

*Nota: Os dados acima são coletados dinamicamente executando o autocannon na pipeline.* 
<!-- END_LOAD_TEST_RESULTS -->

## 📂 Estrutura de Diretórios

```text
meu-projeto/
├── .github/
│   ├── workflows/        # Pipelines do GitHub Actions
│   └── CODEOWNERS        # Definição de donos dos códigos para revisões
├── infra/                # Scripts de IaC (Terraform / Pulumi)
├── src/                  # Código-fonte da aplicação
├── tests/                # Testes unitários e de integração
├── Dockerfile            # Receita da imagem Docker
└── docker-compose.yml    # Orquestração local de containers
```

## 🛡️ Boas Práticas e Segurança

- **Ambientes Isolados:** Credentials e secrets são geridos de forma separada no GitHub para `staging` e `production`.
- **Dependabot:** Habilitado para manter as dependências do projeto atualizadas automaticamente de forma contínua.
- **Cache Otimizado:** Uso de actions/cache nas pipelines para agilizar os builds em até 70%.

---
Feito com 💻 e ☕.

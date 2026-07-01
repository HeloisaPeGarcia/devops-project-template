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
* **CI (Continuous Integration)**: Disparado em PRs e pushes. Realiza o build da imagem Docker multi-stage segura, roda testes automatizados unitários e de integração (Jest), valida o estilo do código (ESLint/Prettier) e atualiza a documentação.
* **E2E Validation com Kubernetes**: A pipeline levanta um cluster efêmero usando o **KinD (Kubernetes in Docker)**, faz o deploy dos manifestos reais no runner do GitHub Actions e dispara testes de carga ponta a ponta contra os pods em execução, atestando a integridade da infraestrutura.

### Infraestrutura como Código (IaC) e Orquestração
A pasta `/infra` contém configurações reais e prontas para ambiente Enterprise:
* **Terraform (`/infra/terraform`)**: Módulos para provisionamento de infraestrutura na AWS (VPC, ECS).
* **Kubernetes (`/infra/k8s`)**: Manifestos declarativos profissionais contendo Deployment, Service, HorizontalPodAutoscaler (HPA) e Ingress.

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

Executado em: `2026-07-01 13:46:06 UTC` | Alvo: `http://localhost:3000/health` | Conexões: `10` | Duração: `5.01s`

#### 📊 Resumo Métricas Principais
| Métrica | Valor |
| :--- | :--- |
| **Requisições Totais** | 5,219 |
| **Média de Requisições / Seg** | 1043.8 req/s |
| **Taxa de Transferência (Throughput)** | 316.86 KB/s |
| **Sucesso (Status 2xx)** | `100.0%` |
| **Erros / Timeouts / Não-2xx** | 0 / 0 / 0 |

#### ⏱️ Latência (Milissegundos)
| Mínimo | Média | Mediana (p50) | p90 | p99 | Máximo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 ms | 9.1 ms | 4 ms | 32 ms | 65 ms | 83 ms |

*Nota: Os dados acima são coletados dinamicamente executando o autocannon na pipeline.* 
<!-- END_LOAD_TEST_RESULTS -->

## 📂 Estrutura de Diretórios

```text
meu-projeto/
├── .github/workflows/    # Pipelines automatizados do GitHub Actions (CI/CD, auto-pr)
├── infra/                # Infraestrutura como Código
│   ├── k8s/              # Manifestos do Kubernetes (Deployment, Service, HPA, Ingress)
│   └── terraform/        # Scripts Terraform para provisionamento em nuvem
├── scripts/              # Scripts de automação (Load Test, Atualização do Readme)
├── src/                  # Código-fonte da API Express e especificações Swagger
├── tests/                # Suítes de testes unitários e de integração (Jest)
├── Dockerfile            # Imagem Docker otimizada multi-stage (Non-Root User)
└── package.json          # Dependências, scripts (lint, test, start) e configurações
```

## 🛡️ Boas Práticas e Segurança

- **Ambientes Isolados:** Credentials e secrets são geridos de forma separada no GitHub para `staging` e `production`.
- **Dependabot:** Habilitado para manter as dependências do projeto atualizadas automaticamente de forma contínua.
- **Cache Otimizado:** Uso de actions/cache nas pipelines para agilizar os builds em até 70%.

---
Feito com 💻 e ☕.

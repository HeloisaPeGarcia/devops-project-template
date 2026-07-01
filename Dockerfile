# Estágio 1: Build & Dependências de Produção
FROM node:20.15.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Estágio 2: Execução em Produção
FROM node:20.15.0-alpine
WORKDIR /app

# Copiar dependências instaladas e o código fonte
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Usar usuário não-root nativo da imagem Node.js (Alpine) por segurança
USER node

# Healthcheck nativo usando as bibliotecas internas do Node.js (evitando curl/wget)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => res.statusCode === 200 ? process.exit(0) : process.exit(1))"

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]

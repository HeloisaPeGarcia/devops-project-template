FROM node:20.15.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

# Assuming default npm start behavior
CMD ["npm", "start"]

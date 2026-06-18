FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Assuming default npm start behavior
CMD ["npm", "start"]

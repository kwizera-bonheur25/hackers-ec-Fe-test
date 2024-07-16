FROM node:18-alpine

WORKDIR /app

RUN npm install -g typescript

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

ENV PORT = 5000

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
FROM node:18-alpine

RUN ls

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY ./ ./
CMD ["npm", "start"]



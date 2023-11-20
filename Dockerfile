FROM node:18-alpine
WORKDIR frontendaluno

COPY package.json .
COPY vite.config.ts .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
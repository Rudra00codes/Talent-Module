# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY tsconfig.json ./
COPY src ./src
RUN npm run build || (npm install -D typescript ts-node-dev @types/node && npm run build)
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "dist/server.js"]

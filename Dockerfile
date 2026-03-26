FROM node:20-alpine

WORKDIR /app

# Copy dependency files first for better layer caching
COPY app/package.json ./

RUN npm install --production

COPY app/server.js ./

EXPOSE 3000

CMD ["node", "server.js"]

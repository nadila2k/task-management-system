FROM node:22-alpine

WORKDIR /app


RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

CMD ["npm", "start"]

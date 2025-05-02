# Dockerfile para desarrollo Next.js
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci
# El código fuente y node_modules se montarán como volúmenes
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Etapa 1 - build da aplicação Angular
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2 - imagem nginx para servir os arquivos
FROM nginx:alpine
COPY --from=builder /app/dist/dashboard-admin/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

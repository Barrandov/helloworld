# Этап 1: Сборка Vite проекта (Node.js)
FROM node:22-alpine AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем только файлы с зависимостями, чтобы быстрее кэшировать npm ci
COPY package.json package-lock.json ./

# Чистая установка зависимостей
RUN npm ci

# Копируем остальные файлы и запускаем сборку
COPY . .
RUN npm run build


# Этап 2: Легковесный Nginx сервер для отдачи статики
FROM nginx:alpine

# Копируем собранный проект из папки dist (из первого этапа) в папку Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Сообщаем, что контейнер слушает 80 порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]

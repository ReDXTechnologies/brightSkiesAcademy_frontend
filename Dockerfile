FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run prod

FROM nginx:latest
COPY --from=build /app/dist/main/ /usr/share/nginx/html/
EXPOSE 80


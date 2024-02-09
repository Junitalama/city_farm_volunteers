

FROM node:18-alpine


WORKDIR  /volunteer-app/backend


COPY backend/package*.json ./


RUN npm install


COPY ./backend .


EXPOSE 5000


CMD ["node", "server.js"]
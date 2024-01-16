FROM node:14.17.3-alpine AS BUILD

ARG WORK_DIR=/frontend

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install
RUN npm install -D sass

COPY . ${WORK_DIR}

RUN npm run build

FROM nginx:1.22.1

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=BUILD /frontend/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
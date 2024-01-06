FROM node:16.13.0-alpine

ARG WORK_DIR=/dental4clinic-backend
ENV PATH ${WORK_DIR}/node_modules/.bin:${PATH}

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN apk add --update make gcc g++ python3
RUN npm install

COPY . ${WORK_DIR}

CMD npm run start
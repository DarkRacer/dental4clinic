#
# Build stage
#
FROM node:18.16.0 as node
WORKDIR /dental4clinic

COPY . .

RUN npm i parcel
RUN npm install
RUN npm run build


#
# Deploy stage
#
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /dental4clinic/dist /usr/share/nginx/html

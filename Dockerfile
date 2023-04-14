FROM docker-qcms.art.lmru.tech/lmru--qcms--frontend/lmru--qcms--node:18.16.0-alpine as build
WORKDIR /usr/app
COPY . .
RUN yarn install && yarn build && cp nginx.conf ./build/
FROM docker.art.lmru.tech/nginx:latest
COPY --from=build /usr/app/build/ /usr/app/
WORKDIR /usr/app
RUN rm /etc/nginx/conf.d/default.conf && cp nginx.conf /etc/nginx/conf.d/ 
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

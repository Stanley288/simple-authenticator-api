FROM node:latest

ARG VERSION=production
ENV VERSION=${VERSION}

COPY package.json yarn.lock /tmp/

RUN cd /tmp && yarn

RUN mkdir -p /app
COPY . /app/

WORKDIR /app
RUN ln -s /tmp/node_modules

RUN yarn build
CMD yarn start

EXPOSE 8080

HEALTHCHECK CMD curl --fail http://localhost:8080 || exit 1

FROM node:carbon-alpine

WORKDIR /cli

COPY package.json yarn.lock /cli/

RUN yarn

COPY . /cli

ENTRYPOINT [ "node", "index.js" ]
CMD [ ]
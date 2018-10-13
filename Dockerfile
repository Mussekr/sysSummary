FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
RUN yarn install && yarn tsc && mv node_modules ../
EXPOSE 3000
CMD node dist/src/index.js
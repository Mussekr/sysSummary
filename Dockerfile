FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock*", "./"]
RUN yarn && mv node_modules ../
RUN yarn tsc
COPY . .
EXPOSE 3000
CMD node dist/src/index.js
FROM node:lts

WORKDIR /app/
COPY . .

RUN yarn install --immutable && yarn build

FROM node:8 as builder

RUN mkdir -p /opt/app

WORKDIR /opt
COPY package.json package-lock.json* tsconfig.json ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

RUN npm run build

FROM node:8 as tester

ARG KEY=TEST_SECRET
ARG ISSUER=TEST_ISSUER

COPY --from=builder . .
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt
RUN npm test

FROM node:8-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 5858 9229

WORKDIR /opt
COPY --from=builder /opt/ .

WORKDIR /opt
RUN npm uninstall --only=dev

WORKDIR /opt/app/dist

CMD [ "node", "app.js" ] 
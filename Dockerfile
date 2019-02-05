FROM node:10

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app
COPY package-lock.json /usr/app

RUN npm install

COPY . /usr/app

RUN npm run build

ENTRYPOINT ["npm", "run", "start-api"]

FROM node:14.15.5
MAINTAINER Dylan James <dylan@tritan.gg>

WORKDIR /opt/cdn

COPY . .

RUN npm i
RUN npm update

EXPOSE 80

CMD [ "node", "index.js" ]

FROM node:16.18

USER node

WORKDIR /app/front-end
 
COPY package* ./

RUN npm install

COPY . .

CMD [ "npm", "start" ] 
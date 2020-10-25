FROM node:10
WORKDIR /usr/src/app/node-mail-activation
COPY ./package*.json /usr/src/app/node-mail-activation/
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
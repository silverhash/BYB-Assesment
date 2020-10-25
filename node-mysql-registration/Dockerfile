FROM node:10
WORKDIR /usr/src/app/node-mysql-registration
COPY ./package*.json /usr/src/app/node-mysql-registration/
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]
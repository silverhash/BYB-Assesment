FROM node:10
WORKDIR /usr/src/app/node-loadbalancer
COPY ./package*.json /usr/src/app/node-loadbalancer/
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
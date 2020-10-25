FROM node:10
WORKDIR /usr/src/app/CodeChallenge
COPY ./package*.json /usr/src/app/CodeChallenge/
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
EXPOSE 4210
CMD ["npm", "start"]
# BYB CodeChallenge

Steps to run the app
1) Run npm install in /CodeChallenge, /node-mail-activation, /node-mysql-registration
2) Open config.json in /node-mail-activation and update the secret, sgApiKey and from (sendgrid confirmed API keys and from address)
3) Copy the secret from step 2 to /node-mysql-registration/config.json
4) go to the project root folder containing file docker-compose.yml and run "docker-compose build --no-cache"
5) after successfull build , run "docker-compose up"
6) access the application on http://<container_name>:4210/register or http://<docker_vm_host_ip>:4210/register
7) if the container_name is not working in step 6 need to update /CodeChallenge/environment.ts ,  apiUrl: 'http://<docker_vm_host_ip>:4000',  mailUrl: 'http://<docker_vm_host_ip>:5000' (docker-machine env)


Prerequisites
1) Install node (version > 10) and npm (1.27.*)
2) Install docker and docker-compose
3) Sendgrid account for the API key to send activation mails

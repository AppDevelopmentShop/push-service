Firebase Cloud Messaging Node.js
===========================================

## API Documentation
https://app.swaggerhub.com/apis/vaiol/npfsb-push/

# Docker version
Docker version of program require only docker and docker compose program installed, web server, postgres and nginx will be provided in docker containers.

## Dependency
- docker
- docker-compose

## Installing
1. Install Docker [guide](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
1. Install Docker Compose [guide](https://docs.docker.com/compose/install/#prerequisites)

## Configuration 
Configuring project you must manipulate only with this files:
- docker-compose.prod.yml
- nginx/nginx.conf
- nginx/privkey.pem
- nginx/fullchain.pem
- nginx/dhparam.pem
- conf/serviceAccountKey.json

1. Firebase configuration:   
To send your push to users you need to connect your Firebase service account to this program, this could be made by 3 simple steps:
    - First of all, you should create service account in Firebase Console, if you have one, skip this step.   
    To create service account open your Firebase console, then open your application, after that open settings -> service accounts and create one. After creating you will recieve 'serviceAccountKey.json' file also in this page you can find firebase 'databaseURL' strng.
    - Put your 'serviceAccountKey.json' into ./config/ folder in the root of project, ou should get ./config/serviceAccountKey.json as result.
    - Change FIREBASE_DB environment in admin1 block in docker-compose.prod.yml to your 'databaseURL' of your service account.
1. web configuration:
    - You can disable https, create different servers and others just by changing nginx.conf file placed in ./nginx/ folder.  
    This is simple nginx conf file.
    - By default https is enabled, and you couldn't run server without valid ssl key and certificate, so if you want launch server without https you can change nginx.conf file.
     - You can change url for checking user session, by change all SESSION_URL environment fields in docker-compose.prod.yml file. By default they are set to `https://lk.npfsb.ru/api/user/authorized`.
1. https configuration:   
To start project with HTTPS you need to get SSL certificate and key and connect it to program.
    - If you don't have SSL certificate you can get it simply with certbot [guide](https://certbot.eff.org/lets-encrypt/ubuntuxenial-other)
    - You should put your private key file to folder ./nginx/ in root of project with name 'privkey.pem', you should get ./nginx/privkey.pem as result. (it is basic name for letsencrypt files)
    - You should put your chain of certificate and intermidiate certificate to folder ./nginx/ in root of project with name 'fullchain.pem', you should get ./nginx/fullchain.pem as result. (it is a basic name of letsencrypt)
    - You should generate dhparam.pem key and place it to ./nginx/ folder in root of project, you should get ./nginx/dhparam.pem as result.   
     `openssl dhparam -out ./nginx/dhparam.pem 4096` - command for generating dhparam key (it may take long time).   
     Or you can use existed key in this folder and do nothing.
1. DB configuration:   
DB fully configured to work, make this changes only if you understand what are you doing.
    - Change db name, user, and password if needed, fields: POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER.
    - If db configurations was changed, changing db connection url also required: field DB_URL in each web block (should be changed 4 urls for web1, web2, web3, admin1 blocks).
    - By default postgres will run into the container, and won't be accessible outside. If you want make it accessible, just 'ports' filed in db block should be uncommented. Make sure that you don't have ulready launched postgres instance, port 5432 should be free.   
    
## Build
In root of project:
`docker-compose -f docker-compose.prod.yml up --build`
After project will be builded, (process not finished automatically) you could press `ctrl c` and start it.

## Start
In root of project:
`docker-compose -f docker-compose.prod.yml up -d`


# Manipulation after deploying
### Get Logs
 - logs is placed in ./logs/ folder in root of project.
### Get list of all awailable notifications
- conf/notifications.json - is file with all possible notifications to send. (file will be generated after first http request to /admin/send endpoint, so, make your test request)

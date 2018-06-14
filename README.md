## Application to send PUSH notifications via Firebase service.
### TODO
- Make Swagger documentation
- Cover with tests all endpoint

### Description
Application can help you if you should send push notification to some user,
and user have more then one device.  
Application can store user tokens and then used it for sending push notifications.
User can send personal token to push-service, registering him, then send different token again 
from another device. After that, if we will send notification to this user, notification will be sent to all user's device.   
Also, all history of sent push notifications is storing.
Available option to confirm the read of push notification.

### Dependencies
Databases required to provide service working:

- PostgreSQL 

DB should running local, inside another Docker container, or on external server.
For postgres you should create DB.
If you have postgres and redis running you should provide HOST name, PORT and other data to connect in environment.
Details about environment are below.
Also you should have Firebase project.

### Firebase
For make service working you should have Firebase project and service account key. Push-service could send message only in device registered in your project.
If you don't have, visit official firebase tutorial:
https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app
After this instructions, you should have ``` serviceAccountKey.json ``` file (name could be different).
Example:
```json
{
  "type": "service_account",
  "project_id": "example",
  "private_key_id": "example_example_fbs2b13fa4dd59fee43ef36",
  "private_key": "-----BEGIN PRIVATE KEY-----\nEXAMPLEs=\n-----END PRIVATE KEY-----\n",
  "client_email": "example@example.iam.gserviceaccount.com",
  "client_id": "0000000000000000000000",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/example.com"
}
```
After that, you should provide this information in environment variables to push-service.   
It two option available, provide whole json in one ENV variable, or in several.
Also you should provide ``` databaseURL ``` available in page where you have created service account key.
### All available environment
``` NODE_ENV ``` (default: 'development')  
``` PORT ``` (default: 80)   
``` PG_DB ```  
``` PG_USER ```  
``` PG_PASSWORD ```  
``` PG_HOST ``` (default: 'localhost')  
``` PG_PORT ``` (default: '5432')  

``` FIREBASE_DB ``` databaseURL used in initializeApp   
``` FIREBASE_COLOR ``` default color of push (could be changed in request)  
``` FIREBASE_DRYRUN ``` if you wan't just test  
``` FIREBASE_TTL ``` ttl of push  

Service account key could be provided like JSON in one ENV variable:  
``` SERVICE_ACCOUNT ``` 

Or service account key could be provided by several ENV variables, each variable is appropriate field in JSON.  
``` TYPE ```  
``` PROJECT_ID ```  
``` PRIVATE_KEY_ID ```  
``` PRIVATE_KEY ```  
``` CLIENT_EMAIL ```  
``` CLIENT_ID ```  
``` AUTH_URI ```  
``` TOKEN_URI ```  
``` AUTH_PROVIDER_X509_CERT_URL ```  
``` CLIENT_X509_CERT_URL ```  


### commands to start
``` npm run db:prod ``` - reinitialize DB (drop and recreate)   
``` npm run start:prod ``` - just start server (if DB was initialized) 
``` npm run db+start:prod ``` - initialize DB (without recreate) and start server  

To make service working you should make first start with ``` npm run db:prod ``` command to initialize DB, after that you should restart container with ```npm run start:prod``` command to make service running.
Or you can start service with one command: ``` npm run db+start:prod ```

### logs
``` sudo docker exec -it [ID] tail -f logs/info.log ```   
``` sudo docker exec -it [ID] tail -f logs/error.log ```    
[ID] - id or name container

### URLs
[Github Repo](https://github.com/AppDevelopmentShop/push-service/)  
[Swagger API Documentation](https://app.swaggerhub.com/apis/vaiol/push-service/)  
[Docker Cloud Repo](https://hub.docker.com/r/appshop/push-service/)  

### docker-compose
Example part of valid docker compose file for push service with several ENV firebase configurations:

```yml
push-service:
    image: appshop/push-service
    depends_on::
      - postgres
    environment:
      PORT: 80
      PG_HOST: postgres
      FIREBASE_DB: "https://example.firebaseio.com"
      TYPE: "service_account"
      PROJECT_ID: "example"
      PRIVATE_KEY_ID: "..."
      PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\n......-----END PRIVATE KEY-----\n"
      CLIENT_EMAIL: "...."
      CLIENT_ID: "..."
      AUTH_URI: "..."
      TOKEN_URI: "https://accounts.google.com/o/oauth2/token"
      AUTH_PROVIDER_X509_CERT_URL: "https://www.googleapis.com/oauth2/v1/certs"
      CLIENT_X509_CERT_URL: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk.com"
    command:
      ["npm", "run", "db+start:prod"]

```

And with single firebase ENV configuration:

```yml
push-service:
    image: appshop/push-service
    depends_on::
      - postgres
    environment:
      PORT: 80
      PG_HOST: postgres
      FIREBASE_DB: "https://example.firebaseio.com"
      SERVICE_ACCOUNT: '{
                             "type": "service_account",
                             "project_id": "example",
                             "private_key_id": "....",
                             "private_key": "-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n",
                             "client_email": "...",
                             "client_id": "...",
                             "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                             "token_uri": "https://accounts.google.com/o/oauth2/token",
                             "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                             "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk.iam.gserviceaccount.com"
                         }'
    command:
      ["npm", "run", "db+start:prod"]

```

# cloudDIYPhoto_Client
This is Client part of Cloud DIY Photo project. It's a Front-end application service, and it should work with [cloudDIYPhoto_API](https://github.com/AaronKim-CN/cloudDIYPhoto_API) together. Please refer to the following process to install the API.

## Prepare
There are several ways to deploy the react apps. Since, we have separated the front-end and back-end system, so, we need to tell the fron app where is the API endpoint. 

### Set-up the config.json to know the API service.

Open the config.json file in the src folder. And, specify the API endpoint.
```
"API_Endpoint": "http://localhost:9000"
```

### Deploy the Client and API to the same place.
If you use the gulp, we channge the API End point first.
```
"API_Endpoint": "."
```

## Run the application
Simply run the following basic nodejs commands to run the front-end app.
```
npm install
npm start
```

## Access to the APP
If you run the above command, it should automaticlly open the application. If not, please try to access the following link manually.
```
http://localhost:3000/
```
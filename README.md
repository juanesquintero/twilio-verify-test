# Twilio Verify Test


**Source Code**: Repository -> [twilio-verify-test](https://github.com/juanesquintero/twilio-verify-test)

**Author**: Juanes Quintero -> [GitLab](https://gitlab.com/juanesquintero) / [GitHub](https://github.com/juanesquintero)


This project is a web focused clone of [yafuquen/twilio-verify-example](https://github.com/yafuquen/twilio-verify-example), review the documentation there for more information about Twilio.

---


## TechStack

[Node.js 18.4.1](https://nodejs.org/en/)

[Express.js 4.17.1](https://expressjs.com/)

[Mustache 4.2.0](https://github.com/janl/mustache.js)

[MongoDB 6.0](https://www.mongodb.com/)

[Twilio 3.68.0](https://www.npmjs.com/package/twilio)

---


## Requirements

This project can be run it by installing Node.js <= 18.14 and Docker >= 24.0.6 (if you prefer to use the DB directly in your local machine you can skip the Docker requirement).

  **Docker** <br>
  https://www.docker.com/resources/what-container <br>
  https://www.docker.com/get-started

  **Node.js** <br>
  https://nodejs.org/en/download


---

## Installation

Clone the repository. Then, install dependencies with

`npm install`

Create a .env file from an example template, do the following in your Terminal

`cp .env.sample .env`

To run the application, you'll need set up your Twilio account credentials and configure the Verify Service, so you’ll need to collect the following variables from the Twilio Account Portal.

`TWILIO_ACCOUNT_SID`
`TWILIO_AUTH_TOKEN`
`TWILIO_VERIFY_SERVICE_SID`

<small>for more information go to base repo and review docs</small>

Also you will need to set up the following MongoDB env variables

  ```dosini
  MONGO_DBNAME=
  MONGO_USER=
  MONGO_PSSWD=
  MONGO_PORT=
  ```

---

## Execution

Start the application in development mode

  ```bash
  $ npm run dev
  ```

This command will star first the 2 Mongodb containers based on the docker-compose.yml file behind with...

  ```bash
  $ docker compose up -d
  ```

...then it will run the Express.js app with... 
  
  ```bash
  $ nodemon index.js
  ```

One container is for the database server and the other one for a UI db management tool. 

If you install the mongodb server outside Docker please use...

  ```bash
  $ npm start
  ```

...this will just run the Express server, ensure your mongo service is up and running.


## Check it out

Express.js app now should be running at **http://localhost:5000/**

Mongo Express GUI on **[http://localhost:8081](http://localhost:8081)**

MongoDB sevrer Database on **localhost:27017**


---

# Use Cases

Verify API process  
  - User receives a sms/wpp message with OTP code.
  - User types/enters the OTP code.
  - Verifies the code against the Verify API, to authorize user.

### 1. Registration

Register on http://localhost:5000/register form,
with following fields: username, password, phone number and enable 2FA or not.

If 2FA checked and phone entered:
  - verifies user with Verify API.
  - register request completed

else create new user directly.

### 2. Login
  
A registred user can LogIn at http://localhost:5000/login form with following fields: username, password.

If 2FA enabled:
  - verifies user with Verify API.
  - login request completed

else open user session directly.

### 3. Change Password
  
A loggedin user can change password at http://localhost:5000/profile/change-password

If 2FA enabled:
  - verifies user with Verify API.
  - change password request completed with message.

else change password directly.

# License

MIT

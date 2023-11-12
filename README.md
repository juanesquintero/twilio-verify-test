# Twilio Verify Test


**Source Code** : Repository [twilio-verify-test](https://github.com/juanesquintero/twilio-verify-test)

**Author** : Juanes Quintero [GitLab](https://gitlab.com/juanesquintero) [GitHub](https://github.com/juanesquintero)


This project is a web focused clone of [yafuquen/twilio-verify-example](https://github.com/yafuquen/twilio-verify-example), review the documentation there for more Twilio information.

<hr>

## TechStack

[Node.js 18.4.1](https://nodejs.org/en/)

[Express.js 4.17.1](https://expressjs.com/)

[Mustache 4.2.0](https://github.com/janl/mustache.js)

[MongoDB 6.0](https://www.mongodb.com/)

[Twilio 3.68.0](https://www.npmjs.com/package/twilio)

---

<br>


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
`MONGO_DBNAME`
`MONGO_USER`
`MONGO_PSSWD`
`MONGO_PORT`


---

## Execution

Start the application in development mode

`npm run dev`

This command will star first the 2 Mongodb containers based on the docker-compose.yml file, then it will run the Express.js app. 

One container is for the database server and the other one for a UI db management tool. 

If you install the mongodb server outside Docker please use...

`npm start`

this will just run the Express server, ensure your mongo service is up and running


Your application should now be running at **http://localhost:5000/**.

---

<br>

# License

MIT

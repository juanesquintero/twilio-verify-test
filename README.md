# Twilio Verify Test


**Source Code** : Repository [twilio-verify-test](https://github.com/juanesquintero/twilio-verify-test)

**Author** : Juanes Quintero [GitLab](https://gitlab.com/juanesquintero) [GitHub](https://github.com/juanesquintero)

<hr>

This project is a clone of [yafuquen/twilio-verify-example](https://github.com/yafuquen/twilio-verify-example)
Review the documentation there for more Twilio information.

## TechStack

<i>Node.js</i> 18.4.1
https://nodejs.org/en/download

<i>Express.js</i> 4.17.1
https://expressjs.com/

<i>Mustache</i> 4.2.0
https://github.com/janl/mustache.jshttps://typer.tiangolo.com/

<i>MongoDB</i> 6.0
https://www.mongodb.com/try/download/community

<i>Twilio</i> 3.68.0
https://www.npmjs.com/package/twilio

---

<br>


## Installation

Clone the repository. Then, install dependencies with

`npm install`

To run the application, you'll need to gather your Twilio account credentials and configure them in a file named .env. To create this file from an example template, do the following in your Terminal.

`cp .env.sample .env`

Before you start the install, you’ll need to collect the following variables from the Twilio Account Portal.

`TWILIO_ACCOUNT_SID`
`TWILIO_AUTH_TOKEN`

### Configure the Verify Service

To configure Twilio Verify service go to base repo and review docs

Add the `TWILIO_VERIFY_SERVICE_SID` to your environment variables

Start the application in development mode

`npm run dev`


Your application should now be running at **http://localhost:5000/**.

### Register a Local User

Access **http://localhost:5000/register** on your browser, you can now register a first user.

In the default setting no device is register as a factor, a user can sign up and access the profile page.

### Login with a user


# License

MIT

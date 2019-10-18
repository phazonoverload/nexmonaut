# nexmonaut

A lil friendly CLI to interact with Nexmo. [Built using Ace](https://adonisjs.com/docs/4.1/ace)

## Setup

### Clone the repo to your machine and download dependencies

```
$ git clone https://github.com/phazonoverload/nexmonaut
$ cd nexmonaut
$ npm install
$ npm link (this makes the nexmonaut command available in your terminal)
```

### Setup a new application

1. Generate a new application in the [Nexmo dashboard](https://dashboard.nexmo.com/messages/create-application)
2. You'll need to set up a seperate application to handle webhooks that Nexmo sends to update you on message status and incoming messages. More on this below.
3. You should keep your `private.key` safe as this won't be regenerated by Nexmo. We recommend putting it in your root directory (`~`), but you can put it anywhere you like.
4. Take note of your application ID - you'll need it.

#### Webhook server

Nexmo sends a webhook to tell you when there's an incoming message, or to update you about a message's status. [You can learn more about webhooks in context of Nexmo here.](https://developer.nexmo.com/concepts/guides/webhooks)

To keep this demo simple, I've set up a basic application which will always respond with a 200 (OK) status. You may want to execute some application logic at this point, but we're just responding with a status as required. 

* In the Status URL box you can put `https://nexmonaut.glitch.me/webhooks/message-status`
* In the Inbound URL box you can put `https://nexmonaut.glitch.me/webhooks/inbound-message`

Glitch puts apps to sleep after a period of inactivity, so before you use it to test, please wake it up by [visiting the app](http://nexmonaut.glitch.me/)

# Usage

## `nexmonaut`

Lists available commands

## `nexmonaut setup`

This command will create and save your config. You'll need your API Key, API Secret, an Application ID and the directory where your `private.key` file is located (if it is in `~/Documents/private.key` you should enter `~/Documents`, for example)

## `nexmonaut balance`

This command will return your available Nexmo balance for the account configured in your setup

## `nexmonaut sms <message>`

This command will take the message you pass as an argument and the requested to/from numbers and send a message using Nexmo

Don't prepend phone numbers with a + or 00 - for a UK number the format should be something like `447496012345`
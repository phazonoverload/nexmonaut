const { Command } = require('@adonisjs/ace')
const Nexmo = require('nexmo')
const fs = require('fs')

class Sms extends Command {
  static get signature() {
    return `sms`
  }

  static get description() {
    return `Send a SMS using Nexmo`
  }

  async handle(args, flags) {
    // Grab environment variables if they exist
    const { NEXMO_API_KEY, NEXMO_API_SECRET } = process.env
    let apiKey, apiSecret;

    // If either the key or secret doesn't exist, prompt the user for them
    if(!NEXMO_API_KEY) API_KEY = await this.ask(`What's your Nexmo API Key?`)
    else apiKey = NEXMO_API_KEY
    if(!NEXMO_API_SECRET) API_SECRET = await this.ask(`What's your Nexmo API Secret?`)
    else apiSecret = NEXMO_API_SECRET

    const applicationId = await this.ask(`What's your application ID?`)
    const privateKeyLocation = await this.ask(`Where's the location of your private.key file within this directory?`, `/`)
    const privateKey = fs.readFileSync(`${process.cwd()}${privateKeyLocation}private.key`)

    // Final check - did user enter required data. If not, provide error and break
    if(!apiKey || !apiSecret || !applicationId || !privateKey) {
      this.error(`Can't make request as information is missing`)
      return
    }

    // Get user input to send message
    const from = await this.ask(`From number`, `NEXMO`)
    const to = await this.ask(`Recipient number`)
    const message = await this.ask(`What's your message?`)
    
    const nexmo = new Nexmo({ apiKey, apiSecret, applicationId, privateKey });

    // Send message!
    nexmo.channel.send(
      { type: `sms`, number: to },
      { type: `sms`, number: from },
      { content: { type: `text`, text: message } },
      (err, data) => {
        if(err) {
          console.log(err)
          return
        }
        this.success(`Sent message!`)
      }
    )
  }
}

module.exports = Sms
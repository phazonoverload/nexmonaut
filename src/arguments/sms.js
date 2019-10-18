// Syntax nexmonaut sms <message>
// If there's no application ID or link to private key - ask and store. 
// If there is - go straight to asking to:from
// const privateKey = fs.readFileSync(absKeyLocation)

const { Command } = require('@adonisjs/ace')
const Nexmo = require('nexmo')
const fs = require('fs')
const username = require('os').userInfo().username


class Sms extends Command {
  static get signature() {
    return `sms {message: The message you want to send}`
  }

  static get description() {
    return `Send a SMS using Nexmo`
  }

  async handle({ message }, flags) {
    const configFile = `/users/${username}/.nexmo`

    if(fs.existsSync(configFile)) {
      fs.readFile(configFile, `utf8`, async (err, data) => {
        if (err) {
          this.error(`Error reading config. Please run nexmonaut setup.`)
          return
        }
        const { apiKey, apiSecret, applicationId, privateKey: pk } = JSON.parse(data)

        const privateKey = fs.readFileSync(pk)
        const nexmo = new Nexmo({ apiKey, apiSecret, applicationId, privateKey })
        const from = await this.ask(`From number`, `NEXMO`)
        const to = await this.ask(`Recipient number`)

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
      })
    } else {
      this.error('Please run nexmonaut setup first')
    }
  }
}

module.exports = Sms
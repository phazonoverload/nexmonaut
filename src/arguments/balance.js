const { Command } = require('@adonisjs/ace')
const Nexmo = require('nexmo')
const fs = require('fs')
const username = require('os').userInfo().username

class Balance extends Command {
  static get signature() {
    return `balance`
  }

  static get description() {
    return `Retrieve your Nexmo balance`
  }

  async handle(args, flags) {
    const configFile = `/users/${username}/.nexmo`

    if(fs.existsSync(configFile)) {
      fs.readFile(configFile, `utf8`, async (err, data) => {
        if (err) {
          this.error(`Error reading config. Please run nexmonaut setup.`)
          return
        }
        const { apiKey, apiSecret } = JSON.parse(data)
        
        const nexmo = new Nexmo({apiKey, apiSecret})

        await nexmo.account.checkBalance((err, result) => {
          if(err) {
            this.error(err)
            return
          }
          console.log(`Your Nexmo balance is €${result.value.toFixed(2)}`)
        });  
      })
    } else {
      this.error('Please run nexmonaut setup first')
    }  
  }
}

module.exports = Balance
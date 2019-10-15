const { Command } = require('@adonisjs/ace')
const Nexmo = require('nexmo')

class Balance extends Command {
  static get signature() {
    return `balance`
  }

  static get description() {
    return `Retrieve your Nexmo balance`
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

    // Final check - did user enter required data. If not, provide error and break
    if(!apiKey || !apiSecret) {
      this.error(`Can't make request as either API Key or API Secret is missing`)
      return;
    }
    
    const nexmo = new Nexmo({apiKey, apiSecret})

    await nexmo.account.checkBalance((err, result) => {
      if(err) console.log(err);
      console.log(`Your Nexmo balance is €${result.value.toFixed(2)}`);
    });    
  }
}

module.exports = Balance
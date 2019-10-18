const { Command } = require('@adonisjs/ace')
const { exec } = require('child_process');
const fs = require('fs')
const username = require('os').userInfo().username

class Sms extends Command {
  static get signature() {
    return `setup`
  }

  static get description() {
    return `Setup nexmonaut`
  }

  async handle(args, flags) {
    if(fs.existsSync(`/users/${username}/.nexmo`)) {
      const shouldReset = await this.confirm(`You've already set up nexmonaut. Do you want to reset your configuration?`)
      if(shouldReset) this.createConfigFile();
    } else {
      this.createConfigFile();
    }
  }

  async createConfigFile() {
    const apiKey = await this.ask(`What's your Nexmo API Key?`)
    const apiSecret = await this.ask(`What's your Nexmo API Secret?`)
    const applicationId = await this.ask(`What's your Nexmo Application ID?`)
    const keyLocation = await this.ask(`Where's your private.key file?`, `~`)
    const privateKey = keyLocation.replace(`~`, `/users/${username}`) + '/private.key'

    if(!apiKey || !apiSecret || !applicationId || !privateKey) {
      this.error(`Can't create as information is missing`)
      return
    }

    const config = { apiKey, apiSecret, applicationId, privateKey };

    this.runCommand(`touch ~/.nexmo`)
    this.runCommand(`echo '${JSON.stringify(config)}' > ~/.nexmo`)
    this.success(`Completed setup. You're good to go!`);
  }

  async runCommand(command) {
    exec(command, (err, stdout, stderr) => {
      console.log(`${stdout}`);
    });
  }
}

module.exports = Sms
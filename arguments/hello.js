const { Command } = require('@adonisjs/ace')

class Hello extends Command {
  static get signature() {
    return `hello`
  }

  static get description() {
    return `Responds with hello - half of a good hello world`
  }

  async handle(args, flags) {
    console.log(`hello`)
  }
}

module.exports = Hello
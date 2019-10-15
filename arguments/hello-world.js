const { Command } = require('@adonisjs/ace')

class HelloWorld extends Command {
  static get signature() {
    return `hello`
  }

  static get description() {
    return `Response with hello`
  }

  async handle(args, flags) {
    console.log(`hello`)
  }
}

module.exports = HelloWorld
const { Command } = require('@adonisjs/ace')
const axios = require('axios')

class Pokemon extends Command {
  static get signature() {
    return `pokemon
      { name: Get Pokemon by name }
    `
  }

  static get description() {
    return `Query PokeAPI as a test of calling off to an API`
  }

  async handle({ name }, flags) {
    axios({
      method: `GET`,
      url: `https://pokeapi.co/api/v2/pokemon/${name}`
    }).then(resp => {
      const { name, id, height } = resp.data;
      const pokeName = name.charAt(0).toUpperCase() + name.slice(1);
      console.log(`${pokeName} has ID ${id} and is ${height*10}cm tall`);
    })
  }
}

module.exports = Pokemon
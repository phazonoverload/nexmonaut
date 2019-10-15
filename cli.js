const ace = require(`@adonisjs/ace`)

// ace.addCommand(require(`./arguments/hello.js`))
// ace.addCommand(require(`./arguments/pokemon.js`))
ace.addCommand(require(`./arguments/balance.js`))

ace.wireUpWithCommander()
ace.invoke()
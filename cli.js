const ace = require(`@adonisjs/ace`)

ace.addCommand(require(`./arguments/hello-world.js`))

ace.wireUpWithCommander()
ace.invoke()
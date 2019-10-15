const ace = require(`@adonisjs/ace`)

ace.addCommand(require(`./arguments/hello.js`))

ace.wireUpWithCommander()
ace.invoke()
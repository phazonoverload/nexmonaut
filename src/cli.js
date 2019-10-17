const ace = require(`@adonisjs/ace`)

export function cli() {
  ace.addCommand(require(`./arguments/balance.js`))
  ace.addCommand(require(`./arguments/sms.js`))
  
  ace.wireUpWithCommander()
  ace.invoke()
}
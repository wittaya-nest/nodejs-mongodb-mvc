const express = require('./config/strategies/express')

const app = express()

app.listen(app.get('port'), function(){
    console.log('Server on port', app.get('port'))
})

module.exports = app




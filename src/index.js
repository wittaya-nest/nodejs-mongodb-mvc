const express = require('./config/strategies/express')


// initalization
const app = express()
//Server is Listening
app.listen(app.get('port'), function(){
    console.log('Server on port', app.get('port'))
})
module.exports.app;




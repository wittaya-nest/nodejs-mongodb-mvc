const indexCon = require('../controller/index.controller')

module.exports = function(app){
app.route('/').get(indexCon.index)
app.route('/about').get(indexCon.about)
}
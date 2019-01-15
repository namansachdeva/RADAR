// Require modules
const express = require("express");
var ejs = require('ejs')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var SocialMedia = require('./models/SocialMediaModel')
const app = express();
app.set('port', process.env.PORT || 5000)

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin1@ds149914.mlab.com:49914/radar');

app.use(require('body-parser').urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static(__dirname + '/public'));

var routes = require('./routes/toolRoutes');
routes(app);

//Start server
app.listen(app.get('port'), function () {
	console.log('server started on port ' + app.get('port'));
})

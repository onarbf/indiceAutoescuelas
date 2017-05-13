var express    = require('express');
var bodyParser = require('body-parser');
var exphbs     = require('express-handlebars');
var mongoose   = require('mongoose');

var drController = require('./routes/ds-controller.js')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/backofficeAutoescuela');

//Starting Express
var app = express();

//Setting static folder
app.use(express.static(__dirname +'/public'));

//Setting the view mode
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Configuring the body capturer
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Setting routes
app.use('/',drController);


//Listening port
app.listen(3000,(req,res)=>{
  console.log('Server running on port 3000');
})

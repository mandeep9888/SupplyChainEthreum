var express = require('express')
   , routes = require(__dirname+'/routes')
   , http = require('http')
   , path = require('path')
   , bodyParser = require('body-parser')
   , multipart = require('connect-multiparty')
   , session = require('express-session')
   , cookieParser = require('cookie-parser')
    , format = require('util').format
    , request = require('request');
//var kMeans = require('node-kmeans');

var app = express();
var multipartMiddleware = multipart();

app.set('port', process.env.PORT || 8090);
app.set('views', path.join(__dirname, 'views'));  //Needs to be added for html
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.locals.pretty = true;

app.use(cookieParser('secret'));
app.use(session({
  secret:'yoursecret',
  resave: true,
  saveUninitialized: true,
  cookie:{maxAge:30*60*1000}
}));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.Router());
var index= require('./routes/index');
require(__dirname+'/routes/crud')(app);

app.use('/',index);

http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});

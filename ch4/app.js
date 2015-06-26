/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs'), compression = require('compression'), timeout = require('connect-timeout'),
methodOverride = require('method-override'),
responseTime = require('response-time'),
serveIndex = require('serve-index'),
vhost = require('vhost'),
busboy = require('connect-busboy'),
errorhandler = require('errorhandler');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// Configure settings

app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression({threshold: 1}));
app.use(logger('combined'));
app.use(methodOverride('_method'));
//app.use(responseTime(4));
app.use(responseTime({digits: 4}));
app.use(favicon(path.join('public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Apply middleware
app.use('/shared', serveIndex(
path.join('public','shared'),
{'icons': true}
));
app.use(express.static('public'));
// Define routes
app.use('/upload', busboy({immediate: true}));
app.use('/upload', function(request, response) {
request.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
file.on('data', function(data){
fs.writeFile('upload' + fieldname + filename, data);
});
file.on('end', function(){
console.log('File' + filename + 'is ended');
});
 
});
request.busboy.on('finish', function(){
console.log('Busboy is finished');
response.status(201).end();
})
});
app.get('/slow-request', timeout('1s'), function(request, response, next) {
    setTimeout(function(){
        if (request.timedout) return false;
        return next();
        }, 999 + Math.round(Math.random()));
    }, function(request, response, next) {
        response.send('ok');
        }
);
 
app.delete('/purchase-orders', function(request, response){
    console.log('The DELETE route has been triggered');
    response.status(204).end();
});
 
app.get('/response-time', function(request, response){
    setTimeout(function(){
        response.status(200).end();
    }, 513);
});
app.get('/', function(request, response){
    response.send('Pro Express.js Middleware');
});
app.get('/compression', function(request, response){
    response.render('index');
})

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Apply error handlers
app.use(errorhandler());
// Boot the server
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port' + server.address().port);
});
 

module.exports = app;
*/


var express = require('express'),
path = require('path'),
fs = require('fs'),
compression = require('compression'),
logger = require('morgan'),
timeout = require('connect-timeout'),
methodOverride = require('method-override'),
responseTime = require('response-time'),
favicon = require('serve-favicon'),
serveIndex = require('serve-index'),
vhost = require('vhost'),
busboy = require('connect-busboy'),
errorhandler = require('errorhandler');

var app = express();
// Configure settings
app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression({threshold: 1}));
app.use(logger('combined'));
app.use(methodOverride('_method'));
app.use(responseTime(4));
app.use(favicon(path.join('public', 'favicon.ico')));
// Apply middleware
app.use('/shared', serveIndex(
    path.join('public','shared'),
    {'icons': true}
));
app.use(express.static('public'));
// Define routes
app.use('/upload', busboy({immediate: true}));
app.use('/upload', function(request, response) {
    request.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.on('data', function(data){
            fs.writeFile('upload' + fieldname + filename, data);
        });
        file.on('end', function(){
            console.log('File' + filename + 'is ended');
        });
 
    });
    request.busboy.on('finish', function(){
        console.log('Busboy is finished');
        response.status(201).end();
    })
});


app.get(
    '/slow-request',
    timeout('1s'),
    function(request, response, next) {
        setTimeout(function(){
        if (request.timedout) return false;
        return next();
        }, 999 + Math.round(Math.random()));
        }, function(request, response, next) {
            response.send('ok');
    }
);
 
app.delete('/purchase-orders', function(request, response){
console.log('The DELETE route has been triggered');
response.status(204).end();
});
 
app.get('/response-time', function(request, response){
    setTimeout(function(){
        response.status(200).end();
    }, 513);
});
 



app.get('/', function(request, response){
response.send('Pro Express.js Middleware');
});
app.get('/compression', function(request, response){
response.render('index');
})
// Apply error handlers
app.use(errorhandler());
// Boot the server
var server = app.listen(app.get('port'), function() {
console.log('Express server listening on port' + server.address().port);
});
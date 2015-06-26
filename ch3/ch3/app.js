var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
//__________________________________________________________________________________
/*we gathered all the
aforementioned settings to illustrate the examples. As you inspect the code, notice the order of the configuration
statements in the file! They must be after the var app instantiation, but before middleware and routes*/
var book = {
    name: 'Practical Node.js',
    publisher: 'Apress',
    keywords: 'node.js express.js mongodb websocket oauth',
    discount: 'PNJS15'
}
var express = require('express'),
    path = require('path');
var app = express();
 
console.log(app.get('env'));
app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
 
app.set('trust proxy', true);
app.set('jsonp callback name', 'cb');
app.set('json replacer', function(key, value){
    if (key === 'discount')
        return undefined;
    else
        return value;
});
app.set('json spaces', 4);
 
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('x-powered-by', false);
app.set('subdomain offset', 3);
// app.disable('etag')
 
app.get('/jsonp', function(request, response){
    response.jsonp(book);
})
app.get('/json', function(request, response){
    response.send(book);
})
app.get('/users', function(request, response){
    response.send('users');
})
app.get('/users/', function(request, response){
    response.send('users/');
})
app.get('*', function(request, response){
    response.send('Pro Express.js Configurations');
})
 
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
//__________________________________________________________________________________
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 3000);//app.set(name, value);

console.log('Express server listening on port ' + app.get('port'));//or use app.set(name); //only one parameter
console.log(app.disabled('etag'));
console.log(app.get('env'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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



module.exports = app;

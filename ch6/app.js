var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var router = express.Router();

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

//code added
var user = {
    'monse': {
        email: 'hi@monse.co',
        website: 'http://monse.co',
        blog: 'http://webapplog.com'
    }
};
 
var findUserByUsername = function (username, callback) {
    // Perform database query that calls callback when it's done
    // This is our fake database
    if (!user[username])
        return callback(new Error(
            'No user matching '
            + username
            )
        );
        return callback(null, user[username]);
};

//code added
app.get('/v1/users/:username', function(request, response, next) {//ruta/endpoint
    //:username+recibe parametro, que se carga como obj en req.params
    var username = request.params.username;
    findUserByUsername(username, function(error, user) {
        if (error) return next(error);
        return response.render('user', user);
    });
   // response.send('usename '+username);
});
 
app.get('/v1/admin/:username', function(request, response, next) {
    var username = request.params.username;
    findUserByUsername(username, function(error, user) {
        if (error) return next(error);
        return response.render('admin', user);
    });
    //response.send('admin ' + username);
});

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

app.use(errorhandler());
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
module.exports = app;

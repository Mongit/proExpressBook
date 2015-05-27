var express = require('express');//servver will utilize Express; therefore, let's include this library
var port = 3000;//the server will run locally on port 3000
var app = express();//we create an application (instantiate an Express.js object)

app.get('*', function(request, response){
    response.end('Hello World, I\'m Monse and this is my fist web server :D');
});//define a wildcard route(*) with the app.get() function


//start the Express.js web server and output a user output a user-friendly terminal message in a callback:
app.listen(port, function(){
    console.log('The server is running, ' + ' please, open your browser at http://localhost:%s',port);
});
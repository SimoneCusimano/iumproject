var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
    socket.on('filter', function(data){

        urlAPI = 'http://www.omdbapi.com/?t=' + data + '&y=&plot=short&r=json';

        request(urlAPI, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //return json
                output = "Film: " + data + " --> " + body;
                io.emit('filter', output);
            }
        });
    });
});

io.on('connection', function(socket){
    console.log('User Connected.');
    socket.on('disconnect', function(){
        console.log('User Disconnected.');
    });
});

http.listen(3000, function(){
    console.log('Server running at http://127.0.0.1:3000/');
});
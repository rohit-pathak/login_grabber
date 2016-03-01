'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var _ = require('underscore');
var port  = Number(process.env.PORT || 3000);

var GLOBAL_PASSWORD = 'affinitas'; // TODO: not implemented yet
var logins = [
    {id: 743, name: 'QlikView4', occupied:false, occupiedBy:''},
    {id: 653, name: 'QlikView5', occupied:false, occupiedBy:''},
    {id: 234, name: 'QlikView6', occupied:false, occupiedBy:''},
    {id: 323, name: 'QlikView7', occupied:false, occupiedBy:''},
    {id: 453, name: 'QlikView14', occupied:false, occupiedBy:''},
    {id: 557, name: 'QlikView15', occupied:false, occupiedBy:''},
];

var updateLogin = function(data) {
    var login = _.find(logins, function(o) {
        return parseInt(data.id) === o.id;
    });
    if (login !== undefined) {
        console.log('updating login ' + data.id);
        if (data.occupied === 'true' || data.occupied === true) {
            login.occupied = true;
            login.occupiedBy = data.occupiedBy; 
        } else {
            login.occupied = false;
            login.occupiedBy = '';
        }
    } // fail silently otherwise
};

app.set('view engine', 'jade');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

// define routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/grabs', function(req, res) {
    res.send(logins);
});

app.post('/grabs', function(req, res) {
    updateLogin(req.body);
    res.send('done');
});

// sync data b/w all clients with socket io
io.on('connection', function(socket) {
    socket.on('grabbed', function(msg) {
        console.log(msg);
        io.emit('grabbed', logins);
    });
});

// start server
http.listen(port, function(){
  console.log('listening on *:' + port);
});

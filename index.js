'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var _ = require('underscore');
var Datastore = require('nedb');

var db = new Datastore({ filename: 'qvlg.db', autoload: true });
var port  = Number(process.env.PORT || 3000);
var GLOBAL_PASSWORD = 'affinitas'; // TODO: not implemented yet

var updateLogin = function(data, successCallback) {
    var updateData = {};
    if (data.occupied === 'true' || data.occupied === true) {
        updateData.occupied = true;
        updateData.occupiedBy = data.occupiedBy; 
    } else {
        updateData.occupied = false;
        updateData.occupiedBy = '';
    }
    db.update(
        {_id: data._id}, 
        {$set: updateData}, 
        {returnUpdatedDocs: true},
        function(err, numAffected, affectedDocuments, upsert) {
            console.log('updated following login: ' + affectedDocuments.name);
            successCallback();
        }
    );
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
    db.find({}, function(err, docs) {
        res.send(docs);
    });
});

app.post('/grabs', function(req, res) {
    updateLogin(req.body, function(){ res.send('done'); });
});

// sync data b/w all clients with socket io
io.on('connection', function(socket) {
    socket.on('grabbed', function(msg) {
        console.log(msg);
        db.find({}, function(err, docs) {
            io.emit('grabbed', docs);
        });
        
    });
});

// start server
http.listen(port, function(){
  console.log('listening on *:' + port);
});

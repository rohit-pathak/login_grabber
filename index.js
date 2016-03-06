'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://rohit:rohit@ds023418.mlab.com:23418/affinitasqlmdev';
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
    console.log('updating login ' + data.name);
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('logins');
        collection.updateOne(
            {'name': data.name},
            {$set: updateData},
            function (e, r) {
                e ? console.log(e) : console.log('update successful');
                successCallback();
                db.close();
            });
    });
};

var getLogins = function(successCallback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('logins');
        collection.find().toArray().then(function(docs) {
            console.log('got all logins');
            successCallback(docs);
            db.close();
        });
    });
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
    getLogins(function(data) {
        console.log('post successful');
        res.send(data);
    });
});

app.post('/grabs', function(req, res) {
    updateLogin(req.body, function(){ res.send('done'); });
});

// sync data b/w all clients with socket io
io.on('connection', function(socket) {
    socket.on('grabbed', function(msg) {
        console.log(msg);
        getLogins(function(data) {
            io.emit('grabbed', data);
        });
    });
});

// start server
http.listen(port, function(){
    console.log('listening on *:' + port);
});

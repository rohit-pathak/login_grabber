'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var GLOBAL_PASSWORD = 'affinitas';
var logins = [
    {id: 1, name: 'QlikView1', occupied:false, occupiedBy:''},
    {id: 2, name: 'QlikView2', occupied:false, occupiedBy:''},
    {id: 3, name: 'QlikView3', occupied:false, occupiedBy:''},
    {id: 4, name: 'QlikView4', occupied:true, occupiedBy:'shreyans'},
    {id: 5, name: 'QlikView5', occupied:false, occupiedBy:''},
];

var grabLogin = function(login) {
    console.log('grabbing login');
    console.log(login);
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
    console.log(req.body);
    grabLogin(req.body);
    // TODO: inform all other clients through socket io
    res.send('done');
});

// start server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

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

var random = function(n) {
    return Math.round(Math.random() * 10 * n);
};

var grabLogin = function(info) {
    var user = {};
    user.name = info.name || 'randomUser' + random(2);
    user.id = random(6);
    return user;
};

var createAccount = function(info) {
    var account = {};
    account.name = info.name || 'randomAccount' + random(2);
    account.id = random(6);
    return account;
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
    // users.push(createUser(req.body));
    res.redirect('/');
});


// start server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

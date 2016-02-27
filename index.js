'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var GLOBAL_PASSWORD = 'affinitas'; // TODO: not implemented yet
var logins = [
    {id: 743, name: 'QlikView1', occupied:false, occupiedBy:''},
    {id: 234, name: 'QlikView2', occupied:false, occupiedBy:''},
    {id: 323, name: 'QlikView3', occupied:false, occupiedBy:''},
    {id: 453, name: 'QlikView4', occupied:true, occupiedBy:'shreyans'},
    {id: 557, name: 'QlikView5', occupied:false, occupiedBy:''},
];

var updateLogin = function(data) {
    console.log('updating login ' + data.id);
    var login = _.find(logins, function(o) {
        return parseInt(data.id) === o.id;
    });
    if (login !== undefined) {
        if (data.occupied === 'true' || data.occupied === true) {
            login.occupied = true;
            login.occupiedBy = data.occupiedBy; 
        } else {
            login.occupied = false;
            login.occupiedBy = '';
        }
    } // fail silently otherwise
    console.log(logins);
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
    updateLogin(req.body);
    // TODO: inform all other clients through socket io
    res.send('done');
});

// start server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

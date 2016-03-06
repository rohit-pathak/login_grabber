'use strict';
/*
    This module seeds initial data for the logins.
    Run this initially or when you want to reset
*/
var Datastore = require('nedb');

var database = new Datastore({ filename: 'qvlg.db', autoload: true });
var logins = [
    {name: 'QlikView4', occupied:false, occupiedBy:''},
    {name: 'QlikView5', occupied:false, occupiedBy:''},
    {name: 'QlikView6', occupied:false, occupiedBy:''},
    {name: 'QlikView7', occupied:false, occupiedBy:''},
    {name: 'QlikView14', occupied:false, occupiedBy:''},
    {name: 'QlikView15', occupied:false, occupiedBy:''},
];

function seed(db) {
    // remove all ducuments
    db.remove({}, { multi: true }, function (err, numRemoved) {
        console.log('removed ' + numRemoved + ' login documents.');
    });

    // seed data
    db.insert(logins, function(err, newDocs) {
        console.log('inserted new logins');
        console.log(newDocs)
    });
}

seed(database);

// test some queries
var login1 = database.findOne({'name': 'QlikView15'}, function(err, docs) {
    
    console.log(docs);
});
console.log(login1);
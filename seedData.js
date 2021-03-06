'use strict';
/*
    This module seeds initial data for the logins.
    Run this initially or when you want to reset
*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://rohit:rohit@ds023418.mlab.com:23418/affinitasqlmdev';

var logins = [
    {name: 'QlikView4', occupied:false, occupiedBy:'', team: 'programmatic'},
    {name: 'QlikView5', occupied:false, occupiedBy:'', team: 'programmatic'},
    {name: 'QlikView6', occupied:false, occupiedBy:'', team: 'programmatic'},
    {name: 'QlikView7', occupied:false, occupiedBy:'', team: 'programmatic'},
    {name: 'QlikView14', occupied:false, occupiedBy:'', team: 'programmatic'},
    {name: 'QlikView15', occupied:false, occupiedBy:'', team: 'programmatic'},
    {name: 'QlikView27', occupied:false, occupiedBy:'', team: 'programmatic'},
    {name: 'QlikView21', occupied:false, occupiedBy:'', team: 'programmatic'},
    {name: 'QlikView2', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikView3', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikView9', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikView10', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikView11', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikView12', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikView13', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikView20', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikView25', occupied:false, occupiedBy:'', team: 'display'},
    {name: 'QlikProduct', occupied:false, occupiedBy:'', team: 'product'},
    {name: 'QlikProduct2', occupied:false, occupiedBy:'', team: 'product'},
    {name: 'QlikProduct3', occupied:false, occupiedBy:'', team: 'product'},
];

function seed() {
    MongoClient.connect(url, function(err, db) {
        var col = db.collection('logins'); // Get the collection
        console.log('remove previous data');
        col.removeMany();
        console.log('seeding ...');
        col.insertMany(logins, function(e, r) {
            assert.equal(null, e);
            console.log(r.insertedCount);
            db.close();
        });
    });
}

seed();

// TODO: test some queries
MongoClient.connect(url, function(err, db) {
    var collection = db.collection('logins');
    collection.find().toArray().then(function(docs) {
        console.log('found the following docs');
        assert.equal(6, docs.length);
        console.log(docs);
        db.close();
    });
});

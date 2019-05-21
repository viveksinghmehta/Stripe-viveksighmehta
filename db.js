


const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbName = "LocationSavingLogFile";
const url = "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser : true};

const state = {
    db = null
};

const connet = function(cb) {
    if (state.db) {
        cb();
    } else {
        MongoClient.connect(url, mongoOptions, function(err, client) {
            state.db = client.db(dbName);
            cb();
        });
    }
}

const getPrimaryKey = function(_id) {
    return ObjectID(_id);
}



const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;
// const dbName = "LocationSavingLogFile";
// const url = "mongodb://localhost:27017";
// const mongoOptions = { useNewUrlParser : true };


// const MongoClient = require(‘mongodb’).MongoClient;
const uri = "mongodb+srv://viveksinghmehta:<123456Seven>@locationlogs-hgop8.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
const state = {
    db = null
};

const connet = function(cb) {
    if (state.db) {
        cb();
    } else {
        MongoClient.connect(uri, mongoOptions, function(err, client) {
            state.db = client.db(dbName);
            cb();
        });
    }
}

const getPrimaryKey = function(_id) {
    return ObjectID(_id);
}
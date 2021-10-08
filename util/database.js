const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://andresrodrock:200694@testcluster.h472u.mongodb.net/shop?retryWrites=true&w=majority'
        )
            .then(client => {
                console.log('Conected')   
                _db = client.db();
                callback();
            })
            .catch(err => {
                console.log(err)
                throw err;
            });
};

const getDb = () => {
    if (_db){
        return _db;
    }
    throw 'No database'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
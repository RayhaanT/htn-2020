const mongoose = require('mongoose');
const config = require('../config/env.config');
let count = 0;

mongoose.set('useFindAndModify', false);

const options = {
    dbName: 'ReuseRepo',
    autoIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
};

const connectWithRetry = () => {
    mongoose.connect(config.dbConn, options)
    .then(() => {
        console.log('MongoDB is connected');
    });
};

connectWithRetry();

exports.mongoose = mongoose;
exports.options = options;

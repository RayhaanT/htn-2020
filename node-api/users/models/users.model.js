const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    age: {
        type: Number,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    permission: Number,
    priority: Number,
    vaccinated: {
        type: Boolean,
        default: false
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);

exports.findByEmail = (email) => {
    return User.find({email: email});
};

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            if(result == null) {
                return null;
            }
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            delete result.salt;
            delete result.hash;
            return result;
        });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


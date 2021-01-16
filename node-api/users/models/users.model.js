const pool = require('../../common/services/cockroach.service').pool;

// const userSchema = new Schema({
//     firstName: String,
//     lastName: String,
//     age: {
//         type: Number,
//         required: true
//     },
//     occupation: {
//         type: String,
//         required: true
//     },
//     longitude: {
//         type: Number,
//         required: true
//     },
//     latitude: {
//         type: Number,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     hash: String,
//     salt: String,
//     permission: Number,
//     priority: Number,
//     vaccinated: {
//         type: Boolean,
//         default: false
//     }
// });

// userSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// // Ensure virtual fields are serialised.
// userSchema.set('toJSON', {
//     virtuals: true
// });

// userSchema.findById = function (cb) {
//     return this.model('Users').find({id: this.id}, cb);
// };

// const User = mongoose.model('Users', userSchema);

exports.findByEmail = (email) => {
    return pool.query('SELECT * FROM users WHERE email = $1', [email]);
};

exports.findById = (id) => {
    return pool.query('SELECT * FROM users WHERE id = $1', [id]);
};

exports.createUser = (userData, res) => {
    let age = userData.age;
    let occupation = userData.occupation;
    let longitude = userData.longitude;
    let latitude = userData.latitude;
    let name = userData.name;
    let hash = userData.hash;
    let salt = userData.salt;
    let email = userData.email;
    let permission = userData.permission;
    let priority = userData.priority;
    let vaccinated = userData.vaccinated;
    const query =   'INSERT INTO users (age, occupation, longitude, latitude, name, hash, salt, email, permission, priority, vaccinated)\
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) \
                     RETURNING id';
    const params = [age, occupation, longitude, latitude, name, hash, salt, email, permission, priority, vaccinated];

    return pool.query(query, params);
};

exports.removeById = (userId) => {
    return pool.query('DELETE FROM users WHERE id = $1', [userId]);
};

exports.vaccinateUser = (userId) => {
    return pool.query("UPDATE users SET vaccinated = true WHERE id = $1", [userId]);
}


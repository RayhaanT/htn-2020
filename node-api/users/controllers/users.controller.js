const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.register = (req, res) => {
    UserModel.findByEmail(req.body.email)
        .then((user) => {
            if (user[0]) {
                res.status(406).send({error: "An account with this email already exists"});
            }
            registerRequest(req, res);
        });
    
};

function registerRequest(req, res) {    
    let salt = crypto.randomBytes(16).toString('base64');
    req.body.salt = salt;
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.hash = hash;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        })
        .catch((err) => {
            res.status(406).send(err);
        });
}

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            if(result == null) {
                res.status(404).send({ error: "User not found" });
            }
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    // Disallow updating email and username to prevent duplicate conflicts
    delete req.body.email;
    delete req.body.username;

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};
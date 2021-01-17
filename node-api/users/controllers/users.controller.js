const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.register = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    req.body.salt = salt;
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.hash = hash;
    req.body.name = req.body.firstName + " " + req.body.lastName;
    req.body.priority = req.body.age;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({ id: result.rows[0].id });
        })
        .catch((err) => {
            res.status(406).send(err);
        });
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            if(result == null) {
                res.status(404).send({ error: "User not found" });
            }
            delete result.rows[0].hash;
            delete result.rows[0].salt;
            res.status(200).send(result.rows[0]);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

exports.vaccinateById = (req, res) => {
    // Disallow updating email and username to prevent duplicate conflicts
    delete req.body.email;
    delete req.body.username;

    UserModel.vaccinateUser(req.params.userId)
        .then((result) => {
            res.status(200).send({message: "success"});
        })
        .catch((err) => {
            res.status(400).send(err);
        });

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};
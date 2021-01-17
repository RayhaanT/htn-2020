const HeatModel = require('../models/heatmap.model');
const crypto = require('crypto');

exports.getData = (req, res) => {
    HeatModel.getAllCoords()
        .then((results) => {
            console.log(results);
            res.status(200).send(results.rows);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

exports.getEligible = (req, res) => {
    HeatModel.getEligible(req.body.priority, req.body.occupations)
        .then((results) => {
            res.status(200).send(results.rows);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}
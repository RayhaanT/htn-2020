const UsersController = require('./controllers/heatmap.controller');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const NORMAL = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.get('/heatmap', [
        UsersController.register
    ]);
};
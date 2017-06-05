/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}
    repositories['campaign'] = require('./campaign').createRepository(options);
    repositories['tasks'] = require('./tasks').createRepository(options);
    repositories['workers'] = require('./workers').createRepository(options);
    repositories['current_user'] = {
        "token":"7a26f105-287a-431a-99ac-eb16744e7603",
        "fullname":"Remo Fiorentino Casadiego",
        "username":"remo",
        "type":"master"
    };
    return repositories;
};

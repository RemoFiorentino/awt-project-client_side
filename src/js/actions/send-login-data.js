/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['password']
    // parameters['username']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    alert("amarildo fucking prick");
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'send-login-data'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'on-login-worker-success', // on-login-worker-success
        // event: 'on-login-failure', // on-login-failure
        // event: 'on-login-manager-success', // on-login-manager-success
        data: {
            'token': '0',
        }
    });
    // THIS CAN BE REMOVED (END)
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};

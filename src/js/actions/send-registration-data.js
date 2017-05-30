/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    $ = require('jquery');

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    Parameters:
    parameters['account-type']
    parameters['fullname']
    parameters['password']
    parameters['username']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    var data = {
        "fullname": parameters['fullname'],
        "username": parameters['username'],
        "password": parameters['password'],
        "type": parameters['account-type']
    };
    $.ajax({
    url: "http://awt.ifmledit.org/api/user",
    type: "POST",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIKey fb72e1fe-3583-11e7-a919-92ebcb67fe33");
    },
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function(result){
        alert("it works")
    },
      statusCode: {
        400: function(xhr) {
          data =  xhr.responseText;
          alert(solve);
          solve.resolve();
          return solve(event='on-registration-failure', data=data);
        }
    }}).then(solve);
    // THIS CAN BE REMOVED (BEGIN)
    //$.notify({message: 'send-registration-data'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'on-registration-failure', // on-registration-failure
        // event: 'on-registration-worker-success', // on-registration-worker-success
        // event: 'on-registration-manager-success', // on-registration-manager-success
        data: data,
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

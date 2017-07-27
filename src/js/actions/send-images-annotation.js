/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    $ = require('jquery'),
    option = undefined;

function Action(options) { // add "options" parameters if needed
    // TODO: Global Initialization
    option = options.repositories;
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    Parameters:
    parameters['line']
    parameters['id']
    parameters['type']
    var dataToSend = {
        "skyline": parameters['line'],
    }
    console.log("send")
    $.ajax({
    url: "http://awt.ifmledit.org"+ parameters['id'] +"/session",
    type: "PUT",
    data: JSON.stringify(dataToSend),
    dataType: 'json',
    contentType: "application/json",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+ option.current_user.token);
    },
    success: function(result){
        var myobj = result;
        var data = {
                'id': parameters['id'],
                'init': "false"
            }
        solve({
            event: 'image-annotation-go', 
            data: data
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
        if(xhr.status == 200){
            var data = {
                'id': parameters['id'],
                'init': "false"
            }
            solve({
                event: 'image-annotation-go', 
                data: data
            });
        }
        
    }
    });
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

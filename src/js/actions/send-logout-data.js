/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    $ = require('jquery');
var option;

function Action(options) { 
    // TODO: Global Initialization
    option = options.repositories;
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    var data = {};
    $.ajax({
    url: "http://awt.ifmledit.org/api/auth",
    type: "DELETE",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+option.current_user.token);
    },
    contentType: "application/json",
    success: function(result){
        var myobj = result;
        option.current_user = {}
        solve({
            event: 'home',
            data: data
        });
    }});
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

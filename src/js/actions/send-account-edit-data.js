/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    $ = require('jquery');

var option;

function Action(options) { // add "options" parameters if needed
    // TODO: Global Initialization
    option = options.repositories;
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    Parameters:
    parameters['fullname']
    parameters['password']
    var data = {};
    var datos = {
        "fullname": parameters['fullname'],
        "password": parameters['password'],
    };
    $.ajax({
    url: "http://awt.ifmledit.org/api/user/me",
    type: "PUT",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+option.current_user.token);
    },
    data: JSON.stringify(datos),
    contentType: "application/json",
    success: function(result){
        var myobj = result;
        option.current_user.fullname = datos.fullname
        if(option.current_user.type.toUpperCase() === "MASTER"){
                solve({
                    event: 'manager-go', // manager-go
                    data: data
                });
        }else{
            solve({
                event: 'task-go', // task-go
                data: data
            });
        }
    },
    error:  function(xhr) {
        //data =  xhr.responseText;
        var myobj = JSON.parse(xhr.responseText);
        data ={
            fields:{
                "fullname": parameters['fullname'],
            },
            errors:{
                'password': myobj.error.password,
                'fullname': myobj.error.fullname,
            }
        }
        if(typeof(myobj.error) === 'string'){
            data.errors['others'] = myobj.error;
        }
        solve({
            event: 'account-edit-failure', 
            data: data
        });
    }});
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

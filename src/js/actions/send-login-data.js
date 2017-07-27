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
    Parameters:
    parameters['password'];
    parameters['username'];
    var data = {};
    var datos = {
        "username": parameters['username'],
        "password": parameters['password'],
    };
    $.ajax({
    url: "http://awt.ifmledit.org/api/auth",
    type: "POST",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIKey fb72e1fe-3583-11e7-a919-92ebcb67fe33");
    },
    data: JSON.stringify(datos),
    contentType: "application/json",
    success: function(result){
        var myobj = result;
        option.current_user = {
            "username": datos.username,
            "token": myobj.token
        }
        $.ajax({
        url: "http://awt.ifmledit.org/api/user/me",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+myobj.token);
        },
        success: function(result){
            var myobj2 = result;
            option.current_user = {
                "fullname": myobj2.fullname,
                "username": datos.username,
                "token": myobj.token,
                "type": myobj2.type
            }
            if(myobj2.type.toUpperCase() === "MASTER"){
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
        }
        });
    },
    error:  function(xhr) {
        //data =  xhr.responseText;
        var myobj = JSON.parse(xhr.responseText);
        data ={
            fields:{
                "username": parameters['username'],
            },
            errors:{
                'password': myobj.error.password,
                'username': myobj.error.username,
            }
        }
        if(typeof(myobj.error) === 'string'){
            data.errors['others'] = myobj.error;
        }
        solve({
            event: 'login-failure', 
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

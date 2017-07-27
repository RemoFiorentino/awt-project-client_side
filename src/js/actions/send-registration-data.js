/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    $ = require('jquery');
var option;

function Action(options) { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    */
    option = options.repositories;
    
}
Action.prototype.run = function (parameters, solve,options) { // add "onCancel" parameters if needed
    Parameters:
    parameters['account-type'];
    parameters['fullname'];
    parameters['password'];
    parameters['username'];
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    var data = {};
    var datos = {
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
    data: JSON.stringify(datos),
    contentType: "application/json",
    success: function(result){
        $.ajax({
        url: "http://awt.ifmledit.org/api/auth",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIKey fb72e1fe-3583-11e7-a919-92ebcb67fe33");
        },
        data: JSON.stringify({
            "username": datos.username,
            "password": datos.password
        }
        ),
        contentType: "application/json",
        success: function(result){
            var myobj = result;
            option.current_user = {
                "fullname": datos.fullname,
                "username": datos.username,
                "type": datos.type,
                "token": myobj.token
            }
            if(datos.type.toUpperCase() === "MASTER"){
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
                "fullname": parameters['fullname'],
                "username": parameters['username'],
                "password": parameters['password'],
                "type": parameters['account-type']
            },
            errors:{
                'account-type': myobj.error.type,
                'fullname': myobj.error.fullname,
                'password': myobj.error.password,
                'username': myobj.error.username
            }
        }
        solve({
            event: 'register-failure', // register-failure
            // event: 'task-go', // task-go
            // event: 'manager-go', // manager-go
            data: data
        });
    }});
    // THIS CAN BE REMOVED (BEGIN)
    //$.notify({message: 'send-registration-data'}, {allow_dismiss: true, type: 'success'});
    
    // THIS CAN BE REMOVED (END)
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data,context) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel, options);
        });
    };
};

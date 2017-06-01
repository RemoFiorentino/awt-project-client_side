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
    parameters['annotation_replica']
    parameters['annotation_size']
    parameters['name']
    parameters['selection_replica']
    parameters['threshold']
    var data = {};
    var datos = {
        "annotation_replica": parseInt(parameters['annotation_replica']),
        "annotation_size": parseInt(parameters['annotation_size']),
        "name": parameters['name'],
        "selection_replica": parseInt(parameters['selection_replica']),
        "threshold": parseInt(parameters['threshold']),
    };
    $.ajax({
    url: "http://awt.ifmledit.org/api/campaign",
    type: "POST", 
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+option.current_user.token);
    },
    data: JSON.stringify(datos),
    contentType: "application/json",
    success: function(result){
        var myobj = result;
        solve({
            event: 'manager-go', 
            data: data
        });
    },
    error:  function(xhr) {
        var myobj = JSON.parse(xhr.responseText);
        data ={
            fields:{
                "annotation_replica": parameters['annotation_replica'],
                "annotation_size": parameters['annotation_size'],
                "name": parameters['name'],
                "selection_replica": parameters['selection_replica'],
                "threshold": parameters['threshold'],
            },
            errors:{
                "annotation_replica": myobj.error['annotation_replica'],
                "annotation_size": myobj.error['annotation_size'],
                "name": myobj.error['name'],
                "selection_replica": myobj.error['selection_replica'],
                "threshold": myobj.error['threshold'],
            }
        }
        if(typeof(myobj.error) === 'string'){
            data.errors['others'] = myobj.error;
        }
        solve({
            event: 'campaign-create-failure', 
            data: data
        });
    }});
    // TODO: Execution
    // solve({
    //     event: 'campaign-create-failure', // campaign-create-failure
    //     // event: 'image-upload-go', // image-upload-go
    //     data: {
    //         'Location': '0',
    //     }
    // });
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

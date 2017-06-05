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
    parameters['id']
    var data = {};
    var datos = {
        "annotation_replica": parseInt(parameters['annotation_replica']),
        "annotation_size": parseInt(parameters['annotation_size']),
        "name": parameters['name'],
        "selection_replica": parseInt(parameters['selection_replica']),
        "threshold": parseInt(parameters['threshold']),
    };
    $.ajax({
    url: "http://awt.ifmledit.org" + parameters['id'],
    type: "PUT", 
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+option.current_user.token);
    },
    data: JSON.stringify(datos),
    contentType: "application/json",
    success: function(result){
        var myobj = result;
        datos.id = parameters['id'];
        solve({
            event: 'image-upload-go', 
            data: datos
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
                "id": parameters['id']
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
            event: 'campaign-edit-failure', 
            data: data
        });
    }});
    // $.notify({message: 'send-edit-campaign'}, {allow_dismiss: true, type: 'success'});
    // solve({
    //     event: 'campaign-edit-go', // campaign-edit-go
    //     // event: 'campaign-edit-failure', // campaign-edit-failure
    //     data: {
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

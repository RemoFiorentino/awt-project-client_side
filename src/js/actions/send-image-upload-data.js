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
    parameters['image'];
    parameters['id'];
    parameters['images'];
    var data = {};
    var formData = new FormData();
      formData.append("img", parameters['image'])
    $.ajax({
      url: "http://awt.ifmledit.org" + parameters['id'] + "/image" ,
      type: 'POST',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+option.current_user.token);
      },
      success: function(result, textStatus, request){
        var new_url = request.getResponseHeader('location');
        $.ajax({
        url: "http://awt.ifmledit.org" + new_url,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+option.current_user.token);
        },
        success: function(result){
            var myobj = result;
            data.id = parameters['id'];
            data.images = parameters['images'];
            data.new_image = {
              "id": myobj.id,
              "canonical": myobj.canonical,
            }
            solve({
                event: 'image-upload-go', 
                data: data
            });
        }
        });
      },
      error:  function(xhr) {
        var myobj = JSON.parse(xhr.responseText);
        data ={
            id: parameters['id'],
            images: parameters['images'],
            errors:{
                "image": myobj.error['image']
            }
        }
        if(typeof(myobj.error) === 'string'){
            data.errors['others'] = myobj.error;
        }
        solve({
            event: 'image-upload-failure', 
            data: data
        });
    }});
    // $.notify({message: 'send-image-upload-data'}, {allow_dismiss: true, type: 'success'});
    // solve({
    //     event: 'image-upload-failure', // image-upload-failure
    //     // event: 'worker-select-go', // worker-select-go
    //     data: {
    //         'location': '0',
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

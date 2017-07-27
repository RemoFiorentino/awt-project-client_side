(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'send-account-edit-data': require('./send-account-edit-data').createAction(options)
        ,'send-create-campaign-data': require('./send-create-campaign-data').createAction(options)
        ,'send-edit-campaign': require('./send-edit-campaign').createAction(options)
        ,'send-image-selection': require('./send-image-selection').createAction(options)
        ,'send-image-upload-data': require('./send-image-upload-data').createAction(options)
        ,'send-images-annotation': require('./send-images-annotation').createAction(options)
        ,'send-logout-data': require('./send-logout-data').createAction(options)
        ,'send-login-data': require('./send-login-data').createAction(options)
        ,'send-registration-data': require('./send-registration-data').createAction(options)
    };
};

},{"./send-account-edit-data":2,"./send-create-campaign-data":3,"./send-edit-campaign":4,"./send-image-selection":5,"./send-image-upload-data":6,"./send-images-annotation":7,"./send-login-data":8,"./send-logout-data":9,"./send-registration-data":10}],2:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
    
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
    success: function(result, textStatus, request){
        var myobj = result;
        data.id = request.getResponseHeader('location')
        console.log(request.getResponseHeader('location'))
        solve({
            event: 'image-upload-go', 
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
    
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    option = undefined;

function Action(options) { // add "options" parameters if needed
    // TODO: Global Initialization
    option = options.repositories;
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    Parameters:
    parameters['accepted']
    parameters['id']
    parameters['type']
    var dataToSend = {
        "accepted": Boolean(parameters['accepted']),
    }
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
            event: 'image-selection-go', 
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
                event: 'image-selection-go', 
                data: data
            });
        }
        
    }
    });
    // THIS CAN BE REMOVED (BEGIN)
    // $.notify({message: 'send-image-selection'}, {allow_dismiss: true, type: 'success'});
    // solve({
    //     event: 'image-selection-go', // image-selection-go
    //     // event: 'task-go', // task-go
    //     data: {
    //     }
    // });
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
    
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],11:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">Edit Account</legend>\n<form>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;fullname&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;fullname&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;fullname&#39;]}\" for=\"account-edit-form_field_0\">Fullname</label>\n<input aria-describedby=\"account-edit-form_field_0_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;fullname&#39;]\" id=\"account-edit-form_field_0\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;fullname&#39;]\" id=\"account-edit-form_field_0_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;password&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;password&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;password&#39;]}\" for=\"account-edit-form_field_1\">Password</label>\n<input aria-describedby=\"account-edit-form_field_1_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;password&#39;]\" id=\"account-edit-form_field_1\" type=\"password\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;password&#39;]\" id=\"account-edit-form_field_1_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;confirm_password&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;confirm_password&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;confirm_password&#39;]}\" for=\"account-edit-form_field_1\">Confirm Password</label>\n<input aria-describedby=\"account-edit-form_field_1_error\" class=\"form-control validate\" data-bind=\"textInput: fields()[&#39;confirm_password&#39;]\" id=\"account-edit-form_field_1\" type=\"password\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;confirm_password&#39;]\" id=\"account-edit-form_field_1_error\"></span>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;account-edit-submit&#39;)\">\nSubmit\n</a>\n<br>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],12:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        var flag = true;
        for (var key in self.errors()) {
          if (self.errors().hasOwnProperty(key)) {
            if(self.errors()[key]() != undefined){
                flag = false
            }
          }
        }
        if(flag){
            self.context.events[id](self.context, self.output);
        }
    };
}

ViewModel.prototype.fill = function (errors_sent) {
    this.fields()['fullname'](this.context.repositories['current_user'].fullname);
    this.fields()['password'](this.context.repositories['current_user'].password);
    this.errors()['fullname'](errors_sent.fullname);
    this.errors()['password'](errors_sent.password);
    this.errors()['others'](errors_sent.others);
};

ViewModel.prototype.id = 'account-edit-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'fullname': this.input['fullname'],
        'password': this.input['password'],
        'confirm_password': this.input['confirm_password'],
    }
    var self = this,
        fields = {
            'fullname': ko.observable(this.input['fullname']),
            'password': ko.observable(this.input['password']),
            'confirm_password': ko.observable(this.input['confirm_password']),
        },
        errors = {
            'fullname': ko.observable(this.input['fullname-error']),
            'password': ko.observable(this.input['password-error']),
            'confirm_password': ko.observable(this.input['confirm_password-error']),
            'others': ko.observable(),
        };
    fields['fullname'].subscribe(function (value) {
        self.output['fullname'] = value;
        self.errors()['fullname'](undefined);
    });
    fields['password'].subscribe(function (value) {
        self.output['password'] = value;
        self.errors()['password'](undefined);
        if(self.output['confirm_password'] != self.output['password']){
            self.errors()['confirm_password']("Must match password");
        }else{
            self.errors()['confirm_password'](undefined);
        }
    });
    fields['confirm_password'].subscribe(function (value) {
        self.output['confirm_password'] = value;
        if(self.output['confirm_password'] != self.output['password']){
            self.errors()['confirm_password']("Must match password");
        }else{
            self.errors()['confirm_password'](undefined);
        }
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options, errors) {
    options = options || {};
    errors = errors || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.fill(errors);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-account-edit-form', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":11}],13:[function(require,module,exports){
module.exports = "<span>    <!-- account-edit-form -->    <c-account-edit-form params=\"context: context\"></c-account-edit-form></span>";

},{}],14:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'account-edit-view';
ViewModel.prototype.children = [
    'account-edit-form' // account-edit-form
];

exports.register = function () {
    ko.components.register('c-account-edit-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":13}],15:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">\n<b>\nCreate a Campaign!\n</b>\n</legend>\n<form class=\"form-horizontal\">\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;name&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-4 text__allign--left\" data-bind=\"css: {active: fields()[&#39;name&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;name&#39;]}\" for=\"create-campaign-form_field_2\">\n<b>\nName of campaign:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-8\">\n<input aria-describedby=\"create-campaign-form_field_2_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;name&#39;]\" id=\"create-campaign-form_field_2\" placeholder=\"A good name\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;name&#39;]\" id=\"create-campaign-form_field_2_error\"></span>\n</div>\n</div>\n<legend>Image Selection</legend>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;selection_replica&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;selection_replica&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;selection_replica&#39;]}\" for=\"create-campaign-form_field_3\">\n<b>\nMinimum number of workers per image:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"create-campaign-form_field_3_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;selection_replica&#39;]\" id=\"create-campaign-form_field_3\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;selection_replica&#39;]\" id=\"create-campaign-form_field_3_error\"></span>\n</div>\n</div>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;threshold&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;threshold&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;threshold&#39;]}\" for=\"create-campaign-form_field_4\">\n<b>\nMinimum number of positive results:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"create-campaign-form_field_4_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;threshold&#39;]\" id=\"create-campaign-form_field_4\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;threshold&#39;]\" id=\"create-campaign-form_field_4_error\"></span>\n</div>\n</div>\n<legend>Image Annotation</legend>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;annotation_replica&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;annotation_replica&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;annotation_replica&#39;]}\" for=\"create-campaign-form_field_0\">\n<b>\nMinimum number of workers per image:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"create-campaign-form_field_0_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;annotation_replica&#39;]\" id=\"create-campaign-form_field_0\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;annotation_replica&#39;]\" id=\"create-campaign-form_field_0_error\"></span>\n</div>\n</div>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;annotation_size&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;annotation_size&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;annotation_size&#39;]}\" for=\"create-campaign-form_field_1\">\n<b>\nWidth(in pixels) of the annotation line:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"create-campaign-form_field_1_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;annotation_size&#39;]\" id=\"create-campaign-form_field_1\" max=\"10\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;annotation_size&#39;]\" id=\"create-campaign-form_field_1_error\"></span>\n</div>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;campaign-create-submit&#39;)\">\nCREATE\n</a>\n<br>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],16:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'create-campaign-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.fill = function (errors_sent,fields_sent) {
    if (!$.isEmptyObject(fields_sent)){
        this.fields()['annotation_replica'](fields_sent.annotation_replica);
        this.fields()['annotation_size'](fields_sent.annotation_size);
        this.fields()['name'](fields_sent.name);
        this.fields()['selection_replica'](fields_sent.selection_replica);
        this.fields()['threshold'](fields_sent.threshold);
    }
    this.errors()['annotation_replica'](errors_sent.annotation_replica);
    this.errors()['annotation_size'](errors_sent.annotation_size);
    this.errors()['name'](errors_sent.name);
    this.errors()['selection_replica'](errors_sent.selection_replica);
    this.errors()['threshold'](errors_sent.threshold);
    this.errors()['others'](errors_sent.others);
};

ViewModel.prototype._compute = function () {
    this.output = {
        'annotation_replica': this.input['annotation_replica'],
        'annotation_size': this.input['annotation_size'],
        'name': this.input['name'],
        'selection_replica': this.input['selection_replica'],
        'threshold': this.input['threshold'],
    }
    var self = this,
        fields = {
            'annotation_replica': ko.observable(this.input['annotation_replica']),
            'annotation_size': ko.observable(this.input['annotation_size']),
            'name': ko.observable(this.input['name']),
            'selection_replica': ko.observable(this.input['selection_replica']),
            'threshold': ko.observable(this.input['threshold']),
        },
        errors = {
            'annotation_replica': ko.observable(this.input['annotation_replica-error']),
            'annotation_size': ko.observable(this.input['annotation_size-error']),
            'name': ko.observable(this.input['name-error']),
            'selection_replica': ko.observable(this.input['selection_replica-error']),
            'threshold': ko.observable(this.input['threshold-error']),
            'others': ko.observable(),
        };
    fields['annotation_replica'].subscribe(function (value) {
        self.output['annotation_replica'] = value;
        self.errors()['annotation_replica'](undefined);
    });
    fields['annotation_size'].subscribe(function (value) {
        self.output['annotation_size'] = value;
        self.errors()['annotation_size'](undefined);
    });
    fields['name'].subscribe(function (value) {
        self.output['name'] = value;
        self.errors()['name'](undefined);
    });
    fields['selection_replica'].subscribe(function (value) {
        self.output['selection_replica'] = value;
        self.errors()['selection_replica'](undefined);
    });
    fields['threshold'].subscribe(function (value) {
        self.output['threshold'] = value;
        self.errors()['threshold'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options,errors,fields) {
    options = options || {};
    errors = errors || {};
    fields = fields || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.fill(errors,fields);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-create-campaign-form', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":15}],17:[function(require,module,exports){
module.exports = "<span>\n  <!-- create-campaign-form -->\n  <c-create-campaign-form params=\"context: context\">\n  </c-create-campaign-form>\n</span>";

},{}],18:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'create-campaign-view';
ViewModel.prototype.children = [
    'create-campaign-form' // create-campaign-form
];

exports.register = function () {
    ko.components.register('c-create-campaign-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":17}],19:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">\n<b>\nEdit your Campaign!\n</b>\n</legend>\n<form class=\"form-horizontal\">\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;name&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-4 text__allign--left\" data-bind=\"css: {active: fields()[&#39;name&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;name&#39;]}\" for=\"edit-campaign-form_field_2\">\n<b>\nName of campaign:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-8\">\n<input aria-describedby=\"edit-campaign-form_field_2_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;name&#39;]\" id=\"edit-campaign-form_field_2\" placeholder=\"A good name\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;name&#39;]\" id=\"edit-campaign-form_field_2_error\"></span>\n</div>\n</div>\n<legend>Image Selection</legend>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;selection_replica&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;selection_replica&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;selection_replica&#39;]}\" for=\"edit-campaign-form_field_3\">\n<b>\nMinimum number of workers per image:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"edit-campaign-form_field_3_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;selection_replica&#39;]\" id=\"edit-campaign-form_field_3\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;selection_replica&#39;]\" id=\"edit-campaign-form_field_3_error\"></span>\n</div>\n</div>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;threshold&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;threshold&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;threshold&#39;]}\" for=\"edit-campaign-form_field_4\">\n<b>\nMinimum number of positive results:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"edit-campaign-form_field_4_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;threshold&#39;]\" id=\"edit-campaign-form_field_4\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;threshold&#39;]\" id=\"edit-campaign-form_field_4_error\"></span>\n</div>\n</div>\n<legend>Image Annotation</legend>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;annotation_replica&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;annotation_replica&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;annotation_replica&#39;]}\" for=\"edit-campaign-form_field_0\">\n<b>\nMinimum number of workers per image:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"edit-campaign-form_field_0_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;annotation_replica&#39;]\" id=\"edit-campaign-form_field_0\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;annotation_replica&#39;]\" id=\"edit-campaign-form_field_0_error\"></span>\n</div>\n</div>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;annotation_size&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;annotation_size&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;annotation_size&#39;]}\" for=\"edit-campaign-form_field_1\">\n<b>\nWidth(in pixels) of the annotation line:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"edit-campaign-form_field_1_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;annotation_size&#39;]\" id=\"edit-campaign-form_field_1\" max=\"30\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;annotation_size&#39;]\" id=\"edit-campaign-form_field_1_error\"></span>\n</div>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;campaign-edit-submit&#39;)\">\nEDIT\n</a>\n<br>\n<p class=\"margin__top--10px\">\nI want to upload images,\n<a data-bind=\"click: trigger.bind($data,&#39;image-upload-go&#39;)\">\nImages Upload\n</a>\n</p>\n<p class=\"margin__top--10px\">\nI want to select workers,\n<a data-bind=\"click: trigger.bind($data,&#39;worker-select-go&#39;)\">\nSelect Worker\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],20:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.fill = function (errors_sent,fields_sent) {
    if (!$.isEmptyObject(fields_sent)){
        this.fields()['annotation_replica'](fields_sent.annotation_replica);
        this.fields()['annotation_size'](fields_sent.annotation_size);
        this.fields()['name'](fields_sent.name);
        this.fields()['selection_replica'](fields_sent.selection_replica);
        this.fields()['threshold'](fields_sent.threshold);
        this.output.id = fields_sent.id;
    }
    this.errors()['annotation_replica'](errors_sent.annotation_replica);
    this.errors()['annotation_size'](errors_sent.annotation_size);
    this.errors()['name'](errors_sent.name);
    this.errors()['selection_replica'](errors_sent.selection_replica);
    this.errors()['threshold'](errors_sent.threshold);
    this.errors()['others'](errors_sent.others);
};

ViewModel.prototype.id = 'edit-campaign-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'annotation_replica': this.input['annotation_replica'],
        'annotation_size': this.input['annotation_size'],
        'name': this.input['name'],
        'selection_replica': this.input['selection_replica'],
        'threshold': this.input['threshold'],
    }
    var self = this,
        fields = {
            'annotation_replica': ko.observable(this.input['annotation_replica']),
            'annotation_size': ko.observable(this.input['annotation_size']),
            'name': ko.observable(this.input['name']),
            'selection_replica': ko.observable(this.input['selection_replica']),
            'threshold': ko.observable(this.input['threshold']),
        },
        errors = {
            'annotation_replica': ko.observable(this.input['annotation_replica-error']),
            'annotation_size': ko.observable(this.input['annotation_size-error']),
            'name': ko.observable(this.input['name-error']),
            'selection_replica': ko.observable(this.input['selection_replica-error']),
            'threshold': ko.observable(this.input['threshold-error']),
            'others': ko.observable(),
        };
    fields['annotation_replica'].subscribe(function (value) {
        self.output['annotation_replica'] = value;
        self.errors()['annotation_replica'](undefined);
    });
    fields['annotation_size'].subscribe(function (value) {
        self.output['annotation_size'] = value;
        self.errors()['annotation_size'](undefined);
    });
    fields['name'].subscribe(function (value) {
        self.output['name'] = value;
        self.errors()['name'](undefined);
    });
    fields['selection_replica'].subscribe(function (value) {
        self.output['selection_replica'] = value;
        self.errors()['selection_replica'](undefined);
    });
    fields['threshold'].subscribe(function (value) {
        self.output['threshold'] = value;
        self.errors()['threshold'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options,errors,fields) {
    options = options || {};
    errors = errors || {};
    fields = fields || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.fill(errors,fields);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-edit-campaign-form', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":19}],21:[function(require,module,exports){
module.exports = "<span>    \n  <!-- edit-campaign-form -->    \n  <c-edit-campaign-form params=\"context: context\">\n  </c-edit-campaign-form>\n</span>";

},{}],22:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'edit-campaign-view';
ViewModel.prototype.children = [
    'edit-campaign-form' // edit-campaign-form
];

exports.register = function () {
    ko.components.register('c-edit-campaign-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":21}],23:[function(require,module,exports){
module.exports = "<div class=\"jumbotron\">\n<h1>Mountain Flag</h1>\n<p>The manager can create one or more crowdsourcing campaigns. A campaign has a name, some configuration parameters and a set of input images. Aim of the campaign is the annotation of images with the skyline of the landscape. A preliminary step allows workers to validate or discard the images to be annotated: only the images that contain a mountain profile will pass this first stage and therefore are selected; they will be then annotated. Each task is executed by a set of workers; the assignment of the images to each worker is decided by means of a scheduling algorithm, which is based on parameters associated with the campaign (the algorithm needs not be realized and will be provided through APIs).</p>\n</div>";

},{}],24:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'home-bar';
ViewModel.prototype.children = [];

exports.register = function () {
    ko.components.register('c-home-bar', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":23}],25:[function(require,module,exports){
module.exports = "<div class=\"well\">\n<div class=\"row\">\n<div class=\"col-xs-6 col-xs-offset-3\">\n<legend class=\"text-center\">\nAnnotate the Image!!\n</legend>\n</div>\n</div>\n<div data-bind=\"if: image_presence()\">\n<br>\n<div class=\"row\">\n<div class=\"col-xs-12 col-sm-5 col-sm-offset-1 text-right\">\n<a class=\"btn btn-primary\" data-bind=\"click: clear\">\nClear\n</a>\n</div>\n<div class=\"col-xs-12 col-sm-5\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;image-annotation-submit&#39;)\">\nSubmit\n</a>\n</div>\n</div>\n<div class=\"row\" data-bind=\"if: imgUrl() != undefined\">\n<div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n<div class=\"panel panel-default\">\n<div class=\"panel-body text-center\">\n<line-drawer params=\"context: context, src: &#39;http://awt.ifmledit.org&#39; + imgUrl(), pen: size, line: line\"></line-drawer>\n<!-- /%div{\"data-bind\" => \"component: { name: 'line-drawer', params: {context: context, src: 'http://awt.ifmledit.org' + imgUrl(), pen: size(), line: line()}}\"} -->\n<!-- /%line-drawer{:params => \"context:context,src: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg', pen: 10, line: line\"} -->\n<!-- /%img.img-responsive.center-block{\"data-bind\" => \"attr:{src:  'http://awt.ifmledit.org' + imgUrl () || '#' }\"}/ -->\n</div>\n</div>\n</div>\n</div>\n</div>\n<div data-bind=\"if: !image_presence()\">\n<div class=\"row\">\n<div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n<h3 class=\"text-center\" data-bind=\"text: error_text\"></h3>\n</div>\n</div>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<p class=\"margin__top--10px\">\nGo back to\n<a data-bind=\"click: trigger.bind($data,&#39;task-go&#39;)\">\nTasks\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</div>\n</div>";

},{}],26:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});
    self.imgUrl = ko.observable("");
    self.image_presence = ko.observable(false);
    self.error_text = ko.observable();
    self.line = ko.observable("");
    self.size = ko.observable(1);
    self.clear = function(){
        self.line('');
    }
    self.trigger = function (id) {
        console.log("trigger")
        self.output.line = self.line()
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'image-annotation-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.get_data = function(context,id){
    var self = this;
    $.ajax({
    url: "http://awt.ifmledit.org"+ id +"/session",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
    },
    success: function(result){
        var myobj = result;
        console.log("data got")
        console.log("http://awt.ifmledit.org" + myobj.image)
        self.image_presence(true);
        self.imgUrl(myobj.image);
        console.log(self.imgUrl())
        self.size(myobj.size);
    },
    error:function (xhr, ajaxOptions, thrownError){
        if(xhr.status==404) {
            self.image_presence(false);
            self.error_text("There is no more images to annotate");
        }
        if(xhr.status==410) {
            self.image_presence(false);
            self.error_text("There is no more images to annotate for now try again later");
        }
        if(xhr.status==412) {
            self.image_presence(false);
            self.error_text("Precondition failed, refresh the browser and try again");
            // Note to myself: ask carlo what this mean
        }
    }
    });
};

ViewModel.prototype.init_session = function(context,id){
    var self = this;
    $.ajax({
    url: "http://awt.ifmledit.org"+ id +"/session",
    type: "POST",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
    },
    crossDomain: true,
    success: function(result){
        var myobj = result;
        console.log(myobj);
    },
    error:function (xhr, ajaxOptions, thrownError){
        if(xhr.status==404) {
            self.image_presence(false);
            self.error_text("There is no more images to annotate");
        }
    }
    });
};

ViewModel.prototype._compute = function (id) {
    this.output = {
        'id': id,
    };
    this.line.subscribe= function(){
         console.log(this.line());
    }
    this.status('computed');
};


ViewModel.prototype.init = function (options,id,init) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute(id);
            if(init){
                self.init_session(self.context,id);
            }
            self.get_data(self.context, id);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    var self = this;
    ko.components.register('c-image-annotation-form', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":25}],27:[function(require,module,exports){
module.exports = "<span>    <!-- image-annotation-form -->    <c-image-annotation-form params=\"context: context\"></c-image-annotation-form></span>";

},{}],28:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options,id,init) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'image-annotation';
ViewModel.prototype.children = [
    'image-annotation-form', 'line-drawer'
];

exports.register = function () {
    ko.components.register('c-image-annotation', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":27}],29:[function(require,module,exports){
module.exports = "<div class=\"well\">\n<div class=\"row\">\n<div class=\"col-xs-6 col-xs-offset-3\">\n<legend class=\"text-center\">\nValidate the Image!!\n</legend>\n</div>\n</div>\n<div data-bind=\"if: image_presence()\">\n<div class=\"row\">\n<div class=\"col-xs-3 col-xs-offset-3 text-right\">\n<a class=\"btn btn-success\" data-bind=\"click: trigger.bind($data, &#39;image-selection-submit&#39;, &#39;true&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-ok\"></span>\n</a>\n</div>\n<div class=\"col-xs-3\">\n<a class=\"btn btn-danger\" data-bind=\"click: trigger.bind($data, &#39;image-selection-submit&#39;, &#39;false&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-remove\"></span>\n</a>\n</div>\n</div>\n<br>\n<div class=\"row\" data-bind=\"if: imgUrl() != undefined\">\n<div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n<img class=\"img-responsive center-block\" data-bind=\"attr:{src: &#39;http://awt.ifmledit.org&#39; + imgUrl() || &#39;#&#39; }\">\n</div>\n</div>\n</div>\n</div>\n</div>\n<div data-bind=\"if: !image_presence()\">\n<div class=\"row\">\n<div class=\"col-xs-12 col-sm-10 col-sm-offset-1\">\n<h3 class=\"text-center\" data-bind=\"text: error_text\"></h3>\n</div>\n</div>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<p class=\"margin__top--10px\">\nGo back to\n<a data-bind=\"click: trigger.bind($data,&#39;task-go&#39;)\">\nTasks\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</div>\n</div>";

},{}],30:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.imgUrl = ko.observable("");
    self.errors = ko.observable({});
    self.image_presence = ko.observable(false);
    self.error_text = ko.observable();

    self.trigger = function (id,bool) {
        self.output.accepted = bool;
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.get_data = function(context,id){
    var self = this;
    $.ajax({
    url: "http://awt.ifmledit.org"+ id +"/session",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
    },
    success: function(result){
        var myobj = result;
        console.log("data got")
        console.log("http://awt.ifmledit.org" + myobj.image)
        self.image_presence(true);
        self.imgUrl(myobj.image);
    },
    error:function (xhr, ajaxOptions, thrownError){
        if(xhr.status==404) {
            self.image_presence(false);
            self.error_text("There is no more images to select");
        }
        if(xhr.status==410) {
            self.image_presence(false);
            self.error_text("There is no more images to select for now");
        }
        if(xhr.status==412) {
            self.image_presence(false);
            self.error_text("Precondition failed, refresh the browser and try again");
            // Note to myself: ask carlo what this mean
        }
    }
    });
};

ViewModel.prototype.init_session = function(context,id){
    var self = this;
    $.ajax({
    url: "http://awt.ifmledit.org"+ id +"/session",
    type: "POST",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
    },
    crossDomain: true,
    success: function(result){
        var myobj = result;
        console.log(myobj);
    },
    error:function (xhr, ajaxOptions, thrownError){
        if(xhr.status==404) {
            self.image_presence(false);
            self.error_text("There is no more images to annotate");
        }
    }
    });
};

ViewModel.prototype.id = 'image-selection-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function (id) {
    this.output = {
        'id': id,
    };
    this.status('computed');
};


ViewModel.prototype.init = function (options,id,init) {
    options = options || {};
    this.output = undefined;
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute(id);
            if(init){
                self.init_session(self.context,id);
            }
            self.get_data(self.context, id);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-image-selection-form', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":29}],31:[function(require,module,exports){
module.exports = "<span>\n  <!-- image-selection-form -->\n  <c-image-selection-form params=\"context: context\">\n  </c-image-selection-form>\n</span>";

},{}],32:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'image-selection';
ViewModel.prototype.children = [
    'image-selection-form' // image-selection-form
];

exports.register = function () {
    ko.components.register('c-image-selection', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":31}],33:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">Image Upload</legend>\n<form>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;image&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;image&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;image&#39;]}\" for=\"image-upload-form_field_0\">Upload a picture!:</label>\n<input aria-describedby=\"image-upload-form_field_0_error\" class=\"form-control validate btn btn-default\" data-bind=\"event: {change: fileUpload}, value: fields()[&#39;image&#39;]\" id=\"image-upload-form_field_0\" type=\"file\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;image&#39;]\" id=\"image-upload-form_field_0_error\"></span>\n</div>\n<div>\n<img class=\"img-responsive margin__center\" data-bind=\"attr: {src: photoUrl()}\">\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;image-upload-submit&#39;)\">\nSUBMIT\n</a>\n<br>\n<p class=\"margin__top--10px\">\nI want to select workers,\n<a data-bind=\"click: trigger.bind($data,&#39;worker-select-go&#39;)\">\nSelect Worker\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>\n<span>\n<div class=\"well col-sm-10 col-sm-offset-1\">\n<div data-bind=\"foreach: imagesArray\">\n<div class=\"panel panel-default col-sm-6 col-md-4 col-lg-3\">\n<div class=\"panel-heading text-right\">\n<a data-bind=\"click: $parent.delete\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-remove\"></span>\n</a>\n</div>\n<div class=\"panel-body\">\n<a data-bind=\"click: $parent.show\">\n<img class=\"img-responsive center-block img-thumbnail height__max--170 height__min--170 width__max--170 width__min--170\" data-bind=\"attr:{src: &#39;http://awt.ifmledit.org&#39; + canonical}\">\n</a>\n</div>\n</div>\n</div>\n</div>\n</span>\n<div aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" class=\"modal fade\" data-bind=\"if: modalUrl() != undefined\" id=\"imagemodal\" role=\"dialog\" tabindex=\"-1\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n<div class=\"modal-body\">\n<button class=\"close\" data-dismiss=\"modal\" type=\"button\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-remove\"></span>\n<span class=\"sr-only\">Close</span>\n</button>\n<br>\n<img class=\"imagepreview\" data-bind=\"attr:{src: &#39;http://awt.ifmledit.org&#39; + modalUrl()}\" style=\"width: 100%\">\n</div>\n</div>\n</div>\n</div>";

},{}],34:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});
    self.imagesArray = ko.observableArray(); 
    self.photoUrl = ko.observable();
    self.modalUrl = ko.observable();
    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
    this.fileUpload = function(data, e)
    {
        var file    = e.target.files[0];
        var reader  = new FileReader();

        reader.onloadend = function (onloadend_e) 
        {
           var result = reader.result; //base 64 encoded.
           self.photoUrl(result);
           self.output['image'] = file;
        };

        if(file)
        {
            reader.readAsDataURL(file);
        }
    };
    self.delete = function(){
        var img = this;
        $.ajax({
        url: "http://awt.ifmledit.org" + img.id,
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
        },
        success: function(result){
            var myobj = result;
            self.imagesArray.remove(img);
        }
        });
    }
    self.show = function(){
        self.modalUrl(this.canonical);
		$('#imagemodal').modal('show');   
    }
}

ViewModel.prototype.fill = function (errors_sent,id,images,new_image) {
    if(new_image != undefined){
        images.push(new_image);
    }
    this.imagesArray(images);
    this.fields()['image']("");
    this.output.id = id
    this.output.images = this.imagesArray();
    this.errors()['image'](errors_sent.image);
    this.errors()['others'](errors_sent.others);
};

ViewModel.prototype.id = 'image-upload-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'image': this.input['image'],
        'images': [],
    }
    var self = this,
        fields = {
            'image': ko.observable(this.input['image']),
        },
        errors = {
            'image': ko.observable(this.input['image-error']),
            'others': ko.observable(),
        };
    self.imagesArray.subscribe(function(changes) {
        if(changes == undefined){
            return;
        }
        changes.forEach(function(change) {
            if (change.status === 'added' || change.status === 'deleted') {
                self.output['images'] = self.images();
            }
        });
    });
    this.photoUrl("")
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options,errors,id,images,new_image) {
    options = options || {};
    errors = errors || {};
    images = images || [];
    new_image = new_image || undefined;
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.fill(errors,id,images,new_image)
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-image-upload-form', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":33}],35:[function(require,module,exports){
module.exports = "<span>    <!-- image-upload-form -->    \n  <c-image-upload-form params=\"context: context\">\n  </c-image-upload-form>\n</span>";

},{}],36:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'image-upload-view';
ViewModel.prototype.children = [
    'image-upload-form' // image-upload-form
];

exports.register = function () {
    ko.components.register('c-image-upload-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":35}],37:[function(require,module,exports){
(function (global){
/*jslint browser: true */
/*globals ko, $ */
var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);
var linefun = (function () {
    "use strict";

    ko.bindingHandlers.LineDrawSetSize = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            if (!value) { return; }
            element.height = value.height;
            element.width = value.width;
        }
    };

    ko.bindingHandlers.LineDrawNaturalSize = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            function update() {
                value({
                    width: element.naturalWidth,
                    height: element.naturalHeight
                });
            }
            update();
            $(element).on('load', update);
        }
    };

    ko.bindingHandlers.LineDraw = {
        init: function (element, valueAccessor) {
            var value = valueAccessor(),
                ctx = element.getContext('2d'),
                $element = $(element);
            $element.on('mousedown', function (e) {
                var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                    y = (e.pageY - $element.offset().top) / $element.height() * element.height;
                ctx.beginPath();
                ctx.moveTo(x, y);
                function draw(e) {
                    var pen = parseInt($element.data('pen'), 10) || 1,
                        tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                        ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                    ctx.lineTo(tx, ty);
                    ctx.strokeStyle = 'rgb(255,0,0)';
                    ctx.lineWidth = pen;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                }
                function end() {
                    $element.off('mousemove', draw);
                    $element.off('mouseup', end);
                    value(element.toDataURL('image/png'));
                }
                $element.on('mousemove', draw);
                $element.on('mouseup', end);
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor()),
                ctx = element.getContext('2d');
            if (!value || value === '') {
                ctx.clearRect(0, 0, element.width, element.height);
            }
        }
    };

    ko.bindingHandlers.LineDrawPen = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor()),
                $element = $(element);
            $element.data('pen', value);
        }
    };
}());


function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.src = params.src;
    self.pen = params.pen;
    self.line = params.line;
    self.naturalSize = ko.observable();
    self.linefun = linefun;
    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}
ViewModel.prototype.id = 'line-drawer';

exports.register = function () {
    ko.components.register('line-drawer', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: '<img data-bind="attr: { src: src }, LineDrawNaturalSize: naturalSize" class="background" draggable="false"><canvas data-bind="LineDraw: line, LineDrawSetSize: naturalSize, LineDrawPen: pen"></canvas>',
        synchronous: true
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],38:[function(require,module,exports){
module.exports = "<div class=\"well\">\n<div class=\"row\">\n<div class=\"col-sm-9 col-xs-12\">\n<legend>\nCampaigns\n</legend>\n</div>\n<div class=\"col-sm-3 col-xs-12 text-right\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data,&#39;campaign-create&#39;)\">Create a Campaign</a>\n</div>\n</div>\n<table class=\"table table-hover table-striped\">\n<thead>\n<tr>\n<th>#</th>\n<th>Name</th>\n<th>Status</th>\n<th class=\"text-right\">Actions</th>\n<th></th>\n</tr>\n</thead>\n<tbody data-bind=\"foreach: { data: items, as: &#39;item&#39; }\">\n<tr>\n<td class=\"vertical__middle\" data-bind=\"text: ($index()+1)\"></td>\n<td class=\"text-capitalize vertical__middle\" data-bind=\"text: $data[&#39;name&#39;]\" style=\"white-space: pre-wrap\"></td>\n<td class=\"text-capitalize vertical__middle\" data-bind=\"text: $data[&#39;status&#39;]()\" style=\"white-space: pre-wrap\"></td>\n<td class=\"text-right\">\n<a class=\"btn btn-info\" data-bind=\"click: $parent.trigger.bind(item,&#39;campaign-show&#39;)\" data-original-title=\"Show\" data-placement=\"top\" data-toggle=\"tooltip\" title>\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-zoom-in\"></span>\n</a>\n<span data-bind=\"if: item.status() === &#39;ready&#39;\">\n<a class=\"btn btn-warning\" data-bind=\"click: $parent.trigger.bind(item,&#39;campaign-edit-go&#39;)\" data-original-title=\"Edit\" data-placement=\"top\" data-toggle=\"tooltip\" title>\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-edit\"></span>\n</a>\n</span>\n<span data-bind=\"if: item.status() === &#39;ready&#39;\">\n<a class=\"btn btn-success\" data-bind=\"click: $parent.change_state\" data-original-title=\"Edit\" data-placement=\"top\" data-toggle=\"tooltip\" title>\nPUBLISH\n</a>\n</span>\n<span data-bind=\"if: item.status() === &#39;started&#39;\">\n<a class=\"btn btn-success\" data-bind=\"click: $parent.change_state\" data-original-title=\"Edit\" data-placement=\"top\" data-toggle=\"tooltip\" title>\nTERMINATE\n</a>\n</span>\n</td>\n</tr>\n</tbody>\n</table>\n</div>";

},{}],39:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['campaign'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
        self.trigger.call(this, 'campaign-show');
    };
    self.select_trigger = function (item,id) {
        self.context.events[id](self.context, this);
    };
    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
    self.change_state = function(){
        var campaign = this;
        var type = undefined;
        if(campaign.status() == "ready"){
            type = "POST";
        }else{
            type = "DELETE";            
        }
        $.ajax({
            url: "http://awt.ifmledit.org" + campaign.id + "/execution",
            type: type,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
            },
            success: function(result){
                if(campaign.status() == "ready"){
                    campaign.status("started");
                }else{
                    campaign.status("ended");            
                }
            }
        });  
    };
}
var proto_campaign = function(id,name,status){
    var self = {};
    self.id = id;
    self.name = name;
    self.status = ko.observable(status);
    return self;
};

ViewModel.prototype.id = 'list-campaign';

ViewModel.prototype.get_data = function(context){
    var self = this;
    $.ajax({
    url: "http://awt.ifmledit.org/api/campaign",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
    },
    success: function(result){
        var myobj = result;
        //self.items(myobj.campaigns);
        myobj = myobj.campaigns
        var temp =[];
        $.each(myobj, function (i, obj) {
            var newObj =  proto_campaign(obj.id,obj.name,obj.status);
            temp.push(newObj); 
        }); 
        self.items(temp)
    }
    });
};

ViewModel.prototype.fields = {
    id: 1
    ,'campaign-edit': 1
    ,'campaign-name': 1
    ,'campaign-next_action': 1
    ,'campaign-show': 1
    ,'campaign-state': 1
};

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;
    this._computing = this._repository.find(this.filters, this.fields).then(function (items) {
        self.selected(undefined);
        self.items(items);
        if (items.length) {
            self.selected(items[0].id);
            self.output = items[0];
        }
        self.status('computed');
        self._computing = undefined;
    });
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.filters = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.get_data(self.context);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-list-campaign', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":38}],40:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">Log In</legend>\n<form>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;username&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;username&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;username&#39;]}\" for=\"login-form_field_1\">Username</label>\n<input aria-describedby=\"login-form_field_1_error\" class=\"form-control validate\" data-bind=\"textInput: fields()[&#39;username&#39;]\" id=\"login-form_field_1\" placeholder=\"Username\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;username&#39;]\" id=\"login-form_field_1_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;password&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;password&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;password&#39;]}\" for=\"login-form_field_0\">Password</label>\n<input aria-describedby=\"login-form_field_0_error\" class=\"form-control validate\" data-bind=\"textInput: fields()[&#39;password&#39;]\" id=\"login-form_field_0\" placeholder=\"Password\" type=\"password\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;password&#39;]\" id=\"login-form_field_0_error\"></span>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;login-submit&#39;)\">\nLOG IN\n</a>\n<br>\n<p class=\"margin__top--10px\">\nI don’t have an account,\n<a data-bind=\"click: trigger.bind($data,&#39;register-go&#39;)\">\nRegister\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],41:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({}).extend({ required: true });
    self.errors = ko.observable({});
    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'login-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.fill = function (errors_sent,fields_sent) {
    if (!$.isEmptyObject(fields_sent)){
        this.fields()['password'](fields_sent.password);
        this.fields()['username'](fields_sent.username);
    }
    this.errors()['password'](errors_sent.password);
    this.errors()['username'](errors_sent.username);
    this.errors()['others'](errors_sent.others);
};

ViewModel.prototype._compute = function () {
    this.output = {
        'password': this.input['password'],
        'username': this.input['username'],
    };
    var self = this,
        fields = {
            'password': ko.observable(this.input['password']),
            'username': ko.observable(this.input['username']),
        },
        errors = {
            'password': ko.observable(this.input['password-error']),
            'username': ko.observable(this.input['username-error']),
            'others': ko.observable(),
        };
    fields['password'].subscribe(function (value) {
        self.output['password'] = value;
        self.errors()['password'](undefined);
    });
    fields['username'].subscribe(function (value) {
        self.output['username'] = value;
        self.errors()['username'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options,errors,fields) {
    options = options || {};
    errors = errors || {};
    fields = fields || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.fill(errors,fields);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-login-form', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":40}],42:[function(require,module,exports){
module.exports = "<span>\n    <!-- login-Fom -->\n    <c-login-form params=\"context: context\"></c-login-form>\n</span>";

},{}],43:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'login-view';
ViewModel.prototype.children = [
    'login-form' // login-Fom
];

exports.register = function () {
    ko.components.register('c-login-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":42}],44:[function(require,module,exports){
module.exports = "<span>\n<c-list-campaign params=\"context: context\"></c-list-campaign>\n</span>";

},{}],45:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'manager-view';
ViewModel.prototype.children = [
    'list-campaign' // list-campaign
];

exports.register = function () {
    ko.components.register('c-manager-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":44}],46:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">Register</legend>\n<form>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;fullname&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;fullname&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;fullname&#39;]}\" for=\"register-form_field_1\">Fullname</label>\n<input aria-describedby=\"register-form_field_1_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;fullname&#39;]\" id=\"register-form_field_1\" require=\"true\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;fullname&#39;]\" id=\"register-form_field_1_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;username&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;username&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;username&#39;]}\" for=\"register-form_field_3\">Username</label>\n<input aria-describedby=\"register-form_field_3_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;username&#39;]\" id=\"register-form_field_3\" require=\"true\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;username&#39;]\" id=\"register-form_field_3_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;account-type&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;account-type&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;account-type&#39;]}\" for=\"register-form_field_0\">Select account type</label>\n<select aria-describedby=\"register-form_field_0_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;account-type&#39;]\" id=\"register-form_field_0\" require=\"true\">\n<option value=\"master\">Manager</option>\n<option value=\"worker\">Worker</option>\n</select>\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;account-type&#39;]\" id=\"register-form_field_0_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;password&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;password&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;password&#39;]}\" for=\"register-form_field_2\">Password</label>\n<input aria-describedby=\"register-form_field_2_error\" class=\"form-control validate\" data-bind=\"textInput: fields()[&#39;password&#39;]\" id=\"register-form_field_2\" require=\"true\" type=\"password\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;password&#39;]\" id=\"register-form_field_2_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;confirm_password&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;confirm_password&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;confirm_password&#39;]}\" for=\"account-edit-form_field_1\">Confirm Password</label>\n<input aria-describedby=\"account-edit-form_field_1_error\" class=\"form-control validate\" data-bind=\"textInput: fields()[&#39;confirm_password&#39;]\" id=\"register-form_field_2\" type=\"password\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;confirm_password&#39;]\" id=\"register-form_field_2_error\"></span>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;register-submit&#39;)\">\nREGISTER\n</a>\n<br>\n<p class=\"margin__top--10px\">\nAlready have an account,\n<a data-bind=\"click: trigger.bind($data,&#39;login-go&#39;)\">\nLog In\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],47:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        var flag = true;
        for (var key in self.errors()) {
          if (self.errors().hasOwnProperty(key)) {
            if(self.errors()[key]() != undefined){
                flag = false
            }
          }
        }
        if(flag){
            self.context.events[id](self.context, self.output);
        }
    };
}

ViewModel.prototype.id = 'register-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.fill = function (errors_sent,fields_sent) {
    if (!$.isEmptyObject(fields_sent)){
        this.fields()['account-type'](fields_sent.type);
        this.fields()['fullname'](fields_sent.fullname);
        this.fields()['password']("");
        this.fields()['username'](fields_sent.username);
    }
    this.errors()['account-type'](errors_sent.type);
    this.errors()['fullname'](errors_sent.fullname);
    this.errors()['password'](errors_sent.password);
    this.errors()['username'](errors_sent.username);
    this.errors()['others'](errors_sent.others);
};

ViewModel.prototype._compute = function () {
    this.output = {
        'account-type': this.input['account-type'],
        'fullname': this.input['fullname'],
        'password': this.input['password'],
        'username': this.input['username'],
        'confirm_password': this.input['confirm_password'],
    };
    var self = this,
        fields = {
            'account-type': ko.observable(this.input['account-type']),
            'fullname': ko.observable(this.input['fullname']),
            'password': ko.observable(this.input['password']),
            'username': ko.observable(this.input['username']),
            'confirm_password': ko.observable(this.input['confirm_password']),
        },
        errors = {
            'account-type': ko.observable(this.input['account-type-error']),
            'fullname': ko.observable(this.input['fullname-error']),
            'password': ko.observable(this.input['password-error']),
            'username': ko.observable(this.input['username-error']),
            'confirm_password': ko.observable(this.input['confirm_password-error']),
            'others': ko.observable(),
        };
    fields['account-type'].subscribe(function (value) {
        self.output['account-type'] = value;
    });
    fields['fullname'].subscribe(function (value) {
        self.output['fullname'] = value;
        self.errors()['fullname'](undefined);
    });
    fields['password'].subscribe(function (value) {
        self.output['password'] = value;
        self.errors()['password'](undefined);
        if(self.output['confirm_password'] != self.output['password']){
            self.errors()['confirm_password']("Must match password");
        }else{
            self.errors()['confirm_password'](undefined);
        }
    });
    fields['username'].subscribe(function (value) {
        self.output['username'] = value;
        self.errors()['username'](undefined);
    });
    fields['confirm_password'].subscribe(function (value) {
        self.output['confirm_password'] = value;
        if(self.output['confirm_password'] != self.output['password']){
            self.errors()['confirm_password']("Must match password");
        }else{
            self.errors()['confirm_password'](undefined);
        }
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options,errors,fields) {
    options = options || {};
    errors = errors || {};
    fields = fields || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.fill(errors,fields);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-register-form', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":46}],48:[function(require,module,exports){
module.exports = "<span>\n    <!-- register-form -->\n    <c-register-form params=\"context: context\"></c-register-form>\n</span>";

},{}],49:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'register-view';
ViewModel.prototype.children = [
    'register-form' // register-form
];

exports.register = function () {
    ko.components.register('c-register-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":48}],50:[function(require,module,exports){
module.exports = "<div class=\"well col-sm-10 col-xs-12 col-sm-offset-1\">\n<div class=\"row\">\n<div class=\"col-sm-10 col-xs-12 col-sm-offset-1\">\n<legend class=\"text-center\" data-bind=\"text: campaign().name\"></legend>\n</div>\n</div>\n<div class=\"list-group\">\n<div class=\"col-sm-6 col-xs-12\">\n<a class=\"list-group-item\">\n<h4 class=\"list-group-item-heading\">Status:</h4>\n<p class=\"list-group-item-text\" data-bind=\"text: campaign().status\"></p>\n</a>\n<a class=\"list-group-item\">\n<h4 class=\"list-group-item-heading\">Number of accepted images:</h4>\n<p class=\"list-group-item-text\" data-bind=\"text: stat().accepted\"></p>\n</a>\n<a class=\"list-group-item\">\n<h4 class=\"list-group-item-heading\">Number of annotations:</h4>\n<p class=\"list-group-item-text\" data-bind=\"text: stat().annotation\"></p>\n</a>\n</div>\n<div class=\"col-sm-6 col-xs-12\">\n<a class=\"list-group-item\">\n<h4 class=\"list-group-item-heading\">Number of images:</h4>\n<p class=\"list-group-item-text\" data-bind=\"text: stat().images\"></p>\n</a>\n<a class=\"list-group-item\">\n<h4 class=\"list-group-item-heading\">Number of rejected images:</h4>\n<p class=\"list-group-item-text\" data-bind=\"text: stat().rejected\"></p>\n</a>\n<a class=\"list-group-item\">\n<h4 class=\"list-group-item-heading\">Avg number of annotations per image.</h4>\n<p class=\"list-group-item-text\" data-bind=\"text: stat().avg \"></p>\n</a>\n</div>\n</div>\n</div>\n<div class=\"well col-sm-10 col-sm-offset-1\" data-bind=\"if: campaign().status == &#39;ended&#39;\">\n<div data-bind=\"foreach: imagesArray\">\n<div class=\"panel panel-danger col-sm-6 col-md-4 col-lg-3\" data-bind=\"visible: selection.accepted &lt; selection.rejected\">\n<div class=\"panel-heading\">\n<p>\n<b>\nAccepted:\n</b>\n<span data-bind=\"text: selection.accepted\"></span>\n</p>\n<p>\n<b>\nRejected:\n</b>\n<span data-bind=\"text: selection.rejected\"></span>\n</p>\n</div>\n<div class=\"panel-body\">\n<a data-bind=\"click: $parent.show\">\n<img class=\"img-responsive center-block img-thumbnail height__max--170 height__min--170 width__max--170 width__min--170\" data-bind=\"attr:{src: &#39;http://awt.ifmledit.org&#39; + canonical}\">\n</a>\n</div>\n</div>\n<div class=\"panel panel-success col-sm-6 col-md-4 col-lg-3\" data-bind=\"visible: selection.accepted &gt; selection.rejected\">\n<div class=\"panel-heading\">\n<p>\n<b>\nAccepted:\n</b>\n<span data-bind=\"text: selection.accepted\"></span>\n</p>\n<p>\n<b>\nRejected:\n</b>\n<span data-bind=\"text: selection.rejected\"></span>\n</p>\n</div>\n<div class=\"panel-body\">\n<a data-bind=\"click: $parent.show\">\n<img class=\"img-responsive center-block img-thumbnail height__max--170 height__min--170 width__max--170 width__min--170\" data-bind=\"attr:{src: &#39;http://awt.ifmledit.org&#39; + canonical}\">\n</a>\n</div>\n</div>\n</div>\n</div>\n<div aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" class=\"modal fade\" data-bind=\"if: modalUrl() != undefined\" id=\"imagemodal\" role=\"dialog\" tabindex=\"-1\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n<div class=\"modal-body\">\n<button class=\"close\" data-dismiss=\"modal\" type=\"button\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-remove\"></span>\n<span class=\"sr-only\">Close</span>\n</button>\n<br>\n<!-- /%line-drawer.imagepreview{:params => \"context: context, src: 'http://awt.ifmledit.org' + modalUrl(), pen: 0, line: ''\"} -->\n<img class=\"imagepreview\" data-bind=\"attr:{src: modalAnnotation()[modalI()]},style: { &#39;backgroundImage&#39;: &#39;url(&#39;+ &#39;http://awt.ifmledit.org&#39;+ modalUrl() +&#39;)&#39;, &#39;backgroundSize&#39;:&#39;cover&#39;,&#39;backgroundRepeat&#39;: &#39;no-repeat&#39;,&#39;backgroundPosition&#39;: &#39;center center&#39;}\" style=\"width: 100%\">\n<br>\n<div class=\"row margin__top--10px\">\n<div class=\"col-xs-12 col-sm-6 text-right\">\n<a class=\"btn btn-default\" data-bind=\"click: nextAnnotation(-1)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></span>\n</a>\n</div>\n<div class=\"col-xs-12 col-sm-6\">\n<a class=\"btn btn-default\" data-bind=\"click: nextAnnotation(1)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></span>\n</a>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>";

},{}],51:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
    
function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.campaign = ko.observable({});
    self.stat = ko.observable({});
    self.imagesCollection = {}
    self.imagesArray = ko.observableArray();
    self.modalUrl = ko.observable();
    self.modalAnnotation = ko.observable();
    self.modalI = ko.observable();
    self.stats = function(id){
        var self = this;
        $.ajax({
            url: "http://awt.ifmledit.org" + id + "/statistics",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
            },
            success: function(result){
                var myobj = result;
                console.log(myobj)
                myobj.avg = myobj.annotation /myobj.images
                self.stat(myobj);
            }
        });
    }
    self.images = function(id){
        var self = this;
        $.ajax({
            url: "http://awt.ifmledit.org" + id + "/image",
            type: "GET",
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
            },
            success: function(result){
                var myobj = result;
                console.log(myobj)
                self.imagesCollection = myobj;
            }
        });
    }
    self.image = function(id,canonical){
        var self = this;
        $.ajax({
            url: "http://awt.ifmledit.org" + id + "/statistics",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
            },
            success: function(result){
                var myobj = result;
                myobj.id = id;
                myobj.canonical = canonical
                self.imagesArray.push(myobj)
            }
        });
    }
    self.show = function(){
        self.modalAnnotation(this.annotation);
        self.modalUrl(this.canonical);
        self.modalI(0);
        if(this.annotation.length == 0){
            self.modalAnnotation(['http://awt.ifmledit.org'+ this.canonical])
        }
		$('#imagemodal').modal('show');   
    }
    self.nextAnnotation = function(step){
        var a = self.modalI()
        var b = self.modalAnnotation().length
        a = a + step
        if(a < 0){
             a = b-1
        }
        if(a >= b){
            a = 0
        }
        self.modalI(a)
        console.log(self.modalI())
    }
    self.init = function (options, data) {
        options = options || {};
        data = data || {};
        self.campaign(data);
        if(data.status == "ended"){
            self.stats(data.id)
        }else{
            data = {
                "images": "Not a completed campaign",
                "accepted": "Not a completed campaign",
                "rejected": "Not a completed campaign",
                "annotation": "Not a completed campaign",
                "avg": "Not a completed campaign"
            }
            self.stat(data)
        }
        if(data.id != undefined){
            self.images(data.id)    
        }
        if(self.imagesCollection.images != undefined){
            self.imagesCollection.images.forEach(function(item){
               self.image(item.id, item.canonical) 
            });   
        }
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'show-campaign';
ViewModel.prototype.children = [
];

exports.register = function () {
    ko.components.register('c-show-campaign', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":50}],52:[function(require,module,exports){
module.exports = "<span>    <!-- task-worker-list -->    <c-task-worker-list params=\"context: context\"></c-task-worker-list></span>";

},{}],53:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'task-view';
ViewModel.prototype.children = [
    'task-worker-list' // task-worker-list
];

exports.register = function () {
    ko.components.register('c-task-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":52}],54:[function(require,module,exports){
module.exports = "<div class=\"well\">\n<div class=\"row\">\n<div class=\"col-sm-9 col-xs-12\">\n<legend>\nTasks\n</legend>\n</div>\n</div>\n<table class=\"table table-hover table-striped\">\n<thead>\n<tr>\n<th>#</th>\n<th>Type</th>\n<th class=\"text-right\">Actions</th>\n</tr>\n</thead>\n<tbody data-bind=\"foreach: { data: tasks, as: &#39;task&#39; }\">\n<tr>\n<td class=\"vertical__middle\" data-bind=\"text: ($index()+1)\"></td>\n<td class=\"text-capitalize vertical__middle\" data-bind=\"text: task[&#39;type&#39;]\" style=\"white-space: pre-wrap\"></td>\n<td class=\"text-right\">\n<a class=\"btn btn-info\" data-bind=\"click: $parent.modal.bind(task)\" data-target=\"#myModal\" data-toggle=\"modal\" type=\"button\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-zoom-in\"></span>\n</a>\n<span data-bind=\"if: task[&#39;type&#39;] == &#39;selection&#39;\">\n<a class=\"btn btn-primary\" data-bind=\"click: $parent.trigger.bind($data, &#39;image-selection-go&#39;,&#39;true&#39;), clickBubble: false\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-flag\">\nSELECTION\n</span>\n</a>\n</span>\n<span data-bind=\"if: task.type == &#39;annotation&#39;\">\n<a class=\"btn btn-primary\" data-bind=\"click: $parent.trigger.bind($data, &#39;image-annotation-go&#39;,&#39;true&#39;), clickBubble: false\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-pencil\">\nANNOTATION\n</span>\n</a>\n</span>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Modal -->\n<div aria-labelledby=\"myModalLabel\" class=\"modal fade\" id=\"myModal\" role=\"dialog\" tabindex=\"-1\">\n<div class=\"modal-dialog\" role=\"document\">\n<div class=\"modal-content\">\n<div class=\"modal-header\">\n<button aria-label=\"Close\" class=\"close\" data-dismiss=\"modal\" type=\"button\">\n<span aria-hidden=\"true\">×</span>\n</button>\n<h4 class=\"modal-title\" id=\"myModalLabel\">Task Statistics</h4>\n</div>\n<div class=\"modal-body\">\n<ul data-bind=\"if: selectedTask()[&#39;type&#39;] == &#39;selection&#39;\">\n<li>\n<b>Available:</b>\n<span data-bind=\"text: available()\"></span>\n</li>\n<li>\n<b>Accepted:</b>\n<span data-bind=\"text: accepted()\"></span>\n</li>\n<li>\n<b>Rejected:</b>\n<span data-bind=\"text: rejected()\"></span>\n</li>\n</ul>\n<ul data-bind=\"if: selectedTask().type == &#39;annotation&#39;\">\n<li>\n<b>Available:</b>\n<span data-bind=\"text: available()\"></span>\n</li>\n<li>\n<b>Annotated:</b>\n<span data-bind=\"text: annotated()\"></span>\n</li>\n</ul>\n</div>\n</div>\n</div>\n</div>";

},{}],55:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['tasks'];
    self.context = params.context;
    self.status = ko.observable('');
    self.tasks = ko.observableArray([]);
    self.selectedTask = ko.observable({});
    self.available = ko.observable();
    self.accepted = ko.observable();
    self.rejected = ko.observable();
    self.annotated = ko.observable();
    
    self.modal = function(task){
        console.log(task);
        self.selectedTask(task);
        console.log(self.selectedTask());
        $.ajax({
        url: "http://awt.ifmledit.org" + task.id + "/statistics",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
        },
        success: function(result){
            var myobj = result;
            self.available(myobj.available);
            self.accepted(myobj.accepted);
            self.rejected(myobj.rejected);
            self.annotated(myobj.annotated);
        }
        });
    }

    self.trigger = function (id,init) {
        this.init = init;
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.get_data = function(context){
    var self = this;
    $.ajax({
    url: "http://awt.ifmledit.org/api/task",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
    },
    success: function(result){
        var myobj = result;
        myobj = myobj.tasks;
        self.tasks(myobj);
    }
    });
};

ViewModel.prototype.id = 'task-worker-list';

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;
    self.tasks([]);
    self.status('computed');
    self._computing = undefined;
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.filters = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.get_data(self.context);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-task-worker-list', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":54}],56:[function(require,module,exports){
module.exports = "<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<legend>Workers</legend>\n<table class=\"table table-hover table-striped\">\n<thead>\n<tr>\n<th>#</th>\n<th>Name</th>\n<th>Selector</th>\n<th>Annotator</th>\n<th></th>\n</tr>\n</thead>\n<tbody data-bind=\"foreach: workers\">\n<tr>\n<td class=\"vertical__middle\" data-bind=\"text: ($index()+1)\"></td>\n<td class=\"text-capitalize vertical__middle\" data-bind=\"text: fullname()\" style=\"white-space: pre-wrap\"></td>\n<td>\n<span data-bind=\"if: selector() == false\">\n<a class=\"btn btn-success\" data-bind=\"click: $parent.selectorBtn\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-plus-sign\"></span>\n</a>\n</span>\n<span data-bind=\"if: selector() == true\">\n<a class=\"btn btn-danger\" data-bind=\"click: $parent.selectorBtn\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-minus-sign\"></span>\n</a>\n</span>\n</td>\n<td>\n<span data-bind=\"if: annotator() == false\">\n<a class=\"btn btn-success\" data-bind=\"click: $parent.annotatorBtn\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-plus-sign\"></span>\n</a>\n</span>\n<span data-bind=\"if: annotator() == true\">\n<a class=\"btn btn-danger\" data-bind=\"click: $parent.annotatorBtn\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-minus-sign\"></span>\n</a>\n</span>\n</td>\n</tr>\n</tbody>\n</table>\n</div>";

},{}],57:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['workers'];
    self.context = params.context;
    self.status = ko.observable('');
    self.workers = ko.observableArray();

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
    self.selectorBtn = function(){
        var worker = this;
        var type = "POST";
        if(!worker.selector()){
            type= "POST";
        }else{
            type= "DELETE";
        }
        $.ajax({
            url: "http://awt.ifmledit.org" + worker.id() + "/selection",
            type: type,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
            },
            success: function(result){
                var myobj = result;
                worker.selector(!worker.selector());
            }
        });
    };
    self.annotatorBtn = function(){
        var worker = this;
        var type = "POST";
        if(!worker.annotator()){
            type= "POST";
        }else{
            type= "DELETE";
        }
        $.ajax({
            url: "http://awt.ifmledit.org" + worker.id() + "/annotation",
            type: type,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
            },
            success: function(result){
                var myobj = result;
                worker.annotator(!worker.annotator());
            }
        });
    };
    self.delete = function(){
        
    }
}

var proto_worker = function(id,fullname,selector,annotator){
    var self = {};
    self.id = ko.observable(id);
    self.fullname = ko.observable(fullname);
    self.selector = ko.observable(selector);
    self.annotator = ko.observable(annotator);
    return self;
}

ViewModel.prototype.get_data = function(context , id){
    var self = this;
    $.ajax({
    url: "http://awt.ifmledit.org" + id + "/worker",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
    },
    success: function(result){
        var myobj = result;
        myobj = myobj.workers
        //self.workers(myobj.workers);
        var temp =[];
        $.each(myobj, function (i, obj) {
            var newObj =  proto_worker(obj.id,obj.fullname,obj.selector,obj.annotator);
            temp.push(newObj); 
        }); 
        self.workers(temp)
    }
    });
};

ViewModel.prototype.id = 'worker-select-list';

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;
    this._computing = this._repository.find(this.filters, this.fields).then(function (items) {
        self.workers(items);
        self.status('computed');
        self._computing = undefined;
    });
};


ViewModel.prototype.init = function (options,id) {
    options = options || {};
    this.filters = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.get_data(self.context,id);
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-worker-select-list', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":56}],58:[function(require,module,exports){
module.exports = "<span>      \n <c-worker-select-list params=\"context: context\"></c-worker-select-list>\n</span>";

},{}],59:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'worker-select-view';
ViewModel.prototype.children = [
    'worker-select-list' // list-available-workers
];

exports.register = function () {
    ko.components.register('c-worker-select-view', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":58}],60:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

exports.register = function () {
    require('./main-application').register();
    require('./c-account-edit-view').register();
    require('./c-create-campaign-view').register();
    require('./c-edit-campaign-view').register();
    require('./c-home-bar').register();
    require('./c-image-annotation').register();
    require('./c-image-selection').register();
    require('./c-image-upload-view').register();
    require('./c-manager-view').register();
    require('./c-show-campaign').register();
    require('./c-task-view').register();
    require('./c-worker-select-view').register();
    require('./c-account-edit-form').register();
    require('./c-create-campaign-form').register();
    require('./c-edit-campaign-form').register();
    require('./c-image-annotation-form').register();
    require('./c-image-selection-form').register();
    require('./c-image-upload-form').register();
    require('./c-login-form').register();
    require('./c-login-view').register();
    require('./c-list-campaign').register();
    require('./c-register-form').register();
    require('./c-register-view').register();
    require('./c-task-worker-list').register();
    require('./c-worker-select-list').register();
    require('./c-line-drawer').register();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./c-account-edit-form":12,"./c-account-edit-view":14,"./c-create-campaign-form":16,"./c-create-campaign-view":18,"./c-edit-campaign-form":20,"./c-edit-campaign-view":22,"./c-home-bar":24,"./c-image-annotation":28,"./c-image-annotation-form":26,"./c-image-selection":32,"./c-image-selection-form":30,"./c-image-upload-form":34,"./c-image-upload-view":36,"./c-line-drawer":37,"./c-list-campaign":39,"./c-login-form":41,"./c-login-view":43,"./c-manager-view":45,"./c-register-form":47,"./c-register-view":49,"./c-show-campaign":51,"./c-task-view":53,"./c-task-worker-list":55,"./c-worker-select-list":57,"./c-worker-select-view":59,"./main-application":62}],61:[function(require,module,exports){
module.exports = "<nav class=\"navbar navbar-default\">\n<div class=\"container-fluid\">\n<div class=\"navbar-header\">\n<button aria-expanded=\"false\" class=\"navbar-toggle collapsed\" data-target=\"#landmark-menu\" data-toggle=\"collapse\" type=\"button\">\n<span class=\"sr-only\">Toggle navigation</span>\n<span class=\"icon-bar\"></span>\n<span class=\"icon-bar\"></span>\n<span class=\"icon-bar\"></span>\n</button>\n<a class=\"navbar-brand cursor--pointer\" data-bind=\"click: trigger.bind($data,&#39;home&#39;)\">\n<img alt=\"Logo\" class=\"img__width__1c5em pull-left\" src=\"/remofiorentino/awt-project/www/images/logo.png\">\n<span class=\"vertical__middle\">\nMountain\n<b class=\"text__color--green\">\nFlag\n</b>\n</span>\n</a>\n</div>\n<div class=\"collapse navbar-collapse\" id=\"landmark-menu\">\n<ul class=\"nav navbar-nav navbar-right\" data-bind=\"if: logged() === false\">\n<li>\n<a data-bind=\"click: trigger.bind($data,&#39;login-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-log-in\"></span>\nLogin\n</a>\n</li>\n<li>\n<a data-bind=\"click: trigger.bind($data,&#39;register-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-inbox\"></span>\nRegister\n</a>\n</li>\n</ul>\n<ul class=\"nav navbar-nav navbar-right\" data-bind=\"if: logged() === true\">\n<li>\n<a>\n<b>\nDear\n<span data-bind=\"text: user_name()\"></span>\n</b>\n</a>\n</li>\n<li data-bind=\"if: manager()\">\n<a data-bind=\"click: trigger.bind($data,&#39;manager-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-picture\"></span>\nManager\n</a>\n</li>\n<li data-bind=\"if: !manager()\">\n<a data-bind=\"click: trigger.bind($data,&#39;task-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-tasks\"></span>\ntask\n</a>\n</li>\n<li>\n<a data-bind=\"click: trigger.bind($data,&#39;account-edit-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-user\"></span>\nEdit Account\n</a>\n</li>\n<li>\n<a data-bind=\"click: trigger.bind($data,&#39;logout&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-log-out\"></span>\nLogout\n</a>\n</li>\n</ul>\n</div>\n</div>\n</nav>\n<!-- / %line-drawer{:params => \"context:context,src: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg', pen: 10, line: line\"} -->\n<div class=\"container\">\n<div class=\"row\">\n<span data-bind=\"if: active() === &#39;account-edit-view&#39;\">\n<c-account-edit-view class=\"container\" params=\"context: context\"></c-account-edit-view>\n</span>\n<span data-bind=\"if: active() === &#39;create-campaign-view&#39;\">\n<c-create-campaign-view class=\"container\" params=\"context: context\"></c-create-campaign-view>\n</span>\n<span data-bind=\"if: active() === &#39;edit-campaign-view&#39;\">\n<c-edit-campaign-view class=\"container\" params=\"context: context\"></c-edit-campaign-view>\n</span>\n<span data-bind=\"if: active() === &#39;home-bar&#39;\">\n<c-home-bar class=\"container\" params=\"context: context\"></c-home-bar>\n</span>\n<span data-bind=\"if: active() === &#39;image-annotation&#39;\">\n<c-image-annotation class=\"container\" params=\"context: context\"></c-image-annotation>\n</span>\n<span data-bind=\"if: active() === &#39;image-selection&#39;\">\n<c-image-selection class=\"container\" params=\"context: context\"></c-image-selection>\n</span>\n<span data-bind=\"if: active() === &#39;image-upload-view&#39;\">\n<c-image-upload-view class=\"container\" params=\"context: context\"></c-image-upload-view>\n</span>\n<!-- /login-form -->\n<span data-bind=\"if: active() === &#39;login-view&#39;\">\n<c-login-view class=\"container\" params=\"context: context\"></c-login-view>\n</span>\n<span data-bind=\"if: active() === &#39;logout-view&#39;\">\n<c-logout-view class=\"container\" params=\"context: context\"></c-logout-view>\n</span>\n<span data-bind=\"if: active() === &#39;manager-view&#39;\">\n<c-manager-view class=\"container\" params=\"context: context\"></c-manager-view>\n</span>\n<!-- /register-form -->\n<span data-bind=\"if: active() === &#39;register-view&#39;\">\n<c-register-view class=\"container\" params=\"context: context\"></c-register-view>\n</span>\n<span data-bind=\"if: active() === &#39;show-campaign&#39;\">\n<c-show-campaign class=\"container\" params=\"context: context\"></c-show-campaign>\n</span>\n<span data-bind=\"if: active() === &#39;task-view&#39;\">\n<c-task-view class=\"container\" params=\"context: context\"></c-task-view>\n</span>\n<span data-bind=\"if: active() === &#39;worker-select-view&#39;\">\n<c-worker-select-view class=\"container\" params=\"context: context\"></c-worker-select-view>\n</span>\n</div>\n</div>";

},{}],62:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

exports.register = function () {
    ko.components.register('main-application', {
        viewModel: function(params, componentInfo) {
            var self = this,
                defaultChild = 'home-bar';
            self.context = params.context;
            self.active = ko.observable(undefined);
            self.logged = ko.observable(false);
            self.user_name = ko.observable("");
            self.manager = ko.observable(false);
            self.line=ko.observable();
            self.line.subscribe(function(){
                alert(self.line());
            })
            self.landmark = function (id) {
                self.active(id);
                self.context.vms[id].init();
            };
            self.init = function () {
                self.active(defaultChild);
                if (self.context.vms[defaultChild]) {
                    self.context.vms[defaultChild].init();
                }
            };
            
            self.isLogin = function (logged, name, manager) {
                self.logged(logged);
                self.user_name(name.charAt(0).toUpperCase() + name.slice(1));
                self.manager(manager)
            };
            self.trigger = function (id) {
                self.context.events[id](self.context);
            };
            self.context.top = self;
        },
        template: require('./index.html'),
        synchronous: true
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index.html":61}],63:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['account-edit-view']) {
            context.top.active('account-edit-view');
            context.vms['account-edit-view'].init({mask: 'account-edit-form'});
        }
        context.vms['account-edit-form'].init({},data.errors,data.fields);
    };
};

},{}],64:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['account-edit-view']) {
            context.top.active('account-edit-view');
        }
        context.vms['account-edit-view'].init();
    };
};

},{}],65:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'fullname' : data['fullname']
            ,'password' : data['password']
        };
        var promise = context.actions['send-account-edit-data']({filters: packet});
        context.runningActionsByContainer['account-edit-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['account-edit-view'].splice(
                context.runningActionsByContainer['account-edit-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],66:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        var promise = context.actions['send-annotator-to-campaign']({filters: packet});
        context.runningActionsByContainer['worker-select-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['worker-select-view'].splice(
                context.runningActionsByContainer['worker-select-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],67:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['change-campaign-state']();
        context.runningActionsByContainer['manager-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['manager-view'].splice(
                context.runningActionsByContainer['manager-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],68:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['create-campaign-view']) {
            context.top.active('create-campaign-view');
            context.vms['create-campaign-view'].init({mask: 'create-campaign-form'});
        }
        context.vms['create-campaign-form'].init({},data.errors, data.fields);
    };
};

},{}],69:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'annotation_replica' : data['annotation_replica']
            ,'annotation_size' : data['annotation_size']
            ,'name' : data['name']
            ,'selection_replica' : data['selection_replica']
            ,'threshold' : data['threshold']
        };
        var promise = context.actions['send-create-campaign-data']({filters: packet});
        context.runningActionsByContainer['create-campaign-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['create-campaign-view'].splice(
                context.runningActionsByContainer['create-campaign-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],70:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['create-campaign-view']) {
            context.top.active('create-campaign-view');
        }
        context.vms['create-campaign-view'].init();
    };
};

},{}],71:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['edit-campaign-view']) {
            context.top.active('edit-campaign-view');
            context.vms['edit-campaign-view'].init({mask: 'edit-campaign-form'});
        }
        context.vms['edit-campaign-form'].init({},data.errors,data.fields);
    };
};

},{}],72:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['edit-campaign-view']) {
            context.top.active('edit-campaign-view');
        }
        $.ajax({
        url: "http://awt.ifmledit.org" + data.id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
        },
        success: function(result){
            var myobj = result;
            context.vms['edit-campaign-form'].init({},{}, myobj);
        }
        });
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],73:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'annotation_replica' : data['annotation_replica']
            ,'annotation_size' : data['annotation_size']
            ,'name' : data['name']
            ,'selection_replica' : data['selection_replica']
            ,'threshold' : data['threshold']
            ,'id': data['id']
        };
        var promise = context.actions['send-edit-campaign']({filters: packet});
        context.runningActionsByContainer['edit-campaign-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['edit-campaign-view'].splice(
                context.runningActionsByContainer['edit-campaign-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],74:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['show-campaign']) {
            context.top.active('show-campaign');
        }
        $.ajax({
        url: "http://awt.ifmledit.org" + data.id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
        },
        success: function(result){
            var myobj = result;
            context.vms['show-campaign'].init({},myobj);
        }
        });
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],75:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['home-bar']) {
            context.top.active('home-bar');
        }
        context.vms['home-bar'].init();
        if(!$.isEmptyObject(context.repositories['current_user'])){
            if(context.repositories.current_user.type.toUpperCase() === "MASTER"){
                context.top.isLogin(true,context.repositories['current_user'].username, true);
            }else{
                context.top.isLogin(true,context.repositories['current_user'].username, false);
            }
            
        }else{
            context.top.isLogin(false, "", false);
        }
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],76:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['image-annotation']) {
            context.top.active('image-annotation');
        }
        console.log(data);
        context.vms['image-annotation-form'].init({},data.id,data.init);
    };
};

},{}],77:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'line' : data['line'],
            'id': data['id'],
            'type': 'annotation'
        };
        console.log("submit")
        var promise = context.actions['send-images-annotation']({filters: packet});
        context.runningActionsByContainer['image-annotation'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['image-annotation'].splice(
                context.runningActionsByContainer['image-annotation'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],78:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['image-selection']) {
            context.top.active('image-selection');
        }
        context.vms['image-selection-form'].init({},data.id,data.init);
    };
};

},{}],79:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'accepted' : data['accepted'],
            'id': data['id'],
            'type': 'selection'
        };
        var promise = context.actions['send-image-selection']({filters: packet});
        context.runningActionsByContainer['image-selection'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['image-selection'].splice(
                context.runningActionsByContainer['image-selection'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],80:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['image-upload-view']) {
            context.top.active('image-upload-view');
            context.vms['image-upload-view'].init({mask: 'image-upload-form'});
        }
        context.vms['image-upload-form'].init({},data.errors,data.id,data.images);
    };
};

},{}],81:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['image-upload-view']) {
            context.top.active('image-upload-view');
        }
        console.log(data.id)
        if(data.images == undefined){
            $.ajax({
            url: "http://awt.ifmledit.org" + data.id + "/image",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
            },
            success: function(result){
                var myobj = result;
                context.vms['image-upload-form'].init({},{},data.id,myobj.images,undefined);
            }
            });
        }else{
            context.vms['image-upload-form'].init({},{},data.id,data.images,data.new_image);
        }
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],82:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'image' : data['image']
            ,'id' : data['id']
            ,'images': data['images']
        };
        var promise = context.actions['send-image-upload-data']({filters: packet});
        context.runningActionsByContainer['image-upload-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['image-upload-view'].splice(
                context.runningActionsByContainer['image-upload-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],83:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvents = function (options) {
    return {
        'manager-go': require('./manager-go').createEvent(options)
        ,'image-upload-go': require('./image-upload-go').createEvent(options)
        ,'worker-select-go': require('./worker-select-go').createEvent(options)
        ,'login-go': require('./login-go').createEvent(options)
        ,'register-go': require('./register-go').createEvent(options)
        ,'logout': require('./logout').createEvent(options)
        ,'account-edit-go': require('./account-edit-go').createEvent(options)
        ,'campaign-create': require('./campaign-create').createEvent(options)
        ,'campaign-edit-go': require('./campaign-edit-go').createEvent(options)
        ,'campaign-change-state': require('./campaign-change-state').createEvent(options)
        ,'account-edit-failure': require('./account-edit-failure').createEvent(options)
        ,'on-account-edit-success': require('./on-account-edit-success').createEvent(options)
        ,'campaign-create-failure': require('./campaign-create-failure').createEvent(options)
        ,'campaign-edit-failure': require('./campaign-edit-failure').createEvent(options)
        ,'image-selection-go': require('./image-selection-go').createEvent(options)
        ,'task-go': require('./task-go').createEvent(options)
        ,'image-upload-failure': require('./image-upload-failure').createEvent(options)
        ,'image-annotation-go': require('./image-annotation-go').createEvent(options)
        ,'account-edit-submit': require('./account-edit-submit').createEvent(options)
        ,'campaign-create-submit': require('./campaign-create-submit').createEvent(options)
        ,'campaign-edit-submit': require('./campaign-edit-submit').createEvent(options)
        ,'image-annotation-submit': require('./image-annotation-submit').createEvent(options)
        ,'image-selection-submit': require('./image-selection-submit').createEvent(options)
        ,'image-upload-submit': require('./image-upload-submit').createEvent(options)
        ,'login-submit': require('./login-submit').createEvent(options)
        ,'campaign-show': require('./campaign-show').createEvent(options)
        ,'register-submit': require('./register-submit').createEvent(options)
        ,'annotator-submit-to-campaign': require('./annotator-submit-to-campaign').createEvent(options)
        ,'login-failure': require('./login-failure').createEvent(options)
        ,'register-failure': require('./register-failure').createEvent(options)
        ,'home': require('./home').createEvent(options)
    };
};

},{"./account-edit-failure":63,"./account-edit-go":64,"./account-edit-submit":65,"./annotator-submit-to-campaign":66,"./campaign-change-state":67,"./campaign-create":70,"./campaign-create-failure":68,"./campaign-create-submit":69,"./campaign-edit-failure":71,"./campaign-edit-go":72,"./campaign-edit-submit":73,"./campaign-show":74,"./home":75,"./image-annotation-go":76,"./image-annotation-submit":77,"./image-selection-go":78,"./image-selection-submit":79,"./image-upload-failure":80,"./image-upload-go":81,"./image-upload-submit":82,"./login-failure":84,"./login-go":85,"./login-submit":86,"./logout":87,"./manager-go":88,"./on-account-edit-success":89,"./register-failure":90,"./register-go":91,"./register-submit":92,"./task-go":93,"./worker-select-go":94}],84:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['login-view']) {
            context.top.active('login-view');
            context.vms['login-view'].init({mask: 'login-form'});
        }
        context.vms['login-form'].init({},data.errors, data.fields);
    };
};

},{}],85:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['login-view']) {
            context.top.active('login-view');
        }
        context.vms['login-view'].init();
    };
};

},{}],86:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'password' : data['password']
            ,'username' : data['username']
        };
        var promise = context.actions['send-login-data']({filters: packet});
        context.runningActionsByContainer['login-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['login-view'].splice(
                context.runningActionsByContainer['login-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],87:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        // var promise = context.actions['send-logout-data']();
        // context.runningActionsByContainer['main-application'].push(promise);
        // promise.then(function (result) {
        //     context.runningActionsByContainer['main-application'].splice(
        //         context.runningActionsByContainer['main-application'].indexOf(promise), 1
        //     );
        //     if (result.event) {
        //         context.events[result.event](context, result.data);
        //     }
        // });
        $.ajax({
        url: "http://awt.ifmledit.org/api/auth",
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
        },
        contentType: "application/json",
        success: function(result){
            var myobj = result;
            context.repositories.current_user = {}
            if (!context.vms['home-bar']) {
                context.top.active('home-bar');
            }
            context.vms['home-bar'].init();
            if(!$.isEmptyObject(context.repositories['current_user'])){
                if(context.repositories.current_user.type.toUpperCase() === "MASTER"){
                    context.top.isLogin(true,context.repositories['current_user'].username, true);
                }else{
                    context.top.isLogin(true,context.repositories['current_user'].username, false);
                }
                
            }else{
                context.top.isLogin(false, "", false);
            }
        }});
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],88:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['manager-view']) {
            context.top.active('manager-view');
        }
        context.vms['manager-view'].init();
        if(!$.isEmptyObject(context.repositories['current_user'])){
            if(context.repositories.current_user.type.toUpperCase() === "MASTER"){
                context.top.isLogin(true,context.repositories['current_user'].username, true);
            }else{
                context.top.isLogin(true,context.repositories['current_user'].username, false);
            }
            
        }else{
            context.top.isLogin(false, "", false);
        }
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],89:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";
//to fix it depends
exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['account-edit-view']) {
            context.top.active('account-edit-view');
        }
        context.vms['account-edit-view'].init();
    };
};

},{}],90:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        data = data || {};
        if (!context.vms['register-form']) {
            context.top.active('register-form');
        }
        context.vms['register-form'].init({},data.errors, data.fields);
    };
};

},{}],91:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['register-view']) {
            context.top.active('register-view');
        }
        context.vms['register-view'].init();
    };
};


},{}],92:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'account-type' : data['account-type']
            ,'password' : data['password']
            ,'fullname' : data['fullname']
            ,'username' : data['username']
        };
        var promise = context.actions['send-registration-data']({filters: packet},context);
        context.runningActionsByContainer['register-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['register-view'].splice(
                context.runningActionsByContainer['register-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

},{}],93:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['task-view']) {
            context.top.active('task-view');
        }
        context.vms['task-view'].init();
        if(!$.isEmptyObject(context.repositories['current_user'])){
            if(context.repositories.current_user.type.toUpperCase() === "MASTER"){
                context.top.isLogin(true,context.repositories['current_user'].username, true);
            }else{
                context.top.isLogin(true,context.repositories['current_user'].username, false);
            }
            
        }else{
            context.top.isLogin(false, "", false);
        }
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],94:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['worker-select-view']) {
            context.top.active('worker-select-view');
        }
        context.vms['worker-select-list'].init({},data.id);
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],95:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    repositories = require('./repositories'),
    controls = require('./controls'),
    events = require('./events'),
    actions = require('./actions'),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

Promise.config({cancellation: true});

controls.register();
// TODO: register any custom control

function ApplicationViewModel() {
    // TODO: initialize global state
    var repos = repositories.createRepositories({});
    this.context = {
        repositories: repos,
        events: events.createEvents({}),
        actions: actions.createActions({repositories: repos}),
        vms: {},
        runningActionsByContainer: {}
    };
}

var application = new ApplicationViewModel();

ko.applyBindings(application);

application.context.top.init();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./actions":1,"./controls":60,"./events":83,"./repositories":97}],96:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    DataStore = (typeof window !== "undefined" ? window['Nedb'] : typeof global !== "undefined" ? global['Nedb'] : null);

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    // TODO: initialization

    // TODO: remove this BEGIN
    this.db = Promise.promisifyAll(new DataStore({
        filename: 'campaign',
        inMemoryOnly: true
    }));
    // TODO: remove this END
}

Repository.prototype.findById = function (id) {
    // TODO: implement the accessor to the datasource which returns a promise
    // TODO: remove this BEGIN
    return this.db.findOneAsync({id: id});
    // TODO: remove this END
};

Repository.prototype.find = function (fields, project) {
    // TODO: implement the accessor to the datasource which returns a promise
    // TODO: remove this BEGIN
    return this.db.findAsync(fields, project);
    // TODO: remove this END
};

exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],97:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}
    repositories['campaign'] = require('./campaign').createRepository(options);
    repositories['tasks'] = require('./tasks').createRepository(options);
    repositories['workers'] = require('./workers').createRepository(options);
    // repositories['current_user'] = {
    //     "token":"7a26f105-287a-431a-99ac-eb16744e7603",
    //     "fullname":"Remo Fiorentino Casadiego",
    //     "username":"remo",
    //     "type":"master"
    // };
    repositories['current_user'] = {
        "fullname": "Mario Jorgos", 
        "username": "Mario", 
        "type": "worker",
        "token": "408afb1b-bf5b-47c2-b5d6-86509f221112"
    };
    return repositories;
};

},{"./campaign":96,"./tasks":98,"./workers":99}],98:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    DataStore = (typeof window !== "undefined" ? window['Nedb'] : typeof global !== "undefined" ? global['Nedb'] : null);

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    // TODO: initialization

    // TODO: remove this BEGIN
    this.db = Promise.promisifyAll(new DataStore({
        filename: 'tasks',
        inMemoryOnly: true
    }));
    // TODO: remove this END
}

Repository.prototype.findById = function (id) {
    // TODO: implement the accessor to the datasource which returns a promise
    // TODO: remove this BEGIN
    return this.db.findOneAsync({id: id});
    // TODO: remove this END
};

Repository.prototype.find = function (fields, project) {
    // TODO: implement the accessor to the datasource which returns a promise
    // TODO: remove this BEGIN
    return this.db.findAsync(fields, project);
    // TODO: remove this END
};

exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],99:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null),
    DataStore = (typeof window !== "undefined" ? window['Nedb'] : typeof global !== "undefined" ? global['Nedb'] : null);

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    // TODO: initialization

    // TODO: remove this BEGIN
    this.db = Promise.promisifyAll(new DataStore({
        filename: 'workers',
        inMemoryOnly: true
    }));
    // TODO: remove this END
}

Repository.prototype.findById = function (id) {
    // TODO: implement the accessor to the datasource which returns a promise
    // TODO: remove this BEGIN
    return this.db.findOneAsync({id: id});
    // TODO: remove this END
};

Repository.prototype.find = function (fields, project) {
    // TODO: implement the accessor to the datasource which returns a promise
    // TODO: remove this BEGIN
    return this.db.findAsync(fields, project);
    // TODO: remove this END
};

exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[95])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWN0aW9ucy9pbmRleC5qcyIsInNyYy9qcy9hY3Rpb25zL3NlbmQtYWNjb3VudC1lZGl0LWRhdGEuanMiLCJzcmMvanMvYWN0aW9ucy9zZW5kLWNyZWF0ZS1jYW1wYWlnbi1kYXRhLmpzIiwic3JjL2pzL2FjdGlvbnMvc2VuZC1lZGl0LWNhbXBhaWduLmpzIiwic3JjL2pzL2FjdGlvbnMvc2VuZC1pbWFnZS1zZWxlY3Rpb24uanMiLCJzcmMvanMvYWN0aW9ucy9zZW5kLWltYWdlLXVwbG9hZC1kYXRhLmpzIiwic3JjL2pzL2FjdGlvbnMvc2VuZC1pbWFnZXMtYW5ub3RhdGlvbi5qcyIsInNyYy9qcy9hY3Rpb25zL3NlbmQtbG9naW4tZGF0YS5qcyIsInNyYy9qcy9hY3Rpb25zL3NlbmQtbG9nb3V0LWRhdGEuanMiLCJzcmMvanMvYWN0aW9ucy9zZW5kLXJlZ2lzdHJhdGlvbi1kYXRhLmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtYWNjb3VudC1lZGl0LWZvcm0vaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWFjY291bnQtZWRpdC1mb3JtL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtYWNjb3VudC1lZGl0LXZpZXcvaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWFjY291bnQtZWRpdC12aWV3L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtY3JlYXRlLWNhbXBhaWduLWZvcm0vaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWNyZWF0ZS1jYW1wYWlnbi1mb3JtL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtY3JlYXRlLWNhbXBhaWduLXZpZXcvaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWNyZWF0ZS1jYW1wYWlnbi12aWV3L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtZWRpdC1jYW1wYWlnbi1mb3JtL2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1lZGl0LWNhbXBhaWduLWZvcm0vaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1lZGl0LWNhbXBhaWduLXZpZXcvaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWVkaXQtY2FtcGFpZ24tdmlldy9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLWhvbWUtYmFyL2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1ob21lLWJhci9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLWltYWdlLWFubm90YXRpb24tZm9ybS9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2UtYW5ub3RhdGlvbi1mb3JtL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2UtYW5ub3RhdGlvbi9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2UtYW5ub3RhdGlvbi9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLWltYWdlLXNlbGVjdGlvbi1mb3JtL2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1pbWFnZS1zZWxlY3Rpb24tZm9ybS9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLWltYWdlLXNlbGVjdGlvbi9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2Utc2VsZWN0aW9uL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2UtdXBsb2FkLWZvcm0vaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWltYWdlLXVwbG9hZC1mb3JtL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2UtdXBsb2FkLXZpZXcvaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWltYWdlLXVwbG9hZC12aWV3L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtbGluZS1kcmF3ZXIvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1saXN0LWNhbXBhaWduL2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1saXN0LWNhbXBhaWduL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtbG9naW4tZm9ybS9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtbG9naW4tZm9ybS9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLWxvZ2luLXZpZXcvaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWxvZ2luLXZpZXcvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1tYW5hZ2VyLXZpZXcvaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLW1hbmFnZXItdmlldy9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLXJlZ2lzdGVyLWZvcm0vaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLXJlZ2lzdGVyLWZvcm0vaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1yZWdpc3Rlci12aWV3L2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1yZWdpc3Rlci12aWV3L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2Mtc2hvdy1jYW1wYWlnbi9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2Mtc2hvdy1jYW1wYWlnbi9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLXRhc2stdmlldy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtdGFzay12aWV3L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtdGFzay13b3JrZXItbGlzdC9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtdGFzay13b3JrZXItbGlzdC9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLXdvcmtlci1zZWxlY3QtbGlzdC9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2Mtd29ya2VyLXNlbGVjdC1saXN0L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2Mtd29ya2VyLXNlbGVjdC12aWV3L2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy13b3JrZXItc2VsZWN0LXZpZXcvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvbWFpbi1hcHBsaWNhdGlvbi9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL21haW4tYXBwbGljYXRpb24vaW5kZXguanMiLCJzcmMvanMvZXZlbnRzL2FjY291bnQtZWRpdC1mYWlsdXJlLmpzIiwic3JjL2pzL2V2ZW50cy9hY2NvdW50LWVkaXQtZ28uanMiLCJzcmMvanMvZXZlbnRzL2FjY291bnQtZWRpdC1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL2Fubm90YXRvci1zdWJtaXQtdG8tY2FtcGFpZ24uanMiLCJzcmMvanMvZXZlbnRzL2NhbXBhaWduLWNoYW5nZS1zdGF0ZS5qcyIsInNyYy9qcy9ldmVudHMvY2FtcGFpZ24tY3JlYXRlLWZhaWx1cmUuanMiLCJzcmMvanMvZXZlbnRzL2NhbXBhaWduLWNyZWF0ZS1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL2NhbXBhaWduLWNyZWF0ZS5qcyIsInNyYy9qcy9ldmVudHMvY2FtcGFpZ24tZWRpdC1mYWlsdXJlLmpzIiwic3JjL2pzL2V2ZW50cy9jYW1wYWlnbi1lZGl0LWdvLmpzIiwic3JjL2pzL2V2ZW50cy9jYW1wYWlnbi1lZGl0LXN1Ym1pdC5qcyIsInNyYy9qcy9ldmVudHMvY2FtcGFpZ24tc2hvdy5qcyIsInNyYy9qcy9ldmVudHMvaG9tZS5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2UtYW5ub3RhdGlvbi1nby5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2UtYW5ub3RhdGlvbi1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL2ltYWdlLXNlbGVjdGlvbi1nby5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2Utc2VsZWN0aW9uLXN1Ym1pdC5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2UtdXBsb2FkLWZhaWx1cmUuanMiLCJzcmMvanMvZXZlbnRzL2ltYWdlLXVwbG9hZC1nby5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2UtdXBsb2FkLXN1Ym1pdC5qcyIsInNyYy9qcy9ldmVudHMvaW5kZXguanMiLCJzcmMvanMvZXZlbnRzL2xvZ2luLWZhaWx1cmUuanMiLCJzcmMvanMvZXZlbnRzL2xvZ2luLWdvLmpzIiwic3JjL2pzL2V2ZW50cy9sb2dpbi1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL2xvZ291dC5qcyIsInNyYy9qcy9ldmVudHMvbWFuYWdlci1nby5qcyIsInNyYy9qcy9ldmVudHMvb24tYWNjb3VudC1lZGl0LXN1Y2Nlc3MuanMiLCJzcmMvanMvZXZlbnRzL3JlZ2lzdGVyLWZhaWx1cmUuanMiLCJzcmMvanMvZXZlbnRzL3JlZ2lzdGVyLWdvLmpzIiwic3JjL2pzL2V2ZW50cy9yZWdpc3Rlci1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL3Rhc2stZ28uanMiLCJzcmMvanMvZXZlbnRzL3dvcmtlci1zZWxlY3QtZ28uanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvcmVwb3NpdG9yaWVzL2NhbXBhaWduL2luZGV4LmpzIiwic3JjL2pzL3JlcG9zaXRvcmllcy9pbmRleC5qcyIsInNyYy9qcy9yZXBvc2l0b3JpZXMvdGFza3MvaW5kZXguanMiLCJzcmMvanMvcmVwb3NpdG9yaWVzL3dvcmtlcnMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3BIQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDekhBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlIQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9IQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNJQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5SEE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbERBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVJQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxR0E7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pKQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsR0E7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbERBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUlBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcEpBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5R0E7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL0lBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqQ0E7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ3NlbmQtYWNjb3VudC1lZGl0LWRhdGEnOiByZXF1aXJlKCcuL3NlbmQtYWNjb3VudC1lZGl0LWRhdGEnKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICAgICAgLCdzZW5kLWNyZWF0ZS1jYW1wYWlnbi1kYXRhJzogcmVxdWlyZSgnLi9zZW5kLWNyZWF0ZS1jYW1wYWlnbi1kYXRhJykuY3JlYXRlQWN0aW9uKG9wdGlvbnMpXG4gICAgICAgICwnc2VuZC1lZGl0LWNhbXBhaWduJzogcmVxdWlyZSgnLi9zZW5kLWVkaXQtY2FtcGFpZ24nKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICAgICAgLCdzZW5kLWltYWdlLXNlbGVjdGlvbic6IHJlcXVpcmUoJy4vc2VuZC1pbWFnZS1zZWxlY3Rpb24nKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICAgICAgLCdzZW5kLWltYWdlLXVwbG9hZC1kYXRhJzogcmVxdWlyZSgnLi9zZW5kLWltYWdlLXVwbG9hZC1kYXRhJykuY3JlYXRlQWN0aW9uKG9wdGlvbnMpXG4gICAgICAgICwnc2VuZC1pbWFnZXMtYW5ub3RhdGlvbic6IHJlcXVpcmUoJy4vc2VuZC1pbWFnZXMtYW5ub3RhdGlvbicpLmNyZWF0ZUFjdGlvbihvcHRpb25zKVxuICAgICAgICAsJ3NlbmQtbG9nb3V0LWRhdGEnOiByZXF1aXJlKCcuL3NlbmQtbG9nb3V0LWRhdGEnKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICAgICAgLCdzZW5kLWxvZ2luLWRhdGEnOiByZXF1aXJlKCcuL3NlbmQtbG9naW4tZGF0YScpLmNyZWF0ZUFjdGlvbihvcHRpb25zKVxuICAgICAgICAsJ3NlbmQtcmVnaXN0cmF0aW9uLWRhdGEnOiByZXF1aXJlKCcuL3NlbmQtcmVnaXN0cmF0aW9uLWRhdGEnKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcblxudmFyIG9wdGlvbjtcblxuZnVuY3Rpb24gQWN0aW9uKG9wdGlvbnMpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgLy8gVE9ETzogR2xvYmFsIEluaXRpYWxpemF0aW9uXG4gICAgb3B0aW9uID0gb3B0aW9ucy5yZXBvc2l0b3JpZXM7XG59XG5BY3Rpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzLCBzb2x2ZSkgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgUGFyYW1ldGVyczpcbiAgICBwYXJhbWV0ZXJzWydmdWxsbmFtZSddXG4gICAgcGFyYW1ldGVyc1sncGFzc3dvcmQnXVxuICAgIHZhciBkYXRhID0ge307XG4gICAgdmFyIGRhdG9zID0ge1xuICAgICAgICBcImZ1bGxuYW1lXCI6IHBhcmFtZXRlcnNbJ2Z1bGxuYW1lJ10sXG4gICAgICAgIFwicGFzc3dvcmRcIjogcGFyYW1ldGVyc1sncGFzc3dvcmQnXSxcbiAgICB9O1xuICAgICQuYWpheCh7XG4gICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnL2FwaS91c2VyL21lXCIsXG4gICAgdHlwZTogXCJQVVRcIixcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIitvcHRpb24uY3VycmVudF91c2VyLnRva2VuKTtcbiAgICB9LFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdG9zKSxcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICBvcHRpb24uY3VycmVudF91c2VyLmZ1bGxuYW1lID0gZGF0b3MuZnVsbG5hbWVcbiAgICAgICAgaWYob3B0aW9uLmN1cnJlbnRfdXNlci50eXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiTUFTVEVSXCIpe1xuICAgICAgICAgICAgICAgIHNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdtYW5hZ2VyLWdvJywgLy8gbWFuYWdlci1nb1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgICAgIGV2ZW50OiAndGFzay1nbycsIC8vIHRhc2stZ29cbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3I6ICBmdW5jdGlvbih4aHIpIHtcbiAgICAgICAgLy9kYXRhID0gIHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIHZhciBteW9iaiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGRhdGEgPXtcbiAgICAgICAgICAgIGZpZWxkczp7XG4gICAgICAgICAgICAgICAgXCJmdWxsbmFtZVwiOiBwYXJhbWV0ZXJzWydmdWxsbmFtZSddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yczp7XG4gICAgICAgICAgICAgICAgJ3Bhc3N3b3JkJzogbXlvYmouZXJyb3IucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgJ2Z1bGxuYW1lJzogbXlvYmouZXJyb3IuZnVsbG5hbWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZW9mKG15b2JqLmVycm9yKSA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgZGF0YS5lcnJvcnNbJ290aGVycyddID0gbXlvYmouZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgZXZlbnQ6ICdhY2NvdW50LWVkaXQtZmFpbHVyZScsIFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICB9fSk7XG59O1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIGFjdGlvbiA9IG5ldyBBY3Rpb24ob3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKGRhdGEgJiYgZGF0YS5maWx0ZXJzKSB8fCB7fTtcbiAgICAgICAgICAgIGFjdGlvbi5ydW4ocGFyYW1ldGVycywgc29sdmUsIG9uQ2FuY2VsKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG4gICAgXG52YXIgb3B0aW9uO1xuXG5mdW5jdGlvbiBBY3Rpb24ob3B0aW9ucykgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICAvLyBUT0RPOiBHbG9iYWwgSW5pdGlhbGl6YXRpb25cbiAgICBvcHRpb24gPSBvcHRpb25zLnJlcG9zaXRvcmllcztcbn1cbkFjdGlvbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMsIHNvbHZlKSB7IC8vIGFkZCBcIm9uQ2FuY2VsXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICBQYXJhbWV0ZXJzOlxuICAgIHBhcmFtZXRlcnNbJ2Fubm90YXRpb25fcmVwbGljYSddXG4gICAgcGFyYW1ldGVyc1snYW5ub3RhdGlvbl9zaXplJ11cbiAgICBwYXJhbWV0ZXJzWyduYW1lJ11cbiAgICBwYXJhbWV0ZXJzWydzZWxlY3Rpb25fcmVwbGljYSddXG4gICAgcGFyYW1ldGVyc1sndGhyZXNob2xkJ11cbiAgICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBkYXRvcyA9IHtcbiAgICAgICAgXCJhbm5vdGF0aW9uX3JlcGxpY2FcIjogcGFyc2VJbnQocGFyYW1ldGVyc1snYW5ub3RhdGlvbl9yZXBsaWNhJ10pLFxuICAgICAgICBcImFubm90YXRpb25fc2l6ZVwiOiBwYXJzZUludChwYXJhbWV0ZXJzWydhbm5vdGF0aW9uX3NpemUnXSksXG4gICAgICAgIFwibmFtZVwiOiBwYXJhbWV0ZXJzWyduYW1lJ10sXG4gICAgICAgIFwic2VsZWN0aW9uX3JlcGxpY2FcIjogcGFyc2VJbnQocGFyYW1ldGVyc1snc2VsZWN0aW9uX3JlcGxpY2EnXSksXG4gICAgICAgIFwidGhyZXNob2xkXCI6IHBhcnNlSW50KHBhcmFtZXRlcnNbJ3RocmVzaG9sZCddKSxcbiAgICB9O1xuICAgICQuYWpheCh7XG4gICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnL2FwaS9jYW1wYWlnblwiLFxuICAgIHR5cGU6IFwiUE9TVFwiLCBcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIitvcHRpb24uY3VycmVudF91c2VyLnRva2VuKTtcbiAgICB9LFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdG9zKSxcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0LCB0ZXh0U3RhdHVzLCByZXF1ZXN0KXtcbiAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICBkYXRhLmlkID0gcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcignbG9jYXRpb24nKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKCdsb2NhdGlvbicpKVxuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ2ltYWdlLXVwbG9hZC1nbycsIFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yOiAgZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgIHZhciBteW9iaiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGRhdGEgPXtcbiAgICAgICAgICAgIGZpZWxkczp7XG4gICAgICAgICAgICAgICAgXCJhbm5vdGF0aW9uX3JlcGxpY2FcIjogcGFyYW1ldGVyc1snYW5ub3RhdGlvbl9yZXBsaWNhJ10sXG4gICAgICAgICAgICAgICAgXCJhbm5vdGF0aW9uX3NpemVcIjogcGFyYW1ldGVyc1snYW5ub3RhdGlvbl9zaXplJ10sXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IHBhcmFtZXRlcnNbJ25hbWUnXSxcbiAgICAgICAgICAgICAgICBcInNlbGVjdGlvbl9yZXBsaWNhXCI6IHBhcmFtZXRlcnNbJ3NlbGVjdGlvbl9yZXBsaWNhJ10sXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogcGFyYW1ldGVyc1sndGhyZXNob2xkJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JzOntcbiAgICAgICAgICAgICAgICBcImFubm90YXRpb25fcmVwbGljYVwiOiBteW9iai5lcnJvclsnYW5ub3RhdGlvbl9yZXBsaWNhJ10sXG4gICAgICAgICAgICAgICAgXCJhbm5vdGF0aW9uX3NpemVcIjogbXlvYmouZXJyb3JbJ2Fubm90YXRpb25fc2l6ZSddLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBteW9iai5lcnJvclsnbmFtZSddLFxuICAgICAgICAgICAgICAgIFwic2VsZWN0aW9uX3JlcGxpY2FcIjogbXlvYmouZXJyb3JbJ3NlbGVjdGlvbl9yZXBsaWNhJ10sXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogbXlvYmouZXJyb3JbJ3RocmVzaG9sZCddLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKHR5cGVvZihteW9iai5lcnJvcikgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIGRhdGEuZXJyb3JzWydvdGhlcnMnXSA9IG15b2JqLmVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHNvbHZlKHtcbiAgICAgICAgICAgIGV2ZW50OiAnY2FtcGFpZ24tY3JlYXRlLWZhaWx1cmUnLCBcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfX0pO1xuICAgIC8vIFRPRE86IEV4ZWN1dGlvblxuICAgIC8vIHNvbHZlKHtcbiAgICAvLyAgICAgZXZlbnQ6ICdjYW1wYWlnbi1jcmVhdGUtZmFpbHVyZScsIC8vIGNhbXBhaWduLWNyZWF0ZS1mYWlsdXJlXG4gICAgLy8gICAgIC8vIGV2ZW50OiAnaW1hZ2UtdXBsb2FkLWdvJywgLy8gaW1hZ2UtdXBsb2FkLWdvXG4gICAgLy8gICAgIGRhdGE6IHtcbiAgICAvLyAgICAgICAgICdMb2NhdGlvbic6ICcwJyxcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xufTtcblxuZXhwb3J0cy5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBhY3Rpb24gPSBuZXcgQWN0aW9uKG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHNvbHZlLCByZWplY3QsIG9uQ2FuY2VsKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IChkYXRhICYmIGRhdGEuZmlsdGVycykgfHwge307XG4gICAgICAgICAgICBhY3Rpb24ucnVuKHBhcmFtZXRlcnMsIHNvbHZlLCBvbkNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xuICAgIFxudmFyIG9wdGlvbjtcblxuZnVuY3Rpb24gQWN0aW9uKG9wdGlvbnMpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgLy8gVE9ETzogR2xvYmFsIEluaXRpYWxpemF0aW9uXG4gICAgb3B0aW9uID0gb3B0aW9ucy5yZXBvc2l0b3JpZXM7XG59XG5BY3Rpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzLCBzb2x2ZSkgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgUGFyYW1ldGVyczpcbiAgICBwYXJhbWV0ZXJzWydhbm5vdGF0aW9uX3JlcGxpY2EnXVxuICAgIHBhcmFtZXRlcnNbJ2Fubm90YXRpb25fc2l6ZSddXG4gICAgcGFyYW1ldGVyc1snbmFtZSddXG4gICAgcGFyYW1ldGVyc1snc2VsZWN0aW9uX3JlcGxpY2EnXVxuICAgIHBhcmFtZXRlcnNbJ3RocmVzaG9sZCddXG4gICAgcGFyYW1ldGVyc1snaWQnXVxuICAgIHZhciBkYXRhID0ge307XG4gICAgdmFyIGRhdG9zID0ge1xuICAgICAgICBcImFubm90YXRpb25fcmVwbGljYVwiOiBwYXJzZUludChwYXJhbWV0ZXJzWydhbm5vdGF0aW9uX3JlcGxpY2EnXSksXG4gICAgICAgIFwiYW5ub3RhdGlvbl9zaXplXCI6IHBhcnNlSW50KHBhcmFtZXRlcnNbJ2Fubm90YXRpb25fc2l6ZSddKSxcbiAgICAgICAgXCJuYW1lXCI6IHBhcmFtZXRlcnNbJ25hbWUnXSxcbiAgICAgICAgXCJzZWxlY3Rpb25fcmVwbGljYVwiOiBwYXJzZUludChwYXJhbWV0ZXJzWydzZWxlY3Rpb25fcmVwbGljYSddKSxcbiAgICAgICAgXCJ0aHJlc2hvbGRcIjogcGFyc2VJbnQocGFyYW1ldGVyc1sndGhyZXNob2xkJ10pLFxuICAgIH07XG4gICAgJC5hamF4KHtcbiAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIiArIHBhcmFtZXRlcnNbJ2lkJ10sXG4gICAgdHlwZTogXCJQVVRcIiwgXG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrb3B0aW9uLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgfSxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRvcyksXG4gICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIHZhciBteW9iaiA9IHJlc3VsdDtcbiAgICAgICAgZGF0b3MuaWQgPSBwYXJhbWV0ZXJzWydpZCddO1xuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ2ltYWdlLXVwbG9hZC1nbycsIFxuICAgICAgICAgICAgZGF0YTogZGF0b3NcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcjogIGZ1bmN0aW9uKHhocikge1xuICAgICAgICB2YXIgbXlvYmogPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICBkYXRhID17XG4gICAgICAgICAgICBmaWVsZHM6e1xuICAgICAgICAgICAgICAgIFwiYW5ub3RhdGlvbl9yZXBsaWNhXCI6IHBhcmFtZXRlcnNbJ2Fubm90YXRpb25fcmVwbGljYSddLFxuICAgICAgICAgICAgICAgIFwiYW5ub3RhdGlvbl9zaXplXCI6IHBhcmFtZXRlcnNbJ2Fubm90YXRpb25fc2l6ZSddLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBwYXJhbWV0ZXJzWyduYW1lJ10sXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rpb25fcmVwbGljYVwiOiBwYXJhbWV0ZXJzWydzZWxlY3Rpb25fcmVwbGljYSddLFxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IHBhcmFtZXRlcnNbJ3RocmVzaG9sZCddLFxuICAgICAgICAgICAgICAgIFwiaWRcIjogcGFyYW1ldGVyc1snaWQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yczp7XG4gICAgICAgICAgICAgICAgXCJhbm5vdGF0aW9uX3JlcGxpY2FcIjogbXlvYmouZXJyb3JbJ2Fubm90YXRpb25fcmVwbGljYSddLFxuICAgICAgICAgICAgICAgIFwiYW5ub3RhdGlvbl9zaXplXCI6IG15b2JqLmVycm9yWydhbm5vdGF0aW9uX3NpemUnXSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogbXlvYmouZXJyb3JbJ25hbWUnXSxcbiAgICAgICAgICAgICAgICBcInNlbGVjdGlvbl9yZXBsaWNhXCI6IG15b2JqLmVycm9yWydzZWxlY3Rpb25fcmVwbGljYSddLFxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IG15b2JqLmVycm9yWyd0aHJlc2hvbGQnXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YobXlvYmouZXJyb3IpID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICBkYXRhLmVycm9yc1snb3RoZXJzJ10gPSBteW9iai5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ2NhbXBhaWduLWVkaXQtZmFpbHVyZScsIFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICB9fSk7XG4gICAgLy8gJC5ub3RpZnkoe21lc3NhZ2U6ICdzZW5kLWVkaXQtY2FtcGFpZ24nfSwge2FsbG93X2Rpc21pc3M6IHRydWUsIHR5cGU6ICdzdWNjZXNzJ30pO1xuICAgIC8vIHNvbHZlKHtcbiAgICAvLyAgICAgZXZlbnQ6ICdjYW1wYWlnbi1lZGl0LWdvJywgLy8gY2FtcGFpZ24tZWRpdC1nb1xuICAgIC8vICAgICAvLyBldmVudDogJ2NhbXBhaWduLWVkaXQtZmFpbHVyZScsIC8vIGNhbXBhaWduLWVkaXQtZmFpbHVyZVxuICAgIC8vICAgICBkYXRhOiB7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcbiAgICBvcHRpb24gPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIEFjdGlvbihvcHRpb25zKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIG9wdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzO1xufVxuQWN0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocGFyYW1ldGVycywgc29sdmUpIHsgLy8gYWRkIFwib25DYW5jZWxcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIFBhcmFtZXRlcnM6XG4gICAgcGFyYW1ldGVyc1snYWNjZXB0ZWQnXVxuICAgIHBhcmFtZXRlcnNbJ2lkJ11cbiAgICBwYXJhbWV0ZXJzWyd0eXBlJ11cbiAgICB2YXIgZGF0YVRvU2VuZCA9IHtcbiAgICAgICAgXCJhY2NlcHRlZFwiOiBCb29sZWFuKHBhcmFtZXRlcnNbJ2FjY2VwdGVkJ10pLFxuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZ1wiKyBwYXJhbWV0ZXJzWydpZCddICtcIi9zZXNzaW9uXCIsXG4gICAgdHlwZTogXCJQVVRcIixcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhVG9TZW5kKSxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIisgb3B0aW9uLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICdpZCc6IHBhcmFtZXRlcnNbJ2lkJ10sXG4gICAgICAgICAgICAgICAgJ2luaXQnOiBcImZhbHNlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgZXZlbnQ6ICdpbWFnZS1zZWxlY3Rpb24tZ28nLCBcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcjpmdW5jdGlvbiAoeGhyLCBhamF4T3B0aW9ucywgdGhyb3duRXJyb3Ipe1xuICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnaWQnOiBwYXJhbWV0ZXJzWydpZCddLFxuICAgICAgICAgICAgICAgICdpbml0JzogXCJmYWxzZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdpbWFnZS1zZWxlY3Rpb24tZ28nLCBcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgfSk7XG4gICAgLy8gVEhJUyBDQU4gQkUgUkVNT1ZFRCAoQkVHSU4pXG4gICAgLy8gJC5ub3RpZnkoe21lc3NhZ2U6ICdzZW5kLWltYWdlLXNlbGVjdGlvbid9LCB7YWxsb3dfZGlzbWlzczogdHJ1ZSwgdHlwZTogJ3N1Y2Nlc3MnfSk7XG4gICAgLy8gc29sdmUoe1xuICAgIC8vICAgICBldmVudDogJ2ltYWdlLXNlbGVjdGlvbi1nbycsIC8vIGltYWdlLXNlbGVjdGlvbi1nb1xuICAgIC8vICAgICAvLyBldmVudDogJ3Rhc2stZ28nLCAvLyB0YXNrLWdvXG4gICAgLy8gICAgIGRhdGE6IHtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEVORClcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbiAgICBcbnZhciBvcHRpb247XG5cbmZ1bmN0aW9uIEFjdGlvbihvcHRpb25zKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIG9wdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzO1xufVxuXG5BY3Rpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzLCBzb2x2ZSkgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgUGFyYW1ldGVyczpcbiAgICBwYXJhbWV0ZXJzWydpbWFnZSddO1xuICAgIHBhcmFtZXRlcnNbJ2lkJ107XG4gICAgcGFyYW1ldGVyc1snaW1hZ2VzJ107XG4gICAgdmFyIGRhdGEgPSB7fTtcbiAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChcImltZ1wiLCBwYXJhbWV0ZXJzWydpbWFnZSddKVxuICAgICQuYWpheCh7XG4gICAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIiArIHBhcmFtZXRlcnNbJ2lkJ10gKyBcIi9pbWFnZVwiICxcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrb3B0aW9uLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0LCB0ZXh0U3RhdHVzLCByZXF1ZXN0KXtcbiAgICAgICAgdmFyIG5ld191cmwgPSByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKCdsb2NhdGlvbicpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIiArIG5ld191cmwsXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIitvcHRpb24uY3VycmVudF91c2VyLnRva2VuKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIHZhciBteW9iaiA9IHJlc3VsdDtcbiAgICAgICAgICAgIGRhdGEuaWQgPSBwYXJhbWV0ZXJzWydpZCddO1xuICAgICAgICAgICAgZGF0YS5pbWFnZXMgPSBwYXJhbWV0ZXJzWydpbWFnZXMnXTtcbiAgICAgICAgICAgIGRhdGEubmV3X2ltYWdlID0ge1xuICAgICAgICAgICAgICBcImlkXCI6IG15b2JqLmlkLFxuICAgICAgICAgICAgICBcImNhbm9uaWNhbFwiOiBteW9iai5jYW5vbmljYWwsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdpbWFnZS11cGxvYWQtZ28nLCBcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogIGZ1bmN0aW9uKHhocikge1xuICAgICAgICB2YXIgbXlvYmogPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICBkYXRhID17XG4gICAgICAgICAgICBpZDogcGFyYW1ldGVyc1snaWQnXSxcbiAgICAgICAgICAgIGltYWdlczogcGFyYW1ldGVyc1snaW1hZ2VzJ10sXG4gICAgICAgICAgICBlcnJvcnM6e1xuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogbXlvYmouZXJyb3JbJ2ltYWdlJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YobXlvYmouZXJyb3IpID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICBkYXRhLmVycm9yc1snb3RoZXJzJ10gPSBteW9iai5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ2ltYWdlLXVwbG9hZC1mYWlsdXJlJywgXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH19KTtcbiAgICAvLyAkLm5vdGlmeSh7bWVzc2FnZTogJ3NlbmQtaW1hZ2UtdXBsb2FkLWRhdGEnfSwge2FsbG93X2Rpc21pc3M6IHRydWUsIHR5cGU6ICdzdWNjZXNzJ30pO1xuICAgIC8vIHNvbHZlKHtcbiAgICAvLyAgICAgZXZlbnQ6ICdpbWFnZS11cGxvYWQtZmFpbHVyZScsIC8vIGltYWdlLXVwbG9hZC1mYWlsdXJlXG4gICAgLy8gICAgIC8vIGV2ZW50OiAnd29ya2VyLXNlbGVjdC1nbycsIC8vIHdvcmtlci1zZWxlY3QtZ29cbiAgICAvLyAgICAgZGF0YToge1xuICAgIC8vICAgICAgICAgJ2xvY2F0aW9uJzogJzAnLFxuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG59O1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIGFjdGlvbiA9IG5ldyBBY3Rpb24ob3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKGRhdGEgJiYgZGF0YS5maWx0ZXJzKSB8fCB7fTtcbiAgICAgICAgICAgIGFjdGlvbi5ydW4ocGFyYW1ldGVycywgc29sdmUsIG9uQ2FuY2VsKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXG4gICAgb3B0aW9uID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBBY3Rpb24ob3B0aW9ucykgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICAvLyBUT0RPOiBHbG9iYWwgSW5pdGlhbGl6YXRpb25cbiAgICBvcHRpb24gPSBvcHRpb25zLnJlcG9zaXRvcmllcztcbn1cbkFjdGlvbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMsIHNvbHZlKSB7IC8vIGFkZCBcIm9uQ2FuY2VsXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICBQYXJhbWV0ZXJzOlxuICAgIHBhcmFtZXRlcnNbJ2xpbmUnXVxuICAgIHBhcmFtZXRlcnNbJ2lkJ11cbiAgICBwYXJhbWV0ZXJzWyd0eXBlJ11cbiAgICB2YXIgZGF0YVRvU2VuZCA9IHtcbiAgICAgICAgXCJza3lsaW5lXCI6IHBhcmFtZXRlcnNbJ2xpbmUnXSxcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJzZW5kXCIpXG4gICAgJC5hamF4KHtcbiAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIisgcGFyYW1ldGVyc1snaWQnXSArXCIvc2Vzc2lvblwiLFxuICAgIHR5cGU6IFwiUFVUXCIsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YVRvU2VuZCksXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrIG9wdGlvbi5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnaWQnOiBwYXJhbWV0ZXJzWydpZCddLFxuICAgICAgICAgICAgICAgICdpbml0JzogXCJmYWxzZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIHNvbHZlKHtcbiAgICAgICAgICAgIGV2ZW50OiAnaW1hZ2UtYW5ub3RhdGlvbi1nbycsIFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yOmZ1bmN0aW9uICh4aHIsIGFqYXhPcHRpb25zLCB0aHJvd25FcnJvcil7XG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICdpZCc6IHBhcmFtZXRlcnNbJ2lkJ10sXG4gICAgICAgICAgICAgICAgJ2luaXQnOiBcImZhbHNlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvbHZlKHtcbiAgICAgICAgICAgICAgICBldmVudDogJ2ltYWdlLWFubm90YXRpb24tZ28nLCBcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIGFjdGlvbiA9IG5ldyBBY3Rpb24ob3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKGRhdGEgJiYgZGF0YS5maWx0ZXJzKSB8fCB7fTtcbiAgICAgICAgICAgIGFjdGlvbi5ydW4ocGFyYW1ldGVycywgc29sdmUsIG9uQ2FuY2VsKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG52YXIgb3B0aW9uO1xuXG5cbmZ1bmN0aW9uIEFjdGlvbihvcHRpb25zKSB7IFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIG9wdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzO1xufVxuXG5BY3Rpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzLCBzb2x2ZSkgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgUGFyYW1ldGVyczpcbiAgICBwYXJhbWV0ZXJzWydwYXNzd29yZCddO1xuICAgIHBhcmFtZXRlcnNbJ3VzZXJuYW1lJ107XG4gICAgdmFyIGRhdGEgPSB7fTtcbiAgICB2YXIgZGF0b3MgPSB7XG4gICAgICAgIFwidXNlcm5hbWVcIjogcGFyYW1ldGVyc1sndXNlcm5hbWUnXSxcbiAgICAgICAgXCJwYXNzd29yZFwiOiBwYXJhbWV0ZXJzWydwYXNzd29yZCddLFxuICAgIH07XG4gICAgJC5hamF4KHtcbiAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmcvYXBpL2F1dGhcIixcbiAgICB0eXBlOiBcIlBPU1RcIixcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElLZXkgZmI3MmUxZmUtMzU4My0xMWU3LWE5MTktOTJlYmNiNjdmZTMzXCIpO1xuICAgIH0sXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0b3MpLFxuICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgIG9wdGlvbi5jdXJyZW50X3VzZXIgPSB7XG4gICAgICAgICAgICBcInVzZXJuYW1lXCI6IGRhdG9zLnVzZXJuYW1lLFxuICAgICAgICAgICAgXCJ0b2tlblwiOiBteW9iai50b2tlblxuICAgICAgICB9XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZy9hcGkvdXNlci9tZVwiLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrbXlvYmoudG9rZW4pO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgdmFyIG15b2JqMiA9IHJlc3VsdDtcbiAgICAgICAgICAgIG9wdGlvbi5jdXJyZW50X3VzZXIgPSB7XG4gICAgICAgICAgICAgICAgXCJmdWxsbmFtZVwiOiBteW9iajIuZnVsbG5hbWUsXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBkYXRvcy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICBcInRva2VuXCI6IG15b2JqLnRva2VuLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBteW9iajIudHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobXlvYmoyLnR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJNQVNURVJcIil7XG4gICAgICAgICAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogJ21hbmFnZXItZ28nLCAvLyBtYW5hZ2VyLWdvXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICd0YXNrLWdvJywgLy8gdGFzay1nb1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcjogIGZ1bmN0aW9uKHhocikge1xuICAgICAgICAvL2RhdGEgPSAgeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgdmFyIG15b2JqID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgZGF0YSA9e1xuICAgICAgICAgICAgZmllbGRzOntcbiAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IHBhcmFtZXRlcnNbJ3VzZXJuYW1lJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JzOntcbiAgICAgICAgICAgICAgICAncGFzc3dvcmQnOiBteW9iai5lcnJvci5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAndXNlcm5hbWUnOiBteW9iai5lcnJvci51c2VybmFtZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YobXlvYmouZXJyb3IpID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICBkYXRhLmVycm9yc1snb3RoZXJzJ10gPSBteW9iai5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ2xvZ2luLWZhaWx1cmUnLCBcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfX0pO1xufTtcblxuZXhwb3J0cy5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBhY3Rpb24gPSBuZXcgQWN0aW9uKG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHNvbHZlLCByZWplY3QsIG9uQ2FuY2VsKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IChkYXRhICYmIGRhdGEuZmlsdGVycykgfHwge307XG4gICAgICAgICAgICBhY3Rpb24ucnVuKHBhcmFtZXRlcnMsIHNvbHZlLCBvbkNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xudmFyIG9wdGlvbjtcblxuZnVuY3Rpb24gQWN0aW9uKG9wdGlvbnMpIHsgXG4gICAgLy8gVE9ETzogR2xvYmFsIEluaXRpYWxpemF0aW9uXG4gICAgb3B0aW9uID0gb3B0aW9ucy5yZXBvc2l0b3JpZXM7XG59XG5BY3Rpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzLCBzb2x2ZSkgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgdmFyIGRhdGEgPSB7fTtcbiAgICAkLmFqYXgoe1xuICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZy9hcGkvYXV0aFwiLFxuICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrb3B0aW9uLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgfSxcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICBvcHRpb24uY3VycmVudF91c2VyID0ge31cbiAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgZXZlbnQ6ICdob21lJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfX0pO1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEVORClcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbnZhciBvcHRpb247XG5cbmZ1bmN0aW9uIEFjdGlvbihvcHRpb25zKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIC8qXG4gICAgZXhhbXBsZTpcbiAgICAqL1xuICAgIG9wdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzO1xuICAgIFxufVxuQWN0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocGFyYW1ldGVycywgc29sdmUsb3B0aW9ucykgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgUGFyYW1ldGVyczpcbiAgICBwYXJhbWV0ZXJzWydhY2NvdW50LXR5cGUnXTtcbiAgICBwYXJhbWV0ZXJzWydmdWxsbmFtZSddO1xuICAgIHBhcmFtZXRlcnNbJ3Bhc3N3b3JkJ107XG4gICAgcGFyYW1ldGVyc1sndXNlcm5hbWUnXTtcbiAgICAvLyBUT0RPOiBFeGVjdXRpb25cbiAgICAvKlxuICAgIGV4YW1wbGU6XG4gICAgbWFpbC5maW5kKHtzdWJqZWN0OiAnUmU6ICcgKyBkYXRhLnN1YmplY3R9KVxuICAgICAgICAudGhlbihzb2x2ZSk7XG4gICAgKi9cbiAgICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBkYXRvcyA9IHtcbiAgICAgICAgXCJmdWxsbmFtZVwiOiBwYXJhbWV0ZXJzWydmdWxsbmFtZSddLFxuICAgICAgICBcInVzZXJuYW1lXCI6IHBhcmFtZXRlcnNbJ3VzZXJuYW1lJ10sXG4gICAgICAgIFwicGFzc3dvcmRcIjogcGFyYW1ldGVyc1sncGFzc3dvcmQnXSxcbiAgICAgICAgXCJ0eXBlXCI6IHBhcmFtZXRlcnNbJ2FjY291bnQtdHlwZSddXG4gICAgfTtcbiAgICAkLmFqYXgoe1xuICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZy9hcGkvdXNlclwiLFxuICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSUtleSBmYjcyZTFmZS0zNTgzLTExZTctYTkxOS05MmViY2I2N2ZlMzNcIik7XG4gICAgfSxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRvcyksXG4gICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZy9hcGkvYXV0aFwiLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSUtleSBmYjcyZTFmZS0zNTgzLTExZTctYTkxOS05MmViY2I2N2ZlMzNcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwidXNlcm5hbWVcIjogZGF0b3MudXNlcm5hbWUsXG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IGRhdG9zLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgb3B0aW9uLmN1cnJlbnRfdXNlciA9IHtcbiAgICAgICAgICAgICAgICBcImZ1bGxuYW1lXCI6IGRhdG9zLmZ1bGxuYW1lLFxuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogZGF0b3MudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGRhdG9zLnR5cGUsXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBteW9iai50b2tlblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGF0b3MudHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIk1BU1RFUlwiKXtcbiAgICAgICAgICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnbWFuYWdlci1nbycsIC8vIG1hbmFnZXItZ29cbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogJ3Rhc2stZ28nLCAvLyB0YXNrLWdvXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yOiAgZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgIC8vZGF0YSA9ICB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICB2YXIgbXlvYmogPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICBkYXRhID17XG4gICAgICAgICAgICBmaWVsZHM6e1xuICAgICAgICAgICAgICAgIFwiZnVsbG5hbWVcIjogcGFyYW1ldGVyc1snZnVsbG5hbWUnXSxcbiAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IHBhcmFtZXRlcnNbJ3VzZXJuYW1lJ10sXG4gICAgICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBwYXJhbWV0ZXJzWydwYXNzd29yZCddLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBwYXJhbWV0ZXJzWydhY2NvdW50LXR5cGUnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yczp7XG4gICAgICAgICAgICAgICAgJ2FjY291bnQtdHlwZSc6IG15b2JqLmVycm9yLnR5cGUsXG4gICAgICAgICAgICAgICAgJ2Z1bGxuYW1lJzogbXlvYmouZXJyb3IuZnVsbG5hbWUsXG4gICAgICAgICAgICAgICAgJ3Bhc3N3b3JkJzogbXlvYmouZXJyb3IucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgJ3VzZXJuYW1lJzogbXlvYmouZXJyb3IudXNlcm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ3JlZ2lzdGVyLWZhaWx1cmUnLCAvLyByZWdpc3Rlci1mYWlsdXJlXG4gICAgICAgICAgICAvLyBldmVudDogJ3Rhc2stZ28nLCAvLyB0YXNrLWdvXG4gICAgICAgICAgICAvLyBldmVudDogJ21hbmFnZXItZ28nLCAvLyBtYW5hZ2VyLWdvXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH19KTtcbiAgICAvLyBUSElTIENBTiBCRSBSRU1PVkVEIChCRUdJTilcbiAgICAvLyQubm90aWZ5KHttZXNzYWdlOiAnc2VuZC1yZWdpc3RyYXRpb24tZGF0YSd9LCB7YWxsb3dfZGlzbWlzczogdHJ1ZSwgdHlwZTogJ3N1Y2Nlc3MnfSk7XG4gICAgXG4gICAgLy8gVEhJUyBDQU4gQkUgUkVNT1ZFRCAoRU5EKVxufTtcblxuZXhwb3J0cy5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBhY3Rpb24gPSBuZXcgQWN0aW9uKG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSxjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKGRhdGEgJiYgZGF0YS5maWx0ZXJzKSB8fCB7fTtcbiAgICAgICAgICAgIGFjdGlvbi5ydW4ocGFyYW1ldGVycywgc29sdmUsIG9uQ2FuY2VsLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+XFxuPGRpdiBjbGFzcz1cXFwid2VsbCBjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTIgY29sLXNtLTEwIGNvbC1zbS1vZmZzZXQtMVxcXCI+XFxuPGZpZWxkc2V0PlxcbjxsZWdlbmQgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5FZGl0IEFjY291bnQ8L2xlZ2VuZD5cXG48Zm9ybT5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7b3RoZXJzJiMzOTtdfVxcXCI+XFxuPGg1IGNsYXNzPVxcXCJoZWxwLWJsb2NrIHRleHQtY2VudGVyXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7b3RoZXJzJiMzOTtdXFxcIiBpZD1cXFwibG9naW4tZm9ybV9maWVsZF9lcnJvclxcXCI+PC9oNT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7ZnVsbG5hbWUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2Z1bGxuYW1lJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Z1bGxuYW1lJiMzOTtdfVxcXCIgZm9yPVxcXCJhY2NvdW50LWVkaXQtZm9ybV9maWVsZF8wXFxcIj5GdWxsbmFtZTwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWyYjMzk7ZnVsbG5hbWUmIzM5O11cXFwiIGlkPVxcXCJhY2NvdW50LWVkaXQtZm9ybV9maWVsZF8wXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O2Z1bGxuYW1lJiMzOTtdXFxcIiBpZD1cXFwiYWNjb3VudC1lZGl0LWZvcm1fZmllbGRfMF9lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtwYXNzd29yZCYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7cGFzc3dvcmQmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7cGFzc3dvcmQmIzM5O119XFxcIiBmb3I9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzFcXFwiPlBhc3N3b3JkPC9sYWJlbD5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwiYWNjb3VudC1lZGl0LWZvcm1fZmllbGRfMV9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTtwYXNzd29yZCYjMzk7XVxcXCIgaWQ9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzFcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O3Bhc3N3b3JkJiMzOTtdXFxcIiBpZD1cXFwiYWNjb3VudC1lZGl0LWZvcm1fZmllbGRfMV9lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtjb25maXJtX3Bhc3N3b3JkJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtjb25maXJtX3Bhc3N3b3JkJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2NvbmZpcm1fcGFzc3dvcmQmIzM5O119XFxcIiBmb3I9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzFcXFwiPkNvbmZpcm0gUGFzc3dvcmQ8L2xhYmVsPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJhY2NvdW50LWVkaXQtZm9ybV9maWVsZF8xX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInRleHRJbnB1dDogZmllbGRzKClbJiMzOTtjb25maXJtX3Bhc3N3b3JkJiMzOTtdXFxcIiBpZD1cXFwiYWNjb3VudC1lZGl0LWZvcm1fZmllbGRfMVxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7Y29uZmlybV9wYXNzd29yZCYjMzk7XVxcXCIgaWQ9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzFfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Zvcm0+XFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciBtYXJnaW5fX3RvcC0tMjBweFxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCAmIzM5O2FjY291bnQtZWRpdC1zdWJtaXQmIzM5OylcXFwiPlxcblN1Ym1pdFxcbjwvYT5cXG48YnI+XFxuPGhyIGNsYXNzPVxcXCJzZXBhcmF0b3IgbWFyZ2luX19jZW50ZXJcXFwiPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZmllbGRzZXQ+XFxuPC9kaXY+XFxuPC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuICAgIHNlbGYuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgc2VsZi5maWVsZHMgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICBzZWxmLmVycm9ycyA9IGtvLm9ic2VydmFibGUoe30pO1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciBmbGFnID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNlbGYuZXJyb3JzKCkpIHtcbiAgICAgICAgICBpZiAoc2VsZi5lcnJvcnMoKS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBpZihzZWxmLmVycm9ycygpW2tleV0oKSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihmbGFnKXtcbiAgICAgICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgc2VsZi5vdXRwdXQpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKGVycm9yc19zZW50KSB7XG4gICAgdGhpcy5maWVsZHMoKVsnZnVsbG5hbWUnXSh0aGlzLmNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXS5mdWxsbmFtZSk7XG4gICAgdGhpcy5maWVsZHMoKVsncGFzc3dvcmQnXSh0aGlzLmNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXS5wYXNzd29yZCk7XG4gICAgdGhpcy5lcnJvcnMoKVsnZnVsbG5hbWUnXShlcnJvcnNfc2VudC5mdWxsbmFtZSk7XG4gICAgdGhpcy5lcnJvcnMoKVsncGFzc3dvcmQnXShlcnJvcnNfc2VudC5wYXNzd29yZCk7XG4gICAgdGhpcy5lcnJvcnMoKVsnb3RoZXJzJ10oZXJyb3JzX3NlbnQub3RoZXJzKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnYWNjb3VudC1lZGl0LWZvcm0nO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXRwdXQgPSB7XG4gICAgICAgICdmdWxsbmFtZSc6IHRoaXMuaW5wdXRbJ2Z1bGxuYW1lJ10sXG4gICAgICAgICdwYXNzd29yZCc6IHRoaXMuaW5wdXRbJ3Bhc3N3b3JkJ10sXG4gICAgICAgICdjb25maXJtX3Bhc3N3b3JkJzogdGhpcy5pbnB1dFsnY29uZmlybV9wYXNzd29yZCddLFxuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICdmdWxsbmFtZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnZnVsbG5hbWUnXSksXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3Bhc3N3b3JkJ10pLFxuICAgICAgICAgICAgJ2NvbmZpcm1fcGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2NvbmZpcm1fcGFzc3dvcmQnXSksXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9ycyA9IHtcbiAgICAgICAgICAgICdmdWxsbmFtZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnZnVsbG5hbWUtZXJyb3InXSksXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3Bhc3N3b3JkLWVycm9yJ10pLFxuICAgICAgICAgICAgJ2NvbmZpcm1fcGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2NvbmZpcm1fcGFzc3dvcmQtZXJyb3InXSksXG4gICAgICAgICAgICAnb3RoZXJzJzoga28ub2JzZXJ2YWJsZSgpLFxuICAgICAgICB9O1xuICAgIGZpZWxkc1snZnVsbG5hbWUnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0WydmdWxsbmFtZSddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ2Z1bGxuYW1lJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ3Bhc3N3b3JkJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsncGFzc3dvcmQnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydwYXNzd29yZCddKHVuZGVmaW5lZCk7XG4gICAgICAgIGlmKHNlbGYub3V0cHV0Wydjb25maXJtX3Bhc3N3b3JkJ10gIT0gc2VsZi5vdXRwdXRbJ3Bhc3N3b3JkJ10pe1xuICAgICAgICAgICAgc2VsZi5lcnJvcnMoKVsnY29uZmlybV9wYXNzd29yZCddKFwiTXVzdCBtYXRjaCBwYXNzd29yZFwiKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZWxmLmVycm9ycygpWydjb25maXJtX3Bhc3N3b3JkJ10odW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZpZWxkc1snY29uZmlybV9wYXNzd29yZCddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ2NvbmZpcm1fcGFzc3dvcmQnXSA9IHZhbHVlO1xuICAgICAgICBpZihzZWxmLm91dHB1dFsnY29uZmlybV9wYXNzd29yZCddICE9IHNlbGYub3V0cHV0WydwYXNzd29yZCddKXtcbiAgICAgICAgICAgIHNlbGYuZXJyb3JzKClbJ2NvbmZpcm1fcGFzc3dvcmQnXShcIk11c3QgbWF0Y2ggcGFzc3dvcmRcIik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2VsZi5lcnJvcnMoKVsnY29uZmlybV9wYXNzd29yZCddKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmZpZWxkcyhmaWVsZHMpO1xuICAgIHRoaXMuZXJyb3JzKGVycm9ycyk7XG4gICAgdGhpcy5zdGF0dXMoJ2NvbXB1dGVkJyk7XG59O1xuXG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBlcnJvcnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBlcnJvcnMgPSBlcnJvcnMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICBzZWxmLmZpbGwoZXJyb3JzKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHNlbGYuX2luaXRpYWxpemluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSwgMSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtYWNjb3VudC1lZGl0LWZvcm0nLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkgeyBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzcGFuPiAgICA8IS0tIGFjY291bnQtZWRpdC1mb3JtIC0tPiAgICA8Yy1hY2NvdW50LWVkaXQtZm9ybSBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1hY2NvdW50LWVkaXQtZm9ybT48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdhY2NvdW50LWVkaXQtdmlldyc7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW1xuICAgICdhY2NvdW50LWVkaXQtZm9ybScgLy8gYWNjb3VudC1lZGl0LWZvcm1cbl07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1hY2NvdW50LWVkaXQtdmlldycsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+XFxuPGRpdiBjbGFzcz1cXFwid2VsbCBjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTIgY29sLXNtLTEwIGNvbC1zbS1vZmZzZXQtMVxcXCI+XFxuPGZpZWxkc2V0PlxcbjxsZWdlbmQgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5cXG48Yj5cXG5DcmVhdGUgYSBDYW1wYWlnbiFcXG48L2I+XFxuPC9sZWdlbmQ+XFxuPGZvcm0gY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O290aGVycyYjMzk7XX1cXFwiPlxcbjxoNSBjbGFzcz1cXFwiaGVscC1ibG9jayB0ZXh0LWNlbnRlclxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O290aGVycyYjMzk7XVxcXCIgaWQ9XFxcImxvZ2luLWZvcm1fZmllbGRfZXJyb3JcXFwiPjwvaDU+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O25hbWUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLWxnLTUgY29sLXNtLTQgdGV4dF9fYWxsaWduLS1sZWZ0XFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtuYW1lJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O25hbWUmIzM5O119XFxcIiBmb3I9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzJcXFwiPlxcbjxiPlxcbk5hbWUgb2YgY2FtcGFpZ246XFxuPC9iPlxcbjwvbGFiZWw+XFxuPGRpdiBjbGFzcz1cXFwiY29sLWxnLTcgY29sLXNtLThcXFwiPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8yX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O25hbWUmIzM5O11cXFwiIGlkPVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8yXFxcIiBwbGFjZWhvbGRlcj1cXFwiQSBnb29kIG5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7bmFtZSYjMzk7XVxcXCIgaWQ9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzJfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48bGVnZW5kPkltYWdlIFNlbGVjdGlvbjwvbGVnZW5kPlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgcm93XFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7c2VsZWN0aW9uX3JlcGxpY2EmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLWxnLTUgY29sLXNtLTYgdGV4dF9fYWxsaWduLS1sZWZ0XFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtzZWxlY3Rpb25fcmVwbGljYSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtzZWxlY3Rpb25fcmVwbGljYSYjMzk7XX1cXFwiIGZvcj1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfM1xcXCI+XFxuPGI+XFxuTWluaW11bSBudW1iZXIgb2Ygd29ya2VycyBwZXIgaW1hZ2U6XFxuPC9iPlxcbjwvbGFiZWw+XFxuPGRpdiBjbGFzcz1cXFwiY29sLWxnLTcgY29sLXNtLTZcXFwiPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8zX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O3NlbGVjdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfM1xcXCIgbWluPVxcXCIxXFxcIiB0eXBlPVxcXCJudW1iZXJcXFwiIHZhbHVlPVxcXCIxXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O3NlbGVjdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfM19lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgcm93XFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7dGhyZXNob2xkJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1sZy01IGNvbC1zbS02IHRleHRfX2FsbGlnbi0tbGVmdFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7dGhyZXNob2xkJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3RocmVzaG9sZCYjMzk7XX1cXFwiIGZvcj1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfNFxcXCI+XFxuPGI+XFxuTWluaW11bSBudW1iZXIgb2YgcG9zaXRpdmUgcmVzdWx0czpcXG48L2I+XFxuPC9sYWJlbD5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtbGctNyBjb2wtc20tNlxcXCI+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzRfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWyYjMzk7dGhyZXNob2xkJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfNFxcXCIgbWluPVxcXCIxXFxcIiB0eXBlPVxcXCJudW1iZXJcXFwiIHZhbHVlPVxcXCIxXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O3RocmVzaG9sZCYjMzk7XVxcXCIgaWQ9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzRfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48bGVnZW5kPkltYWdlIEFubm90YXRpb248L2xlZ2VuZD5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvd1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtbGctNSBjb2wtc20tNiB0ZXh0X19hbGxpZ24tLWxlZnRcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTthbm5vdGF0aW9uX3JlcGxpY2EmIzM5O119XFxcIiBmb3I9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzBcXFwiPlxcbjxiPlxcbk1pbmltdW0gbnVtYmVyIG9mIHdvcmtlcnMgcGVyIGltYWdlOlxcbjwvYj5cXG48L2xhYmVsPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1sZy03IGNvbC1zbS02XFxcIj5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMF9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTthbm5vdGF0aW9uX3JlcGxpY2EmIzM5O11cXFwiIGlkPVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8wXFxcIiBtaW49XFxcIjFcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgdmFsdWU9XFxcIjFcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7YW5ub3RhdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMF9lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgcm93XFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7YW5ub3RhdGlvbl9zaXplJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1sZy01IGNvbC1zbS02IHRleHRfX2FsbGlnbi0tbGVmdFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7YW5ub3RhdGlvbl9zaXplJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fc2l6ZSYjMzk7XX1cXFwiIGZvcj1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMVxcXCI+XFxuPGI+XFxuV2lkdGgoaW4gcGl4ZWxzKSBvZiB0aGUgYW5ub3RhdGlvbiBsaW5lOlxcbjwvYj5cXG48L2xhYmVsPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1sZy03IGNvbC1zbS02XFxcIj5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMV9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTthbm5vdGF0aW9uX3NpemUmIzM5O11cXFwiIGlkPVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8xXFxcIiBtYXg9XFxcIjEwXFxcIiBtaW49XFxcIjFcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgdmFsdWU9XFxcIjFcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7YW5ub3RhdGlvbl9zaXplJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMV9lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZm9ybT5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInRleHQtY2VudGVyIG1hcmdpbl9fdG9wLS0yMHB4XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsICYjMzk7Y2FtcGFpZ24tY3JlYXRlLXN1Ym1pdCYjMzk7KVxcXCI+XFxuQ1JFQVRFXFxuPC9hPlxcbjxicj5cXG48aHIgY2xhc3M9XFxcInNlcGFyYXRvciBtYXJnaW5fX2NlbnRlclxcXCI+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9maWVsZHNldD5cXG48L2Rpdj5cXG48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcbiAgICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHNlbGYuZmllbGRzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG4gICAgc2VsZi5lcnJvcnMgPSBrby5vYnNlcnZhYmxlKHt9KTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQsIHNlbGYub3V0cHV0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2NyZWF0ZS1jYW1wYWlnbi1mb3JtJztcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAoZXJyb3JzX3NlbnQsZmllbGRzX3NlbnQpIHtcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChmaWVsZHNfc2VudCkpe1xuICAgICAgICB0aGlzLmZpZWxkcygpWydhbm5vdGF0aW9uX3JlcGxpY2EnXShmaWVsZHNfc2VudC5hbm5vdGF0aW9uX3JlcGxpY2EpO1xuICAgICAgICB0aGlzLmZpZWxkcygpWydhbm5vdGF0aW9uX3NpemUnXShmaWVsZHNfc2VudC5hbm5vdGF0aW9uX3NpemUpO1xuICAgICAgICB0aGlzLmZpZWxkcygpWyduYW1lJ10oZmllbGRzX3NlbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ3NlbGVjdGlvbl9yZXBsaWNhJ10oZmllbGRzX3NlbnQuc2VsZWN0aW9uX3JlcGxpY2EpO1xuICAgICAgICB0aGlzLmZpZWxkcygpWyd0aHJlc2hvbGQnXShmaWVsZHNfc2VudC50aHJlc2hvbGQpO1xuICAgIH1cbiAgICB0aGlzLmVycm9ycygpWydhbm5vdGF0aW9uX3JlcGxpY2EnXShlcnJvcnNfc2VudC5hbm5vdGF0aW9uX3JlcGxpY2EpO1xuICAgIHRoaXMuZXJyb3JzKClbJ2Fubm90YXRpb25fc2l6ZSddKGVycm9yc19zZW50LmFubm90YXRpb25fc2l6ZSk7XG4gICAgdGhpcy5lcnJvcnMoKVsnbmFtZSddKGVycm9yc19zZW50Lm5hbWUpO1xuICAgIHRoaXMuZXJyb3JzKClbJ3NlbGVjdGlvbl9yZXBsaWNhJ10oZXJyb3JzX3NlbnQuc2VsZWN0aW9uX3JlcGxpY2EpO1xuICAgIHRoaXMuZXJyb3JzKClbJ3RocmVzaG9sZCddKGVycm9yc19zZW50LnRocmVzaG9sZCk7XG4gICAgdGhpcy5lcnJvcnMoKVsnb3RoZXJzJ10oZXJyb3JzX3NlbnQub3RoZXJzKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXRwdXQgPSB7XG4gICAgICAgICdhbm5vdGF0aW9uX3JlcGxpY2EnOiB0aGlzLmlucHV0Wydhbm5vdGF0aW9uX3JlcGxpY2EnXSxcbiAgICAgICAgJ2Fubm90YXRpb25fc2l6ZSc6IHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fc2l6ZSddLFxuICAgICAgICAnbmFtZSc6IHRoaXMuaW5wdXRbJ25hbWUnXSxcbiAgICAgICAgJ3NlbGVjdGlvbl9yZXBsaWNhJzogdGhpcy5pbnB1dFsnc2VsZWN0aW9uX3JlcGxpY2EnXSxcbiAgICAgICAgJ3RocmVzaG9sZCc6IHRoaXMuaW5wdXRbJ3RocmVzaG9sZCddLFxuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICdhbm5vdGF0aW9uX3JlcGxpY2EnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fcmVwbGljYSddKSxcbiAgICAgICAgICAgICdhbm5vdGF0aW9uX3NpemUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fc2l6ZSddKSxcbiAgICAgICAgICAgICduYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WyduYW1lJ10pLFxuICAgICAgICAgICAgJ3NlbGVjdGlvbl9yZXBsaWNhJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydzZWxlY3Rpb25fcmVwbGljYSddKSxcbiAgICAgICAgICAgICd0aHJlc2hvbGQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3RocmVzaG9sZCddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ2Fubm90YXRpb25fcmVwbGljYSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbl9yZXBsaWNhLWVycm9yJ10pLFxuICAgICAgICAgICAgJ2Fubm90YXRpb25fc2l6ZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbl9zaXplLWVycm9yJ10pLFxuICAgICAgICAgICAgJ25hbWUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ25hbWUtZXJyb3InXSksXG4gICAgICAgICAgICAnc2VsZWN0aW9uX3JlcGxpY2EnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3NlbGVjdGlvbl9yZXBsaWNhLWVycm9yJ10pLFxuICAgICAgICAgICAgJ3RocmVzaG9sZCc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsndGhyZXNob2xkLWVycm9yJ10pLFxuICAgICAgICAgICAgJ290aGVycyc6IGtvLm9ic2VydmFibGUoKSxcbiAgICAgICAgfTtcbiAgICBmaWVsZHNbJ2Fubm90YXRpb25fcmVwbGljYSddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ2Fubm90YXRpb25fcmVwbGljYSddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ2Fubm90YXRpb25fcmVwbGljYSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWydhbm5vdGF0aW9uX3NpemUnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wydhbm5vdGF0aW9uX3NpemUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydhbm5vdGF0aW9uX3NpemUnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGZpZWxkc1snbmFtZSddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ25hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyduYW1lJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ3NlbGVjdGlvbl9yZXBsaWNhJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnc2VsZWN0aW9uX3JlcGxpY2EnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydzZWxlY3Rpb25fcmVwbGljYSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWyd0aHJlc2hvbGQnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wyd0aHJlc2hvbGQnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyd0aHJlc2hvbGQnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5lcnJvcnMoZXJyb3JzKTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsZXJyb3JzLGZpZWxkcykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGVycm9ycyA9IGVycm9ycyB8fCB7fTtcbiAgICBmaWVsZHMgPSBmaWVsZHMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICBzZWxmLmZpbGwoZXJyb3JzLGZpZWxkcyk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWNyZWF0ZS1jYW1wYWlnbi1mb3JtJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHsgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG4gIDwhLS0gY3JlYXRlLWNhbXBhaWduLWZvcm0gLS0+XFxuICA8Yy1jcmVhdGUtY2FtcGFpZ24tZm9ybSBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPlxcbiAgPC9jLWNyZWF0ZS1jYW1wYWlnbi1mb3JtPlxcbjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2NyZWF0ZS1jYW1wYWlnbi12aWV3JztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2NyZWF0ZS1jYW1wYWlnbi1mb3JtJyAvLyBjcmVhdGUtY2FtcGFpZ24tZm9ybVxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWNyZWF0ZS1jYW1wYWlnbi12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG48ZGl2IGNsYXNzPVxcXCJ3ZWxsIGNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMiBjb2wtc20tMTAgY29sLXNtLW9mZnNldC0xXFxcIj5cXG48ZmllbGRzZXQ+XFxuPGxlZ2VuZCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPlxcbjxiPlxcbkVkaXQgeW91ciBDYW1wYWlnbiFcXG48L2I+XFxuPC9sZWdlbmQ+XFxuPGZvcm0gY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O290aGVycyYjMzk7XX1cXFwiPlxcbjxoNSBjbGFzcz1cXFwiaGVscC1ibG9jayB0ZXh0LWNlbnRlclxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O290aGVycyYjMzk7XVxcXCIgaWQ9XFxcImxvZ2luLWZvcm1fZmllbGRfZXJyb3JcXFwiPjwvaDU+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O25hbWUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLWxnLTUgY29sLXNtLTQgdGV4dF9fYWxsaWduLS1sZWZ0XFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtuYW1lJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O25hbWUmIzM5O119XFxcIiBmb3I9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8yXFxcIj5cXG48Yj5cXG5OYW1lIG9mIGNhbXBhaWduOlxcbjwvYj5cXG48L2xhYmVsPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1sZy03IGNvbC1zbS04XFxcIj5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwiZWRpdC1jYW1wYWlnbi1mb3JtX2ZpZWxkXzJfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWyYjMzk7bmFtZSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8yXFxcIiBwbGFjZWhvbGRlcj1cXFwiQSBnb29kIG5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7bmFtZSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8yX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPGxlZ2VuZD5JbWFnZSBTZWxlY3Rpb248L2xlZ2VuZD5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvd1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3NlbGVjdGlvbl9yZXBsaWNhJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1sZy01IGNvbC1zbS02IHRleHRfX2FsbGlnbi0tbGVmdFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7c2VsZWN0aW9uX3JlcGxpY2EmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7c2VsZWN0aW9uX3JlcGxpY2EmIzM5O119XFxcIiBmb3I9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8zXFxcIj5cXG48Yj5cXG5NaW5pbXVtIG51bWJlciBvZiB3b3JrZXJzIHBlciBpbWFnZTpcXG48L2I+XFxuPC9sYWJlbD5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtbGctNyBjb2wtc20tNlxcXCI+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8zX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O3NlbGVjdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiZWRpdC1jYW1wYWlnbi1mb3JtX2ZpZWxkXzNcXFwiIG1pbj1cXFwiMVxcXCIgdHlwZT1cXFwibnVtYmVyXFxcIiB2YWx1ZT1cXFwiMVxcXCI+XFxuPHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JzKClbJiMzOTtzZWxlY3Rpb25fcmVwbGljYSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8zX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCByb3dcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTt0aHJlc2hvbGQmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLWxnLTUgY29sLXNtLTYgdGV4dF9fYWxsaWduLS1sZWZ0XFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTt0aHJlc2hvbGQmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7dGhyZXNob2xkJiMzOTtdfVxcXCIgZm9yPVxcXCJlZGl0LWNhbXBhaWduLWZvcm1fZmllbGRfNFxcXCI+XFxuPGI+XFxuTWluaW11bSBudW1iZXIgb2YgcG9zaXRpdmUgcmVzdWx0czpcXG48L2I+XFxuPC9sYWJlbD5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtbGctNyBjb2wtc20tNlxcXCI+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF80X2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O3RocmVzaG9sZCYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF80XFxcIiBtaW49XFxcIjFcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgdmFsdWU9XFxcIjFcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7dGhyZXNob2xkJiMzOTtdXFxcIiBpZD1cXFwiZWRpdC1jYW1wYWlnbi1mb3JtX2ZpZWxkXzRfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48bGVnZW5kPkltYWdlIEFubm90YXRpb248L2xlZ2VuZD5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvd1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtbGctNSBjb2wtc20tNiB0ZXh0X19hbGxpZ24tLWxlZnRcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTthbm5vdGF0aW9uX3JlcGxpY2EmIzM5O119XFxcIiBmb3I9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8wXFxcIj5cXG48Yj5cXG5NaW5pbXVtIG51bWJlciBvZiB3b3JrZXJzIHBlciBpbWFnZTpcXG48L2I+XFxuPC9sYWJlbD5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtbGctNyBjb2wtc20tNlxcXCI+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8wX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8wXFxcIiBtaW49XFxcIjFcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgdmFsdWU9XFxcIjFcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7YW5ub3RhdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiZWRpdC1jYW1wYWlnbi1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvd1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fc2l6ZSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtbGctNSBjb2wtc20tNiB0ZXh0X19hbGxpZ24tLWxlZnRcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2Fubm90YXRpb25fc2l6ZSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTthbm5vdGF0aW9uX3NpemUmIzM5O119XFxcIiBmb3I9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8xXFxcIj5cXG48Yj5cXG5XaWR0aChpbiBwaXhlbHMpIG9mIHRoZSBhbm5vdGF0aW9uIGxpbmU6XFxuPC9iPlxcbjwvbGFiZWw+XFxuPGRpdiBjbGFzcz1cXFwiY29sLWxnLTcgY29sLXNtLTZcXFwiPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJlZGl0LWNhbXBhaWduLWZvcm1fZmllbGRfMV9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTthbm5vdGF0aW9uX3NpemUmIzM5O11cXFwiIGlkPVxcXCJlZGl0LWNhbXBhaWduLWZvcm1fZmllbGRfMVxcXCIgbWF4PVxcXCIzMFxcXCIgbWluPVxcXCIxXFxcIiB0eXBlPVxcXCJudW1iZXJcXFwiIHZhbHVlPVxcXCIxXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fc2l6ZSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8xX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9mb3JtPlxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuPGRpdiBjbGFzcz1cXFwidGV4dC1jZW50ZXIgbWFyZ2luX190b3AtLTIwcHhcXFwiPlxcbjxhIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwgJiMzOTtjYW1wYWlnbi1lZGl0LXN1Ym1pdCYjMzk7KVxcXCI+XFxuRURJVFxcbjwvYT5cXG48YnI+XFxuPHAgY2xhc3M9XFxcIm1hcmdpbl9fdG9wLS0xMHB4XFxcIj5cXG5JIHdhbnQgdG8gdXBsb2FkIGltYWdlcyxcXG48YSBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTtpbWFnZS11cGxvYWQtZ28mIzM5OylcXFwiPlxcbkltYWdlcyBVcGxvYWRcXG48L2E+XFxuPC9wPlxcbjxwIGNsYXNzPVxcXCJtYXJnaW5fX3RvcC0tMTBweFxcXCI+XFxuSSB3YW50IHRvIHNlbGVjdCB3b3JrZXJzLFxcbjxhIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O3dvcmtlci1zZWxlY3QtZ28mIzM5OylcXFwiPlxcblNlbGVjdCBXb3JrZXJcXG48L2E+XFxuPC9wPlxcbjxociBjbGFzcz1cXFwic2VwYXJhdG9yIG1hcmdpbl9fY2VudGVyXFxcIj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2ZpZWxkc2V0PlxcbjwvZGl2Plxcbjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuICAgIHNlbGYuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgc2VsZi5maWVsZHMgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICBzZWxmLmVycm9ycyA9IGtvLm9ic2VydmFibGUoe30pO1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgc2VsZi5vdXRwdXQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIChlcnJvcnNfc2VudCxmaWVsZHNfc2VudCkge1xuICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KGZpZWxkc19zZW50KSl7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ2Fubm90YXRpb25fcmVwbGljYSddKGZpZWxkc19zZW50LmFubm90YXRpb25fcmVwbGljYSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ2Fubm90YXRpb25fc2l6ZSddKGZpZWxkc19zZW50LmFubm90YXRpb25fc2l6ZSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ25hbWUnXShmaWVsZHNfc2VudC5uYW1lKTtcbiAgICAgICAgdGhpcy5maWVsZHMoKVsnc2VsZWN0aW9uX3JlcGxpY2EnXShmaWVsZHNfc2VudC5zZWxlY3Rpb25fcmVwbGljYSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ3RocmVzaG9sZCddKGZpZWxkc19zZW50LnRocmVzaG9sZCk7XG4gICAgICAgIHRoaXMub3V0cHV0LmlkID0gZmllbGRzX3NlbnQuaWQ7XG4gICAgfVxuICAgIHRoaXMuZXJyb3JzKClbJ2Fubm90YXRpb25fcmVwbGljYSddKGVycm9yc19zZW50LmFubm90YXRpb25fcmVwbGljYSk7XG4gICAgdGhpcy5lcnJvcnMoKVsnYW5ub3RhdGlvbl9zaXplJ10oZXJyb3JzX3NlbnQuYW5ub3RhdGlvbl9zaXplKTtcbiAgICB0aGlzLmVycm9ycygpWyduYW1lJ10oZXJyb3JzX3NlbnQubmFtZSk7XG4gICAgdGhpcy5lcnJvcnMoKVsnc2VsZWN0aW9uX3JlcGxpY2EnXShlcnJvcnNfc2VudC5zZWxlY3Rpb25fcmVwbGljYSk7XG4gICAgdGhpcy5lcnJvcnMoKVsndGhyZXNob2xkJ10oZXJyb3JzX3NlbnQudGhyZXNob2xkKTtcbiAgICB0aGlzLmVycm9ycygpWydvdGhlcnMnXShlcnJvcnNfc2VudC5vdGhlcnMpO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdlZGl0LWNhbXBhaWduLWZvcm0nO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXRwdXQgPSB7XG4gICAgICAgICdhbm5vdGF0aW9uX3JlcGxpY2EnOiB0aGlzLmlucHV0Wydhbm5vdGF0aW9uX3JlcGxpY2EnXSxcbiAgICAgICAgJ2Fubm90YXRpb25fc2l6ZSc6IHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fc2l6ZSddLFxuICAgICAgICAnbmFtZSc6IHRoaXMuaW5wdXRbJ25hbWUnXSxcbiAgICAgICAgJ3NlbGVjdGlvbl9yZXBsaWNhJzogdGhpcy5pbnB1dFsnc2VsZWN0aW9uX3JlcGxpY2EnXSxcbiAgICAgICAgJ3RocmVzaG9sZCc6IHRoaXMuaW5wdXRbJ3RocmVzaG9sZCddLFxuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICdhbm5vdGF0aW9uX3JlcGxpY2EnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fcmVwbGljYSddKSxcbiAgICAgICAgICAgICdhbm5vdGF0aW9uX3NpemUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fc2l6ZSddKSxcbiAgICAgICAgICAgICduYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WyduYW1lJ10pLFxuICAgICAgICAgICAgJ3NlbGVjdGlvbl9yZXBsaWNhJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydzZWxlY3Rpb25fcmVwbGljYSddKSxcbiAgICAgICAgICAgICd0aHJlc2hvbGQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3RocmVzaG9sZCddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ2Fubm90YXRpb25fcmVwbGljYSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbl9yZXBsaWNhLWVycm9yJ10pLFxuICAgICAgICAgICAgJ2Fubm90YXRpb25fc2l6ZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbl9zaXplLWVycm9yJ10pLFxuICAgICAgICAgICAgJ25hbWUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ25hbWUtZXJyb3InXSksXG4gICAgICAgICAgICAnc2VsZWN0aW9uX3JlcGxpY2EnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3NlbGVjdGlvbl9yZXBsaWNhLWVycm9yJ10pLFxuICAgICAgICAgICAgJ3RocmVzaG9sZCc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsndGhyZXNob2xkLWVycm9yJ10pLFxuICAgICAgICAgICAgJ290aGVycyc6IGtvLm9ic2VydmFibGUoKSxcbiAgICAgICAgfTtcbiAgICBmaWVsZHNbJ2Fubm90YXRpb25fcmVwbGljYSddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ2Fubm90YXRpb25fcmVwbGljYSddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ2Fubm90YXRpb25fcmVwbGljYSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWydhbm5vdGF0aW9uX3NpemUnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wydhbm5vdGF0aW9uX3NpemUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydhbm5vdGF0aW9uX3NpemUnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGZpZWxkc1snbmFtZSddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ25hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyduYW1lJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ3NlbGVjdGlvbl9yZXBsaWNhJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnc2VsZWN0aW9uX3JlcGxpY2EnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydzZWxlY3Rpb25fcmVwbGljYSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWyd0aHJlc2hvbGQnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wyd0aHJlc2hvbGQnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyd0aHJlc2hvbGQnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5lcnJvcnMoZXJyb3JzKTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsZXJyb3JzLGZpZWxkcykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGVycm9ycyA9IGVycm9ycyB8fCB7fTtcbiAgICBmaWVsZHMgPSBmaWVsZHMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICBzZWxmLmZpbGwoZXJyb3JzLGZpZWxkcyk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWVkaXQtY2FtcGFpZ24tZm9ybScsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+ICAgIFxcbiAgPCEtLSBlZGl0LWNhbXBhaWduLWZvcm0gLS0+ICAgIFxcbiAgPGMtZWRpdC1jYW1wYWlnbi1mb3JtIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+XFxuICA8L2MtZWRpdC1jYW1wYWlnbi1mb3JtPlxcbjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2VkaXQtY2FtcGFpZ24tdmlldyc7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW1xuICAgICdlZGl0LWNhbXBhaWduLWZvcm0nIC8vIGVkaXQtY2FtcGFpZ24tZm9ybVxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWVkaXQtY2FtcGFpZ24tdmlldycsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwianVtYm90cm9uXFxcIj5cXG48aDE+TW91bnRhaW4gRmxhZzwvaDE+XFxuPHA+VGhlIG1hbmFnZXIgY2FuIGNyZWF0ZSBvbmUgb3IgbW9yZSBjcm93ZHNvdXJjaW5nIGNhbXBhaWducy4gQSBjYW1wYWlnbiBoYXMgYSBuYW1lLCBzb21lIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBhbmQgYSBzZXQgb2YgaW5wdXQgaW1hZ2VzLiBBaW0gb2YgdGhlIGNhbXBhaWduIGlzIHRoZSBhbm5vdGF0aW9uIG9mIGltYWdlcyB3aXRoIHRoZSBza3lsaW5lIG9mIHRoZSBsYW5kc2NhcGUuIEEgcHJlbGltaW5hcnkgc3RlcCBhbGxvd3Mgd29ya2VycyB0byB2YWxpZGF0ZSBvciBkaXNjYXJkIHRoZSBpbWFnZXMgdG8gYmUgYW5ub3RhdGVkOiBvbmx5IHRoZSBpbWFnZXMgdGhhdCBjb250YWluIGEgbW91bnRhaW4gcHJvZmlsZSB3aWxsIHBhc3MgdGhpcyBmaXJzdCBzdGFnZSBhbmQgdGhlcmVmb3JlIGFyZSBzZWxlY3RlZDsgdGhleSB3aWxsIGJlIHRoZW4gYW5ub3RhdGVkLiBFYWNoIHRhc2sgaXMgZXhlY3V0ZWQgYnkgYSBzZXQgb2Ygd29ya2VyczsgdGhlIGFzc2lnbm1lbnQgb2YgdGhlIGltYWdlcyB0byBlYWNoIHdvcmtlciBpcyBkZWNpZGVkIGJ5IG1lYW5zIG9mIGEgc2NoZWR1bGluZyBhbGdvcml0aG0sIHdoaWNoIGlzIGJhc2VkIG9uIHBhcmFtZXRlcnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjYW1wYWlnbiAodGhlIGFsZ29yaXRobSBuZWVkcyBub3QgYmUgcmVhbGl6ZWQgYW5kIHdpbGwgYmUgcHJvdmlkZWQgdGhyb3VnaCBBUElzKS48L3A+XFxuPC9kaXY+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdob21lLWJhcic7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW107XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1ob21lLWJhcicsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwid2VsbFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJjb2wteHMtNiBjb2wteHMtb2Zmc2V0LTNcXFwiPlxcbjxsZWdlbmQgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5cXG5Bbm5vdGF0ZSB0aGUgSW1hZ2UhIVxcbjwvbGVnZW5kPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgZGF0YS1iaW5kPVxcXCJpZjogaW1hZ2VfcHJlc2VuY2UoKVxcXCI+XFxuPGJyPlxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIGNvbC1zbS01IGNvbC1zbS1vZmZzZXQtMSB0ZXh0LXJpZ2h0XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiBjbGVhclxcXCI+XFxuQ2xlYXJcXG48L2E+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIGNvbC1zbS01XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsICYjMzk7aW1hZ2UtYW5ub3RhdGlvbi1zdWJtaXQmIzM5OylcXFwiPlxcblN1Ym1pdFxcbjwvYT5cXG48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiIGRhdGEtYmluZD1cXFwiaWY6IGltZ1VybCgpICE9IHVuZGVmaW5lZFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIGNvbC1zbS0xMCBjb2wtc20tb2Zmc2V0LTFcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHkgdGV4dC1jZW50ZXJcXFwiPlxcbjxsaW5lLWRyYXdlciBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHQsIHNyYzogJiMzOTtodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZyYjMzk7ICsgaW1nVXJsKCksIHBlbjogc2l6ZSwgbGluZTogbGluZVxcXCI+PC9saW5lLWRyYXdlcj5cXG48IS0tIC8lZGl2e1xcXCJkYXRhLWJpbmRcXFwiID0+IFxcXCJjb21wb25lbnQ6IHsgbmFtZTogJ2xpbmUtZHJhd2VyJywgcGFyYW1zOiB7Y29udGV4dDogY29udGV4dCwgc3JjOiAnaHR0cDovL2F3dC5pZm1sZWRpdC5vcmcnICsgaW1nVXJsKCksIHBlbjogc2l6ZSgpLCBsaW5lOiBsaW5lKCl9fVxcXCJ9IC0tPlxcbjwhLS0gLyVsaW5lLWRyYXdlcns6cGFyYW1zID0+IFxcXCJjb250ZXh0OmNvbnRleHQsc3JjOiAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy80LzRmL01hdHRlcmhvcm5fUmlmZmVsc2VlXzIwMDUtMDYtMTEuanBnJywgcGVuOiAxMCwgbGluZTogbGluZVxcXCJ9IC0tPlxcbjwhLS0gLyVpbWcuaW1nLXJlc3BvbnNpdmUuY2VudGVyLWJsb2Nre1xcXCJkYXRhLWJpbmRcXFwiID0+IFxcXCJhdHRyOntzcmM6ICAnaHR0cDovL2F3dC5pZm1sZWRpdC5vcmcnICsgaW1nVXJsICgpIHx8ICcjJyB9XFxcIn0vIC0tPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgZGF0YS1iaW5kPVxcXCJpZjogIWltYWdlX3ByZXNlbmNlKClcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIGNvbC1zbS0xMCBjb2wtc20tb2Zmc2V0LTFcXFwiPlxcbjxoMyBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JfdGV4dFxcXCI+PC9oMz5cXG48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInRleHQtY2VudGVyIG1hcmdpbl9fdG9wLS0yMHB4XFxcIj5cXG48cCBjbGFzcz1cXFwibWFyZ2luX190b3AtLTEwcHhcXFwiPlxcbkdvIGJhY2sgdG9cXG48YSBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTt0YXNrLWdvJiMzOTspXFxcIj5cXG5UYXNrc1xcbjwvYT5cXG48L3A+XFxuPGhyIGNsYXNzPVxcXCJzZXBhcmF0b3IgbWFyZ2luX19jZW50ZXJcXFwiPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLmZpZWxkcyA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHNlbGYuZXJyb3JzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG4gICAgc2VsZi5pbWdVcmwgPSBrby5vYnNlcnZhYmxlKFwiXCIpO1xuICAgIHNlbGYuaW1hZ2VfcHJlc2VuY2UgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICBzZWxmLmVycm9yX3RleHQgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgc2VsZi5saW5lID0ga28ub2JzZXJ2YWJsZShcIlwiKTtcbiAgICBzZWxmLnNpemUgPSBrby5vYnNlcnZhYmxlKDEpO1xuICAgIHNlbGYuY2xlYXIgPSBmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLmxpbmUoJycpO1xuICAgIH1cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0cmlnZ2VyXCIpXG4gICAgICAgIHNlbGYub3V0cHV0LmxpbmUgPSBzZWxmLmxpbmUoKVxuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQsIHNlbGYub3V0cHV0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2ltYWdlLWFubm90YXRpb24tZm9ybSc7XG5cblZpZXdNb2RlbC5wcm90b3R5cGUud2FpdEZvclN0YXR1c0NoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5pdGlhbGl6aW5nIHx8XG4gICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5nZXRfZGF0YSA9IGZ1bmN0aW9uKGNvbnRleHQsaWQpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAkLmFqYXgoe1xuICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZ1wiKyBpZCArXCIvc2Vzc2lvblwiLFxuICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrIGNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YSBnb3RcIilcbiAgICAgICAgY29uc29sZS5sb2coXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZ1wiICsgbXlvYmouaW1hZ2UpXG4gICAgICAgIHNlbGYuaW1hZ2VfcHJlc2VuY2UodHJ1ZSk7XG4gICAgICAgIHNlbGYuaW1nVXJsKG15b2JqLmltYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi5pbWdVcmwoKSlcbiAgICAgICAgc2VsZi5zaXplKG15b2JqLnNpemUpO1xuICAgIH0sXG4gICAgZXJyb3I6ZnVuY3Rpb24gKHhociwgYWpheE9wdGlvbnMsIHRocm93bkVycm9yKXtcbiAgICAgICAgaWYoeGhyLnN0YXR1cz09NDA0KSB7XG4gICAgICAgICAgICBzZWxmLmltYWdlX3ByZXNlbmNlKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYuZXJyb3JfdGV4dChcIlRoZXJlIGlzIG5vIG1vcmUgaW1hZ2VzIHRvIGFubm90YXRlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHhoci5zdGF0dXM9PTQxMCkge1xuICAgICAgICAgICAgc2VsZi5pbWFnZV9wcmVzZW5jZShmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmVycm9yX3RleHQoXCJUaGVyZSBpcyBubyBtb3JlIGltYWdlcyB0byBhbm5vdGF0ZSBmb3Igbm93IHRyeSBhZ2FpbiBsYXRlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZih4aHIuc3RhdHVzPT00MTIpIHtcbiAgICAgICAgICAgIHNlbGYuaW1hZ2VfcHJlc2VuY2UoZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5lcnJvcl90ZXh0KFwiUHJlY29uZGl0aW9uIGZhaWxlZCwgcmVmcmVzaCB0aGUgYnJvd3NlciBhbmQgdHJ5IGFnYWluXCIpO1xuICAgICAgICAgICAgLy8gTm90ZSB0byBteXNlbGY6IGFzayBjYXJsbyB3aGF0IHRoaXMgbWVhblxuICAgICAgICB9XG4gICAgfVxuICAgIH0pO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0X3Nlc3Npb24gPSBmdW5jdGlvbihjb250ZXh0LGlkKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIisgaWQgK1wiL3Nlc3Npb25cIixcbiAgICB0eXBlOiBcIlBPU1RcIixcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIisgY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnRva2VuKTtcbiAgICB9LFxuICAgIGNyb3NzRG9tYWluOiB0cnVlLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIHZhciBteW9iaiA9IHJlc3VsdDtcbiAgICAgICAgY29uc29sZS5sb2cobXlvYmopO1xuICAgIH0sXG4gICAgZXJyb3I6ZnVuY3Rpb24gKHhociwgYWpheE9wdGlvbnMsIHRocm93bkVycm9yKXtcbiAgICAgICAgaWYoeGhyLnN0YXR1cz09NDA0KSB7XG4gICAgICAgICAgICBzZWxmLmltYWdlX3ByZXNlbmNlKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYuZXJyb3JfdGV4dChcIlRoZXJlIGlzIG5vIG1vcmUgaW1hZ2VzIHRvIGFubm90YXRlXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIH0pO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5fY29tcHV0ZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHRoaXMub3V0cHV0ID0ge1xuICAgICAgICAnaWQnOiBpZCxcbiAgICB9O1xuICAgIHRoaXMubGluZS5zdWJzY3JpYmU9IGZ1bmN0aW9uKCl7XG4gICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpbmUoKSk7XG4gICAgfVxuICAgIHRoaXMuc3RhdHVzKCdjb21wdXRlZCcpO1xufTtcblxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucyxpZCxpbml0KSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKGlkKTtcbiAgICAgICAgICAgIGlmKGluaXQpe1xuICAgICAgICAgICAgICAgIHNlbGYuaW5pdF9zZXNzaW9uKHNlbGYuY29udGV4dCxpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmdldF9kYXRhKHNlbGYuY29udGV4dCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgc2VsZi5faW5pdGlhbGl6aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtaW1hZ2UtYW5ub3RhdGlvbi1mb3JtJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHsgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj4gICAgPCEtLSBpbWFnZS1hbm5vdGF0aW9uLWZvcm0gLS0+ICAgIDxjLWltYWdlLWFubm90YXRpb24tZm9ybSBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1pbWFnZS1hbm5vdGF0aW9uLWZvcm0+PC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLGlkLGluaXQpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdpbWFnZS1hbm5vdGF0aW9uJztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2ltYWdlLWFubm90YXRpb24tZm9ybScsICdsaW5lLWRyYXdlcidcbl07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1pbWFnZS1hbm5vdGF0aW9uJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJ3ZWxsXFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcImNvbC14cy02IGNvbC14cy1vZmZzZXQtM1xcXCI+XFxuPGxlZ2VuZCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPlxcblZhbGlkYXRlIHRoZSBJbWFnZSEhXFxuPC9sZWdlbmQ+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBkYXRhLWJpbmQ9XFxcImlmOiBpbWFnZV9wcmVzZW5jZSgpXFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcImNvbC14cy0zIGNvbC14cy1vZmZzZXQtMyB0ZXh0LXJpZ2h0XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1zdWNjZXNzXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsICYjMzk7aW1hZ2Utc2VsZWN0aW9uLXN1Ym1pdCYjMzk7LCAmIzM5O3RydWUmIzM5OylcXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1va1xcXCI+PC9zcGFuPlxcbjwvYT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJjb2wteHMtM1xcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tZGFuZ2VyXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsICYjMzk7aW1hZ2Utc2VsZWN0aW9uLXN1Ym1pdCYjMzk7LCAmIzM5O2ZhbHNlJiMzOTspXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXFxcIj48L3NwYW4+XFxuPC9hPlxcbjwvZGl2PlxcbjwvZGl2Plxcbjxicj5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiIGRhdGEtYmluZD1cXFwiaWY6IGltZ1VybCgpICE9IHVuZGVmaW5lZFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIGNvbC1zbS0xMCBjb2wtc20tb2Zmc2V0LTFcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcbjxpbWcgY2xhc3M9XFxcImltZy1yZXNwb25zaXZlIGNlbnRlci1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJhdHRyOntzcmM6ICYjMzk7aHR0cDovL2F3dC5pZm1sZWRpdC5vcmcmIzM5OyArIGltZ1VybCgpIHx8ICYjMzk7IyYjMzk7IH1cXFwiPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgZGF0YS1iaW5kPVxcXCJpZjogIWltYWdlX3ByZXNlbmNlKClcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIGNvbC1zbS0xMCBjb2wtc20tb2Zmc2V0LTFcXFwiPlxcbjxoMyBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JfdGV4dFxcXCI+PC9oMz5cXG48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInRleHQtY2VudGVyIG1hcmdpbl9fdG9wLS0yMHB4XFxcIj5cXG48cCBjbGFzcz1cXFwibWFyZ2luX190b3AtLTEwcHhcXFwiPlxcbkdvIGJhY2sgdG9cXG48YSBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTt0YXNrLWdvJiMzOTspXFxcIj5cXG5UYXNrc1xcbjwvYT5cXG48L3A+XFxuPGhyIGNsYXNzPVxcXCJzZXBhcmF0b3IgbWFyZ2luX19jZW50ZXJcXFwiPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLmltZ1VybCA9IGtvLm9ic2VydmFibGUoXCJcIik7XG4gICAgc2VsZi5lcnJvcnMgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICBzZWxmLmltYWdlX3ByZXNlbmNlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgc2VsZi5lcnJvcl90ZXh0ID0ga28ub2JzZXJ2YWJsZSgpO1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkLGJvb2wpIHtcbiAgICAgICAgc2VsZi5vdXRwdXQuYWNjZXB0ZWQgPSBib29sO1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQsIHNlbGYub3V0cHV0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmdldF9kYXRhID0gZnVuY3Rpb24oY29udGV4dCxpZCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIrIGlkICtcIi9zZXNzaW9uXCIsXG4gICAgdHlwZTogXCJHRVRcIixcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIisgY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnRva2VuKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIHZhciBteW9iaiA9IHJlc3VsdDtcbiAgICAgICAgY29uc29sZS5sb2coXCJkYXRhIGdvdFwiKVxuICAgICAgICBjb25zb2xlLmxvZyhcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIgKyBteW9iai5pbWFnZSlcbiAgICAgICAgc2VsZi5pbWFnZV9wcmVzZW5jZSh0cnVlKTtcbiAgICAgICAgc2VsZi5pbWdVcmwobXlvYmouaW1hZ2UpO1xuICAgIH0sXG4gICAgZXJyb3I6ZnVuY3Rpb24gKHhociwgYWpheE9wdGlvbnMsIHRocm93bkVycm9yKXtcbiAgICAgICAgaWYoeGhyLnN0YXR1cz09NDA0KSB7XG4gICAgICAgICAgICBzZWxmLmltYWdlX3ByZXNlbmNlKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYuZXJyb3JfdGV4dChcIlRoZXJlIGlzIG5vIG1vcmUgaW1hZ2VzIHRvIHNlbGVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZih4aHIuc3RhdHVzPT00MTApIHtcbiAgICAgICAgICAgIHNlbGYuaW1hZ2VfcHJlc2VuY2UoZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5lcnJvcl90ZXh0KFwiVGhlcmUgaXMgbm8gbW9yZSBpbWFnZXMgdG8gc2VsZWN0IGZvciBub3dcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYoeGhyLnN0YXR1cz09NDEyKSB7XG4gICAgICAgICAgICBzZWxmLmltYWdlX3ByZXNlbmNlKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYuZXJyb3JfdGV4dChcIlByZWNvbmRpdGlvbiBmYWlsZWQsIHJlZnJlc2ggdGhlIGJyb3dzZXIgYW5kIHRyeSBhZ2FpblwiKTtcbiAgICAgICAgICAgIC8vIE5vdGUgdG8gbXlzZWxmOiBhc2sgY2FybG8gd2hhdCB0aGlzIG1lYW5cbiAgICAgICAgfVxuICAgIH1cbiAgICB9KTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaW5pdF9zZXNzaW9uID0gZnVuY3Rpb24oY29udGV4dCxpZCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIrIGlkICtcIi9zZXNzaW9uXCIsXG4gICAgdHlwZTogXCJQT1NUXCIsXG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrIGNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgfSxcbiAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKG15b2JqKTtcbiAgICB9LFxuICAgIGVycm9yOmZ1bmN0aW9uICh4aHIsIGFqYXhPcHRpb25zLCB0aHJvd25FcnJvcil7XG4gICAgICAgIGlmKHhoci5zdGF0dXM9PTQwNCkge1xuICAgICAgICAgICAgc2VsZi5pbWFnZV9wcmVzZW5jZShmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmVycm9yX3RleHQoXCJUaGVyZSBpcyBubyBtb3JlIGltYWdlcyB0byBhbm5vdGF0ZVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB9KTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnaW1hZ2Utc2VsZWN0aW9uLWZvcm0nO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB0aGlzLm91dHB1dCA9IHtcbiAgICAgICAgJ2lkJzogaWQsXG4gICAgfTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsaWQsaW5pdCkge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMub3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKGlkKTtcbiAgICAgICAgICAgIGlmKGluaXQpe1xuICAgICAgICAgICAgICAgIHNlbGYuaW5pdF9zZXNzaW9uKHNlbGYuY29udGV4dCxpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmdldF9kYXRhKHNlbGYuY29udGV4dCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgc2VsZi5faW5pdGlhbGl6aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1pbWFnZS1zZWxlY3Rpb24tZm9ybScsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+XFxuICA8IS0tIGltYWdlLXNlbGVjdGlvbi1mb3JtIC0tPlxcbiAgPGMtaW1hZ2Utc2VsZWN0aW9uLWZvcm0gcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj5cXG4gIDwvYy1pbWFnZS1zZWxlY3Rpb24tZm9ybT5cXG48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdpbWFnZS1zZWxlY3Rpb24nO1xuVmlld01vZGVsLnByb3RvdHlwZS5jaGlsZHJlbiA9IFtcbiAgICAnaW1hZ2Utc2VsZWN0aW9uLWZvcm0nIC8vIGltYWdlLXNlbGVjdGlvbi1mb3JtXG5dO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtaW1hZ2Utc2VsZWN0aW9uJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG48ZGl2IGNsYXNzPVxcXCJ3ZWxsIGNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMiBjb2wtc20tMTAgY29sLXNtLW9mZnNldC0xXFxcIj5cXG48ZmllbGRzZXQ+XFxuPGxlZ2VuZCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPkltYWdlIFVwbG9hZDwvbGVnZW5kPlxcbjxmb3JtPlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtvdGhlcnMmIzM5O119XFxcIj5cXG48aDUgY2xhc3M9XFxcImhlbHAtYmxvY2sgdGV4dC1jZW50ZXJcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JzKClbJiMzOTtvdGhlcnMmIzM5O11cXFwiIGlkPVxcXCJsb2dpbi1mb3JtX2ZpZWxkX2Vycm9yXFxcIj48L2g1PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtpbWFnZSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7aW1hZ2UmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7aW1hZ2UmIzM5O119XFxcIiBmb3I9XFxcImltYWdlLXVwbG9hZC1mb3JtX2ZpZWxkXzBcXFwiPlVwbG9hZCBhIHBpY3R1cmUhOjwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImltYWdlLXVwbG9hZC1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGUgYnRuIGJ0bi1kZWZhdWx0XFxcIiBkYXRhLWJpbmQ9XFxcImV2ZW50OiB7Y2hhbmdlOiBmaWxlVXBsb2FkfSwgdmFsdWU6IGZpZWxkcygpWyYjMzk7aW1hZ2UmIzM5O11cXFwiIGlkPVxcXCJpbWFnZS11cGxvYWQtZm9ybV9maWVsZF8wXFxcIiB0eXBlPVxcXCJmaWxlXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O2ltYWdlJiMzOTtdXFxcIiBpZD1cXFwiaW1hZ2UtdXBsb2FkLWZvcm1fZmllbGRfMF9lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjxkaXY+XFxuPGltZyBjbGFzcz1cXFwiaW1nLXJlc3BvbnNpdmUgbWFyZ2luX19jZW50ZXJcXFwiIGRhdGEtYmluZD1cXFwiYXR0cjoge3NyYzogcGhvdG9VcmwoKX1cXFwiPlxcbjwvZGl2PlxcbjwvZm9ybT5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInRleHQtY2VudGVyIG1hcmdpbl9fdG9wLS0yMHB4XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsICYjMzk7aW1hZ2UtdXBsb2FkLXN1Ym1pdCYjMzk7KVxcXCI+XFxuU1VCTUlUXFxuPC9hPlxcbjxicj5cXG48cCBjbGFzcz1cXFwibWFyZ2luX190b3AtLTEwcHhcXFwiPlxcbkkgd2FudCB0byBzZWxlY3Qgd29ya2VycyxcXG48YSBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTt3b3JrZXItc2VsZWN0LWdvJiMzOTspXFxcIj5cXG5TZWxlY3QgV29ya2VyXFxuPC9hPlxcbjwvcD5cXG48aHIgY2xhc3M9XFxcInNlcGFyYXRvciBtYXJnaW5fX2NlbnRlclxcXCI+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9maWVsZHNldD5cXG48L2Rpdj5cXG48L3NwYW4+XFxuPHNwYW4+XFxuPGRpdiBjbGFzcz1cXFwid2VsbCBjb2wtc20tMTAgY29sLXNtLW9mZnNldC0xXFxcIj5cXG48ZGl2IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogaW1hZ2VzQXJyYXlcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHQgY29sLXNtLTYgY29sLW1kLTQgY29sLWxnLTNcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmcgdGV4dC1yaWdodFxcXCI+XFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5kZWxldGVcXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcXFwiPjwvc3Bhbj5cXG48L2E+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5zaG93XFxcIj5cXG48aW1nIGNsYXNzPVxcXCJpbWctcmVzcG9uc2l2ZSBjZW50ZXItYmxvY2sgaW1nLXRodW1ibmFpbCBoZWlnaHRfX21heC0tMTcwIGhlaWdodF9fbWluLS0xNzAgd2lkdGhfX21heC0tMTcwIHdpZHRoX19taW4tLTE3MFxcXCIgZGF0YS1iaW5kPVxcXCJhdHRyOntzcmM6ICYjMzk7aHR0cDovL2F3dC5pZm1sZWRpdC5vcmcmIzM5OyArIGNhbm9uaWNhbH1cXFwiPlxcbjwvYT5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L3NwYW4+XFxuPGRpdiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIiBkYXRhLWJpbmQ9XFxcImlmOiBtb2RhbFVybCgpICE9IHVuZGVmaW5lZFxcXCIgaWQ9XFxcImltYWdlbW9kYWxcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPlxcbjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPlxcbjxidXR0b24gY2xhc3M9XFxcImNsb3NlXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcXFwiPjwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+Q2xvc2U8L3NwYW4+XFxuPC9idXR0b24+XFxuPGJyPlxcbjxpbWcgY2xhc3M9XFxcImltYWdlcHJldmlld1xcXCIgZGF0YS1iaW5kPVxcXCJhdHRyOntzcmM6ICYjMzk7aHR0cDovL2F3dC5pZm1sZWRpdC5vcmcmIzM5OyArIG1vZGFsVXJsKCl9XFxcIiBzdHlsZT1cXFwid2lkdGg6IDEwMCVcXFwiPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLmZpZWxkcyA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHNlbGYuZXJyb3JzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG4gICAgc2VsZi5pbWFnZXNBcnJheSA9IGtvLm9ic2VydmFibGVBcnJheSgpOyBcbiAgICBzZWxmLnBob3RvVXJsID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHNlbGYubW9kYWxVcmwgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgc2VsZi5vdXRwdXQpO1xuICAgIH07XG4gICAgdGhpcy5maWxlVXBsb2FkID0gZnVuY3Rpb24oZGF0YSwgZSlcbiAgICB7XG4gICAgICAgIHZhciBmaWxlICAgID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgIHZhciByZWFkZXIgID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKG9ubG9hZGVuZF9lKSBcbiAgICAgICAge1xuICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVhZGVyLnJlc3VsdDsgLy9iYXNlIDY0IGVuY29kZWQuXG4gICAgICAgICAgIHNlbGYucGhvdG9VcmwocmVzdWx0KTtcbiAgICAgICAgICAgc2VsZi5vdXRwdXRbJ2ltYWdlJ10gPSBmaWxlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmKGZpbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBzZWxmLmRlbGV0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBpbWcgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIiArIGltZy5pZCxcbiAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBzZWxmLmNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgICAgICBzZWxmLmltYWdlc0FycmF5LnJlbW92ZShpbWcpO1xuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLm1vZGFsVXJsKHRoaXMuY2Fub25pY2FsKTtcblx0XHQkKCcjaW1hZ2Vtb2RhbCcpLm1vZGFsKCdzaG93Jyk7ICAgXG4gICAgfVxufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAoZXJyb3JzX3NlbnQsaWQsaW1hZ2VzLG5ld19pbWFnZSkge1xuICAgIGlmKG5ld19pbWFnZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICBpbWFnZXMucHVzaChuZXdfaW1hZ2UpO1xuICAgIH1cbiAgICB0aGlzLmltYWdlc0FycmF5KGltYWdlcyk7XG4gICAgdGhpcy5maWVsZHMoKVsnaW1hZ2UnXShcIlwiKTtcbiAgICB0aGlzLm91dHB1dC5pZCA9IGlkXG4gICAgdGhpcy5vdXRwdXQuaW1hZ2VzID0gdGhpcy5pbWFnZXNBcnJheSgpO1xuICAgIHRoaXMuZXJyb3JzKClbJ2ltYWdlJ10oZXJyb3JzX3NlbnQuaW1hZ2UpO1xuICAgIHRoaXMuZXJyb3JzKClbJ290aGVycyddKGVycm9yc19zZW50Lm90aGVycyk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2ltYWdlLXVwbG9hZC1mb3JtJztcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0cHV0ID0ge1xuICAgICAgICAnaW1hZ2UnOiB0aGlzLmlucHV0WydpbWFnZSddLFxuICAgICAgICAnaW1hZ2VzJzogW10sXG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZmllbGRzID0ge1xuICAgICAgICAgICAgJ2ltYWdlJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydpbWFnZSddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ2ltYWdlJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydpbWFnZS1lcnJvciddKSxcbiAgICAgICAgICAgICdvdGhlcnMnOiBrby5vYnNlcnZhYmxlKCksXG4gICAgICAgIH07XG4gICAgc2VsZi5pbWFnZXNBcnJheS5zdWJzY3JpYmUoZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgICBpZihjaGFuZ2VzID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5zdGF0dXMgPT09ICdhZGRlZCcgfHwgY2hhbmdlLnN0YXR1cyA9PT0gJ2RlbGV0ZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vdXRwdXRbJ2ltYWdlcyddID0gc2VsZi5pbWFnZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5waG90b1VybChcIlwiKVxuICAgIHRoaXMuZmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5lcnJvcnMoZXJyb3JzKTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsZXJyb3JzLGlkLGltYWdlcyxuZXdfaW1hZ2UpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBlcnJvcnMgPSBlcnJvcnMgfHwge307XG4gICAgaW1hZ2VzID0gaW1hZ2VzIHx8IFtdO1xuICAgIG5ld19pbWFnZSA9IG5ld19pbWFnZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICBzZWxmLmZpbGwoZXJyb3JzLGlkLGltYWdlcyxuZXdfaW1hZ2UpXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWltYWdlLXVwbG9hZC1mb3JtJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHsgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj4gICAgPCEtLSBpbWFnZS11cGxvYWQtZm9ybSAtLT4gICAgXFxuICA8Yy1pbWFnZS11cGxvYWQtZm9ybSBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPlxcbiAgPC9jLWltYWdlLXVwbG9hZC1mb3JtPlxcbjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2ltYWdlLXVwbG9hZC12aWV3JztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2ltYWdlLXVwbG9hZC1mb3JtJyAvLyBpbWFnZS11cGxvYWQtZm9ybVxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWltYWdlLXVwbG9hZC12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIi8qanNsaW50IGJyb3dzZXI6IHRydWUgKi9cbi8qZ2xvYmFscyBrbywgJCAqL1xudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG52YXIgbGluZWZ1biA9IChmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBrby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXdTZXRTaXplID0ge1xuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBrby51bndyYXAodmFsdWVBY2Nlc3NvcigpKTtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBlbGVtZW50LmhlaWdodCA9IHZhbHVlLmhlaWdodDtcbiAgICAgICAgICAgIGVsZW1lbnQud2lkdGggPSB2YWx1ZS53aWR0aDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBrby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXdOYXR1cmFsU2l6ZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBlbGVtZW50Lm5hdHVyYWxXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBlbGVtZW50Lm5hdHVyYWxIZWlnaHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgJChlbGVtZW50KS5vbignbG9hZCcsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAga28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3ID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpLFxuICAgICAgICAgICAgICAgIGN0eCA9IGVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICAgICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICAkZWxlbWVudC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IChlLnBhZ2VYIC0gJGVsZW1lbnQub2Zmc2V0KCkubGVmdCkgLyAkZWxlbWVudC53aWR0aCgpICogZWxlbWVudC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgeSA9IChlLnBhZ2VZIC0gJGVsZW1lbnQub2Zmc2V0KCkudG9wKSAvICRlbGVtZW50LmhlaWdodCgpICogZWxlbWVudC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZHJhdyhlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZW4gPSBwYXJzZUludCgkZWxlbWVudC5kYXRhKCdwZW4nKSwgMTApIHx8IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eCA9IChlLnBhZ2VYIC0gJGVsZW1lbnQub2Zmc2V0KCkubGVmdCkgLyAkZWxlbWVudC53aWR0aCgpICogZWxlbWVudC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5ID0gKGUucGFnZVkgLSAkZWxlbWVudC5vZmZzZXQoKS50b3ApIC8gJGVsZW1lbnQuaGVpZ2h0KCkgKiBlbGVtZW50LmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0eCwgdHkpO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiKDI1NSwwLDApJztcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHBlbjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyh0eCwgdHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBlbmQoKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZignbW91c2Vtb3ZlJywgZHJhdyk7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZignbW91c2V1cCcsIGVuZCk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlKGVsZW1lbnQudG9EYXRhVVJMKCdpbWFnZS9wbmcnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9uKCdtb3VzZW1vdmUnLCBkcmF3KTtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbignbW91c2V1cCcsIGVuZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0ga28udW53cmFwKHZhbHVlQWNjZXNzb3IoKSksXG4gICAgICAgICAgICAgICAgY3R4ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGVsZW1lbnQud2lkdGgsIGVsZW1lbnQuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBrby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXdQZW4gPSB7XG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLFxuICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgICRlbGVtZW50LmRhdGEoJ3BlbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG59KCkpO1xuXG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zcmMgPSBwYXJhbXMuc3JjO1xuICAgIHNlbGYucGVuID0gcGFyYW1zLnBlbjtcbiAgICBzZWxmLmxpbmUgPSBwYXJhbXMubGluZTtcbiAgICBzZWxmLm5hdHVyYWxTaXplID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHNlbGYubGluZWZ1biA9IGxpbmVmdW47XG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgc2VsZi5vdXRwdXQpO1xuICAgIH07XG59XG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2xpbmUtZHJhd2VyJztcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdsaW5lLWRyYXdlcicsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiAnPGltZyBkYXRhLWJpbmQ9XCJhdHRyOiB7IHNyYzogc3JjIH0sIExpbmVEcmF3TmF0dXJhbFNpemU6IG5hdHVyYWxTaXplXCIgY2xhc3M9XCJiYWNrZ3JvdW5kXCIgZHJhZ2dhYmxlPVwiZmFsc2VcIj48Y2FudmFzIGRhdGEtYmluZD1cIkxpbmVEcmF3OiBsaW5lLCBMaW5lRHJhd1NldFNpemU6IG5hdHVyYWxTaXplLCBMaW5lRHJhd1BlbjogcGVuXCI+PC9jYW52YXM+JyxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIndlbGxcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuPGRpdiBjbGFzcz1cXFwiY29sLXNtLTkgY29sLXhzLTEyXFxcIj5cXG48bGVnZW5kPlxcbkNhbXBhaWduc1xcbjwvbGVnZW5kPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImNvbC1zbS0zIGNvbC14cy0xMiB0ZXh0LXJpZ2h0XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTtjYW1wYWlnbi1jcmVhdGUmIzM5OylcXFwiPkNyZWF0ZSBhIENhbXBhaWduPC9hPlxcbjwvZGl2PlxcbjwvZGl2Plxcbjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtaG92ZXIgdGFibGUtc3RyaXBlZFxcXCI+XFxuPHRoZWFkPlxcbjx0cj5cXG48dGg+IzwvdGg+XFxuPHRoPk5hbWU8L3RoPlxcbjx0aD5TdGF0dXM8L3RoPlxcbjx0aCBjbGFzcz1cXFwidGV4dC1yaWdodFxcXCI+QWN0aW9uczwvdGg+XFxuPHRoPjwvdGg+XFxuPC90cj5cXG48L3RoZWFkPlxcbjx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IHsgZGF0YTogaXRlbXMsIGFzOiAmIzM5O2l0ZW0mIzM5OyB9XFxcIj5cXG48dHI+XFxuPHRkIGNsYXNzPVxcXCJ2ZXJ0aWNhbF9fbWlkZGxlXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6ICgkaW5kZXgoKSsxKVxcXCI+PC90ZD5cXG48dGQgY2xhc3M9XFxcInRleHQtY2FwaXRhbGl6ZSB2ZXJ0aWNhbF9fbWlkZGxlXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6ICRkYXRhWyYjMzk7bmFtZSYjMzk7XVxcXCIgc3R5bGU9XFxcIndoaXRlLXNwYWNlOiBwcmUtd3JhcFxcXCI+PC90ZD5cXG48dGQgY2xhc3M9XFxcInRleHQtY2FwaXRhbGl6ZSB2ZXJ0aWNhbF9fbWlkZGxlXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6ICRkYXRhWyYjMzk7c3RhdHVzJiMzOTtdKClcXFwiIHN0eWxlPVxcXCJ3aGl0ZS1zcGFjZTogcHJlLXdyYXBcXFwiPjwvdGQ+XFxuPHRkIGNsYXNzPVxcXCJ0ZXh0LXJpZ2h0XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1pbmZvXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LnRyaWdnZXIuYmluZChpdGVtLCYjMzk7Y2FtcGFpZ24tc2hvdyYjMzk7KVxcXCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cXFwiU2hvd1xcXCIgZGF0YS1wbGFjZW1lbnQ9XFxcInRvcFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIHRpdGxlPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXFxcIj48L3NwYW4+XFxuPC9hPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGl0ZW0uc3RhdHVzKCkgPT09ICYjMzk7cmVhZHkmIzM5O1xcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4td2FybmluZ1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC50cmlnZ2VyLmJpbmQoaXRlbSwmIzM5O2NhbXBhaWduLWVkaXQtZ28mIzM5OylcXFwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XFxcIkVkaXRcXFwiIGRhdGEtcGxhY2VtZW50PVxcXCJ0b3BcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiB0aXRsZT5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tZWRpdFxcXCI+PC9zcGFuPlxcbjwvYT5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogaXRlbS5zdGF0dXMoKSA9PT0gJiMzOTtyZWFkeSYjMzk7XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1zdWNjZXNzXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LmNoYW5nZV9zdGF0ZVxcXCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cXFwiRWRpdFxcXCIgZGF0YS1wbGFjZW1lbnQ9XFxcInRvcFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIHRpdGxlPlxcblBVQkxJU0hcXG48L2E+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGl0ZW0uc3RhdHVzKCkgPT09ICYjMzk7c3RhcnRlZCYjMzk7XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1zdWNjZXNzXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LmNoYW5nZV9zdGF0ZVxcXCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cXFwiRWRpdFxcXCIgZGF0YS1wbGFjZW1lbnQ9XFxcInRvcFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIHRpdGxlPlxcblRFUk1JTkFURVxcbjwvYT5cXG48L3NwYW4+XFxuPC90ZD5cXG48L3RyPlxcbjwvdGJvZHk+XFxuPC90YWJsZT5cXG48L2Rpdj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuX3JlcG9zaXRvcnkgPSBwYXJhbXMuY29udGV4dC5yZXBvc2l0b3JpZXNbJ2NhbXBhaWduJ107XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgIHNlbGYuaXRlbXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gICAgc2VsZi5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RlZCh0aGlzLmlkKTtcbiAgICAgICAgc2VsZi5vdXRwdXQgPSB0aGlzO1xuICAgICAgICBzZWxmLnRyaWdnZXIuY2FsbCh0aGlzLCAnY2FtcGFpZ24tc2hvdycpO1xuICAgIH07XG4gICAgc2VsZi5zZWxlY3RfdHJpZ2dlciA9IGZ1bmN0aW9uIChpdGVtLGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgdGhpcyk7XG4gICAgfTtcbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCB0aGlzKTtcbiAgICB9O1xuICAgIHNlbGYuY2hhbmdlX3N0YXRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGNhbXBhaWduID0gdGhpcztcbiAgICAgICAgdmFyIHR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmKGNhbXBhaWduLnN0YXR1cygpID09IFwicmVhZHlcIil7XG4gICAgICAgICAgICB0eXBlID0gXCJQT1NUXCI7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdHlwZSA9IFwiREVMRVRFXCI7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZ1wiICsgY2FtcGFpZ24uaWQgKyBcIi9leGVjdXRpb25cIixcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBzZWxmLmNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZihjYW1wYWlnbi5zdGF0dXMoKSA9PSBcInJlYWR5XCIpe1xuICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbi5zdGF0dXMoXCJzdGFydGVkXCIpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbi5zdGF0dXMoXCJlbmRlZFwiKTsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyAgXG4gICAgfTtcbn1cbnZhciBwcm90b19jYW1wYWlnbiA9IGZ1bmN0aW9uKGlkLG5hbWUsc3RhdHVzKXtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHNlbGYuaWQgPSBpZDtcbiAgICBzZWxmLm5hbWUgPSBuYW1lO1xuICAgIHNlbGYuc3RhdHVzID0ga28ub2JzZXJ2YWJsZShzdGF0dXMpO1xuICAgIHJldHVybiBzZWxmO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdsaXN0LWNhbXBhaWduJztcblxuVmlld01vZGVsLnByb3RvdHlwZS5nZXRfZGF0YSA9IGZ1bmN0aW9uKGNvbnRleHQpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAkLmFqYXgoe1xuICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZy9hcGkvY2FtcGFpZ25cIixcbiAgICB0eXBlOiBcIkdFVFwiLFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBjb250ZXh0LnJlcG9zaXRvcmllcy5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAvL3NlbGYuaXRlbXMobXlvYmouY2FtcGFpZ25zKTtcbiAgICAgICAgbXlvYmogPSBteW9iai5jYW1wYWlnbnNcbiAgICAgICAgdmFyIHRlbXAgPVtdO1xuICAgICAgICAkLmVhY2gobXlvYmosIGZ1bmN0aW9uIChpLCBvYmopIHtcbiAgICAgICAgICAgIHZhciBuZXdPYmogPSAgcHJvdG9fY2FtcGFpZ24ob2JqLmlkLG9iai5uYW1lLG9iai5zdGF0dXMpO1xuICAgICAgICAgICAgdGVtcC5wdXNoKG5ld09iaik7IFxuICAgICAgICB9KTsgXG4gICAgICAgIHNlbGYuaXRlbXModGVtcClcbiAgICB9XG4gICAgfSk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpZWxkcyA9IHtcbiAgICBpZDogMVxuICAgICwnY2FtcGFpZ24tZWRpdCc6IDFcbiAgICAsJ2NhbXBhaWduLW5hbWUnOiAxXG4gICAgLCdjYW1wYWlnbi1uZXh0X2FjdGlvbic6IDFcbiAgICAsJ2NhbXBhaWduLXNob3cnOiAxXG4gICAgLCdjYW1wYWlnbi1zdGF0ZSc6IDFcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUud2FpdEZvclN0YXR1c0NoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcHV0aW5nIHx8XG4gICAgICAgICAgIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fY29tcHV0aW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbXB1dGluZy5jYW5jZWwoKTtcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX2NvbXB1dGluZyA9IHRoaXMuX3JlcG9zaXRvcnkuZmluZCh0aGlzLmZpbHRlcnMsIHRoaXMuZmllbGRzKS50aGVuKGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICBzZWxmLnNlbGVjdGVkKHVuZGVmaW5lZCk7XG4gICAgICAgIHNlbGYuaXRlbXMoaXRlbXMpO1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkKGl0ZW1zWzBdLmlkKTtcbiAgICAgICAgICAgIHNlbGYub3V0cHV0ID0gaXRlbXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zdGF0dXMoJ2NvbXB1dGVkJyk7XG4gICAgICAgIHNlbGYuX2NvbXB1dGluZyA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLm91dHB1dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpbHRlcnMgPSBvcHRpb25zLmlucHV0IHx8IHt9O1xuICAgIHRoaXMuc3RhdHVzKCdyZWFkeScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9pbml0aWFsaXppbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2NvbXB1dGUoKTtcbiAgICAgICAgICAgIHNlbGYuZ2V0X2RhdGEoc2VsZi5jb250ZXh0KTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHNlbGYuX2luaXRpYWxpemluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSwgMSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtbGlzdC1jYW1wYWlnbicsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+XFxuPGRpdiBjbGFzcz1cXFwid2VsbCBjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTIgY29sLXNtLTEwIGNvbC1zbS1vZmZzZXQtMVxcXCI+XFxuPGZpZWxkc2V0PlxcbjxsZWdlbmQgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5Mb2cgSW48L2xlZ2VuZD5cXG48Zm9ybT5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7b3RoZXJzJiMzOTtdfVxcXCI+XFxuPGg1IGNsYXNzPVxcXCJoZWxwLWJsb2NrIHRleHQtY2VudGVyXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7b3RoZXJzJiMzOTtdXFxcIiBpZD1cXFwibG9naW4tZm9ybV9maWVsZF9lcnJvclxcXCI+PC9oNT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7dXNlcm5hbWUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O3VzZXJuYW1lJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3VzZXJuYW1lJiMzOTtdfVxcXCIgZm9yPVxcXCJsb2dpbi1mb3JtX2ZpZWxkXzFcXFwiPlVzZXJuYW1lPC9sYWJlbD5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwibG9naW4tZm9ybV9maWVsZF8xX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInRleHRJbnB1dDogZmllbGRzKClbJiMzOTt1c2VybmFtZSYjMzk7XVxcXCIgaWQ9XFxcImxvZ2luLWZvcm1fZmllbGRfMVxcXCIgcGxhY2Vob2xkZXI9XFxcIlVzZXJuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O3VzZXJuYW1lJiMzOTtdXFxcIiBpZD1cXFwibG9naW4tZm9ybV9maWVsZF8xX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3Bhc3N3b3JkJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtwYXNzd29yZCYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtwYXNzd29yZCYjMzk7XX1cXFwiIGZvcj1cXFwibG9naW4tZm9ybV9maWVsZF8wXFxcIj5QYXNzd29yZDwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImxvZ2luLWZvcm1fZmllbGRfMF9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0SW5wdXQ6IGZpZWxkcygpWyYjMzk7cGFzc3dvcmQmIzM5O11cXFwiIGlkPVxcXCJsb2dpbi1mb3JtX2ZpZWxkXzBcXFwiIHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7cGFzc3dvcmQmIzM5O11cXFwiIGlkPVxcXCJsb2dpbi1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Zvcm0+XFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciBtYXJnaW5fX3RvcC0tMjBweFxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCAmIzM5O2xvZ2luLXN1Ym1pdCYjMzk7KVxcXCI+XFxuTE9HIElOXFxuPC9hPlxcbjxicj5cXG48cCBjbGFzcz1cXFwibWFyZ2luX190b3AtLTEwcHhcXFwiPlxcbkkgZG9u4oCZdCBoYXZlIGFuIGFjY291bnQsXFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7cmVnaXN0ZXItZ28mIzM5OylcXFwiPlxcblJlZ2lzdGVyXFxuPC9hPlxcbjwvcD5cXG48aHIgY2xhc3M9XFxcInNlcGFyYXRvciBtYXJnaW5fX2NlbnRlclxcXCI+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9maWVsZHNldD5cXG48L2Rpdj5cXG48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcbiAgICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHNlbGYuZmllbGRzID0ga28ub2JzZXJ2YWJsZSh7fSkuZXh0ZW5kKHsgcmVxdWlyZWQ6IHRydWUgfSk7XG4gICAgc2VsZi5lcnJvcnMgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCBzZWxmLm91dHB1dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdsb2dpbi1mb3JtJztcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAoZXJyb3JzX3NlbnQsZmllbGRzX3NlbnQpIHtcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChmaWVsZHNfc2VudCkpe1xuICAgICAgICB0aGlzLmZpZWxkcygpWydwYXNzd29yZCddKGZpZWxkc19zZW50LnBhc3N3b3JkKTtcbiAgICAgICAgdGhpcy5maWVsZHMoKVsndXNlcm5hbWUnXShmaWVsZHNfc2VudC51c2VybmFtZSk7XG4gICAgfVxuICAgIHRoaXMuZXJyb3JzKClbJ3Bhc3N3b3JkJ10oZXJyb3JzX3NlbnQucGFzc3dvcmQpO1xuICAgIHRoaXMuZXJyb3JzKClbJ3VzZXJuYW1lJ10oZXJyb3JzX3NlbnQudXNlcm5hbWUpO1xuICAgIHRoaXMuZXJyb3JzKClbJ290aGVycyddKGVycm9yc19zZW50Lm90aGVycyk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0cHV0ID0ge1xuICAgICAgICAncGFzc3dvcmQnOiB0aGlzLmlucHV0WydwYXNzd29yZCddLFxuICAgICAgICAndXNlcm5hbWUnOiB0aGlzLmlucHV0Wyd1c2VybmFtZSddLFxuICAgIH07XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmaWVsZHMgPSB7XG4gICAgICAgICAgICAncGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3Bhc3N3b3JkJ10pLFxuICAgICAgICAgICAgJ3VzZXJuYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0Wyd1c2VybmFtZSddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ3Bhc3N3b3JkJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydwYXNzd29yZC1lcnJvciddKSxcbiAgICAgICAgICAgICd1c2VybmFtZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsndXNlcm5hbWUtZXJyb3InXSksXG4gICAgICAgICAgICAnb3RoZXJzJzoga28ub2JzZXJ2YWJsZSgpLFxuICAgICAgICB9O1xuICAgIGZpZWxkc1sncGFzc3dvcmQnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0WydwYXNzd29yZCddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ3Bhc3N3b3JkJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ3VzZXJuYW1lJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsndXNlcm5hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyd1c2VybmFtZSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgdGhpcy5maWVsZHMoZmllbGRzKTtcbiAgICB0aGlzLmVycm9ycyhlcnJvcnMpO1xuICAgIHRoaXMuc3RhdHVzKCdjb21wdXRlZCcpO1xufTtcblxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucyxlcnJvcnMsZmllbGRzKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgZXJyb3JzID0gZXJyb3JzIHx8IHt9O1xuICAgIGZpZWxkcyA9IGZpZWxkcyB8fCB7fTtcbiAgICB0aGlzLm91dHB1dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpZWxkcyh7fSk7XG4gICAgdGhpcy5lcnJvcnMoe30pO1xuICAgIHRoaXMuaW5wdXQgPSBvcHRpb25zLmlucHV0IHx8IHt9O1xuICAgIHRoaXMuc3RhdHVzKCdyZWFkeScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9pbml0aWFsaXppbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2NvbXB1dGUoKTtcbiAgICAgICAgICAgIHNlbGYuZmlsbChlcnJvcnMsZmllbGRzKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHNlbGYuX2luaXRpYWxpemluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSwgMSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtbG9naW4tZm9ybScsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+XFxuICAgIDwhLS0gbG9naW4tRm9tIC0tPlxcbiAgICA8Yy1sb2dpbi1mb3JtIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWxvZ2luLWZvcm0+XFxuPC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBzZWxmLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKXtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gb3B0aW9ucy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tjaGlsZF0uaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnbG9naW4tdmlldyc7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW1xuICAgICdsb2dpbi1mb3JtJyAvLyBsb2dpbi1Gb21cbl07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1sb2dpbi12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG48Yy1saXN0LWNhbXBhaWduIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWxpc3QtY2FtcGFpZ24+XFxuPC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBzZWxmLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKXtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gb3B0aW9ucy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tjaGlsZF0uaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnbWFuYWdlci12aWV3JztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2xpc3QtY2FtcGFpZ24nIC8vIGxpc3QtY2FtcGFpZ25cbl07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1tYW5hZ2VyLXZpZXcnLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXSA9IFtdO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdLmZvckVhY2goZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzcGFuPlxcbjxkaXYgY2xhc3M9XFxcIndlbGwgY29sLW1kLTggY29sLW1kLW9mZnNldC0yIGNvbC1zbS0xMCBjb2wtc20tb2Zmc2V0LTFcXFwiPlxcbjxmaWVsZHNldD5cXG48bGVnZW5kIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlclxcXCI+UmVnaXN0ZXI8L2xlZ2VuZD5cXG48Zm9ybT5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7ZnVsbG5hbWUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2Z1bGxuYW1lJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Z1bGxuYW1lJiMzOTtdfVxcXCIgZm9yPVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzFcXFwiPkZ1bGxuYW1lPC9sYWJlbD5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8xX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O2Z1bGxuYW1lJiMzOTtdXFxcIiBpZD1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8xXFxcIiByZXF1aXJlPVxcXCJ0cnVlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O2Z1bGxuYW1lJiMzOTtdXFxcIiBpZD1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8xX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3VzZXJuYW1lJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTt1c2VybmFtZSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTt1c2VybmFtZSYjMzk7XX1cXFwiIGZvcj1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8zXFxcIj5Vc2VybmFtZTwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfM19lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTt1c2VybmFtZSYjMzk7XVxcXCIgaWQ9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfM1xcXCIgcmVxdWlyZT1cXFwidHJ1ZVxcXCIgdHlwZT1cXFwidGV4dFxcXCI+XFxuPHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JzKClbJiMzOTt1c2VybmFtZSYjMzk7XVxcXCIgaWQ9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfM19lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTthY2NvdW50LXR5cGUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2FjY291bnQtdHlwZSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTthY2NvdW50LXR5cGUmIzM5O119XFxcIiBmb3I9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfMFxcXCI+U2VsZWN0IGFjY291bnQgdHlwZTwvbGFiZWw+XFxuPHNlbGVjdCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWyYjMzk7YWNjb3VudC10eXBlJiMzOTtdXFxcIiBpZD1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8wXFxcIiByZXF1aXJlPVxcXCJ0cnVlXFxcIj5cXG48b3B0aW9uIHZhbHVlPVxcXCJtYXN0ZXJcXFwiPk1hbmFnZXI8L29wdGlvbj5cXG48b3B0aW9uIHZhbHVlPVxcXCJ3b3JrZXJcXFwiPldvcmtlcjwvb3B0aW9uPlxcbjwvc2VsZWN0PlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7YWNjb3VudC10eXBlJiMzOTtdXFxcIiBpZD1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8wX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3Bhc3N3b3JkJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtwYXNzd29yZCYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtwYXNzd29yZCYjMzk7XX1cXFwiIGZvcj1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8yXFxcIj5QYXNzd29yZDwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfMl9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0SW5wdXQ6IGZpZWxkcygpWyYjMzk7cGFzc3dvcmQmIzM5O11cXFwiIGlkPVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzJcXFwiIHJlcXVpcmU9XFxcInRydWVcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O3Bhc3N3b3JkJiMzOTtdXFxcIiBpZD1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8yX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2NvbmZpcm1fcGFzc3dvcmQmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2NvbmZpcm1fcGFzc3dvcmQmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7Y29uZmlybV9wYXNzd29yZCYjMzk7XX1cXFwiIGZvcj1cXFwiYWNjb3VudC1lZGl0LWZvcm1fZmllbGRfMVxcXCI+Q29uZmlybSBQYXNzd29yZDwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzFfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGRhdGEtYmluZD1cXFwidGV4dElucHV0OiBmaWVsZHMoKVsmIzM5O2NvbmZpcm1fcGFzc3dvcmQmIzM5O11cXFwiIGlkPVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzJcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O2NvbmZpcm1fcGFzc3dvcmQmIzM5O11cXFwiIGlkPVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzJfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Zvcm0+XFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciBtYXJnaW5fX3RvcC0tMjBweFxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCAmIzM5O3JlZ2lzdGVyLXN1Ym1pdCYjMzk7KVxcXCI+XFxuUkVHSVNURVJcXG48L2E+XFxuPGJyPlxcbjxwIGNsYXNzPVxcXCJtYXJnaW5fX3RvcC0tMTBweFxcXCI+XFxuQWxyZWFkeSBoYXZlIGFuIGFjY291bnQsXFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7bG9naW4tZ28mIzM5OylcXFwiPlxcbkxvZyBJblxcbjwvYT5cXG48L3A+XFxuPGhyIGNsYXNzPVxcXCJzZXBhcmF0b3IgbWFyZ2luX19jZW50ZXJcXFwiPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZmllbGRzZXQ+XFxuPC9kaXY+XFxuPC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLmZpZWxkcyA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHNlbGYuZXJyb3JzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIGZsYWcgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5lcnJvcnMoKSkge1xuICAgICAgICAgIGlmIChzZWxmLmVycm9ycygpLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGlmKHNlbGYuZXJyb3JzKClba2V5XSgpICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGZsYWcpe1xuICAgICAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCBzZWxmLm91dHB1dCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ3JlZ2lzdGVyLWZvcm0nO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIChlcnJvcnNfc2VudCxmaWVsZHNfc2VudCkge1xuICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KGZpZWxkc19zZW50KSl7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ2FjY291bnQtdHlwZSddKGZpZWxkc19zZW50LnR5cGUpO1xuICAgICAgICB0aGlzLmZpZWxkcygpWydmdWxsbmFtZSddKGZpZWxkc19zZW50LmZ1bGxuYW1lKTtcbiAgICAgICAgdGhpcy5maWVsZHMoKVsncGFzc3dvcmQnXShcIlwiKTtcbiAgICAgICAgdGhpcy5maWVsZHMoKVsndXNlcm5hbWUnXShmaWVsZHNfc2VudC51c2VybmFtZSk7XG4gICAgfVxuICAgIHRoaXMuZXJyb3JzKClbJ2FjY291bnQtdHlwZSddKGVycm9yc19zZW50LnR5cGUpO1xuICAgIHRoaXMuZXJyb3JzKClbJ2Z1bGxuYW1lJ10oZXJyb3JzX3NlbnQuZnVsbG5hbWUpO1xuICAgIHRoaXMuZXJyb3JzKClbJ3Bhc3N3b3JkJ10oZXJyb3JzX3NlbnQucGFzc3dvcmQpO1xuICAgIHRoaXMuZXJyb3JzKClbJ3VzZXJuYW1lJ10oZXJyb3JzX3NlbnQudXNlcm5hbWUpO1xuICAgIHRoaXMuZXJyb3JzKClbJ290aGVycyddKGVycm9yc19zZW50Lm90aGVycyk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0cHV0ID0ge1xuICAgICAgICAnYWNjb3VudC10eXBlJzogdGhpcy5pbnB1dFsnYWNjb3VudC10eXBlJ10sXG4gICAgICAgICdmdWxsbmFtZSc6IHRoaXMuaW5wdXRbJ2Z1bGxuYW1lJ10sXG4gICAgICAgICdwYXNzd29yZCc6IHRoaXMuaW5wdXRbJ3Bhc3N3b3JkJ10sXG4gICAgICAgICd1c2VybmFtZSc6IHRoaXMuaW5wdXRbJ3VzZXJuYW1lJ10sXG4gICAgICAgICdjb25maXJtX3Bhc3N3b3JkJzogdGhpcy5pbnB1dFsnY29uZmlybV9wYXNzd29yZCddLFxuICAgIH07XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmaWVsZHMgPSB7XG4gICAgICAgICAgICAnYWNjb3VudC10eXBlJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydhY2NvdW50LXR5cGUnXSksXG4gICAgICAgICAgICAnZnVsbG5hbWUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Z1bGxuYW1lJ10pLFxuICAgICAgICAgICAgJ3Bhc3N3b3JkJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydwYXNzd29yZCddKSxcbiAgICAgICAgICAgICd1c2VybmFtZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsndXNlcm5hbWUnXSksXG4gICAgICAgICAgICAnY29uZmlybV9wYXNzd29yZCc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnY29uZmlybV9wYXNzd29yZCddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ2FjY291bnQtdHlwZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYWNjb3VudC10eXBlLWVycm9yJ10pLFxuICAgICAgICAgICAgJ2Z1bGxuYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydmdWxsbmFtZS1lcnJvciddKSxcbiAgICAgICAgICAgICdwYXNzd29yZCc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsncGFzc3dvcmQtZXJyb3InXSksXG4gICAgICAgICAgICAndXNlcm5hbWUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3VzZXJuYW1lLWVycm9yJ10pLFxuICAgICAgICAgICAgJ2NvbmZpcm1fcGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2NvbmZpcm1fcGFzc3dvcmQtZXJyb3InXSksXG4gICAgICAgICAgICAnb3RoZXJzJzoga28ub2JzZXJ2YWJsZSgpLFxuICAgICAgICB9O1xuICAgIGZpZWxkc1snYWNjb3VudC10eXBlJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnYWNjb3VudC10eXBlJ10gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ2Z1bGxuYW1lJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnZnVsbG5hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydmdWxsbmFtZSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWydwYXNzd29yZCddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ3Bhc3N3b3JkJ10gPSB2YWx1ZTtcbiAgICAgICAgc2VsZi5lcnJvcnMoKVsncGFzc3dvcmQnXSh1bmRlZmluZWQpO1xuICAgICAgICBpZihzZWxmLm91dHB1dFsnY29uZmlybV9wYXNzd29yZCddICE9IHNlbGYub3V0cHV0WydwYXNzd29yZCddKXtcbiAgICAgICAgICAgIHNlbGYuZXJyb3JzKClbJ2NvbmZpcm1fcGFzc3dvcmQnXShcIk11c3QgbWF0Y2ggcGFzc3dvcmRcIik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2VsZi5lcnJvcnMoKVsnY29uZmlybV9wYXNzd29yZCddKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmaWVsZHNbJ3VzZXJuYW1lJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsndXNlcm5hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyd1c2VybmFtZSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWydjb25maXJtX3Bhc3N3b3JkJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnY29uZmlybV9wYXNzd29yZCddID0gdmFsdWU7XG4gICAgICAgIGlmKHNlbGYub3V0cHV0Wydjb25maXJtX3Bhc3N3b3JkJ10gIT0gc2VsZi5vdXRwdXRbJ3Bhc3N3b3JkJ10pe1xuICAgICAgICAgICAgc2VsZi5lcnJvcnMoKVsnY29uZmlybV9wYXNzd29yZCddKFwiTXVzdCBtYXRjaCBwYXNzd29yZFwiKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZWxmLmVycm9ycygpWydjb25maXJtX3Bhc3N3b3JkJ10odW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5lcnJvcnMoZXJyb3JzKTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsZXJyb3JzLGZpZWxkcykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGVycm9ycyA9IGVycm9ycyB8fCB7fTtcbiAgICBmaWVsZHMgPSBmaWVsZHMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICBzZWxmLmZpbGwoZXJyb3JzLGZpZWxkcyk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLXJlZ2lzdGVyLWZvcm0nLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkgeyBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzcGFuPlxcbiAgICA8IS0tIHJlZ2lzdGVyLWZvcm0gLS0+XFxuICAgIDxjLXJlZ2lzdGVyLWZvcm0gcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtcmVnaXN0ZXItZm9ybT5cXG48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdyZWdpc3Rlci12aWV3JztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ3JlZ2lzdGVyLWZvcm0nIC8vIHJlZ2lzdGVyLWZvcm1cbl07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1yZWdpc3Rlci12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJ3ZWxsIGNvbC1zbS0xMCBjb2wteHMtMTIgY29sLXNtLW9mZnNldC0xXFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMCBjb2wteHMtMTIgY29sLXNtLW9mZnNldC0xXFxcIj5cXG48bGVnZW5kIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlclxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBjYW1wYWlnbigpLm5hbWVcXFwiPjwvbGVnZW5kPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImxpc3QtZ3JvdXBcXFwiPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1zbS02IGNvbC14cy0xMlxcXCI+XFxuPGEgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbVxcXCI+XFxuPGg0IGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0taGVhZGluZ1xcXCI+U3RhdHVzOjwvaDQ+XFxuPHAgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbS10ZXh0XFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGNhbXBhaWduKCkuc3RhdHVzXFxcIj48L3A+XFxuPC9hPlxcbjxhIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW1cXFwiPlxcbjxoNCBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtLWhlYWRpbmdcXFwiPk51bWJlciBvZiBhY2NlcHRlZCBpbWFnZXM6PC9oND5cXG48cCBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtLXRleHRcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogc3RhdCgpLmFjY2VwdGVkXFxcIj48L3A+XFxuPC9hPlxcbjxhIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW1cXFwiPlxcbjxoNCBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtLWhlYWRpbmdcXFwiPk51bWJlciBvZiBhbm5vdGF0aW9uczo8L2g0PlxcbjxwIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0tdGV4dFxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBzdGF0KCkuYW5ub3RhdGlvblxcXCI+PC9wPlxcbjwvYT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtc20tNiBjb2wteHMtMTJcXFwiPlxcbjxhIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW1cXFwiPlxcbjxoNCBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtLWhlYWRpbmdcXFwiPk51bWJlciBvZiBpbWFnZXM6PC9oND5cXG48cCBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtLXRleHRcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogc3RhdCgpLmltYWdlc1xcXCI+PC9wPlxcbjwvYT5cXG48YSBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtXFxcIj5cXG48aDQgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nXFxcIj5OdW1iZXIgb2YgcmVqZWN0ZWQgaW1hZ2VzOjwvaDQ+XFxuPHAgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbS10ZXh0XFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IHN0YXQoKS5yZWplY3RlZFxcXCI+PC9wPlxcbjwvYT5cXG48YSBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtXFxcIj5cXG48aDQgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nXFxcIj5BdmcgbnVtYmVyIG9mIGFubm90YXRpb25zIHBlciBpbWFnZS48L2g0PlxcbjxwIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0tdGV4dFxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBzdGF0KCkuYXZnIFxcXCI+PC9wPlxcbjwvYT5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJ3ZWxsIGNvbC1zbS0xMCBjb2wtc20tb2Zmc2V0LTFcXFwiIGRhdGEtYmluZD1cXFwiaWY6IGNhbXBhaWduKCkuc3RhdHVzID09ICYjMzk7ZW5kZWQmIzM5O1xcXCI+XFxuPGRpdiBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IGltYWdlc0FycmF5XFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kYW5nZXIgY29sLXNtLTYgY29sLW1kLTQgY29sLWxnLTNcXFwiIGRhdGEtYmluZD1cXFwidmlzaWJsZTogc2VsZWN0aW9uLmFjY2VwdGVkICZsdDsgc2VsZWN0aW9uLnJlamVjdGVkXFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXG48cD5cXG48Yj5cXG5BY2NlcHRlZDpcXG48L2I+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiBzZWxlY3Rpb24uYWNjZXB0ZWRcXFwiPjwvc3Bhbj5cXG48L3A+XFxuPHA+XFxuPGI+XFxuUmVqZWN0ZWQ6XFxuPC9iPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwidGV4dDogc2VsZWN0aW9uLnJlamVjdGVkXFxcIj48L3NwYW4+XFxuPC9wPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcbjxhIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQuc2hvd1xcXCI+XFxuPGltZyBjbGFzcz1cXFwiaW1nLXJlc3BvbnNpdmUgY2VudGVyLWJsb2NrIGltZy10aHVtYm5haWwgaGVpZ2h0X19tYXgtLTE3MCBoZWlnaHRfX21pbi0tMTcwIHdpZHRoX19tYXgtLTE3MCB3aWR0aF9fbWluLS0xNzBcXFwiIGRhdGEtYmluZD1cXFwiYXR0cjp7c3JjOiAmIzM5O2h0dHA6Ly9hd3QuaWZtbGVkaXQub3JnJiMzOTsgKyBjYW5vbmljYWx9XFxcIj5cXG48L2E+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtc3VjY2VzcyBjb2wtc20tNiBjb2wtbWQtNCBjb2wtbGctM1xcXCIgZGF0YS1iaW5kPVxcXCJ2aXNpYmxlOiBzZWxlY3Rpb24uYWNjZXB0ZWQgJmd0OyBzZWxlY3Rpb24ucmVqZWN0ZWRcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcbjxwPlxcbjxiPlxcbkFjY2VwdGVkOlxcbjwvYj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcInRleHQ6IHNlbGVjdGlvbi5hY2NlcHRlZFxcXCI+PC9zcGFuPlxcbjwvcD5cXG48cD5cXG48Yj5cXG5SZWplY3RlZDpcXG48L2I+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiBzZWxlY3Rpb24ucmVqZWN0ZWRcXFwiPjwvc3Bhbj5cXG48L3A+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5zaG93XFxcIj5cXG48aW1nIGNsYXNzPVxcXCJpbWctcmVzcG9uc2l2ZSBjZW50ZXItYmxvY2sgaW1nLXRodW1ibmFpbCBoZWlnaHRfX21heC0tMTcwIGhlaWdodF9fbWluLS0xNzAgd2lkdGhfX21heC0tMTcwIHdpZHRoX19taW4tLTE3MFxcXCIgZGF0YS1iaW5kPVxcXCJhdHRyOntzcmM6ICYjMzk7aHR0cDovL2F3dC5pZm1sZWRpdC5vcmcmIzM5OyArIGNhbm9uaWNhbH1cXFwiPlxcbjwvYT5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiIGRhdGEtYmluZD1cXFwiaWY6IG1vZGFsVXJsKCkgIT0gdW5kZWZpbmVkXFxcIiBpZD1cXFwiaW1hZ2Vtb2RhbFxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiPlxcbjxkaXYgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+XFxuPGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+XFxuPGJ1dHRvbiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVxcXCI+PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJzci1vbmx5XFxcIj5DbG9zZTwvc3Bhbj5cXG48L2J1dHRvbj5cXG48YnI+XFxuPCEtLSAvJWxpbmUtZHJhd2VyLmltYWdlcHJldmlld3s6cGFyYW1zID0+IFxcXCJjb250ZXh0OiBjb250ZXh0LCBzcmM6ICdodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZycgKyBtb2RhbFVybCgpLCBwZW46IDAsIGxpbmU6ICcnXFxcIn0gLS0+XFxuPGltZyBjbGFzcz1cXFwiaW1hZ2VwcmV2aWV3XFxcIiBkYXRhLWJpbmQ9XFxcImF0dHI6e3NyYzogbW9kYWxBbm5vdGF0aW9uKClbbW9kYWxJKCldfSxzdHlsZTogeyAmIzM5O2JhY2tncm91bmRJbWFnZSYjMzk7OiAmIzM5O3VybCgmIzM5OysgJiMzOTtodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZyYjMzk7KyBtb2RhbFVybCgpICsmIzM5OykmIzM5OywgJiMzOTtiYWNrZ3JvdW5kU2l6ZSYjMzk7OiYjMzk7Y292ZXImIzM5OywmIzM5O2JhY2tncm91bmRSZXBlYXQmIzM5OzogJiMzOTtuby1yZXBlYXQmIzM5OywmIzM5O2JhY2tncm91bmRQb3NpdGlvbiYjMzk7OiAmIzM5O2NlbnRlciBjZW50ZXImIzM5O31cXFwiIHN0eWxlPVxcXCJ3aWR0aDogMTAwJVxcXCI+XFxuPGJyPlxcbjxkaXYgY2xhc3M9XFxcInJvdyBtYXJnaW5fX3RvcC0tMTBweFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIGNvbC1zbS02IHRleHQtcmlnaHRcXFwiPlxcbjxhIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IG5leHRBbm5vdGF0aW9uKC0xKVxcXCI+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tbGVmdFxcXCI+PC9zcGFuPlxcbjwvYT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgY29sLXNtLTZcXFwiPlxcbjxhIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IG5leHRBbm5vdGF0aW9uKDEpXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFxcXCI+PC9zcGFuPlxcbjwvYT5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2Rpdj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbiAgICBcbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5jYW1wYWlnbiA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHNlbGYuc3RhdCA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHNlbGYuaW1hZ2VzQ29sbGVjdGlvbiA9IHt9XG4gICAgc2VsZi5pbWFnZXNBcnJheSA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIHNlbGYubW9kYWxVcmwgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgc2VsZi5tb2RhbEFubm90YXRpb24gPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgc2VsZi5tb2RhbEkgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgc2VsZi5zdGF0cyA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIgKyBpZCArIFwiL3N0YXRpc3RpY3NcIixcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBzZWxmLmNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXlvYmopXG4gICAgICAgICAgICAgICAgbXlvYmouYXZnID0gbXlvYmouYW5ub3RhdGlvbiAvbXlvYmouaW1hZ2VzXG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0KG15b2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNlbGYuaW1hZ2VzID0gZnVuY3Rpb24oaWQpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIiArIGlkICsgXCIvaW1hZ2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBzZWxmLmNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXlvYmopXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZXNDb2xsZWN0aW9uID0gbXlvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZWxmLmltYWdlID0gZnVuY3Rpb24oaWQsY2Fub25pY2FsKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIgKyBpZCArIFwiL3N0YXRpc3RpY3NcIixcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBzZWxmLmNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgbXlvYmouaWQgPSBpZDtcbiAgICAgICAgICAgICAgICBteW9iai5jYW5vbmljYWwgPSBjYW5vbmljYWxcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlc0FycmF5LnB1c2gobXlvYmopXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLm1vZGFsQW5ub3RhdGlvbih0aGlzLmFubm90YXRpb24pO1xuICAgICAgICBzZWxmLm1vZGFsVXJsKHRoaXMuY2Fub25pY2FsKTtcbiAgICAgICAgc2VsZi5tb2RhbEkoMCk7XG4gICAgICAgIGlmKHRoaXMuYW5ub3RhdGlvbi5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICBzZWxmLm1vZGFsQW5ub3RhdGlvbihbJ2h0dHA6Ly9hd3QuaWZtbGVkaXQub3JnJysgdGhpcy5jYW5vbmljYWxdKVxuICAgICAgICB9XG5cdFx0JCgnI2ltYWdlbW9kYWwnKS5tb2RhbCgnc2hvdycpOyAgIFxuICAgIH1cbiAgICBzZWxmLm5leHRBbm5vdGF0aW9uID0gZnVuY3Rpb24oc3RlcCl7XG4gICAgICAgIHZhciBhID0gc2VsZi5tb2RhbEkoKVxuICAgICAgICB2YXIgYiA9IHNlbGYubW9kYWxBbm5vdGF0aW9uKCkubGVuZ3RoXG4gICAgICAgIGEgPSBhICsgc3RlcFxuICAgICAgICBpZihhIDwgMCl7XG4gICAgICAgICAgICAgYSA9IGItMVxuICAgICAgICB9XG4gICAgICAgIGlmKGEgPj0gYil7XG4gICAgICAgICAgICBhID0gMFxuICAgICAgICB9XG4gICAgICAgIHNlbGYubW9kYWxJKGEpXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYubW9kYWxJKCkpXG4gICAgfVxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBkYXRhKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgICAgc2VsZi5jYW1wYWlnbihkYXRhKTtcbiAgICAgICAgaWYoZGF0YS5zdGF0dXMgPT0gXCJlbmRlZFwiKXtcbiAgICAgICAgICAgIHNlbGYuc3RhdHMoZGF0YS5pZClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgIFwiaW1hZ2VzXCI6IFwiTm90IGEgY29tcGxldGVkIGNhbXBhaWduXCIsXG4gICAgICAgICAgICAgICAgXCJhY2NlcHRlZFwiOiBcIk5vdCBhIGNvbXBsZXRlZCBjYW1wYWlnblwiLFxuICAgICAgICAgICAgICAgIFwicmVqZWN0ZWRcIjogXCJOb3QgYSBjb21wbGV0ZWQgY2FtcGFpZ25cIixcbiAgICAgICAgICAgICAgICBcImFubm90YXRpb25cIjogXCJOb3QgYSBjb21wbGV0ZWQgY2FtcGFpZ25cIixcbiAgICAgICAgICAgICAgICBcImF2Z1wiOiBcIk5vdCBhIGNvbXBsZXRlZCBjYW1wYWlnblwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnN0YXQoZGF0YSlcbiAgICAgICAgfVxuICAgICAgICBpZihkYXRhLmlkICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBzZWxmLmltYWdlcyhkYXRhLmlkKSAgICBcbiAgICAgICAgfVxuICAgICAgICBpZihzZWxmLmltYWdlc0NvbGxlY3Rpb24uaW1hZ2VzICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBzZWxmLmltYWdlc0NvbGxlY3Rpb24uaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICAgICBzZWxmLmltYWdlKGl0ZW0uaWQsIGl0ZW0uY2Fub25pY2FsKSBcbiAgICAgICAgICAgIH0pOyAgIFxuICAgICAgICB9XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdzaG93LWNhbXBhaWduJztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG5dO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2Mtc2hvdy1jYW1wYWlnbicsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+ICAgIDwhLS0gdGFzay13b3JrZXItbGlzdCAtLT4gICAgPGMtdGFzay13b3JrZXItbGlzdCBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy10YXNrLXdvcmtlci1saXN0Pjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ3Rhc2stdmlldyc7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW1xuICAgICd0YXNrLXdvcmtlci1saXN0JyAvLyB0YXNrLXdvcmtlci1saXN0XG5dO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtdGFzay12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJ3ZWxsXFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1zbS05IGNvbC14cy0xMlxcXCI+XFxuPGxlZ2VuZD5cXG5UYXNrc1xcbjwvbGVnZW5kPlxcbjwvZGl2PlxcbjwvZGl2Plxcbjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtaG92ZXIgdGFibGUtc3RyaXBlZFxcXCI+XFxuPHRoZWFkPlxcbjx0cj5cXG48dGg+IzwvdGg+XFxuPHRoPlR5cGU8L3RoPlxcbjx0aCBjbGFzcz1cXFwidGV4dC1yaWdodFxcXCI+QWN0aW9uczwvdGg+XFxuPC90cj5cXG48L3RoZWFkPlxcbjx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IHsgZGF0YTogdGFza3MsIGFzOiAmIzM5O3Rhc2smIzM5OyB9XFxcIj5cXG48dHI+XFxuPHRkIGNsYXNzPVxcXCJ2ZXJ0aWNhbF9fbWlkZGxlXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6ICgkaW5kZXgoKSsxKVxcXCI+PC90ZD5cXG48dGQgY2xhc3M9XFxcInRleHQtY2FwaXRhbGl6ZSB2ZXJ0aWNhbF9fbWlkZGxlXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IHRhc2tbJiMzOTt0eXBlJiMzOTtdXFxcIiBzdHlsZT1cXFwid2hpdGUtc3BhY2U6IHByZS13cmFwXFxcIj48L3RkPlxcbjx0ZCBjbGFzcz1cXFwidGV4dC1yaWdodFxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4taW5mb1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5tb2RhbC5iaW5kKHRhc2spXFxcIiBkYXRhLXRhcmdldD1cXFwiI215TW9kYWxcXFwiIGRhdGEtdG9nZ2xlPVxcXCJtb2RhbFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tem9vbS1pblxcXCI+PC9zcGFuPlxcbjwvYT5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiB0YXNrWyYjMzk7dHlwZSYjMzk7XSA9PSAmIzM5O3NlbGVjdGlvbiYjMzk7XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LnRyaWdnZXIuYmluZCgkZGF0YSwgJiMzOTtpbWFnZS1zZWxlY3Rpb24tZ28mIzM5OywmIzM5O3RydWUmIzM5OyksIGNsaWNrQnViYmxlOiBmYWxzZVxcXCI+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWZsYWdcXFwiPlxcblNFTEVDVElPTlxcbjwvc3Bhbj5cXG48L2E+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IHRhc2sudHlwZSA9PSAmIzM5O2Fubm90YXRpb24mIzM5O1xcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC50cmlnZ2VyLmJpbmQoJGRhdGEsICYjMzk7aW1hZ2UtYW5ub3RhdGlvbi1nbyYjMzk7LCYjMzk7dHJ1ZSYjMzk7KSwgY2xpY2tCdWJibGU6IGZhbHNlXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tcGVuY2lsXFxcIj5cXG5BTk5PVEFUSU9OXFxuPC9zcGFuPlxcbjwvYT5cXG48L3NwYW4+XFxuPC90ZD5cXG48L3RyPlxcbjwvdGJvZHk+XFxuPC90YWJsZT5cXG48L2Rpdj5cXG48IS0tIE1vZGFsIC0tPlxcbjxkaXYgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIiBpZD1cXFwibXlNb2RhbFxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiPlxcbjxkaXYgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCIgcm9sZT1cXFwiZG9jdW1lbnRcXFwiPlxcbjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPlxcbjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+XFxuPGJ1dHRvbiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj5cXG48L2J1dHRvbj5cXG48aDQgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIiBpZD1cXFwibXlNb2RhbExhYmVsXFxcIj5UYXNrIFN0YXRpc3RpY3M8L2g0PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPlxcbjx1bCBkYXRhLWJpbmQ9XFxcImlmOiBzZWxlY3RlZFRhc2soKVsmIzM5O3R5cGUmIzM5O10gPT0gJiMzOTtzZWxlY3Rpb24mIzM5O1xcXCI+XFxuPGxpPlxcbjxiPkF2YWlsYWJsZTo8L2I+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiBhdmFpbGFibGUoKVxcXCI+PC9zcGFuPlxcbjwvbGk+XFxuPGxpPlxcbjxiPkFjY2VwdGVkOjwvYj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcInRleHQ6IGFjY2VwdGVkKClcXFwiPjwvc3Bhbj5cXG48L2xpPlxcbjxsaT5cXG48Yj5SZWplY3RlZDo8L2I+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiByZWplY3RlZCgpXFxcIj48L3NwYW4+XFxuPC9saT5cXG48L3VsPlxcbjx1bCBkYXRhLWJpbmQ9XFxcImlmOiBzZWxlY3RlZFRhc2soKS50eXBlID09ICYjMzk7YW5ub3RhdGlvbiYjMzk7XFxcIj5cXG48bGk+XFxuPGI+QXZhaWxhYmxlOjwvYj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcInRleHQ6IGF2YWlsYWJsZSgpXFxcIj48L3NwYW4+XFxuPC9saT5cXG48bGk+XFxuPGI+QW5ub3RhdGVkOjwvYj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcInRleHQ6IGFubm90YXRlZCgpXFxcIj48L3NwYW4+XFxuPC9saT5cXG48L3VsPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5fcmVwb3NpdG9yeSA9IHBhcmFtcy5jb250ZXh0LnJlcG9zaXRvcmllc1sndGFza3MnXTtcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcbiAgICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHNlbGYudGFza3MgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHNlbGYuc2VsZWN0ZWRUYXNrID0ga28ub2JzZXJ2YWJsZSh7fSk7XG4gICAgc2VsZi5hdmFpbGFibGUgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgc2VsZi5hY2NlcHRlZCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICBzZWxmLnJlamVjdGVkID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHNlbGYuYW5ub3RhdGVkID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIFxuICAgIHNlbGYubW9kYWwgPSBmdW5jdGlvbih0YXNrKXtcbiAgICAgICAgY29uc29sZS5sb2codGFzayk7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWRUYXNrKHRhc2spO1xuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnNlbGVjdGVkVGFzaygpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIgKyB0YXNrLmlkICsgXCIvc3RhdGlzdGljc1wiLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrIHNlbGYuY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnRva2VuKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIHZhciBteW9iaiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHNlbGYuYXZhaWxhYmxlKG15b2JqLmF2YWlsYWJsZSk7XG4gICAgICAgICAgICBzZWxmLmFjY2VwdGVkKG15b2JqLmFjY2VwdGVkKTtcbiAgICAgICAgICAgIHNlbGYucmVqZWN0ZWQobXlvYmoucmVqZWN0ZWQpO1xuICAgICAgICAgICAgc2VsZi5hbm5vdGF0ZWQobXlvYmouYW5ub3RhdGVkKTtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQsaW5pdCkge1xuICAgICAgICB0aGlzLmluaXQgPSBpbml0O1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQsIHRoaXMpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0X2RhdGEgPSBmdW5jdGlvbihjb250ZXh0KXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmcvYXBpL3Rhc2tcIixcbiAgICB0eXBlOiBcIkdFVFwiLFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBjb250ZXh0LnJlcG9zaXRvcmllcy5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICBteW9iaiA9IG15b2JqLnRhc2tzO1xuICAgICAgICBzZWxmLnRhc2tzKG15b2JqKTtcbiAgICB9XG4gICAgfSk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ3Rhc2std29ya2VyLWxpc3QnO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGluZyB8fFxuICAgICAgICAgICB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NvbXB1dGluZykge1xuICAgICAgICB0aGlzLl9jb21wdXRpbmcuY2FuY2VsKCk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLnRhc2tzKFtdKTtcbiAgICBzZWxmLnN0YXR1cygnY29tcHV0ZWQnKTtcbiAgICBzZWxmLl9jb21wdXRpbmcgPSB1bmRlZmluZWQ7XG59O1xuXG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICBzZWxmLmdldF9kYXRhKHNlbGYuY29udGV4dCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLXRhc2std29ya2VyLWxpc3QnLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkgeyBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIndlbGwgY29sLW1kLTggY29sLW1kLW9mZnNldC0yIGNvbC1zbS0xMCBjb2wtc20tb2Zmc2V0LTFcXFwiPlxcbjxsZWdlbmQ+V29ya2VyczwvbGVnZW5kPlxcbjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtaG92ZXIgdGFibGUtc3RyaXBlZFxcXCI+XFxuPHRoZWFkPlxcbjx0cj5cXG48dGg+IzwvdGg+XFxuPHRoPk5hbWU8L3RoPlxcbjx0aD5TZWxlY3RvcjwvdGg+XFxuPHRoPkFubm90YXRvcjwvdGg+XFxuPHRoPjwvdGg+XFxuPC90cj5cXG48L3RoZWFkPlxcbjx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IHdvcmtlcnNcXFwiPlxcbjx0cj5cXG48dGQgY2xhc3M9XFxcInZlcnRpY2FsX19taWRkbGVcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogKCRpbmRleCgpKzEpXFxcIj48L3RkPlxcbjx0ZCBjbGFzcz1cXFwidGV4dC1jYXBpdGFsaXplIHZlcnRpY2FsX19taWRkbGVcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZnVsbG5hbWUoKVxcXCIgc3R5bGU9XFxcIndoaXRlLXNwYWNlOiBwcmUtd3JhcFxcXCI+PC90ZD5cXG48dGQ+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogc2VsZWN0b3IoKSA9PSBmYWxzZVxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tc3VjY2Vzc1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5zZWxlY3RvckJ0blxcXCI+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMtc2lnblxcXCI+PC9zcGFuPlxcbjwvYT5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogc2VsZWN0b3IoKSA9PSB0cnVlXFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1kYW5nZXJcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQuc2VsZWN0b3JCdG5cXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1taW51cy1zaWduXFxcIj48L3NwYW4+XFxuPC9hPlxcbjwvc3Bhbj5cXG48L3RkPlxcbjx0ZD5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhbm5vdGF0b3IoKSA9PSBmYWxzZVxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tc3VjY2Vzc1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5hbm5vdGF0b3JCdG5cXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzLXNpZ25cXFwiPjwvc3Bhbj5cXG48L2E+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFubm90YXRvcigpID09IHRydWVcXFwiPlxcbjxhIGNsYXNzPVxcXCJidG4gYnRuLWRhbmdlclxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5hbm5vdGF0b3JCdG5cXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1taW51cy1zaWduXFxcIj48L3NwYW4+XFxuPC9hPlxcbjwvc3Bhbj5cXG48L3RkPlxcbjwvdHI+XFxuPC90Ym9keT5cXG48L3RhYmxlPlxcbjwvZGl2PlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5fcmVwb3NpdG9yeSA9IHBhcmFtcy5jb250ZXh0LnJlcG9zaXRvcmllc1snd29ya2VycyddO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuICAgIHNlbGYuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgc2VsZi53b3JrZXJzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCB0aGlzKTtcbiAgICB9O1xuICAgIHNlbGYuc2VsZWN0b3JCdG4gPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd29ya2VyID0gdGhpcztcbiAgICAgICAgdmFyIHR5cGUgPSBcIlBPU1RcIjtcbiAgICAgICAgaWYoIXdvcmtlci5zZWxlY3RvcigpKXtcbiAgICAgICAgICAgIHR5cGU9IFwiUE9TVFwiO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHR5cGU9IFwiREVMRVRFXCI7XG4gICAgICAgIH1cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZ1wiICsgd29ya2VyLmlkKCkgKyBcIi9zZWxlY3Rpb25cIixcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBzZWxmLmNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbGVjdG9yKCF3b3JrZXIuc2VsZWN0b3IoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgc2VsZi5hbm5vdGF0b3JCdG4gPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd29ya2VyID0gdGhpcztcbiAgICAgICAgdmFyIHR5cGUgPSBcIlBPU1RcIjtcbiAgICAgICAgaWYoIXdvcmtlci5hbm5vdGF0b3IoKSl7XG4gICAgICAgICAgICB0eXBlPSBcIlBPU1RcIjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0eXBlPSBcIkRFTEVURVwiO1xuICAgICAgICB9XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIiArIHdvcmtlci5pZCgpICsgXCIvYW5ub3RhdGlvblwiLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrIHNlbGYuY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnRva2VuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIHZhciBteW9iaiA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB3b3JrZXIuYW5ub3RhdG9yKCF3b3JrZXIuYW5ub3RhdG9yKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHNlbGYuZGVsZXRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgXG4gICAgfVxufVxuXG52YXIgcHJvdG9fd29ya2VyID0gZnVuY3Rpb24oaWQsZnVsbG5hbWUsc2VsZWN0b3IsYW5ub3RhdG9yKXtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHNlbGYuaWQgPSBrby5vYnNlcnZhYmxlKGlkKTtcbiAgICBzZWxmLmZ1bGxuYW1lID0ga28ub2JzZXJ2YWJsZShmdWxsbmFtZSk7XG4gICAgc2VsZi5zZWxlY3RvciA9IGtvLm9ic2VydmFibGUoc2VsZWN0b3IpO1xuICAgIHNlbGYuYW5ub3RhdG9yID0ga28ub2JzZXJ2YWJsZShhbm5vdGF0b3IpO1xuICAgIHJldHVybiBzZWxmO1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmdldF9kYXRhID0gZnVuY3Rpb24oY29udGV4dCAsIGlkKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIiArIGlkICsgXCIvd29ya2VyXCIsXG4gICAgdHlwZTogXCJHRVRcIixcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIisgY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnRva2VuKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIHZhciBteW9iaiA9IHJlc3VsdDtcbiAgICAgICAgbXlvYmogPSBteW9iai53b3JrZXJzXG4gICAgICAgIC8vc2VsZi53b3JrZXJzKG15b2JqLndvcmtlcnMpO1xuICAgICAgICB2YXIgdGVtcCA9W107XG4gICAgICAgICQuZWFjaChteW9iaiwgZnVuY3Rpb24gKGksIG9iaikge1xuICAgICAgICAgICAgdmFyIG5ld09iaiA9ICBwcm90b193b3JrZXIob2JqLmlkLG9iai5mdWxsbmFtZSxvYmouc2VsZWN0b3Isb2JqLmFubm90YXRvcik7XG4gICAgICAgICAgICB0ZW1wLnB1c2gobmV3T2JqKTsgXG4gICAgICAgIH0pOyBcbiAgICAgICAgc2VsZi53b3JrZXJzKHRlbXApXG4gICAgfVxuICAgIH0pO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICd3b3JrZXItc2VsZWN0LWxpc3QnO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGluZyB8fFxuICAgICAgICAgICB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NvbXB1dGluZykge1xuICAgICAgICB0aGlzLl9jb21wdXRpbmcuY2FuY2VsKCk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9jb21wdXRpbmcgPSB0aGlzLl9yZXBvc2l0b3J5LmZpbmQodGhpcy5maWx0ZXJzLCB0aGlzLmZpZWxkcykudGhlbihmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgc2VsZi53b3JrZXJzKGl0ZW1zKTtcbiAgICAgICAgc2VsZi5zdGF0dXMoJ2NvbXB1dGVkJyk7XG4gICAgICAgIHNlbGYuX2NvbXB1dGluZyA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsaWQpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmZpbHRlcnMgPSBvcHRpb25zLmlucHV0IHx8IHt9O1xuICAgIHRoaXMuc3RhdHVzKCdyZWFkeScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9pbml0aWFsaXppbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2NvbXB1dGUoKTtcbiAgICAgICAgICAgIHNlbGYuZ2V0X2RhdGEoc2VsZi5jb250ZXh0LGlkKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHNlbGYuX2luaXRpYWxpemluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSwgMSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2Mtd29ya2VyLXNlbGVjdC1saXN0Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHsgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj4gICAgICBcXG4gPGMtd29ya2VyLXNlbGVjdC1saXN0IHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLXdvcmtlci1zZWxlY3QtbGlzdD5cXG48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICd3b3JrZXItc2VsZWN0LXZpZXcnO1xuVmlld01vZGVsLnByb3RvdHlwZS5jaGlsZHJlbiA9IFtcbiAgICAnd29ya2VyLXNlbGVjdC1saXN0JyAvLyBsaXN0LWF2YWlsYWJsZS13b3JrZXJzXG5dO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2Mtd29ya2VyLXNlbGVjdC12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVxdWlyZSgnLi9tYWluLWFwcGxpY2F0aW9uJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtYWNjb3VudC1lZGl0LXZpZXcnKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1jcmVhdGUtY2FtcGFpZ24tdmlldycpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWVkaXQtY2FtcGFpZ24tdmlldycpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWhvbWUtYmFyJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtaW1hZ2UtYW5ub3RhdGlvbicpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWltYWdlLXNlbGVjdGlvbicpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWltYWdlLXVwbG9hZC12aWV3JykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtbWFuYWdlci12aWV3JykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2Mtc2hvdy1jYW1wYWlnbicpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLXRhc2stdmlldycpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLXdvcmtlci1zZWxlY3QtdmlldycpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWFjY291bnQtZWRpdC1mb3JtJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtY3JlYXRlLWNhbXBhaWduLWZvcm0nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1lZGl0LWNhbXBhaWduLWZvcm0nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1pbWFnZS1hbm5vdGF0aW9uLWZvcm0nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1pbWFnZS1zZWxlY3Rpb24tZm9ybScpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWltYWdlLXVwbG9hZC1mb3JtJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtbG9naW4tZm9ybScpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWxvZ2luLXZpZXcnKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1saXN0LWNhbXBhaWduJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtcmVnaXN0ZXItZm9ybScpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLXJlZ2lzdGVyLXZpZXcnKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy10YXNrLXdvcmtlci1saXN0JykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2Mtd29ya2VyLXNlbGVjdC1saXN0JykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtbGluZS1kcmF3ZXInKS5yZWdpc3RlcigpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2IGNsYXNzPVxcXCJuYXZiYXIgbmF2YmFyLWRlZmF1bHRcXFwiPlxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lci1mbHVpZFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwibmF2YmFyLWhlYWRlclxcXCI+XFxuPGJ1dHRvbiBhcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCIgY2xhc3M9XFxcIm5hdmJhci10b2dnbGUgY29sbGFwc2VkXFxcIiBkYXRhLXRhcmdldD1cXFwiI2xhbmRtYXJrLW1lbnVcXFwiIGRhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+VG9nZ2xlIG5hdmlnYXRpb248L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxuPC9idXR0b24+XFxuPGEgY2xhc3M9XFxcIm5hdmJhci1icmFuZCBjdXJzb3ItLXBvaW50ZXJcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O2hvbWUmIzM5OylcXFwiPlxcbjxpbWcgYWx0PVxcXCJMb2dvXFxcIiBjbGFzcz1cXFwiaW1nX193aWR0aF9fMWM1ZW0gcHVsbC1sZWZ0XFxcIiBzcmM9XFxcIi9yZW1vZmlvcmVudGluby9hd3QtcHJvamVjdC93d3cvaW1hZ2VzL2xvZ28ucG5nXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwidmVydGljYWxfX21pZGRsZVxcXCI+XFxuTW91bnRhaW5cXG48YiBjbGFzcz1cXFwidGV4dF9fY29sb3ItLWdyZWVuXFxcIj5cXG5GbGFnXFxuPC9iPlxcbjwvc3Bhbj5cXG48L2E+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXFxcIiBpZD1cXFwibGFuZG1hcmstbWVudVxcXCI+XFxuPHVsIGNsYXNzPVxcXCJuYXYgbmF2YmFyLW5hdiBuYXZiYXItcmlnaHRcXFwiIGRhdGEtYmluZD1cXFwiaWY6IGxvZ2dlZCgpID09PSBmYWxzZVxcXCI+XFxuPGxpPlxcbjxhIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O2xvZ2luLWdvJiMzOTspXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tbG9nLWluXFxcIj48L3NwYW4+XFxuTG9naW5cXG48L2E+XFxuPC9saT5cXG48bGk+XFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7cmVnaXN0ZXItZ28mIzM5OylcXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1pbmJveFxcXCI+PC9zcGFuPlxcblJlZ2lzdGVyXFxuPC9hPlxcbjwvbGk+XFxuPC91bD5cXG48dWwgY2xhc3M9XFxcIm5hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodFxcXCIgZGF0YS1iaW5kPVxcXCJpZjogbG9nZ2VkKCkgPT09IHRydWVcXFwiPlxcbjxsaT5cXG48YT5cXG48Yj5cXG5EZWFyXFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiB1c2VyX25hbWUoKVxcXCI+PC9zcGFuPlxcbjwvYj5cXG48L2E+XFxuPC9saT5cXG48bGkgZGF0YS1iaW5kPVxcXCJpZjogbWFuYWdlcigpXFxcIj5cXG48YSBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTttYW5hZ2VyLWdvJiMzOTspXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tcGljdHVyZVxcXCI+PC9zcGFuPlxcbk1hbmFnZXJcXG48L2E+XFxuPC9saT5cXG48bGkgZGF0YS1iaW5kPVxcXCJpZjogIW1hbmFnZXIoKVxcXCI+XFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7dGFzay1nbyYjMzk7KVxcXCI+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXRhc2tzXFxcIj48L3NwYW4+XFxudGFza1xcbjwvYT5cXG48L2xpPlxcbjxsaT5cXG48YSBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTthY2NvdW50LWVkaXQtZ28mIzM5OylcXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXFxcIj48L3NwYW4+XFxuRWRpdCBBY2NvdW50XFxuPC9hPlxcbjwvbGk+XFxuPGxpPlxcbjxhIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O2xvZ291dCYjMzk7KVxcXCI+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWxvZy1vdXRcXFwiPjwvc3Bhbj5cXG5Mb2dvdXRcXG48L2E+XFxuPC9saT5cXG48L3VsPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvbmF2PlxcbjwhLS0gLyAlbGluZS1kcmF3ZXJ7OnBhcmFtcyA9PiBcXFwiY29udGV4dDpjb250ZXh0LHNyYzogJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvNC80Zi9NYXR0ZXJob3JuX1JpZmZlbHNlZV8yMDA1LTA2LTExLmpwZycsIHBlbjogMTAsIGxpbmU6IGxpbmVcXFwifSAtLT5cXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7YWNjb3VudC1lZGl0LXZpZXcmIzM5O1xcXCI+XFxuPGMtYWNjb3VudC1lZGl0LXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtYWNjb3VudC1lZGl0LXZpZXc+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O2NyZWF0ZS1jYW1wYWlnbi12aWV3JiMzOTtcXFwiPlxcbjxjLWNyZWF0ZS1jYW1wYWlnbi12aWV3IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWNyZWF0ZS1jYW1wYWlnbi12aWV3Plxcbjwvc3Bhbj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTtlZGl0LWNhbXBhaWduLXZpZXcmIzM5O1xcXCI+XFxuPGMtZWRpdC1jYW1wYWlnbi12aWV3IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWVkaXQtY2FtcGFpZ24tdmlldz5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7aG9tZS1iYXImIzM5O1xcXCI+XFxuPGMtaG9tZS1iYXIgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtaG9tZS1iYXI+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O2ltYWdlLWFubm90YXRpb24mIzM5O1xcXCI+XFxuPGMtaW1hZ2UtYW5ub3RhdGlvbiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1pbWFnZS1hbm5vdGF0aW9uPlxcbjwvc3Bhbj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTtpbWFnZS1zZWxlY3Rpb24mIzM5O1xcXCI+XFxuPGMtaW1hZ2Utc2VsZWN0aW9uIGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWltYWdlLXNlbGVjdGlvbj5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7aW1hZ2UtdXBsb2FkLXZpZXcmIzM5O1xcXCI+XFxuPGMtaW1hZ2UtdXBsb2FkLXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtaW1hZ2UtdXBsb2FkLXZpZXc+XFxuPC9zcGFuPlxcbjwhLS0gL2xvZ2luLWZvcm0gLS0+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7bG9naW4tdmlldyYjMzk7XFxcIj5cXG48Yy1sb2dpbi12aWV3IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWxvZ2luLXZpZXc+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O2xvZ291dC12aWV3JiMzOTtcXFwiPlxcbjxjLWxvZ291dC12aWV3IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWxvZ291dC12aWV3Plxcbjwvc3Bhbj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTttYW5hZ2VyLXZpZXcmIzM5O1xcXCI+XFxuPGMtbWFuYWdlci12aWV3IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLW1hbmFnZXItdmlldz5cXG48L3NwYW4+XFxuPCEtLSAvcmVnaXN0ZXItZm9ybSAtLT5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTtyZWdpc3Rlci12aWV3JiMzOTtcXFwiPlxcbjxjLXJlZ2lzdGVyLXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtcmVnaXN0ZXItdmlldz5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7c2hvdy1jYW1wYWlnbiYjMzk7XFxcIj5cXG48Yy1zaG93LWNhbXBhaWduIGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLXNob3ctY2FtcGFpZ24+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O3Rhc2stdmlldyYjMzk7XFxcIj5cXG48Yy10YXNrLXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtdGFzay12aWV3Plxcbjwvc3Bhbj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTt3b3JrZXItc2VsZWN0LXZpZXcmIzM5O1xcXCI+XFxuPGMtd29ya2VyLXNlbGVjdC12aWV3IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLXdvcmtlci1zZWxlY3Qtdmlldz5cXG48L3NwYW4+XFxuPC9kaXY+XFxuPC9kaXY+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignbWFpbi1hcHBsaWNhdGlvbicsIHtcbiAgICAgICAgdmlld01vZGVsOiBmdW5jdGlvbihwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0Q2hpbGQgPSAnaG9tZS1iYXInO1xuICAgICAgICAgICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgICAgICAgICBzZWxmLmFjdGl2ZSA9IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHNlbGYubG9nZ2VkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLnVzZXJfbmFtZSA9IGtvLm9ic2VydmFibGUoXCJcIik7XG4gICAgICAgICAgICBzZWxmLm1hbmFnZXIgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYubGluZT1rby5vYnNlcnZhYmxlKCk7XG4gICAgICAgICAgICBzZWxmLmxpbmUuc3Vic2NyaWJlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgYWxlcnQoc2VsZi5saW5lKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlbGYubGFuZG1hcmsgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFjdGl2ZShpZCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tpZF0uaW5pdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFjdGl2ZShkZWZhdWx0Q2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbnRleHQudm1zW2RlZmF1bHRDaGlsZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tkZWZhdWx0Q2hpbGRdLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZWxmLmlzTG9naW4gPSBmdW5jdGlvbiAobG9nZ2VkLCBuYW1lLCBtYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2dnZWQobG9nZ2VkKTtcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJfbmFtZShuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSk7XG4gICAgICAgICAgICAgICAgc2VsZi5tYW5hZ2VyKG1hbmFnZXIpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudG9wID0gc2VsZjtcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsZGF0YSkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydhY2NvdW50LWVkaXQtdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2FjY291bnQtZWRpdC12aWV3Jyk7XG4gICAgICAgICAgICBjb250ZXh0LnZtc1snYWNjb3VudC1lZGl0LXZpZXcnXS5pbml0KHttYXNrOiAnYWNjb3VudC1lZGl0LWZvcm0nfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ2FjY291bnQtZWRpdC1mb3JtJ10uaW5pdCh7fSxkYXRhLmVycm9ycyxkYXRhLmZpZWxkcyk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2FjY291bnQtZWRpdC12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnYWNjb3VudC1lZGl0LXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snYWNjb3VudC1lZGl0LXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgICAgICAgJ2Z1bGxuYW1lJyA6IGRhdGFbJ2Z1bGxuYW1lJ11cbiAgICAgICAgICAgICwncGFzc3dvcmQnIDogZGF0YVsncGFzc3dvcmQnXVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGNvbnRleHQuYWN0aW9uc1snc2VuZC1hY2NvdW50LWVkaXQtZGF0YSddKHtmaWx0ZXJzOiBwYWNrZXR9KTtcbiAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydhY2NvdW50LWVkaXQtdmlldyddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2FjY291bnQtZWRpdC12aWV3J10uc3BsaWNlKFxuICAgICAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnYWNjb3VudC1lZGl0LXZpZXcnXS5pbmRleE9mKHByb21pc2UpLCAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5ldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZXZlbnRzW3Jlc3VsdC5ldmVudF0oY29udGV4dCwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAnaWQnIDogZGF0YVsnaWQnXVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGNvbnRleHQuYWN0aW9uc1snc2VuZC1hbm5vdGF0b3ItdG8tY2FtcGFpZ24nXSh7ZmlsdGVyczogcGFja2V0fSk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnd29ya2VyLXNlbGVjdC12aWV3J10ucHVzaChwcm9taXNlKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnd29ya2VyLXNlbGVjdC12aWV3J10uc3BsaWNlKFxuICAgICAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnd29ya2VyLXNlbGVjdC12aWV3J10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydjaGFuZ2UtY2FtcGFpZ24tc3RhdGUnXSgpO1xuICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ21hbmFnZXItdmlldyddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ21hbmFnZXItdmlldyddLnNwbGljZShcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ21hbmFnZXItdmlldyddLmluZGV4T2YocHJvbWlzZSksIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5ldmVudHNbcmVzdWx0LmV2ZW50XShjb250ZXh0LCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCxkYXRhKSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2NyZWF0ZS1jYW1wYWlnbi12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnY3JlYXRlLWNhbXBhaWduLXZpZXcnKTtcbiAgICAgICAgICAgIGNvbnRleHQudm1zWydjcmVhdGUtY2FtcGFpZ24tdmlldyddLmluaXQoe21hc2s6ICdjcmVhdGUtY2FtcGFpZ24tZm9ybSd9KTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snY3JlYXRlLWNhbXBhaWduLWZvcm0nXS5pbml0KHt9LGRhdGEuZXJyb3JzLCBkYXRhLmZpZWxkcyk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgICAgICAgJ2Fubm90YXRpb25fcmVwbGljYScgOiBkYXRhWydhbm5vdGF0aW9uX3JlcGxpY2EnXVxuICAgICAgICAgICAgLCdhbm5vdGF0aW9uX3NpemUnIDogZGF0YVsnYW5ub3RhdGlvbl9zaXplJ11cbiAgICAgICAgICAgICwnbmFtZScgOiBkYXRhWyduYW1lJ11cbiAgICAgICAgICAgICwnc2VsZWN0aW9uX3JlcGxpY2EnIDogZGF0YVsnc2VsZWN0aW9uX3JlcGxpY2EnXVxuICAgICAgICAgICAgLCd0aHJlc2hvbGQnIDogZGF0YVsndGhyZXNob2xkJ11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBjb250ZXh0LmFjdGlvbnNbJ3NlbmQtY3JlYXRlLWNhbXBhaWduLWRhdGEnXSh7ZmlsdGVyczogcGFja2V0fSk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnY3JlYXRlLWNhbXBhaWduLXZpZXcnXS5wdXNoKHByb21pc2UpO1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydjcmVhdGUtY2FtcGFpZ24tdmlldyddLnNwbGljZShcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2NyZWF0ZS1jYW1wYWlnbi12aWV3J10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2NyZWF0ZS1jYW1wYWlnbi12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnY3JlYXRlLWNhbXBhaWduLXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snY3JlYXRlLWNhbXBhaWduLXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LGRhdGEpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LnZtc1snZWRpdC1jYW1wYWlnbi12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnZWRpdC1jYW1wYWlnbi12aWV3Jyk7XG4gICAgICAgICAgICBjb250ZXh0LnZtc1snZWRpdC1jYW1wYWlnbi12aWV3J10uaW5pdCh7bWFzazogJ2VkaXQtY2FtcGFpZ24tZm9ybSd9KTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snZWRpdC1jYW1wYWlnbi1mb3JtJ10uaW5pdCh7fSxkYXRhLmVycm9ycyxkYXRhLmZpZWxkcyk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2VkaXQtY2FtcGFpZ24tdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2VkaXQtY2FtcGFpZ24tdmlldycpO1xuICAgICAgICB9XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZ1wiICsgZGF0YS5pZCxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBjb250ZXh0LnJlcG9zaXRvcmllcy5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgY29udGV4dC52bXNbJ2VkaXQtY2FtcGFpZ24tZm9ybSddLmluaXQoe30se30sIG15b2JqKTtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAnYW5ub3RhdGlvbl9yZXBsaWNhJyA6IGRhdGFbJ2Fubm90YXRpb25fcmVwbGljYSddXG4gICAgICAgICAgICAsJ2Fubm90YXRpb25fc2l6ZScgOiBkYXRhWydhbm5vdGF0aW9uX3NpemUnXVxuICAgICAgICAgICAgLCduYW1lJyA6IGRhdGFbJ25hbWUnXVxuICAgICAgICAgICAgLCdzZWxlY3Rpb25fcmVwbGljYScgOiBkYXRhWydzZWxlY3Rpb25fcmVwbGljYSddXG4gICAgICAgICAgICAsJ3RocmVzaG9sZCcgOiBkYXRhWyd0aHJlc2hvbGQnXVxuICAgICAgICAgICAgLCdpZCc6IGRhdGFbJ2lkJ11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBjb250ZXh0LmFjdGlvbnNbJ3NlbmQtZWRpdC1jYW1wYWlnbiddKHtmaWx0ZXJzOiBwYWNrZXR9KTtcbiAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydlZGl0LWNhbXBhaWduLXZpZXcnXS5wdXNoKHByb21pc2UpO1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydlZGl0LWNhbXBhaWduLXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydlZGl0LWNhbXBhaWduLXZpZXcnXS5pbmRleE9mKHByb21pc2UpLCAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5ldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZXZlbnRzW3Jlc3VsdC5ldmVudF0oY29udGV4dCwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsZGF0YSkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydzaG93LWNhbXBhaWduJ10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnc2hvdy1jYW1wYWlnbicpO1xuICAgICAgICB9XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZ1wiICsgZGF0YS5pZCxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBjb250ZXh0LnJlcG9zaXRvcmllcy5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgY29udGV4dC52bXNbJ3Nob3ctY2FtcGFpZ24nXS5pbml0KHt9LG15b2JqKTtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydob21lLWJhciddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2hvbWUtYmFyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ2hvbWUtYmFyJ10uaW5pdCgpO1xuICAgICAgICBpZighJC5pc0VtcHR5T2JqZWN0KGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXSkpe1xuICAgICAgICAgICAgaWYoY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJNQVNURVJcIil7XG4gICAgICAgICAgICAgICAgY29udGV4dC50b3AuaXNMb2dpbih0cnVlLGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXS51c2VybmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKHRydWUsY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLnVzZXJuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKGZhbHNlLCBcIlwiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsZGF0YSkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydpbWFnZS1hbm5vdGF0aW9uJ10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnaW1hZ2UtYW5ub3RhdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBjb250ZXh0LnZtc1snaW1hZ2UtYW5ub3RhdGlvbi1mb3JtJ10uaW5pdCh7fSxkYXRhLmlkLGRhdGEuaW5pdCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgICAgICAgJ2xpbmUnIDogZGF0YVsnbGluZSddLFxuICAgICAgICAgICAgJ2lkJzogZGF0YVsnaWQnXSxcbiAgICAgICAgICAgICd0eXBlJzogJ2Fubm90YXRpb24nXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VibWl0XCIpXG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLWltYWdlcy1hbm5vdGF0aW9uJ10oe2ZpbHRlcnM6IHBhY2tldH0pO1xuICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLWFubm90YXRpb24nXS5wdXNoKHByb21pc2UpO1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydpbWFnZS1hbm5vdGF0aW9uJ10uc3BsaWNlKFxuICAgICAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnaW1hZ2UtYW5ub3RhdGlvbiddLmluZGV4T2YocHJvbWlzZSksIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5ldmVudHNbcmVzdWx0LmV2ZW50XShjb250ZXh0LCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCxkYXRhKSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2ltYWdlLXNlbGVjdGlvbiddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2ltYWdlLXNlbGVjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQudm1zWydpbWFnZS1zZWxlY3Rpb24tZm9ybSddLmluaXQoe30sZGF0YS5pZCxkYXRhLmluaXQpO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCwgZGF0YSkge1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgICAgdmFyIHBhY2tldCA9IHtcbiAgICAgICAgICAgICdhY2NlcHRlZCcgOiBkYXRhWydhY2NlcHRlZCddLFxuICAgICAgICAgICAgJ2lkJzogZGF0YVsnaWQnXSxcbiAgICAgICAgICAgICd0eXBlJzogJ3NlbGVjdGlvbidcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBjb250ZXh0LmFjdGlvbnNbJ3NlbmQtaW1hZ2Utc2VsZWN0aW9uJ10oe2ZpbHRlcnM6IHBhY2tldH0pO1xuICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLXNlbGVjdGlvbiddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLXNlbGVjdGlvbiddLnNwbGljZShcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLXNlbGVjdGlvbiddLmluZGV4T2YocHJvbWlzZSksIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5ldmVudHNbcmVzdWx0LmV2ZW50XShjb250ZXh0LCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCxkYXRhKSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2ltYWdlLXVwbG9hZC12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnaW1hZ2UtdXBsb2FkLXZpZXcnKTtcbiAgICAgICAgICAgIGNvbnRleHQudm1zWydpbWFnZS11cGxvYWQtdmlldyddLmluaXQoe21hc2s6ICdpbWFnZS11cGxvYWQtZm9ybSd9KTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snaW1hZ2UtdXBsb2FkLWZvcm0nXS5pbml0KHt9LGRhdGEuZXJyb3JzLGRhdGEuaWQsZGF0YS5pbWFnZXMpO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LGRhdGEpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LnZtc1snaW1hZ2UtdXBsb2FkLXZpZXcnXSkge1xuICAgICAgICAgICAgY29udGV4dC50b3AuYWN0aXZlKCdpbWFnZS11cGxvYWQtdmlldycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEuaWQpXG4gICAgICAgIGlmKGRhdGEuaW1hZ2VzID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIgKyBkYXRhLmlkICsgXCIvaW1hZ2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBjb250ZXh0LnJlcG9zaXRvcmllcy5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGNvbnRleHQudm1zWydpbWFnZS11cGxvYWQtZm9ybSddLmluaXQoe30se30sZGF0YS5pZCxteW9iai5pbWFnZXMsdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnRleHQudm1zWydpbWFnZS11cGxvYWQtZm9ybSddLmluaXQoe30se30sZGF0YS5pZCxkYXRhLmltYWdlcyxkYXRhLm5ld19pbWFnZSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAnaW1hZ2UnIDogZGF0YVsnaW1hZ2UnXVxuICAgICAgICAgICAgLCdpZCcgOiBkYXRhWydpZCddXG4gICAgICAgICAgICAsJ2ltYWdlcyc6IGRhdGFbJ2ltYWdlcyddXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLWltYWdlLXVwbG9hZC1kYXRhJ10oe2ZpbHRlcnM6IHBhY2tldH0pO1xuICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLXVwbG9hZC12aWV3J10ucHVzaChwcm9taXNlKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnaW1hZ2UtdXBsb2FkLXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydpbWFnZS11cGxvYWQtdmlldyddLmluZGV4T2YocHJvbWlzZSksIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5ldmVudHNbcmVzdWx0LmV2ZW50XShjb250ZXh0LCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50cyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ21hbmFnZXItZ28nOiByZXF1aXJlKCcuL21hbmFnZXItZ28nKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2ltYWdlLXVwbG9hZC1nbyc6IHJlcXVpcmUoJy4vaW1hZ2UtdXBsb2FkLWdvJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCd3b3JrZXItc2VsZWN0LWdvJzogcmVxdWlyZSgnLi93b3JrZXItc2VsZWN0LWdvJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdsb2dpbi1nbyc6IHJlcXVpcmUoJy4vbG9naW4tZ28nKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ3JlZ2lzdGVyLWdvJzogcmVxdWlyZSgnLi9yZWdpc3Rlci1nbycpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnbG9nb3V0JzogcmVxdWlyZSgnLi9sb2dvdXQnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2FjY291bnQtZWRpdC1nbyc6IHJlcXVpcmUoJy4vYWNjb3VudC1lZGl0LWdvJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdjYW1wYWlnbi1jcmVhdGUnOiByZXF1aXJlKCcuL2NhbXBhaWduLWNyZWF0ZScpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnY2FtcGFpZ24tZWRpdC1nbyc6IHJlcXVpcmUoJy4vY2FtcGFpZ24tZWRpdC1nbycpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnY2FtcGFpZ24tY2hhbmdlLXN0YXRlJzogcmVxdWlyZSgnLi9jYW1wYWlnbi1jaGFuZ2Utc3RhdGUnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2FjY291bnQtZWRpdC1mYWlsdXJlJzogcmVxdWlyZSgnLi9hY2NvdW50LWVkaXQtZmFpbHVyZScpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnb24tYWNjb3VudC1lZGl0LXN1Y2Nlc3MnOiByZXF1aXJlKCcuL29uLWFjY291bnQtZWRpdC1zdWNjZXNzJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdjYW1wYWlnbi1jcmVhdGUtZmFpbHVyZSc6IHJlcXVpcmUoJy4vY2FtcGFpZ24tY3JlYXRlLWZhaWx1cmUnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2NhbXBhaWduLWVkaXQtZmFpbHVyZSc6IHJlcXVpcmUoJy4vY2FtcGFpZ24tZWRpdC1mYWlsdXJlJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdpbWFnZS1zZWxlY3Rpb24tZ28nOiByZXF1aXJlKCcuL2ltYWdlLXNlbGVjdGlvbi1nbycpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwndGFzay1nbyc6IHJlcXVpcmUoJy4vdGFzay1nbycpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnaW1hZ2UtdXBsb2FkLWZhaWx1cmUnOiByZXF1aXJlKCcuL2ltYWdlLXVwbG9hZC1mYWlsdXJlJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdpbWFnZS1hbm5vdGF0aW9uLWdvJzogcmVxdWlyZSgnLi9pbWFnZS1hbm5vdGF0aW9uLWdvJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdhY2NvdW50LWVkaXQtc3VibWl0JzogcmVxdWlyZSgnLi9hY2NvdW50LWVkaXQtc3VibWl0JykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdjYW1wYWlnbi1jcmVhdGUtc3VibWl0JzogcmVxdWlyZSgnLi9jYW1wYWlnbi1jcmVhdGUtc3VibWl0JykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdjYW1wYWlnbi1lZGl0LXN1Ym1pdCc6IHJlcXVpcmUoJy4vY2FtcGFpZ24tZWRpdC1zdWJtaXQnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2ltYWdlLWFubm90YXRpb24tc3VibWl0JzogcmVxdWlyZSgnLi9pbWFnZS1hbm5vdGF0aW9uLXN1Ym1pdCcpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnaW1hZ2Utc2VsZWN0aW9uLXN1Ym1pdCc6IHJlcXVpcmUoJy4vaW1hZ2Utc2VsZWN0aW9uLXN1Ym1pdCcpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnaW1hZ2UtdXBsb2FkLXN1Ym1pdCc6IHJlcXVpcmUoJy4vaW1hZ2UtdXBsb2FkLXN1Ym1pdCcpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnbG9naW4tc3VibWl0JzogcmVxdWlyZSgnLi9sb2dpbi1zdWJtaXQnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2NhbXBhaWduLXNob3cnOiByZXF1aXJlKCcuL2NhbXBhaWduLXNob3cnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ3JlZ2lzdGVyLXN1Ym1pdCc6IHJlcXVpcmUoJy4vcmVnaXN0ZXItc3VibWl0JykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdhbm5vdGF0b3Itc3VibWl0LXRvLWNhbXBhaWduJzogcmVxdWlyZSgnLi9hbm5vdGF0b3Itc3VibWl0LXRvLWNhbXBhaWduJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdsb2dpbi1mYWlsdXJlJzogcmVxdWlyZSgnLi9sb2dpbi1mYWlsdXJlJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdyZWdpc3Rlci1mYWlsdXJlJzogcmVxdWlyZSgnLi9yZWdpc3Rlci1mYWlsdXJlJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdob21lJzogcmVxdWlyZSgnLi9ob21lJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsZGF0YSkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydsb2dpbi12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnbG9naW4tdmlldycpO1xuICAgICAgICAgICAgY29udGV4dC52bXNbJ2xvZ2luLXZpZXcnXS5pbml0KHttYXNrOiAnbG9naW4tZm9ybSd9KTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snbG9naW4tZm9ybSddLmluaXQoe30sZGF0YS5lcnJvcnMsIGRhdGEuZmllbGRzKTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LnZtc1snbG9naW4tdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2xvZ2luLXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snbG9naW4tdmlldyddLmluaXQoKTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAncGFzc3dvcmQnIDogZGF0YVsncGFzc3dvcmQnXVxuICAgICAgICAgICAgLCd1c2VybmFtZScgOiBkYXRhWyd1c2VybmFtZSddXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLWxvZ2luLWRhdGEnXSh7ZmlsdGVyczogcGFja2V0fSk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnbG9naW4tdmlldyddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2xvZ2luLXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydsb2dpbi12aWV3J10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIC8vIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLWxvZ291dC1kYXRhJ10oKTtcbiAgICAgICAgLy8gY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydtYWluLWFwcGxpY2F0aW9uJ10ucHVzaChwcm9taXNlKTtcbiAgICAgICAgLy8gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgLy8gICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnbWFpbi1hcHBsaWNhdGlvbiddLnNwbGljZShcbiAgICAgICAgLy8gICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ21haW4tYXBwbGljYXRpb24nXS5pbmRleE9mKHByb21pc2UpLCAxXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgaWYgKHJlc3VsdC5ldmVudCkge1xuICAgICAgICAvLyAgICAgICAgIGNvbnRleHQuZXZlbnRzW3Jlc3VsdC5ldmVudF0oY29udGV4dCwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnL2FwaS9hdXRoXCIsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIisgY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnRva2VuKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyID0ge31cbiAgICAgICAgICAgIGlmICghY29udGV4dC52bXNbJ2hvbWUtYmFyJ10pIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2hvbWUtYmFyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LnZtc1snaG9tZS1iYXInXS5pbml0KCk7XG4gICAgICAgICAgICBpZighJC5pc0VtcHR5T2JqZWN0KGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXSkpe1xuICAgICAgICAgICAgICAgIGlmKGNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50eXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiTUFTVEVSXCIpe1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKHRydWUsY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLnVzZXJuYW1lLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC50b3AuaXNMb2dpbih0cnVlLGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXS51c2VybmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnRleHQudG9wLmlzTG9naW4oZmFsc2UsIFwiXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfX0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydtYW5hZ2VyLXZpZXcnXSkge1xuICAgICAgICAgICAgY29udGV4dC50b3AuYWN0aXZlKCdtYW5hZ2VyLXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snbWFuYWdlci12aWV3J10uaW5pdCgpO1xuICAgICAgICBpZighJC5pc0VtcHR5T2JqZWN0KGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXSkpe1xuICAgICAgICAgICAgaWYoY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJNQVNURVJcIil7XG4gICAgICAgICAgICAgICAgY29udGV4dC50b3AuaXNMb2dpbih0cnVlLGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXS51c2VybmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKHRydWUsY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLnVzZXJuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKGZhbHNlLCBcIlwiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcbi8vdG8gZml4IGl0IGRlcGVuZHNcbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2FjY291bnQtZWRpdC12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnYWNjb3VudC1lZGl0LXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snYWNjb3VudC1lZGl0LXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ3JlZ2lzdGVyLWZvcm0nXSkge1xuICAgICAgICAgICAgY29udGV4dC50b3AuYWN0aXZlKCdyZWdpc3Rlci1mb3JtJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ3JlZ2lzdGVyLWZvcm0nXS5pbml0KHt9LGRhdGEuZXJyb3JzLCBkYXRhLmZpZWxkcyk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ3JlZ2lzdGVyLXZpZXcnXSkge1xuICAgICAgICAgICAgY29udGV4dC50b3AuYWN0aXZlKCdyZWdpc3Rlci12aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ3JlZ2lzdGVyLXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG5cbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAnYWNjb3VudC10eXBlJyA6IGRhdGFbJ2FjY291bnQtdHlwZSddXG4gICAgICAgICAgICAsJ3Bhc3N3b3JkJyA6IGRhdGFbJ3Bhc3N3b3JkJ11cbiAgICAgICAgICAgICwnZnVsbG5hbWUnIDogZGF0YVsnZnVsbG5hbWUnXVxuICAgICAgICAgICAgLCd1c2VybmFtZScgOiBkYXRhWyd1c2VybmFtZSddXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLXJlZ2lzdHJhdGlvbi1kYXRhJ10oe2ZpbHRlcnM6IHBhY2tldH0sY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsncmVnaXN0ZXItdmlldyddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ3JlZ2lzdGVyLXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydyZWdpc3Rlci12aWV3J10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ3Rhc2stdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ3Rhc2stdmlldycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQudm1zWyd0YXNrLXZpZXcnXS5pbml0KCk7XG4gICAgICAgIGlmKCEkLmlzRW1wdHlPYmplY3QoY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddKSl7XG4gICAgICAgICAgICBpZihjb250ZXh0LnJlcG9zaXRvcmllcy5jdXJyZW50X3VzZXIudHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIk1BU1RFUlwiKXtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKHRydWUsY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLnVzZXJuYW1lLCB0cnVlKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnRleHQudG9wLmlzTG9naW4odHJ1ZSxjb250ZXh0LnJlcG9zaXRvcmllc1snY3VycmVudF91c2VyJ10udXNlcm5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmlzTG9naW4oZmFsc2UsIFwiXCIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LGRhdGEpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LnZtc1snd29ya2VyLXNlbGVjdC12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnd29ya2VyLXNlbGVjdC12aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ3dvcmtlci1zZWxlY3QtbGlzdCddLmluaXQoe30sZGF0YS5pZCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgIHJlcG9zaXRvcmllcyA9IHJlcXVpcmUoJy4vcmVwb3NpdG9yaWVzJyksXG4gICAgY29udHJvbHMgPSByZXF1aXJlKCcuL2NvbnRyb2xzJyksXG4gICAgZXZlbnRzID0gcmVxdWlyZSgnLi9ldmVudHMnKSxcbiAgICBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zJyksXG4gICAgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKTtcblxuUHJvbWlzZS5jb25maWcoe2NhbmNlbGxhdGlvbjogdHJ1ZX0pO1xuXG5jb250cm9scy5yZWdpc3RlcigpO1xuLy8gVE9ETzogcmVnaXN0ZXIgYW55IGN1c3RvbSBjb250cm9sXG5cbmZ1bmN0aW9uIEFwcGxpY2F0aW9uVmlld01vZGVsKCkge1xuICAgIC8vIFRPRE86IGluaXRpYWxpemUgZ2xvYmFsIHN0YXRlXG4gICAgdmFyIHJlcG9zID0gcmVwb3NpdG9yaWVzLmNyZWF0ZVJlcG9zaXRvcmllcyh7fSk7XG4gICAgdGhpcy5jb250ZXh0ID0ge1xuICAgICAgICByZXBvc2l0b3JpZXM6IHJlcG9zLFxuICAgICAgICBldmVudHM6IGV2ZW50cy5jcmVhdGVFdmVudHMoe30pLFxuICAgICAgICBhY3Rpb25zOiBhY3Rpb25zLmNyZWF0ZUFjdGlvbnMoe3JlcG9zaXRvcmllczogcmVwb3N9KSxcbiAgICAgICAgdm1zOiB7fSxcbiAgICAgICAgcnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lcjoge31cbiAgICB9O1xufVxuXG52YXIgYXBwbGljYXRpb24gPSBuZXcgQXBwbGljYXRpb25WaWV3TW9kZWwoKTtcblxua28uYXBwbHlCaW5kaW5ncyhhcHBsaWNhdGlvbik7XG5cbmFwcGxpY2F0aW9uLmNvbnRleHQudG9wLmluaXQoKTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgRGF0YVN0b3JlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ05lZGInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ05lZGInXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBSZXBvc2l0b3J5KG9wdGlvbnMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGluaXRpYWxpemF0aW9uXG5cbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBCRUdJTlxuICAgIHRoaXMuZGIgPSBQcm9taXNlLnByb21pc2lmeUFsbChuZXcgRGF0YVN0b3JlKHtcbiAgICAgICAgZmlsZW5hbWU6ICdjYW1wYWlnbicsXG4gICAgICAgIGluTWVtb3J5T25seTogdHJ1ZVxuICAgIH0pKTtcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBFTkRcbn1cblxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgdGhlIGFjY2Vzc29yIHRvIHRoZSBkYXRhc291cmNlIHdoaWNoIHJldHVybnMgYSBwcm9taXNlXG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgQkVHSU5cbiAgICByZXR1cm4gdGhpcy5kYi5maW5kT25lQXN5bmMoe2lkOiBpZH0pO1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEVORFxufTtcblxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChmaWVsZHMsIHByb2plY3QpIHtcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgdGhlIGFjY2Vzc29yIHRvIHRoZSBkYXRhc291cmNlIHdoaWNoIHJldHVybnMgYSBwcm9taXNlXG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgQkVHSU5cbiAgICByZXR1cm4gdGhpcy5kYi5maW5kQXN5bmMoZmllbGRzLCBwcm9qZWN0KTtcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBFTkRcbn07XG5cbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yaWVzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgcmVwb3NpdG9yaWVzID0ge31cbiAgICByZXBvc2l0b3JpZXNbJ2NhbXBhaWduJ10gPSByZXF1aXJlKCcuL2NhbXBhaWduJykuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKTtcbiAgICByZXBvc2l0b3JpZXNbJ3Rhc2tzJ10gPSByZXF1aXJlKCcuL3Rhc2tzJykuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKTtcbiAgICByZXBvc2l0b3JpZXNbJ3dvcmtlcnMnXSA9IHJlcXVpcmUoJy4vd29ya2VycycpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyk7XG4gICAgLy8gcmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXSA9IHtcbiAgICAvLyAgICAgXCJ0b2tlblwiOlwiN2EyNmYxMDUtMjg3YS00MzFhLTk5YWMtZWIxNjc0NGU3NjAzXCIsXG4gICAgLy8gICAgIFwiZnVsbG5hbWVcIjpcIlJlbW8gRmlvcmVudGlubyBDYXNhZGllZ29cIixcbiAgICAvLyAgICAgXCJ1c2VybmFtZVwiOlwicmVtb1wiLFxuICAgIC8vICAgICBcInR5cGVcIjpcIm1hc3RlclwiXG4gICAgLy8gfTtcbiAgICByZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddID0ge1xuICAgICAgICBcImZ1bGxuYW1lXCI6IFwiTWFyaW8gSm9yZ29zXCIsIFxuICAgICAgICBcInVzZXJuYW1lXCI6IFwiTWFyaW9cIiwgXG4gICAgICAgIFwidHlwZVwiOiBcIndvcmtlclwiLFxuICAgICAgICBcInRva2VuXCI6IFwiNDA4YWZiMWItYmY1Yi00N2MyLWI1ZDYtODY1MDlmMjIxMTEyXCJcbiAgICB9O1xuICAgIHJldHVybiByZXBvc2l0b3JpZXM7XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICBEYXRhU3RvcmUgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snTmVkYiddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnTmVkYiddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFJlcG9zaXRvcnkob3B0aW9ucykge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBvc2l0b3J5KSkge1xuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogaW5pdGlhbGl6YXRpb25cblxuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEJFR0lOXG4gICAgdGhpcy5kYiA9IFByb21pc2UucHJvbWlzaWZ5QWxsKG5ldyBEYXRhU3RvcmUoe1xuICAgICAgICBmaWxlbmFtZTogJ3Rhc2tzJyxcbiAgICAgICAgaW5NZW1vcnlPbmx5OiB0cnVlXG4gICAgfSkpO1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEVORFxufVxuXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCB0aGUgYWNjZXNzb3IgdG8gdGhlIGRhdGFzb3VyY2Ugd2hpY2ggcmV0dXJucyBhIHByb21pc2VcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBCRUdJTlxuICAgIHJldHVybiB0aGlzLmRiLmZpbmRPbmVBc3luYyh7aWQ6IGlkfSk7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgRU5EXG59O1xuXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKGZpZWxkcywgcHJvamVjdCkge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCB0aGUgYWNjZXNzb3IgdG8gdGhlIGRhdGFzb3VyY2Ugd2hpY2ggcmV0dXJucyBhIHByb21pc2VcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBCRUdJTlxuICAgIHJldHVybiB0aGlzLmRiLmZpbmRBc3luYyhmaWVsZHMsIHByb2plY3QpO1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEVORFxufTtcblxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgRGF0YVN0b3JlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ05lZGInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ05lZGInXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBSZXBvc2l0b3J5KG9wdGlvbnMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGluaXRpYWxpemF0aW9uXG5cbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBCRUdJTlxuICAgIHRoaXMuZGIgPSBQcm9taXNlLnByb21pc2lmeUFsbChuZXcgRGF0YVN0b3JlKHtcbiAgICAgICAgZmlsZW5hbWU6ICd3b3JrZXJzJyxcbiAgICAgICAgaW5NZW1vcnlPbmx5OiB0cnVlXG4gICAgfSkpO1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEVORFxufVxuXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCB0aGUgYWNjZXNzb3IgdG8gdGhlIGRhdGFzb3VyY2Ugd2hpY2ggcmV0dXJucyBhIHByb21pc2VcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBCRUdJTlxuICAgIHJldHVybiB0aGlzLmRiLmZpbmRPbmVBc3luYyh7aWQ6IGlkfSk7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgRU5EXG59O1xuXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKGZpZWxkcywgcHJvamVjdCkge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCB0aGUgYWNjZXNzb3IgdG8gdGhlIGRhdGFzb3VyY2Ugd2hpY2ggcmV0dXJucyBhIHByb21pc2VcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBCRUdJTlxuICAgIHJldHVybiB0aGlzLmRiLmZpbmRBc3luYyhmaWVsZHMsIHByb2plY3QpO1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEVORFxufTtcblxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcbiJdfQ==

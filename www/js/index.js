(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['execution']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'change-campaign-state'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'manager-go', // manager-go
        data: {
        }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'change-campaign-state': require('./change-campaign-state').createAction(options)
        ,'send-account-edit-data': require('./send-account-edit-data').createAction(options)
        ,'send-create-campaign-data': require('./send-create-campaign-data').createAction(options)
        ,'send-edit-campaign': require('./send-edit-campaign').createAction(options)
        ,'send-image-selection': require('./send-image-selection').createAction(options)
        ,'send-image-upload-data': require('./send-image-upload-data').createAction(options)
        ,'send-images-annotation': require('./send-images-annotation').createAction(options)
        ,'send-logout-data': require('./send-logout-data').createAction(options)
        ,'send-workers-to-campaign': require('./send-workers-to-campaign').createAction(options)
        ,'send-annotator-to-campaign': require('./send-annotator-to-campaign').createAction(options)
        ,'send-login-data': require('./send-login-data').createAction(options)
        ,'send-registration-data': require('./send-registration-data').createAction(options)
    };
};

},{"./change-campaign-state":1,"./send-account-edit-data":3,"./send-annotator-to-campaign":4,"./send-create-campaign-data":5,"./send-edit-campaign":6,"./send-image-selection":7,"./send-image-upload-data":8,"./send-images-annotation":9,"./send-login-data":10,"./send-logout-data":11,"./send-registration-data":12,"./send-workers-to-campaign":13}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['id']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'send-annotator-to-campaign'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'worker-select-go', // worker-select-go
        data: {
        }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
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
    parameters['annotation_replica']
    parameters['annotation_size']
    parameters['name']
    parameters['selection_replica']
    parameters['threshold']
    parameters['id']
    alert(JSON.stringify(parameters))
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
        datos.url = parameters['id'];
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

},{}],7:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['accepted']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'send-image-selection'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'image-selection-go', // image-selection-go
        // event: 'task-go', // task-go
        data: {
        }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['image']
    // parameters['name']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'send-image-upload-data'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'image-upload-failure', // image-upload-failure
        // event: 'worker-select-go', // worker-select-go
        data: {
            'location': '0',
        }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['annotation']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'send-images-annotation'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'image-annotation-go', // image-annotation-go
        // event: 'task-go', // task-go
        data: {
        }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
        alert("aguacate")
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

},{}],12:[function(require,module,exports){
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
    //alert(JSON.stringify(context));
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
            alert(result)
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

},{}],13:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['id']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'send-workers-to-campaign'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'worker-select-go', // worker-select-go
        data: {
        }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">Edit Account</legend>\n<form>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;fullname&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;fullname&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;fullname&#39;]}\" for=\"account-edit-form_field_0\">Fullname</label>\n<input aria-describedby=\"account-edit-form_field_0_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;fullname&#39;]\" id=\"account-edit-form_field_0\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;fullname&#39;]\" id=\"account-edit-form_field_0_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;password&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;password&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;password&#39;]}\" for=\"account-edit-form_field_1\">Password</label>\n<input aria-describedby=\"account-edit-form_field_1_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;password&#39;]\" id=\"account-edit-form_field_1\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;password&#39;]\" id=\"account-edit-form_field_1_error\"></span>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;account-edit-submit&#39;)\">\nSubmit\n</a>\n<br>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],15:[function(require,module,exports){
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
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.fill = function (errors_sent) {
    alert(JSON.stringify(this.context.repositories['current_user']))
    this.fields()['fullname'](this.context.repositories['current_user'].fullname);
    this.fields()['password'](this.context.repositories['current_user'].password);
    this.errors()['fullname'](errors_sent.fullname);
    this.errors()['password'](errors_sent.password);
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
    }
    var self = this,
        fields = {
            'fullname': ko.observable(this.input['fullname']),
            'password': ko.observable(this.input['password']),
        },
        errors = {
            'fullname': ko.observable(this.input['fullname-error']),
            'password': ko.observable(this.input['password-error']),
            'others': ko.observable(),
        };
    fields['fullname'].subscribe(function (value) {
        self.output['fullname'] = value;
        self.errors()['fullname'](undefined);
    });
    fields['password'].subscribe(function (value) {
        self.output['password'] = value;
        self.errors()['password'](undefined);
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

},{"./index.html":14}],16:[function(require,module,exports){
module.exports = "<span>    <!-- account-edit-form -->    <c-account-edit-form params=\"context: context\"></c-account-edit-form></span>";

},{}],17:[function(require,module,exports){
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

},{"./index.html":16}],18:[function(require,module,exports){
module.exports = "<h3>annotator-list</h3><table class=\"table table-hover table-condensed\">    <thead>        <tr>            <th>#</th>        </tr>    </thead>    <tbody data-bind=\"foreach: items\">        <tr data-bind=\"click: $parent.select\">            <td data-bind=\"text: id\"></td>        </tr>        </tbody></table>";

},{}],19:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['workers'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'annotator-list';

ViewModel.prototype.fields = {
    id: 1
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
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-annotator-list', {
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

},{"./index.html":18}],20:[function(require,module,exports){
module.exports = "<h3>campaign-worker-list</h3><table class=\"table table-hover table-condensed\">    <thead>        <tr>            <th>#</th>            <th>accepted</th>            <th>annotated</th>            <th>available</th>            <th>rejected</th>            <th>type</th>            <th>actions</th>        </tr>    </thead>    <tbody data-bind=\"foreach: items\">        <tr data-bind=\"click: $parent.select\">            <td data-bind=\"text: id\"></td>            <td data-bind=\"text: $data['accepted']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['annotated']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['available']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['rejected']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['type']\" style=\"white-space: pre-wrap\"></td>            <td>                <a class=\"waves-effect waves-light btn cyan\" data-bind=\"click: $parent.trigger.bind($data, 'image-selection-go'), clickBubble: false\">image-selection-go</a>                <a class=\"waves-effect waves-light btn cyan\" data-bind=\"click: $parent.trigger.bind($data, 'image-annotation-go'), clickBubble: false\">image-annotation-go</a>            </td>        </tr>        </tbody></table>";

},{}],21:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['tasks'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'campaign-worker-list';

ViewModel.prototype.fields = {
    id: 1
    ,'accepted': 1
    ,'annotated': 1
    ,'available': 1
    ,'rejected': 1
    ,'type': 1
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
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-campaign-worker-list', {
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

},{"./index.html":20}],22:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">\n<b>\nCreate a Campaign!\n</b>\n</legend>\n<form class=\"form-horizontal\">\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;name&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-4 text__allign--left\" data-bind=\"css: {active: fields()[&#39;name&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;name&#39;]}\" for=\"create-campaign-form_field_2\">\n<b>\nName of campaign:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-8\">\n<input aria-describedby=\"create-campaign-form_field_2_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;name&#39;]\" id=\"create-campaign-form_field_2\" placeholder=\"A good name\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;name&#39;]\" id=\"create-campaign-form_field_2_error\"></span>\n</div>\n</div>\n<legend>Image Selection</legend>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;selection_replica&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;selection_replica&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;selection_replica&#39;]}\" for=\"create-campaign-form_field_3\">\n<b>\nMinimum number of workers per image:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"create-campaign-form_field_3_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;selection_replica&#39;]\" id=\"create-campaign-form_field_3\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;selection_replica&#39;]\" id=\"create-campaign-form_field_3_error\"></span>\n</div>\n</div>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;threshold&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;threshold&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;threshold&#39;]}\" for=\"create-campaign-form_field_4\">\n<b>\nMinimum number of positive results:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"create-campaign-form_field_4_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;threshold&#39;]\" id=\"create-campaign-form_field_4\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;threshold&#39;]\" id=\"create-campaign-form_field_4_error\"></span>\n</div>\n</div>\n<legend>Image Annotation</legend>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;annotation_replica&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;annotation_replica&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;annotation_replica&#39;]}\" for=\"create-campaign-form_field_0\">\n<b>\nMinimum number of workers per image:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"create-campaign-form_field_0_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;annotation_replica&#39;]\" id=\"create-campaign-form_field_0\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;annotation_replica&#39;]\" id=\"create-campaign-form_field_0_error\"></span>\n</div>\n</div>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;annotation_size&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;annotation_size&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;annotation_size&#39;]}\" for=\"create-campaign-form_field_1\">\n<b>\nWidth(in pixels) of the annotation line:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"create-campaign-form_field_1_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;annotation_size&#39;]\" id=\"create-campaign-form_field_1\" max=\"30\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;annotation_size&#39;]\" id=\"create-campaign-form_field_1_error\"></span>\n</div>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;campaign-create-submit&#39;)\">\nCREATE\n</a>\n<br>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],23:[function(require,module,exports){
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

},{"./index.html":22}],24:[function(require,module,exports){
module.exports = "<span>\n  <!-- create-campaign-form -->\n  <c-create-campaign-form params=\"context: context\">\n  </c-create-campaign-form>\n</span>";

},{}],25:[function(require,module,exports){
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

},{"./index.html":24}],26:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">\n<b>\nEdit your Campaign!\n</b>\n</legend>\n<form class=\"form-horizontal\">\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;name&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-4 text__allign--left\" data-bind=\"css: {active: fields()[&#39;name&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;name&#39;]}\" for=\"edit-campaign-form_field_2\">\n<b>\nName of campaign:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-8\">\n<input aria-describedby=\"edit-campaign-form_field_2_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;name&#39;]\" id=\"edit-campaign-form_field_2\" placeholder=\"A good name\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;name&#39;]\" id=\"edit-campaign-form_field_2_error\"></span>\n</div>\n</div>\n<legend>Image Selection</legend>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;selection_replica&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;selection_replica&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;selection_replica&#39;]}\" for=\"edit-campaign-form_field_3\">\n<b>\nMinimum number of workers per image:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"edit-campaign-form_field_3_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;selection_replica&#39;]\" id=\"edit-campaign-form_field_3\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;selection_replica&#39;]\" id=\"edit-campaign-form_field_3_error\"></span>\n</div>\n</div>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;threshold&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;threshold&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;threshold&#39;]}\" for=\"edit-campaign-form_field_4\">\n<b>\nMinimum number of positive results:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"edit-campaign-form_field_4_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;threshold&#39;]\" id=\"edit-campaign-form_field_4\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;threshold&#39;]\" id=\"edit-campaign-form_field_4_error\"></span>\n</div>\n</div>\n<legend>Image Annotation</legend>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;annotation_replica&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;annotation_replica&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;annotation_replica&#39;]}\" for=\"edit-campaign-form_field_0\">\n<b>\nMinimum number of workers per image:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"edit-campaign-form_field_0_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;annotation_replica&#39;]\" id=\"edit-campaign-form_field_0\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;annotation_replica&#39;]\" id=\"edit-campaign-form_field_0_error\"></span>\n</div>\n</div>\n<div class=\"form-group row\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;annotation_size&#39;]}\">\n<label class=\"control-label col-lg-5 col-sm-6 text__allign--left\" data-bind=\"css: {active: fields()[&#39;annotation_size&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;annotation_size&#39;]}\" for=\"edit-campaign-form_field_1\">\n<b>\nWidth(in pixels) of the annotation line:\n</b>\n</label>\n<div class=\"col-lg-7 col-sm-6\">\n<input aria-describedby=\"edit-campaign-form_field_1_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;annotation_size&#39;]\" id=\"edit-campaign-form_field_1\" max=\"30\" min=\"1\" type=\"number\" value=\"1\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;annotation_size&#39;]\" id=\"edit-campaign-form_field_1_error\"></span>\n</div>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;campaign-edit-submit&#39;)\">\nEDIT\n</a>\n<br>\n<p class=\"margin__top--10px\">\nI want to upload images,\n<a data-bind=\"click: trigger.bind($data,&#39;image-upload-go&#39;)\">\nImages Upload\n</a>\n</p>\n<p class=\"margin__top--10px\">\nI want to select workers,\n<a data-bind=\"click: trigger.bind($data,&#39;worker-select-go&#39;)\">\nSelect Worker\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],27:[function(require,module,exports){
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

},{"./index.html":26}],28:[function(require,module,exports){
module.exports = "<span>    \n  <!-- edit-campaign-form -->    \n  <c-edit-campaign-form params=\"context: context\">\n  </c-edit-campaign-form>\n</span>";

},{}],29:[function(require,module,exports){
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

},{"./index.html":28}],30:[function(require,module,exports){
module.exports = "<span>    <a class=\"btn\" data-bind=\"click: trigger.bind($data,'login-btn-pressed')\">login-btn-pressed</a>    <a class=\"btn\" data-bind=\"click: trigger.bind($data,'register-btn-pressed')\">register-btn-pressed</a>    <a class=\"btn\" data-bind=\"click: trigger.bind($data,'logout')\">logout</a>    <a class=\"btn\" data-bind=\"click: trigger.bind($data,'account-edit-go')\">account-edit-go</a></span>";

},{}],31:[function(require,module,exports){
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

},{"./index.html":30}],32:[function(require,module,exports){
module.exports = "<h3>image-annotation-form</h3><form>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['annotation']}\">        <label for=\"image-annotation-form_field_0\" data-bind=\"css: {active: fields()['annotation']}, attr: {'data-error': errors()['annotation']}\" class=\"control-label\">annotation</label>        <input id=\"image-annotation-form_field_0\" data-bind=\"value: fields()['annotation']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"image-annotation-form_field_0_error\">        <span id=\"image-annotation-form_field_0_error\" class=\"help-block\" data-bind=\"text: errors()['annotation']\"></span>    </div></form><div class=\"row\">    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data, 'image-annotation-submit')\">image-annotation-submit</a></div>";

},{}],33:[function(require,module,exports){
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
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'image-annotation-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'annotation': this.input['annotation'],
    }
    var self = this,
        fields = {
            'annotation': ko.observable(this.input['annotation']),
        },
        errors = {
            'annotation': ko.observable(this.input['annotation-error']),
        };
    fields['annotation'].subscribe(function (value) {
        self.output['annotation'] = value;
        self.errors()['annotation'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
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

},{"./index.html":32}],34:[function(require,module,exports){
module.exports = "<span>    <!-- image-annotation-form -->    <c-image-annotation-form params=\"context: context\"></c-image-annotation-form></span>";

},{}],35:[function(require,module,exports){
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

ViewModel.prototype.id = 'image-annotation';
ViewModel.prototype.children = [
    'image-annotation-form' // image-annotation-form
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

},{"./index.html":34}],36:[function(require,module,exports){
module.exports = "<h3>image-selection-form</h3><form>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['accepted']}\">        <label for=\"image-selection-form_field_0\" data-bind=\"css: {active: fields()['accepted']}, attr: {'data-error': errors()['accepted']}\" class=\"control-label\">accepted</label>        <input id=\"image-selection-form_field_0\" data-bind=\"value: fields()['accepted']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"image-selection-form_field_0_error\">        <span id=\"image-selection-form_field_0_error\" class=\"help-block\" data-bind=\"text: errors()['accepted']\"></span>    </div></form><div class=\"row\">    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data, 'image-selection-submit')\">image-selection-submit</a></div>";

},{}],37:[function(require,module,exports){
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
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'image-selection-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'accepted': this.input['accepted'],
    }
    var self = this,
        fields = {
            'accepted': ko.observable(this.input['accepted']),
        },
        errors = {
            'accepted': ko.observable(this.input['accepted-error']),
        };
    fields['accepted'].subscribe(function (value) {
        self.output['accepted'] = value;
        self.errors()['accepted'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
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

},{"./index.html":36}],38:[function(require,module,exports){
module.exports = "<span>    <!-- image-selection-form -->    <c-image-selection-form params=\"context: context\"></c-image-selection-form></span>";

},{}],39:[function(require,module,exports){
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

},{"./index.html":38}],40:[function(require,module,exports){
module.exports = "<h3>image-upload-form</h3><form>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['image']}\">        <label for=\"image-upload-form_field_0\" data-bind=\"css: {active: fields()['image']}, attr: {'data-error': errors()['image']}\" class=\"control-label\">image</label>        <input id=\"image-upload-form_field_0\" data-bind=\"value: fields()['image']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"image-upload-form_field_0_error\">        <span id=\"image-upload-form_field_0_error\" class=\"help-block\" data-bind=\"text: errors()['image']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['name']}\">        <label for=\"image-upload-form_field_1\" data-bind=\"css: {active: fields()['name']}, attr: {'data-error': errors()['name']}\" class=\"control-label\">name</label>        <input id=\"image-upload-form_field_1\" data-bind=\"value: fields()['name']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"image-upload-form_field_1_error\">        <span id=\"image-upload-form_field_1_error\" class=\"help-block\" data-bind=\"text: errors()['name']\"></span>    </div></form><div class=\"row\">    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data, 'image-upload-submit')\">image-upload-submit</a></div>";

},{}],41:[function(require,module,exports){
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
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'image-upload-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'image': this.input['image'],
        'name': this.input['name'],
    }
    var self = this,
        fields = {
            'image': ko.observable(this.input['image']),
            'name': ko.observable(this.input['name']),
        },
        errors = {
            'image': ko.observable(this.input['image-error']),
            'name': ko.observable(this.input['name-error']),
        };
    fields['image'].subscribe(function (value) {
        self.output['image'] = value;
        self.errors()['image'](undefined);
    });
    fields['name'].subscribe(function (value) {
        self.output['name'] = value;
        self.errors()['name'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
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

},{"./index.html":40}],42:[function(require,module,exports){
module.exports = "<span>    <!-- image-upload-form -->    <c-image-upload-form params=\"context: context\"></c-image-upload-form>    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,'manager-go')\">manager-go</a></span>";

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

},{"./index.html":42}],44:[function(require,module,exports){
(function (global){
/*jslint browser: true */
/*globals ko, $ */
var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);
var linefun = (function () {
    "use strict";

    ko.bindingHandlers.LineDrawSetSize = {
        update: function (element, valueAccessor) {
            var value = valueAccessor()();
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
        }
    };

    ko.bindingHandlers.LineDrawPen = {
        update: function (element, valueAccessor) {
            var value = valueAccessor(),
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

},{}],45:[function(require,module,exports){
module.exports = "<h3>list-available-annotator</h3><table class=\"table table-hover table-condensed\">    <thead>        <tr>            <th>#</th>            <th>fullname</th>            <th>id</th>        </tr>    </thead>    <tbody data-bind=\"foreach: items\">        <tr data-bind=\"click: $parent.select\">            <td data-bind=\"text: id\"></td>            <td data-bind=\"text: $data['fullname']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['id']\" style=\"white-space: pre-wrap\"></td>        </tr>        </tbody></table>";

},{}],46:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['workers'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
        self.trigger.call(this, 'annotator-submit-to-campaign');
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'list-available-annotator';

ViewModel.prototype.fields = {
    id: 1
    ,'fullname': 1
    ,'id': 1
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
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-list-available-annotator', {
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

},{"./index.html":45}],47:[function(require,module,exports){
module.exports = "<h3>list-available-workers</h3><table class=\"table table-hover table-condensed\">    <thead>        <tr>            <th>#</th>            <th>fullname</th>            <th>id</th>        </tr>    </thead>    <tbody data-bind=\"foreach: items\">        <tr data-bind=\"click: $parent.select\">            <td data-bind=\"text: id\"></td>            <td data-bind=\"text: $data['fullname']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['id']\" style=\"white-space: pre-wrap\"></td>        </tr>        </tbody></table>";

},{}],48:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['workers'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
        self.trigger.call(this, 'worker-submit-to-campaign');
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'list-available-workers';

ViewModel.prototype.fields = {
    id: 1
    ,'fullname': 1
    ,'id': 1
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
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-list-available-workers', {
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

},{"./index.html":47}],49:[function(require,module,exports){
module.exports = "<h3>Campaign</h3>\n<div class=\"well\">\n<table class=\"table table-hover table-striped\">\n<thead>\n<tr>\n<th>#</th>\n<th>Name</th>\n<th>Status</th>\n<th class=\"text-right\">Actions</th>\n<th></th>\n</tr>\n</thead>\n<tbody data-bind=\"foreach: { data: items, as: &#39;item&#39; }\">\n<tr>\n<td class=\"vertical__middle\" data-bind=\"text: ($index()+1)\"></td>\n<td class=\"text-capitalize vertical__middle\" data-bind=\"text: $data[&#39;name&#39;]\" style=\"white-space: pre-wrap\"></td>\n<td class=\"text-capitalize vertical__middle\" data-bind=\"text: $data[&#39;status&#39;]\" style=\"white-space: pre-wrap\"></td>\n<td class=\"text-right\">\n<a class=\"btn btn-info\" data-bind=\"click: $parent.trigger.bind(item,&#39;campaign-show&#39;)\" data-original-title=\"Show\" data-placement=\"top\" data-toggle=\"tooltip\" title>\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-zoom-in\"></span>\n</a>\n<span data-bind=\"if: item.status === &#39;ready&#39;\">\n<a class=\"btn btn-warning\" data-bind=\"click: $parent.trigger.bind(item,&#39;campaign-edit-go&#39;)\" data-original-title=\"Edit\" data-placement=\"top\" data-toggle=\"tooltip\" title>\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-edit\"></span>\n</a>\n</span>\n<span data-bind=\"if: item.status === &#39;ready&#39;\">\n<a class=\"btn btn-success\" data-bind=\"click: $parent.trigger.bind(item,&#39;campaign-edit-go&#39;)\" data-original-title=\"Edit\" data-placement=\"top\" data-toggle=\"tooltip\" title>\nPUBLISH\n</a>\n</span>\n<span data-bind=\"if: item.status === &#39;started&#39;\">\n<a class=\"btn btn-success\" data-bind=\"click: $parent.trigger.bind(item,&#39;campaign-edit-go&#39;)\" data-original-title=\"Edit\" data-placement=\"top\" data-toggle=\"tooltip\" title>\nTERMINATE\n</a>\n</span>\n</td>\n</tr>\n</tbody>\n</table>\n</div>";

},{}],50:[function(require,module,exports){
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
}

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
        self.items(myobj.campaigns);
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

},{"./index.html":49}],51:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">Log In</legend>\n<form>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;others&#39;]}\">\n<h5 class=\"help-block text-center\" data-bind=\"text: errors()[&#39;others&#39;]\" id=\"login-form_field_error\"></h5>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;username&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;username&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;username&#39;]}\" for=\"login-form_field_1\">Username</label>\n<input aria-describedby=\"login-form_field_1_error\" class=\"form-control validate\" data-bind=\"textInput: fields()[&#39;username&#39;]\" id=\"login-form_field_1\" placeholder=\"Username\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;username&#39;]\" id=\"login-form_field_1_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;password&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;password&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;password&#39;]}\" for=\"login-form_field_0\">Password</label>\n<input aria-describedby=\"login-form_field_0_error\" class=\"form-control validate\" data-bind=\"textInput: fields()[&#39;password&#39;]\" id=\"login-form_field_0\" placeholder=\"Password\" type=\"password\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;password&#39;]\" id=\"login-form_field_0_error\"></span>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;login-submit&#39;)\">\nLOG IN\n</a>\n<br>\n<p class=\"margin__top--10px\">\nI don’t have an account,\n<a data-bind=\"click: trigger.bind($data,&#39;register-go&#39;)\">\nRegister\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],52:[function(require,module,exports){
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

},{"./index.html":51}],53:[function(require,module,exports){
module.exports = "<span>\n    <!-- login-Fom -->\n    <c-login-form params=\"context: context\"></c-login-form>\n</span>";

},{}],54:[function(require,module,exports){
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

},{"./index.html":53}],55:[function(require,module,exports){
module.exports = "<span>\n<a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,&#39;campaign-create&#39;)\">Create a Campaign</a>\n<a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,&#39;campaign-edit-go&#39;)\">campaign-edit-go</a>\n<a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,&#39;campaign-change-state&#39;)\">campaign-change-state</a>\n<c-list-campaign params=\"context: context\"></c-list-campaign>\n</span>";

},{}],56:[function(require,module,exports){
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

},{"./index.html":55}],57:[function(require,module,exports){
module.exports = "<span>\n<div class=\"well col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n<fieldset>\n<legend class=\"text-center\">Register</legend>\n<form>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;fullname&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;fullname&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;fullname&#39;]}\" for=\"register-form_field_1\">Fullname</label>\n<input aria-describedby=\"register-form_field_1_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;fullname&#39;]\" id=\"register-form_field_1\" require=\"true\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;fullname&#39;]\" id=\"register-form_field_1_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;username&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;username&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;username&#39;]}\" for=\"register-form_field_3\">Username</label>\n<input aria-describedby=\"register-form_field_3_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;username&#39;]\" id=\"register-form_field_3\" require=\"true\" type=\"text\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;username&#39;]\" id=\"register-form_field_3_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;account-type&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;account-type&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;account-type&#39;]}\" for=\"register-form_field_0\">Select account type</label>\n<select aria-describedby=\"register-form_field_0_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;account-type&#39;]\" id=\"register-form_field_0\" require=\"true\">\n<option value=\"master\">Master</option>\n<option value=\"worker\">Worker</option>\n</select>\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;account-type&#39;]\" id=\"register-form_field_0_error\"></span>\n</div>\n<div class=\"form-group\" data-bind=\"css: {&#39;has-error&#39;: errors()[&#39;password&#39;]}\">\n<label class=\"control-label\" data-bind=\"css: {active: fields()[&#39;password&#39;]}, attr: {&#39;data-error&#39;: errors()[&#39;password&#39;]}\" for=\"register-form_field_2\">Password</label>\n<input aria-describedby=\"register-form_field_2_error\" class=\"form-control validate\" data-bind=\"value: fields()[&#39;password&#39;]\" id=\"register-form_field_2\" require=\"true\" type=\"password\">\n<span class=\"help-block\" data-bind=\"text: errors()[&#39;password&#39;]\" id=\"register-form_field_2_error\"></span>\n</div>\n</form>\n<div class=\"row\">\n<div class=\"text-center margin__top--20px\">\n<a class=\"btn btn-primary\" data-bind=\"click: trigger.bind($data, &#39;register-submit&#39;)\">\nREGISTER\n</a>\n<br>\n<p class=\"margin__top--10px\">\nAlready have an account,\n<a data-bind=\"click: trigger.bind($data,&#39;login-go&#39;)\">\nLog In\n</a>\n</p>\n<hr class=\"separator margin__center\">\n</div>\n</div>\n</fieldset>\n</div>\n</span>";

},{}],58:[function(require,module,exports){
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

ViewModel.prototype.id = 'register-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.fill = function (errors_sent,fields_sent) {
    if (!$.isEmptyObject(fields_sent)){
        this.fields()['account-type'](fields_sent.type);
        this.fields()['fullname'](fields_sent.fullname);
        this.fields()['password'](fields_sent.password);
        this.fields()['username'](fields_sent.username);
    }
    this.errors()['account-type'](errors_sent.type);
    this.errors()['fullname'](errors_sent.fullname);
    this.errors()['password'](errors_sent.password);
    this.errors()['username'](errors_sent.username);
};

ViewModel.prototype._compute = function () {
    this.output = {
        'account-type': this.input['account-type'],
        'fullname': this.input['fullname'],
        'password': this.input['password'],
        'username': this.input['username'],
    };
    var self = this,
        fields = {
            'account-type': ko.observable(this.input['account-type']),
            'fullname': ko.observable(this.input['fullname']),
            'password': ko.observable(this.input['password']),
            'username': ko.observable(this.input['username']),
        },
        errors = {
            'account-type': ko.observable(this.input['account-type-error']),
            'fullname': ko.observable(this.input['fullname-error']),
            'password': ko.observable(this.input['password-error']),
            'username': ko.observable(this.input['username-error']),
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

},{"./index.html":57}],59:[function(require,module,exports){
module.exports = "<span>\n    <!-- register-form -->\n    <c-register-form params=\"context: context\"></c-register-form>\n</span>";

},{}],60:[function(require,module,exports){
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

},{"./index.html":59}],61:[function(require,module,exports){
module.exports = "<h3>selector-list</h3><table class=\"table table-hover table-condensed\">    <thead>        <tr>            <th>#</th>        </tr>    </thead>    <tbody data-bind=\"foreach: items\">        <tr data-bind=\"click: $parent.select\">            <td data-bind=\"text: id\"></td>        </tr>        </tbody></table>";

},{}],62:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['workers'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'selector-list';

ViewModel.prototype.fields = {
    id: 1
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
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-selector-list', {
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

},{"./index.html":61}],63:[function(require,module,exports){
module.exports = "<span></span>";

},{}],64:[function(require,module,exports){
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

},{"./index.html":63}],65:[function(require,module,exports){
module.exports = "<span>    <!-- campaign-worker-list -->    <c-campaign-worker-list params=\"context: context\"></c-campaign-worker-list></span>";

},{}],66:[function(require,module,exports){
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
    'campaign-worker-list' // campaign-worker-list
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

},{"./index.html":65}],67:[function(require,module,exports){
module.exports = "<span>    <!-- list-available-workers -->    <c-list-available-workers params=\"context: context\"></c-list-available-workers>    <!-- list-available-annotator -->    <c-list-available-annotator params=\"context: context\"></c-list-available-annotator>    <!-- selector-list -->    <c-selector-list params=\"context: context\"></c-selector-list>    <!-- annotator-list -->    <c-annotator-list params=\"context: context\"></c-annotator-list>    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,'manager-go')\">manager-go</a></span>";

},{}],68:[function(require,module,exports){
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
    'list-available-workers' // list-available-workers
    ,'list-available-annotator' // list-available-annotator
    ,'selector-list' // selector-list
    ,'annotator-list' // annotator-list
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

},{"./index.html":67}],69:[function(require,module,exports){
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
    require('./c-campaign-worker-list').register();
    require('./c-list-available-workers').register();
    require('./c-list-available-annotator').register();
    require('./c-selector-list').register();
    require('./c-annotator-list').register();
    require('./c-line-drawer').register();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./c-account-edit-form":15,"./c-account-edit-view":17,"./c-annotator-list":19,"./c-campaign-worker-list":21,"./c-create-campaign-form":23,"./c-create-campaign-view":25,"./c-edit-campaign-form":27,"./c-edit-campaign-view":29,"./c-home-bar":31,"./c-image-annotation":35,"./c-image-annotation-form":33,"./c-image-selection":39,"./c-image-selection-form":37,"./c-image-upload-form":41,"./c-image-upload-view":43,"./c-line-drawer":44,"./c-list-available-annotator":46,"./c-list-available-workers":48,"./c-list-campaign":50,"./c-login-form":52,"./c-login-view":54,"./c-manager-view":56,"./c-register-form":58,"./c-register-view":60,"./c-selector-list":62,"./c-show-campaign":64,"./c-task-view":66,"./c-worker-select-view":68,"./main-application":71}],70:[function(require,module,exports){
module.exports = "<nav class=\"navbar navbar-default\">\n<div class=\"container-fluid\">\n<div class=\"navbar-header\">\n<button aria-expanded=\"false\" class=\"navbar-toggle collapsed\" data-target=\"#landmark-menu\" data-toggle=\"collapse\" type=\"button\">\n<span class=\"sr-only\">Toggle navigation</span>\n<span class=\"icon-bar\"></span>\n<span class=\"icon-bar\"></span>\n<span class=\"icon-bar\"></span>\n</button>\n<a class=\"navbar-brand cursor--pointer\" data-bind=\"click: trigger.bind($data,&#39;home&#39;)\">\n<img alt=\"Logo\" class=\"img__width__1c5em pull-left\" src=\"/remofiorentino/awt-project/www/images/logo.png\">\n<span class=\"vertical__middle\">\nMountain\n<b class=\"text__color--green\">\nFlag\n</b>\n</span>\n</a>\n</div>\n<div class=\"collapse navbar-collapse\" id=\"landmark-menu\">\n<ul class=\"nav navbar-nav navbar-right\" data-bind=\"if: logged() === false\">\n<li>\n<a data-bind=\"click: trigger.bind($data,&#39;login-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-log-in\"></span>\nLogin\n</a>\n</li>\n<li>\n<a data-bind=\"click: trigger.bind($data,&#39;register-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-inbox\"></span>\nRegister\n</a>\n</li>\n</ul>\n<ul class=\"nav navbar-nav navbar-right\" data-bind=\"if: logged() === true\">\n<li>\n<a>\n<b>\nDear\n<span data-bind=\"text: user_name()\"></span>\n</b>\n</a>\n</li>\n<li data-bind=\"if: manager()\">\n<a data-bind=\"click: trigger.bind($data,&#39;manager-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-picture\"></span>\nManager\n</a>\n</li>\n<li data-bind=\"if: !manager()\">\n<a data-bind=\"click: trigger.bind($data,&#39;task-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-log-out\"></span>\ntask\n</a>\n</li>\n<li>\n<a data-bind=\"click: trigger.bind($data,&#39;logout&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-log-out\"></span>\nLogout\n</a>\n</li>\n<li>\n<a data-bind=\"click: trigger.bind($data,&#39;account-edit-go&#39;)\">\n<span aria-hidden=\"true\" class=\"glyphicon glyphicon-user\"></span>\nEdit Account\n</a>\n</li>\n</ul>\n</div>\n</div>\n</nav>\n<!-- / %line-drawer{:params => \"context:context,src: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg', pen: 10, line: line\"} -->\n<div class=\"container\">\n<div class=\"row\">\n<span data-bind=\"if: active() === &#39;account-edit-view&#39;\">\n<c-account-edit-view class=\"container\" params=\"context: context\"></c-account-edit-view>\n</span>\n<span data-bind=\"if: active() === &#39;create-campaign-view&#39;\">\n<c-create-campaign-view class=\"container\" params=\"context: context\"></c-create-campaign-view>\n</span>\n<span data-bind=\"if: active() === &#39;edit-campaign-view&#39;\">\n<c-edit-campaign-view class=\"container\" params=\"context: context\"></c-edit-campaign-view>\n</span>\n<span data-bind=\"if: active() === &#39;home-bar&#39;\">\n<c-home-bar class=\"container\" params=\"context: context\"></c-home-bar>\n</span>\n<span data-bind=\"if: active() === &#39;image-annotation&#39;\">\n<c-image-annotation class=\"container\" params=\"context: context\"></c-image-annotation>\n</span>\n<span data-bind=\"if: active() === &#39;image-selection&#39;\">\n<c-image-selection class=\"container\" params=\"context: context\"></c-image-selection>\n</span>\n<span data-bind=\"if: active() === &#39;image-upload-view&#39;\">\n<c-image-upload-view class=\"container\" params=\"context: context\"></c-image-upload-view>\n</span>\n<!-- /login-form -->\n<span data-bind=\"if: active() === &#39;login-view&#39;\">\n<c-login-view class=\"container\" params=\"context: context\"></c-login-view>\n</span>\n<span data-bind=\"if: active() === &#39;logout-view&#39;\">\n<c-logout-view class=\"container\" params=\"context: context\"></c-logout-view>\n</span>\n<span data-bind=\"if: active() === &#39;manager-view&#39;\">\n<c-manager-view class=\"container\" params=\"context: context\"></c-manager-view>\n</span>\n<!-- /register-form -->\n<span data-bind=\"if: active() === &#39;register-view&#39;\">\n<c-register-view class=\"container\" params=\"context: context\"></c-register-view>\n</span>\n<span data-bind=\"if: active() === &#39;show-campaign&#39;\">\n<c-show-campaign class=\"container\" params=\"context: context\"></c-show-campaign>\n</span>\n<span data-bind=\"if: active() === &#39;task-view&#39;\">\n<c-task-view class=\"container\" params=\"context: context\"></c-task-view>\n</span>\n<span data-bind=\"if: active() === &#39;worker-select-view&#39;\">\n<c-worker-select-view class=\"container\" params=\"context: context\"></c-worker-select-view>\n</span>\n</div>\n</div>";

},{}],71:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

exports.register = function () {
    ko.components.register('main-application', {
        viewModel: function(params, componentInfo) {
            var self = this,
                defaultChild = 'home-bar, line-drawer';
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

},{"./index.html":70}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['show-campaign']) {
            context.top.active('show-campaign');
        }
        context.vms['show-campaign'].init();
    };
};

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['image-annotation']) {
            context.top.active('image-annotation');
        }
        context.vms['image-annotation'].init();
    };
};

},{}],86:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'annotation' : data['annotation']
        };
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

},{}],87:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['image-selection']) {
            context.top.active('image-selection');
        }
        context.vms['image-selection'].init();
    };
};

},{}],88:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'accepted' : data['accepted']
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

},{}],89:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['image-upload-view']) {
            context.top.active('image-upload-view');
            context.vms['image-upload-view'].init({mask: 'image-upload-form'});
        }
        context.vms['image-upload-form'].init();
    };
};

},{}],90:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['image-upload-view']) {
            context.top.active('image-upload-view');
        }
        context.vms['image-upload-view'].init();
    };
};

},{}],91:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'image' : data['image']
            ,'name' : data['name']
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

},{}],92:[function(require,module,exports){
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
        ,'worker-submit-to-campaign': require('./worker-submit-to-campaign').createEvent(options)
        ,'annotator-submit-to-campaign': require('./annotator-submit-to-campaign').createEvent(options)
        ,'login-failure': require('./login-failure').createEvent(options)
        ,'register-failure': require('./register-failure').createEvent(options)
        ,'home': require('./home').createEvent(options)
    };
};

},{"./account-edit-failure":72,"./account-edit-go":73,"./account-edit-submit":74,"./annotator-submit-to-campaign":75,"./campaign-change-state":76,"./campaign-create":79,"./campaign-create-failure":77,"./campaign-create-submit":78,"./campaign-edit-failure":80,"./campaign-edit-go":81,"./campaign-edit-submit":82,"./campaign-show":83,"./home":84,"./image-annotation-go":85,"./image-annotation-submit":86,"./image-selection-go":87,"./image-selection-submit":88,"./image-upload-failure":89,"./image-upload-go":90,"./image-upload-submit":91,"./login-failure":93,"./login-go":94,"./login-submit":95,"./logout":96,"./manager-go":97,"./on-account-edit-success":98,"./register-failure":99,"./register-go":100,"./register-submit":101,"./task-go":102,"./worker-select-go":103,"./worker-submit-to-campaign":104}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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


},{}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['task-view']) {
            context.top.active('task-view');
        }
        context.vms['task-view'].init();
    };
};

},{}],103:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['worker-select-view']) {
            context.top.active('worker-select-view');
        }
        context.vms['worker-select-view'].init();
    };
};

},{}],104:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        var promise = context.actions['send-workers-to-campaign']({filters: packet});
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

},{}],105:[function(require,module,exports){
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

},{"./actions":2,"./controls":69,"./events":92,"./repositories":107}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}
    repositories['campaign'] = require('./campaign').createRepository(options);
    repositories['tasks'] = require('./tasks').createRepository(options);
    repositories['workers'] = require('./workers').createRepository(options);
    repositories['current_user'] = {};
    return repositories;
};

},{"./campaign":106,"./tasks":108,"./workers":109}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{}]},{},[105])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWN0aW9ucy9jaGFuZ2UtY2FtcGFpZ24tc3RhdGUuanMiLCJzcmMvanMvYWN0aW9ucy9pbmRleC5qcyIsInNyYy9qcy9hY3Rpb25zL3NlbmQtYWNjb3VudC1lZGl0LWRhdGEuanMiLCJzcmMvanMvYWN0aW9ucy9zZW5kLWFubm90YXRvci10by1jYW1wYWlnbi5qcyIsInNyYy9qcy9hY3Rpb25zL3NlbmQtY3JlYXRlLWNhbXBhaWduLWRhdGEuanMiLCJzcmMvanMvYWN0aW9ucy9zZW5kLWVkaXQtY2FtcGFpZ24uanMiLCJzcmMvanMvYWN0aW9ucy9zZW5kLWltYWdlLXNlbGVjdGlvbi5qcyIsInNyYy9qcy9hY3Rpb25zL3NlbmQtaW1hZ2UtdXBsb2FkLWRhdGEuanMiLCJzcmMvanMvYWN0aW9ucy9zZW5kLWltYWdlcy1hbm5vdGF0aW9uLmpzIiwic3JjL2pzL2FjdGlvbnMvc2VuZC1sb2dpbi1kYXRhLmpzIiwic3JjL2pzL2FjdGlvbnMvc2VuZC1sb2dvdXQtZGF0YS5qcyIsInNyYy9qcy9hY3Rpb25zL3NlbmQtcmVnaXN0cmF0aW9uLWRhdGEuanMiLCJzcmMvanMvYWN0aW9ucy9zZW5kLXdvcmtlcnMtdG8tY2FtcGFpZ24uanMiLCJzcmMvanMvY29udHJvbHMvYy1hY2NvdW50LWVkaXQtZm9ybS9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtYWNjb3VudC1lZGl0LWZvcm0vaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1hY2NvdW50LWVkaXQtdmlldy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtYWNjb3VudC1lZGl0LXZpZXcvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1hbm5vdGF0b3ItbGlzdC9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtYW5ub3RhdG9yLWxpc3QvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1jYW1wYWlnbi13b3JrZXItbGlzdC9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtY2FtcGFpZ24td29ya2VyLWxpc3QvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1jcmVhdGUtY2FtcGFpZ24tZm9ybS9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtY3JlYXRlLWNhbXBhaWduLWZvcm0vaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1jcmVhdGUtY2FtcGFpZ24tdmlldy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtY3JlYXRlLWNhbXBhaWduLXZpZXcvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1lZGl0LWNhbXBhaWduLWZvcm0vaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWVkaXQtY2FtcGFpZ24tZm9ybS9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLWVkaXQtY2FtcGFpZ24tdmlldy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtZWRpdC1jYW1wYWlnbi12aWV3L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtaG9tZS1iYXIvaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWhvbWUtYmFyL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2UtYW5ub3RhdGlvbi1mb3JtL2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1pbWFnZS1hbm5vdGF0aW9uLWZvcm0vaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1pbWFnZS1hbm5vdGF0aW9uL2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1pbWFnZS1hbm5vdGF0aW9uL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2Utc2VsZWN0aW9uLWZvcm0vaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWltYWdlLXNlbGVjdGlvbi1mb3JtL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2Utc2VsZWN0aW9uL2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1pbWFnZS1zZWxlY3Rpb24vaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1pbWFnZS11cGxvYWQtZm9ybS9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2UtdXBsb2FkLWZvcm0vaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1pbWFnZS11cGxvYWQtdmlldy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtaW1hZ2UtdXBsb2FkLXZpZXcvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1saW5lLWRyYXdlci9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLWxpc3QtYXZhaWxhYmxlLWFubm90YXRvci9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtbGlzdC1hdmFpbGFibGUtYW5ub3RhdG9yL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtbGlzdC1hdmFpbGFibGUtd29ya2Vycy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtbGlzdC1hdmFpbGFibGUtd29ya2Vycy9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLWxpc3QtY2FtcGFpZ24vaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLWxpc3QtY2FtcGFpZ24vaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1sb2dpbi1mb3JtL2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1sb2dpbi1mb3JtL2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtbG9naW4tdmlldy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtbG9naW4tdmlldy9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLW1hbmFnZXItdmlldy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtbWFuYWdlci12aWV3L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2MtcmVnaXN0ZXItZm9ybS9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtcmVnaXN0ZXItZm9ybS9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLXJlZ2lzdGVyLXZpZXcvaW5kZXguaHRtbCIsInNyYy9qcy9jb250cm9scy9jLXJlZ2lzdGVyLXZpZXcvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvYy1zZWxlY3Rvci1saXN0L2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy1zZWxlY3Rvci1saXN0L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2Mtc2hvdy1jYW1wYWlnbi9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2Mtc2hvdy1jYW1wYWlnbi9pbmRleC5qcyIsInNyYy9qcy9jb250cm9scy9jLXRhc2stdmlldy9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL2MtdGFzay12aWV3L2luZGV4LmpzIiwic3JjL2pzL2NvbnRyb2xzL2Mtd29ya2VyLXNlbGVjdC12aWV3L2luZGV4Lmh0bWwiLCJzcmMvanMvY29udHJvbHMvYy13b3JrZXItc2VsZWN0LXZpZXcvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvaW5kZXguanMiLCJzcmMvanMvY29udHJvbHMvbWFpbi1hcHBsaWNhdGlvbi9pbmRleC5odG1sIiwic3JjL2pzL2NvbnRyb2xzL21haW4tYXBwbGljYXRpb24vaW5kZXguanMiLCJzcmMvanMvZXZlbnRzL2FjY291bnQtZWRpdC1mYWlsdXJlLmpzIiwic3JjL2pzL2V2ZW50cy9hY2NvdW50LWVkaXQtZ28uanMiLCJzcmMvanMvZXZlbnRzL2FjY291bnQtZWRpdC1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL2Fubm90YXRvci1zdWJtaXQtdG8tY2FtcGFpZ24uanMiLCJzcmMvanMvZXZlbnRzL2NhbXBhaWduLWNoYW5nZS1zdGF0ZS5qcyIsInNyYy9qcy9ldmVudHMvY2FtcGFpZ24tY3JlYXRlLWZhaWx1cmUuanMiLCJzcmMvanMvZXZlbnRzL2NhbXBhaWduLWNyZWF0ZS1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL2NhbXBhaWduLWNyZWF0ZS5qcyIsInNyYy9qcy9ldmVudHMvY2FtcGFpZ24tZWRpdC1mYWlsdXJlLmpzIiwic3JjL2pzL2V2ZW50cy9jYW1wYWlnbi1lZGl0LWdvLmpzIiwic3JjL2pzL2V2ZW50cy9jYW1wYWlnbi1lZGl0LXN1Ym1pdC5qcyIsInNyYy9qcy9ldmVudHMvY2FtcGFpZ24tc2hvdy5qcyIsInNyYy9qcy9ldmVudHMvaG9tZS5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2UtYW5ub3RhdGlvbi1nby5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2UtYW5ub3RhdGlvbi1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL2ltYWdlLXNlbGVjdGlvbi1nby5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2Utc2VsZWN0aW9uLXN1Ym1pdC5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2UtdXBsb2FkLWZhaWx1cmUuanMiLCJzcmMvanMvZXZlbnRzL2ltYWdlLXVwbG9hZC1nby5qcyIsInNyYy9qcy9ldmVudHMvaW1hZ2UtdXBsb2FkLXN1Ym1pdC5qcyIsInNyYy9qcy9ldmVudHMvaW5kZXguanMiLCJzcmMvanMvZXZlbnRzL2xvZ2luLWZhaWx1cmUuanMiLCJzcmMvanMvZXZlbnRzL2xvZ2luLWdvLmpzIiwic3JjL2pzL2V2ZW50cy9sb2dpbi1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL2xvZ291dC5qcyIsInNyYy9qcy9ldmVudHMvbWFuYWdlci1nby5qcyIsInNyYy9qcy9ldmVudHMvb24tYWNjb3VudC1lZGl0LXN1Y2Nlc3MuanMiLCJzcmMvanMvZXZlbnRzL3JlZ2lzdGVyLWZhaWx1cmUuanMiLCJzcmMvanMvZXZlbnRzL3JlZ2lzdGVyLWdvLmpzIiwic3JjL2pzL2V2ZW50cy9yZWdpc3Rlci1zdWJtaXQuanMiLCJzcmMvanMvZXZlbnRzL3Rhc2stZ28uanMiLCJzcmMvanMvZXZlbnRzL3dvcmtlci1zZWxlY3QtZ28uanMiLCJzcmMvanMvZXZlbnRzL3dvcmtlci1zdWJtaXQtdG8tY2FtcGFpZ24uanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvcmVwb3NpdG9yaWVzL2NhbXBhaWduL2luZGV4LmpzIiwic3JjL2pzL3JlcG9zaXRvcmllcy9pbmRleC5qcyIsInNyYy9qcy9yZXBvc2l0b3JpZXMvdGFza3MvaW5kZXguanMiLCJzcmMvanMvcmVwb3NpdG9yaWVzL3dvcmtlcnMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDekNBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9GQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkZBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4RkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5SEE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbERBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvSEE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbERBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaERBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdFQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0VBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3BGQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkdBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RGQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0RkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1R0E7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbEdBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsSEE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbERBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25GQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakRBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcENBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gQWN0aW9uKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICAvLyBUT0RPOiBHbG9iYWwgSW5pdGlhbGl6YXRpb25cbiAgICAvKlxuICAgIGV4YW1wbGU6XG4gICAgdGhpcy5jb2xsZWN0aW9uID0gb3B0aW9ucy5yZXBvc2l0b3JpZXMubWFpbDtcbiAgICAqL1xufVxuQWN0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocGFyYW1ldGVycywgc29sdmUpIHsgLy8gYWRkIFwib25DYW5jZWxcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFBhcmFtZXRlcnM6XG4gICAgLy8gcGFyYW1ldGVyc1snZXhlY3V0aW9uJ11cblxuICAgIC8vIFRPRE86IEV4ZWN1dGlvblxuICAgIC8qXG4gICAgZXhhbXBsZTpcbiAgICBtYWlsLmZpbmQoe3N1YmplY3Q6ICdSZTogJyArIGRhdGEuc3ViamVjdH0pXG4gICAgICAgIC50aGVuKHNvbHZlKTtcbiAgICAqL1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEJFR0lOKVxuICAgICQubm90aWZ5KHttZXNzYWdlOiAnY2hhbmdlLWNhbXBhaWduLXN0YXRlJ30sIHthbGxvd19kaXNtaXNzOiB0cnVlLCB0eXBlOiAnc3VjY2Vzcyd9KTtcbiAgICBzb2x2ZSh7XG4gICAgICAgIGV2ZW50OiAnbWFuYWdlci1nbycsIC8vIG1hbmFnZXItZ29cbiAgICAgICAgZGF0YToge1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gVEhJUyBDQU4gQkUgUkVNT1ZFRCAoRU5EKVxufTtcblxuZXhwb3J0cy5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBhY3Rpb24gPSBuZXcgQWN0aW9uKG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHNvbHZlLCByZWplY3QsIG9uQ2FuY2VsKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IChkYXRhICYmIGRhdGEuZmlsdGVycykgfHwge307XG4gICAgICAgICAgICBhY3Rpb24ucnVuKHBhcmFtZXRlcnMsIHNvbHZlLCBvbkNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHJldHVybiB7XG4gICAgICAgICdjaGFuZ2UtY2FtcGFpZ24tc3RhdGUnOiByZXF1aXJlKCcuL2NoYW5nZS1jYW1wYWlnbi1zdGF0ZScpLmNyZWF0ZUFjdGlvbihvcHRpb25zKVxuICAgICAgICAsJ3NlbmQtYWNjb3VudC1lZGl0LWRhdGEnOiByZXF1aXJlKCcuL3NlbmQtYWNjb3VudC1lZGl0LWRhdGEnKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICAgICAgLCdzZW5kLWNyZWF0ZS1jYW1wYWlnbi1kYXRhJzogcmVxdWlyZSgnLi9zZW5kLWNyZWF0ZS1jYW1wYWlnbi1kYXRhJykuY3JlYXRlQWN0aW9uKG9wdGlvbnMpXG4gICAgICAgICwnc2VuZC1lZGl0LWNhbXBhaWduJzogcmVxdWlyZSgnLi9zZW5kLWVkaXQtY2FtcGFpZ24nKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICAgICAgLCdzZW5kLWltYWdlLXNlbGVjdGlvbic6IHJlcXVpcmUoJy4vc2VuZC1pbWFnZS1zZWxlY3Rpb24nKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICAgICAgLCdzZW5kLWltYWdlLXVwbG9hZC1kYXRhJzogcmVxdWlyZSgnLi9zZW5kLWltYWdlLXVwbG9hZC1kYXRhJykuY3JlYXRlQWN0aW9uKG9wdGlvbnMpXG4gICAgICAgICwnc2VuZC1pbWFnZXMtYW5ub3RhdGlvbic6IHJlcXVpcmUoJy4vc2VuZC1pbWFnZXMtYW5ub3RhdGlvbicpLmNyZWF0ZUFjdGlvbihvcHRpb25zKVxuICAgICAgICAsJ3NlbmQtbG9nb3V0LWRhdGEnOiByZXF1aXJlKCcuL3NlbmQtbG9nb3V0LWRhdGEnKS5jcmVhdGVBY3Rpb24ob3B0aW9ucylcbiAgICAgICAgLCdzZW5kLXdvcmtlcnMtdG8tY2FtcGFpZ24nOiByZXF1aXJlKCcuL3NlbmQtd29ya2Vycy10by1jYW1wYWlnbicpLmNyZWF0ZUFjdGlvbihvcHRpb25zKVxuICAgICAgICAsJ3NlbmQtYW5ub3RhdG9yLXRvLWNhbXBhaWduJzogcmVxdWlyZSgnLi9zZW5kLWFubm90YXRvci10by1jYW1wYWlnbicpLmNyZWF0ZUFjdGlvbihvcHRpb25zKVxuICAgICAgICAsJ3NlbmQtbG9naW4tZGF0YSc6IHJlcXVpcmUoJy4vc2VuZC1sb2dpbi1kYXRhJykuY3JlYXRlQWN0aW9uKG9wdGlvbnMpXG4gICAgICAgICwnc2VuZC1yZWdpc3RyYXRpb24tZGF0YSc6IHJlcXVpcmUoJy4vc2VuZC1yZWdpc3RyYXRpb24tZGF0YScpLmNyZWF0ZUFjdGlvbihvcHRpb25zKVxuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xuXG52YXIgb3B0aW9uO1xuXG5mdW5jdGlvbiBBY3Rpb24ob3B0aW9ucykgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICAvLyBUT0RPOiBHbG9iYWwgSW5pdGlhbGl6YXRpb25cbiAgICBvcHRpb24gPSBvcHRpb25zLnJlcG9zaXRvcmllcztcbn1cbkFjdGlvbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMsIHNvbHZlKSB7IC8vIGFkZCBcIm9uQ2FuY2VsXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICBQYXJhbWV0ZXJzOlxuICAgIHBhcmFtZXRlcnNbJ2Z1bGxuYW1lJ11cbiAgICBwYXJhbWV0ZXJzWydwYXNzd29yZCddXG4gICAgdmFyIGRhdGEgPSB7fTtcbiAgICB2YXIgZGF0b3MgPSB7XG4gICAgICAgIFwiZnVsbG5hbWVcIjogcGFyYW1ldGVyc1snZnVsbG5hbWUnXSxcbiAgICAgICAgXCJwYXNzd29yZFwiOiBwYXJhbWV0ZXJzWydwYXNzd29yZCddLFxuICAgIH07XG4gICAgJC5hamF4KHtcbiAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmcvYXBpL3VzZXIvbWVcIixcbiAgICB0eXBlOiBcIlBVVFwiLFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiK29wdGlvbi5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgIH0sXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0b3MpLFxuICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgIG9wdGlvbi5jdXJyZW50X3VzZXIuZnVsbG5hbWUgPSBkYXRvcy5mdWxsbmFtZVxuICAgICAgICBpZihvcHRpb24uY3VycmVudF91c2VyLnR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJNQVNURVJcIil7XG4gICAgICAgICAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogJ21hbmFnZXItZ28nLCAvLyBtYW5hZ2VyLWdvXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICd0YXNrLWdvJywgLy8gdGFzay1nb1xuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlcnJvcjogIGZ1bmN0aW9uKHhocikge1xuICAgICAgICAvL2RhdGEgPSAgeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgdmFyIG15b2JqID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgZGF0YSA9e1xuICAgICAgICAgICAgZmllbGRzOntcbiAgICAgICAgICAgICAgICBcImZ1bGxuYW1lXCI6IHBhcmFtZXRlcnNbJ2Z1bGxuYW1lJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JzOntcbiAgICAgICAgICAgICAgICAncGFzc3dvcmQnOiBteW9iai5lcnJvci5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAnZnVsbG5hbWUnOiBteW9iai5lcnJvci5mdWxsbmFtZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YobXlvYmouZXJyb3IpID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICBkYXRhLmVycm9yc1snb3RoZXJzJ10gPSBteW9iai5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ2FjY291bnQtZWRpdC1mYWlsdXJlJywgXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH19KTtcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIEFjdGlvbigpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgLy8gVE9ETzogR2xvYmFsIEluaXRpYWxpemF0aW9uXG4gICAgLypcbiAgICBleGFtcGxlOlxuICAgIHRoaXMuY29sbGVjdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzLm1haWw7XG4gICAgKi9cbn1cbkFjdGlvbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMsIHNvbHZlKSB7IC8vIGFkZCBcIm9uQ2FuY2VsXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICAvLyBQYXJhbWV0ZXJzOlxuICAgIC8vIHBhcmFtZXRlcnNbJ2lkJ11cblxuICAgIC8vIFRPRE86IEV4ZWN1dGlvblxuICAgIC8qXG4gICAgZXhhbXBsZTpcbiAgICBtYWlsLmZpbmQoe3N1YmplY3Q6ICdSZTogJyArIGRhdGEuc3ViamVjdH0pXG4gICAgICAgIC50aGVuKHNvbHZlKTtcbiAgICAqL1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEJFR0lOKVxuICAgICQubm90aWZ5KHttZXNzYWdlOiAnc2VuZC1hbm5vdGF0b3ItdG8tY2FtcGFpZ24nfSwge2FsbG93X2Rpc21pc3M6IHRydWUsIHR5cGU6ICdzdWNjZXNzJ30pO1xuICAgIHNvbHZlKHtcbiAgICAgICAgZXZlbnQ6ICd3b3JrZXItc2VsZWN0LWdvJywgLy8gd29ya2VyLXNlbGVjdC1nb1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBUSElTIENBTiBCRSBSRU1PVkVEIChFTkQpXG59O1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIGFjdGlvbiA9IG5ldyBBY3Rpb24ob3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKGRhdGEgJiYgZGF0YS5maWx0ZXJzKSB8fCB7fTtcbiAgICAgICAgICAgIGFjdGlvbi5ydW4ocGFyYW1ldGVycywgc29sdmUsIG9uQ2FuY2VsKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG4gICAgXG52YXIgb3B0aW9uO1xuXG5mdW5jdGlvbiBBY3Rpb24ob3B0aW9ucykgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICAvLyBUT0RPOiBHbG9iYWwgSW5pdGlhbGl6YXRpb25cbiAgICBvcHRpb24gPSBvcHRpb25zLnJlcG9zaXRvcmllcztcbn1cbkFjdGlvbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMsIHNvbHZlKSB7IC8vIGFkZCBcIm9uQ2FuY2VsXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICBQYXJhbWV0ZXJzOlxuICAgIHBhcmFtZXRlcnNbJ2Fubm90YXRpb25fcmVwbGljYSddXG4gICAgcGFyYW1ldGVyc1snYW5ub3RhdGlvbl9zaXplJ11cbiAgICBwYXJhbWV0ZXJzWyduYW1lJ11cbiAgICBwYXJhbWV0ZXJzWydzZWxlY3Rpb25fcmVwbGljYSddXG4gICAgcGFyYW1ldGVyc1sndGhyZXNob2xkJ11cbiAgICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBkYXRvcyA9IHtcbiAgICAgICAgXCJhbm5vdGF0aW9uX3JlcGxpY2FcIjogcGFyc2VJbnQocGFyYW1ldGVyc1snYW5ub3RhdGlvbl9yZXBsaWNhJ10pLFxuICAgICAgICBcImFubm90YXRpb25fc2l6ZVwiOiBwYXJzZUludChwYXJhbWV0ZXJzWydhbm5vdGF0aW9uX3NpemUnXSksXG4gICAgICAgIFwibmFtZVwiOiBwYXJhbWV0ZXJzWyduYW1lJ10sXG4gICAgICAgIFwic2VsZWN0aW9uX3JlcGxpY2FcIjogcGFyc2VJbnQocGFyYW1ldGVyc1snc2VsZWN0aW9uX3JlcGxpY2EnXSksXG4gICAgICAgIFwidGhyZXNob2xkXCI6IHBhcnNlSW50KHBhcmFtZXRlcnNbJ3RocmVzaG9sZCddKSxcbiAgICB9O1xuICAgICQuYWpheCh7XG4gICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnL2FwaS9jYW1wYWlnblwiLFxuICAgIHR5cGU6IFwiUE9TVFwiLCBcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIitvcHRpb24uY3VycmVudF91c2VyLnRva2VuKTtcbiAgICB9LFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdG9zKSxcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ21hbmFnZXItZ28nLCBcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcjogIGZ1bmN0aW9uKHhocikge1xuICAgICAgICB2YXIgbXlvYmogPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICBkYXRhID17XG4gICAgICAgICAgICBmaWVsZHM6e1xuICAgICAgICAgICAgICAgIFwiYW5ub3RhdGlvbl9yZXBsaWNhXCI6IHBhcmFtZXRlcnNbJ2Fubm90YXRpb25fcmVwbGljYSddLFxuICAgICAgICAgICAgICAgIFwiYW5ub3RhdGlvbl9zaXplXCI6IHBhcmFtZXRlcnNbJ2Fubm90YXRpb25fc2l6ZSddLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBwYXJhbWV0ZXJzWyduYW1lJ10sXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rpb25fcmVwbGljYVwiOiBwYXJhbWV0ZXJzWydzZWxlY3Rpb25fcmVwbGljYSddLFxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IHBhcmFtZXRlcnNbJ3RocmVzaG9sZCddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yczp7XG4gICAgICAgICAgICAgICAgXCJhbm5vdGF0aW9uX3JlcGxpY2FcIjogbXlvYmouZXJyb3JbJ2Fubm90YXRpb25fcmVwbGljYSddLFxuICAgICAgICAgICAgICAgIFwiYW5ub3RhdGlvbl9zaXplXCI6IG15b2JqLmVycm9yWydhbm5vdGF0aW9uX3NpemUnXSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogbXlvYmouZXJyb3JbJ25hbWUnXSxcbiAgICAgICAgICAgICAgICBcInNlbGVjdGlvbl9yZXBsaWNhXCI6IG15b2JqLmVycm9yWydzZWxlY3Rpb25fcmVwbGljYSddLFxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IG15b2JqLmVycm9yWyd0aHJlc2hvbGQnXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YobXlvYmouZXJyb3IpID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICBkYXRhLmVycm9yc1snb3RoZXJzJ10gPSBteW9iai5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ2NhbXBhaWduLWNyZWF0ZS1mYWlsdXJlJywgXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH19KTtcbiAgICAvLyBUT0RPOiBFeGVjdXRpb25cbiAgICAvLyBzb2x2ZSh7XG4gICAgLy8gICAgIGV2ZW50OiAnY2FtcGFpZ24tY3JlYXRlLWZhaWx1cmUnLCAvLyBjYW1wYWlnbi1jcmVhdGUtZmFpbHVyZVxuICAgIC8vICAgICAvLyBldmVudDogJ2ltYWdlLXVwbG9hZC1nbycsIC8vIGltYWdlLXVwbG9hZC1nb1xuICAgIC8vICAgICBkYXRhOiB7XG4gICAgLy8gICAgICAgICAnTG9jYXRpb24nOiAnMCcsXG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbiAgICBcbnZhciBvcHRpb247XG5cbmZ1bmN0aW9uIEFjdGlvbihvcHRpb25zKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIG9wdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzO1xufVxuQWN0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocGFyYW1ldGVycywgc29sdmUpIHsgLy8gYWRkIFwib25DYW5jZWxcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIFBhcmFtZXRlcnM6XG4gICAgcGFyYW1ldGVyc1snYW5ub3RhdGlvbl9yZXBsaWNhJ11cbiAgICBwYXJhbWV0ZXJzWydhbm5vdGF0aW9uX3NpemUnXVxuICAgIHBhcmFtZXRlcnNbJ25hbWUnXVxuICAgIHBhcmFtZXRlcnNbJ3NlbGVjdGlvbl9yZXBsaWNhJ11cbiAgICBwYXJhbWV0ZXJzWyd0aHJlc2hvbGQnXVxuICAgIHBhcmFtZXRlcnNbJ2lkJ11cbiAgICBhbGVydChKU09OLnN0cmluZ2lmeShwYXJhbWV0ZXJzKSlcbiAgICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBkYXRvcyA9IHtcbiAgICAgICAgXCJhbm5vdGF0aW9uX3JlcGxpY2FcIjogcGFyc2VJbnQocGFyYW1ldGVyc1snYW5ub3RhdGlvbl9yZXBsaWNhJ10pLFxuICAgICAgICBcImFubm90YXRpb25fc2l6ZVwiOiBwYXJzZUludChwYXJhbWV0ZXJzWydhbm5vdGF0aW9uX3NpemUnXSksXG4gICAgICAgIFwibmFtZVwiOiBwYXJhbWV0ZXJzWyduYW1lJ10sXG4gICAgICAgIFwic2VsZWN0aW9uX3JlcGxpY2FcIjogcGFyc2VJbnQocGFyYW1ldGVyc1snc2VsZWN0aW9uX3JlcGxpY2EnXSksXG4gICAgICAgIFwidGhyZXNob2xkXCI6IHBhcnNlSW50KHBhcmFtZXRlcnNbJ3RocmVzaG9sZCddKSxcbiAgICB9O1xuICAgICQuYWpheCh7XG4gICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIgKyBwYXJhbWV0ZXJzWydpZCddLFxuICAgIHR5cGU6IFwiUFVUXCIsIFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiK29wdGlvbi5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgIH0sXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0b3MpLFxuICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgIGRhdG9zLnVybCA9IHBhcmFtZXRlcnNbJ2lkJ107XG4gICAgICAgIHNvbHZlKHtcbiAgICAgICAgICAgIGV2ZW50OiAnaW1hZ2UtdXBsb2FkLWdvJywgXG4gICAgICAgICAgICBkYXRhOiBkYXRvc1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yOiAgZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgIHZhciBteW9iaiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGRhdGEgPXtcbiAgICAgICAgICAgIGZpZWxkczp7XG4gICAgICAgICAgICAgICAgXCJhbm5vdGF0aW9uX3JlcGxpY2FcIjogcGFyYW1ldGVyc1snYW5ub3RhdGlvbl9yZXBsaWNhJ10sXG4gICAgICAgICAgICAgICAgXCJhbm5vdGF0aW9uX3NpemVcIjogcGFyYW1ldGVyc1snYW5ub3RhdGlvbl9zaXplJ10sXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IHBhcmFtZXRlcnNbJ25hbWUnXSxcbiAgICAgICAgICAgICAgICBcInNlbGVjdGlvbl9yZXBsaWNhXCI6IHBhcmFtZXRlcnNbJ3NlbGVjdGlvbl9yZXBsaWNhJ10sXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogcGFyYW1ldGVyc1sndGhyZXNob2xkJ10sXG4gICAgICAgICAgICAgICAgXCJpZFwiOiBwYXJhbWV0ZXJzWydpZCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JzOntcbiAgICAgICAgICAgICAgICBcImFubm90YXRpb25fcmVwbGljYVwiOiBteW9iai5lcnJvclsnYW5ub3RhdGlvbl9yZXBsaWNhJ10sXG4gICAgICAgICAgICAgICAgXCJhbm5vdGF0aW9uX3NpemVcIjogbXlvYmouZXJyb3JbJ2Fubm90YXRpb25fc2l6ZSddLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBteW9iai5lcnJvclsnbmFtZSddLFxuICAgICAgICAgICAgICAgIFwic2VsZWN0aW9uX3JlcGxpY2FcIjogbXlvYmouZXJyb3JbJ3NlbGVjdGlvbl9yZXBsaWNhJ10sXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogbXlvYmouZXJyb3JbJ3RocmVzaG9sZCddLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKHR5cGVvZihteW9iai5lcnJvcikgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIGRhdGEuZXJyb3JzWydvdGhlcnMnXSA9IG15b2JqLmVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHNvbHZlKHtcbiAgICAgICAgICAgIGV2ZW50OiAnY2FtcGFpZ24tZWRpdC1mYWlsdXJlJywgXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH19KTtcbiAgICAvLyAkLm5vdGlmeSh7bWVzc2FnZTogJ3NlbmQtZWRpdC1jYW1wYWlnbid9LCB7YWxsb3dfZGlzbWlzczogdHJ1ZSwgdHlwZTogJ3N1Y2Nlc3MnfSk7XG4gICAgLy8gc29sdmUoe1xuICAgIC8vICAgICBldmVudDogJ2NhbXBhaWduLWVkaXQtZ28nLCAvLyBjYW1wYWlnbi1lZGl0LWdvXG4gICAgLy8gICAgIC8vIGV2ZW50OiAnY2FtcGFpZ24tZWRpdC1mYWlsdXJlJywgLy8gY2FtcGFpZ24tZWRpdC1mYWlsdXJlXG4gICAgLy8gICAgIGRhdGE6IHtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xufTtcblxuZXhwb3J0cy5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBhY3Rpb24gPSBuZXcgQWN0aW9uKG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHNvbHZlLCByZWplY3QsIG9uQ2FuY2VsKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IChkYXRhICYmIGRhdGEuZmlsdGVycykgfHwge307XG4gICAgICAgICAgICBhY3Rpb24ucnVuKHBhcmFtZXRlcnMsIHNvbHZlLCBvbkNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gQWN0aW9uKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICAvLyBUT0RPOiBHbG9iYWwgSW5pdGlhbGl6YXRpb25cbiAgICAvKlxuICAgIGV4YW1wbGU6XG4gICAgdGhpcy5jb2xsZWN0aW9uID0gb3B0aW9ucy5yZXBvc2l0b3JpZXMubWFpbDtcbiAgICAqL1xufVxuQWN0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocGFyYW1ldGVycywgc29sdmUpIHsgLy8gYWRkIFwib25DYW5jZWxcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFBhcmFtZXRlcnM6XG4gICAgLy8gcGFyYW1ldGVyc1snYWNjZXB0ZWQnXVxuXG4gICAgLy8gVE9ETzogRXhlY3V0aW9uXG4gICAgLypcbiAgICBleGFtcGxlOlxuICAgIG1haWwuZmluZCh7c3ViamVjdDogJ1JlOiAnICsgZGF0YS5zdWJqZWN0fSlcbiAgICAgICAgLnRoZW4oc29sdmUpO1xuICAgICovXG4gICAgLy8gVEhJUyBDQU4gQkUgUkVNT1ZFRCAoQkVHSU4pXG4gICAgJC5ub3RpZnkoe21lc3NhZ2U6ICdzZW5kLWltYWdlLXNlbGVjdGlvbid9LCB7YWxsb3dfZGlzbWlzczogdHJ1ZSwgdHlwZTogJ3N1Y2Nlc3MnfSk7XG4gICAgc29sdmUoe1xuICAgICAgICBldmVudDogJ2ltYWdlLXNlbGVjdGlvbi1nbycsIC8vIGltYWdlLXNlbGVjdGlvbi1nb1xuICAgICAgICAvLyBldmVudDogJ3Rhc2stZ28nLCAvLyB0YXNrLWdvXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEVORClcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIEFjdGlvbigpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgLy8gVE9ETzogR2xvYmFsIEluaXRpYWxpemF0aW9uXG4gICAgLypcbiAgICBleGFtcGxlOlxuICAgIHRoaXMuY29sbGVjdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzLm1haWw7XG4gICAgKi9cbn1cbkFjdGlvbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMsIHNvbHZlKSB7IC8vIGFkZCBcIm9uQ2FuY2VsXCIgcGFyYW1ldGVycyBpZiBuZWVkZWRcbiAgICAvLyBQYXJhbWV0ZXJzOlxuICAgIC8vIHBhcmFtZXRlcnNbJ2ltYWdlJ11cbiAgICAvLyBwYXJhbWV0ZXJzWyduYW1lJ11cblxuICAgIC8vIFRPRE86IEV4ZWN1dGlvblxuICAgIC8qXG4gICAgZXhhbXBsZTpcbiAgICBtYWlsLmZpbmQoe3N1YmplY3Q6ICdSZTogJyArIGRhdGEuc3ViamVjdH0pXG4gICAgICAgIC50aGVuKHNvbHZlKTtcbiAgICAqL1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEJFR0lOKVxuICAgICQubm90aWZ5KHttZXNzYWdlOiAnc2VuZC1pbWFnZS11cGxvYWQtZGF0YSd9LCB7YWxsb3dfZGlzbWlzczogdHJ1ZSwgdHlwZTogJ3N1Y2Nlc3MnfSk7XG4gICAgc29sdmUoe1xuICAgICAgICBldmVudDogJ2ltYWdlLXVwbG9hZC1mYWlsdXJlJywgLy8gaW1hZ2UtdXBsb2FkLWZhaWx1cmVcbiAgICAgICAgLy8gZXZlbnQ6ICd3b3JrZXItc2VsZWN0LWdvJywgLy8gd29ya2VyLXNlbGVjdC1nb1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAnbG9jYXRpb24nOiAnMCcsXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBUSElTIENBTiBCRSBSRU1PVkVEIChFTkQpXG59O1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIGFjdGlvbiA9IG5ldyBBY3Rpb24ob3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKGRhdGEgJiYgZGF0YS5maWx0ZXJzKSB8fCB7fTtcbiAgICAgICAgICAgIGFjdGlvbi5ydW4ocGFyYW1ldGVycywgc29sdmUsIG9uQ2FuY2VsKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBBY3Rpb24oKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIC8qXG4gICAgZXhhbXBsZTpcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBvcHRpb25zLnJlcG9zaXRvcmllcy5tYWlsO1xuICAgICovXG59XG5BY3Rpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzLCBzb2x2ZSkgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgLy8gUGFyYW1ldGVyczpcbiAgICAvLyBwYXJhbWV0ZXJzWydhbm5vdGF0aW9uJ11cblxuICAgIC8vIFRPRE86IEV4ZWN1dGlvblxuICAgIC8qXG4gICAgZXhhbXBsZTpcbiAgICBtYWlsLmZpbmQoe3N1YmplY3Q6ICdSZTogJyArIGRhdGEuc3ViamVjdH0pXG4gICAgICAgIC50aGVuKHNvbHZlKTtcbiAgICAqL1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEJFR0lOKVxuICAgICQubm90aWZ5KHttZXNzYWdlOiAnc2VuZC1pbWFnZXMtYW5ub3RhdGlvbid9LCB7YWxsb3dfZGlzbWlzczogdHJ1ZSwgdHlwZTogJ3N1Y2Nlc3MnfSk7XG4gICAgc29sdmUoe1xuICAgICAgICBldmVudDogJ2ltYWdlLWFubm90YXRpb24tZ28nLCAvLyBpbWFnZS1hbm5vdGF0aW9uLWdvXG4gICAgICAgIC8vIGV2ZW50OiAndGFzay1nbycsIC8vIHRhc2stZ29cbiAgICAgICAgZGF0YToge1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gVEhJUyBDQU4gQkUgUkVNT1ZFRCAoRU5EKVxufTtcblxuZXhwb3J0cy5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBhY3Rpb24gPSBuZXcgQWN0aW9uKG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHNvbHZlLCByZWplY3QsIG9uQ2FuY2VsKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IChkYXRhICYmIGRhdGEuZmlsdGVycykgfHwge307XG4gICAgICAgICAgICBhY3Rpb24ucnVuKHBhcmFtZXRlcnMsIHNvbHZlLCBvbkNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xudmFyIG9wdGlvbjtcblxuXG5mdW5jdGlvbiBBY3Rpb24ob3B0aW9ucykgeyBcbiAgICAvLyBUT0RPOiBHbG9iYWwgSW5pdGlhbGl6YXRpb25cbiAgICBvcHRpb24gPSBvcHRpb25zLnJlcG9zaXRvcmllcztcbn1cblxuQWN0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocGFyYW1ldGVycywgc29sdmUpIHsgLy8gYWRkIFwib25DYW5jZWxcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIFBhcmFtZXRlcnM6XG4gICAgcGFyYW1ldGVyc1sncGFzc3dvcmQnXTtcbiAgICBwYXJhbWV0ZXJzWyd1c2VybmFtZSddO1xuICAgIHZhciBkYXRhID0ge307XG4gICAgdmFyIGRhdG9zID0ge1xuICAgICAgICBcInVzZXJuYW1lXCI6IHBhcmFtZXRlcnNbJ3VzZXJuYW1lJ10sXG4gICAgICAgIFwicGFzc3dvcmRcIjogcGFyYW1ldGVyc1sncGFzc3dvcmQnXSxcbiAgICB9O1xuICAgICQuYWpheCh7XG4gICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnL2FwaS9hdXRoXCIsXG4gICAgdHlwZTogXCJQT1NUXCIsXG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJS2V5IGZiNzJlMWZlLTM1ODMtMTFlNy1hOTE5LTkyZWJjYjY3ZmUzM1wiKTtcbiAgICB9LFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdG9zKSxcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICBvcHRpb24uY3VycmVudF91c2VyID0ge1xuICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBkYXRvcy51c2VybmFtZSxcbiAgICAgICAgICAgIFwidG9rZW5cIjogbXlvYmoudG9rZW5cbiAgICAgICAgfVxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmcvYXBpL3VzZXIvbWVcIixcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiK215b2JqLnRva2VuKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIHZhciBteW9iajIgPSByZXN1bHQ7XG4gICAgICAgICAgICBvcHRpb24uY3VycmVudF91c2VyID0ge1xuICAgICAgICAgICAgICAgIFwiZnVsbG5hbWVcIjogbXlvYmoyLmZ1bGxuYW1lLFxuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogZGF0b3MudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBteW9iai50b2tlbixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogbXlvYmoyLnR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG15b2JqMi50eXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiTUFTVEVSXCIpe1xuICAgICAgICAgICAgICAgIHNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdtYW5hZ2VyLWdvJywgLy8gbWFuYWdlci1nb1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAndGFzay1nbycsIC8vIHRhc2stZ29cbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZXJyb3I6ICBmdW5jdGlvbih4aHIpIHtcbiAgICAgICAgLy9kYXRhID0gIHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIHZhciBteW9iaiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGRhdGEgPXtcbiAgICAgICAgICAgIGZpZWxkczp7XG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBwYXJhbWV0ZXJzWyd1c2VybmFtZSddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yczp7XG4gICAgICAgICAgICAgICAgJ3Bhc3N3b3JkJzogbXlvYmouZXJyb3IucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgJ3VzZXJuYW1lJzogbXlvYmouZXJyb3IudXNlcm5hbWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZW9mKG15b2JqLmVycm9yKSA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgZGF0YS5lcnJvcnNbJ290aGVycyddID0gbXlvYmouZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgZXZlbnQ6ICdsb2dpbi1mYWlsdXJlJywgXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH19KTtcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbnZhciBvcHRpb247XG5cbmZ1bmN0aW9uIEFjdGlvbihvcHRpb25zKSB7IFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIG9wdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzO1xufVxuQWN0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocGFyYW1ldGVycywgc29sdmUpIHsgLy8gYWRkIFwib25DYW5jZWxcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIHZhciBkYXRhID0ge307XG4gICAgJC5hamF4KHtcbiAgICB1cmw6IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmcvYXBpL2F1dGhcIixcbiAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiK29wdGlvbi5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgIH0sXG4gICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIHZhciBteW9iaiA9IHJlc3VsdDtcbiAgICAgICAgb3B0aW9uLmN1cnJlbnRfdXNlciA9IHt9XG4gICAgICAgIGFsZXJ0KFwiYWd1YWNhdGVcIilcbiAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgZXZlbnQ6ICdob21lJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfX0pO1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEVORClcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbnZhciBvcHRpb247XG5cbmZ1bmN0aW9uIEFjdGlvbihvcHRpb25zKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIC8qXG4gICAgZXhhbXBsZTpcbiAgICAqL1xuICAgIG9wdGlvbiA9IG9wdGlvbnMucmVwb3NpdG9yaWVzO1xuICAgIFxufVxuQWN0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocGFyYW1ldGVycywgc29sdmUsb3B0aW9ucykgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgUGFyYW1ldGVyczpcbiAgICBwYXJhbWV0ZXJzWydhY2NvdW50LXR5cGUnXTtcbiAgICBwYXJhbWV0ZXJzWydmdWxsbmFtZSddO1xuICAgIHBhcmFtZXRlcnNbJ3Bhc3N3b3JkJ107XG4gICAgcGFyYW1ldGVyc1sndXNlcm5hbWUnXTtcbiAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKTtcbiAgICAvLyBUT0RPOiBFeGVjdXRpb25cbiAgICAvKlxuICAgIGV4YW1wbGU6XG4gICAgbWFpbC5maW5kKHtzdWJqZWN0OiAnUmU6ICcgKyBkYXRhLnN1YmplY3R9KVxuICAgICAgICAudGhlbihzb2x2ZSk7XG4gICAgKi9cbiAgICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBkYXRvcyA9IHtcbiAgICAgICAgXCJmdWxsbmFtZVwiOiBwYXJhbWV0ZXJzWydmdWxsbmFtZSddLFxuICAgICAgICBcInVzZXJuYW1lXCI6IHBhcmFtZXRlcnNbJ3VzZXJuYW1lJ10sXG4gICAgICAgIFwicGFzc3dvcmRcIjogcGFyYW1ldGVyc1sncGFzc3dvcmQnXSxcbiAgICAgICAgXCJ0eXBlXCI6IHBhcmFtZXRlcnNbJ2FjY291bnQtdHlwZSddXG4gICAgfTtcbiAgICAkLmFqYXgoe1xuICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZy9hcGkvdXNlclwiLFxuICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSUtleSBmYjcyZTFmZS0zNTgzLTExZTctYTkxOS05MmViY2I2N2ZlMzNcIik7XG4gICAgfSxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRvcyksXG4gICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZy9hcGkvYXV0aFwiLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSUtleSBmYjcyZTFmZS0zNTgzLTExZTctYTkxOS05MmViY2I2N2ZlMzNcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwidXNlcm5hbWVcIjogZGF0b3MudXNlcm5hbWUsXG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IGRhdG9zLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgYWxlcnQocmVzdWx0KVxuICAgICAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgb3B0aW9uLmN1cnJlbnRfdXNlciA9IHtcbiAgICAgICAgICAgICAgICBcImZ1bGxuYW1lXCI6IGRhdG9zLmZ1bGxuYW1lLFxuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogZGF0b3MudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGRhdG9zLnR5cGUsXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBteW9iai50b2tlblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGF0b3MudHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIk1BU1RFUlwiKXtcbiAgICAgICAgICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnbWFuYWdlci1nbycsIC8vIG1hbmFnZXItZ29cbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogJ3Rhc2stZ28nLCAvLyB0YXNrLWdvXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yOiAgZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgIC8vZGF0YSA9ICB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICB2YXIgbXlvYmogPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICBkYXRhID17XG4gICAgICAgICAgICBmaWVsZHM6e1xuICAgICAgICAgICAgICAgIFwiZnVsbG5hbWVcIjogcGFyYW1ldGVyc1snZnVsbG5hbWUnXSxcbiAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IHBhcmFtZXRlcnNbJ3VzZXJuYW1lJ10sXG4gICAgICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBwYXJhbWV0ZXJzWydwYXNzd29yZCddLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBwYXJhbWV0ZXJzWydhY2NvdW50LXR5cGUnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yczp7XG4gICAgICAgICAgICAgICAgJ2FjY291bnQtdHlwZSc6IG15b2JqLmVycm9yLnR5cGUsXG4gICAgICAgICAgICAgICAgJ2Z1bGxuYW1lJzogbXlvYmouZXJyb3IuZnVsbG5hbWUsXG4gICAgICAgICAgICAgICAgJ3Bhc3N3b3JkJzogbXlvYmouZXJyb3IucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgJ3VzZXJuYW1lJzogbXlvYmouZXJyb3IudXNlcm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzb2x2ZSh7XG4gICAgICAgICAgICBldmVudDogJ3JlZ2lzdGVyLWZhaWx1cmUnLCAvLyByZWdpc3Rlci1mYWlsdXJlXG4gICAgICAgICAgICAvLyBldmVudDogJ3Rhc2stZ28nLCAvLyB0YXNrLWdvXG4gICAgICAgICAgICAvLyBldmVudDogJ21hbmFnZXItZ28nLCAvLyBtYW5hZ2VyLWdvXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH19KTtcbiAgICAvLyBUSElTIENBTiBCRSBSRU1PVkVEIChCRUdJTilcbiAgICAvLyQubm90aWZ5KHttZXNzYWdlOiAnc2VuZC1yZWdpc3RyYXRpb24tZGF0YSd9LCB7YWxsb3dfZGlzbWlzczogdHJ1ZSwgdHlwZTogJ3N1Y2Nlc3MnfSk7XG4gICAgXG4gICAgLy8gVEhJUyBDQU4gQkUgUkVNT1ZFRCAoRU5EKVxufTtcblxuZXhwb3J0cy5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBhY3Rpb24gPSBuZXcgQWN0aW9uKG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSxjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKGRhdGEgJiYgZGF0YS5maWx0ZXJzKSB8fCB7fTtcbiAgICAgICAgICAgIGFjdGlvbi5ydW4ocGFyYW1ldGVycywgc29sdmUsIG9uQ2FuY2VsLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBBY3Rpb24oKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXJzIGlmIG5lZWRlZFxuICAgIC8vIFRPRE86IEdsb2JhbCBJbml0aWFsaXphdGlvblxuICAgIC8qXG4gICAgZXhhbXBsZTpcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBvcHRpb25zLnJlcG9zaXRvcmllcy5tYWlsO1xuICAgICovXG59XG5BY3Rpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzLCBzb2x2ZSkgeyAvLyBhZGQgXCJvbkNhbmNlbFwiIHBhcmFtZXRlcnMgaWYgbmVlZGVkXG4gICAgLy8gUGFyYW1ldGVyczpcbiAgICAvLyBwYXJhbWV0ZXJzWydpZCddXG5cbiAgICAvLyBUT0RPOiBFeGVjdXRpb25cbiAgICAvKlxuICAgIGV4YW1wbGU6XG4gICAgbWFpbC5maW5kKHtzdWJqZWN0OiAnUmU6ICcgKyBkYXRhLnN1YmplY3R9KVxuICAgICAgICAudGhlbihzb2x2ZSk7XG4gICAgKi9cbiAgICAvLyBUSElTIENBTiBCRSBSRU1PVkVEIChCRUdJTilcbiAgICAkLm5vdGlmeSh7bWVzc2FnZTogJ3NlbmQtd29ya2Vycy10by1jYW1wYWlnbid9LCB7YWxsb3dfZGlzbWlzczogdHJ1ZSwgdHlwZTogJ3N1Y2Nlc3MnfSk7XG4gICAgc29sdmUoe1xuICAgICAgICBldmVudDogJ3dvcmtlci1zZWxlY3QtZ28nLCAvLyB3b3JrZXItc2VsZWN0LWdvXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIFRISVMgQ0FOIEJFIFJFTU9WRUQgKEVORClcbn07XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9uID0gbmV3IEFjdGlvbihvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChzb2x2ZSwgcmVqZWN0LCBvbkNhbmNlbCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZGF0YSAmJiBkYXRhLmZpbHRlcnMpIHx8IHt9O1xuICAgICAgICAgICAgYWN0aW9uLnJ1bihwYXJhbWV0ZXJzLCBzb2x2ZSwgb25DYW5jZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG48ZGl2IGNsYXNzPVxcXCJ3ZWxsIGNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMiBjb2wtc20tMTAgY29sLXNtLW9mZnNldC0xXFxcIj5cXG48ZmllbGRzZXQ+XFxuPGxlZ2VuZCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPkVkaXQgQWNjb3VudDwvbGVnZW5kPlxcbjxmb3JtPlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtvdGhlcnMmIzM5O119XFxcIj5cXG48aDUgY2xhc3M9XFxcImhlbHAtYmxvY2sgdGV4dC1jZW50ZXJcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JzKClbJiMzOTtvdGhlcnMmIzM5O11cXFwiIGlkPVxcXCJsb2dpbi1mb3JtX2ZpZWxkX2Vycm9yXFxcIj48L2g1PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtmdWxsbmFtZSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7ZnVsbG5hbWUmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7ZnVsbG5hbWUmIzM5O119XFxcIiBmb3I9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzBcXFwiPkZ1bGxuYW1lPC9sYWJlbD5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwiYWNjb3VudC1lZGl0LWZvcm1fZmllbGRfMF9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTtmdWxsbmFtZSYjMzk7XVxcXCIgaWQ9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzBcXFwiIHR5cGU9XFxcInRleHRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7ZnVsbG5hbWUmIzM5O11cXFwiIGlkPVxcXCJhY2NvdW50LWVkaXQtZm9ybV9maWVsZF8wX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3Bhc3N3b3JkJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtwYXNzd29yZCYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtwYXNzd29yZCYjMzk7XX1cXFwiIGZvcj1cXFwiYWNjb3VudC1lZGl0LWZvcm1fZmllbGRfMVxcXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJhY2NvdW50LWVkaXQtZm9ybV9maWVsZF8xX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O3Bhc3N3b3JkJiMzOTtdXFxcIiBpZD1cXFwiYWNjb3VudC1lZGl0LWZvcm1fZmllbGRfMVxcXCIgdHlwZT1cXFwidGV4dFxcXCI+XFxuPHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JzKClbJiMzOTtwYXNzd29yZCYjMzk7XVxcXCIgaWQ9XFxcImFjY291bnQtZWRpdC1mb3JtX2ZpZWxkXzFfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Zvcm0+XFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciBtYXJnaW5fX3RvcC0tMjBweFxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCAmIzM5O2FjY291bnQtZWRpdC1zdWJtaXQmIzM5OylcXFwiPlxcblN1Ym1pdFxcbjwvYT5cXG48YnI+XFxuPGhyIGNsYXNzPVxcXCJzZXBhcmF0b3IgbWFyZ2luX19jZW50ZXJcXFwiPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZmllbGRzZXQ+XFxuPC9kaXY+XFxuPC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuICAgIHNlbGYuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgc2VsZi5maWVsZHMgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICBzZWxmLmVycm9ycyA9IGtvLm9ic2VydmFibGUoe30pO1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgc2VsZi5vdXRwdXQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIChlcnJvcnNfc2VudCkge1xuICAgIGFsZXJ0KEpTT04uc3RyaW5naWZ5KHRoaXMuY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddKSlcbiAgICB0aGlzLmZpZWxkcygpWydmdWxsbmFtZSddKHRoaXMuY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLmZ1bGxuYW1lKTtcbiAgICB0aGlzLmZpZWxkcygpWydwYXNzd29yZCddKHRoaXMuY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLnBhc3N3b3JkKTtcbiAgICB0aGlzLmVycm9ycygpWydmdWxsbmFtZSddKGVycm9yc19zZW50LmZ1bGxuYW1lKTtcbiAgICB0aGlzLmVycm9ycygpWydwYXNzd29yZCddKGVycm9yc19zZW50LnBhc3N3b3JkKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnYWNjb3VudC1lZGl0LWZvcm0nO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXRwdXQgPSB7XG4gICAgICAgICdmdWxsbmFtZSc6IHRoaXMuaW5wdXRbJ2Z1bGxuYW1lJ10sXG4gICAgICAgICdwYXNzd29yZCc6IHRoaXMuaW5wdXRbJ3Bhc3N3b3JkJ10sXG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZmllbGRzID0ge1xuICAgICAgICAgICAgJ2Z1bGxuYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydmdWxsbmFtZSddKSxcbiAgICAgICAgICAgICdwYXNzd29yZCc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsncGFzc3dvcmQnXSksXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9ycyA9IHtcbiAgICAgICAgICAgICdmdWxsbmFtZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnZnVsbG5hbWUtZXJyb3InXSksXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3Bhc3N3b3JkLWVycm9yJ10pLFxuICAgICAgICAgICAgJ290aGVycyc6IGtvLm9ic2VydmFibGUoKSxcbiAgICAgICAgfTtcbiAgICBmaWVsZHNbJ2Z1bGxuYW1lJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnZnVsbG5hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydmdWxsbmFtZSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWydwYXNzd29yZCddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ3Bhc3N3b3JkJ10gPSB2YWx1ZTtcbiAgICAgICAgc2VsZi5lcnJvcnMoKVsncGFzc3dvcmQnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5lcnJvcnMoZXJyb3JzKTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGVycm9ycykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGVycm9ycyA9IGVycm9ycyB8fCB7fTtcbiAgICB0aGlzLm91dHB1dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpZWxkcyh7fSk7XG4gICAgdGhpcy5lcnJvcnMoe30pO1xuICAgIHRoaXMuaW5wdXQgPSBvcHRpb25zLmlucHV0IHx8IHt9O1xuICAgIHRoaXMuc3RhdHVzKCdyZWFkeScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9pbml0aWFsaXppbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2NvbXB1dGUoKTtcbiAgICAgICAgICAgIHNlbGYuZmlsbChlcnJvcnMpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgc2VsZi5faW5pdGlhbGl6aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1hY2NvdW50LWVkaXQtZm9ybScsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+ICAgIDwhLS0gYWNjb3VudC1lZGl0LWZvcm0gLS0+ICAgIDxjLWFjY291bnQtZWRpdC1mb3JtIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWFjY291bnQtZWRpdC1mb3JtPjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2FjY291bnQtZWRpdC12aWV3JztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2FjY291bnQtZWRpdC1mb3JtJyAvLyBhY2NvdW50LWVkaXQtZm9ybVxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWFjY291bnQtZWRpdC12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8aDM+YW5ub3RhdG9yLWxpc3Q8L2gzPjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtaG92ZXIgdGFibGUtY29uZGVuc2VkXFxcIj4gICAgPHRoZWFkPiAgICAgICAgPHRyPiAgICAgICAgICAgIDx0aD4jPC90aD4gICAgICAgIDwvdHI+ICAgIDwvdGhlYWQ+ICAgIDx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IGl0ZW1zXFxcIj4gICAgICAgIDx0ciBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LnNlbGVjdFxcXCI+ICAgICAgICAgICAgPHRkIGRhdGEtYmluZD1cXFwidGV4dDogaWRcXFwiPjwvdGQ+ICAgICAgICA8L3RyPiAgICAgICAgPC90Ym9keT48L3RhYmxlPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuX3JlcG9zaXRvcnkgPSBwYXJhbXMuY29udGV4dC5yZXBvc2l0b3JpZXNbJ3dvcmtlcnMnXTtcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcbiAgICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHNlbGYuc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgc2VsZi5pdGVtcyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG5cbiAgICBzZWxmLnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnNlbGVjdGVkKHRoaXMuaWQpO1xuICAgICAgICBzZWxmLm91dHB1dCA9IHRoaXM7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQsIHRoaXMpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnYW5ub3RhdG9yLWxpc3QnO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpZWxkcyA9IHtcbiAgICBpZDogMVxufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wdXRpbmcgfHxcbiAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6aW5nIHx8XG4gICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5fY29tcHV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jb21wdXRpbmcpIHtcbiAgICAgICAgdGhpcy5fY29tcHV0aW5nLmNhbmNlbCgpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fY29tcHV0aW5nID0gdGhpcy5fcmVwb3NpdG9yeS5maW5kKHRoaXMuZmlsdGVycywgdGhpcy5maWVsZHMpLnRoZW4oZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWQodW5kZWZpbmVkKTtcbiAgICAgICAgc2VsZi5pdGVtcyhpdGVtcyk7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWQoaXRlbXNbMF0uaWQpO1xuICAgICAgICAgICAgc2VsZi5vdXRwdXQgPSBpdGVtc1swXTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnN0YXR1cygnY29tcHV0ZWQnKTtcbiAgICAgICAgc2VsZi5fY29tcHV0aW5nID0gdW5kZWZpbmVkO1xuICAgIH0pO1xufTtcblxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMub3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsdGVycyA9IG9wdGlvbnMuaW5wdXQgfHwge307XG4gICAgdGhpcy5zdGF0dXMoJ3JlYWR5Jyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX2luaXRpYWxpemluZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fY29tcHV0ZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgc2VsZi5faW5pdGlhbGl6aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1hbm5vdGF0b3ItbGlzdCcsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGgzPmNhbXBhaWduLXdvcmtlci1saXN0PC9oMz48dGFibGUgY2xhc3M9XFxcInRhYmxlIHRhYmxlLWhvdmVyIHRhYmxlLWNvbmRlbnNlZFxcXCI+ICAgIDx0aGVhZD4gICAgICAgIDx0cj4gICAgICAgICAgICA8dGg+IzwvdGg+ICAgICAgICAgICAgPHRoPmFjY2VwdGVkPC90aD4gICAgICAgICAgICA8dGg+YW5ub3RhdGVkPC90aD4gICAgICAgICAgICA8dGg+YXZhaWxhYmxlPC90aD4gICAgICAgICAgICA8dGg+cmVqZWN0ZWQ8L3RoPiAgICAgICAgICAgIDx0aD50eXBlPC90aD4gICAgICAgICAgICA8dGg+YWN0aW9uczwvdGg+ICAgICAgICA8L3RyPiAgICA8L3RoZWFkPiAgICA8dGJvZHkgZGF0YS1iaW5kPVxcXCJmb3JlYWNoOiBpdGVtc1xcXCI+ICAgICAgICA8dHIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5zZWxlY3RcXFwiPiAgICAgICAgICAgIDx0ZCBkYXRhLWJpbmQ9XFxcInRleHQ6IGlkXFxcIj48L3RkPiAgICAgICAgICAgIDx0ZCBkYXRhLWJpbmQ9XFxcInRleHQ6ICRkYXRhWydhY2NlcHRlZCddXFxcIiBzdHlsZT1cXFwid2hpdGUtc3BhY2U6IHByZS13cmFwXFxcIj48L3RkPiAgICAgICAgICAgIDx0ZCBkYXRhLWJpbmQ9XFxcInRleHQ6ICRkYXRhWydhbm5vdGF0ZWQnXVxcXCIgc3R5bGU9XFxcIndoaXRlLXNwYWNlOiBwcmUtd3JhcFxcXCI+PC90ZD4gICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVxcXCJ0ZXh0OiAkZGF0YVsnYXZhaWxhYmxlJ11cXFwiIHN0eWxlPVxcXCJ3aGl0ZS1zcGFjZTogcHJlLXdyYXBcXFwiPjwvdGQ+ICAgICAgICAgICAgPHRkIGRhdGEtYmluZD1cXFwidGV4dDogJGRhdGFbJ3JlamVjdGVkJ11cXFwiIHN0eWxlPVxcXCJ3aGl0ZS1zcGFjZTogcHJlLXdyYXBcXFwiPjwvdGQ+ICAgICAgICAgICAgPHRkIGRhdGEtYmluZD1cXFwidGV4dDogJGRhdGFbJ3R5cGUnXVxcXCIgc3R5bGU9XFxcIndoaXRlLXNwYWNlOiBwcmUtd3JhcFxcXCI+PC90ZD4gICAgICAgICAgICA8dGQ+ICAgICAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuIGN5YW5cXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQudHJpZ2dlci5iaW5kKCRkYXRhLCAnaW1hZ2Utc2VsZWN0aW9uLWdvJyksIGNsaWNrQnViYmxlOiBmYWxzZVxcXCI+aW1hZ2Utc2VsZWN0aW9uLWdvPC9hPiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cXFwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0biBjeWFuXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LnRyaWdnZXIuYmluZCgkZGF0YSwgJ2ltYWdlLWFubm90YXRpb24tZ28nKSwgY2xpY2tCdWJibGU6IGZhbHNlXFxcIj5pbWFnZS1hbm5vdGF0aW9uLWdvPC9hPiAgICAgICAgICAgIDwvdGQ+ICAgICAgICA8L3RyPiAgICAgICAgPC90Ym9keT48L3RhYmxlPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuX3JlcG9zaXRvcnkgPSBwYXJhbXMuY29udGV4dC5yZXBvc2l0b3JpZXNbJ3Rhc2tzJ107XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgIHNlbGYuaXRlbXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gICAgc2VsZi5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RlZCh0aGlzLmlkKTtcbiAgICAgICAgc2VsZi5vdXRwdXQgPSB0aGlzO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCB0aGlzKTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2NhbXBhaWduLXdvcmtlci1saXN0JztcblxuVmlld01vZGVsLnByb3RvdHlwZS5maWVsZHMgPSB7XG4gICAgaWQ6IDFcbiAgICAsJ2FjY2VwdGVkJzogMVxuICAgICwnYW5ub3RhdGVkJzogMVxuICAgICwnYXZhaWxhYmxlJzogMVxuICAgICwncmVqZWN0ZWQnOiAxXG4gICAgLCd0eXBlJzogMVxufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wdXRpbmcgfHxcbiAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6aW5nIHx8XG4gICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5fY29tcHV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jb21wdXRpbmcpIHtcbiAgICAgICAgdGhpcy5fY29tcHV0aW5nLmNhbmNlbCgpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fY29tcHV0aW5nID0gdGhpcy5fcmVwb3NpdG9yeS5maW5kKHRoaXMuZmlsdGVycywgdGhpcy5maWVsZHMpLnRoZW4oZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWQodW5kZWZpbmVkKTtcbiAgICAgICAgc2VsZi5pdGVtcyhpdGVtcyk7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWQoaXRlbXNbMF0uaWQpO1xuICAgICAgICAgICAgc2VsZi5vdXRwdXQgPSBpdGVtc1swXTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnN0YXR1cygnY29tcHV0ZWQnKTtcbiAgICAgICAgc2VsZi5fY29tcHV0aW5nID0gdW5kZWZpbmVkO1xuICAgIH0pO1xufTtcblxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMub3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsdGVycyA9IG9wdGlvbnMuaW5wdXQgfHwge307XG4gICAgdGhpcy5zdGF0dXMoJ3JlYWR5Jyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX2luaXRpYWxpemluZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fY29tcHV0ZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgc2VsZi5faW5pdGlhbGl6aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1jYW1wYWlnbi13b3JrZXItbGlzdCcsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+XFxuPGRpdiBjbGFzcz1cXFwid2VsbCBjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTIgY29sLXNtLTEwIGNvbC1zbS1vZmZzZXQtMVxcXCI+XFxuPGZpZWxkc2V0PlxcbjxsZWdlbmQgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5cXG48Yj5cXG5DcmVhdGUgYSBDYW1wYWlnbiFcXG48L2I+XFxuPC9sZWdlbmQ+XFxuPGZvcm0gY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O290aGVycyYjMzk7XX1cXFwiPlxcbjxoNSBjbGFzcz1cXFwiaGVscC1ibG9jayB0ZXh0LWNlbnRlclxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O290aGVycyYjMzk7XVxcXCIgaWQ9XFxcImxvZ2luLWZvcm1fZmllbGRfZXJyb3JcXFwiPjwvaDU+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O25hbWUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLWxnLTUgY29sLXNtLTQgdGV4dF9fYWxsaWduLS1sZWZ0XFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtuYW1lJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O25hbWUmIzM5O119XFxcIiBmb3I9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzJcXFwiPlxcbjxiPlxcbk5hbWUgb2YgY2FtcGFpZ246XFxuPC9iPlxcbjwvbGFiZWw+XFxuPGRpdiBjbGFzcz1cXFwiY29sLWxnLTcgY29sLXNtLThcXFwiPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8yX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O25hbWUmIzM5O11cXFwiIGlkPVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8yXFxcIiBwbGFjZWhvbGRlcj1cXFwiQSBnb29kIG5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7bmFtZSYjMzk7XVxcXCIgaWQ9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzJfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48bGVnZW5kPkltYWdlIFNlbGVjdGlvbjwvbGVnZW5kPlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgcm93XFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7c2VsZWN0aW9uX3JlcGxpY2EmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLWxnLTUgY29sLXNtLTYgdGV4dF9fYWxsaWduLS1sZWZ0XFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtzZWxlY3Rpb25fcmVwbGljYSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtzZWxlY3Rpb25fcmVwbGljYSYjMzk7XX1cXFwiIGZvcj1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfM1xcXCI+XFxuPGI+XFxuTWluaW11bSBudW1iZXIgb2Ygd29ya2VycyBwZXIgaW1hZ2U6XFxuPC9iPlxcbjwvbGFiZWw+XFxuPGRpdiBjbGFzcz1cXFwiY29sLWxnLTcgY29sLXNtLTZcXFwiPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8zX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O3NlbGVjdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfM1xcXCIgbWluPVxcXCIxXFxcIiB0eXBlPVxcXCJudW1iZXJcXFwiIHZhbHVlPVxcXCIxXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O3NlbGVjdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfM19lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgcm93XFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7dGhyZXNob2xkJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1sZy01IGNvbC1zbS02IHRleHRfX2FsbGlnbi0tbGVmdFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7dGhyZXNob2xkJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3RocmVzaG9sZCYjMzk7XX1cXFwiIGZvcj1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfNFxcXCI+XFxuPGI+XFxuTWluaW11bSBudW1iZXIgb2YgcG9zaXRpdmUgcmVzdWx0czpcXG48L2I+XFxuPC9sYWJlbD5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtbGctNyBjb2wtc20tNlxcXCI+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzRfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWyYjMzk7dGhyZXNob2xkJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfNFxcXCIgbWluPVxcXCIxXFxcIiB0eXBlPVxcXCJudW1iZXJcXFwiIHZhbHVlPVxcXCIxXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O3RocmVzaG9sZCYjMzk7XVxcXCIgaWQ9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzRfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48bGVnZW5kPkltYWdlIEFubm90YXRpb248L2xlZ2VuZD5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvd1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtbGctNSBjb2wtc20tNiB0ZXh0X19hbGxpZ24tLWxlZnRcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTthbm5vdGF0aW9uX3JlcGxpY2EmIzM5O119XFxcIiBmb3I9XFxcImNyZWF0ZS1jYW1wYWlnbi1mb3JtX2ZpZWxkXzBcXFwiPlxcbjxiPlxcbk1pbmltdW0gbnVtYmVyIG9mIHdvcmtlcnMgcGVyIGltYWdlOlxcbjwvYj5cXG48L2xhYmVsPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1sZy03IGNvbC1zbS02XFxcIj5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMF9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTthbm5vdGF0aW9uX3JlcGxpY2EmIzM5O11cXFwiIGlkPVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8wXFxcIiBtaW49XFxcIjFcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgdmFsdWU9XFxcIjFcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7YW5ub3RhdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMF9lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgcm93XFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7YW5ub3RhdGlvbl9zaXplJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1sZy01IGNvbC1zbS02IHRleHRfX2FsbGlnbi0tbGVmdFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7YW5ub3RhdGlvbl9zaXplJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fc2l6ZSYjMzk7XX1cXFwiIGZvcj1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMVxcXCI+XFxuPGI+XFxuV2lkdGgoaW4gcGl4ZWxzKSBvZiB0aGUgYW5ub3RhdGlvbiBsaW5lOlxcbjwvYj5cXG48L2xhYmVsPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1sZy03IGNvbC1zbS02XFxcIj5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMV9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTthbm5vdGF0aW9uX3NpemUmIzM5O11cXFwiIGlkPVxcXCJjcmVhdGUtY2FtcGFpZ24tZm9ybV9maWVsZF8xXFxcIiBtYXg9XFxcIjMwXFxcIiBtaW49XFxcIjFcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgdmFsdWU9XFxcIjFcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7YW5ub3RhdGlvbl9zaXplJiMzOTtdXFxcIiBpZD1cXFwiY3JlYXRlLWNhbXBhaWduLWZvcm1fZmllbGRfMV9lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZm9ybT5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbjxkaXYgY2xhc3M9XFxcInRleHQtY2VudGVyIG1hcmdpbl9fdG9wLS0yMHB4XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsICYjMzk7Y2FtcGFpZ24tY3JlYXRlLXN1Ym1pdCYjMzk7KVxcXCI+XFxuQ1JFQVRFXFxuPC9hPlxcbjxicj5cXG48aHIgY2xhc3M9XFxcInNlcGFyYXRvciBtYXJnaW5fX2NlbnRlclxcXCI+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9maWVsZHNldD5cXG48L2Rpdj5cXG48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcbiAgICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHNlbGYuZmllbGRzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG4gICAgc2VsZi5lcnJvcnMgPSBrby5vYnNlcnZhYmxlKHt9KTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQsIHNlbGYub3V0cHV0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2NyZWF0ZS1jYW1wYWlnbi1mb3JtJztcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAoZXJyb3JzX3NlbnQsZmllbGRzX3NlbnQpIHtcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChmaWVsZHNfc2VudCkpe1xuICAgICAgICB0aGlzLmZpZWxkcygpWydhbm5vdGF0aW9uX3JlcGxpY2EnXShmaWVsZHNfc2VudC5hbm5vdGF0aW9uX3JlcGxpY2EpO1xuICAgICAgICB0aGlzLmZpZWxkcygpWydhbm5vdGF0aW9uX3NpemUnXShmaWVsZHNfc2VudC5hbm5vdGF0aW9uX3NpemUpO1xuICAgICAgICB0aGlzLmZpZWxkcygpWyduYW1lJ10oZmllbGRzX3NlbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ3NlbGVjdGlvbl9yZXBsaWNhJ10oZmllbGRzX3NlbnQuc2VsZWN0aW9uX3JlcGxpY2EpO1xuICAgICAgICB0aGlzLmZpZWxkcygpWyd0aHJlc2hvbGQnXShmaWVsZHNfc2VudC50aHJlc2hvbGQpO1xuICAgIH1cbiAgICB0aGlzLmVycm9ycygpWydhbm5vdGF0aW9uX3JlcGxpY2EnXShlcnJvcnNfc2VudC5hbm5vdGF0aW9uX3JlcGxpY2EpO1xuICAgIHRoaXMuZXJyb3JzKClbJ2Fubm90YXRpb25fc2l6ZSddKGVycm9yc19zZW50LmFubm90YXRpb25fc2l6ZSk7XG4gICAgdGhpcy5lcnJvcnMoKVsnbmFtZSddKGVycm9yc19zZW50Lm5hbWUpO1xuICAgIHRoaXMuZXJyb3JzKClbJ3NlbGVjdGlvbl9yZXBsaWNhJ10oZXJyb3JzX3NlbnQuc2VsZWN0aW9uX3JlcGxpY2EpO1xuICAgIHRoaXMuZXJyb3JzKClbJ3RocmVzaG9sZCddKGVycm9yc19zZW50LnRocmVzaG9sZCk7XG4gICAgdGhpcy5lcnJvcnMoKVsnb3RoZXJzJ10oZXJyb3JzX3NlbnQub3RoZXJzKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXRwdXQgPSB7XG4gICAgICAgICdhbm5vdGF0aW9uX3JlcGxpY2EnOiB0aGlzLmlucHV0Wydhbm5vdGF0aW9uX3JlcGxpY2EnXSxcbiAgICAgICAgJ2Fubm90YXRpb25fc2l6ZSc6IHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fc2l6ZSddLFxuICAgICAgICAnbmFtZSc6IHRoaXMuaW5wdXRbJ25hbWUnXSxcbiAgICAgICAgJ3NlbGVjdGlvbl9yZXBsaWNhJzogdGhpcy5pbnB1dFsnc2VsZWN0aW9uX3JlcGxpY2EnXSxcbiAgICAgICAgJ3RocmVzaG9sZCc6IHRoaXMuaW5wdXRbJ3RocmVzaG9sZCddLFxuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICdhbm5vdGF0aW9uX3JlcGxpY2EnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fcmVwbGljYSddKSxcbiAgICAgICAgICAgICdhbm5vdGF0aW9uX3NpemUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fc2l6ZSddKSxcbiAgICAgICAgICAgICduYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WyduYW1lJ10pLFxuICAgICAgICAgICAgJ3NlbGVjdGlvbl9yZXBsaWNhJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydzZWxlY3Rpb25fcmVwbGljYSddKSxcbiAgICAgICAgICAgICd0aHJlc2hvbGQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3RocmVzaG9sZCddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ2Fubm90YXRpb25fcmVwbGljYSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbl9yZXBsaWNhLWVycm9yJ10pLFxuICAgICAgICAgICAgJ2Fubm90YXRpb25fc2l6ZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbl9zaXplLWVycm9yJ10pLFxuICAgICAgICAgICAgJ25hbWUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ25hbWUtZXJyb3InXSksXG4gICAgICAgICAgICAnc2VsZWN0aW9uX3JlcGxpY2EnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3NlbGVjdGlvbl9yZXBsaWNhLWVycm9yJ10pLFxuICAgICAgICAgICAgJ3RocmVzaG9sZCc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsndGhyZXNob2xkLWVycm9yJ10pLFxuICAgICAgICAgICAgJ290aGVycyc6IGtvLm9ic2VydmFibGUoKSxcbiAgICAgICAgfTtcbiAgICBmaWVsZHNbJ2Fubm90YXRpb25fcmVwbGljYSddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ2Fubm90YXRpb25fcmVwbGljYSddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ2Fubm90YXRpb25fcmVwbGljYSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWydhbm5vdGF0aW9uX3NpemUnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wydhbm5vdGF0aW9uX3NpemUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydhbm5vdGF0aW9uX3NpemUnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGZpZWxkc1snbmFtZSddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ25hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyduYW1lJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ3NlbGVjdGlvbl9yZXBsaWNhJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnc2VsZWN0aW9uX3JlcGxpY2EnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydzZWxlY3Rpb25fcmVwbGljYSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWyd0aHJlc2hvbGQnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wyd0aHJlc2hvbGQnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyd0aHJlc2hvbGQnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5lcnJvcnMoZXJyb3JzKTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsZXJyb3JzLGZpZWxkcykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGVycm9ycyA9IGVycm9ycyB8fCB7fTtcbiAgICBmaWVsZHMgPSBmaWVsZHMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICBzZWxmLmZpbGwoZXJyb3JzLGZpZWxkcyk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWNyZWF0ZS1jYW1wYWlnbi1mb3JtJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHsgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG4gIDwhLS0gY3JlYXRlLWNhbXBhaWduLWZvcm0gLS0+XFxuICA8Yy1jcmVhdGUtY2FtcGFpZ24tZm9ybSBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPlxcbiAgPC9jLWNyZWF0ZS1jYW1wYWlnbi1mb3JtPlxcbjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2NyZWF0ZS1jYW1wYWlnbi12aWV3JztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2NyZWF0ZS1jYW1wYWlnbi1mb3JtJyAvLyBjcmVhdGUtY2FtcGFpZ24tZm9ybVxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWNyZWF0ZS1jYW1wYWlnbi12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG48ZGl2IGNsYXNzPVxcXCJ3ZWxsIGNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMiBjb2wtc20tMTAgY29sLXNtLW9mZnNldC0xXFxcIj5cXG48ZmllbGRzZXQ+XFxuPGxlZ2VuZCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPlxcbjxiPlxcbkVkaXQgeW91ciBDYW1wYWlnbiFcXG48L2I+XFxuPC9sZWdlbmQ+XFxuPGZvcm0gY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O290aGVycyYjMzk7XX1cXFwiPlxcbjxoNSBjbGFzcz1cXFwiaGVscC1ibG9jayB0ZXh0LWNlbnRlclxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O290aGVycyYjMzk7XVxcXCIgaWQ9XFxcImxvZ2luLWZvcm1fZmllbGRfZXJyb3JcXFwiPjwvaDU+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O25hbWUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLWxnLTUgY29sLXNtLTQgdGV4dF9fYWxsaWduLS1sZWZ0XFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtuYW1lJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O25hbWUmIzM5O119XFxcIiBmb3I9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8yXFxcIj5cXG48Yj5cXG5OYW1lIG9mIGNhbXBhaWduOlxcbjwvYj5cXG48L2xhYmVsPlxcbjxkaXYgY2xhc3M9XFxcImNvbC1sZy03IGNvbC1zbS04XFxcIj5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwiZWRpdC1jYW1wYWlnbi1mb3JtX2ZpZWxkXzJfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWyYjMzk7bmFtZSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8yXFxcIiBwbGFjZWhvbGRlcj1cXFwiQSBnb29kIG5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7bmFtZSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8yX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPGxlZ2VuZD5JbWFnZSBTZWxlY3Rpb248L2xlZ2VuZD5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvd1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3NlbGVjdGlvbl9yZXBsaWNhJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1sZy01IGNvbC1zbS02IHRleHRfX2FsbGlnbi0tbGVmdFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7c2VsZWN0aW9uX3JlcGxpY2EmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7c2VsZWN0aW9uX3JlcGxpY2EmIzM5O119XFxcIiBmb3I9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8zXFxcIj5cXG48Yj5cXG5NaW5pbXVtIG51bWJlciBvZiB3b3JrZXJzIHBlciBpbWFnZTpcXG48L2I+XFxuPC9sYWJlbD5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtbGctNyBjb2wtc20tNlxcXCI+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8zX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O3NlbGVjdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiZWRpdC1jYW1wYWlnbi1mb3JtX2ZpZWxkXzNcXFwiIG1pbj1cXFwiMVxcXCIgdHlwZT1cXFwibnVtYmVyXFxcIiB2YWx1ZT1cXFwiMVxcXCI+XFxuPHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JzKClbJiMzOTtzZWxlY3Rpb25fcmVwbGljYSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8zX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCByb3dcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTt0aHJlc2hvbGQmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLWxnLTUgY29sLXNtLTYgdGV4dF9fYWxsaWduLS1sZWZ0XFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTt0aHJlc2hvbGQmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7dGhyZXNob2xkJiMzOTtdfVxcXCIgZm9yPVxcXCJlZGl0LWNhbXBhaWduLWZvcm1fZmllbGRfNFxcXCI+XFxuPGI+XFxuTWluaW11bSBudW1iZXIgb2YgcG9zaXRpdmUgcmVzdWx0czpcXG48L2I+XFxuPC9sYWJlbD5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtbGctNyBjb2wtc20tNlxcXCI+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF80X2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O3RocmVzaG9sZCYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF80XFxcIiBtaW49XFxcIjFcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgdmFsdWU9XFxcIjFcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7dGhyZXNob2xkJiMzOTtdXFxcIiBpZD1cXFwiZWRpdC1jYW1wYWlnbi1mb3JtX2ZpZWxkXzRfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48bGVnZW5kPkltYWdlIEFubm90YXRpb248L2xlZ2VuZD5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvd1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtbGctNSBjb2wtc20tNiB0ZXh0X19hbGxpZ24tLWxlZnRcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTthbm5vdGF0aW9uX3JlcGxpY2EmIzM5O119XFxcIiBmb3I9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8wXFxcIj5cXG48Yj5cXG5NaW5pbXVtIG51bWJlciBvZiB3b3JrZXJzIHBlciBpbWFnZTpcXG48L2I+XFxuPC9sYWJlbD5cXG48ZGl2IGNsYXNzPVxcXCJjb2wtbGctNyBjb2wtc20tNlxcXCI+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8wX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O2Fubm90YXRpb25fcmVwbGljYSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8wXFxcIiBtaW49XFxcIjFcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgdmFsdWU9XFxcIjFcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7YW5ub3RhdGlvbl9yZXBsaWNhJiMzOTtdXFxcIiBpZD1cXFwiZWRpdC1jYW1wYWlnbi1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvd1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fc2l6ZSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtbGctNSBjb2wtc20tNiB0ZXh0X19hbGxpZ24tLWxlZnRcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O2Fubm90YXRpb25fc2l6ZSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTthbm5vdGF0aW9uX3NpemUmIzM5O119XFxcIiBmb3I9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8xXFxcIj5cXG48Yj5cXG5XaWR0aChpbiBwaXhlbHMpIG9mIHRoZSBhbm5vdGF0aW9uIGxpbmU6XFxuPC9iPlxcbjwvbGFiZWw+XFxuPGRpdiBjbGFzcz1cXFwiY29sLWxnLTcgY29sLXNtLTZcXFwiPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJlZGl0LWNhbXBhaWduLWZvcm1fZmllbGRfMV9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTthbm5vdGF0aW9uX3NpemUmIzM5O11cXFwiIGlkPVxcXCJlZGl0LWNhbXBhaWduLWZvcm1fZmllbGRfMVxcXCIgbWF4PVxcXCIzMFxcXCIgbWluPVxcXCIxXFxcIiB0eXBlPVxcXCJudW1iZXJcXFwiIHZhbHVlPVxcXCIxXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O2Fubm90YXRpb25fc2l6ZSYjMzk7XVxcXCIgaWQ9XFxcImVkaXQtY2FtcGFpZ24tZm9ybV9maWVsZF8xX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9mb3JtPlxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuPGRpdiBjbGFzcz1cXFwidGV4dC1jZW50ZXIgbWFyZ2luX190b3AtLTIwcHhcXFwiPlxcbjxhIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwgJiMzOTtjYW1wYWlnbi1lZGl0LXN1Ym1pdCYjMzk7KVxcXCI+XFxuRURJVFxcbjwvYT5cXG48YnI+XFxuPHAgY2xhc3M9XFxcIm1hcmdpbl9fdG9wLS0xMHB4XFxcIj5cXG5JIHdhbnQgdG8gdXBsb2FkIGltYWdlcyxcXG48YSBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTtpbWFnZS11cGxvYWQtZ28mIzM5OylcXFwiPlxcbkltYWdlcyBVcGxvYWRcXG48L2E+XFxuPC9wPlxcbjxwIGNsYXNzPVxcXCJtYXJnaW5fX3RvcC0tMTBweFxcXCI+XFxuSSB3YW50IHRvIHNlbGVjdCB3b3JrZXJzLFxcbjxhIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O3dvcmtlci1zZWxlY3QtZ28mIzM5OylcXFwiPlxcblNlbGVjdCBXb3JrZXJcXG48L2E+XFxuPC9wPlxcbjxociBjbGFzcz1cXFwic2VwYXJhdG9yIG1hcmdpbl9fY2VudGVyXFxcIj5cXG48L2Rpdj5cXG48L2Rpdj5cXG48L2ZpZWxkc2V0PlxcbjwvZGl2Plxcbjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuICAgIHNlbGYuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgc2VsZi5maWVsZHMgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICBzZWxmLmVycm9ycyA9IGtvLm9ic2VydmFibGUoe30pO1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgc2VsZi5vdXRwdXQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIChlcnJvcnNfc2VudCxmaWVsZHNfc2VudCkge1xuICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KGZpZWxkc19zZW50KSl7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ2Fubm90YXRpb25fcmVwbGljYSddKGZpZWxkc19zZW50LmFubm90YXRpb25fcmVwbGljYSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ2Fubm90YXRpb25fc2l6ZSddKGZpZWxkc19zZW50LmFubm90YXRpb25fc2l6ZSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ25hbWUnXShmaWVsZHNfc2VudC5uYW1lKTtcbiAgICAgICAgdGhpcy5maWVsZHMoKVsnc2VsZWN0aW9uX3JlcGxpY2EnXShmaWVsZHNfc2VudC5zZWxlY3Rpb25fcmVwbGljYSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ3RocmVzaG9sZCddKGZpZWxkc19zZW50LnRocmVzaG9sZCk7XG4gICAgICAgIHRoaXMub3V0cHV0LmlkID0gZmllbGRzX3NlbnQuaWQ7XG4gICAgfVxuICAgIHRoaXMuZXJyb3JzKClbJ2Fubm90YXRpb25fcmVwbGljYSddKGVycm9yc19zZW50LmFubm90YXRpb25fcmVwbGljYSk7XG4gICAgdGhpcy5lcnJvcnMoKVsnYW5ub3RhdGlvbl9zaXplJ10oZXJyb3JzX3NlbnQuYW5ub3RhdGlvbl9zaXplKTtcbiAgICB0aGlzLmVycm9ycygpWyduYW1lJ10oZXJyb3JzX3NlbnQubmFtZSk7XG4gICAgdGhpcy5lcnJvcnMoKVsnc2VsZWN0aW9uX3JlcGxpY2EnXShlcnJvcnNfc2VudC5zZWxlY3Rpb25fcmVwbGljYSk7XG4gICAgdGhpcy5lcnJvcnMoKVsndGhyZXNob2xkJ10oZXJyb3JzX3NlbnQudGhyZXNob2xkKTtcbiAgICB0aGlzLmVycm9ycygpWydvdGhlcnMnXShlcnJvcnNfc2VudC5vdGhlcnMpO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdlZGl0LWNhbXBhaWduLWZvcm0nO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXRwdXQgPSB7XG4gICAgICAgICdhbm5vdGF0aW9uX3JlcGxpY2EnOiB0aGlzLmlucHV0Wydhbm5vdGF0aW9uX3JlcGxpY2EnXSxcbiAgICAgICAgJ2Fubm90YXRpb25fc2l6ZSc6IHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fc2l6ZSddLFxuICAgICAgICAnbmFtZSc6IHRoaXMuaW5wdXRbJ25hbWUnXSxcbiAgICAgICAgJ3NlbGVjdGlvbl9yZXBsaWNhJzogdGhpcy5pbnB1dFsnc2VsZWN0aW9uX3JlcGxpY2EnXSxcbiAgICAgICAgJ3RocmVzaG9sZCc6IHRoaXMuaW5wdXRbJ3RocmVzaG9sZCddLFxuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICdhbm5vdGF0aW9uX3JlcGxpY2EnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fcmVwbGljYSddKSxcbiAgICAgICAgICAgICdhbm5vdGF0aW9uX3NpemUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2Fubm90YXRpb25fc2l6ZSddKSxcbiAgICAgICAgICAgICduYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WyduYW1lJ10pLFxuICAgICAgICAgICAgJ3NlbGVjdGlvbl9yZXBsaWNhJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydzZWxlY3Rpb25fcmVwbGljYSddKSxcbiAgICAgICAgICAgICd0aHJlc2hvbGQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3RocmVzaG9sZCddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ2Fubm90YXRpb25fcmVwbGljYSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbl9yZXBsaWNhLWVycm9yJ10pLFxuICAgICAgICAgICAgJ2Fubm90YXRpb25fc2l6ZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbl9zaXplLWVycm9yJ10pLFxuICAgICAgICAgICAgJ25hbWUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ25hbWUtZXJyb3InXSksXG4gICAgICAgICAgICAnc2VsZWN0aW9uX3JlcGxpY2EnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3NlbGVjdGlvbl9yZXBsaWNhLWVycm9yJ10pLFxuICAgICAgICAgICAgJ3RocmVzaG9sZCc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsndGhyZXNob2xkLWVycm9yJ10pLFxuICAgICAgICAgICAgJ290aGVycyc6IGtvLm9ic2VydmFibGUoKSxcbiAgICAgICAgfTtcbiAgICBmaWVsZHNbJ2Fubm90YXRpb25fcmVwbGljYSddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ2Fubm90YXRpb25fcmVwbGljYSddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ2Fubm90YXRpb25fcmVwbGljYSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWydhbm5vdGF0aW9uX3NpemUnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wydhbm5vdGF0aW9uX3NpemUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydhbm5vdGF0aW9uX3NpemUnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGZpZWxkc1snbmFtZSddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ25hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyduYW1lJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ3NlbGVjdGlvbl9yZXBsaWNhJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnc2VsZWN0aW9uX3JlcGxpY2EnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydzZWxlY3Rpb25fcmVwbGljYSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWyd0aHJlc2hvbGQnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wyd0aHJlc2hvbGQnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyd0aHJlc2hvbGQnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5lcnJvcnMoZXJyb3JzKTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsZXJyb3JzLGZpZWxkcykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGVycm9ycyA9IGVycm9ycyB8fCB7fTtcbiAgICBmaWVsZHMgPSBmaWVsZHMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICBzZWxmLmZpbGwoZXJyb3JzLGZpZWxkcyk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWVkaXQtY2FtcGFpZ24tZm9ybScsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+ICAgIFxcbiAgPCEtLSBlZGl0LWNhbXBhaWduLWZvcm0gLS0+ICAgIFxcbiAgPGMtZWRpdC1jYW1wYWlnbi1mb3JtIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+XFxuICA8L2MtZWRpdC1jYW1wYWlnbi1mb3JtPlxcbjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2VkaXQtY2FtcGFpZ24tdmlldyc7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW1xuICAgICdlZGl0LWNhbXBhaWduLWZvcm0nIC8vIGVkaXQtY2FtcGFpZ24tZm9ybVxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWVkaXQtY2FtcGFpZ24tdmlldycsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+ICAgIDxhIGNsYXNzPVxcXCJidG5cXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwnbG9naW4tYnRuLXByZXNzZWQnKVxcXCI+bG9naW4tYnRuLXByZXNzZWQ8L2E+ICAgIDxhIGNsYXNzPVxcXCJidG5cXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwncmVnaXN0ZXItYnRuLXByZXNzZWQnKVxcXCI+cmVnaXN0ZXItYnRuLXByZXNzZWQ8L2E+ICAgIDxhIGNsYXNzPVxcXCJidG5cXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwnbG9nb3V0JylcXFwiPmxvZ291dDwvYT4gICAgPGEgY2xhc3M9XFxcImJ0blxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCdhY2NvdW50LWVkaXQtZ28nKVxcXCI+YWNjb3VudC1lZGl0LWdvPC9hPjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2hvbWUtYmFyJztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWhvbWUtYmFyJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8aDM+aW1hZ2UtYW5ub3RhdGlvbi1mb3JtPC9oMz48Zm9ybT4gICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsnaGFzLWVycm9yJzogZXJyb3JzKClbJ2Fubm90YXRpb24nXX1cXFwiPiAgICAgICAgPGxhYmVsIGZvcj1cXFwiaW1hZ2UtYW5ub3RhdGlvbi1mb3JtX2ZpZWxkXzBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsnYW5ub3RhdGlvbiddfSwgYXR0cjogeydkYXRhLWVycm9yJzogZXJyb3JzKClbJ2Fubm90YXRpb24nXX1cXFwiIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIj5hbm5vdGF0aW9uPC9sYWJlbD4gICAgICAgIDxpbnB1dCBpZD1cXFwiaW1hZ2UtYW5ub3RhdGlvbi1mb3JtX2ZpZWxkXzBcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWydhbm5vdGF0aW9uJ11cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGFyaWEtZGVzY3JpYmVkYnk9XFxcImltYWdlLWFubm90YXRpb24tZm9ybV9maWVsZF8wX2Vycm9yXFxcIj4gICAgICAgIDxzcGFuIGlkPVxcXCJpbWFnZS1hbm5vdGF0aW9uLWZvcm1fZmllbGRfMF9lcnJvclxcXCIgY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JzKClbJ2Fubm90YXRpb24nXVxcXCI+PC9zcGFuPiAgICA8L2Rpdj48L2Zvcm0+PGRpdiBjbGFzcz1cXFwicm93XFxcIj4gICAgPGEgY2xhc3M9XFxcImNvbC14cy0yIGJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCAnaW1hZ2UtYW5ub3RhdGlvbi1zdWJtaXQnKVxcXCI+aW1hZ2UtYW5ub3RhdGlvbi1zdWJtaXQ8L2E+PC9kaXY+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLmZpZWxkcyA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHNlbGYuZXJyb3JzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCBzZWxmLm91dHB1dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdpbWFnZS1hbm5vdGF0aW9uLWZvcm0nO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXRwdXQgPSB7XG4gICAgICAgICdhbm5vdGF0aW9uJzogdGhpcy5pbnB1dFsnYW5ub3RhdGlvbiddLFxuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICdhbm5vdGF0aW9uJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0Wydhbm5vdGF0aW9uJ10pLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvcnMgPSB7XG4gICAgICAgICAgICAnYW5ub3RhdGlvbic6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYW5ub3RhdGlvbi1lcnJvciddKSxcbiAgICAgICAgfTtcbiAgICBmaWVsZHNbJ2Fubm90YXRpb24nXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wydhbm5vdGF0aW9uJ10gPSB2YWx1ZTtcbiAgICAgICAgc2VsZi5lcnJvcnMoKVsnYW5ub3RhdGlvbiddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgdGhpcy5maWVsZHMoZmllbGRzKTtcbiAgICB0aGlzLmVycm9ycyhlcnJvcnMpO1xuICAgIHRoaXMuc3RhdHVzKCdjb21wdXRlZCcpO1xufTtcblxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMub3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmllbGRzKHt9KTtcbiAgICB0aGlzLmVycm9ycyh7fSk7XG4gICAgdGhpcy5pbnB1dCA9IG9wdGlvbnMuaW5wdXQgfHwge307XG4gICAgdGhpcy5zdGF0dXMoJ3JlYWR5Jyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX2luaXRpYWxpemluZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fY29tcHV0ZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgc2VsZi5faW5pdGlhbGl6aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1pbWFnZS1hbm5vdGF0aW9uLWZvcm0nLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkgeyBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzcGFuPiAgICA8IS0tIGltYWdlLWFubm90YXRpb24tZm9ybSAtLT4gICAgPGMtaW1hZ2UtYW5ub3RhdGlvbi1mb3JtIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWltYWdlLWFubm90YXRpb24tZm9ybT48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdpbWFnZS1hbm5vdGF0aW9uJztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2ltYWdlLWFubm90YXRpb24tZm9ybScgLy8gaW1hZ2UtYW5ub3RhdGlvbi1mb3JtXG5dO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtaW1hZ2UtYW5ub3RhdGlvbicsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGgzPmltYWdlLXNlbGVjdGlvbi1mb3JtPC9oMz48Zm9ybT4gICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsnaGFzLWVycm9yJzogZXJyb3JzKClbJ2FjY2VwdGVkJ119XFxcIj4gICAgICAgIDxsYWJlbCBmb3I9XFxcImltYWdlLXNlbGVjdGlvbi1mb3JtX2ZpZWxkXzBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsnYWNjZXB0ZWQnXX0sIGF0dHI6IHsnZGF0YS1lcnJvcic6IGVycm9ycygpWydhY2NlcHRlZCddfVxcXCIgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiPmFjY2VwdGVkPC9sYWJlbD4gICAgICAgIDxpbnB1dCBpZD1cXFwiaW1hZ2Utc2VsZWN0aW9uLWZvcm1fZmllbGRfMFxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJ2FjY2VwdGVkJ11cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGFyaWEtZGVzY3JpYmVkYnk9XFxcImltYWdlLXNlbGVjdGlvbi1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiPiAgICAgICAgPHNwYW4gaWQ9XFxcImltYWdlLXNlbGVjdGlvbi1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWydhY2NlcHRlZCddXFxcIj48L3NwYW4+ICAgIDwvZGl2PjwvZm9ybT48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPiAgICA8YSBjbGFzcz1cXFwiY29sLXhzLTIgYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsICdpbWFnZS1zZWxlY3Rpb24tc3VibWl0JylcXFwiPmltYWdlLXNlbGVjdGlvbi1zdWJtaXQ8L2E+PC9kaXY+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLmZpZWxkcyA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHNlbGYuZXJyb3JzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCBzZWxmLm91dHB1dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdpbWFnZS1zZWxlY3Rpb24tZm9ybSc7XG5cblZpZXdNb2RlbC5wcm90b3R5cGUud2FpdEZvclN0YXR1c0NoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5pdGlhbGl6aW5nIHx8XG4gICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5fY29tcHV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm91dHB1dCA9IHtcbiAgICAgICAgJ2FjY2VwdGVkJzogdGhpcy5pbnB1dFsnYWNjZXB0ZWQnXSxcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmaWVsZHMgPSB7XG4gICAgICAgICAgICAnYWNjZXB0ZWQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2FjY2VwdGVkJ10pLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvcnMgPSB7XG4gICAgICAgICAgICAnYWNjZXB0ZWQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2FjY2VwdGVkLWVycm9yJ10pLFxuICAgICAgICB9O1xuICAgIGZpZWxkc1snYWNjZXB0ZWQnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0WydhY2NlcHRlZCddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ2FjY2VwdGVkJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICB0aGlzLmZpZWxkcyhmaWVsZHMpO1xuICAgIHRoaXMuZXJyb3JzKGVycm9ycyk7XG4gICAgdGhpcy5zdGF0dXMoJ2NvbXB1dGVkJyk7XG59O1xuXG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWVsZHMoe30pO1xuICAgIHRoaXMuZXJyb3JzKHt9KTtcbiAgICB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWltYWdlLXNlbGVjdGlvbi1mb3JtJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHsgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj4gICAgPCEtLSBpbWFnZS1zZWxlY3Rpb24tZm9ybSAtLT4gICAgPGMtaW1hZ2Utc2VsZWN0aW9uLWZvcm0gcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtaW1hZ2Utc2VsZWN0aW9uLWZvcm0+PC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBzZWxmLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKXtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gb3B0aW9ucy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tjaGlsZF0uaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnaW1hZ2Utc2VsZWN0aW9uJztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2ltYWdlLXNlbGVjdGlvbi1mb3JtJyAvLyBpbWFnZS1zZWxlY3Rpb24tZm9ybVxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWltYWdlLXNlbGVjdGlvbicsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGgzPmltYWdlLXVwbG9hZC1mb3JtPC9oMz48Zm9ybT4gICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsnaGFzLWVycm9yJzogZXJyb3JzKClbJ2ltYWdlJ119XFxcIj4gICAgICAgIDxsYWJlbCBmb3I9XFxcImltYWdlLXVwbG9hZC1mb3JtX2ZpZWxkXzBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsnaW1hZ2UnXX0sIGF0dHI6IHsnZGF0YS1lcnJvcic6IGVycm9ycygpWydpbWFnZSddfVxcXCIgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiPmltYWdlPC9sYWJlbD4gICAgICAgIDxpbnB1dCBpZD1cXFwiaW1hZ2UtdXBsb2FkLWZvcm1fZmllbGRfMFxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJ2ltYWdlJ11cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGFyaWEtZGVzY3JpYmVkYnk9XFxcImltYWdlLXVwbG9hZC1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiPiAgICAgICAgPHNwYW4gaWQ9XFxcImltYWdlLXVwbG9hZC1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWydpbWFnZSddXFxcIj48L3NwYW4+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeydoYXMtZXJyb3InOiBlcnJvcnMoKVsnbmFtZSddfVxcXCI+ICAgICAgICA8bGFiZWwgZm9yPVxcXCJpbWFnZS11cGxvYWQtZm9ybV9maWVsZF8xXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJ25hbWUnXX0sIGF0dHI6IHsnZGF0YS1lcnJvcic6IGVycm9ycygpWyduYW1lJ119XFxcIiBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCI+bmFtZTwvbGFiZWw+ICAgICAgICA8aW5wdXQgaWQ9XFxcImltYWdlLXVwbG9hZC1mb3JtX2ZpZWxkXzFcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWyduYW1lJ11cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGFyaWEtZGVzY3JpYmVkYnk9XFxcImltYWdlLXVwbG9hZC1mb3JtX2ZpZWxkXzFfZXJyb3JcXFwiPiAgICAgICAgPHNwYW4gaWQ9XFxcImltYWdlLXVwbG9hZC1mb3JtX2ZpZWxkXzFfZXJyb3JcXFwiIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyduYW1lJ11cXFwiPjwvc3Bhbj4gICAgPC9kaXY+PC9mb3JtPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+ICAgIDxhIGNsYXNzPVxcXCJjb2wteHMtMiBidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwgJ2ltYWdlLXVwbG9hZC1zdWJtaXQnKVxcXCI+aW1hZ2UtdXBsb2FkLXN1Ym1pdDwvYT48L2Rpdj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcbiAgICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHNlbGYuZmllbGRzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG4gICAgc2VsZi5lcnJvcnMgPSBrby5vYnNlcnZhYmxlKHt9KTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQsIHNlbGYub3V0cHV0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2ltYWdlLXVwbG9hZC1mb3JtJztcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0cHV0ID0ge1xuICAgICAgICAnaW1hZ2UnOiB0aGlzLmlucHV0WydpbWFnZSddLFxuICAgICAgICAnbmFtZSc6IHRoaXMuaW5wdXRbJ25hbWUnXSxcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmaWVsZHMgPSB7XG4gICAgICAgICAgICAnaW1hZ2UnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2ltYWdlJ10pLFxuICAgICAgICAgICAgJ25hbWUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ25hbWUnXSksXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9ycyA9IHtcbiAgICAgICAgICAgICdpbWFnZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnaW1hZ2UtZXJyb3InXSksXG4gICAgICAgICAgICAnbmFtZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnbmFtZS1lcnJvciddKSxcbiAgICAgICAgfTtcbiAgICBmaWVsZHNbJ2ltYWdlJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnaW1hZ2UnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydpbWFnZSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWyduYW1lJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnbmFtZSddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ25hbWUnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5lcnJvcnMoZXJyb3JzKTtcbiAgICB0aGlzLnN0YXR1cygnY29tcHV0ZWQnKTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLm91dHB1dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpZWxkcyh7fSk7XG4gICAgdGhpcy5lcnJvcnMoe30pO1xuICAgIHRoaXMuaW5wdXQgPSBvcHRpb25zLmlucHV0IHx8IHt9O1xuICAgIHRoaXMuc3RhdHVzKCdyZWFkeScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9pbml0aWFsaXppbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2NvbXB1dGUoKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHNlbGYuX2luaXRpYWxpemluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSwgMSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtaW1hZ2UtdXBsb2FkLWZvcm0nLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkgeyBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzcGFuPiAgICA8IS0tIGltYWdlLXVwbG9hZC1mb3JtIC0tPiAgICA8Yy1pbWFnZS11cGxvYWQtZm9ybSBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1pbWFnZS11cGxvYWQtZm9ybT4gICAgPGEgY2xhc3M9XFxcImNvbC14cy0yIGJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCdtYW5hZ2VyLWdvJylcXFwiPm1hbmFnZXItZ288L2E+PC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBzZWxmLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKXtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gb3B0aW9ucy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tjaGlsZF0uaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnaW1hZ2UtdXBsb2FkLXZpZXcnO1xuVmlld01vZGVsLnByb3RvdHlwZS5jaGlsZHJlbiA9IFtcbiAgICAnaW1hZ2UtdXBsb2FkLWZvcm0nIC8vIGltYWdlLXVwbG9hZC1mb3JtXG5dO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtaW1hZ2UtdXBsb2FkLXZpZXcnLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXSA9IFtdO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdLmZvckVhY2goZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwiLypqc2xpbnQgYnJvd3NlcjogdHJ1ZSAqL1xuLypnbG9iYWxzIGtvLCAkICovXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcbnZhciBsaW5lZnVuID0gKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd1NldFNpemUgPSB7XG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSgpO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGVsZW1lbnQuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0O1xuICAgICAgICAgICAgZWxlbWVudC53aWR0aCA9IHZhbHVlLndpZHRoO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd05hdHVyYWxTaXplID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpO1xuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgICAgIHZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGVsZW1lbnQubmF0dXJhbFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGVsZW1lbnQubmF0dXJhbEhlaWdodFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdsb2FkJywgdXBkYXRlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBrby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXcgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCksXG4gICAgICAgICAgICAgICAgY3R4ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICB5ID0gKGUucGFnZVkgLSAkZWxlbWVudC5vZmZzZXQoKS50b3ApIC8gJGVsZW1lbnQuaGVpZ2h0KCkgKiBlbGVtZW50LmhlaWdodDtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkcmF3KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbiA9IHBhcnNlSW50KCRlbGVtZW50LmRhdGEoJ3BlbicpLCAxMCkgfHwgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHkgPSAoZS5wYWdlWSAtICRlbGVtZW50Lm9mZnNldCgpLnRvcCkgLyAkZWxlbWVudC5oZWlnaHQoKSAqIGVsZW1lbnQuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHR4LCB0eSk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoMjU1LDAsMCknO1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gcGVuO1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZUNhcCA9ICdyb3VuZCc7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKHR4LCB0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGVuZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKCdtb3VzZW1vdmUnLCBkcmF3KTtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKCdtb3VzZXVwJywgZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUoZWxlbWVudC50b0RhdGFVUkwoJ2ltYWdlL3BuZycpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlbW92ZScsIGRyYXcpO1xuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9uKCdtb3VzZXVwJywgZW5kKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd1BlbiA9IHtcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpLFxuICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgICRlbGVtZW50LmRhdGEoJ3BlbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG59KCkpO1xuXG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zcmMgPSBwYXJhbXMuc3JjO1xuICAgIHNlbGYucGVuID0gcGFyYW1zLnBlbjtcbiAgICBzZWxmLmxpbmUgPSBwYXJhbXMubGluZTtcbiAgICBzZWxmLm5hdHVyYWxTaXplID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHNlbGYubGluZWZ1biA9IGxpbmVmdW47XG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgc2VsZi5vdXRwdXQpO1xuICAgIH07XG59XG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2xpbmUtZHJhd2VyJztcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdsaW5lLWRyYXdlcicsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiAnPGltZyBkYXRhLWJpbmQ9XCJhdHRyOiB7IHNyYzogc3JjIH0sIExpbmVEcmF3TmF0dXJhbFNpemU6IG5hdHVyYWxTaXplXCIgY2xhc3M9XCJiYWNrZ3JvdW5kXCIgZHJhZ2dhYmxlPVwiZmFsc2VcIj48Y2FudmFzIGRhdGEtYmluZD1cIkxpbmVEcmF3OiBsaW5lLCBMaW5lRHJhd1NldFNpemU6IG5hdHVyYWxTaXplLCBMaW5lRHJhd1BlbjogcGVuXCI+PC9jYW52YXM+JyxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxoMz5saXN0LWF2YWlsYWJsZS1hbm5vdGF0b3I8L2gzPjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtaG92ZXIgdGFibGUtY29uZGVuc2VkXFxcIj4gICAgPHRoZWFkPiAgICAgICAgPHRyPiAgICAgICAgICAgIDx0aD4jPC90aD4gICAgICAgICAgICA8dGg+ZnVsbG5hbWU8L3RoPiAgICAgICAgICAgIDx0aD5pZDwvdGg+ICAgICAgICA8L3RyPiAgICA8L3RoZWFkPiAgICA8dGJvZHkgZGF0YS1iaW5kPVxcXCJmb3JlYWNoOiBpdGVtc1xcXCI+ICAgICAgICA8dHIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5zZWxlY3RcXFwiPiAgICAgICAgICAgIDx0ZCBkYXRhLWJpbmQ9XFxcInRleHQ6IGlkXFxcIj48L3RkPiAgICAgICAgICAgIDx0ZCBkYXRhLWJpbmQ9XFxcInRleHQ6ICRkYXRhWydmdWxsbmFtZSddXFxcIiBzdHlsZT1cXFwid2hpdGUtc3BhY2U6IHByZS13cmFwXFxcIj48L3RkPiAgICAgICAgICAgIDx0ZCBkYXRhLWJpbmQ9XFxcInRleHQ6ICRkYXRhWydpZCddXFxcIiBzdHlsZT1cXFwid2hpdGUtc3BhY2U6IHByZS13cmFwXFxcIj48L3RkPiAgICAgICAgPC90cj4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLl9yZXBvc2l0b3J5ID0gcGFyYW1zLmNvbnRleHQucmVwb3NpdG9yaWVzWyd3b3JrZXJzJ107XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgIHNlbGYuaXRlbXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gICAgc2VsZi5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RlZCh0aGlzLmlkKTtcbiAgICAgICAgc2VsZi5vdXRwdXQgPSB0aGlzO1xuICAgICAgICBzZWxmLnRyaWdnZXIuY2FsbCh0aGlzLCAnYW5ub3RhdG9yLXN1Ym1pdC10by1jYW1wYWlnbicpO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCB0aGlzKTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2xpc3QtYXZhaWxhYmxlLWFubm90YXRvcic7XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuZmllbGRzID0ge1xuICAgIGlkOiAxXG4gICAgLCdmdWxsbmFtZSc6IDFcbiAgICAsJ2lkJzogMVxufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wdXRpbmcgfHxcbiAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6aW5nIHx8XG4gICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuVmlld01vZGVsLnByb3RvdHlwZS5fY29tcHV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jb21wdXRpbmcpIHtcbiAgICAgICAgdGhpcy5fY29tcHV0aW5nLmNhbmNlbCgpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fY29tcHV0aW5nID0gdGhpcy5fcmVwb3NpdG9yeS5maW5kKHRoaXMuZmlsdGVycywgdGhpcy5maWVsZHMpLnRoZW4oZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWQodW5kZWZpbmVkKTtcbiAgICAgICAgc2VsZi5pdGVtcyhpdGVtcyk7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWQoaXRlbXNbMF0uaWQpO1xuICAgICAgICAgICAgc2VsZi5vdXRwdXQgPSBpdGVtc1swXTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnN0YXR1cygnY29tcHV0ZWQnKTtcbiAgICAgICAgc2VsZi5fY29tcHV0aW5nID0gdW5kZWZpbmVkO1xuICAgIH0pO1xufTtcblxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMub3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsdGVycyA9IG9wdGlvbnMuaW5wdXQgfHwge307XG4gICAgdGhpcy5zdGF0dXMoJ3JlYWR5Jyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX2luaXRpYWxpemluZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fY29tcHV0ZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgc2VsZi5faW5pdGlhbGl6aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1saXN0LWF2YWlsYWJsZS1hbm5vdGF0b3InLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkgeyBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxoMz5saXN0LWF2YWlsYWJsZS13b3JrZXJzPC9oMz48dGFibGUgY2xhc3M9XFxcInRhYmxlIHRhYmxlLWhvdmVyIHRhYmxlLWNvbmRlbnNlZFxcXCI+ICAgIDx0aGVhZD4gICAgICAgIDx0cj4gICAgICAgICAgICA8dGg+IzwvdGg+ICAgICAgICAgICAgPHRoPmZ1bGxuYW1lPC90aD4gICAgICAgICAgICA8dGg+aWQ8L3RoPiAgICAgICAgPC90cj4gICAgPC90aGVhZD4gICAgPHRib2R5IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogaXRlbXNcXFwiPiAgICAgICAgPHRyIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQuc2VsZWN0XFxcIj4gICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBpZFxcXCI+PC90ZD4gICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVxcXCJ0ZXh0OiAkZGF0YVsnZnVsbG5hbWUnXVxcXCIgc3R5bGU9XFxcIndoaXRlLXNwYWNlOiBwcmUtd3JhcFxcXCI+PC90ZD4gICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVxcXCJ0ZXh0OiAkZGF0YVsnaWQnXVxcXCIgc3R5bGU9XFxcIndoaXRlLXNwYWNlOiBwcmUtd3JhcFxcXCI+PC90ZD4gICAgICAgIDwvdHI+ICAgICAgICA8L3Rib2R5PjwvdGFibGU+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5fcmVwb3NpdG9yeSA9IHBhcmFtcy5jb250ZXh0LnJlcG9zaXRvcmllc1snd29ya2VycyddO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuICAgIHNlbGYuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgc2VsZi5zZWxlY3RlZCA9IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICBzZWxmLml0ZW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblxuICAgIHNlbGYuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWQodGhpcy5pZCk7XG4gICAgICAgIHNlbGYub3V0cHV0ID0gdGhpcztcbiAgICAgICAgc2VsZi50cmlnZ2VyLmNhbGwodGhpcywgJ3dvcmtlci1zdWJtaXQtdG8tY2FtcGFpZ24nKTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgdGhpcyk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdsaXN0LWF2YWlsYWJsZS13b3JrZXJzJztcblxuVmlld01vZGVsLnByb3RvdHlwZS5maWVsZHMgPSB7XG4gICAgaWQ6IDFcbiAgICAsJ2Z1bGxuYW1lJzogMVxuICAgICwnaWQnOiAxXG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGluZyB8fFxuICAgICAgICAgICB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NvbXB1dGluZykge1xuICAgICAgICB0aGlzLl9jb21wdXRpbmcuY2FuY2VsKCk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9jb21wdXRpbmcgPSB0aGlzLl9yZXBvc2l0b3J5LmZpbmQodGhpcy5maWx0ZXJzLCB0aGlzLmZpZWxkcykudGhlbihmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RlZCh1bmRlZmluZWQpO1xuICAgICAgICBzZWxmLml0ZW1zKGl0ZW1zKTtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZChpdGVtc1swXS5pZCk7XG4gICAgICAgICAgICBzZWxmLm91dHB1dCA9IGl0ZW1zWzBdO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc3RhdHVzKCdjb21wdXRlZCcpO1xuICAgICAgICBzZWxmLl9jb21wdXRpbmcgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG59O1xuXG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLWxpc3QtYXZhaWxhYmxlLXdvcmtlcnMnLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkgeyBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxoMz5DYW1wYWlnbjwvaDM+XFxuPGRpdiBjbGFzcz1cXFwid2VsbFxcXCI+XFxuPHRhYmxlIGNsYXNzPVxcXCJ0YWJsZSB0YWJsZS1ob3ZlciB0YWJsZS1zdHJpcGVkXFxcIj5cXG48dGhlYWQ+XFxuPHRyPlxcbjx0aD4jPC90aD5cXG48dGg+TmFtZTwvdGg+XFxuPHRoPlN0YXR1czwvdGg+XFxuPHRoIGNsYXNzPVxcXCJ0ZXh0LXJpZ2h0XFxcIj5BY3Rpb25zPC90aD5cXG48dGg+PC90aD5cXG48L3RyPlxcbjwvdGhlYWQ+XFxuPHRib2R5IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogeyBkYXRhOiBpdGVtcywgYXM6ICYjMzk7aXRlbSYjMzk7IH1cXFwiPlxcbjx0cj5cXG48dGQgY2xhc3M9XFxcInZlcnRpY2FsX19taWRkbGVcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogKCRpbmRleCgpKzEpXFxcIj48L3RkPlxcbjx0ZCBjbGFzcz1cXFwidGV4dC1jYXBpdGFsaXplIHZlcnRpY2FsX19taWRkbGVcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogJGRhdGFbJiMzOTtuYW1lJiMzOTtdXFxcIiBzdHlsZT1cXFwid2hpdGUtc3BhY2U6IHByZS13cmFwXFxcIj48L3RkPlxcbjx0ZCBjbGFzcz1cXFwidGV4dC1jYXBpdGFsaXplIHZlcnRpY2FsX19taWRkbGVcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogJGRhdGFbJiMzOTtzdGF0dXMmIzM5O11cXFwiIHN0eWxlPVxcXCJ3aGl0ZS1zcGFjZTogcHJlLXdyYXBcXFwiPjwvdGQ+XFxuPHRkIGNsYXNzPVxcXCJ0ZXh0LXJpZ2h0XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1pbmZvXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LnRyaWdnZXIuYmluZChpdGVtLCYjMzk7Y2FtcGFpZ24tc2hvdyYjMzk7KVxcXCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cXFwiU2hvd1xcXCIgZGF0YS1wbGFjZW1lbnQ9XFxcInRvcFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIHRpdGxlPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXFxcIj48L3NwYW4+XFxuPC9hPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGl0ZW0uc3RhdHVzID09PSAmIzM5O3JlYWR5JiMzOTtcXFwiPlxcbjxhIGNsYXNzPVxcXCJidG4gYnRuLXdhcm5pbmdcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQudHJpZ2dlci5iaW5kKGl0ZW0sJiMzOTtjYW1wYWlnbi1lZGl0LWdvJiMzOTspXFxcIiBkYXRhLW9yaWdpbmFsLXRpdGxlPVxcXCJFZGl0XFxcIiBkYXRhLXBsYWNlbWVudD1cXFwidG9wXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgdGl0bGU+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWVkaXRcXFwiPjwvc3Bhbj5cXG48L2E+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGl0ZW0uc3RhdHVzID09PSAmIzM5O3JlYWR5JiMzOTtcXFwiPlxcbjxhIGNsYXNzPVxcXCJidG4gYnRuLXN1Y2Nlc3NcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQudHJpZ2dlci5iaW5kKGl0ZW0sJiMzOTtjYW1wYWlnbi1lZGl0LWdvJiMzOTspXFxcIiBkYXRhLW9yaWdpbmFsLXRpdGxlPVxcXCJFZGl0XFxcIiBkYXRhLXBsYWNlbWVudD1cXFwidG9wXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgdGl0bGU+XFxuUFVCTElTSFxcbjwvYT5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogaXRlbS5zdGF0dXMgPT09ICYjMzk7c3RhcnRlZCYjMzk7XFxcIj5cXG48YSBjbGFzcz1cXFwiYnRuIGJ0bi1zdWNjZXNzXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LnRyaWdnZXIuYmluZChpdGVtLCYjMzk7Y2FtcGFpZ24tZWRpdC1nbyYjMzk7KVxcXCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cXFwiRWRpdFxcXCIgZGF0YS1wbGFjZW1lbnQ9XFxcInRvcFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIHRpdGxlPlxcblRFUk1JTkFURVxcbjwvYT5cXG48L3NwYW4+XFxuPC90ZD5cXG48L3RyPlxcbjwvdGJvZHk+XFxuPC90YWJsZT5cXG48L2Rpdj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuX3JlcG9zaXRvcnkgPSBwYXJhbXMuY29udGV4dC5yZXBvc2l0b3JpZXNbJ2NhbXBhaWduJ107XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgIHNlbGYuaXRlbXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gICAgc2VsZi5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RlZCh0aGlzLmlkKTtcbiAgICAgICAgc2VsZi5vdXRwdXQgPSB0aGlzO1xuICAgICAgICBzZWxmLnRyaWdnZXIuY2FsbCh0aGlzLCAnY2FtcGFpZ24tc2hvdycpO1xuICAgIH07XG4gICAgc2VsZi5zZWxlY3RfdHJpZ2dlciA9IGZ1bmN0aW9uIChpdGVtLGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCwgdGhpcyk7XG4gICAgfTtcbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCB0aGlzKTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ2xpc3QtY2FtcGFpZ24nO1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmdldF9kYXRhID0gZnVuY3Rpb24oY29udGV4dCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnL2FwaS9jYW1wYWlnblwiLFxuICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciAoXCJBdXRob3JpemF0aW9uXCIsIFwiQVBJVG9rZW4gXCIrIGNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICB2YXIgbXlvYmogPSByZXN1bHQ7XG4gICAgICAgIHNlbGYuaXRlbXMobXlvYmouY2FtcGFpZ25zKTtcbiAgICB9XG4gICAgfSk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpZWxkcyA9IHtcbiAgICBpZDogMVxuICAgICwnY2FtcGFpZ24tZWRpdCc6IDFcbiAgICAsJ2NhbXBhaWduLW5hbWUnOiAxXG4gICAgLCdjYW1wYWlnbi1uZXh0X2FjdGlvbic6IDFcbiAgICAsJ2NhbXBhaWduLXNob3cnOiAxXG4gICAgLCdjYW1wYWlnbi1zdGF0ZSc6IDFcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUud2FpdEZvclN0YXR1c0NoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcHV0aW5nIHx8XG4gICAgICAgICAgIHRoaXMuX2luaXRpYWxpemluZyB8fFxuICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fY29tcHV0aW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbXB1dGluZy5jYW5jZWwoKTtcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX2NvbXB1dGluZyA9IHRoaXMuX3JlcG9zaXRvcnkuZmluZCh0aGlzLmZpbHRlcnMsIHRoaXMuZmllbGRzKS50aGVuKGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICBzZWxmLnNlbGVjdGVkKHVuZGVmaW5lZCk7XG4gICAgICAgIHNlbGYuaXRlbXMoaXRlbXMpO1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkKGl0ZW1zWzBdLmlkKTtcbiAgICAgICAgICAgIHNlbGYub3V0cHV0ID0gaXRlbXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zdGF0dXMoJ2NvbXB1dGVkJyk7XG4gICAgICAgIHNlbGYuX2NvbXB1dGluZyA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbn07XG5cblxuVmlld01vZGVsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLm91dHB1dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpbHRlcnMgPSBvcHRpb25zLmlucHV0IHx8IHt9O1xuICAgIHRoaXMuc3RhdHVzKCdyZWFkeScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9pbml0aWFsaXppbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2NvbXB1dGUoKTtcbiAgICAgICAgICAgIHNlbGYuZ2V0X2RhdGEoc2VsZi5jb250ZXh0KTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHNlbGYuX2luaXRpYWxpemluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSwgMSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtbGlzdC1jYW1wYWlnbicsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+XFxuPGRpdiBjbGFzcz1cXFwid2VsbCBjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTIgY29sLXNtLTEwIGNvbC1zbS1vZmZzZXQtMVxcXCI+XFxuPGZpZWxkc2V0PlxcbjxsZWdlbmQgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5Mb2cgSW48L2xlZ2VuZD5cXG48Zm9ybT5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7b3RoZXJzJiMzOTtdfVxcXCI+XFxuPGg1IGNsYXNzPVxcXCJoZWxwLWJsb2NrIHRleHQtY2VudGVyXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7b3RoZXJzJiMzOTtdXFxcIiBpZD1cXFwibG9naW4tZm9ybV9maWVsZF9lcnJvclxcXCI+PC9oNT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7dXNlcm5hbWUmIzM5O119XFxcIj5cXG48bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7YWN0aXZlOiBmaWVsZHMoKVsmIzM5O3VzZXJuYW1lJiMzOTtdfSwgYXR0cjogeyYjMzk7ZGF0YS1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3VzZXJuYW1lJiMzOTtdfVxcXCIgZm9yPVxcXCJsb2dpbi1mb3JtX2ZpZWxkXzFcXFwiPlVzZXJuYW1lPC9sYWJlbD5cXG48aW5wdXQgYXJpYS1kZXNjcmliZWRieT1cXFwibG9naW4tZm9ybV9maWVsZF8xX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInRleHRJbnB1dDogZmllbGRzKClbJiMzOTt1c2VybmFtZSYjMzk7XVxcXCIgaWQ9XFxcImxvZ2luLWZvcm1fZmllbGRfMVxcXCIgcGxhY2Vob2xkZXI9XFxcIlVzZXJuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIj5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBlcnJvcnMoKVsmIzM5O3VzZXJuYW1lJiMzOTtdXFxcIiBpZD1cXFwibG9naW4tZm9ybV9maWVsZF8xX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3Bhc3N3b3JkJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtwYXNzd29yZCYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtwYXNzd29yZCYjMzk7XX1cXFwiIGZvcj1cXFwibG9naW4tZm9ybV9maWVsZF8wXFxcIj5QYXNzd29yZDwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcImxvZ2luLWZvcm1fZmllbGRfMF9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ0ZXh0SW5wdXQ6IGZpZWxkcygpWyYjMzk7cGFzc3dvcmQmIzM5O11cXFwiIGlkPVxcXCJsb2dpbi1mb3JtX2ZpZWxkXzBcXFwiIHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7cGFzc3dvcmQmIzM5O11cXFwiIGlkPVxcXCJsb2dpbi1mb3JtX2ZpZWxkXzBfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Zvcm0+XFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciBtYXJnaW5fX3RvcC0tMjBweFxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCAmIzM5O2xvZ2luLXN1Ym1pdCYjMzk7KVxcXCI+XFxuTE9HIElOXFxuPC9hPlxcbjxicj5cXG48cCBjbGFzcz1cXFwibWFyZ2luX190b3AtLTEwcHhcXFwiPlxcbkkgZG9u4oCZdCBoYXZlIGFuIGFjY291bnQsXFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7cmVnaXN0ZXItZ28mIzM5OylcXFwiPlxcblJlZ2lzdGVyXFxuPC9hPlxcbjwvcD5cXG48aHIgY2xhc3M9XFxcInNlcGFyYXRvciBtYXJnaW5fX2NlbnRlclxcXCI+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9maWVsZHNldD5cXG48L2Rpdj5cXG48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLFxuICAgIFByb21pc2UgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvbWlzZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvbWlzZSddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcbiAgICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHNlbGYuZmllbGRzID0ga28ub2JzZXJ2YWJsZSh7fSkuZXh0ZW5kKHsgcmVxdWlyZWQ6IHRydWUgfSk7XG4gICAgc2VsZi5lcnJvcnMgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCBzZWxmLm91dHB1dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdsb2dpbi1mb3JtJztcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAoZXJyb3JzX3NlbnQsZmllbGRzX3NlbnQpIHtcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChmaWVsZHNfc2VudCkpe1xuICAgICAgICB0aGlzLmZpZWxkcygpWydwYXNzd29yZCddKGZpZWxkc19zZW50LnBhc3N3b3JkKTtcbiAgICAgICAgdGhpcy5maWVsZHMoKVsndXNlcm5hbWUnXShmaWVsZHNfc2VudC51c2VybmFtZSk7XG4gICAgfVxuICAgIHRoaXMuZXJyb3JzKClbJ3Bhc3N3b3JkJ10oZXJyb3JzX3NlbnQucGFzc3dvcmQpO1xuICAgIHRoaXMuZXJyb3JzKClbJ3VzZXJuYW1lJ10oZXJyb3JzX3NlbnQudXNlcm5hbWUpO1xuICAgIHRoaXMuZXJyb3JzKClbJ290aGVycyddKGVycm9yc19zZW50Lm90aGVycyk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0cHV0ID0ge1xuICAgICAgICAncGFzc3dvcmQnOiB0aGlzLmlucHV0WydwYXNzd29yZCddLFxuICAgICAgICAndXNlcm5hbWUnOiB0aGlzLmlucHV0Wyd1c2VybmFtZSddLFxuICAgIH07XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmaWVsZHMgPSB7XG4gICAgICAgICAgICAncGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3Bhc3N3b3JkJ10pLFxuICAgICAgICAgICAgJ3VzZXJuYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0Wyd1c2VybmFtZSddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ3Bhc3N3b3JkJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydwYXNzd29yZC1lcnJvciddKSxcbiAgICAgICAgICAgICd1c2VybmFtZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsndXNlcm5hbWUtZXJyb3InXSksXG4gICAgICAgICAgICAnb3RoZXJzJzoga28ub2JzZXJ2YWJsZSgpLFxuICAgICAgICB9O1xuICAgIGZpZWxkc1sncGFzc3dvcmQnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0WydwYXNzd29yZCddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ3Bhc3N3b3JkJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ3VzZXJuYW1lJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsndXNlcm5hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWyd1c2VybmFtZSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgdGhpcy5maWVsZHMoZmllbGRzKTtcbiAgICB0aGlzLmVycm9ycyhlcnJvcnMpO1xuICAgIHRoaXMuc3RhdHVzKCdjb21wdXRlZCcpO1xufTtcblxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucyxlcnJvcnMsZmllbGRzKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgZXJyb3JzID0gZXJyb3JzIHx8IHt9O1xuICAgIGZpZWxkcyA9IGZpZWxkcyB8fCB7fTtcbiAgICB0aGlzLm91dHB1dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpZWxkcyh7fSk7XG4gICAgdGhpcy5lcnJvcnMoe30pO1xuICAgIHRoaXMuaW5wdXQgPSBvcHRpb25zLmlucHV0IHx8IHt9O1xuICAgIHRoaXMuc3RhdHVzKCdyZWFkeScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9pbml0aWFsaXppbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2NvbXB1dGUoKTtcbiAgICAgICAgICAgIHNlbGYuZmlsbChlcnJvcnMsZmllbGRzKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHNlbGYuX2luaXRpYWxpemluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSwgMSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtbG9naW4tZm9ybScsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soY29tcG9uZW50SW5mby5lbGVtZW50LCBmdW5jdGlvbiAoKSB7IGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+XFxuICAgIDwhLS0gbG9naW4tRm9tIC0tPlxcbiAgICA8Yy1sb2dpbi1mb3JtIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWxvZ2luLWZvcm0+XFxuPC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBzZWxmLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKXtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gb3B0aW9ucy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tjaGlsZF0uaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnbG9naW4tdmlldyc7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW1xuICAgICdsb2dpbi1mb3JtJyAvLyBsb2dpbi1Gb21cbl07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1sb2dpbi12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG48YSBjbGFzcz1cXFwiY29sLXhzLTIgYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTtjYW1wYWlnbi1jcmVhdGUmIzM5OylcXFwiPkNyZWF0ZSBhIENhbXBhaWduPC9hPlxcbjxhIGNsYXNzPVxcXCJjb2wteHMtMiBidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O2NhbXBhaWduLWVkaXQtZ28mIzM5OylcXFwiPmNhbXBhaWduLWVkaXQtZ288L2E+XFxuPGEgY2xhc3M9XFxcImNvbC14cy0yIGJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7Y2FtcGFpZ24tY2hhbmdlLXN0YXRlJiMzOTspXFxcIj5jYW1wYWlnbi1jaGFuZ2Utc3RhdGU8L2E+XFxuPGMtbGlzdC1jYW1wYWlnbiBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1saXN0LWNhbXBhaWduPlxcbjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ21hbmFnZXItdmlldyc7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW1xuICAgICdsaXN0LWNhbXBhaWduJyAvLyBsaXN0LWNhbXBhaWduXG5dO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtbWFuYWdlci12aWV3Jywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG48ZGl2IGNsYXNzPVxcXCJ3ZWxsIGNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMiBjb2wtc20tMTAgY29sLXNtLW9mZnNldC0xXFxcIj5cXG48ZmllbGRzZXQ+XFxuPGxlZ2VuZCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPlJlZ2lzdGVyPC9sZWdlbmQ+XFxuPGZvcm0+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O2Z1bGxuYW1lJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtmdWxsbmFtZSYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtmdWxsbmFtZSYjMzk7XX1cXFwiIGZvcj1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8xXFxcIj5GdWxsbmFtZTwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfMV9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTtmdWxsbmFtZSYjMzk7XVxcXCIgaWQ9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfMVxcXCIgcmVxdWlyZT1cXFwidHJ1ZVxcXCIgdHlwZT1cXFwidGV4dFxcXCI+XFxuPHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiIGRhdGEtYmluZD1cXFwidGV4dDogZXJyb3JzKClbJiMzOTtmdWxsbmFtZSYjMzk7XVxcXCIgaWQ9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfMV9lcnJvclxcXCI+PC9zcGFuPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOiB7JiMzOTtoYXMtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTt1c2VybmFtZSYjMzk7XX1cXFwiPlxcbjxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHthY3RpdmU6IGZpZWxkcygpWyYjMzk7dXNlcm5hbWUmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7dXNlcm5hbWUmIzM5O119XFxcIiBmb3I9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfM1xcXCI+VXNlcm5hbWU8L2xhYmVsPlxcbjxpbnB1dCBhcmlhLWRlc2NyaWJlZGJ5PVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzNfZXJyb3JcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgdmFsaWRhdGVcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IGZpZWxkcygpWyYjMzk7dXNlcm5hbWUmIzM5O11cXFwiIGlkPVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzNcXFwiIHJlcXVpcmU9XFxcInRydWVcXFwiIHR5cGU9XFxcInRleHRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7dXNlcm5hbWUmIzM5O11cXFwiIGlkPVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzNfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyYjMzk7aGFzLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7YWNjb3VudC10eXBlJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTthY2NvdW50LXR5cGUmIzM5O119LCBhdHRyOiB7JiMzOTtkYXRhLWVycm9yJiMzOTs6IGVycm9ycygpWyYjMzk7YWNjb3VudC10eXBlJiMzOTtdfVxcXCIgZm9yPVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzBcXFwiPlNlbGVjdCBhY2NvdW50IHR5cGU8L2xhYmVsPlxcbjxzZWxlY3QgYXJpYS1kZXNjcmliZWRieT1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8wX2Vycm9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHZhbGlkYXRlXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBmaWVsZHMoKVsmIzM5O2FjY291bnQtdHlwZSYjMzk7XVxcXCIgaWQ9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfMFxcXCIgcmVxdWlyZT1cXFwidHJ1ZVxcXCI+XFxuPG9wdGlvbiB2YWx1ZT1cXFwibWFzdGVyXFxcIj5NYXN0ZXI8L29wdGlvbj5cXG48b3B0aW9uIHZhbHVlPVxcXCJ3b3JrZXJcXFwiPldvcmtlcjwvb3B0aW9uPlxcbjwvc2VsZWN0PlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7YWNjb3VudC10eXBlJiMzOTtdXFxcIiBpZD1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8wX2Vycm9yXFxcIj48L3NwYW4+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsmIzM5O2hhcy1lcnJvciYjMzk7OiBlcnJvcnMoKVsmIzM5O3Bhc3N3b3JkJiMzOTtdfVxcXCI+XFxuPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsXFxcIiBkYXRhLWJpbmQ9XFxcImNzczoge2FjdGl2ZTogZmllbGRzKClbJiMzOTtwYXNzd29yZCYjMzk7XX0sIGF0dHI6IHsmIzM5O2RhdGEtZXJyb3ImIzM5OzogZXJyb3JzKClbJiMzOTtwYXNzd29yZCYjMzk7XX1cXFwiIGZvcj1cXFwicmVnaXN0ZXItZm9ybV9maWVsZF8yXFxcIj5QYXNzd29yZDwvbGFiZWw+XFxuPGlucHV0IGFyaWEtZGVzY3JpYmVkYnk9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfMl9lcnJvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCB2YWxpZGF0ZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogZmllbGRzKClbJiMzOTtwYXNzd29yZCYjMzk7XVxcXCIgaWQ9XFxcInJlZ2lzdGVyLWZvcm1fZmllbGRfMlxcXCIgcmVxdWlyZT1cXFwidHJ1ZVxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiPlxcbjxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcInRleHQ6IGVycm9ycygpWyYjMzk7cGFzc3dvcmQmIzM5O11cXFwiIGlkPVxcXCJyZWdpc3Rlci1mb3JtX2ZpZWxkXzJfZXJyb3JcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Zvcm0+XFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG48ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciBtYXJnaW5fX3RvcC0tMjBweFxcXCI+XFxuPGEgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCAmIzM5O3JlZ2lzdGVyLXN1Ym1pdCYjMzk7KVxcXCI+XFxuUkVHSVNURVJcXG48L2E+XFxuPGJyPlxcbjxwIGNsYXNzPVxcXCJtYXJnaW5fX3RvcC0tMTBweFxcXCI+XFxuQWxyZWFkeSBoYXZlIGFuIGFjY291bnQsXFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7bG9naW4tZ28mIzM5OylcXFwiPlxcbkxvZyBJblxcbjwvYT5cXG48L3A+XFxuPGhyIGNsYXNzPVxcXCJzZXBhcmF0b3IgbWFyZ2luX19jZW50ZXJcXFwiPlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZmllbGRzZXQ+XFxuPC9kaXY+XFxuPC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgc2VsZi5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICBzZWxmLmZpZWxkcyA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHNlbGYuZXJyb3JzID0ga28ub2JzZXJ2YWJsZSh7fSk7XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0LCBzZWxmLm91dHB1dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICdyZWdpc3Rlci1mb3JtJztcblxuVmlld01vZGVsLnByb3RvdHlwZS53YWl0Rm9yU3RhdHVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAoZXJyb3JzX3NlbnQsZmllbGRzX3NlbnQpIHtcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChmaWVsZHNfc2VudCkpe1xuICAgICAgICB0aGlzLmZpZWxkcygpWydhY2NvdW50LXR5cGUnXShmaWVsZHNfc2VudC50eXBlKTtcbiAgICAgICAgdGhpcy5maWVsZHMoKVsnZnVsbG5hbWUnXShmaWVsZHNfc2VudC5mdWxsbmFtZSk7XG4gICAgICAgIHRoaXMuZmllbGRzKClbJ3Bhc3N3b3JkJ10oZmllbGRzX3NlbnQucGFzc3dvcmQpO1xuICAgICAgICB0aGlzLmZpZWxkcygpWyd1c2VybmFtZSddKGZpZWxkc19zZW50LnVzZXJuYW1lKTtcbiAgICB9XG4gICAgdGhpcy5lcnJvcnMoKVsnYWNjb3VudC10eXBlJ10oZXJyb3JzX3NlbnQudHlwZSk7XG4gICAgdGhpcy5lcnJvcnMoKVsnZnVsbG5hbWUnXShlcnJvcnNfc2VudC5mdWxsbmFtZSk7XG4gICAgdGhpcy5lcnJvcnMoKVsncGFzc3dvcmQnXShlcnJvcnNfc2VudC5wYXNzd29yZCk7XG4gICAgdGhpcy5lcnJvcnMoKVsndXNlcm5hbWUnXShlcnJvcnNfc2VudC51c2VybmFtZSk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0cHV0ID0ge1xuICAgICAgICAnYWNjb3VudC10eXBlJzogdGhpcy5pbnB1dFsnYWNjb3VudC10eXBlJ10sXG4gICAgICAgICdmdWxsbmFtZSc6IHRoaXMuaW5wdXRbJ2Z1bGxuYW1lJ10sXG4gICAgICAgICdwYXNzd29yZCc6IHRoaXMuaW5wdXRbJ3Bhc3N3b3JkJ10sXG4gICAgICAgICd1c2VybmFtZSc6IHRoaXMuaW5wdXRbJ3VzZXJuYW1lJ10sXG4gICAgfTtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZpZWxkcyA9IHtcbiAgICAgICAgICAgICdhY2NvdW50LXR5cGUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ2FjY291bnQtdHlwZSddKSxcbiAgICAgICAgICAgICdmdWxsbmFtZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnZnVsbG5hbWUnXSksXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3Bhc3N3b3JkJ10pLFxuICAgICAgICAgICAgJ3VzZXJuYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0Wyd1c2VybmFtZSddKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgJ2FjY291bnQtdHlwZSc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsnYWNjb3VudC10eXBlLWVycm9yJ10pLFxuICAgICAgICAgICAgJ2Z1bGxuYW1lJzoga28ub2JzZXJ2YWJsZSh0aGlzLmlucHV0WydmdWxsbmFtZS1lcnJvciddKSxcbiAgICAgICAgICAgICdwYXNzd29yZCc6IGtvLm9ic2VydmFibGUodGhpcy5pbnB1dFsncGFzc3dvcmQtZXJyb3InXSksXG4gICAgICAgICAgICAndXNlcm5hbWUnOiBrby5vYnNlcnZhYmxlKHRoaXMuaW5wdXRbJ3VzZXJuYW1lLWVycm9yJ10pLFxuICAgICAgICB9O1xuICAgIGZpZWxkc1snYWNjb3VudC10eXBlJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnYWNjb3VudC10eXBlJ10gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICBmaWVsZHNbJ2Z1bGxuYW1lJ10uc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZWxmLm91dHB1dFsnZnVsbG5hbWUnXSA9IHZhbHVlO1xuICAgICAgICBzZWxmLmVycm9ycygpWydmdWxsbmFtZSddKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgZmllbGRzWydwYXNzd29yZCddLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2VsZi5vdXRwdXRbJ3Bhc3N3b3JkJ10gPSB2YWx1ZTtcbiAgICAgICAgc2VsZi5lcnJvcnMoKVsncGFzc3dvcmQnXSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGZpZWxkc1sndXNlcm5hbWUnXS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNlbGYub3V0cHV0Wyd1c2VybmFtZSddID0gdmFsdWU7XG4gICAgICAgIHNlbGYuZXJyb3JzKClbJ3VzZXJuYW1lJ10odW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICB0aGlzLmZpZWxkcyhmaWVsZHMpO1xuICAgIHRoaXMuZXJyb3JzKGVycm9ycyk7XG4gICAgdGhpcy5zdGF0dXMoJ2NvbXB1dGVkJyk7XG59O1xuXG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLGVycm9ycyxmaWVsZHMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBlcnJvcnMgPSBlcnJvcnMgfHwge307XG4gICAgZmllbGRzID0gZmllbGRzIHx8IHt9O1xuICAgIHRoaXMub3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmllbGRzKHt9KTtcbiAgICB0aGlzLmVycm9ycyh7fSk7XG4gICAgdGhpcy5pbnB1dCA9IG9wdGlvbnMuaW5wdXQgfHwge307XG4gICAgdGhpcy5zdGF0dXMoJ3JlYWR5Jyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX2luaXRpYWxpemluZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fY29tcHV0ZSgpO1xuICAgICAgICAgICAgc2VsZi5maWxsKGVycm9ycyxmaWVsZHMpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgc2VsZi5faW5pdGlhbGl6aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1yZWdpc3Rlci1mb3JtJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHsgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF07IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj5cXG4gICAgPCEtLSByZWdpc3Rlci1mb3JtIC0tPlxcbiAgICA8Yy1yZWdpc3Rlci1mb3JtIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLXJlZ2lzdGVyLWZvcm0+XFxuPC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBzZWxmLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKXtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gb3B0aW9ucy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tjaGlsZF0uaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAncmVnaXN0ZXItdmlldyc7XG5WaWV3TW9kZWwucHJvdG90eXBlLmNoaWxkcmVuID0gW1xuICAgICdyZWdpc3Rlci1mb3JtJyAvLyByZWdpc3Rlci1mb3JtXG5dO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2MtcmVnaXN0ZXItdmlldycsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGgzPnNlbGVjdG9yLWxpc3Q8L2gzPjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtaG92ZXIgdGFibGUtY29uZGVuc2VkXFxcIj4gICAgPHRoZWFkPiAgICAgICAgPHRyPiAgICAgICAgICAgIDx0aD4jPC90aD4gICAgICAgIDwvdHI+ICAgIDwvdGhlYWQ+ICAgIDx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IGl0ZW1zXFxcIj4gICAgICAgIDx0ciBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LnNlbGVjdFxcXCI+ICAgICAgICAgICAgPHRkIGRhdGEtYmluZD1cXFwidGV4dDogaWRcXFwiPjwvdGQ+ICAgICAgICA8L3RyPiAgICAgICAgPC90Ym9keT48L3RhYmxlPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuX3JlcG9zaXRvcnkgPSBwYXJhbXMuY29udGV4dC5yZXBvc2l0b3JpZXNbJ3dvcmtlcnMnXTtcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcbiAgICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHNlbGYuc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgc2VsZi5pdGVtcyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG5cbiAgICBzZWxmLnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnNlbGVjdGVkKHRoaXMuaWQpO1xuICAgICAgICBzZWxmLm91dHB1dCA9IHRoaXM7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQsIHRoaXMpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAnc2VsZWN0b3ItbGlzdCc7XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuZmllbGRzID0ge1xuICAgIGlkOiAxXG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLndhaXRGb3JTdGF0dXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGluZyB8fFxuICAgICAgICAgICB0aGlzLl9pbml0aWFsaXppbmcgfHxcbiAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5WaWV3TW9kZWwucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NvbXB1dGluZykge1xuICAgICAgICB0aGlzLl9jb21wdXRpbmcuY2FuY2VsKCk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9jb21wdXRpbmcgPSB0aGlzLl9yZXBvc2l0b3J5LmZpbmQodGhpcy5maWx0ZXJzLCB0aGlzLmZpZWxkcykudGhlbihmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RlZCh1bmRlZmluZWQpO1xuICAgICAgICBzZWxmLml0ZW1zKGl0ZW1zKTtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZChpdGVtc1swXS5pZCk7XG4gICAgICAgICAgICBzZWxmLm91dHB1dCA9IGl0ZW1zWzBdO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc3RhdHVzKCdjb21wdXRlZCcpO1xuICAgICAgICBzZWxmLl9jb21wdXRpbmcgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG59O1xuXG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5pbnB1dCB8fCB7fTtcbiAgICB0aGlzLnN0YXR1cygncmVhZHknKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9jb21wdXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBzZWxmLl9pbml0aWFsaXppbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLXNlbGVjdG9yLWxpc3QnLCB7XG4gICAgICAgIHZpZXdNb2RlbDoge1xuICAgICAgICAgICAgY3JlYXRlVmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zLCBjb21wb25lbnRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZpZXdNb2RlbChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnZtc1t2bS5pZF0gPSB2bTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkgeyBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgIHN5bmNocm9ub3VzOiB0cnVlXG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzcGFuPjwvc3Bhbj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgc2VsZi5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCl7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IG9wdGlvbnMubWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY29udGV4dC52bXNbY2hpbGRdLmluaXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICB9O1xufVxuXG5WaWV3TW9kZWwucHJvdG90eXBlLmlkID0gJ3Nob3ctY2FtcGFpZ24nO1xuVmlld01vZGVsLnByb3RvdHlwZS5jaGlsZHJlbiA9IFtcbl07XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignYy1zaG93LWNhbXBhaWduJywge1xuICAgICAgICB2aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWaWV3TW9kZWwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdID0gdm07XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGNvbXBvbmVudEluZm8uZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyW3ZtLmlkXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGV4dC52bXNbdm0uaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB2bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3Bhbj4gICAgPCEtLSBjYW1wYWlnbi13b3JrZXItbGlzdCAtLT4gICAgPGMtY2FtcGFpZ24td29ya2VyLWxpc3QgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtY2FtcGFpZ24td29ya2VyLWxpc3Q+PC9zcGFuPlwiO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbnRleHQgPSBwYXJhbXMuY29udGV4dDtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBzZWxmLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKXtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gb3B0aW9ucy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tjaGlsZF0uaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxmLmNvbnRleHQuZXZlbnRzW2lkXShzZWxmLmNvbnRleHQpO1xuICAgIH07XG59XG5cblZpZXdNb2RlbC5wcm90b3R5cGUuaWQgPSAndGFzay12aWV3JztcblZpZXdNb2RlbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBbXG4gICAgJ2NhbXBhaWduLXdvcmtlci1saXN0JyAvLyBjYW1wYWlnbi13b3JrZXItbGlzdFxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLXRhc2stdmlldycsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNwYW4+ICAgIDwhLS0gbGlzdC1hdmFpbGFibGUtd29ya2VycyAtLT4gICAgPGMtbGlzdC1hdmFpbGFibGUtd29ya2VycyBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1saXN0LWF2YWlsYWJsZS13b3JrZXJzPiAgICA8IS0tIGxpc3QtYXZhaWxhYmxlLWFubm90YXRvciAtLT4gICAgPGMtbGlzdC1hdmFpbGFibGUtYW5ub3RhdG9yIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWxpc3QtYXZhaWxhYmxlLWFubm90YXRvcj4gICAgPCEtLSBzZWxlY3Rvci1saXN0IC0tPiAgICA8Yy1zZWxlY3Rvci1saXN0IHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLXNlbGVjdG9yLWxpc3Q+ICAgIDwhLS0gYW5ub3RhdG9yLWxpc3QgLS0+ICAgIDxjLWFubm90YXRvci1saXN0IHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWFubm90YXRvci1saXN0PiAgICA8YSBjbGFzcz1cXFwiY29sLXhzLTIgYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJ21hbmFnZXItZ28nKVxcXCI+bWFuYWdlci1nbzwvYT48L3NwYW4+XCI7XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xuXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGV4dCA9IHBhcmFtcy5jb250ZXh0O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHNlbGYuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpe1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBvcHRpb25zLm1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudm1zW2NoaWxkXS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHNlbGYuY29udGV4dC5ldmVudHNbaWRdKHNlbGYuY29udGV4dCk7XG4gICAgfTtcbn1cblxuVmlld01vZGVsLnByb3RvdHlwZS5pZCA9ICd3b3JrZXItc2VsZWN0LXZpZXcnO1xuVmlld01vZGVsLnByb3RvdHlwZS5jaGlsZHJlbiA9IFtcbiAgICAnbGlzdC1hdmFpbGFibGUtd29ya2VycycgLy8gbGlzdC1hdmFpbGFibGUtd29ya2Vyc1xuICAgICwnbGlzdC1hdmFpbGFibGUtYW5ub3RhdG9yJyAvLyBsaXN0LWF2YWlsYWJsZS1hbm5vdGF0b3JcbiAgICAsJ3NlbGVjdG9yLWxpc3QnIC8vIHNlbGVjdG9yLWxpc3RcbiAgICAsJ2Fubm90YXRvci1saXN0JyAvLyBhbm5vdGF0b3ItbGlzdFxuXTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjLXdvcmtlci1zZWxlY3QtdmlldycsIHtcbiAgICAgICAgdmlld01vZGVsOiB7XG4gICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSBuZXcgVmlld01vZGVsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXSA9IHZtO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdID0gW107XG4gICAgICAgICAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhjb21wb25lbnRJbmZvLmVsZW1lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclt2bS5pZF0uZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5jb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbdm0uaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRleHQudm1zW3ZtLmlkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3luY2hyb25vdXM6IHRydWVcbiAgICB9KTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHJlcXVpcmUoJy4vbWFpbi1hcHBsaWNhdGlvbicpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWFjY291bnQtZWRpdC12aWV3JykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtY3JlYXRlLWNhbXBhaWduLXZpZXcnKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1lZGl0LWNhbXBhaWduLXZpZXcnKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1ob21lLWJhcicpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWltYWdlLWFubm90YXRpb24nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1pbWFnZS1zZWxlY3Rpb24nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1pbWFnZS11cGxvYWQtdmlldycpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLW1hbmFnZXItdmlldycpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLXNob3ctY2FtcGFpZ24nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy10YXNrLXZpZXcnKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy13b3JrZXItc2VsZWN0LXZpZXcnKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1hY2NvdW50LWVkaXQtZm9ybScpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWNyZWF0ZS1jYW1wYWlnbi1mb3JtJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtZWRpdC1jYW1wYWlnbi1mb3JtJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtaW1hZ2UtYW5ub3RhdGlvbi1mb3JtJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtaW1hZ2Utc2VsZWN0aW9uLWZvcm0nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1pbWFnZS11cGxvYWQtZm9ybScpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWxvZ2luLWZvcm0nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1sb2dpbi12aWV3JykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtbGlzdC1jYW1wYWlnbicpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLXJlZ2lzdGVyLWZvcm0nKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1yZWdpc3Rlci12aWV3JykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtY2FtcGFpZ24td29ya2VyLWxpc3QnKS5yZWdpc3RlcigpO1xuICAgIHJlcXVpcmUoJy4vYy1saXN0LWF2YWlsYWJsZS13b3JrZXJzJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtbGlzdC1hdmFpbGFibGUtYW5ub3RhdG9yJykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2Mtc2VsZWN0b3ItbGlzdCcpLnJlZ2lzdGVyKCk7XG4gICAgcmVxdWlyZSgnLi9jLWFubm90YXRvci1saXN0JykucmVnaXN0ZXIoKTtcbiAgICByZXF1aXJlKCcuL2MtbGluZS1kcmF3ZXInKS5yZWdpc3RlcigpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2IGNsYXNzPVxcXCJuYXZiYXIgbmF2YmFyLWRlZmF1bHRcXFwiPlxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lci1mbHVpZFxcXCI+XFxuPGRpdiBjbGFzcz1cXFwibmF2YmFyLWhlYWRlclxcXCI+XFxuPGJ1dHRvbiBhcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCIgY2xhc3M9XFxcIm5hdmJhci10b2dnbGUgY29sbGFwc2VkXFxcIiBkYXRhLXRhcmdldD1cXFwiI2xhbmRtYXJrLW1lbnVcXFwiIGRhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+VG9nZ2xlIG5hdmlnYXRpb248L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxuPC9idXR0b24+XFxuPGEgY2xhc3M9XFxcIm5hdmJhci1icmFuZCBjdXJzb3ItLXBvaW50ZXJcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O2hvbWUmIzM5OylcXFwiPlxcbjxpbWcgYWx0PVxcXCJMb2dvXFxcIiBjbGFzcz1cXFwiaW1nX193aWR0aF9fMWM1ZW0gcHVsbC1sZWZ0XFxcIiBzcmM9XFxcIi9yZW1vZmlvcmVudGluby9hd3QtcHJvamVjdC93d3cvaW1hZ2VzL2xvZ28ucG5nXFxcIj5cXG48c3BhbiBjbGFzcz1cXFwidmVydGljYWxfX21pZGRsZVxcXCI+XFxuTW91bnRhaW5cXG48YiBjbGFzcz1cXFwidGV4dF9fY29sb3ItLWdyZWVuXFxcIj5cXG5GbGFnXFxuPC9iPlxcbjwvc3Bhbj5cXG48L2E+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cXFwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXFxcIiBpZD1cXFwibGFuZG1hcmstbWVudVxcXCI+XFxuPHVsIGNsYXNzPVxcXCJuYXYgbmF2YmFyLW5hdiBuYXZiYXItcmlnaHRcXFwiIGRhdGEtYmluZD1cXFwiaWY6IGxvZ2dlZCgpID09PSBmYWxzZVxcXCI+XFxuPGxpPlxcbjxhIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O2xvZ2luLWdvJiMzOTspXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tbG9nLWluXFxcIj48L3NwYW4+XFxuTG9naW5cXG48L2E+XFxuPC9saT5cXG48bGk+XFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7cmVnaXN0ZXItZ28mIzM5OylcXFwiPlxcbjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1pbmJveFxcXCI+PC9zcGFuPlxcblJlZ2lzdGVyXFxuPC9hPlxcbjwvbGk+XFxuPC91bD5cXG48dWwgY2xhc3M9XFxcIm5hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodFxcXCIgZGF0YS1iaW5kPVxcXCJpZjogbG9nZ2VkKCkgPT09IHRydWVcXFwiPlxcbjxsaT5cXG48YT5cXG48Yj5cXG5EZWFyXFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiB1c2VyX25hbWUoKVxcXCI+PC9zcGFuPlxcbjwvYj5cXG48L2E+XFxuPC9saT5cXG48bGkgZGF0YS1iaW5kPVxcXCJpZjogbWFuYWdlcigpXFxcIj5cXG48YSBkYXRhLWJpbmQ9XFxcImNsaWNrOiB0cmlnZ2VyLmJpbmQoJGRhdGEsJiMzOTttYW5hZ2VyLWdvJiMzOTspXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tcGljdHVyZVxcXCI+PC9zcGFuPlxcbk1hbmFnZXJcXG48L2E+XFxuPC9saT5cXG48bGkgZGF0YS1iaW5kPVxcXCJpZjogIW1hbmFnZXIoKVxcXCI+XFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7dGFzay1nbyYjMzk7KVxcXCI+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWxvZy1vdXRcXFwiPjwvc3Bhbj5cXG50YXNrXFxuPC9hPlxcbjwvbGk+XFxuPGxpPlxcbjxhIGRhdGEtYmluZD1cXFwiY2xpY2s6IHRyaWdnZXIuYmluZCgkZGF0YSwmIzM5O2xvZ291dCYjMzk7KVxcXCI+XFxuPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWxvZy1vdXRcXFwiPjwvc3Bhbj5cXG5Mb2dvdXRcXG48L2E+XFxuPC9saT5cXG48bGk+XFxuPGEgZGF0YS1iaW5kPVxcXCJjbGljazogdHJpZ2dlci5iaW5kKCRkYXRhLCYjMzk7YWNjb3VudC1lZGl0LWdvJiMzOTspXFxcIj5cXG48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tdXNlclxcXCI+PC9zcGFuPlxcbkVkaXQgQWNjb3VudFxcbjwvYT5cXG48L2xpPlxcbjwvdWw+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9uYXY+XFxuPCEtLSAvICVsaW5lLWRyYXdlcns6cGFyYW1zID0+IFxcXCJjb250ZXh0OmNvbnRleHQsc3JjOiAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy80LzRmL01hdHRlcmhvcm5fUmlmZmVsc2VlXzIwMDUtMDYtMTEuanBnJywgcGVuOiAxMCwgbGluZTogbGluZVxcXCJ9IC0tPlxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+XFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTthY2NvdW50LWVkaXQtdmlldyYjMzk7XFxcIj5cXG48Yy1hY2NvdW50LWVkaXQtdmlldyBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1hY2NvdW50LWVkaXQtdmlldz5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7Y3JlYXRlLWNhbXBhaWduLXZpZXcmIzM5O1xcXCI+XFxuPGMtY3JlYXRlLWNhbXBhaWduLXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtY3JlYXRlLWNhbXBhaWduLXZpZXc+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O2VkaXQtY2FtcGFpZ24tdmlldyYjMzk7XFxcIj5cXG48Yy1lZGl0LWNhbXBhaWduLXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtZWRpdC1jYW1wYWlnbi12aWV3Plxcbjwvc3Bhbj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTtob21lLWJhciYjMzk7XFxcIj5cXG48Yy1ob21lLWJhciBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1ob21lLWJhcj5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7aW1hZ2UtYW5ub3RhdGlvbiYjMzk7XFxcIj5cXG48Yy1pbWFnZS1hbm5vdGF0aW9uIGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHBhcmFtcz1cXFwiY29udGV4dDogY29udGV4dFxcXCI+PC9jLWltYWdlLWFubm90YXRpb24+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O2ltYWdlLXNlbGVjdGlvbiYjMzk7XFxcIj5cXG48Yy1pbWFnZS1zZWxlY3Rpb24gY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtaW1hZ2Utc2VsZWN0aW9uPlxcbjwvc3Bhbj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTtpbWFnZS11cGxvYWQtdmlldyYjMzk7XFxcIj5cXG48Yy1pbWFnZS11cGxvYWQtdmlldyBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1pbWFnZS11cGxvYWQtdmlldz5cXG48L3NwYW4+XFxuPCEtLSAvbG9naW4tZm9ybSAtLT5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTtsb2dpbi12aWV3JiMzOTtcXFwiPlxcbjxjLWxvZ2luLXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtbG9naW4tdmlldz5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7bG9nb3V0LXZpZXcmIzM5O1xcXCI+XFxuPGMtbG9nb3V0LXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtbG9nb3V0LXZpZXc+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O21hbmFnZXItdmlldyYjMzk7XFxcIj5cXG48Yy1tYW5hZ2VyLXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2MtbWFuYWdlci12aWV3Plxcbjwvc3Bhbj5cXG48IS0tIC9yZWdpc3Rlci1mb3JtIC0tPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O3JlZ2lzdGVyLXZpZXcmIzM5O1xcXCI+XFxuPGMtcmVnaXN0ZXItdmlldyBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy1yZWdpc3Rlci12aWV3Plxcbjwvc3Bhbj5cXG48c3BhbiBkYXRhLWJpbmQ9XFxcImlmOiBhY3RpdmUoKSA9PT0gJiMzOTtzaG93LWNhbXBhaWduJiMzOTtcXFwiPlxcbjxjLXNob3ctY2FtcGFpZ24gY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2Mtc2hvdy1jYW1wYWlnbj5cXG48L3NwYW4+XFxuPHNwYW4gZGF0YS1iaW5kPVxcXCJpZjogYWN0aXZlKCkgPT09ICYjMzk7dGFzay12aWV3JiMzOTtcXFwiPlxcbjxjLXRhc2stdmlldyBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBwYXJhbXM9XFxcImNvbnRleHQ6IGNvbnRleHRcXFwiPjwvYy10YXNrLXZpZXc+XFxuPC9zcGFuPlxcbjxzcGFuIGRhdGEtYmluZD1cXFwiaWY6IGFjdGl2ZSgpID09PSAmIzM5O3dvcmtlci1zZWxlY3QtdmlldyYjMzk7XFxcIj5cXG48Yy13b3JrZXItc2VsZWN0LXZpZXcgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgcGFyYW1zPVxcXCJjb250ZXh0OiBjb250ZXh0XFxcIj48L2Mtd29ya2VyLXNlbGVjdC12aWV3Plxcbjwvc3Bhbj5cXG48L2Rpdj5cXG48L2Rpdj5cIjtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcblxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdtYWluLWFwcGxpY2F0aW9uJywge1xuICAgICAgICB2aWV3TW9kZWw6IGZ1bmN0aW9uKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRDaGlsZCA9ICdob21lLWJhciwgbGluZS1kcmF3ZXInO1xuICAgICAgICAgICAgc2VsZi5jb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgICAgICAgICBzZWxmLmFjdGl2ZSA9IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHNlbGYubG9nZ2VkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLnVzZXJfbmFtZSA9IGtvLm9ic2VydmFibGUoXCJcIik7XG4gICAgICAgICAgICBzZWxmLm1hbmFnZXIgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYubGluZT1rby5vYnNlcnZhYmxlKCk7XG4gICAgICAgICAgICBzZWxmLmxpbmUuc3Vic2NyaWJlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgYWxlcnQoc2VsZi5saW5lKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlbGYubGFuZG1hcmsgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFjdGl2ZShpZCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tpZF0uaW5pdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFjdGl2ZShkZWZhdWx0Q2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbnRleHQudm1zW2RlZmF1bHRDaGlsZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb250ZXh0LnZtc1tkZWZhdWx0Q2hpbGRdLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZWxmLmlzTG9naW4gPSBmdW5jdGlvbiAobG9nZ2VkLCBuYW1lLCBtYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2dnZWQobG9nZ2VkKTtcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJfbmFtZShuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSk7XG4gICAgICAgICAgICAgICAgc2VsZi5tYW5hZ2VyKG1hbmFnZXIpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2VsZi50cmlnZ2VyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250ZXh0LmV2ZW50c1tpZF0oc2VsZi5jb250ZXh0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZWxmLmNvbnRleHQudG9wID0gc2VsZjtcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzeW5jaHJvbm91czogdHJ1ZVxuICAgIH0pO1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsZGF0YSkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydhY2NvdW50LWVkaXQtdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2FjY291bnQtZWRpdC12aWV3Jyk7XG4gICAgICAgICAgICBjb250ZXh0LnZtc1snYWNjb3VudC1lZGl0LXZpZXcnXS5pbml0KHttYXNrOiAnYWNjb3VudC1lZGl0LWZvcm0nfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ2FjY291bnQtZWRpdC1mb3JtJ10uaW5pdCh7fSxkYXRhLmVycm9ycyxkYXRhLmZpZWxkcyk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2FjY291bnQtZWRpdC12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnYWNjb3VudC1lZGl0LXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snYWNjb3VudC1lZGl0LXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgICAgICAgJ2Z1bGxuYW1lJyA6IGRhdGFbJ2Z1bGxuYW1lJ11cbiAgICAgICAgICAgICwncGFzc3dvcmQnIDogZGF0YVsncGFzc3dvcmQnXVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGNvbnRleHQuYWN0aW9uc1snc2VuZC1hY2NvdW50LWVkaXQtZGF0YSddKHtmaWx0ZXJzOiBwYWNrZXR9KTtcbiAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydhY2NvdW50LWVkaXQtdmlldyddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2FjY291bnQtZWRpdC12aWV3J10uc3BsaWNlKFxuICAgICAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnYWNjb3VudC1lZGl0LXZpZXcnXS5pbmRleE9mKHByb21pc2UpLCAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5ldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZXZlbnRzW3Jlc3VsdC5ldmVudF0oY29udGV4dCwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAnaWQnIDogZGF0YVsnaWQnXVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGNvbnRleHQuYWN0aW9uc1snc2VuZC1hbm5vdGF0b3ItdG8tY2FtcGFpZ24nXSh7ZmlsdGVyczogcGFja2V0fSk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnd29ya2VyLXNlbGVjdC12aWV3J10ucHVzaChwcm9taXNlKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnd29ya2VyLXNlbGVjdC12aWV3J10uc3BsaWNlKFxuICAgICAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnd29ya2VyLXNlbGVjdC12aWV3J10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydjaGFuZ2UtY2FtcGFpZ24tc3RhdGUnXSgpO1xuICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ21hbmFnZXItdmlldyddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ21hbmFnZXItdmlldyddLnNwbGljZShcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ21hbmFnZXItdmlldyddLmluZGV4T2YocHJvbWlzZSksIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5ldmVudHNbcmVzdWx0LmV2ZW50XShjb250ZXh0LCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCxkYXRhKSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2NyZWF0ZS1jYW1wYWlnbi12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnY3JlYXRlLWNhbXBhaWduLXZpZXcnKTtcbiAgICAgICAgICAgIGNvbnRleHQudm1zWydjcmVhdGUtY2FtcGFpZ24tdmlldyddLmluaXQoe21hc2s6ICdjcmVhdGUtY2FtcGFpZ24tZm9ybSd9KTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snY3JlYXRlLWNhbXBhaWduLWZvcm0nXS5pbml0KHt9LGRhdGEuZXJyb3JzLCBkYXRhLmZpZWxkcyk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgICAgICAgJ2Fubm90YXRpb25fcmVwbGljYScgOiBkYXRhWydhbm5vdGF0aW9uX3JlcGxpY2EnXVxuICAgICAgICAgICAgLCdhbm5vdGF0aW9uX3NpemUnIDogZGF0YVsnYW5ub3RhdGlvbl9zaXplJ11cbiAgICAgICAgICAgICwnbmFtZScgOiBkYXRhWyduYW1lJ11cbiAgICAgICAgICAgICwnc2VsZWN0aW9uX3JlcGxpY2EnIDogZGF0YVsnc2VsZWN0aW9uX3JlcGxpY2EnXVxuICAgICAgICAgICAgLCd0aHJlc2hvbGQnIDogZGF0YVsndGhyZXNob2xkJ11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBjb250ZXh0LmFjdGlvbnNbJ3NlbmQtY3JlYXRlLWNhbXBhaWduLWRhdGEnXSh7ZmlsdGVyczogcGFja2V0fSk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnY3JlYXRlLWNhbXBhaWduLXZpZXcnXS5wdXNoKHByb21pc2UpO1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydjcmVhdGUtY2FtcGFpZ24tdmlldyddLnNwbGljZShcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2NyZWF0ZS1jYW1wYWlnbi12aWV3J10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2NyZWF0ZS1jYW1wYWlnbi12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnY3JlYXRlLWNhbXBhaWduLXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snY3JlYXRlLWNhbXBhaWduLXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LGRhdGEpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LnZtc1snZWRpdC1jYW1wYWlnbi12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnZWRpdC1jYW1wYWlnbi12aWV3Jyk7XG4gICAgICAgICAgICBjb250ZXh0LnZtc1snZWRpdC1jYW1wYWlnbi12aWV3J10uaW5pdCh7bWFzazogJ2VkaXQtY2FtcGFpZ24tZm9ybSd9KTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snZWRpdC1jYW1wYWlnbi1mb3JtJ10uaW5pdCh7fSxkYXRhLmVycm9ycyxkYXRhLmZpZWxkcyk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2VkaXQtY2FtcGFpZ24tdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2VkaXQtY2FtcGFpZ24tdmlldycpO1xuICAgICAgICB9XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCJodHRwOi8vYXd0LmlmbWxlZGl0Lm9yZ1wiICsgZGF0YS5pZCxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgKFwiQXV0aG9yaXphdGlvblwiLCBcIkFQSVRva2VuIFwiKyBjb250ZXh0LnJlcG9zaXRvcmllcy5jdXJyZW50X3VzZXIudG9rZW4pO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgY29udGV4dC52bXNbJ2VkaXQtY2FtcGFpZ24tZm9ybSddLmluaXQoe30se30sIG15b2JqKTtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAnYW5ub3RhdGlvbl9yZXBsaWNhJyA6IGRhdGFbJ2Fubm90YXRpb25fcmVwbGljYSddXG4gICAgICAgICAgICAsJ2Fubm90YXRpb25fc2l6ZScgOiBkYXRhWydhbm5vdGF0aW9uX3NpemUnXVxuICAgICAgICAgICAgLCduYW1lJyA6IGRhdGFbJ25hbWUnXVxuICAgICAgICAgICAgLCdzZWxlY3Rpb25fcmVwbGljYScgOiBkYXRhWydzZWxlY3Rpb25fcmVwbGljYSddXG4gICAgICAgICAgICAsJ3RocmVzaG9sZCcgOiBkYXRhWyd0aHJlc2hvbGQnXVxuICAgICAgICAgICAgLCdpZCc6IGRhdGFbJ2lkJ11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBjb250ZXh0LmFjdGlvbnNbJ3NlbmQtZWRpdC1jYW1wYWlnbiddKHtmaWx0ZXJzOiBwYWNrZXR9KTtcbiAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydlZGl0LWNhbXBhaWduLXZpZXcnXS5wdXNoKHByb21pc2UpO1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydlZGl0LWNhbXBhaWduLXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydlZGl0LWNhbXBhaWduLXZpZXcnXS5pbmRleE9mKHByb21pc2UpLCAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5ldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZXZlbnRzW3Jlc3VsdC5ldmVudF0oY29udGV4dCwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LnZtc1snc2hvdy1jYW1wYWlnbiddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ3Nob3ctY2FtcGFpZ24nKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snc2hvdy1jYW1wYWlnbiddLmluaXQoKTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydob21lLWJhciddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2hvbWUtYmFyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ2hvbWUtYmFyJ10uaW5pdCgpO1xuICAgICAgICBpZighJC5pc0VtcHR5T2JqZWN0KGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXSkpe1xuICAgICAgICAgICAgaWYoY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJNQVNURVJcIil7XG4gICAgICAgICAgICAgICAgY29udGV4dC50b3AuaXNMb2dpbih0cnVlLGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXS51c2VybmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKHRydWUsY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLnVzZXJuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKGZhbHNlLCBcIlwiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LnZtc1snaW1hZ2UtYW5ub3RhdGlvbiddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2ltYWdlLWFubm90YXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snaW1hZ2UtYW5ub3RhdGlvbiddLmluaXQoKTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAnYW5ub3RhdGlvbicgOiBkYXRhWydhbm5vdGF0aW9uJ11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBjb250ZXh0LmFjdGlvbnNbJ3NlbmQtaW1hZ2VzLWFubm90YXRpb24nXSh7ZmlsdGVyczogcGFja2V0fSk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnaW1hZ2UtYW5ub3RhdGlvbiddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLWFubm90YXRpb24nXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydpbWFnZS1hbm5vdGF0aW9uJ10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2ltYWdlLXNlbGVjdGlvbiddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2ltYWdlLXNlbGVjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQudm1zWydpbWFnZS1zZWxlY3Rpb24nXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgICAgICAgJ2FjY2VwdGVkJyA6IGRhdGFbJ2FjY2VwdGVkJ11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBjb250ZXh0LmFjdGlvbnNbJ3NlbmQtaW1hZ2Utc2VsZWN0aW9uJ10oe2ZpbHRlcnM6IHBhY2tldH0pO1xuICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLXNlbGVjdGlvbiddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLXNlbGVjdGlvbiddLnNwbGljZShcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLXNlbGVjdGlvbiddLmluZGV4T2YocHJvbWlzZSksIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5ldmVudHNbcmVzdWx0LmV2ZW50XShjb250ZXh0LCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydpbWFnZS11cGxvYWQtdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2ltYWdlLXVwbG9hZC12aWV3Jyk7XG4gICAgICAgICAgICBjb250ZXh0LnZtc1snaW1hZ2UtdXBsb2FkLXZpZXcnXS5pbml0KHttYXNrOiAnaW1hZ2UtdXBsb2FkLWZvcm0nfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ2ltYWdlLXVwbG9hZC1mb3JtJ10uaW5pdCgpO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydpbWFnZS11cGxvYWQtdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2ltYWdlLXVwbG9hZC12aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ2ltYWdlLXVwbG9hZC12aWV3J10uaW5pdCgpO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCwgZGF0YSkge1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgICAgdmFyIHBhY2tldCA9IHtcbiAgICAgICAgICAgICdpbWFnZScgOiBkYXRhWydpbWFnZSddXG4gICAgICAgICAgICAsJ25hbWUnIDogZGF0YVsnbmFtZSddXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLWltYWdlLXVwbG9hZC1kYXRhJ10oe2ZpbHRlcnM6IHBhY2tldH0pO1xuICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2ltYWdlLXVwbG9hZC12aWV3J10ucHVzaChwcm9taXNlKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnaW1hZ2UtdXBsb2FkLXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydpbWFnZS11cGxvYWQtdmlldyddLmluZGV4T2YocHJvbWlzZSksIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5ldmVudHNbcmVzdWx0LmV2ZW50XShjb250ZXh0LCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmNyZWF0ZUV2ZW50cyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ21hbmFnZXItZ28nOiByZXF1aXJlKCcuL21hbmFnZXItZ28nKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2ltYWdlLXVwbG9hZC1nbyc6IHJlcXVpcmUoJy4vaW1hZ2UtdXBsb2FkLWdvJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCd3b3JrZXItc2VsZWN0LWdvJzogcmVxdWlyZSgnLi93b3JrZXItc2VsZWN0LWdvJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdsb2dpbi1nbyc6IHJlcXVpcmUoJy4vbG9naW4tZ28nKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ3JlZ2lzdGVyLWdvJzogcmVxdWlyZSgnLi9yZWdpc3Rlci1nbycpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnbG9nb3V0JzogcmVxdWlyZSgnLi9sb2dvdXQnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2FjY291bnQtZWRpdC1nbyc6IHJlcXVpcmUoJy4vYWNjb3VudC1lZGl0LWdvJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdjYW1wYWlnbi1jcmVhdGUnOiByZXF1aXJlKCcuL2NhbXBhaWduLWNyZWF0ZScpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnY2FtcGFpZ24tZWRpdC1nbyc6IHJlcXVpcmUoJy4vY2FtcGFpZ24tZWRpdC1nbycpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnY2FtcGFpZ24tY2hhbmdlLXN0YXRlJzogcmVxdWlyZSgnLi9jYW1wYWlnbi1jaGFuZ2Utc3RhdGUnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2FjY291bnQtZWRpdC1mYWlsdXJlJzogcmVxdWlyZSgnLi9hY2NvdW50LWVkaXQtZmFpbHVyZScpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnb24tYWNjb3VudC1lZGl0LXN1Y2Nlc3MnOiByZXF1aXJlKCcuL29uLWFjY291bnQtZWRpdC1zdWNjZXNzJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdjYW1wYWlnbi1jcmVhdGUtZmFpbHVyZSc6IHJlcXVpcmUoJy4vY2FtcGFpZ24tY3JlYXRlLWZhaWx1cmUnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2NhbXBhaWduLWVkaXQtZmFpbHVyZSc6IHJlcXVpcmUoJy4vY2FtcGFpZ24tZWRpdC1mYWlsdXJlJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdpbWFnZS1zZWxlY3Rpb24tZ28nOiByZXF1aXJlKCcuL2ltYWdlLXNlbGVjdGlvbi1nbycpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwndGFzay1nbyc6IHJlcXVpcmUoJy4vdGFzay1nbycpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnaW1hZ2UtdXBsb2FkLWZhaWx1cmUnOiByZXF1aXJlKCcuL2ltYWdlLXVwbG9hZC1mYWlsdXJlJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdpbWFnZS1hbm5vdGF0aW9uLWdvJzogcmVxdWlyZSgnLi9pbWFnZS1hbm5vdGF0aW9uLWdvJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdhY2NvdW50LWVkaXQtc3VibWl0JzogcmVxdWlyZSgnLi9hY2NvdW50LWVkaXQtc3VibWl0JykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdjYW1wYWlnbi1jcmVhdGUtc3VibWl0JzogcmVxdWlyZSgnLi9jYW1wYWlnbi1jcmVhdGUtc3VibWl0JykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdjYW1wYWlnbi1lZGl0LXN1Ym1pdCc6IHJlcXVpcmUoJy4vY2FtcGFpZ24tZWRpdC1zdWJtaXQnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2ltYWdlLWFubm90YXRpb24tc3VibWl0JzogcmVxdWlyZSgnLi9pbWFnZS1hbm5vdGF0aW9uLXN1Ym1pdCcpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnaW1hZ2Utc2VsZWN0aW9uLXN1Ym1pdCc6IHJlcXVpcmUoJy4vaW1hZ2Utc2VsZWN0aW9uLXN1Ym1pdCcpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnaW1hZ2UtdXBsb2FkLXN1Ym1pdCc6IHJlcXVpcmUoJy4vaW1hZ2UtdXBsb2FkLXN1Ym1pdCcpLmNyZWF0ZUV2ZW50KG9wdGlvbnMpXG4gICAgICAgICwnbG9naW4tc3VibWl0JzogcmVxdWlyZSgnLi9sb2dpbi1zdWJtaXQnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ2NhbXBhaWduLXNob3cnOiByZXF1aXJlKCcuL2NhbXBhaWduLXNob3cnKS5jcmVhdGVFdmVudChvcHRpb25zKVxuICAgICAgICAsJ3JlZ2lzdGVyLXN1Ym1pdCc6IHJlcXVpcmUoJy4vcmVnaXN0ZXItc3VibWl0JykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCd3b3JrZXItc3VibWl0LXRvLWNhbXBhaWduJzogcmVxdWlyZSgnLi93b3JrZXItc3VibWl0LXRvLWNhbXBhaWduJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdhbm5vdGF0b3Itc3VibWl0LXRvLWNhbXBhaWduJzogcmVxdWlyZSgnLi9hbm5vdGF0b3Itc3VibWl0LXRvLWNhbXBhaWduJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdsb2dpbi1mYWlsdXJlJzogcmVxdWlyZSgnLi9sb2dpbi1mYWlsdXJlJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdyZWdpc3Rlci1mYWlsdXJlJzogcmVxdWlyZSgnLi9yZWdpc3Rlci1mYWlsdXJlJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICAgICAgLCdob21lJzogcmVxdWlyZSgnLi9ob21lJykuY3JlYXRlRXZlbnQob3B0aW9ucylcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsZGF0YSkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydsb2dpbi12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnbG9naW4tdmlldycpO1xuICAgICAgICAgICAgY29udGV4dC52bXNbJ2xvZ2luLXZpZXcnXS5pbml0KHttYXNrOiAnbG9naW4tZm9ybSd9KTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snbG9naW4tZm9ybSddLmluaXQoe30sZGF0YS5lcnJvcnMsIGRhdGEuZmllbGRzKTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LnZtc1snbG9naW4tdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2xvZ2luLXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snbG9naW4tdmlldyddLmluaXQoKTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAncGFzc3dvcmQnIDogZGF0YVsncGFzc3dvcmQnXVxuICAgICAgICAgICAgLCd1c2VybmFtZScgOiBkYXRhWyd1c2VybmFtZSddXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLWxvZ2luLWRhdGEnXSh7ZmlsdGVyczogcGFja2V0fSk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnbG9naW4tdmlldyddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ2xvZ2luLXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydsb2dpbi12aWV3J10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIC8vIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLWxvZ291dC1kYXRhJ10oKTtcbiAgICAgICAgLy8gY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydtYWluLWFwcGxpY2F0aW9uJ10ucHVzaChwcm9taXNlKTtcbiAgICAgICAgLy8gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgLy8gICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsnbWFpbi1hcHBsaWNhdGlvbiddLnNwbGljZShcbiAgICAgICAgLy8gICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ21haW4tYXBwbGljYXRpb24nXS5pbmRleE9mKHByb21pc2UpLCAxXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgaWYgKHJlc3VsdC5ldmVudCkge1xuICAgICAgICAvLyAgICAgICAgIGNvbnRleHQuZXZlbnRzW3Jlc3VsdC5ldmVudF0oY29udGV4dCwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnL2FwaS9hdXRoXCIsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIChcIkF1dGhvcml6YXRpb25cIiwgXCJBUElUb2tlbiBcIisgY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnRva2VuKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgdmFyIG15b2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyID0ge31cbiAgICAgICAgICAgIGlmICghY29udGV4dC52bXNbJ2hvbWUtYmFyJ10pIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ2hvbWUtYmFyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LnZtc1snaG9tZS1iYXInXS5pbml0KCk7XG4gICAgICAgICAgICBpZighJC5pc0VtcHR5T2JqZWN0KGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXSkpe1xuICAgICAgICAgICAgICAgIGlmKGNvbnRleHQucmVwb3NpdG9yaWVzLmN1cnJlbnRfdXNlci50eXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiTUFTVEVSXCIpe1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKHRydWUsY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLnVzZXJuYW1lLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC50b3AuaXNMb2dpbih0cnVlLGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXS51c2VybmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnRleHQudG9wLmlzTG9naW4oZmFsc2UsIFwiXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfX0pO1xuICAgIH07XG59O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5leHBvcnRzLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKCkgeyAvLyBhZGQgXCJvcHRpb25zXCIgcGFyYW1ldGVyIGlmIG5lZWRlZFxuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBpZiAoIWNvbnRleHQudm1zWydtYW5hZ2VyLXZpZXcnXSkge1xuICAgICAgICAgICAgY29udGV4dC50b3AuYWN0aXZlKCdtYW5hZ2VyLXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snbWFuYWdlci12aWV3J10uaW5pdCgpO1xuICAgICAgICBpZighJC5pc0VtcHR5T2JqZWN0KGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXSkpe1xuICAgICAgICAgICAgaWYoY29udGV4dC5yZXBvc2l0b3JpZXMuY3VycmVudF91c2VyLnR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJNQVNURVJcIil7XG4gICAgICAgICAgICAgICAgY29udGV4dC50b3AuaXNMb2dpbih0cnVlLGNvbnRleHQucmVwb3NpdG9yaWVzWydjdXJyZW50X3VzZXInXS51c2VybmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKHRydWUsY29udGV4dC5yZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddLnVzZXJuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5pc0xvZ2luKGZhbHNlLCBcIlwiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcbi8vdG8gZml4IGl0IGRlcGVuZHNcbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ2FjY291bnQtZWRpdC12aWV3J10pIHtcbiAgICAgICAgICAgIGNvbnRleHQudG9wLmFjdGl2ZSgnYWNjb3VudC1lZGl0LXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnZtc1snYWNjb3VudC1lZGl0LXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ3JlZ2lzdGVyLWZvcm0nXSkge1xuICAgICAgICAgICAgY29udGV4dC50b3AuYWN0aXZlKCdyZWdpc3Rlci1mb3JtJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ3JlZ2lzdGVyLWZvcm0nXS5pbml0KHt9LGRhdGEuZXJyb3JzLCBkYXRhLmZpZWxkcyk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ3JlZ2lzdGVyLXZpZXcnXSkge1xuICAgICAgICAgICAgY29udGV4dC50b3AuYWN0aXZlKCdyZWdpc3Rlci12aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC52bXNbJ3JlZ2lzdGVyLXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG5cbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uICgpIHsgLy8gYWRkIFwib3B0aW9uc1wiIHBhcmFtZXRlciBpZiBuZWVkZWRcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAnYWNjb3VudC10eXBlJyA6IGRhdGFbJ2FjY291bnQtdHlwZSddXG4gICAgICAgICAgICAsJ3Bhc3N3b3JkJyA6IGRhdGFbJ3Bhc3N3b3JkJ11cbiAgICAgICAgICAgICwnZnVsbG5hbWUnIDogZGF0YVsnZnVsbG5hbWUnXVxuICAgICAgICAgICAgLCd1c2VybmFtZScgOiBkYXRhWyd1c2VybmFtZSddXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwcm9taXNlID0gY29udGV4dC5hY3Rpb25zWydzZW5kLXJlZ2lzdHJhdGlvbi1kYXRhJ10oe2ZpbHRlcnM6IHBhY2tldH0sY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQucnVubmluZ0FjdGlvbnNCeUNvbnRhaW5lclsncmVnaXN0ZXItdmlldyddLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZXh0LnJ1bm5pbmdBY3Rpb25zQnlDb250YWluZXJbJ3JlZ2lzdGVyLXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWydyZWdpc3Rlci12aWV3J10uaW5kZXhPZihwcm9taXNlKSwgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50c1tyZXN1bHQuZXZlbnRdKGNvbnRleHQsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ3Rhc2stdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ3Rhc2stdmlldycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQudm1zWyd0YXNrLXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dC52bXNbJ3dvcmtlci1zZWxlY3QtdmlldyddKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRvcC5hY3RpdmUoJ3dvcmtlci1zZWxlY3QtdmlldycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQudm1zWyd3b3JrZXItc2VsZWN0LXZpZXcnXS5pbml0KCk7XG4gICAgfTtcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7IC8vIGFkZCBcIm9wdGlvbnNcIiBwYXJhbWV0ZXIgaWYgbmVlZGVkXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgICAgICAgJ2lkJyA6IGRhdGFbJ2lkJ11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBjb250ZXh0LmFjdGlvbnNbJ3NlbmQtd29ya2Vycy10by1jYW1wYWlnbiddKHtmaWx0ZXJzOiBwYWNrZXR9KTtcbiAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWyd3b3JrZXItc2VsZWN0LXZpZXcnXS5wdXNoKHByb21pc2UpO1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWyd3b3JrZXItc2VsZWN0LXZpZXcnXS5zcGxpY2UoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyWyd3b3JrZXItc2VsZWN0LXZpZXcnXS5pbmRleE9mKHByb21pc2UpLCAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5ldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZXZlbnRzW3Jlc3VsdC5ldmVudF0oY29udGV4dCwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXG4gICAgcmVwb3NpdG9yaWVzID0gcmVxdWlyZSgnLi9yZXBvc2l0b3JpZXMnKSxcbiAgICBjb250cm9scyA9IHJlcXVpcmUoJy4vY29udHJvbHMnKSxcbiAgICBldmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpLFxuICAgIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMnKSxcbiAgICBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpO1xuXG5Qcm9taXNlLmNvbmZpZyh7Y2FuY2VsbGF0aW9uOiB0cnVlfSk7XG5cbmNvbnRyb2xzLnJlZ2lzdGVyKCk7XG4vLyBUT0RPOiByZWdpc3RlciBhbnkgY3VzdG9tIGNvbnRyb2xcblxuZnVuY3Rpb24gQXBwbGljYXRpb25WaWV3TW9kZWwoKSB7XG4gICAgLy8gVE9ETzogaW5pdGlhbGl6ZSBnbG9iYWwgc3RhdGVcbiAgICB2YXIgcmVwb3MgPSByZXBvc2l0b3JpZXMuY3JlYXRlUmVwb3NpdG9yaWVzKHt9KTtcbiAgICB0aGlzLmNvbnRleHQgPSB7XG4gICAgICAgIHJlcG9zaXRvcmllczogcmVwb3MsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLmNyZWF0ZUV2ZW50cyh7fSksXG4gICAgICAgIGFjdGlvbnM6IGFjdGlvbnMuY3JlYXRlQWN0aW9ucyh7cmVwb3NpdG9yaWVzOiByZXBvc30pLFxuICAgICAgICB2bXM6IHt9LFxuICAgICAgICBydW5uaW5nQWN0aW9uc0J5Q29udGFpbmVyOiB7fVxuICAgIH07XG59XG5cbnZhciBhcHBsaWNhdGlvbiA9IG5ldyBBcHBsaWNhdGlvblZpZXdNb2RlbCgpO1xuXG5rby5hcHBseUJpbmRpbmdzKGFwcGxpY2F0aW9uKTtcblxuYXBwbGljYXRpb24uY29udGV4dC50b3AuaW5pdCgpO1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICBEYXRhU3RvcmUgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snTmVkYiddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnTmVkYiddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFJlcG9zaXRvcnkob3B0aW9ucykge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBvc2l0b3J5KSkge1xuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogaW5pdGlhbGl6YXRpb25cblxuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEJFR0lOXG4gICAgdGhpcy5kYiA9IFByb21pc2UucHJvbWlzaWZ5QWxsKG5ldyBEYXRhU3RvcmUoe1xuICAgICAgICBmaWxlbmFtZTogJ2NhbXBhaWduJyxcbiAgICAgICAgaW5NZW1vcnlPbmx5OiB0cnVlXG4gICAgfSkpO1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEVORFxufVxuXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCB0aGUgYWNjZXNzb3IgdG8gdGhlIGRhdGFzb3VyY2Ugd2hpY2ggcmV0dXJucyBhIHByb21pc2VcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBCRUdJTlxuICAgIHJldHVybiB0aGlzLmRiLmZpbmRPbmVBc3luYyh7aWQ6IGlkfSk7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgRU5EXG59O1xuXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKGZpZWxkcywgcHJvamVjdCkge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCB0aGUgYWNjZXNzb3IgdG8gdGhlIGRhdGFzb3VyY2Ugd2hpY2ggcmV0dXJucyBhIHByb21pc2VcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBCRUdJTlxuICAgIHJldHVybiB0aGlzLmRiLmZpbmRBc3luYyhmaWVsZHMsIHByb2plY3QpO1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEVORFxufTtcblxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcbiIsIi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3JpZXMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciByZXBvc2l0b3JpZXMgPSB7fVxuICAgIHJlcG9zaXRvcmllc1snY2FtcGFpZ24nXSA9IHJlcXVpcmUoJy4vY2FtcGFpZ24nKS5jcmVhdGVSZXBvc2l0b3J5KG9wdGlvbnMpO1xuICAgIHJlcG9zaXRvcmllc1sndGFza3MnXSA9IHJlcXVpcmUoJy4vdGFza3MnKS5jcmVhdGVSZXBvc2l0b3J5KG9wdGlvbnMpO1xuICAgIHJlcG9zaXRvcmllc1snd29ya2VycyddID0gcmVxdWlyZSgnLi93b3JrZXJzJykuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKTtcbiAgICByZXBvc2l0b3JpZXNbJ2N1cnJlbnRfdXNlciddID0ge307XG4gICAgcmV0dXJuIHJlcG9zaXRvcmllcztcbn07XG4iLCIvKmpzbGludCBub2RlOiB0cnVlLCBub21lbjogdHJ1ZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQcm9taXNlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb21pc2UnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb21pc2UnXSA6IG51bGwpLFxuICAgIERhdGFTdG9yZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydOZWRiJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydOZWRiJ10gOiBudWxsKTtcblxuZnVuY3Rpb24gUmVwb3NpdG9yeShvcHRpb25zKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVwb3NpdG9yeShvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBpbml0aWFsaXphdGlvblxuXG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgQkVHSU5cbiAgICB0aGlzLmRiID0gUHJvbWlzZS5wcm9taXNpZnlBbGwobmV3IERhdGFTdG9yZSh7XG4gICAgICAgIGZpbGVuYW1lOiAndGFza3MnLFxuICAgICAgICBpbk1lbW9yeU9ubHk6IHRydWVcbiAgICB9KSk7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgRU5EXG59XG5cblJlcG9zaXRvcnkucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHRoZSBhY2Nlc3NvciB0byB0aGUgZGF0YXNvdXJjZSB3aGljaCByZXR1cm5zIGEgcHJvbWlzZVxuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEJFR0lOXG4gICAgcmV0dXJuIHRoaXMuZGIuZmluZE9uZUFzeW5jKHtpZDogaWR9KTtcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBFTkRcbn07XG5cblJlcG9zaXRvcnkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAoZmllbGRzLCBwcm9qZWN0KSB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHRoZSBhY2Nlc3NvciB0byB0aGUgZGF0YXNvdXJjZSB3aGljaCByZXR1cm5zIGEgcHJvbWlzZVxuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEJFR0lOXG4gICAgcmV0dXJuIHRoaXMuZGIuZmluZEFzeW5jKGZpZWxkcywgcHJvamVjdCk7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgRU5EXG59O1xuXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xuIiwiLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUHJvbWlzZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9taXNlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9taXNlJ10gOiBudWxsKSxcbiAgICBEYXRhU3RvcmUgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snTmVkYiddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnTmVkYiddIDogbnVsbCk7XG5cbmZ1bmN0aW9uIFJlcG9zaXRvcnkob3B0aW9ucykge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBvc2l0b3J5KSkge1xuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogaW5pdGlhbGl6YXRpb25cblxuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEJFR0lOXG4gICAgdGhpcy5kYiA9IFByb21pc2UucHJvbWlzaWZ5QWxsKG5ldyBEYXRhU3RvcmUoe1xuICAgICAgICBmaWxlbmFtZTogJ3dvcmtlcnMnLFxuICAgICAgICBpbk1lbW9yeU9ubHk6IHRydWVcbiAgICB9KSk7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgRU5EXG59XG5cblJlcG9zaXRvcnkucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHRoZSBhY2Nlc3NvciB0byB0aGUgZGF0YXNvdXJjZSB3aGljaCByZXR1cm5zIGEgcHJvbWlzZVxuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEJFR0lOXG4gICAgcmV0dXJuIHRoaXMuZGIuZmluZE9uZUFzeW5jKHtpZDogaWR9KTtcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyBFTkRcbn07XG5cblJlcG9zaXRvcnkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAoZmllbGRzLCBwcm9qZWN0KSB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHRoZSBhY2Nlc3NvciB0byB0aGUgZGF0YXNvdXJjZSB3aGljaCByZXR1cm5zIGEgcHJvbWlzZVxuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIEJFR0lOXG4gICAgcmV0dXJuIHRoaXMuZGIuZmluZEFzeW5jKGZpZWxkcywgcHJvamVjdCk7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgRU5EXG59O1xuXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xuIl19

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
    // parameters['annotation_replica']
    // parameters['annotation_size']
    // parameters['name']
    // parameters['selection_replica']
    // parameters['threshold']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'send-create-campaign-data'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'campaign-create-failure', // campaign-create-failure
        // event: 'image-upload-go', // image-upload-go
        data: {
            'Location': '0',
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

},{}],6:[function(require,module,exports){
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
    // parameters['annotation_replica']
    // parameters['annotation_size']
    // parameters['name']
    // parameters['selection_replica']
    // parameters['threshold']
    // parameters['url']

    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    $.notify({message: 'send-edit-campaign'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'campaign-edit-go', // campaign-edit-go
        // event: 'campaign-edit-failure', // campaign-edit-failure
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
module.exports = "<h3>create-campaign-form</h3><form>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['annotation_replica']}\">        <label for=\"create-campaign-form_field_0\" data-bind=\"css: {active: fields()['annotation_replica']}, attr: {'data-error': errors()['annotation_replica']}\" class=\"control-label\">annotation_replica</label>        <input id=\"create-campaign-form_field_0\" data-bind=\"value: fields()['annotation_replica']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"create-campaign-form_field_0_error\">        <span id=\"create-campaign-form_field_0_error\" class=\"help-block\" data-bind=\"text: errors()['annotation_replica']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['annotation_size']}\">        <label for=\"create-campaign-form_field_1\" data-bind=\"css: {active: fields()['annotation_size']}, attr: {'data-error': errors()['annotation_size']}\" class=\"control-label\">annotation_size</label>        <input id=\"create-campaign-form_field_1\" data-bind=\"value: fields()['annotation_size']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"create-campaign-form_field_1_error\">        <span id=\"create-campaign-form_field_1_error\" class=\"help-block\" data-bind=\"text: errors()['annotation_size']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['name']}\">        <label for=\"create-campaign-form_field_2\" data-bind=\"css: {active: fields()['name']}, attr: {'data-error': errors()['name']}\" class=\"control-label\">name</label>        <input id=\"create-campaign-form_field_2\" data-bind=\"value: fields()['name']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"create-campaign-form_field_2_error\">        <span id=\"create-campaign-form_field_2_error\" class=\"help-block\" data-bind=\"text: errors()['name']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['selection_replica']}\">        <label for=\"create-campaign-form_field_3\" data-bind=\"css: {active: fields()['selection_replica']}, attr: {'data-error': errors()['selection_replica']}\" class=\"control-label\">selection_replica</label>        <input id=\"create-campaign-form_field_3\" data-bind=\"value: fields()['selection_replica']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"create-campaign-form_field_3_error\">        <span id=\"create-campaign-form_field_3_error\" class=\"help-block\" data-bind=\"text: errors()['selection_replica']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['threshold']}\">        <label for=\"create-campaign-form_field_4\" data-bind=\"css: {active: fields()['threshold']}, attr: {'data-error': errors()['threshold']}\" class=\"control-label\">threshold</label>        <input id=\"create-campaign-form_field_4\" data-bind=\"value: fields()['threshold']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"create-campaign-form_field_4_error\">        <span id=\"create-campaign-form_field_4_error\" class=\"help-block\" data-bind=\"text: errors()['threshold']\"></span>    </div></form><div class=\"row\">    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data, 'campaign-create-submit')\">campaign-create-submit</a></div>";

},{}],23:[function(require,module,exports){
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

ViewModel.prototype.id = 'create-campaign-form';

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
module.exports = "<span>    <!-- create-campaign-form -->    <c-create-campaign-form params=\"context: context\"></c-create-campaign-form></span>";

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
module.exports = "<h3>edit-campaign-form</h3><form>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['annotation_replica']}\">        <label for=\"edit-campaign-form_field_0\" data-bind=\"css: {active: fields()['annotation_replica']}, attr: {'data-error': errors()['annotation_replica']}\" class=\"control-label\">annotation_replica</label>        <input id=\"edit-campaign-form_field_0\" data-bind=\"value: fields()['annotation_replica']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"edit-campaign-form_field_0_error\">        <span id=\"edit-campaign-form_field_0_error\" class=\"help-block\" data-bind=\"text: errors()['annotation_replica']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['annotation_size']}\">        <label for=\"edit-campaign-form_field_1\" data-bind=\"css: {active: fields()['annotation_size']}, attr: {'data-error': errors()['annotation_size']}\" class=\"control-label\">annotation_size</label>        <input id=\"edit-campaign-form_field_1\" data-bind=\"value: fields()['annotation_size']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"edit-campaign-form_field_1_error\">        <span id=\"edit-campaign-form_field_1_error\" class=\"help-block\" data-bind=\"text: errors()['annotation_size']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['name']}\">        <label for=\"edit-campaign-form_field_2\" data-bind=\"css: {active: fields()['name']}, attr: {'data-error': errors()['name']}\" class=\"control-label\">name</label>        <input id=\"edit-campaign-form_field_2\" data-bind=\"value: fields()['name']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"edit-campaign-form_field_2_error\">        <span id=\"edit-campaign-form_field_2_error\" class=\"help-block\" data-bind=\"text: errors()['name']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['selection_replica']}\">        <label for=\"edit-campaign-form_field_3\" data-bind=\"css: {active: fields()['selection_replica']}, attr: {'data-error': errors()['selection_replica']}\" class=\"control-label\">selection_replica</label>        <input id=\"edit-campaign-form_field_3\" data-bind=\"value: fields()['selection_replica']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"edit-campaign-form_field_3_error\">        <span id=\"edit-campaign-form_field_3_error\" class=\"help-block\" data-bind=\"text: errors()['selection_replica']\"></span>    </div>    <div class=\"form-group\" data-bind=\"css: {'has-error': errors()['threshold']}\">        <label for=\"edit-campaign-form_field_4\" data-bind=\"css: {active: fields()['threshold']}, attr: {'data-error': errors()['threshold']}\" class=\"control-label\">threshold</label>        <input id=\"edit-campaign-form_field_4\" data-bind=\"value: fields()['threshold']\" type=\"text\" class=\"form-control validate\" aria-describedby=\"edit-campaign-form_field_4_error\">        <span id=\"edit-campaign-form_field_4_error\" class=\"help-block\" data-bind=\"text: errors()['threshold']\"></span>    </div></form><div class=\"row\">    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data, 'campaign-edit-submit')\">event</a></div>";

},{}],27:[function(require,module,exports){
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
module.exports = "<span>    <!-- edit-campaign-form -->    <c-edit-campaign-form params=\"context: context\"></c-edit-campaign-form>    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,'image-upload-go')\">image-upload-go</a>    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,'worker-select-go')\">worker-select-go</a></span>";

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
module.exports = "<h3>list-campaign</h3><table class=\"table table-hover table-condensed\">    <thead>        <tr>            <th>#</th>            <th>campaign-edit</th>            <th>campaign-name</th>            <th>campaign-next_action</th>            <th>campaign-show</th>            <th>campaign-state</th>        </tr>    </thead>    <tbody data-bind=\"foreach: items\">        <tr data-bind=\"click: $parent.select\">            <td data-bind=\"text: id\"></td>            <td data-bind=\"text: $data['campaign-edit']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['campaign-name']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['campaign-next_action']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['campaign-show']\" style=\"white-space: pre-wrap\"></td>            <td data-bind=\"text: $data['campaign-state']\" style=\"white-space: pre-wrap\"></td>        </tr>        </tbody></table>";

},{}],50:[function(require,module,exports){
(function (global){
/*jslint node: true, nomen: true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    Promise = (typeof window !== "undefined" ? window['Promise'] : typeof global !== "undefined" ? global['Promise'] : null);

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

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'list-campaign';

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
module.exports = "<span>    <!-- list-campaign -->    <c-list-campaign params=\"context: context\"></c-list-campaign>    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,'campaign-create')\">campaign-create</a>    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,'campaign-edit-go')\">campaign-edit-go</a>    <a class=\"col-xs-2 btn btn-primary\" data-bind=\"click: trigger.bind($data,'campaign-change-state')\">campaign-change-state</a></span>";

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
    return function (context) {
        if (!context.vms['create-campaign-view']) {
            context.top.active('create-campaign-view');
            context.vms['create-campaign-view'].init({mask: 'create-campaign-form'});
        }
        context.vms['create-campaign-form'].init();
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
    return function (context) {
        if (!context.vms['edit-campaign-view']) {
            context.top.active('edit-campaign-view');
            context.vms['edit-campaign-view'].init({mask: 'edit-campaign-form'});
        }
        context.vms['edit-campaign-form'].init();
    };
};

},{}],81:[function(require,module,exports){
/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['edit-campaign-view']) {
            context.top.active('edit-campaign-view');
        }
        context.vms['edit-campaign-view'].init();
    };
};

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
            alert("aguacate")
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

},{"./actions":2,"./controls":69,"./events":92,"./repositories":108}],106:[function(require,module,exports){
module.exports=[
    { "_id": 0, "id": "0", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 1, "id": "1", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 2, "id": "2", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 3, "id": "3", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 4, "id": "4", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 5, "id": "5", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 6, "id": "6", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 7, "id": "7", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 8, "id": "8", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 9, "id": "9", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 10, "id": "10", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 11, "id": "11", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 12, "id": "12", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 13, "id": "13", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 14, "id": "14", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 15, "id": "15", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 16, "id": "16", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 17, "id": "17", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 18, "id": "18", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 19, "id": "19", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 20, "id": "20", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 21, "id": "21", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 22, "id": "22", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 23, "id": "23", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 24, "id": "24", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 25, "id": "25", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 26, "id": "26", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 27, "id": "27", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 28, "id": "28", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 29, "id": "29", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 30, "id": "30", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 31, "id": "31", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 32, "id": "32", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 33, "id": "33", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 34, "id": "34", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 35, "id": "35", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 36, "id": "36", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 37, "id": "37", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 38, "id": "38", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 39, "id": "39", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 40, "id": "40", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 41, "id": "41", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 42, "id": "42", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 43, "id": "43", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 44, "id": "44", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 45, "id": "45", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 46, "id": "46", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 47, "id": "47", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 48, "id": "48", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 49, "id": "49", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 50, "id": "50", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 51, "id": "51", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 52, "id": "52", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 53, "id": "53", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 54, "id": "54", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 55, "id": "55", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 56, "id": "56", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 57, "id": "57", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 58, "id": "58", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 59, "id": "59", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 60, "id": "60", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 61, "id": "61", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 62, "id": "62", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 63, "id": "63", "campaign-edit": "0", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 64, "id": "64", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 65, "id": "65", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 66, "id": "66", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 67, "id": "67", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 68, "id": "68", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 69, "id": "69", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 70, "id": "70", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 71, "id": "71", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 72, "id": "72", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 73, "id": "73", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 74, "id": "74", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 75, "id": "75", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 76, "id": "76", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 77, "id": "77", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 78, "id": "78", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 79, "id": "79", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 80, "id": "80", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 81, "id": "81", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 82, "id": "82", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 83, "id": "83", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 84, "id": "84", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 85, "id": "85", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 86, "id": "86", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 87, "id": "87", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 88, "id": "88", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 89, "id": "89", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 90, "id": "90", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 91, "id": "91", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 92, "id": "92", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 93, "id": "93", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 94, "id": "94", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 95, "id": "95", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 96, "id": "96", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 97, "id": "97", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 98, "id": "98", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 99, "id": "99", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 100, "id": "100", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 101, "id": "101", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 102, "id": "102", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 103, "id": "103", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 104, "id": "104", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 105, "id": "105", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 106, "id": "106", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 107, "id": "107", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 108, "id": "108", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 109, "id": "109", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 110, "id": "110", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 111, "id": "111", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 112, "id": "112", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 113, "id": "113", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 114, "id": "114", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 115, "id": "115", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 116, "id": "116", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 117, "id": "117", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 118, "id": "118", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 119, "id": "119", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 120, "id": "120", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 121, "id": "121", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 122, "id": "122", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 123, "id": "123", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 124, "id": "124", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 125, "id": "125", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 126, "id": "126", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 127, "id": "127", "campaign-edit": "0", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 128, "id": "128", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 129, "id": "129", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 130, "id": "130", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 131, "id": "131", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 132, "id": "132", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 133, "id": "133", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 134, "id": "134", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 135, "id": "135", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 136, "id": "136", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 137, "id": "137", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 138, "id": "138", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 139, "id": "139", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 140, "id": "140", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 141, "id": "141", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 142, "id": "142", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 143, "id": "143", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 144, "id": "144", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 145, "id": "145", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 146, "id": "146", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 147, "id": "147", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 148, "id": "148", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 149, "id": "149", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 150, "id": "150", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 151, "id": "151", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 152, "id": "152", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 153, "id": "153", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 154, "id": "154", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 155, "id": "155", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 156, "id": "156", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 157, "id": "157", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 158, "id": "158", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 159, "id": "159", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 160, "id": "160", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 161, "id": "161", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 162, "id": "162", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 163, "id": "163", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 164, "id": "164", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 165, "id": "165", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 166, "id": "166", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 167, "id": "167", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 168, "id": "168", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 169, "id": "169", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 170, "id": "170", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 171, "id": "171", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 172, "id": "172", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 173, "id": "173", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 174, "id": "174", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 175, "id": "175", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 176, "id": "176", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 177, "id": "177", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 178, "id": "178", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 179, "id": "179", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 180, "id": "180", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 181, "id": "181", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 182, "id": "182", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 183, "id": "183", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 184, "id": "184", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 185, "id": "185", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 186, "id": "186", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 187, "id": "187", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 188, "id": "188", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 189, "id": "189", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 190, "id": "190", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 191, "id": "191", "campaign-edit": "0", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 192, "id": "192", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 193, "id": "193", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 194, "id": "194", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 195, "id": "195", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 196, "id": "196", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 197, "id": "197", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 198, "id": "198", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 199, "id": "199", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 200, "id": "200", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 201, "id": "201", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 202, "id": "202", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 203, "id": "203", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 204, "id": "204", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 205, "id": "205", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 206, "id": "206", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 207, "id": "207", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 208, "id": "208", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 209, "id": "209", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 210, "id": "210", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 211, "id": "211", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 212, "id": "212", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 213, "id": "213", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 214, "id": "214", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 215, "id": "215", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 216, "id": "216", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 217, "id": "217", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 218, "id": "218", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 219, "id": "219", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 220, "id": "220", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 221, "id": "221", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 222, "id": "222", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 223, "id": "223", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 224, "id": "224", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 225, "id": "225", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 226, "id": "226", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 227, "id": "227", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 228, "id": "228", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 229, "id": "229", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 230, "id": "230", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 231, "id": "231", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 232, "id": "232", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 233, "id": "233", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 234, "id": "234", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 235, "id": "235", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 236, "id": "236", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 237, "id": "237", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 238, "id": "238", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 239, "id": "239", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 240, "id": "240", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 241, "id": "241", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 242, "id": "242", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 243, "id": "243", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 244, "id": "244", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 245, "id": "245", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 246, "id": "246", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 247, "id": "247", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 248, "id": "248", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 249, "id": "249", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 250, "id": "250", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 251, "id": "251", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 252, "id": "252", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 253, "id": "253", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 254, "id": "254", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 255, "id": "255", "campaign-edit": "0", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 256, "id": "256", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 257, "id": "257", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 258, "id": "258", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 259, "id": "259", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 260, "id": "260", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 261, "id": "261", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 262, "id": "262", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 263, "id": "263", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 264, "id": "264", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 265, "id": "265", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 266, "id": "266", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 267, "id": "267", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 268, "id": "268", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 269, "id": "269", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 270, "id": "270", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 271, "id": "271", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 272, "id": "272", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 273, "id": "273", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 274, "id": "274", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 275, "id": "275", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 276, "id": "276", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 277, "id": "277", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 278, "id": "278", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 279, "id": "279", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 280, "id": "280", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 281, "id": "281", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 282, "id": "282", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 283, "id": "283", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 284, "id": "284", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 285, "id": "285", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 286, "id": "286", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 287, "id": "287", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 288, "id": "288", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 289, "id": "289", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 290, "id": "290", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 291, "id": "291", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 292, "id": "292", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 293, "id": "293", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 294, "id": "294", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 295, "id": "295", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 296, "id": "296", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 297, "id": "297", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 298, "id": "298", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 299, "id": "299", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 300, "id": "300", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 301, "id": "301", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 302, "id": "302", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 303, "id": "303", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 304, "id": "304", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 305, "id": "305", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 306, "id": "306", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 307, "id": "307", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 308, "id": "308", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 309, "id": "309", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 310, "id": "310", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 311, "id": "311", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 312, "id": "312", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 313, "id": "313", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 314, "id": "314", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 315, "id": "315", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 316, "id": "316", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 317, "id": "317", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 318, "id": "318", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 319, "id": "319", "campaign-edit": "1", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 320, "id": "320", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 321, "id": "321", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 322, "id": "322", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 323, "id": "323", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 324, "id": "324", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 325, "id": "325", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 326, "id": "326", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 327, "id": "327", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 328, "id": "328", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 329, "id": "329", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 330, "id": "330", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 331, "id": "331", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 332, "id": "332", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 333, "id": "333", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 334, "id": "334", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 335, "id": "335", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 336, "id": "336", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 337, "id": "337", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 338, "id": "338", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 339, "id": "339", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 340, "id": "340", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 341, "id": "341", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 342, "id": "342", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 343, "id": "343", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 344, "id": "344", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 345, "id": "345", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 346, "id": "346", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 347, "id": "347", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 348, "id": "348", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 349, "id": "349", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 350, "id": "350", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 351, "id": "351", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 352, "id": "352", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 353, "id": "353", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 354, "id": "354", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 355, "id": "355", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 356, "id": "356", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 357, "id": "357", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 358, "id": "358", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 359, "id": "359", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 360, "id": "360", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 361, "id": "361", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 362, "id": "362", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 363, "id": "363", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 364, "id": "364", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 365, "id": "365", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 366, "id": "366", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 367, "id": "367", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 368, "id": "368", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 369, "id": "369", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 370, "id": "370", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 371, "id": "371", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 372, "id": "372", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 373, "id": "373", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 374, "id": "374", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 375, "id": "375", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 376, "id": "376", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 377, "id": "377", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 378, "id": "378", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 379, "id": "379", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 380, "id": "380", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 381, "id": "381", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 382, "id": "382", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 383, "id": "383", "campaign-edit": "1", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 384, "id": "384", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 385, "id": "385", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 386, "id": "386", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 387, "id": "387", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 388, "id": "388", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 389, "id": "389", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 390, "id": "390", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 391, "id": "391", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 392, "id": "392", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 393, "id": "393", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 394, "id": "394", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 395, "id": "395", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 396, "id": "396", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 397, "id": "397", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 398, "id": "398", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 399, "id": "399", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 400, "id": "400", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 401, "id": "401", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 402, "id": "402", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 403, "id": "403", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 404, "id": "404", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 405, "id": "405", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 406, "id": "406", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 407, "id": "407", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 408, "id": "408", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 409, "id": "409", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 410, "id": "410", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 411, "id": "411", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 412, "id": "412", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 413, "id": "413", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 414, "id": "414", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 415, "id": "415", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 416, "id": "416", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 417, "id": "417", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 418, "id": "418", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 419, "id": "419", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 420, "id": "420", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 421, "id": "421", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 422, "id": "422", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 423, "id": "423", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 424, "id": "424", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 425, "id": "425", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 426, "id": "426", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 427, "id": "427", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 428, "id": "428", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 429, "id": "429", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 430, "id": "430", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 431, "id": "431", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 432, "id": "432", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 433, "id": "433", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 434, "id": "434", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 435, "id": "435", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 436, "id": "436", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 437, "id": "437", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 438, "id": "438", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 439, "id": "439", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 440, "id": "440", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 441, "id": "441", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 442, "id": "442", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 443, "id": "443", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 444, "id": "444", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 445, "id": "445", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 446, "id": "446", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 447, "id": "447", "campaign-edit": "1", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 448, "id": "448", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 449, "id": "449", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 450, "id": "450", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 451, "id": "451", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 452, "id": "452", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 453, "id": "453", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 454, "id": "454", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 455, "id": "455", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 456, "id": "456", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 457, "id": "457", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 458, "id": "458", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 459, "id": "459", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 460, "id": "460", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 461, "id": "461", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 462, "id": "462", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 463, "id": "463", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 464, "id": "464", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 465, "id": "465", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 466, "id": "466", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 467, "id": "467", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 468, "id": "468", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 469, "id": "469", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 470, "id": "470", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 471, "id": "471", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 472, "id": "472", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 473, "id": "473", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 474, "id": "474", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 475, "id": "475", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 476, "id": "476", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 477, "id": "477", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 478, "id": "478", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 479, "id": "479", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 480, "id": "480", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 481, "id": "481", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 482, "id": "482", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 483, "id": "483", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 484, "id": "484", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 485, "id": "485", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 486, "id": "486", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 487, "id": "487", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 488, "id": "488", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 489, "id": "489", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 490, "id": "490", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 491, "id": "491", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 492, "id": "492", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 493, "id": "493", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 494, "id": "494", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 495, "id": "495", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 496, "id": "496", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 497, "id": "497", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 498, "id": "498", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 499, "id": "499", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 500, "id": "500", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 501, "id": "501", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 502, "id": "502", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 503, "id": "503", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 504, "id": "504", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 505, "id": "505", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 506, "id": "506", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 507, "id": "507", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 508, "id": "508", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 509, "id": "509", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 510, "id": "510", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 511, "id": "511", "campaign-edit": "1", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 512, "id": "512", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 513, "id": "513", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 514, "id": "514", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 515, "id": "515", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 516, "id": "516", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 517, "id": "517", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 518, "id": "518", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 519, "id": "519", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 520, "id": "520", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 521, "id": "521", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 522, "id": "522", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 523, "id": "523", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 524, "id": "524", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 525, "id": "525", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 526, "id": "526", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 527, "id": "527", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 528, "id": "528", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 529, "id": "529", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 530, "id": "530", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 531, "id": "531", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 532, "id": "532", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 533, "id": "533", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 534, "id": "534", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 535, "id": "535", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 536, "id": "536", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 537, "id": "537", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 538, "id": "538", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 539, "id": "539", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 540, "id": "540", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 541, "id": "541", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 542, "id": "542", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 543, "id": "543", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 544, "id": "544", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 545, "id": "545", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 546, "id": "546", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 547, "id": "547", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 548, "id": "548", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 549, "id": "549", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 550, "id": "550", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 551, "id": "551", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 552, "id": "552", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 553, "id": "553", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 554, "id": "554", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 555, "id": "555", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 556, "id": "556", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 557, "id": "557", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 558, "id": "558", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 559, "id": "559", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 560, "id": "560", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 561, "id": "561", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 562, "id": "562", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 563, "id": "563", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 564, "id": "564", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 565, "id": "565", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 566, "id": "566", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 567, "id": "567", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 568, "id": "568", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 569, "id": "569", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 570, "id": "570", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 571, "id": "571", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 572, "id": "572", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 573, "id": "573", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 574, "id": "574", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 575, "id": "575", "campaign-edit": "2", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 576, "id": "576", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 577, "id": "577", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 578, "id": "578", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 579, "id": "579", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 580, "id": "580", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 581, "id": "581", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 582, "id": "582", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 583, "id": "583", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 584, "id": "584", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 585, "id": "585", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 586, "id": "586", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 587, "id": "587", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 588, "id": "588", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 589, "id": "589", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 590, "id": "590", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 591, "id": "591", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 592, "id": "592", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 593, "id": "593", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 594, "id": "594", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 595, "id": "595", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 596, "id": "596", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 597, "id": "597", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 598, "id": "598", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 599, "id": "599", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 600, "id": "600", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 601, "id": "601", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 602, "id": "602", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 603, "id": "603", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 604, "id": "604", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 605, "id": "605", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 606, "id": "606", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 607, "id": "607", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 608, "id": "608", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 609, "id": "609", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 610, "id": "610", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 611, "id": "611", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 612, "id": "612", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 613, "id": "613", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 614, "id": "614", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 615, "id": "615", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 616, "id": "616", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 617, "id": "617", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 618, "id": "618", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 619, "id": "619", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 620, "id": "620", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 621, "id": "621", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 622, "id": "622", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 623, "id": "623", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 624, "id": "624", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 625, "id": "625", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 626, "id": "626", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 627, "id": "627", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 628, "id": "628", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 629, "id": "629", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 630, "id": "630", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 631, "id": "631", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 632, "id": "632", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 633, "id": "633", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 634, "id": "634", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 635, "id": "635", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 636, "id": "636", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 637, "id": "637", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 638, "id": "638", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 639, "id": "639", "campaign-edit": "2", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 640, "id": "640", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 641, "id": "641", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 642, "id": "642", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 643, "id": "643", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 644, "id": "644", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 645, "id": "645", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 646, "id": "646", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 647, "id": "647", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 648, "id": "648", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 649, "id": "649", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 650, "id": "650", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 651, "id": "651", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 652, "id": "652", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 653, "id": "653", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 654, "id": "654", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 655, "id": "655", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 656, "id": "656", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 657, "id": "657", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 658, "id": "658", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 659, "id": "659", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 660, "id": "660", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 661, "id": "661", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 662, "id": "662", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 663, "id": "663", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 664, "id": "664", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 665, "id": "665", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 666, "id": "666", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 667, "id": "667", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 668, "id": "668", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 669, "id": "669", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 670, "id": "670", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 671, "id": "671", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 672, "id": "672", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 673, "id": "673", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 674, "id": "674", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 675, "id": "675", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 676, "id": "676", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 677, "id": "677", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 678, "id": "678", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 679, "id": "679", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 680, "id": "680", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 681, "id": "681", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 682, "id": "682", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 683, "id": "683", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 684, "id": "684", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 685, "id": "685", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 686, "id": "686", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 687, "id": "687", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 688, "id": "688", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 689, "id": "689", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 690, "id": "690", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 691, "id": "691", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 692, "id": "692", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 693, "id": "693", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 694, "id": "694", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 695, "id": "695", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 696, "id": "696", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 697, "id": "697", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 698, "id": "698", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 699, "id": "699", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 700, "id": "700", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 701, "id": "701", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 702, "id": "702", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 703, "id": "703", "campaign-edit": "2", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 704, "id": "704", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 705, "id": "705", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 706, "id": "706", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 707, "id": "707", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 708, "id": "708", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 709, "id": "709", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 710, "id": "710", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 711, "id": "711", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 712, "id": "712", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 713, "id": "713", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 714, "id": "714", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 715, "id": "715", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 716, "id": "716", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 717, "id": "717", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 718, "id": "718", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 719, "id": "719", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 720, "id": "720", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 721, "id": "721", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 722, "id": "722", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 723, "id": "723", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 724, "id": "724", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 725, "id": "725", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 726, "id": "726", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 727, "id": "727", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 728, "id": "728", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 729, "id": "729", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 730, "id": "730", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 731, "id": "731", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 732, "id": "732", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 733, "id": "733", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 734, "id": "734", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 735, "id": "735", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 736, "id": "736", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 737, "id": "737", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 738, "id": "738", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 739, "id": "739", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 740, "id": "740", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 741, "id": "741", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 742, "id": "742", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 743, "id": "743", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 744, "id": "744", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 745, "id": "745", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 746, "id": "746", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 747, "id": "747", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 748, "id": "748", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 749, "id": "749", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 750, "id": "750", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 751, "id": "751", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 752, "id": "752", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 753, "id": "753", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 754, "id": "754", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 755, "id": "755", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 756, "id": "756", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 757, "id": "757", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 758, "id": "758", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 759, "id": "759", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 760, "id": "760", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 761, "id": "761", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 762, "id": "762", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 763, "id": "763", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 764, "id": "764", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 765, "id": "765", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 766, "id": "766", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 767, "id": "767", "campaign-edit": "2", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 768, "id": "768", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 769, "id": "769", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 770, "id": "770", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 771, "id": "771", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 772, "id": "772", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 773, "id": "773", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 774, "id": "774", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 775, "id": "775", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 776, "id": "776", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 777, "id": "777", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 778, "id": "778", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 779, "id": "779", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 780, "id": "780", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 781, "id": "781", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 782, "id": "782", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 783, "id": "783", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 784, "id": "784", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 785, "id": "785", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 786, "id": "786", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 787, "id": "787", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 788, "id": "788", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 789, "id": "789", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 790, "id": "790", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 791, "id": "791", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 792, "id": "792", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 793, "id": "793", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 794, "id": "794", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 795, "id": "795", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 796, "id": "796", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 797, "id": "797", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 798, "id": "798", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 799, "id": "799", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 800, "id": "800", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 801, "id": "801", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 802, "id": "802", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 803, "id": "803", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 804, "id": "804", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 805, "id": "805", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 806, "id": "806", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 807, "id": "807", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 808, "id": "808", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 809, "id": "809", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 810, "id": "810", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 811, "id": "811", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 812, "id": "812", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 813, "id": "813", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 814, "id": "814", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 815, "id": "815", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 816, "id": "816", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 817, "id": "817", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 818, "id": "818", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 819, "id": "819", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 820, "id": "820", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 821, "id": "821", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 822, "id": "822", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 823, "id": "823", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 824, "id": "824", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 825, "id": "825", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 826, "id": "826", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 827, "id": "827", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 828, "id": "828", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 829, "id": "829", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 830, "id": "830", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 831, "id": "831", "campaign-edit": "3", "campaign-name": "0", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 832, "id": "832", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 833, "id": "833", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 834, "id": "834", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 835, "id": "835", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 836, "id": "836", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 837, "id": "837", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 838, "id": "838", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 839, "id": "839", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 840, "id": "840", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 841, "id": "841", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 842, "id": "842", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 843, "id": "843", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 844, "id": "844", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 845, "id": "845", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 846, "id": "846", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 847, "id": "847", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 848, "id": "848", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 849, "id": "849", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 850, "id": "850", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 851, "id": "851", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 852, "id": "852", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 853, "id": "853", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 854, "id": "854", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 855, "id": "855", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 856, "id": "856", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 857, "id": "857", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 858, "id": "858", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 859, "id": "859", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 860, "id": "860", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 861, "id": "861", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 862, "id": "862", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 863, "id": "863", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 864, "id": "864", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 865, "id": "865", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 866, "id": "866", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 867, "id": "867", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 868, "id": "868", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 869, "id": "869", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 870, "id": "870", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 871, "id": "871", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 872, "id": "872", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 873, "id": "873", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 874, "id": "874", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 875, "id": "875", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 876, "id": "876", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 877, "id": "877", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 878, "id": "878", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 879, "id": "879", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 880, "id": "880", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 881, "id": "881", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 882, "id": "882", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 883, "id": "883", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 884, "id": "884", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 885, "id": "885", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 886, "id": "886", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 887, "id": "887", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 888, "id": "888", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 889, "id": "889", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 890, "id": "890", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 891, "id": "891", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 892, "id": "892", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 893, "id": "893", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 894, "id": "894", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 895, "id": "895", "campaign-edit": "3", "campaign-name": "1", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 896, "id": "896", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 897, "id": "897", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 898, "id": "898", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 899, "id": "899", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 900, "id": "900", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 901, "id": "901", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 902, "id": "902", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 903, "id": "903", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 904, "id": "904", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 905, "id": "905", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 906, "id": "906", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 907, "id": "907", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 908, "id": "908", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 909, "id": "909", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 910, "id": "910", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 911, "id": "911", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 912, "id": "912", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 913, "id": "913", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 914, "id": "914", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 915, "id": "915", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 916, "id": "916", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 917, "id": "917", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 918, "id": "918", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 919, "id": "919", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 920, "id": "920", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 921, "id": "921", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 922, "id": "922", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 923, "id": "923", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 924, "id": "924", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 925, "id": "925", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 926, "id": "926", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 927, "id": "927", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 928, "id": "928", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 929, "id": "929", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 930, "id": "930", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 931, "id": "931", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 932, "id": "932", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 933, "id": "933", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 934, "id": "934", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 935, "id": "935", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 936, "id": "936", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 937, "id": "937", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 938, "id": "938", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 939, "id": "939", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 940, "id": "940", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 941, "id": "941", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 942, "id": "942", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 943, "id": "943", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 944, "id": "944", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 945, "id": "945", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 946, "id": "946", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 947, "id": "947", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 948, "id": "948", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 949, "id": "949", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 950, "id": "950", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 951, "id": "951", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 952, "id": "952", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 953, "id": "953", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 954, "id": "954", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 955, "id": "955", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 956, "id": "956", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 957, "id": "957", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 958, "id": "958", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 959, "id": "959", "campaign-edit": "3", "campaign-name": "2", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 960, "id": "960", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 961, "id": "961", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 962, "id": "962", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 963, "id": "963", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 964, "id": "964", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 965, "id": "965", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 966, "id": "966", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 967, "id": "967", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 968, "id": "968", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 969, "id": "969", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 970, "id": "970", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 971, "id": "971", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 972, "id": "972", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 973, "id": "973", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 974, "id": "974", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 975, "id": "975", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "0", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 976, "id": "976", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 977, "id": "977", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 978, "id": "978", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 979, "id": "979", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 980, "id": "980", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 981, "id": "981", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 982, "id": "982", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 983, "id": "983", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 984, "id": "984", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 985, "id": "985", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 986, "id": "986", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 987, "id": "987", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 988, "id": "988", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 989, "id": "989", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 990, "id": "990", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 991, "id": "991", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "1", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 992, "id": "992", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 993, "id": "993", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 994, "id": "994", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 995, "id": "995", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 996, "id": "996", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 997, "id": "997", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 998, "id": "998", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 999, "id": "999", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 1000, "id": "1000", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 1001, "id": "1001", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 1002, "id": "1002", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 1003, "id": "1003", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 1004, "id": "1004", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 1005, "id": "1005", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 1006, "id": "1006", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 1007, "id": "1007", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "2", "campaign-show": "3", "campaign-state": "3"}
    ,{ "_id": 1008, "id": "1008", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "0"}
    ,{ "_id": 1009, "id": "1009", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "1"}
    ,{ "_id": 1010, "id": "1010", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "2"}
    ,{ "_id": 1011, "id": "1011", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "0", "campaign-state": "3"}
    ,{ "_id": 1012, "id": "1012", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "0"}
    ,{ "_id": 1013, "id": "1013", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "1"}
    ,{ "_id": 1014, "id": "1014", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "2"}
    ,{ "_id": 1015, "id": "1015", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "1", "campaign-state": "3"}
    ,{ "_id": 1016, "id": "1016", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "0"}
    ,{ "_id": 1017, "id": "1017", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "1"}
    ,{ "_id": 1018, "id": "1018", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "2"}
    ,{ "_id": 1019, "id": "1019", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "2", "campaign-state": "3"}
    ,{ "_id": 1020, "id": "1020", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "0"}
    ,{ "_id": 1021, "id": "1021", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "1"}
    ,{ "_id": 1022, "id": "1022", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "2"}
    ,{ "_id": 1023, "id": "1023", "campaign-edit": "3", "campaign-name": "3", "campaign-next_action": "3", "campaign-show": "3", "campaign-state": "3"}
]

},{}],107:[function(require,module,exports){
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
    this.db.insert(require('./default'));
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

},{"./default":106}],108:[function(require,module,exports){
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

},{"./campaign":107,"./tasks":110,"./workers":112}],109:[function(require,module,exports){
module.exports=[
    { "_id": 0, "id": "0", "accepted": "0", "annotated": "0", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 1, "id": "1", "accepted": "0", "annotated": "0", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 2, "id": "2", "accepted": "0", "annotated": "0", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 3, "id": "3", "accepted": "0", "annotated": "0", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 4, "id": "4", "accepted": "0", "annotated": "0", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 5, "id": "5", "accepted": "0", "annotated": "0", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 6, "id": "6", "accepted": "0", "annotated": "0", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 7, "id": "7", "accepted": "0", "annotated": "0", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 8, "id": "8", "accepted": "0", "annotated": "0", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 9, "id": "9", "accepted": "0", "annotated": "0", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 10, "id": "10", "accepted": "0", "annotated": "0", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 11, "id": "11", "accepted": "0", "annotated": "0", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 12, "id": "12", "accepted": "0", "annotated": "0", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 13, "id": "13", "accepted": "0", "annotated": "0", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 14, "id": "14", "accepted": "0", "annotated": "0", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 15, "id": "15", "accepted": "0", "annotated": "0", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 16, "id": "16", "accepted": "0", "annotated": "0", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 17, "id": "17", "accepted": "0", "annotated": "0", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 18, "id": "18", "accepted": "0", "annotated": "0", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 19, "id": "19", "accepted": "0", "annotated": "0", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 20, "id": "20", "accepted": "0", "annotated": "0", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 21, "id": "21", "accepted": "0", "annotated": "0", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 22, "id": "22", "accepted": "0", "annotated": "0", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 23, "id": "23", "accepted": "0", "annotated": "0", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 24, "id": "24", "accepted": "0", "annotated": "0", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 25, "id": "25", "accepted": "0", "annotated": "0", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 26, "id": "26", "accepted": "0", "annotated": "0", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 27, "id": "27", "accepted": "0", "annotated": "0", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 28, "id": "28", "accepted": "0", "annotated": "0", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 29, "id": "29", "accepted": "0", "annotated": "0", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 30, "id": "30", "accepted": "0", "annotated": "0", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 31, "id": "31", "accepted": "0", "annotated": "0", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 32, "id": "32", "accepted": "0", "annotated": "0", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 33, "id": "33", "accepted": "0", "annotated": "0", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 34, "id": "34", "accepted": "0", "annotated": "0", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 35, "id": "35", "accepted": "0", "annotated": "0", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 36, "id": "36", "accepted": "0", "annotated": "0", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 37, "id": "37", "accepted": "0", "annotated": "0", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 38, "id": "38", "accepted": "0", "annotated": "0", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 39, "id": "39", "accepted": "0", "annotated": "0", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 40, "id": "40", "accepted": "0", "annotated": "0", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 41, "id": "41", "accepted": "0", "annotated": "0", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 42, "id": "42", "accepted": "0", "annotated": "0", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 43, "id": "43", "accepted": "0", "annotated": "0", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 44, "id": "44", "accepted": "0", "annotated": "0", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 45, "id": "45", "accepted": "0", "annotated": "0", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 46, "id": "46", "accepted": "0", "annotated": "0", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 47, "id": "47", "accepted": "0", "annotated": "0", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 48, "id": "48", "accepted": "0", "annotated": "0", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 49, "id": "49", "accepted": "0", "annotated": "0", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 50, "id": "50", "accepted": "0", "annotated": "0", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 51, "id": "51", "accepted": "0", "annotated": "0", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 52, "id": "52", "accepted": "0", "annotated": "0", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 53, "id": "53", "accepted": "0", "annotated": "0", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 54, "id": "54", "accepted": "0", "annotated": "0", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 55, "id": "55", "accepted": "0", "annotated": "0", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 56, "id": "56", "accepted": "0", "annotated": "0", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 57, "id": "57", "accepted": "0", "annotated": "0", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 58, "id": "58", "accepted": "0", "annotated": "0", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 59, "id": "59", "accepted": "0", "annotated": "0", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 60, "id": "60", "accepted": "0", "annotated": "0", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 61, "id": "61", "accepted": "0", "annotated": "0", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 62, "id": "62", "accepted": "0", "annotated": "0", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 63, "id": "63", "accepted": "0", "annotated": "0", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 64, "id": "64", "accepted": "0", "annotated": "1", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 65, "id": "65", "accepted": "0", "annotated": "1", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 66, "id": "66", "accepted": "0", "annotated": "1", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 67, "id": "67", "accepted": "0", "annotated": "1", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 68, "id": "68", "accepted": "0", "annotated": "1", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 69, "id": "69", "accepted": "0", "annotated": "1", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 70, "id": "70", "accepted": "0", "annotated": "1", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 71, "id": "71", "accepted": "0", "annotated": "1", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 72, "id": "72", "accepted": "0", "annotated": "1", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 73, "id": "73", "accepted": "0", "annotated": "1", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 74, "id": "74", "accepted": "0", "annotated": "1", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 75, "id": "75", "accepted": "0", "annotated": "1", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 76, "id": "76", "accepted": "0", "annotated": "1", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 77, "id": "77", "accepted": "0", "annotated": "1", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 78, "id": "78", "accepted": "0", "annotated": "1", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 79, "id": "79", "accepted": "0", "annotated": "1", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 80, "id": "80", "accepted": "0", "annotated": "1", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 81, "id": "81", "accepted": "0", "annotated": "1", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 82, "id": "82", "accepted": "0", "annotated": "1", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 83, "id": "83", "accepted": "0", "annotated": "1", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 84, "id": "84", "accepted": "0", "annotated": "1", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 85, "id": "85", "accepted": "0", "annotated": "1", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 86, "id": "86", "accepted": "0", "annotated": "1", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 87, "id": "87", "accepted": "0", "annotated": "1", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 88, "id": "88", "accepted": "0", "annotated": "1", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 89, "id": "89", "accepted": "0", "annotated": "1", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 90, "id": "90", "accepted": "0", "annotated": "1", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 91, "id": "91", "accepted": "0", "annotated": "1", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 92, "id": "92", "accepted": "0", "annotated": "1", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 93, "id": "93", "accepted": "0", "annotated": "1", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 94, "id": "94", "accepted": "0", "annotated": "1", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 95, "id": "95", "accepted": "0", "annotated": "1", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 96, "id": "96", "accepted": "0", "annotated": "1", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 97, "id": "97", "accepted": "0", "annotated": "1", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 98, "id": "98", "accepted": "0", "annotated": "1", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 99, "id": "99", "accepted": "0", "annotated": "1", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 100, "id": "100", "accepted": "0", "annotated": "1", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 101, "id": "101", "accepted": "0", "annotated": "1", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 102, "id": "102", "accepted": "0", "annotated": "1", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 103, "id": "103", "accepted": "0", "annotated": "1", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 104, "id": "104", "accepted": "0", "annotated": "1", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 105, "id": "105", "accepted": "0", "annotated": "1", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 106, "id": "106", "accepted": "0", "annotated": "1", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 107, "id": "107", "accepted": "0", "annotated": "1", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 108, "id": "108", "accepted": "0", "annotated": "1", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 109, "id": "109", "accepted": "0", "annotated": "1", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 110, "id": "110", "accepted": "0", "annotated": "1", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 111, "id": "111", "accepted": "0", "annotated": "1", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 112, "id": "112", "accepted": "0", "annotated": "1", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 113, "id": "113", "accepted": "0", "annotated": "1", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 114, "id": "114", "accepted": "0", "annotated": "1", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 115, "id": "115", "accepted": "0", "annotated": "1", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 116, "id": "116", "accepted": "0", "annotated": "1", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 117, "id": "117", "accepted": "0", "annotated": "1", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 118, "id": "118", "accepted": "0", "annotated": "1", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 119, "id": "119", "accepted": "0", "annotated": "1", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 120, "id": "120", "accepted": "0", "annotated": "1", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 121, "id": "121", "accepted": "0", "annotated": "1", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 122, "id": "122", "accepted": "0", "annotated": "1", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 123, "id": "123", "accepted": "0", "annotated": "1", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 124, "id": "124", "accepted": "0", "annotated": "1", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 125, "id": "125", "accepted": "0", "annotated": "1", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 126, "id": "126", "accepted": "0", "annotated": "1", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 127, "id": "127", "accepted": "0", "annotated": "1", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 128, "id": "128", "accepted": "0", "annotated": "2", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 129, "id": "129", "accepted": "0", "annotated": "2", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 130, "id": "130", "accepted": "0", "annotated": "2", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 131, "id": "131", "accepted": "0", "annotated": "2", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 132, "id": "132", "accepted": "0", "annotated": "2", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 133, "id": "133", "accepted": "0", "annotated": "2", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 134, "id": "134", "accepted": "0", "annotated": "2", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 135, "id": "135", "accepted": "0", "annotated": "2", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 136, "id": "136", "accepted": "0", "annotated": "2", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 137, "id": "137", "accepted": "0", "annotated": "2", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 138, "id": "138", "accepted": "0", "annotated": "2", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 139, "id": "139", "accepted": "0", "annotated": "2", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 140, "id": "140", "accepted": "0", "annotated": "2", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 141, "id": "141", "accepted": "0", "annotated": "2", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 142, "id": "142", "accepted": "0", "annotated": "2", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 143, "id": "143", "accepted": "0", "annotated": "2", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 144, "id": "144", "accepted": "0", "annotated": "2", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 145, "id": "145", "accepted": "0", "annotated": "2", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 146, "id": "146", "accepted": "0", "annotated": "2", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 147, "id": "147", "accepted": "0", "annotated": "2", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 148, "id": "148", "accepted": "0", "annotated": "2", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 149, "id": "149", "accepted": "0", "annotated": "2", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 150, "id": "150", "accepted": "0", "annotated": "2", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 151, "id": "151", "accepted": "0", "annotated": "2", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 152, "id": "152", "accepted": "0", "annotated": "2", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 153, "id": "153", "accepted": "0", "annotated": "2", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 154, "id": "154", "accepted": "0", "annotated": "2", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 155, "id": "155", "accepted": "0", "annotated": "2", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 156, "id": "156", "accepted": "0", "annotated": "2", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 157, "id": "157", "accepted": "0", "annotated": "2", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 158, "id": "158", "accepted": "0", "annotated": "2", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 159, "id": "159", "accepted": "0", "annotated": "2", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 160, "id": "160", "accepted": "0", "annotated": "2", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 161, "id": "161", "accepted": "0", "annotated": "2", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 162, "id": "162", "accepted": "0", "annotated": "2", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 163, "id": "163", "accepted": "0", "annotated": "2", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 164, "id": "164", "accepted": "0", "annotated": "2", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 165, "id": "165", "accepted": "0", "annotated": "2", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 166, "id": "166", "accepted": "0", "annotated": "2", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 167, "id": "167", "accepted": "0", "annotated": "2", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 168, "id": "168", "accepted": "0", "annotated": "2", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 169, "id": "169", "accepted": "0", "annotated": "2", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 170, "id": "170", "accepted": "0", "annotated": "2", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 171, "id": "171", "accepted": "0", "annotated": "2", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 172, "id": "172", "accepted": "0", "annotated": "2", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 173, "id": "173", "accepted": "0", "annotated": "2", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 174, "id": "174", "accepted": "0", "annotated": "2", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 175, "id": "175", "accepted": "0", "annotated": "2", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 176, "id": "176", "accepted": "0", "annotated": "2", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 177, "id": "177", "accepted": "0", "annotated": "2", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 178, "id": "178", "accepted": "0", "annotated": "2", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 179, "id": "179", "accepted": "0", "annotated": "2", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 180, "id": "180", "accepted": "0", "annotated": "2", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 181, "id": "181", "accepted": "0", "annotated": "2", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 182, "id": "182", "accepted": "0", "annotated": "2", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 183, "id": "183", "accepted": "0", "annotated": "2", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 184, "id": "184", "accepted": "0", "annotated": "2", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 185, "id": "185", "accepted": "0", "annotated": "2", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 186, "id": "186", "accepted": "0", "annotated": "2", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 187, "id": "187", "accepted": "0", "annotated": "2", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 188, "id": "188", "accepted": "0", "annotated": "2", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 189, "id": "189", "accepted": "0", "annotated": "2", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 190, "id": "190", "accepted": "0", "annotated": "2", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 191, "id": "191", "accepted": "0", "annotated": "2", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 192, "id": "192", "accepted": "0", "annotated": "3", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 193, "id": "193", "accepted": "0", "annotated": "3", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 194, "id": "194", "accepted": "0", "annotated": "3", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 195, "id": "195", "accepted": "0", "annotated": "3", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 196, "id": "196", "accepted": "0", "annotated": "3", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 197, "id": "197", "accepted": "0", "annotated": "3", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 198, "id": "198", "accepted": "0", "annotated": "3", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 199, "id": "199", "accepted": "0", "annotated": "3", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 200, "id": "200", "accepted": "0", "annotated": "3", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 201, "id": "201", "accepted": "0", "annotated": "3", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 202, "id": "202", "accepted": "0", "annotated": "3", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 203, "id": "203", "accepted": "0", "annotated": "3", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 204, "id": "204", "accepted": "0", "annotated": "3", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 205, "id": "205", "accepted": "0", "annotated": "3", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 206, "id": "206", "accepted": "0", "annotated": "3", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 207, "id": "207", "accepted": "0", "annotated": "3", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 208, "id": "208", "accepted": "0", "annotated": "3", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 209, "id": "209", "accepted": "0", "annotated": "3", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 210, "id": "210", "accepted": "0", "annotated": "3", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 211, "id": "211", "accepted": "0", "annotated": "3", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 212, "id": "212", "accepted": "0", "annotated": "3", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 213, "id": "213", "accepted": "0", "annotated": "3", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 214, "id": "214", "accepted": "0", "annotated": "3", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 215, "id": "215", "accepted": "0", "annotated": "3", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 216, "id": "216", "accepted": "0", "annotated": "3", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 217, "id": "217", "accepted": "0", "annotated": "3", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 218, "id": "218", "accepted": "0", "annotated": "3", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 219, "id": "219", "accepted": "0", "annotated": "3", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 220, "id": "220", "accepted": "0", "annotated": "3", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 221, "id": "221", "accepted": "0", "annotated": "3", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 222, "id": "222", "accepted": "0", "annotated": "3", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 223, "id": "223", "accepted": "0", "annotated": "3", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 224, "id": "224", "accepted": "0", "annotated": "3", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 225, "id": "225", "accepted": "0", "annotated": "3", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 226, "id": "226", "accepted": "0", "annotated": "3", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 227, "id": "227", "accepted": "0", "annotated": "3", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 228, "id": "228", "accepted": "0", "annotated": "3", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 229, "id": "229", "accepted": "0", "annotated": "3", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 230, "id": "230", "accepted": "0", "annotated": "3", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 231, "id": "231", "accepted": "0", "annotated": "3", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 232, "id": "232", "accepted": "0", "annotated": "3", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 233, "id": "233", "accepted": "0", "annotated": "3", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 234, "id": "234", "accepted": "0", "annotated": "3", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 235, "id": "235", "accepted": "0", "annotated": "3", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 236, "id": "236", "accepted": "0", "annotated": "3", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 237, "id": "237", "accepted": "0", "annotated": "3", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 238, "id": "238", "accepted": "0", "annotated": "3", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 239, "id": "239", "accepted": "0", "annotated": "3", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 240, "id": "240", "accepted": "0", "annotated": "3", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 241, "id": "241", "accepted": "0", "annotated": "3", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 242, "id": "242", "accepted": "0", "annotated": "3", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 243, "id": "243", "accepted": "0", "annotated": "3", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 244, "id": "244", "accepted": "0", "annotated": "3", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 245, "id": "245", "accepted": "0", "annotated": "3", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 246, "id": "246", "accepted": "0", "annotated": "3", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 247, "id": "247", "accepted": "0", "annotated": "3", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 248, "id": "248", "accepted": "0", "annotated": "3", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 249, "id": "249", "accepted": "0", "annotated": "3", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 250, "id": "250", "accepted": "0", "annotated": "3", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 251, "id": "251", "accepted": "0", "annotated": "3", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 252, "id": "252", "accepted": "0", "annotated": "3", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 253, "id": "253", "accepted": "0", "annotated": "3", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 254, "id": "254", "accepted": "0", "annotated": "3", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 255, "id": "255", "accepted": "0", "annotated": "3", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 256, "id": "256", "accepted": "1", "annotated": "0", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 257, "id": "257", "accepted": "1", "annotated": "0", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 258, "id": "258", "accepted": "1", "annotated": "0", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 259, "id": "259", "accepted": "1", "annotated": "0", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 260, "id": "260", "accepted": "1", "annotated": "0", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 261, "id": "261", "accepted": "1", "annotated": "0", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 262, "id": "262", "accepted": "1", "annotated": "0", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 263, "id": "263", "accepted": "1", "annotated": "0", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 264, "id": "264", "accepted": "1", "annotated": "0", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 265, "id": "265", "accepted": "1", "annotated": "0", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 266, "id": "266", "accepted": "1", "annotated": "0", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 267, "id": "267", "accepted": "1", "annotated": "0", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 268, "id": "268", "accepted": "1", "annotated": "0", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 269, "id": "269", "accepted": "1", "annotated": "0", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 270, "id": "270", "accepted": "1", "annotated": "0", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 271, "id": "271", "accepted": "1", "annotated": "0", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 272, "id": "272", "accepted": "1", "annotated": "0", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 273, "id": "273", "accepted": "1", "annotated": "0", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 274, "id": "274", "accepted": "1", "annotated": "0", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 275, "id": "275", "accepted": "1", "annotated": "0", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 276, "id": "276", "accepted": "1", "annotated": "0", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 277, "id": "277", "accepted": "1", "annotated": "0", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 278, "id": "278", "accepted": "1", "annotated": "0", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 279, "id": "279", "accepted": "1", "annotated": "0", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 280, "id": "280", "accepted": "1", "annotated": "0", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 281, "id": "281", "accepted": "1", "annotated": "0", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 282, "id": "282", "accepted": "1", "annotated": "0", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 283, "id": "283", "accepted": "1", "annotated": "0", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 284, "id": "284", "accepted": "1", "annotated": "0", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 285, "id": "285", "accepted": "1", "annotated": "0", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 286, "id": "286", "accepted": "1", "annotated": "0", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 287, "id": "287", "accepted": "1", "annotated": "0", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 288, "id": "288", "accepted": "1", "annotated": "0", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 289, "id": "289", "accepted": "1", "annotated": "0", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 290, "id": "290", "accepted": "1", "annotated": "0", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 291, "id": "291", "accepted": "1", "annotated": "0", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 292, "id": "292", "accepted": "1", "annotated": "0", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 293, "id": "293", "accepted": "1", "annotated": "0", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 294, "id": "294", "accepted": "1", "annotated": "0", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 295, "id": "295", "accepted": "1", "annotated": "0", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 296, "id": "296", "accepted": "1", "annotated": "0", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 297, "id": "297", "accepted": "1", "annotated": "0", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 298, "id": "298", "accepted": "1", "annotated": "0", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 299, "id": "299", "accepted": "1", "annotated": "0", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 300, "id": "300", "accepted": "1", "annotated": "0", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 301, "id": "301", "accepted": "1", "annotated": "0", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 302, "id": "302", "accepted": "1", "annotated": "0", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 303, "id": "303", "accepted": "1", "annotated": "0", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 304, "id": "304", "accepted": "1", "annotated": "0", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 305, "id": "305", "accepted": "1", "annotated": "0", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 306, "id": "306", "accepted": "1", "annotated": "0", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 307, "id": "307", "accepted": "1", "annotated": "0", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 308, "id": "308", "accepted": "1", "annotated": "0", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 309, "id": "309", "accepted": "1", "annotated": "0", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 310, "id": "310", "accepted": "1", "annotated": "0", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 311, "id": "311", "accepted": "1", "annotated": "0", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 312, "id": "312", "accepted": "1", "annotated": "0", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 313, "id": "313", "accepted": "1", "annotated": "0", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 314, "id": "314", "accepted": "1", "annotated": "0", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 315, "id": "315", "accepted": "1", "annotated": "0", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 316, "id": "316", "accepted": "1", "annotated": "0", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 317, "id": "317", "accepted": "1", "annotated": "0", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 318, "id": "318", "accepted": "1", "annotated": "0", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 319, "id": "319", "accepted": "1", "annotated": "0", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 320, "id": "320", "accepted": "1", "annotated": "1", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 321, "id": "321", "accepted": "1", "annotated": "1", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 322, "id": "322", "accepted": "1", "annotated": "1", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 323, "id": "323", "accepted": "1", "annotated": "1", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 324, "id": "324", "accepted": "1", "annotated": "1", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 325, "id": "325", "accepted": "1", "annotated": "1", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 326, "id": "326", "accepted": "1", "annotated": "1", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 327, "id": "327", "accepted": "1", "annotated": "1", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 328, "id": "328", "accepted": "1", "annotated": "1", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 329, "id": "329", "accepted": "1", "annotated": "1", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 330, "id": "330", "accepted": "1", "annotated": "1", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 331, "id": "331", "accepted": "1", "annotated": "1", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 332, "id": "332", "accepted": "1", "annotated": "1", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 333, "id": "333", "accepted": "1", "annotated": "1", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 334, "id": "334", "accepted": "1", "annotated": "1", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 335, "id": "335", "accepted": "1", "annotated": "1", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 336, "id": "336", "accepted": "1", "annotated": "1", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 337, "id": "337", "accepted": "1", "annotated": "1", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 338, "id": "338", "accepted": "1", "annotated": "1", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 339, "id": "339", "accepted": "1", "annotated": "1", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 340, "id": "340", "accepted": "1", "annotated": "1", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 341, "id": "341", "accepted": "1", "annotated": "1", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 342, "id": "342", "accepted": "1", "annotated": "1", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 343, "id": "343", "accepted": "1", "annotated": "1", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 344, "id": "344", "accepted": "1", "annotated": "1", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 345, "id": "345", "accepted": "1", "annotated": "1", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 346, "id": "346", "accepted": "1", "annotated": "1", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 347, "id": "347", "accepted": "1", "annotated": "1", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 348, "id": "348", "accepted": "1", "annotated": "1", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 349, "id": "349", "accepted": "1", "annotated": "1", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 350, "id": "350", "accepted": "1", "annotated": "1", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 351, "id": "351", "accepted": "1", "annotated": "1", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 352, "id": "352", "accepted": "1", "annotated": "1", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 353, "id": "353", "accepted": "1", "annotated": "1", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 354, "id": "354", "accepted": "1", "annotated": "1", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 355, "id": "355", "accepted": "1", "annotated": "1", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 356, "id": "356", "accepted": "1", "annotated": "1", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 357, "id": "357", "accepted": "1", "annotated": "1", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 358, "id": "358", "accepted": "1", "annotated": "1", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 359, "id": "359", "accepted": "1", "annotated": "1", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 360, "id": "360", "accepted": "1", "annotated": "1", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 361, "id": "361", "accepted": "1", "annotated": "1", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 362, "id": "362", "accepted": "1", "annotated": "1", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 363, "id": "363", "accepted": "1", "annotated": "1", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 364, "id": "364", "accepted": "1", "annotated": "1", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 365, "id": "365", "accepted": "1", "annotated": "1", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 366, "id": "366", "accepted": "1", "annotated": "1", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 367, "id": "367", "accepted": "1", "annotated": "1", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 368, "id": "368", "accepted": "1", "annotated": "1", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 369, "id": "369", "accepted": "1", "annotated": "1", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 370, "id": "370", "accepted": "1", "annotated": "1", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 371, "id": "371", "accepted": "1", "annotated": "1", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 372, "id": "372", "accepted": "1", "annotated": "1", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 373, "id": "373", "accepted": "1", "annotated": "1", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 374, "id": "374", "accepted": "1", "annotated": "1", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 375, "id": "375", "accepted": "1", "annotated": "1", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 376, "id": "376", "accepted": "1", "annotated": "1", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 377, "id": "377", "accepted": "1", "annotated": "1", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 378, "id": "378", "accepted": "1", "annotated": "1", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 379, "id": "379", "accepted": "1", "annotated": "1", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 380, "id": "380", "accepted": "1", "annotated": "1", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 381, "id": "381", "accepted": "1", "annotated": "1", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 382, "id": "382", "accepted": "1", "annotated": "1", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 383, "id": "383", "accepted": "1", "annotated": "1", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 384, "id": "384", "accepted": "1", "annotated": "2", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 385, "id": "385", "accepted": "1", "annotated": "2", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 386, "id": "386", "accepted": "1", "annotated": "2", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 387, "id": "387", "accepted": "1", "annotated": "2", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 388, "id": "388", "accepted": "1", "annotated": "2", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 389, "id": "389", "accepted": "1", "annotated": "2", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 390, "id": "390", "accepted": "1", "annotated": "2", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 391, "id": "391", "accepted": "1", "annotated": "2", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 392, "id": "392", "accepted": "1", "annotated": "2", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 393, "id": "393", "accepted": "1", "annotated": "2", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 394, "id": "394", "accepted": "1", "annotated": "2", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 395, "id": "395", "accepted": "1", "annotated": "2", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 396, "id": "396", "accepted": "1", "annotated": "2", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 397, "id": "397", "accepted": "1", "annotated": "2", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 398, "id": "398", "accepted": "1", "annotated": "2", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 399, "id": "399", "accepted": "1", "annotated": "2", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 400, "id": "400", "accepted": "1", "annotated": "2", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 401, "id": "401", "accepted": "1", "annotated": "2", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 402, "id": "402", "accepted": "1", "annotated": "2", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 403, "id": "403", "accepted": "1", "annotated": "2", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 404, "id": "404", "accepted": "1", "annotated": "2", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 405, "id": "405", "accepted": "1", "annotated": "2", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 406, "id": "406", "accepted": "1", "annotated": "2", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 407, "id": "407", "accepted": "1", "annotated": "2", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 408, "id": "408", "accepted": "1", "annotated": "2", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 409, "id": "409", "accepted": "1", "annotated": "2", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 410, "id": "410", "accepted": "1", "annotated": "2", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 411, "id": "411", "accepted": "1", "annotated": "2", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 412, "id": "412", "accepted": "1", "annotated": "2", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 413, "id": "413", "accepted": "1", "annotated": "2", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 414, "id": "414", "accepted": "1", "annotated": "2", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 415, "id": "415", "accepted": "1", "annotated": "2", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 416, "id": "416", "accepted": "1", "annotated": "2", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 417, "id": "417", "accepted": "1", "annotated": "2", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 418, "id": "418", "accepted": "1", "annotated": "2", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 419, "id": "419", "accepted": "1", "annotated": "2", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 420, "id": "420", "accepted": "1", "annotated": "2", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 421, "id": "421", "accepted": "1", "annotated": "2", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 422, "id": "422", "accepted": "1", "annotated": "2", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 423, "id": "423", "accepted": "1", "annotated": "2", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 424, "id": "424", "accepted": "1", "annotated": "2", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 425, "id": "425", "accepted": "1", "annotated": "2", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 426, "id": "426", "accepted": "1", "annotated": "2", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 427, "id": "427", "accepted": "1", "annotated": "2", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 428, "id": "428", "accepted": "1", "annotated": "2", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 429, "id": "429", "accepted": "1", "annotated": "2", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 430, "id": "430", "accepted": "1", "annotated": "2", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 431, "id": "431", "accepted": "1", "annotated": "2", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 432, "id": "432", "accepted": "1", "annotated": "2", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 433, "id": "433", "accepted": "1", "annotated": "2", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 434, "id": "434", "accepted": "1", "annotated": "2", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 435, "id": "435", "accepted": "1", "annotated": "2", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 436, "id": "436", "accepted": "1", "annotated": "2", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 437, "id": "437", "accepted": "1", "annotated": "2", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 438, "id": "438", "accepted": "1", "annotated": "2", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 439, "id": "439", "accepted": "1", "annotated": "2", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 440, "id": "440", "accepted": "1", "annotated": "2", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 441, "id": "441", "accepted": "1", "annotated": "2", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 442, "id": "442", "accepted": "1", "annotated": "2", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 443, "id": "443", "accepted": "1", "annotated": "2", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 444, "id": "444", "accepted": "1", "annotated": "2", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 445, "id": "445", "accepted": "1", "annotated": "2", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 446, "id": "446", "accepted": "1", "annotated": "2", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 447, "id": "447", "accepted": "1", "annotated": "2", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 448, "id": "448", "accepted": "1", "annotated": "3", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 449, "id": "449", "accepted": "1", "annotated": "3", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 450, "id": "450", "accepted": "1", "annotated": "3", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 451, "id": "451", "accepted": "1", "annotated": "3", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 452, "id": "452", "accepted": "1", "annotated": "3", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 453, "id": "453", "accepted": "1", "annotated": "3", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 454, "id": "454", "accepted": "1", "annotated": "3", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 455, "id": "455", "accepted": "1", "annotated": "3", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 456, "id": "456", "accepted": "1", "annotated": "3", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 457, "id": "457", "accepted": "1", "annotated": "3", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 458, "id": "458", "accepted": "1", "annotated": "3", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 459, "id": "459", "accepted": "1", "annotated": "3", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 460, "id": "460", "accepted": "1", "annotated": "3", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 461, "id": "461", "accepted": "1", "annotated": "3", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 462, "id": "462", "accepted": "1", "annotated": "3", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 463, "id": "463", "accepted": "1", "annotated": "3", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 464, "id": "464", "accepted": "1", "annotated": "3", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 465, "id": "465", "accepted": "1", "annotated": "3", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 466, "id": "466", "accepted": "1", "annotated": "3", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 467, "id": "467", "accepted": "1", "annotated": "3", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 468, "id": "468", "accepted": "1", "annotated": "3", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 469, "id": "469", "accepted": "1", "annotated": "3", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 470, "id": "470", "accepted": "1", "annotated": "3", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 471, "id": "471", "accepted": "1", "annotated": "3", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 472, "id": "472", "accepted": "1", "annotated": "3", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 473, "id": "473", "accepted": "1", "annotated": "3", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 474, "id": "474", "accepted": "1", "annotated": "3", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 475, "id": "475", "accepted": "1", "annotated": "3", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 476, "id": "476", "accepted": "1", "annotated": "3", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 477, "id": "477", "accepted": "1", "annotated": "3", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 478, "id": "478", "accepted": "1", "annotated": "3", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 479, "id": "479", "accepted": "1", "annotated": "3", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 480, "id": "480", "accepted": "1", "annotated": "3", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 481, "id": "481", "accepted": "1", "annotated": "3", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 482, "id": "482", "accepted": "1", "annotated": "3", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 483, "id": "483", "accepted": "1", "annotated": "3", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 484, "id": "484", "accepted": "1", "annotated": "3", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 485, "id": "485", "accepted": "1", "annotated": "3", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 486, "id": "486", "accepted": "1", "annotated": "3", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 487, "id": "487", "accepted": "1", "annotated": "3", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 488, "id": "488", "accepted": "1", "annotated": "3", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 489, "id": "489", "accepted": "1", "annotated": "3", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 490, "id": "490", "accepted": "1", "annotated": "3", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 491, "id": "491", "accepted": "1", "annotated": "3", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 492, "id": "492", "accepted": "1", "annotated": "3", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 493, "id": "493", "accepted": "1", "annotated": "3", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 494, "id": "494", "accepted": "1", "annotated": "3", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 495, "id": "495", "accepted": "1", "annotated": "3", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 496, "id": "496", "accepted": "1", "annotated": "3", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 497, "id": "497", "accepted": "1", "annotated": "3", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 498, "id": "498", "accepted": "1", "annotated": "3", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 499, "id": "499", "accepted": "1", "annotated": "3", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 500, "id": "500", "accepted": "1", "annotated": "3", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 501, "id": "501", "accepted": "1", "annotated": "3", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 502, "id": "502", "accepted": "1", "annotated": "3", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 503, "id": "503", "accepted": "1", "annotated": "3", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 504, "id": "504", "accepted": "1", "annotated": "3", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 505, "id": "505", "accepted": "1", "annotated": "3", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 506, "id": "506", "accepted": "1", "annotated": "3", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 507, "id": "507", "accepted": "1", "annotated": "3", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 508, "id": "508", "accepted": "1", "annotated": "3", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 509, "id": "509", "accepted": "1", "annotated": "3", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 510, "id": "510", "accepted": "1", "annotated": "3", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 511, "id": "511", "accepted": "1", "annotated": "3", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 512, "id": "512", "accepted": "2", "annotated": "0", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 513, "id": "513", "accepted": "2", "annotated": "0", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 514, "id": "514", "accepted": "2", "annotated": "0", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 515, "id": "515", "accepted": "2", "annotated": "0", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 516, "id": "516", "accepted": "2", "annotated": "0", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 517, "id": "517", "accepted": "2", "annotated": "0", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 518, "id": "518", "accepted": "2", "annotated": "0", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 519, "id": "519", "accepted": "2", "annotated": "0", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 520, "id": "520", "accepted": "2", "annotated": "0", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 521, "id": "521", "accepted": "2", "annotated": "0", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 522, "id": "522", "accepted": "2", "annotated": "0", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 523, "id": "523", "accepted": "2", "annotated": "0", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 524, "id": "524", "accepted": "2", "annotated": "0", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 525, "id": "525", "accepted": "2", "annotated": "0", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 526, "id": "526", "accepted": "2", "annotated": "0", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 527, "id": "527", "accepted": "2", "annotated": "0", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 528, "id": "528", "accepted": "2", "annotated": "0", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 529, "id": "529", "accepted": "2", "annotated": "0", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 530, "id": "530", "accepted": "2", "annotated": "0", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 531, "id": "531", "accepted": "2", "annotated": "0", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 532, "id": "532", "accepted": "2", "annotated": "0", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 533, "id": "533", "accepted": "2", "annotated": "0", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 534, "id": "534", "accepted": "2", "annotated": "0", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 535, "id": "535", "accepted": "2", "annotated": "0", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 536, "id": "536", "accepted": "2", "annotated": "0", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 537, "id": "537", "accepted": "2", "annotated": "0", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 538, "id": "538", "accepted": "2", "annotated": "0", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 539, "id": "539", "accepted": "2", "annotated": "0", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 540, "id": "540", "accepted": "2", "annotated": "0", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 541, "id": "541", "accepted": "2", "annotated": "0", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 542, "id": "542", "accepted": "2", "annotated": "0", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 543, "id": "543", "accepted": "2", "annotated": "0", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 544, "id": "544", "accepted": "2", "annotated": "0", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 545, "id": "545", "accepted": "2", "annotated": "0", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 546, "id": "546", "accepted": "2", "annotated": "0", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 547, "id": "547", "accepted": "2", "annotated": "0", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 548, "id": "548", "accepted": "2", "annotated": "0", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 549, "id": "549", "accepted": "2", "annotated": "0", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 550, "id": "550", "accepted": "2", "annotated": "0", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 551, "id": "551", "accepted": "2", "annotated": "0", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 552, "id": "552", "accepted": "2", "annotated": "0", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 553, "id": "553", "accepted": "2", "annotated": "0", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 554, "id": "554", "accepted": "2", "annotated": "0", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 555, "id": "555", "accepted": "2", "annotated": "0", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 556, "id": "556", "accepted": "2", "annotated": "0", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 557, "id": "557", "accepted": "2", "annotated": "0", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 558, "id": "558", "accepted": "2", "annotated": "0", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 559, "id": "559", "accepted": "2", "annotated": "0", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 560, "id": "560", "accepted": "2", "annotated": "0", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 561, "id": "561", "accepted": "2", "annotated": "0", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 562, "id": "562", "accepted": "2", "annotated": "0", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 563, "id": "563", "accepted": "2", "annotated": "0", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 564, "id": "564", "accepted": "2", "annotated": "0", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 565, "id": "565", "accepted": "2", "annotated": "0", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 566, "id": "566", "accepted": "2", "annotated": "0", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 567, "id": "567", "accepted": "2", "annotated": "0", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 568, "id": "568", "accepted": "2", "annotated": "0", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 569, "id": "569", "accepted": "2", "annotated": "0", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 570, "id": "570", "accepted": "2", "annotated": "0", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 571, "id": "571", "accepted": "2", "annotated": "0", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 572, "id": "572", "accepted": "2", "annotated": "0", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 573, "id": "573", "accepted": "2", "annotated": "0", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 574, "id": "574", "accepted": "2", "annotated": "0", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 575, "id": "575", "accepted": "2", "annotated": "0", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 576, "id": "576", "accepted": "2", "annotated": "1", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 577, "id": "577", "accepted": "2", "annotated": "1", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 578, "id": "578", "accepted": "2", "annotated": "1", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 579, "id": "579", "accepted": "2", "annotated": "1", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 580, "id": "580", "accepted": "2", "annotated": "1", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 581, "id": "581", "accepted": "2", "annotated": "1", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 582, "id": "582", "accepted": "2", "annotated": "1", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 583, "id": "583", "accepted": "2", "annotated": "1", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 584, "id": "584", "accepted": "2", "annotated": "1", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 585, "id": "585", "accepted": "2", "annotated": "1", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 586, "id": "586", "accepted": "2", "annotated": "1", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 587, "id": "587", "accepted": "2", "annotated": "1", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 588, "id": "588", "accepted": "2", "annotated": "1", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 589, "id": "589", "accepted": "2", "annotated": "1", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 590, "id": "590", "accepted": "2", "annotated": "1", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 591, "id": "591", "accepted": "2", "annotated": "1", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 592, "id": "592", "accepted": "2", "annotated": "1", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 593, "id": "593", "accepted": "2", "annotated": "1", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 594, "id": "594", "accepted": "2", "annotated": "1", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 595, "id": "595", "accepted": "2", "annotated": "1", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 596, "id": "596", "accepted": "2", "annotated": "1", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 597, "id": "597", "accepted": "2", "annotated": "1", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 598, "id": "598", "accepted": "2", "annotated": "1", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 599, "id": "599", "accepted": "2", "annotated": "1", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 600, "id": "600", "accepted": "2", "annotated": "1", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 601, "id": "601", "accepted": "2", "annotated": "1", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 602, "id": "602", "accepted": "2", "annotated": "1", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 603, "id": "603", "accepted": "2", "annotated": "1", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 604, "id": "604", "accepted": "2", "annotated": "1", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 605, "id": "605", "accepted": "2", "annotated": "1", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 606, "id": "606", "accepted": "2", "annotated": "1", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 607, "id": "607", "accepted": "2", "annotated": "1", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 608, "id": "608", "accepted": "2", "annotated": "1", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 609, "id": "609", "accepted": "2", "annotated": "1", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 610, "id": "610", "accepted": "2", "annotated": "1", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 611, "id": "611", "accepted": "2", "annotated": "1", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 612, "id": "612", "accepted": "2", "annotated": "1", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 613, "id": "613", "accepted": "2", "annotated": "1", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 614, "id": "614", "accepted": "2", "annotated": "1", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 615, "id": "615", "accepted": "2", "annotated": "1", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 616, "id": "616", "accepted": "2", "annotated": "1", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 617, "id": "617", "accepted": "2", "annotated": "1", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 618, "id": "618", "accepted": "2", "annotated": "1", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 619, "id": "619", "accepted": "2", "annotated": "1", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 620, "id": "620", "accepted": "2", "annotated": "1", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 621, "id": "621", "accepted": "2", "annotated": "1", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 622, "id": "622", "accepted": "2", "annotated": "1", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 623, "id": "623", "accepted": "2", "annotated": "1", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 624, "id": "624", "accepted": "2", "annotated": "1", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 625, "id": "625", "accepted": "2", "annotated": "1", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 626, "id": "626", "accepted": "2", "annotated": "1", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 627, "id": "627", "accepted": "2", "annotated": "1", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 628, "id": "628", "accepted": "2", "annotated": "1", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 629, "id": "629", "accepted": "2", "annotated": "1", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 630, "id": "630", "accepted": "2", "annotated": "1", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 631, "id": "631", "accepted": "2", "annotated": "1", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 632, "id": "632", "accepted": "2", "annotated": "1", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 633, "id": "633", "accepted": "2", "annotated": "1", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 634, "id": "634", "accepted": "2", "annotated": "1", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 635, "id": "635", "accepted": "2", "annotated": "1", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 636, "id": "636", "accepted": "2", "annotated": "1", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 637, "id": "637", "accepted": "2", "annotated": "1", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 638, "id": "638", "accepted": "2", "annotated": "1", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 639, "id": "639", "accepted": "2", "annotated": "1", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 640, "id": "640", "accepted": "2", "annotated": "2", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 641, "id": "641", "accepted": "2", "annotated": "2", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 642, "id": "642", "accepted": "2", "annotated": "2", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 643, "id": "643", "accepted": "2", "annotated": "2", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 644, "id": "644", "accepted": "2", "annotated": "2", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 645, "id": "645", "accepted": "2", "annotated": "2", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 646, "id": "646", "accepted": "2", "annotated": "2", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 647, "id": "647", "accepted": "2", "annotated": "2", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 648, "id": "648", "accepted": "2", "annotated": "2", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 649, "id": "649", "accepted": "2", "annotated": "2", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 650, "id": "650", "accepted": "2", "annotated": "2", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 651, "id": "651", "accepted": "2", "annotated": "2", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 652, "id": "652", "accepted": "2", "annotated": "2", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 653, "id": "653", "accepted": "2", "annotated": "2", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 654, "id": "654", "accepted": "2", "annotated": "2", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 655, "id": "655", "accepted": "2", "annotated": "2", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 656, "id": "656", "accepted": "2", "annotated": "2", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 657, "id": "657", "accepted": "2", "annotated": "2", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 658, "id": "658", "accepted": "2", "annotated": "2", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 659, "id": "659", "accepted": "2", "annotated": "2", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 660, "id": "660", "accepted": "2", "annotated": "2", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 661, "id": "661", "accepted": "2", "annotated": "2", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 662, "id": "662", "accepted": "2", "annotated": "2", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 663, "id": "663", "accepted": "2", "annotated": "2", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 664, "id": "664", "accepted": "2", "annotated": "2", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 665, "id": "665", "accepted": "2", "annotated": "2", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 666, "id": "666", "accepted": "2", "annotated": "2", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 667, "id": "667", "accepted": "2", "annotated": "2", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 668, "id": "668", "accepted": "2", "annotated": "2", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 669, "id": "669", "accepted": "2", "annotated": "2", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 670, "id": "670", "accepted": "2", "annotated": "2", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 671, "id": "671", "accepted": "2", "annotated": "2", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 672, "id": "672", "accepted": "2", "annotated": "2", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 673, "id": "673", "accepted": "2", "annotated": "2", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 674, "id": "674", "accepted": "2", "annotated": "2", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 675, "id": "675", "accepted": "2", "annotated": "2", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 676, "id": "676", "accepted": "2", "annotated": "2", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 677, "id": "677", "accepted": "2", "annotated": "2", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 678, "id": "678", "accepted": "2", "annotated": "2", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 679, "id": "679", "accepted": "2", "annotated": "2", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 680, "id": "680", "accepted": "2", "annotated": "2", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 681, "id": "681", "accepted": "2", "annotated": "2", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 682, "id": "682", "accepted": "2", "annotated": "2", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 683, "id": "683", "accepted": "2", "annotated": "2", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 684, "id": "684", "accepted": "2", "annotated": "2", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 685, "id": "685", "accepted": "2", "annotated": "2", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 686, "id": "686", "accepted": "2", "annotated": "2", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 687, "id": "687", "accepted": "2", "annotated": "2", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 688, "id": "688", "accepted": "2", "annotated": "2", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 689, "id": "689", "accepted": "2", "annotated": "2", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 690, "id": "690", "accepted": "2", "annotated": "2", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 691, "id": "691", "accepted": "2", "annotated": "2", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 692, "id": "692", "accepted": "2", "annotated": "2", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 693, "id": "693", "accepted": "2", "annotated": "2", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 694, "id": "694", "accepted": "2", "annotated": "2", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 695, "id": "695", "accepted": "2", "annotated": "2", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 696, "id": "696", "accepted": "2", "annotated": "2", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 697, "id": "697", "accepted": "2", "annotated": "2", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 698, "id": "698", "accepted": "2", "annotated": "2", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 699, "id": "699", "accepted": "2", "annotated": "2", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 700, "id": "700", "accepted": "2", "annotated": "2", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 701, "id": "701", "accepted": "2", "annotated": "2", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 702, "id": "702", "accepted": "2", "annotated": "2", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 703, "id": "703", "accepted": "2", "annotated": "2", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 704, "id": "704", "accepted": "2", "annotated": "3", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 705, "id": "705", "accepted": "2", "annotated": "3", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 706, "id": "706", "accepted": "2", "annotated": "3", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 707, "id": "707", "accepted": "2", "annotated": "3", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 708, "id": "708", "accepted": "2", "annotated": "3", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 709, "id": "709", "accepted": "2", "annotated": "3", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 710, "id": "710", "accepted": "2", "annotated": "3", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 711, "id": "711", "accepted": "2", "annotated": "3", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 712, "id": "712", "accepted": "2", "annotated": "3", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 713, "id": "713", "accepted": "2", "annotated": "3", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 714, "id": "714", "accepted": "2", "annotated": "3", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 715, "id": "715", "accepted": "2", "annotated": "3", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 716, "id": "716", "accepted": "2", "annotated": "3", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 717, "id": "717", "accepted": "2", "annotated": "3", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 718, "id": "718", "accepted": "2", "annotated": "3", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 719, "id": "719", "accepted": "2", "annotated": "3", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 720, "id": "720", "accepted": "2", "annotated": "3", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 721, "id": "721", "accepted": "2", "annotated": "3", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 722, "id": "722", "accepted": "2", "annotated": "3", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 723, "id": "723", "accepted": "2", "annotated": "3", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 724, "id": "724", "accepted": "2", "annotated": "3", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 725, "id": "725", "accepted": "2", "annotated": "3", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 726, "id": "726", "accepted": "2", "annotated": "3", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 727, "id": "727", "accepted": "2", "annotated": "3", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 728, "id": "728", "accepted": "2", "annotated": "3", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 729, "id": "729", "accepted": "2", "annotated": "3", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 730, "id": "730", "accepted": "2", "annotated": "3", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 731, "id": "731", "accepted": "2", "annotated": "3", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 732, "id": "732", "accepted": "2", "annotated": "3", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 733, "id": "733", "accepted": "2", "annotated": "3", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 734, "id": "734", "accepted": "2", "annotated": "3", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 735, "id": "735", "accepted": "2", "annotated": "3", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 736, "id": "736", "accepted": "2", "annotated": "3", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 737, "id": "737", "accepted": "2", "annotated": "3", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 738, "id": "738", "accepted": "2", "annotated": "3", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 739, "id": "739", "accepted": "2", "annotated": "3", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 740, "id": "740", "accepted": "2", "annotated": "3", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 741, "id": "741", "accepted": "2", "annotated": "3", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 742, "id": "742", "accepted": "2", "annotated": "3", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 743, "id": "743", "accepted": "2", "annotated": "3", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 744, "id": "744", "accepted": "2", "annotated": "3", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 745, "id": "745", "accepted": "2", "annotated": "3", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 746, "id": "746", "accepted": "2", "annotated": "3", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 747, "id": "747", "accepted": "2", "annotated": "3", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 748, "id": "748", "accepted": "2", "annotated": "3", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 749, "id": "749", "accepted": "2", "annotated": "3", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 750, "id": "750", "accepted": "2", "annotated": "3", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 751, "id": "751", "accepted": "2", "annotated": "3", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 752, "id": "752", "accepted": "2", "annotated": "3", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 753, "id": "753", "accepted": "2", "annotated": "3", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 754, "id": "754", "accepted": "2", "annotated": "3", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 755, "id": "755", "accepted": "2", "annotated": "3", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 756, "id": "756", "accepted": "2", "annotated": "3", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 757, "id": "757", "accepted": "2", "annotated": "3", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 758, "id": "758", "accepted": "2", "annotated": "3", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 759, "id": "759", "accepted": "2", "annotated": "3", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 760, "id": "760", "accepted": "2", "annotated": "3", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 761, "id": "761", "accepted": "2", "annotated": "3", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 762, "id": "762", "accepted": "2", "annotated": "3", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 763, "id": "763", "accepted": "2", "annotated": "3", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 764, "id": "764", "accepted": "2", "annotated": "3", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 765, "id": "765", "accepted": "2", "annotated": "3", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 766, "id": "766", "accepted": "2", "annotated": "3", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 767, "id": "767", "accepted": "2", "annotated": "3", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 768, "id": "768", "accepted": "3", "annotated": "0", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 769, "id": "769", "accepted": "3", "annotated": "0", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 770, "id": "770", "accepted": "3", "annotated": "0", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 771, "id": "771", "accepted": "3", "annotated": "0", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 772, "id": "772", "accepted": "3", "annotated": "0", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 773, "id": "773", "accepted": "3", "annotated": "0", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 774, "id": "774", "accepted": "3", "annotated": "0", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 775, "id": "775", "accepted": "3", "annotated": "0", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 776, "id": "776", "accepted": "3", "annotated": "0", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 777, "id": "777", "accepted": "3", "annotated": "0", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 778, "id": "778", "accepted": "3", "annotated": "0", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 779, "id": "779", "accepted": "3", "annotated": "0", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 780, "id": "780", "accepted": "3", "annotated": "0", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 781, "id": "781", "accepted": "3", "annotated": "0", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 782, "id": "782", "accepted": "3", "annotated": "0", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 783, "id": "783", "accepted": "3", "annotated": "0", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 784, "id": "784", "accepted": "3", "annotated": "0", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 785, "id": "785", "accepted": "3", "annotated": "0", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 786, "id": "786", "accepted": "3", "annotated": "0", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 787, "id": "787", "accepted": "3", "annotated": "0", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 788, "id": "788", "accepted": "3", "annotated": "0", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 789, "id": "789", "accepted": "3", "annotated": "0", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 790, "id": "790", "accepted": "3", "annotated": "0", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 791, "id": "791", "accepted": "3", "annotated": "0", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 792, "id": "792", "accepted": "3", "annotated": "0", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 793, "id": "793", "accepted": "3", "annotated": "0", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 794, "id": "794", "accepted": "3", "annotated": "0", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 795, "id": "795", "accepted": "3", "annotated": "0", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 796, "id": "796", "accepted": "3", "annotated": "0", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 797, "id": "797", "accepted": "3", "annotated": "0", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 798, "id": "798", "accepted": "3", "annotated": "0", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 799, "id": "799", "accepted": "3", "annotated": "0", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 800, "id": "800", "accepted": "3", "annotated": "0", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 801, "id": "801", "accepted": "3", "annotated": "0", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 802, "id": "802", "accepted": "3", "annotated": "0", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 803, "id": "803", "accepted": "3", "annotated": "0", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 804, "id": "804", "accepted": "3", "annotated": "0", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 805, "id": "805", "accepted": "3", "annotated": "0", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 806, "id": "806", "accepted": "3", "annotated": "0", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 807, "id": "807", "accepted": "3", "annotated": "0", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 808, "id": "808", "accepted": "3", "annotated": "0", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 809, "id": "809", "accepted": "3", "annotated": "0", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 810, "id": "810", "accepted": "3", "annotated": "0", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 811, "id": "811", "accepted": "3", "annotated": "0", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 812, "id": "812", "accepted": "3", "annotated": "0", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 813, "id": "813", "accepted": "3", "annotated": "0", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 814, "id": "814", "accepted": "3", "annotated": "0", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 815, "id": "815", "accepted": "3", "annotated": "0", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 816, "id": "816", "accepted": "3", "annotated": "0", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 817, "id": "817", "accepted": "3", "annotated": "0", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 818, "id": "818", "accepted": "3", "annotated": "0", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 819, "id": "819", "accepted": "3", "annotated": "0", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 820, "id": "820", "accepted": "3", "annotated": "0", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 821, "id": "821", "accepted": "3", "annotated": "0", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 822, "id": "822", "accepted": "3", "annotated": "0", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 823, "id": "823", "accepted": "3", "annotated": "0", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 824, "id": "824", "accepted": "3", "annotated": "0", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 825, "id": "825", "accepted": "3", "annotated": "0", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 826, "id": "826", "accepted": "3", "annotated": "0", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 827, "id": "827", "accepted": "3", "annotated": "0", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 828, "id": "828", "accepted": "3", "annotated": "0", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 829, "id": "829", "accepted": "3", "annotated": "0", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 830, "id": "830", "accepted": "3", "annotated": "0", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 831, "id": "831", "accepted": "3", "annotated": "0", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 832, "id": "832", "accepted": "3", "annotated": "1", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 833, "id": "833", "accepted": "3", "annotated": "1", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 834, "id": "834", "accepted": "3", "annotated": "1", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 835, "id": "835", "accepted": "3", "annotated": "1", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 836, "id": "836", "accepted": "3", "annotated": "1", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 837, "id": "837", "accepted": "3", "annotated": "1", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 838, "id": "838", "accepted": "3", "annotated": "1", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 839, "id": "839", "accepted": "3", "annotated": "1", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 840, "id": "840", "accepted": "3", "annotated": "1", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 841, "id": "841", "accepted": "3", "annotated": "1", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 842, "id": "842", "accepted": "3", "annotated": "1", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 843, "id": "843", "accepted": "3", "annotated": "1", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 844, "id": "844", "accepted": "3", "annotated": "1", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 845, "id": "845", "accepted": "3", "annotated": "1", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 846, "id": "846", "accepted": "3", "annotated": "1", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 847, "id": "847", "accepted": "3", "annotated": "1", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 848, "id": "848", "accepted": "3", "annotated": "1", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 849, "id": "849", "accepted": "3", "annotated": "1", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 850, "id": "850", "accepted": "3", "annotated": "1", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 851, "id": "851", "accepted": "3", "annotated": "1", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 852, "id": "852", "accepted": "3", "annotated": "1", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 853, "id": "853", "accepted": "3", "annotated": "1", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 854, "id": "854", "accepted": "3", "annotated": "1", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 855, "id": "855", "accepted": "3", "annotated": "1", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 856, "id": "856", "accepted": "3", "annotated": "1", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 857, "id": "857", "accepted": "3", "annotated": "1", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 858, "id": "858", "accepted": "3", "annotated": "1", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 859, "id": "859", "accepted": "3", "annotated": "1", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 860, "id": "860", "accepted": "3", "annotated": "1", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 861, "id": "861", "accepted": "3", "annotated": "1", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 862, "id": "862", "accepted": "3", "annotated": "1", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 863, "id": "863", "accepted": "3", "annotated": "1", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 864, "id": "864", "accepted": "3", "annotated": "1", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 865, "id": "865", "accepted": "3", "annotated": "1", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 866, "id": "866", "accepted": "3", "annotated": "1", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 867, "id": "867", "accepted": "3", "annotated": "1", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 868, "id": "868", "accepted": "3", "annotated": "1", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 869, "id": "869", "accepted": "3", "annotated": "1", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 870, "id": "870", "accepted": "3", "annotated": "1", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 871, "id": "871", "accepted": "3", "annotated": "1", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 872, "id": "872", "accepted": "3", "annotated": "1", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 873, "id": "873", "accepted": "3", "annotated": "1", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 874, "id": "874", "accepted": "3", "annotated": "1", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 875, "id": "875", "accepted": "3", "annotated": "1", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 876, "id": "876", "accepted": "3", "annotated": "1", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 877, "id": "877", "accepted": "3", "annotated": "1", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 878, "id": "878", "accepted": "3", "annotated": "1", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 879, "id": "879", "accepted": "3", "annotated": "1", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 880, "id": "880", "accepted": "3", "annotated": "1", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 881, "id": "881", "accepted": "3", "annotated": "1", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 882, "id": "882", "accepted": "3", "annotated": "1", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 883, "id": "883", "accepted": "3", "annotated": "1", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 884, "id": "884", "accepted": "3", "annotated": "1", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 885, "id": "885", "accepted": "3", "annotated": "1", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 886, "id": "886", "accepted": "3", "annotated": "1", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 887, "id": "887", "accepted": "3", "annotated": "1", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 888, "id": "888", "accepted": "3", "annotated": "1", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 889, "id": "889", "accepted": "3", "annotated": "1", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 890, "id": "890", "accepted": "3", "annotated": "1", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 891, "id": "891", "accepted": "3", "annotated": "1", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 892, "id": "892", "accepted": "3", "annotated": "1", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 893, "id": "893", "accepted": "3", "annotated": "1", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 894, "id": "894", "accepted": "3", "annotated": "1", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 895, "id": "895", "accepted": "3", "annotated": "1", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 896, "id": "896", "accepted": "3", "annotated": "2", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 897, "id": "897", "accepted": "3", "annotated": "2", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 898, "id": "898", "accepted": "3", "annotated": "2", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 899, "id": "899", "accepted": "3", "annotated": "2", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 900, "id": "900", "accepted": "3", "annotated": "2", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 901, "id": "901", "accepted": "3", "annotated": "2", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 902, "id": "902", "accepted": "3", "annotated": "2", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 903, "id": "903", "accepted": "3", "annotated": "2", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 904, "id": "904", "accepted": "3", "annotated": "2", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 905, "id": "905", "accepted": "3", "annotated": "2", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 906, "id": "906", "accepted": "3", "annotated": "2", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 907, "id": "907", "accepted": "3", "annotated": "2", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 908, "id": "908", "accepted": "3", "annotated": "2", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 909, "id": "909", "accepted": "3", "annotated": "2", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 910, "id": "910", "accepted": "3", "annotated": "2", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 911, "id": "911", "accepted": "3", "annotated": "2", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 912, "id": "912", "accepted": "3", "annotated": "2", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 913, "id": "913", "accepted": "3", "annotated": "2", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 914, "id": "914", "accepted": "3", "annotated": "2", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 915, "id": "915", "accepted": "3", "annotated": "2", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 916, "id": "916", "accepted": "3", "annotated": "2", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 917, "id": "917", "accepted": "3", "annotated": "2", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 918, "id": "918", "accepted": "3", "annotated": "2", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 919, "id": "919", "accepted": "3", "annotated": "2", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 920, "id": "920", "accepted": "3", "annotated": "2", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 921, "id": "921", "accepted": "3", "annotated": "2", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 922, "id": "922", "accepted": "3", "annotated": "2", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 923, "id": "923", "accepted": "3", "annotated": "2", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 924, "id": "924", "accepted": "3", "annotated": "2", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 925, "id": "925", "accepted": "3", "annotated": "2", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 926, "id": "926", "accepted": "3", "annotated": "2", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 927, "id": "927", "accepted": "3", "annotated": "2", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 928, "id": "928", "accepted": "3", "annotated": "2", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 929, "id": "929", "accepted": "3", "annotated": "2", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 930, "id": "930", "accepted": "3", "annotated": "2", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 931, "id": "931", "accepted": "3", "annotated": "2", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 932, "id": "932", "accepted": "3", "annotated": "2", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 933, "id": "933", "accepted": "3", "annotated": "2", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 934, "id": "934", "accepted": "3", "annotated": "2", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 935, "id": "935", "accepted": "3", "annotated": "2", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 936, "id": "936", "accepted": "3", "annotated": "2", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 937, "id": "937", "accepted": "3", "annotated": "2", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 938, "id": "938", "accepted": "3", "annotated": "2", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 939, "id": "939", "accepted": "3", "annotated": "2", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 940, "id": "940", "accepted": "3", "annotated": "2", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 941, "id": "941", "accepted": "3", "annotated": "2", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 942, "id": "942", "accepted": "3", "annotated": "2", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 943, "id": "943", "accepted": "3", "annotated": "2", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 944, "id": "944", "accepted": "3", "annotated": "2", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 945, "id": "945", "accepted": "3", "annotated": "2", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 946, "id": "946", "accepted": "3", "annotated": "2", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 947, "id": "947", "accepted": "3", "annotated": "2", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 948, "id": "948", "accepted": "3", "annotated": "2", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 949, "id": "949", "accepted": "3", "annotated": "2", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 950, "id": "950", "accepted": "3", "annotated": "2", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 951, "id": "951", "accepted": "3", "annotated": "2", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 952, "id": "952", "accepted": "3", "annotated": "2", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 953, "id": "953", "accepted": "3", "annotated": "2", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 954, "id": "954", "accepted": "3", "annotated": "2", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 955, "id": "955", "accepted": "3", "annotated": "2", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 956, "id": "956", "accepted": "3", "annotated": "2", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 957, "id": "957", "accepted": "3", "annotated": "2", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 958, "id": "958", "accepted": "3", "annotated": "2", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 959, "id": "959", "accepted": "3", "annotated": "2", "available": "3", "rejected": "3", "type": "3"}
    ,{ "_id": 960, "id": "960", "accepted": "3", "annotated": "3", "available": "0", "rejected": "0", "type": "0"}
    ,{ "_id": 961, "id": "961", "accepted": "3", "annotated": "3", "available": "0", "rejected": "0", "type": "1"}
    ,{ "_id": 962, "id": "962", "accepted": "3", "annotated": "3", "available": "0", "rejected": "0", "type": "2"}
    ,{ "_id": 963, "id": "963", "accepted": "3", "annotated": "3", "available": "0", "rejected": "0", "type": "3"}
    ,{ "_id": 964, "id": "964", "accepted": "3", "annotated": "3", "available": "0", "rejected": "1", "type": "0"}
    ,{ "_id": 965, "id": "965", "accepted": "3", "annotated": "3", "available": "0", "rejected": "1", "type": "1"}
    ,{ "_id": 966, "id": "966", "accepted": "3", "annotated": "3", "available": "0", "rejected": "1", "type": "2"}
    ,{ "_id": 967, "id": "967", "accepted": "3", "annotated": "3", "available": "0", "rejected": "1", "type": "3"}
    ,{ "_id": 968, "id": "968", "accepted": "3", "annotated": "3", "available": "0", "rejected": "2", "type": "0"}
    ,{ "_id": 969, "id": "969", "accepted": "3", "annotated": "3", "available": "0", "rejected": "2", "type": "1"}
    ,{ "_id": 970, "id": "970", "accepted": "3", "annotated": "3", "available": "0", "rejected": "2", "type": "2"}
    ,{ "_id": 971, "id": "971", "accepted": "3", "annotated": "3", "available": "0", "rejected": "2", "type": "3"}
    ,{ "_id": 972, "id": "972", "accepted": "3", "annotated": "3", "available": "0", "rejected": "3", "type": "0"}
    ,{ "_id": 973, "id": "973", "accepted": "3", "annotated": "3", "available": "0", "rejected": "3", "type": "1"}
    ,{ "_id": 974, "id": "974", "accepted": "3", "annotated": "3", "available": "0", "rejected": "3", "type": "2"}
    ,{ "_id": 975, "id": "975", "accepted": "3", "annotated": "3", "available": "0", "rejected": "3", "type": "3"}
    ,{ "_id": 976, "id": "976", "accepted": "3", "annotated": "3", "available": "1", "rejected": "0", "type": "0"}
    ,{ "_id": 977, "id": "977", "accepted": "3", "annotated": "3", "available": "1", "rejected": "0", "type": "1"}
    ,{ "_id": 978, "id": "978", "accepted": "3", "annotated": "3", "available": "1", "rejected": "0", "type": "2"}
    ,{ "_id": 979, "id": "979", "accepted": "3", "annotated": "3", "available": "1", "rejected": "0", "type": "3"}
    ,{ "_id": 980, "id": "980", "accepted": "3", "annotated": "3", "available": "1", "rejected": "1", "type": "0"}
    ,{ "_id": 981, "id": "981", "accepted": "3", "annotated": "3", "available": "1", "rejected": "1", "type": "1"}
    ,{ "_id": 982, "id": "982", "accepted": "3", "annotated": "3", "available": "1", "rejected": "1", "type": "2"}
    ,{ "_id": 983, "id": "983", "accepted": "3", "annotated": "3", "available": "1", "rejected": "1", "type": "3"}
    ,{ "_id": 984, "id": "984", "accepted": "3", "annotated": "3", "available": "1", "rejected": "2", "type": "0"}
    ,{ "_id": 985, "id": "985", "accepted": "3", "annotated": "3", "available": "1", "rejected": "2", "type": "1"}
    ,{ "_id": 986, "id": "986", "accepted": "3", "annotated": "3", "available": "1", "rejected": "2", "type": "2"}
    ,{ "_id": 987, "id": "987", "accepted": "3", "annotated": "3", "available": "1", "rejected": "2", "type": "3"}
    ,{ "_id": 988, "id": "988", "accepted": "3", "annotated": "3", "available": "1", "rejected": "3", "type": "0"}
    ,{ "_id": 989, "id": "989", "accepted": "3", "annotated": "3", "available": "1", "rejected": "3", "type": "1"}
    ,{ "_id": 990, "id": "990", "accepted": "3", "annotated": "3", "available": "1", "rejected": "3", "type": "2"}
    ,{ "_id": 991, "id": "991", "accepted": "3", "annotated": "3", "available": "1", "rejected": "3", "type": "3"}
    ,{ "_id": 992, "id": "992", "accepted": "3", "annotated": "3", "available": "2", "rejected": "0", "type": "0"}
    ,{ "_id": 993, "id": "993", "accepted": "3", "annotated": "3", "available": "2", "rejected": "0", "type": "1"}
    ,{ "_id": 994, "id": "994", "accepted": "3", "annotated": "3", "available": "2", "rejected": "0", "type": "2"}
    ,{ "_id": 995, "id": "995", "accepted": "3", "annotated": "3", "available": "2", "rejected": "0", "type": "3"}
    ,{ "_id": 996, "id": "996", "accepted": "3", "annotated": "3", "available": "2", "rejected": "1", "type": "0"}
    ,{ "_id": 997, "id": "997", "accepted": "3", "annotated": "3", "available": "2", "rejected": "1", "type": "1"}
    ,{ "_id": 998, "id": "998", "accepted": "3", "annotated": "3", "available": "2", "rejected": "1", "type": "2"}
    ,{ "_id": 999, "id": "999", "accepted": "3", "annotated": "3", "available": "2", "rejected": "1", "type": "3"}
    ,{ "_id": 1000, "id": "1000", "accepted": "3", "annotated": "3", "available": "2", "rejected": "2", "type": "0"}
    ,{ "_id": 1001, "id": "1001", "accepted": "3", "annotated": "3", "available": "2", "rejected": "2", "type": "1"}
    ,{ "_id": 1002, "id": "1002", "accepted": "3", "annotated": "3", "available": "2", "rejected": "2", "type": "2"}
    ,{ "_id": 1003, "id": "1003", "accepted": "3", "annotated": "3", "available": "2", "rejected": "2", "type": "3"}
    ,{ "_id": 1004, "id": "1004", "accepted": "3", "annotated": "3", "available": "2", "rejected": "3", "type": "0"}
    ,{ "_id": 1005, "id": "1005", "accepted": "3", "annotated": "3", "available": "2", "rejected": "3", "type": "1"}
    ,{ "_id": 1006, "id": "1006", "accepted": "3", "annotated": "3", "available": "2", "rejected": "3", "type": "2"}
    ,{ "_id": 1007, "id": "1007", "accepted": "3", "annotated": "3", "available": "2", "rejected": "3", "type": "3"}
    ,{ "_id": 1008, "id": "1008", "accepted": "3", "annotated": "3", "available": "3", "rejected": "0", "type": "0"}
    ,{ "_id": 1009, "id": "1009", "accepted": "3", "annotated": "3", "available": "3", "rejected": "0", "type": "1"}
    ,{ "_id": 1010, "id": "1010", "accepted": "3", "annotated": "3", "available": "3", "rejected": "0", "type": "2"}
    ,{ "_id": 1011, "id": "1011", "accepted": "3", "annotated": "3", "available": "3", "rejected": "0", "type": "3"}
    ,{ "_id": 1012, "id": "1012", "accepted": "3", "annotated": "3", "available": "3", "rejected": "1", "type": "0"}
    ,{ "_id": 1013, "id": "1013", "accepted": "3", "annotated": "3", "available": "3", "rejected": "1", "type": "1"}
    ,{ "_id": 1014, "id": "1014", "accepted": "3", "annotated": "3", "available": "3", "rejected": "1", "type": "2"}
    ,{ "_id": 1015, "id": "1015", "accepted": "3", "annotated": "3", "available": "3", "rejected": "1", "type": "3"}
    ,{ "_id": 1016, "id": "1016", "accepted": "3", "annotated": "3", "available": "3", "rejected": "2", "type": "0"}
    ,{ "_id": 1017, "id": "1017", "accepted": "3", "annotated": "3", "available": "3", "rejected": "2", "type": "1"}
    ,{ "_id": 1018, "id": "1018", "accepted": "3", "annotated": "3", "available": "3", "rejected": "2", "type": "2"}
    ,{ "_id": 1019, "id": "1019", "accepted": "3", "annotated": "3", "available": "3", "rejected": "2", "type": "3"}
    ,{ "_id": 1020, "id": "1020", "accepted": "3", "annotated": "3", "available": "3", "rejected": "3", "type": "0"}
    ,{ "_id": 1021, "id": "1021", "accepted": "3", "annotated": "3", "available": "3", "rejected": "3", "type": "1"}
    ,{ "_id": 1022, "id": "1022", "accepted": "3", "annotated": "3", "available": "3", "rejected": "3", "type": "2"}
    ,{ "_id": 1023, "id": "1023", "accepted": "3", "annotated": "3", "available": "3", "rejected": "3", "type": "3"}
]

},{}],110:[function(require,module,exports){
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
    this.db.insert(require('./default'));
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

},{"./default":109}],111:[function(require,module,exports){
module.exports=[
    { "_id": 0, "id": "0", "fullname": "0", "id": "0", "selector": "0"}
    ,{ "_id": 1, "id": "1", "fullname": "0", "id": "0", "selector": "1"}
    ,{ "_id": 2, "id": "2", "fullname": "0", "id": "0", "selector": "2"}
    ,{ "_id": 3, "id": "3", "fullname": "0", "id": "0", "selector": "3"}
    ,{ "_id": 4, "id": "4", "fullname": "0", "id": "1", "selector": "0"}
    ,{ "_id": 5, "id": "5", "fullname": "0", "id": "1", "selector": "1"}
    ,{ "_id": 6, "id": "6", "fullname": "0", "id": "1", "selector": "2"}
    ,{ "_id": 7, "id": "7", "fullname": "0", "id": "1", "selector": "3"}
    ,{ "_id": 8, "id": "8", "fullname": "0", "id": "2", "selector": "0"}
    ,{ "_id": 9, "id": "9", "fullname": "0", "id": "2", "selector": "1"}
    ,{ "_id": 10, "id": "10", "fullname": "0", "id": "2", "selector": "2"}
    ,{ "_id": 11, "id": "11", "fullname": "0", "id": "2", "selector": "3"}
    ,{ "_id": 12, "id": "12", "fullname": "0", "id": "3", "selector": "0"}
    ,{ "_id": 13, "id": "13", "fullname": "0", "id": "3", "selector": "1"}
    ,{ "_id": 14, "id": "14", "fullname": "0", "id": "3", "selector": "2"}
    ,{ "_id": 15, "id": "15", "fullname": "0", "id": "3", "selector": "3"}
    ,{ "_id": 16, "id": "16", "fullname": "1", "id": "0", "selector": "0"}
    ,{ "_id": 17, "id": "17", "fullname": "1", "id": "0", "selector": "1"}
    ,{ "_id": 18, "id": "18", "fullname": "1", "id": "0", "selector": "2"}
    ,{ "_id": 19, "id": "19", "fullname": "1", "id": "0", "selector": "3"}
    ,{ "_id": 20, "id": "20", "fullname": "1", "id": "1", "selector": "0"}
    ,{ "_id": 21, "id": "21", "fullname": "1", "id": "1", "selector": "1"}
    ,{ "_id": 22, "id": "22", "fullname": "1", "id": "1", "selector": "2"}
    ,{ "_id": 23, "id": "23", "fullname": "1", "id": "1", "selector": "3"}
    ,{ "_id": 24, "id": "24", "fullname": "1", "id": "2", "selector": "0"}
    ,{ "_id": 25, "id": "25", "fullname": "1", "id": "2", "selector": "1"}
    ,{ "_id": 26, "id": "26", "fullname": "1", "id": "2", "selector": "2"}
    ,{ "_id": 27, "id": "27", "fullname": "1", "id": "2", "selector": "3"}
    ,{ "_id": 28, "id": "28", "fullname": "1", "id": "3", "selector": "0"}
    ,{ "_id": 29, "id": "29", "fullname": "1", "id": "3", "selector": "1"}
    ,{ "_id": 30, "id": "30", "fullname": "1", "id": "3", "selector": "2"}
    ,{ "_id": 31, "id": "31", "fullname": "1", "id": "3", "selector": "3"}
    ,{ "_id": 32, "id": "32", "fullname": "2", "id": "0", "selector": "0"}
    ,{ "_id": 33, "id": "33", "fullname": "2", "id": "0", "selector": "1"}
    ,{ "_id": 34, "id": "34", "fullname": "2", "id": "0", "selector": "2"}
    ,{ "_id": 35, "id": "35", "fullname": "2", "id": "0", "selector": "3"}
    ,{ "_id": 36, "id": "36", "fullname": "2", "id": "1", "selector": "0"}
    ,{ "_id": 37, "id": "37", "fullname": "2", "id": "1", "selector": "1"}
    ,{ "_id": 38, "id": "38", "fullname": "2", "id": "1", "selector": "2"}
    ,{ "_id": 39, "id": "39", "fullname": "2", "id": "1", "selector": "3"}
    ,{ "_id": 40, "id": "40", "fullname": "2", "id": "2", "selector": "0"}
    ,{ "_id": 41, "id": "41", "fullname": "2", "id": "2", "selector": "1"}
    ,{ "_id": 42, "id": "42", "fullname": "2", "id": "2", "selector": "2"}
    ,{ "_id": 43, "id": "43", "fullname": "2", "id": "2", "selector": "3"}
    ,{ "_id": 44, "id": "44", "fullname": "2", "id": "3", "selector": "0"}
    ,{ "_id": 45, "id": "45", "fullname": "2", "id": "3", "selector": "1"}
    ,{ "_id": 46, "id": "46", "fullname": "2", "id": "3", "selector": "2"}
    ,{ "_id": 47, "id": "47", "fullname": "2", "id": "3", "selector": "3"}
    ,{ "_id": 48, "id": "48", "fullname": "3", "id": "0", "selector": "0"}
    ,{ "_id": 49, "id": "49", "fullname": "3", "id": "0", "selector": "1"}
    ,{ "_id": 50, "id": "50", "fullname": "3", "id": "0", "selector": "2"}
    ,{ "_id": 51, "id": "51", "fullname": "3", "id": "0", "selector": "3"}
    ,{ "_id": 52, "id": "52", "fullname": "3", "id": "1", "selector": "0"}
    ,{ "_id": 53, "id": "53", "fullname": "3", "id": "1", "selector": "1"}
    ,{ "_id": 54, "id": "54", "fullname": "3", "id": "1", "selector": "2"}
    ,{ "_id": 55, "id": "55", "fullname": "3", "id": "1", "selector": "3"}
    ,{ "_id": 56, "id": "56", "fullname": "3", "id": "2", "selector": "0"}
    ,{ "_id": 57, "id": "57", "fullname": "3", "id": "2", "selector": "1"}
    ,{ "_id": 58, "id": "58", "fullname": "3", "id": "2", "selector": "2"}
    ,{ "_id": 59, "id": "59", "fullname": "3", "id": "2", "selector": "3"}
    ,{ "_id": 60, "id": "60", "fullname": "3", "id": "3", "selector": "0"}
    ,{ "_id": 61, "id": "61", "fullname": "3", "id": "3", "selector": "1"}
    ,{ "_id": 62, "id": "62", "fullname": "3", "id": "3", "selector": "2"}
    ,{ "_id": 63, "id": "63", "fullname": "3", "id": "3", "selector": "3"}
]

},{}],112:[function(require,module,exports){
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
    this.db.insert(require('./default'));
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

},{"./default":111}]},{},[105])
/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird'),
    $ = require('jquery');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
    self.sendData = function() {
        var self = this;
        this.data = {
            'type': self.output['account-type'],
            'fullname': self.output['fullname'],
            'password': self.output['password'],
            'username': self.output['username'],
        };
        $.ajax({
        url: "http://awt.ifmledit.org/api/user",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIKey fb72e1fe-3583-11e7-a919-92ebcb67fe33");
        },
        data: JSON.stringify(this.data),
        contentType: "application/json",
        success: function(result){
            alert("it works")
        },
          statusCode: {
            400: function(xhr) {
                var myobj = JSON.parse(xhr.responseText);
                self.errors()['account-type'](myobj.error.type);
                self.errors()['fullname'](myobj.error.fullname);
                self.errors()['password'](myobj.error.password);
                self.errors()['username'](myobj.error.username);
            }
        }})  
    }
}

ViewModel.prototype.id = 'register-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};


ViewModel.prototype._compute = function () {
    this.output = {
        'account-type': this.input['account-type'],
        'fullname': this.input['fullname'],
        'password': this.input['password'],
        'username': this.input['username'],
    }
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

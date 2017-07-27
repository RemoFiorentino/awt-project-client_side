/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird'),
    $ = require('jquery');

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

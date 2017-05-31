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

/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird'),
    $ = require('jquery');

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

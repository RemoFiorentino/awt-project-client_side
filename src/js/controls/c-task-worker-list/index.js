/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird'),
    $ = require("jquery");

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

/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird'),
    $ = require('jquery');

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

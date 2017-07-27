/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird'),
    $ = require("jquery");

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

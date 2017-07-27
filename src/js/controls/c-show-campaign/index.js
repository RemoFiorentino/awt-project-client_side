/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    $ = require("jquery");
    
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

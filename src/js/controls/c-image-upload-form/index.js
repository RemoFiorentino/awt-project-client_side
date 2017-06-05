/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird'),
    $ = require("jquery"),
    ob = undefined;

function ViewModel(params) {
    var self = this;
    ob = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});
    self.imagesArray = ko.observableArray(); 
    self.photoUrl = ko.observable();
    self.modalUrl = ko.observable();
    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
    this.fileUpload = function(data, e)
    {
        var file    = e.target.files[0];
        var reader  = new FileReader();

        reader.onloadend = function (onloadend_e) 
        {
           var result = reader.result; //base 64 encoded.
           self.photoUrl(result);
           self.output['image'] = file;
        };

        if(file)
        {
            reader.readAsDataURL(file);
        }
    };
    self.delete = function(){
        var img = this;
        $.ajax({
        url: "http://awt.ifmledit.org" + img.id,
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+ self.context.repositories.current_user.token);
        },
        success: function(result){
            var myobj = result;
            self.imagesArray.remove(img);
        }
        });
    }
    self.show = function(){
        self.modalUrl(this.canonical);
		$('#imagemodal').modal('show');   
    }
}

ViewModel.prototype.fill = function (errors_sent,id,images,new_image) {
    if(new_image != undefined){
        images.push(new_image);
    }
    this.imagesArray(images);
    this.fields()['image']("");
    this.output.id = id
    this.output.images = this.imagesArray();
    this.errors()['image'](errors_sent.image);
    this.errors()['others'](errors_sent.others);
};

ViewModel.prototype.id = 'image-upload-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'image': this.input['image'],
        'images': [],
    }
    var self = this,
        fields = {
            'image': ko.observable(this.input['image']),
        },
        errors = {
            'image': ko.observable(this.input['image-error']),
            'others': ko.observable(),
        };
    self.imagesArray.subscribe(function(changes) {
        if(changes == undefined){
            return;
        }
        changes.forEach(function(change) {
            if (change.status === 'added' || change.status === 'deleted') {
                self.output['images'] = self.images();
            }
        });
    });
    this.photoUrl("")
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options,errors,id,images,new_image) {
    options = options || {};
    errors = errors || {};
    images = images || [];
    new_image = new_image || undefined;
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            self.fill(errors,id,images,new_image)
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

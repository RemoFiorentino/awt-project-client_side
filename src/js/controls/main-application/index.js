/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    $ = require('jquery');

exports.register = function () {
    ko.components.register('main-application', {
        viewModel: function(params, componentInfo) {
            var self = this,
                defaultChild = 'home-bar';
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

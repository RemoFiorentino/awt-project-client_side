/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    $ = require('jquery');

exports.register = function () {
    ko.components.register('main-application', {
        viewModel: function(params, componentInfo) {
            var self = this,
                defaultChild = 'home-bar, line-drawer';
            self.context = params.context;
            self.active = ko.observable(undefined);
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
            }
            self.trigger = function (id) {
                self.context.events[id](self.context);
            };
            self.context.top = self;
        },
        template: require('./index.html'),
        synchronous: true
    });
};

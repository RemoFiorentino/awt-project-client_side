/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['home-bar']) {
            context.top.active('home-bar');
        }
        context.vms['home-bar'].init();
    };
};

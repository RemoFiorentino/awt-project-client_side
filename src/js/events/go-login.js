/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['login-form']) {
            context.top.active('login-form');
        }
        context.vms['login-form'].init();
    };
};

/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['login-view']) {
            context.top.active('login-view');
            context.vms['login-view'].init({mask: 'login-form'});
        }
        context.vms['login-form'].init();
    };
};

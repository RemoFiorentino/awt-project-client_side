/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['register-view']) {
            context.top.active('register-view');
            context.vms['register-view'].init({mask: 'register-form'});
        }
        context.vms['register-form'].init();
    };
};

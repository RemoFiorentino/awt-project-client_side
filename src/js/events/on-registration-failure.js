/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        data = data || {};
        var packet = {
            'error' : data['error']
        };
        if (!context.vms['register-form']) {
            context.top.active('register-form');
        }
        context.vms['register-form'].init(packet);
    };
};

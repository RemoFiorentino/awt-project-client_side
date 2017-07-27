/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        data = data || {};
        if (!context.vms['register-form']) {
            context.top.active('register-form');
        }
        context.vms['register-form'].init({},data.errors, data.fields);
    };
};

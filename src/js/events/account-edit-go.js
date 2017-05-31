/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['account-edit-view']) {
            context.top.active('account-edit-view');
        }
        context.vms['account-edit-view'].init();
    };
};

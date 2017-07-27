/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['account-edit-view']) {
            context.top.active('account-edit-view');
            context.vms['account-edit-view'].init({mask: 'account-edit-form'});
        }
        context.vms['account-edit-form'].init({},data.errors,data.fields);
    };
};

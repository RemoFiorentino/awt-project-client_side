/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['edit-campaign-view']) {
            context.top.active('edit-campaign-view');
            context.vms['edit-campaign-view'].init({mask: 'edit-campaign-form'});
        }
        context.vms['edit-campaign-form'].init({},data.errors,data.fields);
    };
};

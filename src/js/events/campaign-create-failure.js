/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['create-campaign-view']) {
            context.top.active('create-campaign-view');
            context.vms['create-campaign-view'].init({mask: 'create-campaign-form'});
        }
        context.vms['create-campaign-form'].init({},data.errors, data.fields);
    };
};

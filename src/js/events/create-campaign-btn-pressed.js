/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['create-campaign-view']) {
            context.top.active('create-campaign-view');
        }
        context.vms['create-campaign-view'].init();
    };
};

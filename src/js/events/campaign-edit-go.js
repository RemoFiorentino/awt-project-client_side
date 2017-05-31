/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['edit-campaign-view']) {
            context.top.active('edit-campaign-view');
        }
        context.vms['edit-campaign-view'].init();
    };
};

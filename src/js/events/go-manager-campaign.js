/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['manager-view']) {
            context.top.active('manager-view');
        }
        context.vms['manager-view'].init();
    };
};

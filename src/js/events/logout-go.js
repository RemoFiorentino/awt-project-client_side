/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['logout-view']) {
            context.top.active('logout-view');
        }
        context.vms['logout-view'].init();
    };
};

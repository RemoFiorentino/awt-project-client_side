/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['task-view']) {
            context.top.active('task-view');
        }
        context.vms['task-view'].init();
    };
};

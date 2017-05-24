/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['show-campaign']) {
            context.top.active('show-campaign');
        }
        context.vms['show-campaign'].init();
    };
};

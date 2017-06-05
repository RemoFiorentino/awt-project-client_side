/*jslint node: true, nomen: true */
"use strict";
var $ = require("jquery");

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['worker-select-view']) {
            context.top.active('worker-select-view');
        }
        context.vms['worker-select-list'].init({},data.id);
    };
};

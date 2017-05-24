/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['worker-select-view']) {
            context.top.active('worker-select-view');
            context.vms['worker-select-view'].init({mask: 'selector-list'});
        }
        context.vms['selector-list'].init();
    };
};

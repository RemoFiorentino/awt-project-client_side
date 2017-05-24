/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['image-selection']) {
            context.top.active('image-selection');
            context.vms['image-selection'].init({mask: 'image-selection-form'});
        }
        context.vms['image-selection-form'].init();
    };
};

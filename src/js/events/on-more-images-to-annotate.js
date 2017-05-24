/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['image-annotation']) {
            context.top.active('image-annotation');
            context.vms['image-annotation'].init({mask: 'image-annotation-form'});
        }
        context.vms['image-annotation-form'].init();
    };
};

/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['image-upload-view']) {
            context.top.active('image-upload-view');
        }
        context.vms['image-upload-view'].init();
    };
};

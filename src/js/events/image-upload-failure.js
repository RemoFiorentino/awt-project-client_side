/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['image-upload-view']) {
            context.top.active('image-upload-view');
            context.vms['image-upload-view'].init({mask: 'image-upload-form'});
        }
        context.vms['image-upload-form'].init({},data.errors,data.id,data.images);
    };
};

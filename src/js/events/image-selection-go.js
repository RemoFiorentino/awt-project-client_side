/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['image-selection']) {
            context.top.active('image-selection');
        }
        context.vms['image-selection-form'].init({},data.id,data.init);
    };
};

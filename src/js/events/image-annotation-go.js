/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['image-annotation']) {
            context.top.active('image-annotation');
        }
        console.log(data);
        context.vms['image-annotation-form'].init({},data.id,data.init);
    };
};

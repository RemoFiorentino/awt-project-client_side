/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'image' : data['image']
            ,'id' : data['id']
            ,'images': data['images']
        };
        var promise = context.actions['send-image-upload-data']({filters: packet});
        context.runningActionsByContainer['image-upload-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['image-upload-view'].splice(
                context.runningActionsByContainer['image-upload-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

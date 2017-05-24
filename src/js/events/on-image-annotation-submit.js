/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'annotation' : data['annotation']
        };
        var promise = context.actions['send-images-annotation']({filters: packet});
        context.runningActionsByContainer['image-annotation'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['image-annotation'].splice(
                context.runningActionsByContainer['image-annotation'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'accepted' : data['accepted'],
            'id': data['id'],
            'type': 'selection'
        };
        var promise = context.actions['send-image-selection']({filters: packet});
        context.runningActionsByContainer['image-selection'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['image-selection'].splice(
                context.runningActionsByContainer['image-selection'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

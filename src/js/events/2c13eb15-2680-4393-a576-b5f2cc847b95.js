/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        var promise = context.actions['send-workers-to-campaign']({filters: packet});
        context.runningActionsByContainer['worker-select-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['worker-select-view'].splice(
                context.runningActionsByContainer['worker-select-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'annotation_replica' : data['annotation_replica']
            ,'annotation_size' : data['annotation_size']
            ,'name' : data['name']
            ,'selection_replica' : data['selection_replica']
            ,'threshold' : data['threshold']
        };
        var promise = context.actions['send-create-campaign-data']({filters: packet});
        context.runningActionsByContainer['create-campaign-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['create-campaign-view'].splice(
                context.runningActionsByContainer['create-campaign-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

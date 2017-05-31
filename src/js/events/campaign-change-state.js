/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['change-campaign-state']();
        context.runningActionsByContainer['manager-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['manager-view'].splice(
                context.runningActionsByContainer['manager-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

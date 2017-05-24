/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['send-logout-data']();
        context.runningActionsByContainer['home-bar'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['home-bar'].splice(
                context.runningActionsByContainer['home-bar'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

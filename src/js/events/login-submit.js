/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'password' : data['password']
            ,'username' : data['username']
        };
        var promise = context.actions['send-login-data']({filters: packet});
        context.runningActionsByContainer['login-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['login-view'].splice(
                context.runningActionsByContainer['login-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'fullname' : data['fullname']
            ,'password' : data['password']
        };
        var promise = context.actions['send-account-edit-data']({filters: packet});
        context.runningActionsByContainer['account-edit-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['account-edit-view'].splice(
                context.runningActionsByContainer['account-edit-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

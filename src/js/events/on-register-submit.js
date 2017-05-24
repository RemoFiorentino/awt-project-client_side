/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'account-type' : data['account-type']
            ,'password' : data['password']
            ,'fullname' : data['fullname']
            ,'username' : data['username']
        };
        var promise = context.actions['send-registration-data']({filters: packet});
        context.runningActionsByContainer['register-view'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['register-view'].splice(
                context.runningActionsByContainer['register-view'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};

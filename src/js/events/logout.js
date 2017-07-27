/*jslint node: true, nomen: true */
"use strict";
var $ = require("jquery");
exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        // var promise = context.actions['send-logout-data']();
        // context.runningActionsByContainer['main-application'].push(promise);
        // promise.then(function (result) {
        //     context.runningActionsByContainer['main-application'].splice(
        //         context.runningActionsByContainer['main-application'].indexOf(promise), 1
        //     );
        //     if (result.event) {
        //         context.events[result.event](context, result.data);
        //     }
        // });
        $.ajax({
        url: "http://awt.ifmledit.org/api/auth",
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
        },
        contentType: "application/json",
        success: function(result){
            var myobj = result;
            context.repositories.current_user = {}
            if (!context.vms['home-bar']) {
                context.top.active('home-bar');
            }
            context.vms['home-bar'].init();
            if(!$.isEmptyObject(context.repositories['current_user'])){
                if(context.repositories.current_user.type.toUpperCase() === "MASTER"){
                    context.top.isLogin(true,context.repositories['current_user'].username, true);
                }else{
                    context.top.isLogin(true,context.repositories['current_user'].username, false);
                }
                
            }else{
                context.top.isLogin(false, "", false);
            }
        }});
    };
};

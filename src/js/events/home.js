/*jslint node: true, nomen: true */
"use strict";

var $ = require("jquery");
exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
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
    };
};

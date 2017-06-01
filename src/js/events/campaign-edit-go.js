/*jslint node: true, nomen: true */
"use strict";
var $ = require("jquery");
exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['edit-campaign-view']) {
            context.top.active('edit-campaign-view');
        }
        $.ajax({
        url: "http://awt.ifmledit.org" + data.id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
        },
        success: function(result){
            var myobj = result;
            context.vms['edit-campaign-form'].init({},{}, myobj);
        }
        });
    };
};

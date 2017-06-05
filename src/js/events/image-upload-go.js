/*jslint node: true, nomen: true */
"use strict";
var $ = require("jquery");

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['image-upload-view']) {
            context.top.active('image-upload-view');
        }
        if(data.images === undefined){
            $.ajax({
            url: "http://awt.ifmledit.org" + data.id + "/image",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "APIToken "+ context.repositories.current_user.token);
            },
            success: function(result){
                var myobj = result;
                context.vms['image-upload-form'].init({},{},data.id,myobj.images,undefined);
            }
            });
        }else{
            context.vms['image-upload-form'].init({},{},data.id,data.images,data.new_image);
        }
    };
};

/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'change-campaign-state': require('./change-campaign-state').createAction(options)
        ,'send-account-edit-data': require('./send-account-edit-data').createAction(options)
        ,'send-create-campaign-data': require('./send-create-campaign-data').createAction(options)
        ,'send-edit-campaign': require('./send-edit-campaign').createAction(options)
        ,'send-image-selection': require('./send-image-selection').createAction(options)
        ,'send-image-upload-data': require('./send-image-upload-data').createAction(options)
        ,'send-images-annotation': require('./send-images-annotation').createAction(options)
        ,'send-logout-data': require('./send-logout-data').createAction(options)
        ,'send-workers-to-campaign': require('./send-workers-to-campaign').createAction(options)
        ,'send-annotator-to-campaign': require('./send-annotator-to-campaign').createAction(options)
        ,'send-login-data': require('./send-login-data').createAction(options)
        ,'send-registration-data': require('./send-registration-data').createAction(options)
    };
};

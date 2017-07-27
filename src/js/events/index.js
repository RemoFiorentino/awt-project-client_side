/*jslint node: true, nomen: true */
"use strict";

exports.createEvents = function (options) {
    return {
        'manager-go': require('./manager-go').createEvent(options)
        ,'image-upload-go': require('./image-upload-go').createEvent(options)
        ,'worker-select-go': require('./worker-select-go').createEvent(options)
        ,'login-go': require('./login-go').createEvent(options)
        ,'register-go': require('./register-go').createEvent(options)
        ,'logout': require('./logout').createEvent(options)
        ,'account-edit-go': require('./account-edit-go').createEvent(options)
        ,'campaign-create': require('./campaign-create').createEvent(options)
        ,'campaign-edit-go': require('./campaign-edit-go').createEvent(options)
        ,'campaign-change-state': require('./campaign-change-state').createEvent(options)
        ,'account-edit-failure': require('./account-edit-failure').createEvent(options)
        ,'on-account-edit-success': require('./on-account-edit-success').createEvent(options)
        ,'campaign-create-failure': require('./campaign-create-failure').createEvent(options)
        ,'campaign-edit-failure': require('./campaign-edit-failure').createEvent(options)
        ,'image-selection-go': require('./image-selection-go').createEvent(options)
        ,'task-go': require('./task-go').createEvent(options)
        ,'image-upload-failure': require('./image-upload-failure').createEvent(options)
        ,'image-annotation-go': require('./image-annotation-go').createEvent(options)
        ,'account-edit-submit': require('./account-edit-submit').createEvent(options)
        ,'campaign-create-submit': require('./campaign-create-submit').createEvent(options)
        ,'campaign-edit-submit': require('./campaign-edit-submit').createEvent(options)
        ,'image-annotation-submit': require('./image-annotation-submit').createEvent(options)
        ,'image-selection-submit': require('./image-selection-submit').createEvent(options)
        ,'image-upload-submit': require('./image-upload-submit').createEvent(options)
        ,'login-submit': require('./login-submit').createEvent(options)
        ,'campaign-show': require('./campaign-show').createEvent(options)
        ,'register-submit': require('./register-submit').createEvent(options)
        ,'annotator-submit-to-campaign': require('./annotator-submit-to-campaign').createEvent(options)
        ,'login-failure': require('./login-failure').createEvent(options)
        ,'register-failure': require('./register-failure').createEvent(options)
        ,'home': require('./home').createEvent(options)
    };
};

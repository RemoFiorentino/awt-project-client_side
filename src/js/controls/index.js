/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

exports.register = function () {
    require('./main-application').register();
    require('./c-account-edit-view').register();
    require('./c-create-campaign-view').register();
    require('./c-edit-campaign-view').register();
    require('./c-home-bar').register();
    require('./c-image-annotation').register();
    require('./c-image-selection').register();
    require('./c-image-upload-view').register();
    require('./c-logout-view').register();
    require('./c-manager-view').register();
    require('./c-show-campaign').register();
    require('./c-task-view').register();
    require('./c-worker-select-view').register();
    require('./c-account-edit-form').register();
    require('./c-create-campaign-form').register();
    require('./c-edit-campaign-form').register();
    require('./c-image-annotation-form').register();
    require('./c-image-selection-form').register();
    require('./c-image-upload-form').register();
    require('./c-login-form').register();
    require('./c-login-view').register();
    require('./c-list-campaign').register();
    require('./c-register-form').register();
    require('./c-register-view').register();
    require('./c-campaign-worker-list').register();
    require('./c-list-available-workers').register();
    require('./c-list-available-annotator').register();
    require('./c-selector-list').register();
    require('./c-annotator-list').register();
    require('./c-line-drawer').register();
};

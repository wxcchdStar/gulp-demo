/**
 * Created by zhaobao on 8/1/15.
 */

'use strict';
console.log("test");
requirejs.config({
    // By default load all module from js/module
    baseUrl: 'js/module',
    // except
    paths: {
        nls: '../nls',
        widget: '../widget',
        helper: '../helper',
        template: '../template',
        jquery: '../libs/jquery.min',
        mustache: '../libs/mustache.min',
        domReady: '../libs/domReady',
        text: '../libs/text',
        i18n: '../libs/i18n'
    },
    config: {
        version: '1.0.0'
    }
});

var VERSION = '1.0.0';
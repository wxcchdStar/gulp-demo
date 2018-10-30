/**
 * Created by zhaobao on 8/1/15.
 */

'use strict';
define(function(require) {
    var $ = require('jquery');
    var util = require('helper/util');
    var ready = require('domReady');
    var mustache = require('mustache');
    ready(function() {
        var template = require('text!template/test.mst');
        $('h1').on('click', function() {
            $(this).text(mustache.render(template, { name: util.getMonth() }));
        });
    });
});

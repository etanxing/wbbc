/*global define*/

define([
    'jquery',
    'backbone',
    'text!../templates/aside.html'
], function ($, Backbone, aside) {
    'use strict';

    var AsideView = Backbone.View.extend({
        el : 'aside',

        render: function() {
            $(this.el)
            .html(aside)
        }
    });

    return AsideView;
});
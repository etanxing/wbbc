/*global define*/

define([
    'jquery',
    'backbone',
    'text!../templates/header.html',
    '../common'
], function($, Backbone, header, Common) {
    'use strict';

    var HeaderView = Backbone.View.extend({
        el: 'header',

        events: {
            'click .nav-menu a': 'navigate'
        },

        render: function() {
            $(this.el)
                .html(_.template(header)({
                    settings: Common.settings
                }))
        },

        navigate: function(e) {
            Backbone.history.navigate(e.target.title, true);
            return false;
        }
    });

    return HeaderView;
});
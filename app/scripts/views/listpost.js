/*global define*/

define([
    'jquery',
    'backbone',
    'text!../templates/listpost.html'
], function ($, Backbone, listpost) {
    'use strict';

    var PostView = Backbone.View.extend({
        tagName : 'article',

        className : 'listpost',

        events: {
            'click .entry-title a'  : 'goentry'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);
        },

        render: function() {
            this.$el.html(_.template(listpost)({
                post  : this.model.toJSON()
            }))

            return this;
        },

        goentry : function(e){
            Backbone.history.navigate(e.target.title, true);
            return false;
        }
    });

    return PostView;
});
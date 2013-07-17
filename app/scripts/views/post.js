/*global define*/

define([
    'jquery',
    'backbone',
    'text!../templates/post.html',
    '../common',
    'prism',
    'moment'
], function ($, Backbone, post, Common, Prism, moment) {
    'use strict';

    var PostView = Backbone.View.extend({
        className: 'hidden',

        id : 'article',

        render: function() {
            var self = this;
            if (this.model.has('title')) {
                //Already loaded
                this.renderPost();
            } else {
                this.model.fetch({
                    success: function(model, resp, options){
                        self.renderPost();
                    },

                    error : function(model, resp, options){
                        // 404 page
                        console.log('failed to load model: %s', resp.responseText);
                    }
                })
            }
        },

        renderPost: function() {
            Common.status.set('processing', false);

            $(this.el).html(_.template(post)({
                post  : this.model.has('post')?this.model.get('post'):this.model.toJSON(),
                date  : moment(this.model.get('date'), 'YYYY-MM-DDTHH:mm:ss Z').format('DD/MM/YYYY')
            }))
            
            $('#primary').append(this.el);

            Prism.highlightAll();
            
            this.$el.fadeIn();
        },

        unrender: function (transition) {
            var self = this;
            this.$el.fadeOut(function () {
                self.remove();
                transition.resolve();
            })
        }
    });

    return PostView;
});
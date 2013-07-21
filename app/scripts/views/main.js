/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../views/listpost',
    '../views/navigation',
    '../common',    
    'prism'
], function ($, _, Backbone, ListPostView, NavigationView, Common, Prism) {
    'use strict';

    var MainView = Backbone.View.extend({        
        className: 'articles hidden',

        initialize: function() {
            _.bindAll(this, 'render', 'renderPost');
            this.listenTo(this.collection, 'add', this.renderPost);
            this.listenTo(this.collection, 'sync', this.render);
            this.navView = new NavigationView({collection : this.collection});
        },

        render : function(options) {
            $('.content').html(this.$el);            
            Common.status.set('processing', false);
            this.$el.fadeIn(function(){
                Prism.highlightAll();
            });

            options && options.renderPosts && this.collection.each(this.renderPost);
        },

        renderPost: function (post) {
            var view = new ListPostView({model:post});
            this.$el.append(view.render().el);
            this.$('.listpost').length === this.collection.length && this.renderNavigation();
        },

        renderNavigation : function () {
            this.$el.append(this.navView.render().el);
        },

        unrender : function (transition) {
            var self = this;
            this.navView.unrender();
            this.$el.fadeOut(function () {
                self.$el.detach();
                self.collection.remove(self.collection.models);
                transition.resolve();
            });
        }
    });

    return MainView;
});
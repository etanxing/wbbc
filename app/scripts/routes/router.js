/*global define*/

define([
    'jquery',
    'backbone',
    '../views/header',
    '../views/footer',
    '../views/aside',
    '../views/main',
    '../views/post',
    '../views/navigation',
    '../models/post',
    '../collections/posts',
    '../common'
], function ($, Backbone, HeaderView, FooterView, AsideView, MainView, PostView, NavigationView, Post, Posts, Common) {
    'use strict';

    var Router = Backbone.Router.extend({
    	initialize : function() {
    		this.posts = new Posts;

    		this.views = {
    			headerView : new HeaderView(),
    			footerView : new FooterView(),
    			asideView : new AsideView(),
                mainView : new MainView({collection : this.posts}),
                postView : new PostView()
    		}

        	this.views.headerView.render();
    		this.views.footerView.render();
    		this.views.asideView.render();

            this.on('route', this.hashlist);
    	},

        hashlist : function(router){
            Common.status.set('router', router);
        },

        // Hash maps for routes
        routes : {
            ''          : 'index',
            'p/:pageid' : 'pageing',
            '*path'     : 'post'
        },

        post : function(path){
            var self = this,
                transition = new $.Deferred(),
                post = this.posts.findWhere({ slug : path});
            
            Common.status.set('processing', true);    
            this.views.mainView.unrender(transition);
            this.views.postView = new PostView({model:post || new Post({slug : path})});
      
            transition.done(function () {
                self.views.postView.render();
            });
        },

        index: function(){
            this.pageing(1);
        },

        pageing: function (pageid) {
            var self = this,
                transition = new $.Deferred();

            Common.status.set('processing', true);

            if (Common.status.get('router') == 'post') {
                this.views.postView.unrender(transition)
            } else {
                this.views.mainView.unrender(transition);
            }

            transition.done(function () {
                self.posts.goTo(pageid, {silent:false});
            });
        }
    });

    return Router;
});
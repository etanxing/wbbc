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
            Common.init();

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
            this.view = this.views[(router === 'pageing'?'main':router) + 'View'];
            Common.status.set('router', router);
            Common.status.set('doctitle', Common.settings['site-title']);
        },

        // Hash maps for routes
        routes : {
            ''          : 'main',
            'p/:pageid' : 'pageing',
            '*path'     : 'post'
        },

        post : function(path){
            //Before switch page
            var self = this,
                post = this.posts.findWhere({ slug : path});

            this.views.postView = new PostView({model:post || new Post({slug : path})});

            //Switch page and what to do after switch
            this.switchView(function() {
                self.views.postView.render();
            });            
        },

        main: function(){
            this.pageing(1);
        },

        pageing: function (pageid) {
            var self = this;

            //Switch page and what to do after switch
            this.switchView(function() {
               self.posts.goTo(pageid, {silent:false});
            }); 
        },

        switchView : function(afterswitch) {
            var self = this,
                transition = new $.Deferred();

            Common.status.set('processing', true);    
            if (this.view) {
                this.view.unrender(transition);
            } else {
                transition.resolve();
            }

            transition.done(afterswitch);
        }
    });

    return Router;
});
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
], function($, Backbone, HeaderView, FooterView, AsideView, MainView, PostView, NavigationView, Post, Posts, Common) {
    'use strict';

    var Router = Backbone.Router.extend({
        initialize: function(options) {
            var data = options.data
            this.posts = new Posts;

            this.views = {
                headerView: new HeaderView(),
                footerView: new FooterView(),
                asideView: new AsideView()
            }

            this.views.headerView.render();
            this.views.footerView.render();
            this.views.asideView.render();

            this.views.postView = new PostView(data.post ? {
                model: new Post(data.post)
            } : {});

            this.views.mainView = new MainView({
                collection: this.posts.reset(data.posts)
            });

            if (data.post) {
                this.hashlist('post');
                this.views.postView.render();
            } else {
                this.hashlist('main');
                this.posts.setDefaults()
                this.posts.totalRecords = data.count;
                this.views.mainView.render({
                    renderPosts: true /* Render Posts manually*/
                });
            }

            //Hash maps for routes
            this.routes = {
                '': 'main',
                'p/:pageid': 'pageing',
                '*path': 'post'
            }

            this._bindRoutes();
            this.on('route', this.hashlist);
        },

        hashlist: function(router) {
            this.view = this.views[(router === 'pageing' ? 'main' : router) + 'View'];
            Common.status.set('router', router);
            Common.status.set('doctitle', Common.settings['site-title']);
        },

        post: function(path) {
            //Before switch page
            var self = this,
                post = this.posts.findWhere({
                    slug: path
                });

            this.views.postView = new PostView({
                model: post || new Post({
                    slug: path
                })
            });

            //Switch page and what to do after switch
            this.switchView(function() {
                self.views.postView.render();
            });
        },

        main: function() {
            this.pageing(1);
        },

        pageing: function(pageid) {
            var self = this;

            //Switch page and what to do after switch
            this.switchView(function() {
                self.posts.goTo(pageid, {
                    silent: false
                });
            });
        },

        switchView: function(afterswitch) {
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

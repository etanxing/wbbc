/*global define*/

define([
    'underscore',
    'backbone',
    'models/post',
    'paginator',
    '../common'
], function (_, Backbone, Post, Paginator, Common) {
    'use strict';

    // var Posts = Backbone.Collection.extend({
    //     model: Post,
    //     url : 'http://localhost:7777/api/items'
    // });

	var Posts = Paginator.requestPager.extend({
		model : Post,
		paginator_core: {
			type: 'GET',
			dataType: 'json',
			url: Common.server + 'api/items?'
		},

		paginator_ui: {
			firstPage: 1,
			currentPage: 1,
			perPage: 3,
			totalPages: 10
		},

		server_api: {
			'$perpage' : function() { return this.perPage; },
			'$page': function() { return this.currentPage; }                                  
		},

		parse: function (resp) {
			var items = resp.posts;
			this.totalRecords = resp.info.totalRecords;	
			return items;
		}
	});

    return Posts;
});
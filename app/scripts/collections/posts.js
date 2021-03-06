/*global define*/

define([
    'underscore',
    'backbone',
    'models/post',
    '../common',
    'paginator'
], function (_, Backbone, Post, Common) {
    'use strict';

	//"{"silent":true, "add":true,"merge":false,"remove":false,"collection":[], "previousModels":[]}"
	//"{"silent":false,"add":true,"merge":true, "remove":true, "parse":true,"data":"$perpage=3&$page=1"}

	var Posts = Backbone.Paginator.requestPager.extend({
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
			this.totalRecords = resp.count;	
			return items;
		}
	});

    return Posts;
});
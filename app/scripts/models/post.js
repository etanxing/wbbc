/*global define*/

define([
    'underscore',
    'backbone',
    '../common'
], function (_, Backbone, Common) {
    'use strict';

    var Post = Backbone.Model.extend({
        defaults: {
        	'slug' : ''
        },
        idAttribute: "_id",
        url : function() {
        	return Common.server + 'api/item/slug/' + this.get('slug')
        }
    });

    return Post;
});
/*global define*/

define([
    'jquery',
    'backbone',
    'text!../templates/listpost.html',
    'moment'
], function ($, Backbone, listpost, moment) {
    'use strict';

    var PostView = Backbone.View.extend({
        tagName : 'article',

        className : 'listpost',

        events: {
            'click a.internal-link'  : 'goentry'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);
        },

        render: function() {
            this.$el.html(_.template(listpost)(this.processModel()));
            return this;
        },

        processModel : function() {
            var post = this.model.toJSON(),
                moreindex = post.content.indexOf('<!--more-->');

            if (moreindex >= 0) post.content = post.content.slice(0, moreindex);
            post.date = moment(post.date, 'YYYY-MM-DDTHH:mm:ss Z').format('DD/MM/YYYY');

            return {
                post  : post,
                more  : moreindex >= 0
            }
        },

        goentry : function(e){
            Backbone.history.navigate(e.target.title, true);
            return false;
        }
    });

    return PostView;
});
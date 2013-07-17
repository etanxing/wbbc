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
            this.$el.html(_.template(listpost)({
                post  : this.model.toJSON(),
                date  : moment(this.model.get('date'), 'YYYY-MM-DDTHH:mm:ss Z').format('DD/MM/YYYY')
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
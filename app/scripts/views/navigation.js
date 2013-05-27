/*global define*/

define([
    'jquery',
    'backbone',
    'text!../templates/navigation.html'
], function ($, Backbone, navigation) {
    'use strict';

    var NavigationView = Backbone.View.extend({
        tagName : 'nav',

        className : 'navigation',
        
        events: {
            'click a.nav-next'    : 'nextResultPage',
            'click a.nav-previous': 'previousResultPage'
        },

        render : function(){
            this.$el.html(_.template(navigation)({
                info  : this.collection.info()
            }))

            return this;
        },

        unrender : function(){
            this.$el.detach();
        },

        nextResultPage: function (e) {
            e.preventDefault();
            Backbone.history.navigate('p/' + (this.collection.currentPage + 1), true);            
        },

        previousResultPage: function (e) {
            e.preventDefault();
            Backbone.history.navigate('p/' + (this.collection.currentPage - 1), true);
        }
    });

    return NavigationView;
});
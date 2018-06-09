/**
 * @fileOverview App module definition
 */

define(function(require) {
    'use strict';

    // List all scripts that need to be loaded before everything else. Suitable for browser polyfills, etc.
    var NavigationView = require('app/views/NavigationView');
    var CopyrightView = require('app/views/CopyrightView');
    var AddressView = require('app/views/AddressView');

    // Third-Party
    var Handlebars = require('handlebars');

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @name App
     * @class App Initial application setup. Runs once upon every page load.
     * @constructor
     */
    var App = function() {
        this.init();
    };

    /**
     * Initializes the application and kicks off loading of prerequisites
     */
    App.prototype.init = function() {
        // Custom Handlebars function
        Handlebars.getTemplate = function(name) {
            if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
                var templateUrl = 'assets/scripts/src/app/templates/' + name + '.handlebars?v=' + SETTINGS.APP_VERSION + (SETTINGS.CACHE_BUSTER != '' ? '&bust=' + SETTINGS.CACHE_BUSTER : '');
                $.ajax({
                    url : templateUrl,
                    success : function(data) {
                        if (Handlebars.templates === undefined) {
                            Handlebars.templates = {};
                        }
                        Handlebars.templates[name] = Handlebars.compile(data);
                    },
                    async : false
                });
            }
            return Handlebars.templates[name];
        };

        Handlebars.registerHelper('everyNth', function(context, every, options) {
            var fn = options.fn, inverse = options.inverse;
            var ret = "";
            if(context && context.length > 0) {
                for(var i=0, j=context.length; i<j; i++) {
                    var modZero = i % every === 0;
                    context[i].isModZero = modZero;
                    context[i].isModZeroNotFirst = modZero && i > 0;
                    context[i].isLast = i === context.length - 1;
                    ret = ret + fn(context[i]);
                }
            } else {
                ret = inverse(this);
            }
            return ret;
        });

        // App JS
        new NavigationView($('.js-navigation'));
        new CopyrightView($('.js-copyright'));
        new AddressView($('.js-address'));
    };

    return App;
});

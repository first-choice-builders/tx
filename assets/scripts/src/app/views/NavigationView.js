/**
 * @fileOverview NavigationView View Module File
 *
 * @author Mike Eastes
 */
define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var Handlebars = require('handlebars');

    // Consts
    var NAVIGATION = {
        navItems: [{
            page: 'index',
            name: 'Home'
        },{
            page: 'havestormdamage',
            name: 'Have Storm Damage?'
        },{
            page: 'gallerycommercial',
            name: 'Photo Gallery'
        }]
    };

    /**
     * Navigation view
     *
     * @class NavigationView
     * @constructor
     */
    var NavigationView = function($element, initialVotes) {
        if ($element === null) {
            throw new TypeError('Unable to instantiate NavigationView, expected $element');
        }

        this.init($element, initialVotes);
    };

    /**
     * Initializes the UI Component View
     * Runs a single setupHandlers call, followed by createChildren and layout
     *
     * @method init
     * @param {Object} $element jQuery wrapped element
     * @param {Number} initialVotes Initial number of votes to show
     * @chainable
     */
    NavigationView.prototype.init = function($element, initialVotes) {
        /**
         * Flag to indicate whether the module has been enabled
         *
         * @property isEnabled
         * @type {Boolean}
         * @default false
         */
        this.isEnabled = false;

        /**
         * View's element
         *
         * @property $element
         * @type {jQuery}
         */
        this.$element = $element;

        this.createChildren()
            .layout()
            .enable();


        return this;
    };

    /**
     * Create any child objects or references to DOM elements
     * Should only be run on initialization of the view
     *
     * @method createChildren
     * @chainable
     */
    NavigationView.prototype.createChildren = function() {
        this.template = Handlebars.getTemplate('navigation');

        return this;
    };

    /**
     * Performs measurements and applys any positiong style logic
     * Should be run anytime the parent layout changes
     *
     * @method layout
     * @chainable
     */
    NavigationView.prototype.layout = function() {
        this.$element.html(this.template(NAVIGATION));

        return this;
    };

    /**
     * Enables the view
     * Performs any event binding to handlers
     * Exits early if it is already enabled
     *
     * @method enable
     * @chainable
     */
    NavigationView.prototype.enable = function() {
        if (this.isEnabled) {
            return this;
        }

        this.isEnabled = true;

        // Setup any event handlers

        return this;
    };

    /**
     * Disables the view
     * Tears down any event binding to handlers
     * Exits early if it is already disabled
     *
     * @method disable
     * @chainable
     */
    NavigationView.prototype.disable = function() {
        if (!this.isEnabled) {
            return this;
        }

        this.isEnabled = false;

        // Tear down any event handlers

        return this;
    };

    /**
     * Destroys the view
     * Tears down any events, handlers, elements
     * Should be called when the object should be left unused
     *
     * @method destroy
     * @chainable
     */
    NavigationView.prototype.destroy = function() {
        this.disable();

        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                this[key] = null;
            }
        }

        this.$element.empty();

        return this;
    };

    return NavigationView;
});

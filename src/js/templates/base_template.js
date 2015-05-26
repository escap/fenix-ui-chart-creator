/*global define,console*/
define([
        'jquery',
        'text!fx-c-c/html/templates/base_template.html'
    ],
    function ($, template) {

        'use strict';

        var defaultOptions = {};

        function Base_template(config) {
            $.extend(true, this, defaultOptions, config);
            return this;
        }

        Base_template.prototype.render = function (config) {

            $.extend(true, this, config);

            if (this._validateInput() === true) {
                this._initVariable();
                this._injectTemplate();
            } else {
                console.error(this.errors);
                throw new Error("FENIX Chart creator has not a valid configuration");
            }

            return this;
        };

        Base_template.prototype._injectTemplate = function () {
            this.$container.html(template);
        };

        Base_template.prototype._initVariable = function () {
            this.$container = $(this.container);
        };

        Base_template.prototype._validateInput = function () {

            this.errors = {};

            if (!this.hasOwnProperty("container")) {
                this.errors.container = "'container' attribute not present";
            }

            return (Object.keys(this.errors).length === 0);
        };

        Base_template.prototype.destroy = function () {

        };

        return Base_template;
    });
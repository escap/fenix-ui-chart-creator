/*global define, amplify*/
define([
    'jquery',
    'require',
    'underscore',
    'loglevel',
    'fx-chart/config/errors',
    'fx-chart/config/events',
    'fx-chart/config/config',
    'fx-chart/config/config-default',
    'fx-common/pivotator/start',
    'fx-chart/config/renderers/highcharts',
    'fx-chart/config/renderers/highcharts_shared',
    'highcharts',
    'amplify'
], function ($, require, _, log, ERR, EVT, C, CD, Pivotator, templates, templateStyle) {

    'use strict';

    function Highcharts(o) {
        log.info("FENIX Highcharts");
        log.info(o);

        $.extend(true, this, CD, C, o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            this._bindEventListeners();

            this._renderHighcharts(this.pivotatorConfig);

            return this;

        } else {
            log.error("Impossible to create Highcharts");
            log.error(valid)
        }
    }

    // API

    /**
     * pub/sub
     * @return {Object} Highcharts instance
     */
    Highcharts.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

    Highcharts.prototype.update = function (config) {

        //TODO add validation

        this.type = config.type ? config.type : this.type;

        this._renderHighcharts(config);

    };

    Highcharts.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    // end API

    Highcharts.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        return errors.length > 0 ? errors : valid;

    };

    Highcharts.prototype._initVariables = function () {

        //pub/sub
        this.channels = {};

        this.pivotator = new Pivotator();

    };

    Highcharts.prototype._bindEventListeners = function () {

        //amplify.subscribe(this._getEventName(EVT.SELECTOR_READY), this, this._onSelectorReady);

    };

    Highcharts.prototype._renderHighcharts = function (config) {

        var configFin = $.extend({}, config, {formatter: "value", values: ["value"]});

        var model = this.pivotator.pivot(this.model, configFin);

        var chartConfig = templates[this.type];

        if (!config) {
            alert("Impossible to find chart configuration: " + this.type);
        }

        var defaultRenderOptions = $.extend(true, {}, templateStyle, chartConfig);

        this._populateData(this.type, model, defaultRenderOptions);

        this.chart = this.el.highcharts(defaultRenderOptions);

        this._trigger("ready");

    };

    Highcharts.prototype._populateData = function (type, model, config) {

        switch (type.toLowerCase()) {
            //add type process
            default:
                for (var ii in model.columns) {
                    if (model.cols.hasOwnProperty(ii)) {
                        i = model.cols[ii];
                        config.xAxis.categories.push(i.title[this.lang]);
                    }
                }

                for (var i in model.rows) {
                    if (i > 20) {
                        break;
                    }
                    config.series.push({
                        name: model.rows[i].join(" "),
                        data: model.data[i]
                    });
                }
                ;
        }

        return config;
    };

    Highcharts.prototype._getEventName = function (evt) {

        return this.id.concat(evt);

    };

    //disposition
    Highcharts.prototype._unbindEventListeners = function () {

        //amplify.unsubscribe(this._getEventName(EVT.SELECTOR_READY), this._onSelectorReady);

    };

    Highcharts.prototype.dispose = function () {

        //this.chart.dispose(); change in highchart destroy

        //unbind event listeners
        this._unbindEventListeners();

    };

    // utils

    return Highcharts;
});
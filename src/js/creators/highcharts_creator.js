/*global define, amplify, console*/
define([
        'jquery',
        'fx-c-c/config/creators/highcharts_template',
        'underscore',
        'highcharts',
        'amplify'
    ],
    function ($, baseConfig, _, Highcharts) {

        'use strict';

        var defaultOptions = {

                lang: 'EN',

                s: {
                    CONTENT: '[data-role="content"]'
                },

                type: 'timeseries' //[custom, scatter, pie]

            },
            e = {
                DESTROY: 'fx.component.chart.destroy',
                READY: 'fx.component.chart.ready'
            };

        function HightchartCreator(o) {

            $.extend(true, this, o, defaultOptions);
            this.hightchart_template =baseConfig;

            return this;
        }

        HightchartCreator.prototype._validateInput = function (config) {

            this.errors = {};

            //Container
            if (!config.hasOwnProperty("container")) {
                this.errors.container = "'container' attribute not present.";
            }

            if ($(config.container).find(this.s.CONTENT) === 0) {
                this.errors.container = "'container' is not a valid HTML element.";
            }

            return (Object.keys(this.errors).length === 0);
        };

        HightchartCreator.prototype.render = function (config) {

            if (this._validateInput(config) === true) {
                this._createChart(config);

            } else {
                console.error(this.errors);
                throw new Error("FENIX hightchart_creator has not a valid configuration");
            }
        };


        HightchartCreator.prototype._createChart = function (config) {

            var series = [],
                conf = this.hightchart_template;

            for (var i = 0 ; i < config.chart_series.length; i++ ) {
                var s = {
                    data : config.chart_series[i],
                    name: "test",
                    type : config.series[i].type
                };

                series.push(s);
            }

            conf.series = series;

            $(config.container).find(this.s.CONTENT).highcharts(conf) ;

        };


        HightchartCreator.prototype._onValidateDataSuccess = function () {
            this.$chartRendered = true;
            this._createConfiguration();
            this._renderChart();
        };

        HightchartCreator.prototype._showConfigurationForm = function () {
            window.alert("FORM");
        };

        HightchartCreator.prototype._onValidateDataError = function () {
            this._showConfigurationForm();
        };

        HightchartCreator.prototype._createConfiguration = function () {
            this.config = $.extend(true, this.options, this.data, baseConfig);

            this.config.chart.events.load = function () {
                amplify.publish(e.READY, this);
            };
        };

        HightchartCreator.prototype._renderChart = function () {

            this.$container.highcharts(this.config);
        };


        HightchartCreator.prototype.reflow = function () {

            if (typeof this.$container !== 'undefined' && this.$chartRendered) {
                this.$container.highcharts().reflow();
                return true;
            }
        };

        HightchartCreator.prototype.destroy = function () {
            //TODO destroy highchart
            console.warn("destory HightchartCreator to be implemented")
        };

        return HightchartCreator;
    });
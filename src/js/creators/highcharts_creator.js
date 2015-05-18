/*global define, amplify, console*/
define([
        'jquery',
        'fx-c-c/config/creators/highcharts_template',
        'amplify'
    ],
    function ($, baseConfig) {

        'use strict';

        var defaultOptions = {

                lang: 'EN',

                s: {
                    CONTENT: '[data-role="content"]'
                }

            },
            e = {
                DESTROY: 'fx.component.chart.destroy',
                READY: 'fx.component.chart.ready'
            };

        function HightchartCreator(o) {

            $.extend(true, this, o, defaultOptions);
            this.hightchart_template = baseConfig;

            return this;
        }

        HightchartCreator.prototype._validateInput = function () {

            this.errors = {};

            //Container
            if (!this.hasOwnProperty("container")) {
                this.errors.container = "'container' attribute not present.";
            }

            if ($(this.container).find(this.s.CONTENT) === 0) {
                this.errors.container = "'container' is not a valid HTML element.";
            }

            return (Object.keys(this.errors).length === 0);
        };

        HightchartCreator.prototype.render = function (config) {

            $.extend(true, this, config);

            if (this._validateInput() === true) {

                //Init chart container
                this.$container = $(this.container).find(this.s.CONTENT);

                this._createChart();

            } else {
                console.error(this.errors);
                throw new Error("FENIX hightchart_creator has not a valid configuration");
            }
        };


        HightchartCreator.prototype._createChart = function () {

            var series = [],
                conf = this.hightchart_template;

            for (var i = 0; i < this.chart_series.length; i++) {

                var s = $.extend(true, {
                    data: this.chart_series[i],
                    type: this.series[i].type
                }, this.chart_series[i]);

                series.push(s);
            }

            conf.series = series;
            conf.xAxis.categories = this.chart_categories;

            this.$container.highcharts(conf);

        };

        HightchartCreator.prototype._onValidateDataSuccess = function () {
            this.$chartRendered = true;
            this._createConfiguration();
            this._renderChart();
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

        HightchartCreator.prototype.reflow = function () {

            if (typeof this.$container !== 'undefined' && this.$chartRendered) {
                this.$container.highcharts().reflow();
                return true;
            }
        };

        HightchartCreator.prototype.destroy = function () {
            this.$container.highcharts().destroy();
        };

        return HightchartCreator;
    });
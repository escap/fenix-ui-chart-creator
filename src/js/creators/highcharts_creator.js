/*global define, amplify, console*/
define([
        'jquery',
        'underscore',
        'fx-c-c/config/creators/highcharts_template',
        //'highcharts-export',
        //'highcharts-export-csv',
        'amplify'
    ],
    function ($, _, baseConfig) {

        'use strict';

        var defaultOptions = {

                s: {
                    CONTENT: '[data-role="content"]'
                },

                // TODO: handle multilanguage?
                noData: "<div>No Data Available</div>"

            },
            e = {
                DESTROY: 'fx.component.chart.destroy',
                READY: 'fx.component.chart.ready'
            };

        function HightchartCreator(config) {

            $.extend(true, this, defaultOptions, config);
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

                if (this._validateSeries() === true) {

                    // create chart
                    this._createChart();

                }else {
                    this.noDataAvailable();
                }
            } else {
                console.error(this.errors);
                throw new Error("FENIX hightchart_creator has not a valid configuration");
            }
        };

        HightchartCreator.prototype._createChart = function () {
            this.config = $.extend(true, {}, baseConfig, this.chartObj);
            this.$container.highcharts(this.config);
        };

        HightchartCreator.prototype._onValidateDataError = function () {
            this._showConfigurationForm();
        };

        HightchartCreator.prototype._createConfiguration = function () {
            this.config = $.extend(true, baseConfig, this.chartObj);
        };

        HightchartCreator.prototype._validateSeries = function() {

            for(var i=0; i < this.chartObj.series.length; i++) {
                for(var j=0; j < this.chartObj.series[i].data.length; j++) {
                    if (this.chartObj.series[i].data[j] !== null) {
                        return true;
                    }
                }
            }

            return false;
        };

        HightchartCreator.prototype.reflow = function () {

            if (typeof this.$container !== 'undefined' && this.$chartRendered) {
                this.$container.highcharts().reflow();
                return true;
            }
        };

        HightchartCreator.prototype.noDataAvailable = function () {
            console.log();
            this.$container.append(this.noData)
        };

        HightchartCreator.prototype.destroy = function () {
            this.$container.highcharts().destroy();
        };

        return HightchartCreator;
    });
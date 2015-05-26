/*global define, amplify, console*/
define([
        'jquery',
        'underscore',
        'amplify'
    ],
    function ($, _) {

        'use strict';

        var defaultOptions = {

                // Chart (Highchart Definition)
                chartObj: {
                    chart: {},
                    xAxis: {},
                    series: []
                },

                filters: {
                    xAxis: 0,
                    yAxis: 3,
                    value: 2,
                    series: [1]
                },
            },

            e = {
                DESTROY: 'fx.component.chart.destroy',
                READY: 'fx.component.chart.ready'
            };

        function Matrix_Schema_Adapter() {
            $.extend(true, this, defaultOptions);
            return this;
        }

        Matrix_Schema_Adapter.prototype.prepareData = function (config) {

            $.extend(true, this, config);

            if (this._validateInput() === true) {
                if (this._validateData() === true) {
                    this._onValidateDataSuccess();
                } else {
                    this._onValidateDataError();
                }
            } else {
                console.error(this.errors);
                throw new Error("Star schema adapter has not a valid configuration");
            }
        };

        Matrix_Schema_Adapter.prototype._validateInput = function () {

            this.errors = {};

            return (Object.keys(this.errors).length === 0);
        };

        Matrix_Schema_Adapter.prototype._validateData = function () {

            this.errors = {};

            return (Object.keys(this.errors).length === 0);
        };

        Matrix_Schema_Adapter.prototype._onValidateDataSuccess = function () {

        };

        Matrix_Schema_Adapter.prototype._onValidateDataError = function () {

        };

        Matrix_Schema_Adapter.prototype.prepareChart = function(seriesConfig) {
            var chartObj;

            switch (this.type) {
                case 'pie':
                    break;
                case 'scatter':
                    break;
                case 'timeserie':
                    break;
                default :
                    chartObj = this._processStandardChart();
                    break;
            }
            console.log(chartObj);
            return chartObj;
        };

        Matrix_Schema_Adapter.prototype._processStandardChart = function(seriesConfig) {
            var chartObj  = $.extend(true, {}, this.chartObj),
                data = this.model,
                xAxisIndex = this.filters.xAxis,
                seriesIndexes = this.filters.series,
                valueIndex = this.filters.value,
                yAxisIndex = this.filters.yAxis;

            console.log(this);

            // get categories
            chartObj.xAxis.categories = this._createXAxisCategories(data, xAxisIndex);

            // create yAxis
            if (yAxisIndex) {
                chartObj.yAxis = this._createYAxis(data, yAxisIndex);
            }

            // create series
            chartObj.series = this._createSeriesStandard(data, xAxisIndex, yAxisIndex, valueIndex, seriesIndexes, chartObj.xAxis.categories, chartObj.yAxis);

            return chartObj;
        };

        Matrix_Schema_Adapter.prototype._createXAxisCategories = function(data, xIndex) {

            var xCategories = [];
            data.forEach(function(row) {
                if (row[xIndex] === null) {
                    console.warn("Error on the xAxis data (is null)", row[xIndex], row);
                }
                else {
                    xCategories.push(row[xIndex]);
                }
            });

            return _.uniq(xCategories);
        };

        Matrix_Schema_Adapter.prototype._createYAxis = function (data, index) {
            var yAxisNames = [],
                yAxis = [];

            if (index) {
                data.forEach(function (row) {
                    if (row[index] === null) {
                        console.warn("Error on the xAxis data (is null)", row[index], row);
                    }
                    else {
                        yAxisNames.push(row[index]);
                    }
                });

                yAxisNames = _.uniq(yAxisNames);

                // creating yAxis objects
                // TODO; probably it should merge the yAxis template somehow. PROBLEM: how to merge multiple axes properties from the baseConfig?
                yAxisNames.forEach(_.bind(function (v) {
                    yAxis.push({title: {text: v}});
                }, this));
            }

            return yAxis;
        };

        Matrix_Schema_Adapter.prototype._createSeriesStandard = function (data, xIndex, yIndex, valueIndex, seriesIndexes, xCategories, yAxis) {
            var series = [];

            // Create the series
            data.forEach(_.bind(function (row) {

                // unique key for series
                var name = this._createSeriesName(row, seriesIndexes);

                // get serie
                var serie = _.findWhere(data.series, {name: name}) || {name: name},
                    yLabel;

                // data of the serie
                serie.data = [];
                // initialize serie with null values. this fixed missing values from categories
                _.each(xCategories, function() {
                    serie.data.push(null);
                });

                // Create yAxis if exists
                if (yIndex) {
                    // TODO
                    yLabel = row[yIndex];
                    serie.yAxis = this._getYAxisIndex(yAxis, yLabel);
                }

                var index = _.indexOf(xCategories, row[xIndex]);
                if (index) {

                    serie.data[index] = isNaN(row[valueIndex])? row[valueIndex]: parseFloat(row[valueIndex]);

                    // Add serie to series
                    series = this._addSerie(series, serie, index)
                }

            }, this));

            return series;
        };

        Matrix_Schema_Adapter.prototype._createSeriesName = function (row, indexes) {

            var name = '';

            _.each(indexes, function (index) {
                if (row[index] !== undefined && row[index] !== null) {
                    name = name.concat(row[index] + ' ');
                }
            }, this);

            return name;
        };

        Matrix_Schema_Adapter.prototype._getYAxisIndex = function (yAxis, label) {
            var index = 0;

            _.each(yAxis, function (y, i) {
                if (y.title.text === label) {
                    index = i;
                }
            }, this);

            if (index < 0) {
                console.error("Data contains an unknown yAxis value: " + label);
            }

            return index;
        };

        Matrix_Schema_Adapter.prototype._addSerie = function(series, serie, valueIndex) {
            var seriesAlreadyAdded = false;
            for (var i = 0; i < series.length; i++) {
                if (serie.name === series[i].name) {
                    // this a "switch" between the timeserie and a standard chart
                    // TODO: make it nicer, or separate the two _addSerie function
                    // TODO: between _addSerie and _addSerieTimeseries
                    if (valueIndex) {
                        series[i].data[valueIndex] = serie.data[valueIndex];
                    }
                    else {
                        series[i].data.push(serie.data[0]);
                    }
                    seriesAlreadyAdded = true;
                    break;
                }
            }
            if (!seriesAlreadyAdded) {
                series.push(serie);
            }
            return series;
        };

        return Matrix_Schema_Adapter;
    });
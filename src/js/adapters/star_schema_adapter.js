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
                }
            },

            e = {
                DESTROY: 'fx.component.chart.destroy',
                READY: 'fx.component.chart.ready'
            };

        function Star_Schema_Adapter() {
            $.extend(true, this, defaultOptions);

            this.CONFIG = {
                charts_data: {}
            };

            return this;
        }

        Star_Schema_Adapter.prototype.prepareData = function (config) {

            $.extend(true, this.CONFIG, config);

            console.log(this.CONFIG);

            if (this._validateInput() === true) {
                this._prepareData();
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

        Star_Schema_Adapter.prototype._validateInput = function () {

            this.errors = {};

            return (Object.keys(this.errors).length === 0);
        };

        Star_Schema_Adapter.prototype.create_tree_item = function (father, filters, row) {

            if (filters.length > 1) {


                if (father[row[filters[0]]] === null || father[row[filters[0]]] === undefined) {

                    father[row[filters[0]]] = {};
                }

                var tmp = father[row[filters[0]]];

                filters.splice(0, 1);

                this.create_tree_item(tmp, filters, row);
            } else {

                if (!Array.isArray(father[row[filters[0]]])) {
                    father[row[filters[0]]] = [];
                }

                father[row[filters[0]]].push(row);
            }
        };

        Star_Schema_Adapter.prototype._prepareData = function () {

            for (var i = 0; i < this.CONFIG.model.length; i++) {
                var row = this.CONFIG.model[i];
                var f = this.CONFIG.filters.slice();

                this.create_tree_item(this.CONFIG.charts_data, f, row);
            }

        };

        Star_Schema_Adapter.prototype._validateData = function () {

            this.errors = {};

            return (Object.keys(this.errors).length === 0);
        };

        Star_Schema_Adapter.prototype._onValidateDataSuccess = function () {

        };

        Star_Schema_Adapter.prototype._onValidateDataError = function () {

        };

        Star_Schema_Adapter.prototype.prepareChart = function(seriesConfig) {
            var chartObj = $.extend({}, this.chartObj),
                x_dimension = this.CONFIG.x_dimension,
                y_dimension = this.CONFIG.y_dimension,
                value = this.CONFIG.value;

            // get all data of the series
            var data = [];
            seriesConfig.forEach(_.bind(function(serie) {
                console.log(serie);
                data.push(this.filterSerie(serie));
            }, this));

            // get categories
            chartObj.xAxis.categories = this._createXAxisCategories(data, x_dimension);

            // create yAxis
            if (y_dimension)
                chartObj.yAxis = this._createYAxis(data, y_dimension);

            // create series with merging of serie configuration
            seriesConfig.forEach(_.bind(function(serie, index) {
                var valueDimension = serie.value || value || null;
                if (valueDimension == null) {
                    console.error("value (dimension) is null");
                }

                var s = this._createSerie(data[index], serie, x_dimension, y_dimension, valueDimension, chartObj.xAxis.categories, chartObj.yAxis);
                chartObj.series.push($.extend(true, s, serie))
            }, this));

            console.log(chartObj);

            return chartObj;
        };

        Star_Schema_Adapter.prototype._createSerie = function (dataSerie, serie, xDimension, yDimension, valueDimension, xCategories, yAxis) {
            var serie = {},
                yLabel;

            serie.data = [];

            _.each(xCategories, function() {
                serie.data.push(null);
            });

            // Create the series
            dataSerie.forEach(_.bind(function (row) {

                // Create yAxis if exists
                if (yDimension) {
                    // TODO
                    yLabel = row[yDimension];
                    //yLabel = this.aux.code2label[this._getColumnBySubject(this.yAxisSubject).id][yValue];
                    serie.yAxis = this._getYAxisIndex(yAxis, yLabel);
                }

                // push the value of the serie
                if (row[xDimension] !== null && row[xDimension] !== undefined && row[valueDimension] !== undefined && row[valueDimension] !== null) {

                    var index = _.indexOf(xCategories, row[xDimension]),
                        value = isNaN(row[valueDimension])? row[valueDimension]: parseFloat(row[valueDimension]);
                    serie.data[index] = value;

                }

            }, this));

            console.log(serie);

            return serie;
        };

        /**
         * Create unique xAxis categories
         * @param data
         * @private
         */
        Star_Schema_Adapter.prototype._createXAxisCategories = function(data, xIndex) {

            var xCategories = [];
            data.forEach(function(serie) {
                serie.forEach(function(row) {
                    if (row[xIndex] === null) {
                        console.warn("Error on the xAxis data (is null)", row[xIndex], row);
                    }
                    else {
                        xCategories.push(row[xIndex]);
                    }
                });
            });
            // TODO: check if sort it
            console.warn('The categories are automatically sorted');
            return _.uniq(xCategories).sort();
        };


        Star_Schema_Adapter.prototype._createYAxis = function (data, index) {;
            var yAxisNames = [],
                yAxis = []

            if (index) {
                data.forEach(function (serie) {
                    serie.forEach(function (row) {
                        if (row[index] === null) {
                            console.warn("Error on the xAxis data (is null)", row[index], row);
                        }
                        else {
                            yAxisNames.push(row[index]);
                        }
                    });
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

        Star_Schema_Adapter.prototype._getYAxisIndex = function (yAxis, label) {
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

        Star_Schema_Adapter.prototype.filterSerie = function (config) {

            var series = this.CONFIG.charts_data;

            _.each(this.CONFIG.filters, _.bind(function (f) {
                //Controlla che esiste
                series = series[config.filters[f]];

            }, this));

            return series;
        };

        return Star_Schema_Adapter;
    });
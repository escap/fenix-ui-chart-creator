/*global define, amplify, console*/
define([
        'jquery',
        'underscore',
        'highcharts',
        'amplify'
    ],
    function ($, _) {

        'use strict';

        var defaultOptions = {

                lang: 'EN',

                format: 'standard',  //[custom, scatter, pie] TODO: probably not needed and not used yet

                // Chart (Highchart Definition)
                chartObj: {
                    chart: {
                        //type: 'spline'
                    },
                    xAxis: {

                    },
                    //yAxis: [],
                    series: []
                },


                // filter to create the series
                // this could be either subject or id
                filters: {
                    xAxis: 'time',
                    yAxis: 'mu',
                    value: 'value',
                    series: [],
                    addYAxisToSerieName: true //TODO
                    // N.B. for now the yAxis is added to the serie name to avoid conflicts
                },

                aux: {
                    // variables used to process the model
                    x:{},
                    y: {},
                    value: {},
                    series: []
                },

                debugging: false
            },
            e = {
                DESTROY: 'fx.component.chart.destroy',
                READY: 'fx.component.chart.ready'
            };

        function FENIX_Highchart_Adapter() {
            $.extend(true, this, defaultOptions);
        }

        FENIX_Highchart_Adapter.prototype.prepareData = function (config) {
            $.extend(true, this, config);

            if (this._validateInput() === true) {
                this._initVariable();
                this._prepareData();
                if (this._validateData() === true) {
                    this._onValidateDataSuccess();
                } else {
                    this._onValidateDataError();
                }
            } else {
                console.error(this.errors);
                throw new Error("FENIX Chart creator has not a valid configuration");
            }
        };

        FENIX_Highchart_Adapter.prototype._prepareData = function () {

            var xAxis = this.filters.xAxis,
                yAxis = this.filters.yAxis,
                value = this.filters.value,
                series = this.filters.series,
                columns = this.$columns,
                addYAxisToSerieName = this.filters.addYAxisToSerieName;

            // parsing columns to get
            columns.forEach(_.bind(function (column, index) {

                // TODO: this should be already checked and validated
                if (column.hasOwnProperty('id')) {
                    //if (column.hasOwnProperty('subject')) {

                    if (column.subject === xAxis || column.id === xAxis) {
                        this.aux.x = this._getColumnStructure(columns, column, index);
                    }

                    else if (column.subject === yAxis || column.id === yAxis) {
                        this.aux.y = this._getColumnStructure(columns, column, index);
                    }

                    else if (column.subject === value || column.id === value) {
                        this.aux.value = this._getColumnStructure(columns, column, index);
                    }

                    if (series.length > 0){
                        series.forEach(_.bind(function (serie) {
                            if (column.subject === serie || column.id === serie) {
                                this.aux.series.push(this._getColumnStructure(columns, column, index));
                            }
                        }, this));

                        // TODO: check the series index to map dinamically
                    }
                }

            }, this));

            // get series columns
            if (this.aux.series.length <= 0) {
                columns.forEach(_.bind(function (column, index) {

                    if (column.hasOwnProperty('id')) {
                        // TODO: issue with the y axis and inconsistent series
                        // TODO i.e. series with the same name but with different yAxis
                        // if (index != this.aux.x.index && index != this.aux.y.index && index != this.aux.value.index) {
                        if (index != this.aux.x.index && index != this.aux.value.index) {
                            if (column.dataType != 'code') {
                                // check if serie already in series (skip coded columns!)
                                this.aux.series.push(this._getColumnStructure(this.$columns, column, index));
                            }
                        }
                    }


                }, this));
            }

            this._printAuxColumns();
        };

        /**
         * Get column structure
         * @param columns
         * @param column
         * @param index
         * @returns {*}
         * @private
         */
        FENIX_Highchart_Adapter.prototype._getColumnStructure = function (columns, column, index) {
            if (column.hasOwnProperty('dataType')) {
                switch (column.dataType) {
                    case 'code':
                        return this._getColumnLabel(columns, column, index);
                        break;
                    // TODO: add checks for particular cases if needed
                    default :
                        return {
                            column: column,
                            index: index,
                            id: column.id
                        }
                }
            }
        };

        /**
         * Get all columns and the coded column with its index
         * @param columns
         * @param column
         * @param index
         * @return the column containing the labels and its index
         */
        FENIX_Highchart_Adapter.prototype._getColumnLabel = function (columns, column, columnCodeIndex) {

            var columnCode = columns[columnCodeIndex],
                columnLabelID = columnCode.id + "_" + this.lang;

            for (var index in columns) {
                if (columns[index].hasOwnProperty('id')) {
                    if (columnLabelID == columns[index].id) {
                        return {
                            column: column,
                            index: index,
                            columnCode: columnCode,
                            columnCodeIndex: columnCodeIndex,
                            id: column.id
                        }
                    }
                }
            }
        };

        FENIX_Highchart_Adapter.prototype.prepareChart = function () {
            var xSubject = this.aux.x.column.subject,
                chartObj;

            switch (this.type) {
                case 'pie':
                    break;
                case 'scatter':
                    break;
                default :
                    chartObj = this._processStandardChart(xSubject === 'time');
                    break;
            }
            return chartObj;
        };


        /**
         * This is used for standard chart and timeseries
         * @param isTimeserie
         * @private
         */
        FENIX_Highchart_Adapter.prototype._processStandardChart = function (isTimeserie) {
            var chartObj = $.extend(true, {}, this.chartObj),
                x = this.aux.x,
                y = this.aux.y,
                value = this.aux.value,
                data = this.$data;

            // Sort Data TODO: check if the sort is alway applicable
            this._sortData(data, x.index);

            // Process yAxis
            if (y.index) {
                chartObj.yAxis = this._createYAxis(data, y.index);
            }

            console.log(chartObj);

            // create Series
            if (isTimeserie) {
                // TODO: move it to the template!!
                console.warn('TODO: xAxis Categories: for timeserie directly datatime??');
                chartObj.xAxis.type = 'datetime';
                chartObj.series = this._createSeriesTimeserie(data, x, y, value, chartObj.yAxis);
            }
            else {
                // create xAxis categories
                chartObj.xAxis.categories = this._createXAxisCategories(data, x.index);
                chartObj.series = this._createSeriesStandard(data, x, y, value, chartObj.yAxis, chartObj.xAxis);
            }

            return chartObj;
        };

        /**
         * creates the yAxis TODO: probably to check
         * @param data
         * @param columnIndex
         * @private
         */
        FENIX_Highchart_Adapter.prototype._createYAxis = function (data, columnIndex) {
            var yAxisNames = [],
                yAxis = [];

            // TODO it can be done faster the unique array
            data.forEach(function(value) {
                yAxisNames.push(value[columnIndex]);
            });
            yAxisNames = _.uniq(yAxisNames);

            // creating yAxis objects
            // TODO; probably it should merge the yAxis template somehow. PROBLEM: how to merge multiple axes properties from the baseConfig?
            yAxisNames.forEach(function (v) {
                yAxis.push({title: {text: v}});
            });

            console.log(yAxis);
            return yAxis
        };


        /**
         * Create unique xAxis categories
         * @param data
         * @private
         */
        FENIX_Highchart_Adapter.prototype._createXAxisCategories = function(data, xIndex) {

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

        FENIX_Highchart_Adapter.prototype._createSeriesTimeserie = function (data, x, y, value, yAxis) {
            var xIndex = x.index,
                xDataType = x.column.dataType,
                yIndex = y.index,
                valueIndex = value.index,
                yAxis = yAxis,
                series = [];

            // Create the series
            data.forEach(_.bind(function (row) {

                // unique key for series
                var name = this._createSeriesName(row);

                // get serie
                var serie = _.findWhere(data.series, {name: name}) || {name: name},
                    yLabel;

                // data of the serie
                serie.data = [];

                // Create yAxis if exists
                if (yIndex) {
                    // TODO
                    yLabel = row[yIndex];
                    //yLabel = this.aux.code2label[this._getColumnBySubject(this.yAxisSubject).id][yValue];
                    serie.yAxis = this._getYAxisIndex(yAxis, yLabel);
                }

                // push the value of the serie
                if (row[xIndex] !== null && row[xIndex] !== undefined && row[valueIndex] !== undefined && row[valueIndex] !== null) {
                    serie.data.push([this._getDatetimeByDataType(xDataType, row[xIndex]), row[valueIndex]]);

                    // Add serie to series
                    // TODO: remove the 0
                    series = this._addSerie(series, serie)
                }

            }, this));

            return series;
        };

        /**
         * Add serie to series (TODO: clean the code, clone the object to return a new series)
         * @param series
         * @param serie
         * @returns {*}
         * @private
         */
        FENIX_Highchart_Adapter.prototype._addSerie = function(series, serie, valueIndex) {
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

        FENIX_Highchart_Adapter.prototype._createSeriesStandard = function (data, x, y, value, yAxis, xAxis) {
            var xIndex = x.index,
                xDataType = x.column.dataType,
                yIndex = y.index,
                valueIndex = value.index,
                yAxis = yAxis,
                xCategories = xAxis.categories,
                series = [];

            // Create the series
            data.forEach(_.bind(function (row) {

                // unique key for series
                var name = this._createSeriesName(row);

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

                    serie.data[index] = row[valueIndex];

                    // Add serie to series
                    series = this._addSerie(series, serie, index)
                }

            }, this));

            return series;
        };


        /**
         * Sort the data by an index (in theory this should be the xAxis index 'this.aux.x.index')
         * @param data
         * @param index
         * @private
         */
        FENIX_Highchart_Adapter.prototype._sortData = function (data, index) {
            data.sort(_.bind(function (a, b) {

                if (a[index] < b[index]) {
                    return -1;
                }
                if (a[index] > b[index]) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            }, this));
        };

        FENIX_Highchart_Adapter.prototype._getDatetimeByDataType = function (type, value) {

            // TODO: this is can be simplified and not applied to each row
            switch(type.toLowerCase()) {
                case 'year':
                    return Date.UTC(value, 1, 1);
                    break;
                default :
                    console.warn("Date type date format not yet supported: " + type);
                    break;
            }

        };

        FENIX_Highchart_Adapter.prototype._getYAxisIndex = function (yAxis, label) {
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

        FENIX_Highchart_Adapter.prototype._createSeriesName = function (row) {

            var name = '';

            _.each(this.aux.series, function (serie) {
                if (row[serie.index] !== undefined && row[serie.index] !== null) {
                    name = name.concat(row[serie.index] + ' ');
                }
            }, this);

            return name;
        };

        FENIX_Highchart_Adapter.prototype._onValidateDataSuccess = function () {
            amplify.publish(e.READY, this);
        };

        FENIX_Highchart_Adapter.prototype._onValidateDataError = function () {
            this._showConfigurationForm();
        };

        FENIX_Highchart_Adapter.prototype._initVariable = function () {

            this.$metadata = this.model.metadata;
            this.$dsd = this.$metadata.dsd;
            this.$columns = this.$dsd.columns;

            this.$data = this.model.data;
        };

        FENIX_Highchart_Adapter.prototype._validateInput = function () {

            this.errors = {};

            //Container
            /* if (!this.hasOwnProperty("container")) {
             this.errors.container = "'container' attribute not present.";
             }

             if ($(this.container).find(this.s.CONTENT) === 0) {
             this.errors.container = "'container' is not a valid HTML element.";
             }

             //Model
             if (!this.hasOwnProperty("model")) {
             this.errors.model = "'model' attribute not present.";
             }

             if (typeof this.model !== 'object') {
             this.errors.model = "'model' is not an object.";
             }

             //Metadata
             if (!this.model.hasOwnProperty("metadata")) {
             this.errors.metadata = "Model does not container 'metadata' attribute.";
             }

             //DSD
             if (!this.model.metadata.hasOwnProperty("dsd")) {
             this.errors.dsd = "Metadata does not container 'dsd' attribute.";
             }

             //Columns
             if (!Array.isArray(this.model.metadata.dsd.columns)) {
             this.errors.columns = "DSD does not container a valid 'columns' attribute.";
             }

             //Option
             if (this.options && typeof this.options !== 'object') {
             this.errors.options = "'options' is not an object.";
             }

             //Data
             if (!this.model.hasOwnProperty("data")) {
             this.errors.data = "Model does not container 'data' attribute.";
             }

             // seriesSubject
             if (!Array.isArray(this.seriesSubject)) {
             this.errors.seriesSubject = "SeriesSubject is not an Array element";
             }*/

            return (Object.keys(this.errors).length === 0);
        };

        FENIX_Highchart_Adapter.prototype._printAuxColumns = function () {
            if (this.debugging) {
                console.log("----------Aux Columns");
                console.log(this.aux.x);
                console.log(this.aux.y); // yAxis can be undefined (launch a warning)
                console.log(this.aux.value);
                console.log(this.aux.series);
                console.log("~~~~~~~");
            }
        };

        FENIX_Highchart_Adapter.prototype.destroy = function () {
            console.warn("To be implemented");
        };


        return FENIX_Highchart_Adapter;
    });
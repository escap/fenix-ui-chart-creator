/*global define, amplify, console*/
define([
        'jquery',
        'underscore',
        'amplify'
    ],
    function ($, baseConfig, _) {

        'use strict';

        var defaultOptions = {

                lang: 'EN',

                s: {
                    CONTENT: '[data-role="content"]'
                },

                type: 'timeseries', //[custom, scatter, pie]

                xAxisSubject: 'time',
                yAxisSubject: 'um',
                valueSubject: 'value',
                seriesSubject: [],

                data: {},

                aux: {
                    ids: [],
                    subjects: [],
                    id2index: {},
                    index2id: {},
                    //contains id_column : {code : label}
                    code2label: {},
                    subject2id: {},
                    id2subject: {},
                    nameIndexes: []
                }
            },
            e = {
                DESTROY: 'fx.component.chart.destroy',
                READY: 'fx.component.chart.ready'
            };

        function Star_Schema_Adapter() {
            $.extend(true, this, defaultOptions);
        }

        Star_Schema_Adapter.prototype.prepareData = function (config) {

            $.extend(true, this, config);

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

            /*
            if (!this.hasOwnProperty("container")) {
                this.errors.container = "'container' attribute not present.";
            }*/

            return (Object.keys(this.errors).length === 0);
        };

        Star_Schema_Adapter.prototype._prepareData = function () {

            this.$columns.forEach(_.bind(function (column, index) {

                if (column.hasOwnProperty('id')) {
                    this.aux.id2index[column.id] = index;
                    this.aux.index2id[index] = column.id;
                    this.aux.ids.push(column.id);

                    if (!column.hasOwnProperty('subject')) {
                        column.subject = column.id;
                    }

                    if (column.hasOwnProperty('subject')) {
                        this.aux.subject2id[column.subject] = column.id;
                        this.aux.id2subject[column.id] = column.subject;

                        this.aux.subjects.push(column.subject);

                        if (column.subject === this.yAxisSubject) {
                            this.columnYAxisIndex = index;
                        }

                        if (column.subject === this.xAxisSubject) {
                            this.columnXAxisIndex = index;
                        }

                        if (column.subject === this.valueSubject) {
                            this.columnValueIndex = index;
                        }
                    }
                }

                if (column.hasOwnProperty('values')) {
                    this.aux.code2label[column.id] = this._createCode2LabelMap(column);
                }

                this.aux.nameIndexes.push(index);

            }, this));

            if (this.seriesSubject.length === 0) {

                this.aux.nameIndexes = _.filter(this.aux.nameIndexes, function (index) {
                    return (index !== this.columnXAxisIndex) && (index !== this.columnValueIndex);
                }, this);
            } else {

                this.aux.nameIndexes = [];

                _.each(this.seriesSubject, function (sub) {
                    this.aux.nameIndexes.push(this.aux.id2index[this.aux.subject2id[sub]]);
                }, this);
            }

            if (this.columnValueIndex) {
                this._prepareDataForChartType();
            }
        };

        Star_Schema_Adapter.prototype._validateData = function () {

            this.errors = {};

            return (Object.keys(this.errors).length === 0);
        };

        Star_Schema_Adapter.prototype._onValidateDataSuccess = function () {
            this.$chartRendered = true;
            this._createConfiguration();
            this._renderChart();
        };

        Star_Schema_Adapter.prototype._onValidateDataError = function () {
            this._showConfigurationForm();
        };



        return Star_Schema_Adapter;
    });
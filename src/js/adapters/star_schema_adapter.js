/*global define, amplify, console*/
define([
        'jquery',
        'underscore',
        'amplify'
    ],
    function ($, _) {

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

            this.CONFIG = {
                charts_data: {}
            };

            return this;
        }

        Star_Schema_Adapter.prototype.prepareData = function (config) {

            $.extend(true, this.CONFIG, config);

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

        Star_Schema_Adapter.prototype.create_tree_item = function (father, filters, row) {

            if (filters.length > 1) {

                if (father[row[filters[0]]] == null) {
                    father[row[filters[0]]] = {};
                }

                var tmp = father[row[filters[0]]];

                filters.splice(0, 1);

                this.create_tree_item(tmp, filters, row);
            } else {

                if (!Array.isArray(father[row[filters[0]]])) {
                    father[row[filters[0]]] = []
                }

                father[row[filters[0]]].push(row);
            }
        };

        Star_Schema_Adapter.prototype._prepareData = function () {

            for (var i = 0; i < this.CONFIG.model.length; i++) {
                var row = this.CONFIG.model[i];
                var f = this.CONFIG.filters.slice();
                this.create_tree_item(this.CONFIG.charts_data, f, row)
            }

            console.log(this.CONFIG.charts_data)

        };

        Star_Schema_Adapter.prototype._validateData = function () {

            this.errors = {};

            return (Object.keys(this.errors).length === 0);
        };

        Star_Schema_Adapter.prototype._onValidateDataSuccess = function () {

        };

        Star_Schema_Adapter.prototype._onValidateDataError = function () {

        };

        Star_Schema_Adapter.prototype.get_series = function (config) {

            var series = this.CONFIG.charts_data;
            _.each(this.CONFIG.filters, _.bind(function (f) {

                //Controlla che esiste
                series = series[config.filters[f]];

            }, this));

            return series;
        };

        Star_Schema_Adapter.prototype.getData = function (s) {

            return this.prepare_series(this.get_series(s));
        };

        Star_Schema_Adapter.prototype.prepare_series = function (d) {

            var s = [],
                x_dimension = this.CONFIG.x_dimension,
                y_dimension = this.CONFIG.y_dimension;

            //TODO ordinamento della series
            for (var i = d.length - 1; i >= 0; i--) {
                var x = isNaN(parseInt(d[i][x_dimension])) ? null : parseInt(d[i][x_dimension]);
                var y = isNaN(parseFloat(d[i][y_dimension])) ? null : parseFloat(d[i][y_dimension]);
                s.push([x, y]);
            }

            return s;

        };

        return Star_Schema_Adapter;
    });
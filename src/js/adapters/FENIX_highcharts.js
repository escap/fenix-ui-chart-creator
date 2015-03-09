/*global define*/
define([
        'jquery',
        'fx-c-c/config/adapters/FENIX_highcharts',
        'underscore',
        'highcharts',
        'amplify'
    ],
    function ($, baseConfig, _) {

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
            e={
                DESTROY: 'fx.component.chart.destroy',
                READY : 'fx.component.chart.ready'
            };

        function FENIX_Highchart_Adapter() {
            $.extend(true, this, defaultOptions);
        }

        FENIX_Highchart_Adapter.prototype.render = function (config) {
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

            this.$columns.forEach(_.bind(function (column, index) {

                if (column.hasOwnProperty('id')) {
                    this.aux.id2index[column['id']] = index;
                    this.aux.index2id[index] = column['id'];
                    this.aux.ids.push(column['id']);

                    if (!column.hasOwnProperty('subject')) {
                        column['subject'] = column['id'];
                    }

                    if (column.hasOwnProperty('subject')) {
                        this.aux.subject2id[column['subject']] = column['id'];
                        this.aux.id2subject[column['id']] = column['subject'];

                        this.aux.subjects.push(column['subject']);

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
                    this.aux.code2label[column['id']] = this._createCode2LabelMap(column);
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

        FENIX_Highchart_Adapter.prototype._prepareDataForChartType = function () {

            var yColumn = this._getColumnBySubject(this.yAxisSubject);

            switch (this.type) {
                case 'pie':
                    break;
                case 'scatter':
                    break;
                case 'custom' :
                    break;
                default :
                    //Time series
                    this._processYAxisColumn(yColumn);
                    this._processSeriesForTimeSeries();

                    break;
            }
        };

        FENIX_Highchart_Adapter.prototype._processYAxisColumn = function (column) {

            if (!column){
                return;
            }

            this.data.yAxis = [];

            if (column.dataType === "code") {
                var values = _.values(this.aux.code2label[this._getColumnBySubject(this.yAxisSubject).id]);

                _.each(values, function (v) {
                    this.data.yAxis.push({title: {text: v}});
                }, this);

            } else {
                console.warn("TODO yAxis is not coded. Method has to be implemented.");
            }
        };

        FENIX_Highchart_Adapter.prototype._processSeriesForTimeSeries = function () {

            this.data.series = [];

            this.model.data.sort(_.bind(function (a, b){

                if (a[this.columnXAxisIndex] < b[this.columnXAxisIndex] ) {
                    return -1;
                }
                if (a[this.columnXAxisIndex] > b[this.columnXAxisIndex] ) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            }, this));


            this.$data.forEach(_.bind(function (row) {

                var name = this._createSeriesName(row),
                    serie = _.findWhere(this.data.series, {name: name}) || {name: name},
                    yValue, yLabel, xValue, xLabel, value;

                if (!serie.hasOwnProperty('yAxis')) {
                    if (this.columnYAxisIndex) {
                        yValue = row[this.columnYAxisIndex];
                        yLabel = this.aux.code2label[this._getColumnBySubject(this.yAxisSubject).id][yValue];
                        serie.yAxis = this._getYAxisIndex(yLabel);
                    }
                }

                if (!serie.hasOwnProperty('data')) {
                    serie.data = [];
                }

                xValue = row[this.columnXAxisIndex];
                xLabel = this.aux.code2label[this._getColumnBySubject(this.xAxisSubject).id][xValue];
                value = row[this.columnValueIndex];
                //console.log(name, xLabel, value);
                serie.data.push([xLabel, value]);

                this.data.series.push(serie);

            }, this));

            //this.data.series = this.data.series.slice(0, 5)
        };

        FENIX_Highchart_Adapter.prototype._getYAxisIndex = function (label) {

            var index = -1;

            _.each(this.data.yAxis, function (yAxis, i) {
                if (yAxis.title.text === label) { index = i }
            }, this);

            if (index < 0) {
                console.error("Data contains an unknown yAxis value: " + label);
            }

            return index;
        };

        FENIX_Highchart_Adapter.prototype._createSeriesName = function (row) {

            var name = '';

            _.each(this.aux.nameIndexes, function (index) {
                var id = this.aux.index2id[index];
                name = name.concat(this.aux.code2label[id][row[index]] + ' ');
            }, this);

            return name;
        };

        FENIX_Highchart_Adapter.prototype._validateData = function () {

            this.errors = {};

            return (Object.keys(this.errors).length === 0);
        };

        FENIX_Highchart_Adapter.prototype._onValidateDataSuccess = function () {
            this.$chartRendered = true;
            this._createConfiguration();
            this._renderChart();
        };

        FENIX_Highchart_Adapter.prototype._showConfigurationForm = function () {
            alert("FORM");
        };

        FENIX_Highchart_Adapter.prototype._onValidateDataError = function () {
            this._showConfigurationForm();

        };

        FENIX_Highchart_Adapter.prototype._createConfiguration = function () {
            this.config = $.extend(true, baseConfig, this.options, this.data);

            this.config.chart.events.load = function () {
                amplify.publish(e.READY, this);
            }
        };

        FENIX_Highchart_Adapter.prototype._renderChart = function () {

            this.$container.highcharts(this.config);
        };

        FENIX_Highchart_Adapter.prototype._initVariable = function () {

            this.$container = $(this.container).find(this.s.CONTENT);

            this.$metadata = this.model.metadata;
            this.$dsd = this.$metadata.dsd;
            this.$columns = this.$dsd.columns;

            this.$data = this.model.data;
        };

        FENIX_Highchart_Adapter.prototype._validateInput = function () {

            this.errors = {};

            //Container
            if (!this.hasOwnProperty("container")) {
                this.errors['container'] = "'container' attribute not present.";
            }

            if ($(this.container).find(this.s.CONTENT) === 0) {
                this.errors['container'] = "'container' is not a valid HTML element.";
            }

            //Model
            if (!this.hasOwnProperty("model")) {
                this.errors['model'] = "'model' attribute not present.";
            }

            if (typeof this.model !== 'object') {
                this.errors['model'] = "'model' is not an object.";
            }

            //Metadata
            if (!this.model.hasOwnProperty("metadata")) {
                this.errors['metadata'] = "Model does not container 'metadata' attribute.";
            }

            //DSD
            if (!this.model.metadata.hasOwnProperty("dsd")) {
                this.errors['dsd'] = "Metadata does not container 'dsd' attribute.";
            }

            //Columns
            if (!Array.isArray(this.model.metadata.dsd.columns)) {
                this.errors['columns'] = "DSD does not container a valid 'columns' attribute.";
            }

            //Option
            if (this.options && typeof this.options !== 'object') {
                this.errors['options'] = "'options' is not an object.";
            }

            //Data
            if (!this.model.hasOwnProperty("data")) {
                this.errors['data'] = "Model does not container 'data' attribute.";
            }

            // seriesSubject
            if (!Array.isArray(this.seriesSubject)) {
                this.errors['seriesSubject'] = "SeriesSubject is not an Array element";
            }

            return (Object.keys(this.errors).length === 0);
        };

        //Utils
        FENIX_Highchart_Adapter.prototype._getLabel = function (obj, attribute) {

            var label,
                keys;

            if (obj.hasOwnProperty(attribute) && obj.title !== null) {

                if (obj[attribute].hasOwnProperty(this.lang)) {
                    label = obj[attribute][this.lang];
                } else {

                    keys = Object.keys(obj[attribute]);

                    if (keys.length > 0) {
                        label = obj[attribute][keys[0]];
                    }
                }
            }

            return label;
        };

        FENIX_Highchart_Adapter.prototype._createCode2LabelMap = function (column) {

            var map = {},
                values;

            switch (column.dataType) {
                case 'code' :
                    values = _.each(column.values.codes[0].codes, function (v) {
                        map[v.code] = this._getLabel(v, 'label');
                    }, this);
                    break;
                case 'year' :
                    values = _.each(column.values.timeList, function (v) {
                        map[v] = Date.UTC(v, 0);
                    }, this);
                    break;
            }

            // TODO code, customCode,  enumeration, date, month, year, time, text,label, number, percentage, bool

            return map;
        };

        FENIX_Highchart_Adapter.prototype._getColumnBySubject = function (subject) {

            var id = this.aux.subject2id[subject],
                index;

            if (!id) {
                return;
            }

            index = this.aux.id2index[id];

            if (!index) {
                return;
            }

            return this.$columns.length > index ? this.$columns[index] : null;
        };

        FENIX_Highchart_Adapter.prototype._getColumnIndexBySubject = function (subject) {

            _.each(this.$columns, function (column, i) {
                if (column.subject === subject) {
                    return i;
                }
            }, this);

            return -1;
        };

        FENIX_Highchart_Adapter.prototype.reflow = function (){

         if(typeof this.$container!== 'undefined' && this.$chartRendered ) {
                this.$container.highcharts().reflow();
                return true;
         }
        }

        return FENIX_Highchart_Adapter;
    });
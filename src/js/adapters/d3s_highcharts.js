/*global define*/
define([
        'jquery',
        'fx-c-c/config/adapters/d3s_highcharts',
        'underscore'
    ],
    function ($, baseConfig, _) {

        var defaultOptions = {
            s: {
                CONTENT: '[data-role="content"]'
            },

            xAxisSubject : 'time',
            yAxisSubject : 'um',
            valueSubject : 'value',
            seriesSubject : 'geo',

            data: {
                xAxis: {
                    categories: []
                }
            },
            aux : {
                subject2index:{}
            }
        };

        function D3S_Highchart_Adapter() {
            $.extend(true, this, defaultOptions);
        }

        D3S_Highchart_Adapter.prototype.render = function (config) {
            $.extend(true, this, config);

            if (this._validateInput() === true) {
                this._initVariable();
                this._prepareData();
                if (this._validateConfiguration() === true) {
                    this._onValidateConfigutionSuccess();
                } else {
                    this._onValidateConfigurationError();
                }
            } else {
                console.error(this.errors);
                throw new Error("FENIX Chart creator has not a valid configuration");
            }
        };

        D3S_Highchart_Adapter.prototype._prepareData = function () {

            this.$columns.forEach(_.bind(function (column, index) {

                this.aux.subject2index[column['subject'].toUpperCase()]  = index;

                if (column['subject'].toUpperCase() === this.xAxisSubject.toUpperCase()) {
                    this._processXAxisColumn(column);
                }

                if (column['subject'].toUpperCase() === this.yAxisSubject.toUpperCase()) {
                    this._processYAxisColumn(column);
                }

                if (column['subject'].toUpperCase() === this.seriesSubject.toUpperCase()) {
                    this._processSeriesColumn(column);
                }
            }, this));

        };

        D3S_Highchart_Adapter.prototype._processXAxisColumn = function (column){
            this.data.xAxis.categories = _.uniq(column.values.timeList);
        };

        D3S_Highchart_Adapter.prototype._processYAxisColumn = function (column){
            this.data.xAxis.categories = _.uniq(column.values.timeList);
        };

        D3S_Highchart_Adapter.prototype._processSeriesColumn = function (column){
            this.data.xAxis.categories = _.uniq(column.values.timeList);
        };

        D3S_Highchart_Adapter.prototype._validateConfiguration = function () {

            this.errors = {};


            return (Object.keys(this.errors).length === 0);
        };

        D3S_Highchart_Adapter.prototype._onValidateConfigutionSuccess = function () {

            this._initBaseConfiguration();
            //this._parseModel();
        };

        D3S_Highchart_Adapter.prototype.showConfigurationForm = function () {
            alert("FORM");
        };

        D3S_Highchart_Adapter.prototype._onValidateConfigurationError = function () {
            this.showConfigurationForm();

        };

        D3S_Highchart_Adapter.prototype._initBaseConfiguration = function () {
            this.baseConfig = $.extend(true, baseConfig, this.options);
        };

        D3S_Highchart_Adapter.prototype._parseModel = function () {

            this.$container.html(this.model);
        };


        D3S_Highchart_Adapter.prototype._renderChart = function () {
            this.$container.html(this.model);
        };

        D3S_Highchart_Adapter.prototype._initVariable = function () {

            this.$container = $(this.container).find(this.s.CONTENT);

            this.$metadata = this.model.metadata;
            this.$dsd = this.$metadata.dsd;
            this.$columns = this.$dsd.columns;

            console.log(this.$columns.forEach)


        };

        D3S_Highchart_Adapter.prototype._validateInput = function () {

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

            return (Object.keys(this.errors).length === 0);
        };

        //Utils
        D3S_Highchart_Adapter.prototype._getLabel = function (obj, attribute) {

            var label,
                keys;

            if (obj.hasOwnProperty(attribute) && obj.title !== null) {

                if (obj[attribute].hasOwnProperty('EN')) {
                    label = obj[attribute]['EN'];
                } else {

                    keys = Object.keys(obj[attribute]);

                    if (keys.length > 0) {
                        label = obj[attribute][keys[0]];
                    }
                }
            }

            return label;
        };

        D3S_Highchart_Adapter.prototype._createMapCode = function (values) {

            var map = {};
            for (var i = 0; i < values.length; i++) {
                //TODO throw error if the code is not well-formed
                map[values[i].code] = this._getLabel(values[i], 'label');
            }

            return map;
        };


        return D3S_Highchart_Adapter;
    });
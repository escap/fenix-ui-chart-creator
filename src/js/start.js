/*global define*/
define([
        'require',
        'jquery',
        'fx-c-c/adapters/star_schema_adapter',
        'fx-c-c/templates/base_template',
        'fx-c-c/creators/highcharts_creator',
        'highcharts'
    ],
    function (RequireJS, $) {

        'use strict';

        var defaultOptions = {
            default: ''
        };

        function ChartCreator() {
            $.extend(true, this, defaultOptions);
            return this;
        }

        ChartCreator.prototype.init = function (config) {

            if (this._validateInput(config)) {

                this.preloadResources(config);
            }

            /* if (config.render) {
             this.render(config.render);
             }*/
        };

        ChartCreator.prototype.render = function (config) {

            var series = [];

            this.template.render(config);

            for (var i =0 ; i < config.series.length; i++ ) {
                series.push(this.adapter.getData(config.series[i]));
            }

            config.chart_series = series;

            this.creator.render(config);
        };

        ChartCreator.prototype.preloadResources = function (config) {

            var baseTemplate = this.getTemplateUrl(),
                adapter = this.getAdapterUrl(),
                creator = this.getCreatorUrl(),
                self = this;

            RequireJS([
                baseTemplate,
                adapter,
                creator
            ], function (Template, Adapter, Creator) {

                self.template = new Template($.extend(true, {model: config.model}, config.template));
                self.adapter = new Adapter($.extend(true, {model: config.model}, config.adapter));
                self.creator = new Creator($.extend(true, {model: config.model}, config.creator));

                self.adapter.prepareData($.extend(true, {model: config.model}, config.adapter));

                if (typeof config.onReady === 'function'){
                    config.onReady();
                }

            });
        };

        ChartCreator.prototype.getAdapterUrl = function () {
            //TODO add here adapter discovery logic
            return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/star_schema_adapter';
        };

        ChartCreator.prototype.getTemplateUrl = function () {
            //TODO add here template discovery logic
            return this.templateUrl ? this.templateUrl : 'fx-c-c/templates/base_template';
        };

        ChartCreator.prototype.getCreatorUrl = function () {
            //TODO add here template discovery logic
            return this.creatorUrl ? this.creatorUrl : 'fx-c-c/creators/highcharts_creator';
        };

        ChartCreator.prototype._validateInput = function () {
            return true;
        };

        return ChartCreator;
    });
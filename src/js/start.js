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

        };

        ChartCreator.prototype.render = function (config) {

            var series = [],
                template = new this.templateFactory($.extend(true, {}, {model: config.model}, config.template)),
                creator = new this.creatorFactory($.extend(true, {}, {model: config.model}, config.creator));

            template.render(config);


            for (var i = 0; i < config.series.length; i++) {

                var retrieved = this.adapter.getData(config.series[i]);

                //Remove empty
                if (retrieved.length > 0) {
                    series.push($.extend(true, this.adapter.getData(config.series[i]), config.series[i].creator));
                }

            }

            config.chart_series = series;
            config.chart_categories = this.adapter.get('categories');

            creator.render(config);

            return {
                destroy: $.proxy(function () {

                    creator.destroy();
                    template.destroy();

                }, this)
            };
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

                self.templateFactory = Template;
                self.creatorFactory = Creator;

                self.adapter = new Adapter($.extend(true, {model: config.model}, config.adapter));

                self.adapter.prepareData($.extend(true, {model: config.model}, config.adapter));

                if (typeof config.onReady === 'function') {
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
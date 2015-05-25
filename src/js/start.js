/*global define*/
define([
        'require',
        'jquery',
        'fx-c-c/adapters/star_schema_adapter',
        'fx-c-c/adapters/FENIX_adapter',
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
            console.log("render");

            var template = new this.templateFactory($.extend(true, {model: config.model}, config.template)),
                creator = new this.creatorFactory($.extend(true, {model: config.model}, config.creator));

            // render template
            template.render(config);

            // getting chart definition
            var chartObj = this.adapter.prepareChart(config.series);
            config.chartObj = $.extend(true, {}, chartObj, creator.chartObj);


            // render chart
            creator.render(config);

            return {
                destroy: $.proxy(function () {

                    creator.destroy();
                    template.destroy();

                }, this)
            };
        };

/*        ChartCreator.prototype.renderFENIX = function (config) {

            var template = new this.templateFactory($.extend(true, {model: config.model}, config.template)),
                creator = new this.creatorFactory($.extend(true, {model: config.model}, config.creator));

            // render template
            template.render(config);

            var chartObj = this.adapter.prepareChart(config.series);
            config.chartObj = $.extend(true, {}, chartObj, creator.chartObj);

            // getting chart definition
            //config.chartObj = $.extend(true, {}, this.adapter.chartObj, creator.chartObj);

            // render chart
            creator.render(config);

            return {
                destroy: $.proxy(function () {

                    creator.destroy();
                    template.destroy();

                }, this)
            };
        };*/

        ChartCreator.prototype.preloadResources = function (config) {

            console.log("preloadResources");

            var baseTemplate = this.getTemplateUrl(),
                adapter = this.getAdapterUrl(config.model),
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

        ChartCreator.prototype.getAdapterUrl = function (model) {
            //TODO add here adapter discovery logic
            // TODO: quick check. to be modified
            if (model.data && model.metadata) {
                return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/FENIX_adapter';
            }
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
/*global define*/
define([
        'require',
        'jquery',
        'fx-c-c/adapters/star_schema_adapter',
        'fx-c-c/adapters/matrix_schema_adapter',
        'fx-c-c/adapters/FENIX_adapter',
        'fx-c-c/templates/base_template',
        'fx-c-c/creators/highcharts_creator'
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

            var self = this;
            try {
                if (this._validateInput(config)) {
                    this.preloadResources(config);
                }
            }catch(e) {
                self.onError();
            }

        };

        ChartCreator.prototype.render = function (config) {

            var template = new this.templateFactory(
                    $.extend(true, {model: config.model, container: config.container}, config.template)
                ),
                creator = new this.creatorFactory(
                    $.extend(true, {container: config.container, noData: config.noData}, config.creator)
                );

            // render template
            template.render();

            // TODO: Handle the error
            try {

                // getting chart definition
                var chartObj = this.adapter.prepareChart(config.adapter || {});

                console.log(chartObj);

                // render chart
                creator.render({chartObj: chartObj});

            }catch(e) {
                creator.noDataAvailable();
            }

            return {
                destroy: $.proxy(function () {

                    creator.destroy();
                    template.destroy();

                }, this)
            };
        };

        ChartCreator.prototype.preloadResources = function (config) {

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

                // TODO: use one configuration object in this phase
                self.adapter = new Adapter($.extend(true, {model: config.model}, config.adapter));
                self.adapter.prepareData($.extend(true, {model: config.model}, config.adapter));

                if (typeof config.onReady === 'function') {
                    config.onReady(self);
                }
            });
        };

        ChartCreator.prototype.onError = function () {
            console.warn("TODO: handle chart on error");
        };

        ChartCreator.prototype.getAdapterUrl = function (model) {
            // TODO add here adapter discovery logic
            // TODO: Dirty check to be modified
            // TODO: Validate the model (What to do in case or errors?)

            if (model.data && model.metadata) {
                return this.adapterUrl? this.adapterUrl: 'fx-c-c/adapters/FENIX_adapter';
            }
            else if (Array.isArray(model[0])) {
                return this.adapterUrl ? this.adapterUrl: 'fx-c-c/adapters/matrix_schema_adapter';
            }
            return this.adapterUrl? this.adapterUrl: 'fx-c-c/adapters/star_schema_adapter';
        };

        ChartCreator.prototype.getTemplateUrl = function () {
            //TODO add here template discovery logic
            return this.templateUrl? this.templateUrl: 'fx-c-c/templates/base_template';
        };

        ChartCreator.prototype.getCreatorUrl = function () {
            //TODO add here template discovery logic
            return this.creatorUrl? this.creatorUrl: 'fx-c-c/creators/highcharts_creator';
        };

        ChartCreator.prototype._validateInput = function () {
            return true;
        };

        return ChartCreator;
    });
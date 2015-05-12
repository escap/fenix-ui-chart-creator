/*global define*/
define([
        'require',
        'jquery',
        'fx-c-c/templates/base_template',
        'fx-c-c/adapters/FENIX_adapter',
        'highcharts'
    ],
    function (RequireJS, $) {

        'use strict';

        var defaultOptions = {
            default: ''
        };

        function ChartCreator() {
            $.extend(true, this, defaultOptions);
        }

        ChartCreator.prototype.init = function (config) {

            if (this._validateInput(config)) {
                this.preloadResources(config);
            }

           /* if (config.render) {
                this.render(config.render);
            }*/
        };

        ChartCreator.prototype.render = function( config ) {

            var data;

            this.template.render(config);

            data = this.adapter.getData(config);

            this.creator.createChart($.extend(true, {}, config, data));
        };

        ChartCreator.prototype.preloadResources = function ( config ) {

            var baseTemplate = this.getTemplateUrl(),
                adapter =  this.getAdapterUrl(),
                creator = this.getCreatorUrl(),
                self = this;

            RequireJS([
                 baseTemplate,
                adapter,
                creator
            ], function (Template, Adapter, Creator) {

                self.template = new Template();
                self.adapter = new Adapter();
                self.creator = new Creator();

                self.adapter.prepareData(config);

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
            return this.creatorUrl ? this.creatorUrl : 'fx-c-c/creators/highchart_creator';
        };

        ChartCreator.prototype._validateInput = function () {
            return true;
        };

        return ChartCreator;
    });
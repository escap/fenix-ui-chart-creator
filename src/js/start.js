/*global define, console*/
define([
        'require',
        'jquery',
        'fx-c-c/adapters/FENIX_adapter',
        'fx-c-c/templates/base_template',
        'fx-c-c/creators/highcharts_creator'
    ],
    function (RequireJS, $, FENIXAdapter, BaseTemplate, HighchartCreator) {

        'use strict';

        var defaultOptions = {
            default: ''
        };

        function ChartCreator(config) {
            $.extend(true, this, defaultOptions, config);

            if (this._validateInput(config)) {
                this.templateFactory = BaseTemplate;
                this.creatorFactory = HighchartCreator;
                this.adapter = new FENIXAdapter();
            }

            return this;
        }

        ChartCreator.prototype.render = function (obj) {

            //Input parsing

            var general = {
                adapter : {},
                creator: {
                    config : {}
                }
            }, optGr = {};

            optGr.AGG = obj.aggregations;
            optGr.COLS = obj.columns;
            optGr.VALS = obj.values;
            optGr.ROWS = obj.rows;
            optGr.HIDDEN = obj.hidden;
            optGr.Aggregator = obj.aggregationFn;
            optGr.Formater = obj.formatter;
            optGr.GetValue = obj.valueOutputType;
            optGr.fulldataformat = obj.showRowHeaders;
            optGr.nbDecimal = obj.decimals;
            optGr.showCode = obj.showCode;
            optGr.showFlag = obj.showFlag;
            optGr.showUnit = obj.showUnit;

            general.adapter.model = obj.model;
            general.adapter.config = optGr;

            general.creator.container =  obj.el;
            general.creator.config = optGr;
            //end Input parsing

            var config = general;

            var template = new this.templateFactory(
                $.extend(true, {model: config.model, container: config.container}, config.template)
                ),
                creator = new this.creatorFactory(
                    $.extend(true, {container: config.container, noData: config.noData}, config.creator)
                );

            // render template
            template.render();

            // getting chart definition

//FIG this.adapter e' il pivotator
            var modelFxLight = this.adapter.prepareData(config.adapter || {});

            // render chart
//FIG creator e' il renderer
            creator.render({model: modelFxLight, config: config.creator || {}});

            /*
             // TODO: Handle the error
             try {
             // getting chart definition

             //FIG this.adapter e' il pivotator
             var modelFxLight = this.adapter.prepareData(config.adapter || {});

             // render chart
             //FIG creator e' il renderer
             creator.render({model: modelFxLight, config: config.creator || {}});

             } catch (e) {
             console.error("Creator raised an error: " + e);
             creator.noDataAvailable({container: config.container});
             }
             */

            return {
                destroy: $.proxy(function () {

                    creator.destroy();
                    template.destroy();

                }, this)
            };
        };

        ChartCreator.prototype.preloadResources = function (c) {

            var config = c || {};

            var baseTemplate = this.getTemplateUrl(),
                adapter = this.getAdapterUrl(config.model, (config.adapter) ? config.adapter.adapterType : null),
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
                //self.adapter.prepareData($.extend(true, {model: config.model}, config.adapter));

                if (typeof config.onReady === 'function') {
                    config.onReady(self);
                }
                self.dfd.resolve(self);
            });
        };

        ChartCreator.prototype.onError = function (e) {
            console.error("ChartCreator Error: ", e);
            // TODO: Add an Error message
            this.dfd.reject("ChartCreator Error: ", e);
        };

        ChartCreator.prototype.getAdapterUrl = function (model, adapterType) {

            if (!model) {
                return this.adapterUrl;
            }

            // TODO add here adapter discovery logic
            // TODO: Dirty switch to check wheater there is an adapterType specified
            if (adapterType !== null && adapterType !== undefined) {
                switch (adapterType.toLocaleLowerCase()) {
                    case 'fenix':
                        return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/FENIX_adapter';
                    case 'wds-array':
                        return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/matrix_schema_adapter';
                    case 'wds-objects':
                        return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/star_schema_adapter';
                }
            }
            else {

                // TODO: Dirty check to be modified
                // TODO: Validate the model (What to do in case or errors?)
                if (model.data && model.metadata) {
                    return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/FENIX_adapter';
                }
                else if (model.length > 0 && Array.isArray(model[0])) {
                    return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/matrix_schema_adapter';
                }
                else if (model.length > 0 && typeof model[0] === 'object') {
                    return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/star_schema_adapter';
                }
                else {
                    if (!model.data) {
                        model.data = [];
                        return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/FENIX_adapter';

                    }
                    throw new Error("The are not available adapter for the current model:", model);
                }
            }
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
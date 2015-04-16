/*global define*/
define([
        'require',
        'jquery',
        'fx-c-c/templates/base_template',
        'fx-c-c/adapters/FENIX_highcharts',
        'highcharts'
    ],
    function (RequireJS, $) {

        var defaultOptions = {
            default: ''
        };

        function ChartCreator() {
            $.extend(true, this, defaultOptions);
        }

        ChartCreator.prototype.render = function (config) {

            if (this._validateInput(config)) {
                this.preloadResources(config);
            }
        };

        ChartCreator.prototype.preloadResources = function ( config ) {

            var baseTemplate = this.getTemplateUrl(),
                adapter =  this.getAdapterUrl(),
                self = this;

            RequireJS([
                 baseTemplate,
                adapter
            ], function (Template, Adapter) {

                self.template = new Template();
                self.adapter = new Adapter();

                //currently both of them are sync fns
                self.template.render(config);
                self.adapter.render(config);
            });
        };

        ChartCreator.prototype.getAdapterUrl = function () {
            //TODO add here adapter discovery logic
            return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/FENIX_highcharts';
        };

        ChartCreator.prototype.getTemplateUrl = function () {
            //TODO add here template discovery logic
            return this.templateUrl ? this.templateUrl : 'fx-c-c/templates/base_template';
        };

        ChartCreator.prototype._validateInput = function () {
            return true;
        };

        return ChartCreator;
    });
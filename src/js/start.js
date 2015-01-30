/*global define*/
define([
        'require',
        'jquery',
        'text!fx-c-c/html/base_template.html',
        'text!fx-c-c/config/base_config.json',
        'fx-c-c/adapters/d3s_highcharts',
        'highcharts'
    ],
    function (RequireJS, $) {

        var defaultOptions = {
            adapter_folder: ''
        };

        function ChartCreator() {
            $.extend(true, this, defaultOptions);
        }

        ChartCreator.prototype.render = function (config) {

            if (this._validateInput(config)) {
                this.preloadResouces(config);
            }
        };

        ChartCreator.prototype.preloadResouces = function ( config ) {

            var baseTemplate = this.templateUrl ? this.templateUrl : 'fx-c-c/html/base_template.html',
                baseConfig = this.configUrl ?  this.configUrl : 'fx-c-c/config/base_config.json',
                adapter =  this.getAdapterUrl(),
                self = this;

            RequireJS([
                'text!' + baseTemplate,
                'text!' + baseConfig,
                adapter
            ], function (Template, Config, Adapter) {

                config.template = Template;
                config.config = JSON.parse(Config);
                new Adapter().render(config);

            });
        };

        ChartCreator.prototype.getAdapterUrl = function () {
            //TODO add here adapter discovery logic
            return this.adapterUrl ? this.adapterUrl : 'fx-c-c/adapters/d3s_highcharts';
        };

        ChartCreator.prototype._validateInput = function () {
            return true;
        };

        return ChartCreator;
    });
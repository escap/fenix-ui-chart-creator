/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-chart/start',
    'fx-filter/start',
    'fx-common/pivotator/fenixtool',
    'text!test/models/UNECA_Population.json',
    'test/models/filter-interaction'

], function (log, $, _, ChartCreator, Filter, FenixTool, Model, FilterModel) {

    'use strict';


    /*UNECA_Education
     UNECA_Population
     UNECA_Health
     UNECA_BalanceOfPayments
     UNECA_Debt
     UNECA_MiningProduction4
     UNECA_Infrastructure
     UNECA_AgricultureProduction3
     ILO_Labour

     Uneca_PopulationNew
     UNECA_Labour				????
     UNECA_MonetaryStatistics
     UNECA_Inflation


     UNECA_Poverty
     UNECA_FinancialFlows
     UNECA_Tourism
     UNECA_PublicFinance



     UNECA_GDP
     UNECA_GDP_NC
     UNECA_ExpenditureGDPCostant
     UNECA_ExpenditureGDPCurrent ???
     UNECA_GDP_USD*/

    var s = {
        CONFIGURATION_EXPORT: "#configuration-export",
        FILTER_INTERACTION: "#filter-interaction",
        CHART_INTERACTION: "#chart-interaction"
    };

    function Test() {
        this.fenixTool = new FenixTool();
    }

    Test.prototype.start = function () {
        log.trace("Test started");
        this._testFilterInteraction();
    };

    Test.prototype._testFilterInteraction = function () {

        //create filter configuration
        var itemsFromFenixTool = this.fenixTool.toFilter(JSON.parse(Model) ,{rowLabel:"Series",columnsLabel: "X-Axis",valuesLabel: "Y-axis"}),
        //FilterModel contains static filter selectors, e.g. show code, show unit
            items = $.extend(true, {}, FilterModel, itemsFromFenixTool);

        log.trace("Filter configuration from FenixTool", items);

        this.filter = new Filter({
            el: s.FILTER_INTERACTION,
            items: items
        });

        this.filter.on("ready", _.bind(function () {

            var config = this._getChartConfigFromFilter();

            config = $.extend(true, {}, {
                type: "line",
                model: JSON.parse(Model),
                el: s.CHART_INTERACTION
            }, config);

            log.trace("Init chart");
            log.trace(config);
            this.chart = new ChartCreator(config);
        }, this));

        this.filter.on("change", _.bind(function () {

            var config = this._getChartConfigFromFilter();

            log.trace("Update chart");
            log.trace(config);

            this.chart.update(config);
        }, this));

    };

    Test.prototype._getChartConfigFromFilter = function () {

        var values = this.filter.getValues(),
            config = this.fenixTool.toChartConfig(values);

        this._printChartConfiguration(config);

        return config;

    };

    Test.prototype._printChartConfiguration = function () {

        var values = this.filter.getValues(),
            config = this.fenixTool.toChartConfig(values);

        //Export configuration
        $(s.CONFIGURATION_EXPORT).html(JSON.stringify(config));

        return config;
    };

    return new Test();
});
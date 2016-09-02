/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-chart/start',
    'fx-filter/start',
    'fx-common/pivotator/fenixtool',
    'text!test/models/highstock.json',
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

    var defaultOptions = {
        //chartType: 'line'
        chartType: 'bubblecircle'
    };

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

        var self = this;

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
                //type: defaultOptions.chartType,
                model: JSON.parse(Model),
                el: s.CHART_INTERACTION,
                config : {
                    tooltip :  { shared : true }
                }
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

    Test.prototype._getConfigBubbleCircle = function(model, config) {
        
        var obj = {};
var incrementalAngle=360/model.rows.length;
var currentAngle=0;
        for (var i in model.rows) {
var Z=model.row[i][0];

var X=Math.cos(currentAngle);
var Y=Math.sin(currentAngle);
obj={x:X,y:Y,name:model.rows[i].join(" " ),z:Z/*country:'?????'*/}


          /*  if (model.data[i][0] && model.data[i][1] && model.data[i][2]) {
                obj = {
                    x: model.data[i][0],
                    y: model.data[i][1],
                    z: model.data[i][2],
                    name: model.rows[i].join(" "),
                    country: ''
                };

               
            }*/

             config.series[0].data.push(obj);
            console.log('model row: ', obj);
        }

        config.tooltip = {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
            '<tr><th>' + model.cols2[0] + ':</th><td>{point.x}</td></tr>' +
            '<tr><th>' + model.cols2[1] + ':</th><td>{point.y}</td></tr>' +
            '<tr><th>' + model.cols2[2] + ':</th><td>{point.z}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        };

        return config;
    };

    return new Test();
});
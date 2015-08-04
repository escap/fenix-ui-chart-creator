/*global requirejs, $*/
requirejs(['../../src/js/paths', '../utils'], function (paths, Utils) {

    'use strict';

    var FENIX_CDN = "//fenixapps.fao.org/repository",
        baseUrl = '../../src/js/';

    // replace placeholders and baseUrl
    paths = Utils.replacePlaceholders(paths, FENIX_CDN);
    paths.baseUrl = baseUrl;

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'jquery', '../utils', 'amplify'], function (ChartCreator, $, Utils) {

        // Chart with scattered data
        $.getJSON("data/afo/scattered_data.json", function (model) {

            // Consistant Timeserie Chart
            var c = new ChartCreator();
            $.when( c.init({
                model: model,
                adapter: {
                    type: "timeserie",
                    filters: {
                        xAxis: 'time',
                        yAxis: 'Element',
                        value: 'value',
                        series: []
                    }
                },
                template: {},
                creator: {}
            })).then(function(creator) {
                var o = {
                    template: {
                        title: "Chart with Timeserie"
                    }
                };
                creator.render(Utils.lineChartOptions(o));
                creator.render(Utils.columnChartOptions(o));
                creator.render(Utils.barChartOptions(o));
            });

            // Scattered Data Chart
            var c2 = new ChartCreator();
            $.when( c2.init({
                model: model,
                adapter: {
                    type: "line",
                    filters: {
                        xAxis: 'time',
                        yAxis: 'Element',
                        value: 'value',
                        series: []
                    }
                },
                template: {},
                creator: {}
            })).then(function(creator) {
                var o = {
                    template: {
                        title: "Chart with scattered data"
                    }
                };
                creator.render(Utils.lineChartOptions(o));
                creator.render(Utils.columnChartOptions(o));
                creator.render(Utils.barChartOptions(o));
            });
        });
    });

});
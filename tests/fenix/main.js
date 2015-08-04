/*global requirejs, $*/
requirejs(['../../src/js/paths', '../utils'], function (paths, Utils) {

    'use strict';

    var FENIX_CDN = "//fenixapps.fao.org/repository",
        baseUrl = '../../src/js/';

    // replace placeholders and baseUrl
    paths = Utils.replacePlaceholders(paths, FENIX_CDN);
    paths.baseUrl = baseUrl;

    requirejs.config(paths);

    function lineChartOptions(options, container) {
        return $.extend({}, options || {}, {
            container: container || Utils.createDiv(),
            creator: {
                chartObj: {
                    chart:{
                        type: "line"
                    },
                    tooltip: {
                        crosshairs: "mixed",
                        shared: true
                    }
                }
            }
        });
    }

    function columnChartOptions(options, container) {
        return $.extend({}, options || {}, {
            container: container || Utils.createDiv(),
            creator: {
                chartObj: {
                    chart:{
                        type: "column"
                    }
                }
            }
        });
    }

    function barChartOptions(options, container) {
        return $.extend({}, options || {}, {
            container: container || Utils.createDiv(),
            creator: {
                chartObj: {
                    chart:{
                        type: "bar"
                    }
                }
            }
        });
    }


    requirejs(['fx-c-c/start', 'jquery', 'amplify'], function (ChartCreator, $) {

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
            })).then(function( creator ) {
                var o = {
                    template: {
                        title: "Chart with Timeserie",
                    }
                };
                creator.render(lineChartOptions(o));
                creator.render(columnChartOptions(o));
                creator.render(barChartOptions(o));
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
            })).then(function( creator ) {
                var o = {
                    template: {
                        title: "Chart with scattered data",
                    }
                };
                creator.render(lineChartOptions(o));
                creator.render(columnChartOptions(o));
                creator.render(barChartOptions(o));
            });
        });
    });

});
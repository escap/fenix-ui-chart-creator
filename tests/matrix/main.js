/*global requirejs*/
requirejs(['../../src/js/paths', '../utils'], function (paths, Utils) {

    'use strict';

    var FENIX_CDN = "//fenixapps.fao.org/repository",
        baseUrl = '../../src/js/';

    // replace placeholders and baseUrl
    paths = Utils.replacePlaceholders(paths, FENIX_CDN);
    paths.baseUrl = baseUrl;

    requirejs.config(paths);


    requirejs(['fx-c-c/start', 'jquery', 'amplify'], function (ChartCreator, $) {

        // http://fenixapps2.fao.org/wds_5.1/rest/crud?payload=%7B%22query%22%3A%22SELECT+country+as+geo%2C+country_label+as+geo_label%2C+variable%2C+group_code%2C+ms%2C+s+FROM+master_aggregation+JOIN+codes_country+on+(country+%3D+country_code)+WHERE+group_code+IN+('1')+AND+country+IN+(+%273%27%2C%2779%27+)+AND+variable+IN+(+%27age%27%2C%27location%27%2C%27gender%27%2C%27population%27+)+ORDER+BY+variable%2C+country%2C+group_code%22%2C%22queryVars%22%3A%7B%22status%22%3A%22s%22%2C%22variables%22%3A%22age%27%2C%27location%27%2C%27gender%22%2C%22query_variables%22%3A%22age%27%2C%27location%27%2C%27gender%27%2C%27population%22%2C%22total%22%3Atrue%2C%22geo_granularity%22%3A%22country%22%2C%22geo%22%3A%223%27%2C%2779%22%2C%22query_geo%22%3A%223%27%2C%2779%22%7D%7D&datasource=voh&collection=&outputType=array
        // Chart with timeseriesz
        $.getJSON("http://fenixapps2.fao.org/wds_5.1/rest/crud?payload=%7B%22query%22%3A%22SELECT+country+as+geo%2C+country_label+as+geo_label%2C+variable%2C+group_code%2C+ms%2C+s+FROM+master_aggregation+JOIN+codes_country+on+(country+%3D+country_code)+WHERE variable IN ('age') AND+country+IN+(+%273%27%2C%2779%27+)+AND+variable+IN+(+%27age%27%2C%27location%27%2C%27gender%27%2C%27population%27+)+ORDER+BY+variable%2C+country%2C+group_code%22%2C%22queryVars%22%3A%7B%22status%22%3A%22s%22%2C%22variables%22%3A%22age%27%2C%27location%27%2C%27gender%22%2C%22query_variables%22%3A%22age%27%2C%27location%27%2C%27gender%27%2C%27population%22%2C%22total%22%3Atrue%2C%22geo_granularity%22%3A%22country%22%2C%22geo%22%3A%223%27%2C%2779%22%2C%22query_geo%22%3A%223%27%2C%2779%22%7D%7D&datasource=voh&collection=&outputType=array", function (model) {

            // Line chart with X-Axis order 'xOrder'
            var c = new ChartCreator();
            $.when(c.init({
                model: model,
                // TODO: the adpter can be moved also in the 'then' function after the promise
                adapter: {
                    // used in init just for MATRIX and FENIX
                    xOrder: 'asc',
                    xDimensions: [3],
                    yDimensions: [2],
                    valueDimensions: 4,
                    seriesDimensions: [1]
                }
            })).then(function(creator) {
                var o = {
                    template: {
                        title: "Chart with Date X-Axis order 'xOrder' = 'asc'"
                    }
                };

                var b = Utils.columnChartOptions(o);
                console.log(b)
                creator.render(b);
            });

        });

        // Chart with timeseries
        $.getJSON("data/data.json", function (model) {

            // Line chart with X-Axis order 'xOrder'
            var c = new ChartCreator();
            $.when(c.init({
                model: model,
                // TODO: the adpter can be moved also in the 'then' function after the promise
                adapter: {
                    // used in init just for MATRIX and FENIX
                    xOrder: 'asc',
                    xDimensions: [0],
                    yDimensions: [3],
                    valueDimensions: 2,
                    seriesDimensions: [1]
                }
            })).then(function(creator) {
                var o = {
                    template: {
                        title: "Chart with Date X-Axis order 'xOrder' = 'asc'"
                    }
                };
                creator.render(Utils.lineChartOptions(o));
            });

        });

        // Chart with no date
        $.getJSON("data/no_date.json", function (model) {

            // Line chart with X-Axis order 'xOrder'
            var c = new ChartCreator();
            $.when(c.init({
                model: model
            })).then(function(creator) {
                var o = {
                    template: {
                        title: "Chart with X-Axis order 'xOrder' = 'desc'"
                    },
                    adapter: {
                        // used in init just for MATRIX and FENIX
                        xOrder: 'desc',
                        xDimensions: [0],
                        yDimensions: [3],
                        valueDimensions: 2,
                        seriesDimensions: [1]
                    }
                };
                creator.render(Utils.columnChartOptions(o));
            });

        });

        // FAOSTAT Rankings workaround
        $.getJSON("data/rankings.json", function (model) {

            // reshape model data (rankings has it's own join data method)
            var data = [];
            model.forEach(function(row) {
                data.push([row[0],row[1], row[2], row[3]]);
                data.push([row[0],row[4], row[5], row[6]]);
            });
            model = data;

            var c = new ChartCreator();
            $.when(c.init({
                model: model
            })).then(function(creator) {
                var o = {
                    template: {
                        title: "FAOSTAT Rankings"
                    }
                };
                creator.render(Utils.columnChartOptions(o));
            });

        });

        // No Data Chart
        $.getJSON("data/nodata.json", function (model) {
            var c = new ChartCreator();
            $.when(c.init({
                model: model
            })).then(function(creator) {
                var o = {
                    template: {
                        title: "Chart with no data values",
                    }
                };
                creator.render(Utils.columnChartOptions(o));
            });
        });

        // PIE
        $.getJSON("data/pie.json", function (model) {
            var c = new ChartCreator();
            $.when(c.init({
                model: model
            })).then(function(creator) {
                var o = {
                    template: {
                        title: "PIE Chart"
                    },
                    adapter: {
                        // TODO: add default PIE dimensions?
                        type: "pie",
                        xDimensions: null,
                        yDimensions: null,
                        valueDimensions: 0,
                        seriesDimensions: [1]
                    }
                };
                creator.render(Utils.pieChartOptions(o));
            });

        });

    });
});
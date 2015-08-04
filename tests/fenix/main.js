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


        // missing date chart
        $.getJSON("data/afo/missing_date.json", function (model) {

            // Timeserie Chart
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
                    creator.render({
                            container: Utils.createDiv(),
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
                        }
                    );
                }
            );

            // Line chart
            c = new ChartCreator();
            $.when( c.init({
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
                    creator.render({
                            container: Utils.createDiv(),
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
                        }
                    );
                }
            );

            // Bar Chart with the same data
            c = new ChartCreator();
            $.when( c.init({
                model: model,
                adapter: {
                    lang: 'EN',
                    type: "",
                    filters: {
                        xAxis: 'time',
                        yAxis: 'Element',
                        value: 'value',
                        series: []
                    }
                },
                template: {},
                creator: {},
            })).then(function( creator ) {
                    creator.render( {
                            container: Utils.createDiv(),
                            creator: {
                                chartObj: {
                                    chart:{
                                        type: "column"
                                    }
                                }
                            }
                        }
                    );
                }
            );



        });




    });
});
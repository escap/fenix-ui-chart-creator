/*global requirejs*/
requirejs(['../../src/js/paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

        /*        amplify.subscribe('fx.component.chart.ready', function () {
         console.log('created!')
         });*/



        $.getJSON("data/data.json", function (model) {

            var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {

                },
                template: {},
                creator: {},
                onReady: renderCharts
            });

            function renderCharts(creator) {

                creator.render({
                    container: "#chart1",
                    template: {
                        title: "Title",
                        subtitle: "Subtitle",
                        footer: "Footer"
                    },
                    adapter: {
                        xAxis: {
                            order: "asc"
                        }
                    }
                });
            };
        });


        $.getJSON("data/no_date.json", function (model) {

            var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {
                    xAxis: {
                        order: "desc"
                    }
                },
                template: {

                },
                creator: {},
                onReady: renderCharts
            });


            function renderCharts(creator) {

                creator.render({
                    container: "#chart2",
                    creator: {
                        chartObj: {
                            chart: {
                                type: "column"
                            }
                        }
                    },

                });
            };
        });


        $.getJSON("data/rankings.json", function (model) {

            // reshape model data (rankings has it's own join data method)
            var data = [];
            model.forEach(function(row) {
                data.push([row[0],row[1], row[2], row[3]]);
                data.push([row[0],row[4], row[5], row[6]]);
            });
            model = data;


            var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {

                },
                template: {
                },
                creator: {},
                onReady: renderCharts
            });


            function renderCharts(creator) {

                var chartOne = creator.render({
                    container: "#chart3",
                    template: {
                    },
                    creator: {
                        chartObj: {
                            chart: {
                                type: "column"
                            }
                        }
                    },
                });
            };
        });


        $.getJSON("data/nodata.json", function (model) {

            var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {

                },
                template: {
                },
                creator: {},
                onReady: renderCharts
            });


            function renderCharts(creator) {

                creator.render({
                    container: "#chart4",
                    creator: {
                        chartObj: {
                            chart: {
                                type: "column"
                            }
                        }
                    },
                    template: {
                        title: "Chart with no data values",
                        subtitle: "subtitle",
                        footer: "Footer"
                    },
                });
            };
        });

        $.getJSON("data/pie.json", function (model) {

            var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {

                },
                template: {
                },
                creator: {},
                onReady: renderCharts
            });


            function renderCharts(creator) {

                creator.render({
                    container: "#chart5",
                    creator: {
                    },
                    adapter: {
                        type: "pie",
                        filters: {
                            value: 0,
                            series: [1]
                        }

                    }
                });
            };
        });


    });
});
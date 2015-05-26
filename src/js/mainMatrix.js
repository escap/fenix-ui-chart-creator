/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

/*        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!')
        });*/

        $.getJSON("tests/resources/matrix/data.json", function (model) {

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

                var chartOne = creator.render({
                    container: "#chartOne"
                });
            };
        });


        $.getJSON("tests/resources/matrix/no_date.json", function (model) {

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

                var chartOne = creator.render({
                    container: "#chartTwo",
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


        $.getJSON("tests/resources/matrix/rankings.json", function (model) {


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
                template: {},
                creator: {},
                onReady: renderCharts
            });


            function renderCharts(creator) {

                var chartOne = creator.render({
                    container: "#chartThree",
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


    });
});
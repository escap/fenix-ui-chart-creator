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
                var chartOne, chartTwo;

                var chartOne = creator.render({
                    container: "#chartOne"
                });

                var chartTwo = creator.render({
                    container: "#chartTwo"
                });

            };

        })
    });
});
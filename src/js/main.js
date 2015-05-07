/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!')
        });

        $.getJSON("tests/resources/AFO_ProductionCapacities.json", function (model) {

            console.log(model)

            ChartCreator.render({
                container: '.content',
                model: ""
            });
        })
    });
});
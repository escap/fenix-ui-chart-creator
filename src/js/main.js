/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

        var chartCreator = new ChartCreator();
        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!')
        })

        $.get("http://faostat3.fao.org/d3s2/v2/msd/resources/uid/UAE_CropProduction10?dsd=true&full=true&order=time", function (model) {

            chartCreator.render({
                container: '.content',
                model: model
            });
        })
    });
});
/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start'], function (ChartCreator) {

        var chartCreator = new ChartCreator();

        $.get("http://faostat3.fao.org/d3s2/v2/msd/resources/uid/UAE_TRADE?dsd=true&full=true", function (model) {
            chartCreator.render({
                container: '.content',
                model: model
            });
        })

    });
});
/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs([ 'fx-c-c/start'], function (ChartCreator) {

        var chartCreator =  new ChartCreator();
        chartCreator.render({simone : true});

    });
});
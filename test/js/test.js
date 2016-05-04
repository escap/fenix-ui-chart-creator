/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'fx-chart/start',
    'test/js/toolbar',
    'test/models/dataFAOSTAT'
], function (log, $, ChartCreator, Toolbar, Model) {

    'use strict';

    function Test() { }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._renderChart();

    };

    Test.prototype._renderChart = function () {

        var myToolbar = new Toolbar();

        myToolbar.init("toolbar", Model.metadata.dsd, {
            onchange: function () {
                var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);

                console.log(optGr.type)

                myRenderer.update(optGr);

            }
        });

        myToolbar.display();

        var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);

        var config = $.extend(true, {}, {
            model : Model,
            el : "#result"
        }, optGr);

        var myRenderer = new ChartCreator(config);

    };

    return new Test();
});

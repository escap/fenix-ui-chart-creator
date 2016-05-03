/*global requirejs, define*/
define([
    'loglevel',
    'fx-c-c/start',
    'test/js/toolbar',
    'test/models/data'
], function (log, ChartCreator, Toolbar, Model) {

    'use strict';

    function Test() { }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._renderOlap();

    };

    Test.prototype._renderOlap = function () {
var self = this;
//console.log("Model initial",Model)
        var myRenderer = new ChartCreator();
        var myToolbar = new Toolbar();

        myToolbar.init("toolbar", Model.metadata.dsd, {
            onchange: function () {
                var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);

                myRenderer.render(self._harmonizeInput($.extend(true, {}, {
                    model : Model,
                    container : "#result"
                }, optGr)));

            }
        });
        myToolbar.display();

        var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);

        var config = this._harmonizeInput($.extend(true, {}, {
            model : Model,
            container : "#result"
        }, optGr));

        myRenderer.render(config);

    };

    Test.prototype._harmonizeInput = function (config) {

        var model = {};

        model.aggregationFn = config.Aggregator;

        model.aggregations = config.AGG.slice(0) || [];
        model.columns = config.COLS.slice(0);
        model.rows = config.ROWS.slice(0);
        model.hidden = config.HIDDEN.slice(0);
        model.values = config.VALS.slice(0);

        model.formatter = config.Formater;
        model.valueOutputType = config.GetValue;
        model.showRowHeaders = config.fulldataformat;
        model.decimals = config.nbDecimal;

        model.showCode = config.showCode;
        model.showFlag = config.showFlag;
        model.showUnit = config.showUnit;

        model.model = Model;
        model.el = "#result";

        console.log("------------")
        console.log(model)

        return model;

    };

    return new Test();
});

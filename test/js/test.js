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

        var myRenderer = new ChartCreator();
        var myToolbar = new Toolbar();

        myToolbar.init("toolbar", Model.metadata.dsd, {
            onchange: function () {
                var optGr = myToolbar.getConfigCOLROW();
                myRenderer.render({
                    adapter: {
                        model : Model,
                        config : optGr
                    },
                    creator : {
                        container : "#result",
                        type : "pie",
                        config : optGr
                    }
                });

            }
        });
        myToolbar.display();

        var optGr = myToolbar.getConfigCOLROW();

        myRenderer.render({
            adapter: {
                model : Model,
                config : optGr
            },
            creator : {
                container : "#result",
                type : "pie",
                config : optGr
            }
        });

    //    log.info(myRenderer);
      //  log.info(Model);
    };

    return new Test();
});

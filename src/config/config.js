if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function () {

    'use strict';

    var selectorPath = "fx-chart/renderers/";

    return {

        renderer: "highcharts",

        pluginRegistry: {
            'highcharts': {
                path: selectorPath + 'highcharts'
            },
            'jvenn': {
                path: selectorPath + 'jvenn'
            }
        }

    }

});
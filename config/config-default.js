/*global define*/

define(function () {

    'use strict';

    var selectorPath = "fx-chart/renderers/";

    return {

        renderer: "highcharts",

        plugin_registry: {
            'highcharts': {
                path: selectorPath + 'highcharts'
            }
        }

    }

});
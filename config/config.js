/*global define*/

define(function () {

    'use strict';

    var selectorPath = "fx-chart/renderers/";

    return {

        renderer: "highcharts",

        pluginRegistry: {
            'highcharts': {
                path: selectorPath + 'highcharts'
            }
        }

    }

});
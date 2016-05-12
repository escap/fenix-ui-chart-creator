/*global define*/
define(function () {

    'use strict';

    var config = {

        paths: {

            'fx-chart/start': './chart',
            'fx-chart/html': '../html',
            'fx-chart/config': '../../config',
            'fx-chart/renderers': './renderers',

            // third party libs
            text: '{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text',
            jquery: '{FENIX_CDN}/js/jquery/2.1.1/jquery.min',
            underscore: '{FENIX_CDN}/js/underscore/1.7.0/underscore.min',
            amplify: '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
            handlebars: '{FENIX_CDN}/js/handlebars/2.0.0/handlebars',
            highcharts: '{FENIX_CDN}/js/highcharts/4.2.4/js/highcharts',
            highcharts_more: '{FENIX_CDN}/js/highcharts/4.2.4/js/highcharts-more',
            highcharts_no_data: '{FENIX_CDN}/js/highcharts/4.2.4/js/modules/no-data-to-display',

            'highcharts-export': '{FENIX_CDN}/js/highcharts/4.2.4/js/modules/exporting',
            //'highcharts-export-csv': 'http://highslide-software.github.io/export-csv/export-csv'
        },

        shim: {
            "highcharts": {
                "exports": "Highcharts",
                "deps": ["jquery"]
            },
            "highcharts-export": {
                "deps": ["highcharts"]
            },
            "highcharts-export-csv": {
                "deps": ["highcharts", "highcharts-export"]
            },
            "highcharts_more": {
                deps: ['highcharts']
            },
            "highcharts_no_data": {
                deps: ['highcharts']
            },
            "amplify": {
                "deps": ["jquery"]
            }
        }
    };

    return config;
});

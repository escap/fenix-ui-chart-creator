/*global define*/
define(function () {

    'use strict';

    var HIGHCHARTS_VERSION = "4.2.5";
    var JVENN_VERSION = "1.8";

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
            highcharts: '{FENIX_CDN}/js/highcharts/' + HIGHCHARTS_VERSION + '/js/highcharts',
            highcharts_more: '{FENIX_CDN}/js/highcharts/' + HIGHCHARTS_VERSION + '/js/highcharts-more',
            highcharts_no_data: '{FENIX_CDN}/js/highcharts/' + HIGHCHARTS_VERSION + '/js/modules/no-data-to-display',
            'highcharts_export': '{FENIX_CDN}/js/highcharts/' + HIGHCHARTS_VERSION + '/js/modules/exporting',
            //'highcharts_export_csv': 'http://highslide-software.github.io/export-csv/export-csv'
            jvenn: '{FENIX_CDN}/js/jvenn/' + JVENN_VERSION + '/src/jvenn.min'
         },

        shim: {
            "highcharts": {
                exports: "Highcharts",
                deps: ["jquery"]
            },
            "highcharts_export": {
                deps: ["highcharts"]
            },
            "highcharts_export_csv": {
                deps: ["highcharts", "highcharts_export"]
            },
            "highcharts_more": {
                deps: ['highcharts']
            },
            "highcharts_no_data": {
                deps: ['highcharts']
            },
            "jvenn": {
                deps: ["jquery"]
            },
            "amplify": {
                deps: ["jquery"]
            }
        }
    };

    return config;
});

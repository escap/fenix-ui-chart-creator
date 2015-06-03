/*global define*/
define(function () {

    'use strict';

    var config = {

        baseUrl: '../../src/js/',

        paths : {
            //'fx-c-c': prefix,
            'fx-c-c/start': './start',
            'fx-c-c/html': '../html',
            'fx-c-c/config': '../../config',
            'fx-c-c/adapters':  './adapters',
            'fx-c-c/templates': './templates',
            'fx-c-c/creators': './creators',

            // third party libs
            text: '//fenixapps.fao.org/repository/js/requirejs/plugins/text/2.0.12/text',
            jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
            highcharts: "//fenixapps.fao.org/repository/js/highcharts/4.0.4/js/highcharts", //'//code.highcharts.com/highcharts',
            underscore: "//fenixapps.fao.org/repository/js/underscore/1.7.0/underscore.min",
            amplify: "//fenixapps.fao.org/repository/js/amplify/1.1.2/amplify.min",
            handlebars: "//fenixapps.fao.org/repository/js/handlebars/2.0.0/handlebars",

            // highcharts plugins
            'highcharts-export': 'http://code.highcharts.com/modules/exporting',
            'highcharts-export-csv': 'http://highslide-software.github.io/export-csv/export-csv'
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
                "deps": ["highcharts", "highcharts-export" ]
            },
             "amplify": {
                "deps": ["jquery"]
            }
        }
    };

    return config;
});

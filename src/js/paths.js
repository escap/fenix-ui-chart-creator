/*global define*/
define(function () {

    var config = {

        paths : {
            'fx-c-c/start' : './start',
            'fx-c-c/html' : '../html',
            'fx-c-c/config' : '../../config',
            'fx-c-c/adapters' : './adapters',
            'fx-c-c/templates' : './templates',
            'fx-c-c/creators' : './creators',
            // third party libs
            text: '//fenixapps.fao.org/repository/js/requirejs/plugins/text/2.0.12/text',
            jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
            highcharts : "//fenixapps.fao.org/repository/js/highcharts/4.0.4/js/highcharts", //'//code.highcharts.com/highcharts',
            underscore: "//fenixapps.fao.org/repository/js/underscore/1.7.0/underscore.min",
            amplify: "//fenixapps.fao.org/repository/js/amplify/1.1.2/amplify.min"
        },

        shim: {
            "highcharts": {
                "exports": "Highcharts",
                "deps": ["jquery"]
            },
             "amplify": {
                "deps": ["jquery"]
            }
        }
    };

    return config;
});

/*global define*/
define(function () {

    var config = {

        paths : {
            'fx-c-c/start' : './start',
            'fx-c-c/html' : '../html',
            'fx-c-c/config' : '../../config',
            'fx-c-c/adapters' : './adapters',
            // third party libs
            text: '//fenixapps.fao.org/repository/js/requirejs/plugins/text/2.0.12/text',
            jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
            highcharts : '//code.highcharts.com/highcharts'
        },

        shim: {
            "highcharts": {
                "exports": "Highcharts",
                "deps": ["jquery"]
            }
        }
    };

    return config;
});

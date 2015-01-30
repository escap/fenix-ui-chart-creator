/*global define*/
define([
        'jquery'
    ],
    function ($) {

        function D3S_Highchart_Adapter() {
            $.extend(true, this, defaultOptions);
        }

        D3S_Highchart_Adapter.prototype.render = function(config){
            console.log(config)
        };

        return D3S_Highchart_Adapter;
    });
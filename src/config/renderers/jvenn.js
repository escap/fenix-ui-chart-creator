if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function () {

    'use strict';

    return {
       displayMode: 'classic',  //default = 'classic' or 'edwards'
       displayStat: 'true', // default = true
       xAxis: {
           categories: []
       },
       series: [],
       exporting: true
    };
});
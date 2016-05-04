/*global define*/
define(function () {

    'use strict';

    return {

        line: {
            chart: {type: 'line'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {crosshair: true},
            yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
            series: []
        },
        column: {
            chart: {type: 'column'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},
            yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
            series: []
        },
        area: {
            chart: {type: 'area'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},
            yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
            series: []
        },
        area_stacked: {
            chart: {type: 'area'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},
            yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {area: {stacking: 'normal'}},
            series: []
        },
        pie: {
            chart: {type: 'pie'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},
            yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {area: {stacking: 'normal'}},
            series: []
        },
        scatter: {
            chart: {type: 'scatter'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},
            yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
            series: []
        },
        bubble: {},
        heatmap: {},
        treemap: {},
        boxplot: {}

    };
});
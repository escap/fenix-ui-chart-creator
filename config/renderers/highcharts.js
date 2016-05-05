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
        boxplot: {

        chart: {
            type: 'boxplot'
        },

        title: {
            text: 'Highcharts Box Plot Example'
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: [/*'1', '2', '3', '4', '5'*/],
            title: {
                text: 'Experiment No.'
            }
        },

        yAxis: {
            title: {
                text: 'Observations'
            }
        },

        series: [/*{
            name: 'Observations',
            data: [
                [760, 801, 848, 895, 965],
                [733, 853, 939, 980, 1080],
                [714, 762, 817, 870, 918],
                [724, 802, 806, 871, 950],
                [834, 836, 864, 882, 910]
            ],
            tooltip: {
                headerFormat: '<em>Experiment No {point.key}</em><br/>'
            }
        }, {
            name: 'Outlier',
          //  color: Highcharts.getOptions().colors[0],
            type: 'scatter',
            data: [ // x, y positions where 0 is the first category
                [0, 644],
                [4, 718],
                [4, 951],
                [4, 969]
            ],
            marker: {
                fillColor: 'white',
                lineWidth: 1,
          //      lineColor: Highcharts.getOptions().colors[0]
            },
            tooltip: {
                pointFormat: 'Observation: {point.y}'
            }
        }*/]

    }

    };
});
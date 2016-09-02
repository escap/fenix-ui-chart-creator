if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function () {

    'use strict';

    return {
	
	
	"highstock":{

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: []
        },
	
	
 spider: {
            chart: {polar:true,type: 'line'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {crosshair: true},
            //yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                useHTML: true
            },
            plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
            series: []
        },
        line: {
            chart: {type: 'line'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {crosshair: true},
            //yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
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
           // yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                useHTML: true
            },
            plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
            series: []
        },
        column_stacked: {
            chart: {type: 'column'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},
           // yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                useHTML: true
            },
            plotOptions: {column: {stacking: 'normal',pointPadding: 0.2, borderWidth: 0}},
            series: []
        },

        area: {
            chart: {type: 'area'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},
          //  yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                useHTML: true
            },
            plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
            series: []
        },
		pyramid: 
      {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
               categories:[],
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side

               categories:[],              
			  opposite: true,
                reversed: false,
              
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) ;
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

         	"series":[],
        
        },
        area_stacked: {
            chart: {type: 'area'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},
            //yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                useHTML: true
            },
            plotOptions: {area: {stacking: 'normal'}},
            series: []
        },
        pie: {
            chart: {type: 'pie'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true},   plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}'
                }
            }
        },
           //yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                useHTML: true
            },
           // plotOptions: {area: {stacking: 'normal'}},
            series: [{data:[]	}]
			,drilldown:{series:[]}
        }, 
		donut: {
            chart: {type: 'pie'},
            title: {text: ''},
            subtitle: {text: ''},
            xAxis: {categories: [], crosshair: true}, plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {enabled: false},
                    showInLegend: true
                }
            },
           //yAxis: {min: 0, title: {text: ''}},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                useHTML: true
            },
           // plotOptions: {area: {stacking: 'normal'}},
            series: []
        },
        scatter: {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
       /* title: {
            text: 'Height Versus Weight of 507 Individuals by Gender'
        },
        subtitle: {
            text: 'Source: Heinz  2003'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Height (cm)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Weight (kg)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor:  '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} cm, {point.y} kg'
                }
            }
        },*/
        series: []
    },
       
        heatmap: {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },


            title: {
                text: ''
            },

            xAxis: {
                categories: [/*'Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'*/]
            },

            yAxis: {
                categories: [/*'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'*/],
                title: null
            },

            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
              //  maxColor: Highcharts.getOptions().colors[0]
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b>  <br><b>' + this.series.yAxis.categories[this.point.y] + '</b><br> Value : <b>' +this.point.value + '</b>';
                }
            },

            series: [{
                name: '',
                borderWidth: 1,
                data: [],
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]

        },
        treemap: {
       
          series: []
    },
        boxplot: {

        chart: {
            type: 'boxplot'
        },

        title: {
            text: ''
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: [/*'1', '2', '3', '4', '5'*/],
            title: {
                text: ''
            }
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: []

    },
bubble:{

        chart: {
            type: 'bubble',polar:false,
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {enabled: false},

        title: {text: ''},

        subtitle: {text: ''},

        xAxis: {
            gridLineWidth: 1,
            title: {text: ''},
            labels: {format: '{value} '},
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 65,
                label: {
                    rotation: 0,
                    y: 15,
                    style: {fontStyle: 'italic'},
                    text: ''
                },
                zIndex: 3
            }]
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {text: ''},
            labels: {format: '{value}'},
            maxPadding: 0.2,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 50,
                label: {
                    align: 'right',
                    style: {fontStyle: 'italic'},
                    text: '',
                    x: -10
                },
                zIndex: 3
            }]
        },
		plotOptions: {series: {dataLabels: {enabled: true,format: '{point.name}'}}},
        series: [{data:[]}]
    },

bubblecirclepixel:{

 chart: {
            backgroundColor: 'white',
            events: {load:function(){
				var myData=this.userOptions.series[0].data;
                var ren=this.renderer;

                

for(var i in myData)
{ ren.circle(myData[i]["x"]*200+500,myData[i]["y"]*100+100,myData[i]["z"]*10).add();}
              //  ren.circle(0,0,150).add();

            }}


        }
    ,
    series: [{data:[]}]
    },
bubblecircleP:{

        chart: {
            type: 'bubble',
			polar:true,
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {enabled: false},

        title: {text: ''},

        subtitle: {text: ''},

        xAxis: {
            gridLineWidth: 1,
            title: {text: ''},
            labels: {format: '{value} '},
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 65,
                label: {
                    rotation: 0,
                    y: 15,
                    style: {fontStyle: 'italic'},
                    text: ''
                },
                zIndex: 3
            }]
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {text: ''},
            labels: {format: '{value}'},
            maxPadding: 0.2,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 50,
                label: {
                    align: 'right',
                    style: {fontStyle: 'italic'},
                    text: '',
                    x: -10
                },
                zIndex: 3
            }]
        },
		plotOptions: {series: {dataLabels: {enabled: true,format: '{point.name}'}}},
        series: [{data:[]},{data:[]},{data:[]},{data:[]}],
		drilldown:{series:[]}
    },
bubblecircle:{

        chart: {
            height:400,width:400,
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {text: ''},

        subtitle: {text: ''},

        xAxis: {
            gridLineWidth: 1,
            title: {text: ''},
            labels: {enabled:false,format: ''/*{value} '*/},
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
               // width: 2,
               // value: 65,
                label: {
                    rotation: 0,
                    y: 15,
                    style: {fontStyle: 'italic'},
                    text: ''
                },
                zhicharIndex: 3
            }]
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: ''
            },
            labels: {enabled:false,
                format: '{value}'
            },
            maxPadding: 0.2,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 50,
                label: {
                    align: 'right',
                    style: {fontStyle: 'italic'},
                    text: '',
                    x: -10
                },
                zIndex: 3
            }]
        },

      

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                }
            }
        },

        series: [{
            
            data:[],
            sizeBy: 'area'
        }],
		drilldown:{series:[]}

    }
    };
});
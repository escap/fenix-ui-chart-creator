/*global define, amplify, console*/
define([
        'jquery',
        'underscore',
        'fx-c-c/config/creators/highcharts_template',
        'highcharts-export',
        //'highcharts-export-csv',
        'amplify'
    ],
    function ($, _, baseConfig) {

        'use strict';

        var defaultOptions = {

                s: {
                    CONTENT: '[data-role="content"]'
                },

                // TODO: handle multilanguage?
                noData: "<div>No data available</div>"

            };
			
		

        function HightchartCreator(config) {

            this.o = $.extend(true, {}, defaultOptions, config);

            this.o.hightchart_template = baseConfig;

            return this;
        }

        HightchartCreator.prototype._validateInput = function () {

            this.o.errors = {};

            //Container
            if (!this.o.hasOwnProperty("container")) {
                this.o.errors.container = "'container' attribute not present.";
            }

            if ($(this.o.container).find(this.o.s.CONTENT) === 0) {
                this.o.errors.container = "'container' is not a valid HTML element.";
            }

            return (Object.keys(this.o.errors).length === 0);
        };

        HightchartCreator.prototype._mergeConfiguration= function(config) {

            if (this.o.chartObj && this.o.chartObj.yAxis && config.chartObj && config.chartObj.yAxis && Array.isArray( config.chartObj.yAxis)) {

                var yAxis = $.extend(true, {}, this.o.chartObj.yAxis);

                for (var i = 0; i < config.chartObj.yAxis.length; i++) {
                    config.chartObj.yAxis[i] = $.extend(true, config.chartObj.yAxis[i], yAxis);
                }

            }

            $.extend(true, this.o, config);

        };

        HightchartCreator.prototype.render = function (config) {
//FIG

            console.log("HCRENDER",config,this)
		
		var defaultRenderOptions={
        chart: {type: 'column'},
        title: {text: ''},
        subtitle: {text: ''},
        xAxis: {
            categories: [/*
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'*/
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [/*{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }*/]
    };

		
		
		for(let i of config.model.cols)
		{defaultRenderOptions.xAxis.categories.push(i.title["EN"]);}
			
			
			for(var i in config.model.rows)
		{
		if(i>20){break;}
		defaultRenderOptions.series.push({name:config.model.rows[i].join(" "),data:config.model.data[i]});
		}
		
		
		console.log(this.o.container)
		
		$(this.o.container).empty();
		alert('ici')
			$(this.o.container).highcharts(defaultRenderOptions);
			
            //render chart
            
			
			
			
			return;

            this._mergeConfiguration(config);

            if (this._validateInput() === true) {

                //Init chart container
                this.$container = $(this.o.container).find(this.o.s.CONTENT);

                if (this._validateSeries() === true) {

                    // create chart
                    this._createChart();

                }else {
                    this.noDataAvailable();
                }
            } else {
                console.error(this.o.errors);
                throw new Error("FENIX hightchart_creator has not a valid configuration");
            }
        };

        HightchartCreator.prototype._createChart = function () {
		console.log("createChart")
            this.o.config = $.extend(true, {}, baseConfig, this.o.chartObj);
			
            this.$container.highcharts(this.o.config);
        };

        HightchartCreator.prototype._onValidateDataError = function () {
            this._showConfigurationForm();
        };

        HightchartCreator.prototype._createConfiguration = function () {
            this.o.config = $.extend(true, {}, baseConfig, this.o.chartObj);
        };

        HightchartCreator.prototype._validateSeries = function() {

            for(var i=0; i < this.o.chartObj.series.length; i++) {
                for(var j=0; j < this.o.chartObj.series[i].data.length; j++) {
                    if (this.o.chartObj.series[i].data[j] !== null) {
                        return true;
                    }
                }
            }

            return false;
        };

        HightchartCreator.prototype.reflow = function () {

            if (typeof this.$container !== 'undefined' && this.$chartRendered) {
                this.$container.highcharts().reflow();
                return true;
            }
        };

        HightchartCreator.prototype.noDataAvailable = function (conf) {

            if (conf.container) {
                //Init chart container
                this.$container = $(conf.container);
            }
            this.$container.html(this.o.noData);
        };

        HightchartCreator.prototype.destroy = function () {

            this.o.container.find( this.o.s.CONTENT).highcharts().destroy();
        };

        return HightchartCreator;
    });
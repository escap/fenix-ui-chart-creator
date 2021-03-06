/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'loglevel',
    'fx-chart/config/errors',
    'fx-chart/config/events',
    'fx-chart/config/config',
    'fx-common/pivotator/start',
    'fx-chart/config/renderers/highcharts',
    'fx-chart/config/renderers/highcharts_shared',
    'highcharts_more',
    "highcharts_no_data",
    "highcharts_export",
    'amplify'
], function ($, _, log, ERR, EVT, C, Pivotator, templates, templateStyle) {

    'use strict';

    function Highcharts(o) {
        log.info("FENIX Highcharts");
        log.info(o);

        $.extend(true, this, C, o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            this._bindEventListeners();

            this._renderHighcharts(this.pivotatorConfig);

            return this;

        } else {
            log.error("Impossible to create Highcharts");
            log.error(valid)
        }
    }

    // API

    /**
     * pub/sub
     * @return {Object} component instance
     */
    Highcharts.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    /**
     * Force redrawing
     * @return {Object} filter instance
     */
    Highcharts.prototype.redraw = function () {

        if (this.chart.length > 0){
            this.chart.highcharts().reflow();
        } else {
            log.warn("Abort redraw");
        }

    };

    Highcharts.prototype.update = function (config) {

        //TODO add validation
        this.type = config.type ? config.type : this.type;
        this._renderHighcharts(config);

    };

    Highcharts.prototype._renderHighcharts = function (config) {
        var model = this.model;

        var chartConfig = templates[this.type];

        if (!config) {
            alert("Impossible to find chart configuration: " + this.type);
        }

        var defaultRenderOptions = $.extend(true, {}, templateStyle, chartConfig);

        var config = $.extend(true, this._populateData(this.type, model, defaultRenderOptions), this.config);

        this.chart = this.el.highcharts(config);

        this._trigger("ready");

    };

    Highcharts.prototype._populateData = function (type, model, config) {

        switch (type.toLowerCase()) {
            //add type process
            case "heatmap":
                break;
            case "pyramid":
                var tempData = [];

                var nameM = "";
                if (model.cols2.length > 2) {
                    nameM = model.cols2[0].join("_")
                }
                var Male = {
                    name: nameM,
                    data: jStat(model.data).col(0).alter(function (x) {
                        //console.log('x',x);
                        return x * -1;
                    })
                };
                var nameF = "";
                if (model.cols2.length > 2) {
                    nameF = model.cols2[1].join("_")
                }
                var Female = {
                    name: nameF,
                    data: jStat(model.data).col(1) || []
                };
                for (var i in model.rows) {
                    //if (i >20) {break;}
                    config.xAxis[0].categories.push(model.rows[i].join("_"));

                    config.xAxis[1].categories.push(model.rows[i].join("_"));
                    // config.xAxis.categories.push("test"+i);

                    /*    var ddata = [model.data[i][0],model.data[i][1]]
                     //console.log("JSTAT",ddata)
                     tempData.push(ddata);
                     */
                }
                config.series.push(Male);
                config.series.push(Female);

                break;
            case "boxplot":

                var tempData = [];
                for (var i in model.rows) {
                    //if (i >20) {break;}
                    config.xAxis.categories.push(model.rows[i].join("_"));
                    // config.xAxis.categories.push("test"+i);

                    var ddata = [jStat(model.data[i]).min() + 0].concat(jStat(model.data[i]).quartiles().concat(jStat(model.data[i]).max()))
                    tempData.push(ddata);

                }

                config.series.push({data: tempData});

                break;
            case "pie2":
                var tempData = [];
                for (var i in model.rows) {
                    if (i > 20) {
                        break;
                    }
                    config.xAxis.categories.push(model.rows[i].join("_"));
                    // config.xAxis.categories.push("test"+i);

                    var ddata = jStat(model.data[i]).sum();
                    //console.log("JSTAT",ddata)
                    tempData.push(ddata);
                    config.series.push({data: tempData});


                }
                break;

            case "pie":
                for (var ii in model.cols) {
                    if (model.cols.hasOwnProperty(ii)) {
                        i = model.cols[ii];

                        config.xAxis.categories.push(i.title[this.lang]);

                    }
                }

                var dataArray = [];

                for (var k in model.rows) {
                    for (var j in config.xAxis.categories) {

                        var dataObj = {};
                        dataObj.y = model.data[k][j];
                        dataObj.name = config.xAxis.categories[j];
                        dataArray.push(dataObj);
                    }

                    config.series.push({
                        name: model.rows[k].join(" "),
                        data: dataArray
                    });
                }

                break;


            default:

                for (var ii in model.cols) {

                    if (model.cols.hasOwnProperty(ii)) {
                        i = model.cols[ii];

                        config.xAxis.categories.push(i.title[this.lang]);

                    }
                }

                for (var i in model.rows) {
                    if (i > 20) {
                        break;
                    }
                    //	 console.log("1 ",config.series)
                    config.series.push({
                        name: model.rows[i].join(" "),
                        data: model.data[i]
                    });
                    //	 console.log("2 ",config.series)

                }
        }
        return config;
    };


    Highcharts.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    // end API

    Highcharts.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        return errors.length > 0 ? errors : valid;

    };

    Highcharts.prototype._initVariables = function () {

        //pub/sub
        this.channels = {};

        this.pivotator = new Pivotator();

    };

    Highcharts.prototype._bindEventListeners = function () {

        //amplify.subscribe(this._getEventName(EVT.SELECTOR_READY), this, this._onSelectorReady);

    };

    Highcharts.prototype._getEventName = function (evt) {

        return this.id.concat(evt);
    };

    //disposition
    Highcharts.prototype._unbindEventListeners = function () {

        //amplify.unsubscribe(this._getEventName(EVT.SELECTOR_READY), this._onSelectorReady);

    };

    Highcharts.prototype.dispose = function () {

        //this.chart.dispose(); change in highchart destroy

        //unbind event listeners
        this._unbindEventListeners();

    };

    // utils

    return Highcharts;
});
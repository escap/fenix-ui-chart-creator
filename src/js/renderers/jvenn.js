/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'loglevel',
    'fx-chart/config/errors',
    'fx-chart/config/events',
    'fx-chart/config/config',
    'fx-common/pivotator/start',
    'fx-chart/config/renderers/jvenn',
    'jvenn',
    'amplify'
], function ($, _, log, ERR, EVT, C, Pivotator, templates) {

    'use strict';

    function JVenn(o) {
        log.info("FENIX JVenn");
        log.info(o);

        $.extend(true, this, C, o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            this._bindEventListeners();

            this._renderJVenn(this.pivotatorConfig);

            return this;

        } else {
            log.error("Impossible to create JVenn");
            log.error(valid)
        }
    }

    // API

    /**
     * pub/sub
     * @return {Object} component instance
     */
    JVenn.prototype.on = function (channel, fn, context) {
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
    JVenn.prototype.redraw = function () {

        if (this.chart.length > 0){
           // this.chart.highcharts().reflow();
        } else {
            log.warn("Abort redraw");
        }

    };

    JVenn.prototype.update = function (config) {

        //TODO add validation
        this.type = config.type ? config.type : this.type;
        this._renderJVenn(config);

    };

    JVenn.prototype._renderJVenn = function (config) {
        var model = this.model;

        if (!config) {
            alert("Impossible to find chart configuration: " + this.type);
        }

        var config = $.extend(true, this._populateData(model, templates), this.config);

        this.chart = this.el.jvenn(config);

        this._trigger("ready");

    };

    JVenn.prototype._populateData = function (model, config) {

        for (var ii in model.cols) {
            if (model.cols.hasOwnProperty(ii)) {
                var i = model.cols[ii];


               // console.log(i.title[this.lang]);
                config.xAxis.categories.push(i.title[this.lang]);

            }
        }

        var dataArray = [];

        for (var k in model.rows) {
            //console.log();
            for (var j in config.xAxis.categories) {

               // var dataObj = {};
               // dataObj.y = model.data[k][j];
               // dataObj.name = config.xAxis.categories[j];
                dataArray.push(config.xAxis.categories[j]);
            }

            config.series.push({
                name: model.rows[k].join(" "),
                data: dataArray
            });
        }

       // console.log("========================== JVENN CONFIG ");
       // console.log(config);

        return config;
    };


    JVenn.prototype._trigger = function (channel) {

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

    JVenn.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        return errors.length > 0 ? errors : valid;

    };

    JVenn.prototype._initVariables = function () {

        //pub/sub
        this.channels = {};

        this.pivotator = new Pivotator();

    };

    JVenn.prototype._bindEventListeners = function () {

        //amplify.subscribe(this._getEventName(EVT.SELECTOR_READY), this, this._onSelectorReady);

    };

    JVenn.prototype._getEventName = function (evt) {

        return this.id.concat(evt);
    };

    //disposition
    JVenn.prototype._unbindEventListeners = function () {

        //amplify.unsubscribe(this._getEventName(EVT.SELECTOR_READY), this._onSelectorReady);

    };

    JVenn.prototype.dispose = function () {

        //this.chart.dispose(); change in highchart destroy

        //unbind event listeners
        this._unbindEventListeners();

    };

    // utils

    return JVenn;
});
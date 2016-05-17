/*global define, amplify*/
define([
    'jquery',
    'require',
    'underscore',
    'loglevel',
    'fx-chart/config/errors',
    'fx-chart/config/events',
    'fx-chart/config/config',
    'fx-chart/config/config-default',
    'fx-common/pivotator/start',
	  'fx-common/pivotator/fenixtool',
    'amplify'
], function ($, require, _, log, ERR, EVT, C, CD, Pivotator,fenixtool) {
 'use strict';
    function Chart(o) {
        log.info("FENIX Chart");
        log.info(o);
        $.extend(true, this, CD, C, {initial: o});
		
		//console.log("this.initial",this.initial)
		
        this._parseInput(o);
        var valid = this._validateInput();
        if (valid === true) {
            this._initVariables();
            this._bindEventListeners();
            this._preloadPluginScript();
            return this;
        } else {
            log.error("Impossible to create Chart");
            log.error(valid)
        }
    }

	  Chart.prototype.update = function (config) {
		
		this._parseInputUpdate(config);
		var myPivotatorConfig=this.fenixTool.parseInut(this.initial.model.metadata.dsd, this.pivotatorConfig);
		
        this.chart.model = this.pivotator.pivot(this.initial.model, myPivotatorConfig);
	
        this.chart.update(config);
    };


	
    // API
    /**
     * pub/sub
     * @return {Object} Chart instance
     */
    Chart.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {this.channels[channel] = [];}
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

      Chart.prototype._trigger = function (channel) {
        if (!this.channels[channel]) {return false;}
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };
    // end API
    Chart.prototype._parseInput = function () {
  
		this._parseInputUpdate(this.initial)
    };

	
	   Chart.prototype._parseInputUpdate = function (param) {
        this.id = param.id;
        this.$el = $(param.el);
        this.type = param.type;
        this.model = param.model;
        var pc = {};
		pc.inputFormat=param.inputFormat || "raw";
        pc.aggregationFn = param.aggregationFn;
        pc.aggregations = param.aggregations || [];
        pc.hidden = param.hidden || [];
        pc.columns = param.x;
        pc.values = param.y || ["value"];
        pc.rows = param.series;
        pc.formatter = param.formatter || "value";
        pc.valueOutputType =param.valueOutputType;
        pc.showRowHeaders = param.showRowHeaders || false;
        pc.decimals = param.decimals || 2;
        pc.showCode = param.showCode || false;
        pc.showFlag = param.showFlag || false;
        pc.showUnit = param.showUnit || false;
        // add more pivotator config
        this.pivotatorConfig = pc;
        this.renderer = param.renderer || C.renderer || CD.renderer;
        this.lang = param.lang || 'EN';
    };
	
	
    Chart.prototype._validateInput = function () {
        var valid = true,errors = [];
        //set Chart id
        if (!this.id) {
            window.fx_chart_id >= 0 ? window.fx_chart_id++ : window.fx_chart_id = 0;
            this.id = String(window.fx_chart_id);
            log.warn("Impossible to find Chart id. Set auto id to: " + this.id);
        }
        if (!this.$el) {
            errors.push({code: ERR.MISSING_CONTAINER});
            log.warn("Impossible to find Chart container");
        }
        //Check if $el exist
        if (this.$el.length === 0) {
            errors.push({code: ERR.MISSING_CONTAINER});
            log.warn("Impossible to find box container");
        }
        //add validation
        return errors.length > 0 ? errors : valid;

    };

    Chart.prototype._initVariables = function () {
        //pub/sub
        this.channels = {};
        this.pivotator = new Pivotator();
		this.fenixTool=new fenixtool();
    };

    Chart.prototype._bindEventListeners = function () {

        //amplify.subscribe(this._getEventName(EVT.SELECTOR_READY), this, this._onSelectorReady);

    };

    // Preload scripts

    Chart.prototype._getPluginPath = function (name) {

        var registeredSelectors = $.extend(true, {}, this.plugin_registry),
            path;

        var conf = registeredSelectors[name];

        if (!conf) {
            log.error('Registration not found for "' + name + ' plugin".');
        }

        if (conf.path) {
            path = conf.path;
        } else {
            log.error('Impossible to find path configuration for "' + name + ' plugin".');
        }

        return path;

    };

    Chart.prototype._preloadPluginScript = function () {
        var paths = [];
        paths.push(this._getPluginPath(this.renderer));
        log.info("Chart path to load");
        log.info(paths);
        //Async load of plugin js source
        require(paths, _.bind(this._preloadPluginScriptSuccess, this));
    };

    Chart.prototype._preloadPluginScriptSuccess = function () {
        log.info('Plugin script loaded successfully');
        this._renderChart();
    };

    Chart.prototype._renderChart = function () {
		//FIG
		//console.log("param pivot 1",this.model, this.pivotatorConfig);
        var Renderer = this._getRenderer(this.renderer);
		var myPivotatorConfig=this.fenixTool.parseInut(this.model.metadata.dsd, this.pivotatorConfig);
		
        var    model = this.pivotator.pivot(this.model,myPivotatorConfig);
        var config = $.extend(true, {}, {
            pivotatorConfig: this.pivotatorConfig,
            el: this.$el,
            model: model,
            lang: this.lang,
            type: this.type
        });
        this.chart = new Renderer(config);
        this._trigger("ready");
    };

    Chart.prototype._getEventName = function (evt) {return this.id.concat(evt);};

    Chart.prototype._getRenderer = function (name) {return require(this._getPluginPath(name));};

    //disposition
    Chart.prototype._unbindEventListeners = function () {
        //amplify.unsubscribe(this._getEventName(EVT.SELECTOR_READY), this._onSelectorReady);
    };

    Chart.prototype.dispose = function () {
		this.chart.dispose();
		//unbind event listeners
        this._unbindEventListeners();
    };
    // utils
	
	Chart.prototype.exportConf=function(FX,optGr)
	{
		
	
		var FXmod=this.fenixTool.convertFX(FX,optGr);
		
		
			function getListDim(arr,opt,FXmod){
						var showCode=opt.showCode;
						var ret=[];
						for (var i in arr){
								console.log("this",arr,i,FXmod.dimensions[arr[i]])
								ret.push(FXmod.dimensions[arr[i]].code)
							}
							return ret
					}
		
		
		var ret={
			inputFormat:"fenixtool",
			"aggregations":getListDim(optGr.aggregation,optGr,FXmod),
			"x":getListDim(optGr.x,optGr,FXmod),
			"series":getListDim(optGr.series,optGr,FXmod),
			"hidden":getListDim(optGr.hidden,optGr,FXmod),
			"y":optGr.y,
			"aggregationFn":optGr.aggregationFn,
			"valueOutputType":optGr.valueOutputType,
			"formatter":optGr.formatter,
			"decimals":optGr.decimals,
			"showUnit":optGr.showUnit,
			"showFlag":optGr.showFlag,
			"showCode":optGr.showCode,
			"type":optGr.type};
		return ret;
	}
	
    Chart.prototype._callSelectorInstanceMethod = function (name, method, opts1, opts2) {
        var Instance = this.chart;
        if ($.isFunction(Instance[method])) { return Instance[method](opts1, opts2);} 
		else {log.error(name + " selector does not implement the mandatory " + method + "() fn");}
    };
    return Chart;
});
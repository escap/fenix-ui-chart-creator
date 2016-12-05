/*global define*/

define(function () {

    'use strict';

    return {

        format: {

            selector: {
                id: 'dropdown',
                source: [
                    {value: "value", label: "Raw Value"}
                ],
                config: {
                    maxItems: 1
                },
                default: ['value']
            },

            template: {
                title: "Format"
            }
        },

        show: {

            selector: {
                id: "input",
                type: "checkbox",
                source: [
                    {value: "unit", label: "Unit"},
                    {value: "flag", label: "Flag"},
                    {value: "code", label: "Code"}
                ]
            },

            template: {
                title: "Show"
            }
        },

        typeOfChart: {

            selector: {
                id: 'dropdown',
                source: [
                    {value: "line", label: "Line"},	 {value: "spider", label: "Spider"},		
					{value: "pyramid", label: "Pyramid"},
                    {value: "column", label: "Columns"},
                    {value: "column_stacked", label: "Stacked columns"},
                    {value: "area", label: "Area"},
                    {value: "area_stacked", label: "Stacked area"},
                    {value: "pie", label: "Pie"},
					{value: "donut", label: "Donut"},
                    {value: "scatter", label: "Scatter"},
                    {value: "bubble", label: "Bubble"}, 
                    {value: "bubblecircle", label: "Bubble Circle"},
					{value: "bubblecircleP", label: "Bubble Circle Polar"},
                    {value: "heatmap", label: "Heatmap"},
                    {value: "treemap", label: "Treemap"},
                    {value: "boxplot", label: "Boxplot"}

                ],
                config: {
                    maxItems: 1
                },
                default: ['bubblecircleP']
            },

            template: {
                title: "Type of chart"
            }
        }


    }

});
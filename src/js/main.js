/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

/*        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!')
        });*/

        $.getJSON("tests/resources/GHG_test_data.json", function (model) {

            var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {
                    filters: ['DomainCode', 'TableType', 'GUNFCode'],
                    x_dimension: 'Year',
                    y_dimension: 'GUNFItemNameE',
                    value: 'GValue'
                },
                template: {},
                creator: {},
                onReady: renderCharts
            });


            function renderCharts(creator) {
                var chartOne, chartTwo;

                var chartOne = creator.render({
                    container: "#chartOne",
                    creator: {
                    },
                    series: [
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            value: 'GValue',
                            type: 'column',
                            color: 'maroon',
                            name: 's1'
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            name: 's2',
                            value: 'GValue',
                            type: 'line'
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '1712'
                            },
                            value: 'PerDiff',
                            name: 's3',
                            type: 'scatter'
                        }
                    ]
                });

                var chartTwo = creator.render({
                    container: "#chartTwo",
                    creator: {
                        chartObj: {
                            chart:{
                                type: "column"
                            }
                        }
                    },
                    series: [
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            value: 'GValue',
                            type: 'line',
                            color: 'maroon',
                            name: 's1'
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            name: 's2',
                            value: 'GValue',
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '1712'
                            },
                            value: 'PerDiff',
                            name: 's3',
                            type: 'scatter'
                        }
                    ]
                });

            };

        })
    });
});
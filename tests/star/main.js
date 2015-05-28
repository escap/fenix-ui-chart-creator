/*global requirejs*/
requirejs(['../../src/js/paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

/*        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!')
        });*/

        $.getJSON("data/GHG_test_data.json", function (model) {

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
        });


        function renderCharts(creator) {

            creator.render({
                container: "#chart1",
                creator: {
                },
                adapter: {
                    xAxis: {
                        order: "ASC"
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
                        }
                    ]
                }
            });

            creator.render({
                container: "#chart2",
                noData: "<div>No data Available</div>",
                creator: {
                    chartObj: {
                        chart:{
                            type: "column"
                        }
                    }
                },
                adapter: {
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
                }
            });


            creator.render({
                container: "#chart3",
                noData: "<div>No data Available</div>",
                creator: {
                    chartObj: {
                        chart:{
                            type: "column"
                        }
                    }
                },
                adapter: {
                    type: "pie",
                    series: [
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            value: 'GValue',

                            // this is just for the pie and it's used to create the series name
                            sliceName: ['GUNFItemNameE', 'Year']
                        }
                    ]
                }
            });
        };



    });
});
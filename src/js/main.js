/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

/*        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!')
        });*/

        $.getJSON("tests/resources/GHG_test_data.json", function (model) {

            var creator = new ChartCreator(),
                chartOne;

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


            function renderCharts() {
                chartOne = creator.render({
                    container: "#monChart2Test",
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

                chartOne = creator.render({
                    container: "#monChart2TestOld",
                    series: [
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '1712'
                            },
                            type: 'line'
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '1712'
                            },
                            value: 'GValue',
                            type: 'line',
                            color: 'color',
                            name: 's2c'
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            type: 'scatter'
                        }
                    ]
                });
            };

        })
    });
});
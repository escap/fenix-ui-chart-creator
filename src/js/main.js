/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!')
        });

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
                creator: {}
            });

            window.setTimeout(function () {

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
                            name: 'stocazzo2'
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            name: 'stocazzo3',
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
                            name: 'stocazzo',
                            type: 'scatter'
                        }
                    ]
                });

/*                chartOne = creator.render({
                    container: "#monChart2TestOld",
                    series: [
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '1712'
                            },
                            type: 'scatter'
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            type: 'line'
                        },
                        {
                            filters: {
                                'DomainCode': 'GAS',
                                'TableType': 'activity',
                                'GUNFCode': '5057'
                            },
                            type: 'column'
                        }
                    ]
                });*/


            }, 1000)


        })
    });
});
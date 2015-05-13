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
                    y_dimension: 'GValue'
                },
                template: {},
                creator: {}
            });

            window.setTimeout(function () {

                chartOne = creator.render({
                    container: "#monChart2Test",
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
                                'GUNFCode': '1755'
                            },
                            type: 'column'
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


            }, 1000)


        })
    });
});
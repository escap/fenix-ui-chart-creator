/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!')
        });

        $.getJSON("tests/resources/GHG_test_data.json", function (model) {

           var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {
                    filters: ['DomainCode', 'TableType', 'ItemCode']
                },
                template: {},
                creator: {}
            });

            creator.render({
                container: "#monChart2Test",
                series: [
                    {
                        filters: {
                            'DomainCode': 'QC',
                            'TableType': 'Emissions',
                            'ItemCode': '27'
                        },
                        type: 'line'
                    },
                    {
                        filters: {
                            'DomainCode': 'QC',
                            'TableType': 'Emissions',
                            'ItemCode': '39'
                        },
                        type: 'column'
                    }
                ]
            });


        })
    });
});
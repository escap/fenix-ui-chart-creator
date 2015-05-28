/*global requirejs*/
requirejs(['../../src/js/paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

        $.getJSON("data/afo/missing_date.json", function (model) {
        //$.getJSON("data/afo/AFO_AfricaPITDataLang_nig_eth.json", function (model) {
        //$.getJSON("tests/resources/AFO_AfricaPITDataLang.json", function (model) {
       // $.getJSON("tests/resources/afo/AFO_ProductionCapacities.json", function (model) {

            var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {
                    type: "timeserie",
                    filters: {
                        xAxis: 'time',
                        yAxis: 'Element',
                        value: 'value',
                        series: []
                    }
                },
                template: {},
                creator: {},
                onReady: renderChart1
            });

            var creator2 = new ChartCreator();

            creator2.init({
                model: model,
                adapter: {
                    lang: 'EN',
                    type: "",
                    filters: {
                        xAxis: 'time',
                        yAxis: 'Element',
                        value: 'value',
                        series: []
                    }
                },
                template: {},
                creator: {},
                onReady: renderChart2,
            });

            function renderChart1() {

                creator.render(
                    {
                        container: "#chart1",
                        creator: {
                            chartObj: {
                                chart:{
                                    type: "line"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    }
                );
            }

            function renderChart2(creator) {

                creator.render(
                    {
                        container: "#chart2",
                        creator: {
                            chartObj: {
                                chart:{
                                    type: "column"
                                }
                            }
                        }
                    }
                );
            }
        });

    });
});
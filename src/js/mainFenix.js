/*global requirejs*/
requirejs(['./paths'], function (paths) {

    requirejs.config(paths);

    requirejs(['fx-c-c/start', 'amplify'], function (ChartCreator) {

/*        amplify.subscribe('fx.component.chart.ready', function () {
            console.log('created!');
        });*/

        // filtering data
        /*
         $.getJSON("tests/resources/AFO_AfricaPITDataLang.json", function (model) {
         var creator = new ChartCreator();
         console.log(model);
         // create serie
         var data = [];
         for(var i in model.data) {
         if (model.data[i][0] === "10210" && (model.data[i][2] === "NIG" || model.data[i][2] === "ETH")) {
         data.push(model.data[i]);
         }
         }
         model.data = data;
         $("body").append(JSON.stringify(model));
         });
         */

        // $.getJSON("tests/resources/afo/AFO_AfricaPITDataLang_nig_eth.json", function (model) {
        //$.getJSON("tests/resources/AFO_AfricaPITDataLang.json", function (model) {
        $.getJSON("tests/resources/afo/AFO_ProductionCapacities.json", function (model) {

            var creator = new ChartCreator();

            creator.init({
                model: model,
                adapter: {
                    filters: {
                        xAxis: 'time',
                        yAxis: 'item',
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
                    filters: {
                        xAxis: 'geo',
                        yAxis: 'item',
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
                        container: "#chartOne",
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

            function renderChart2(creator) {

                creator.render(
                    {
                        container: "#chartTwo",
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
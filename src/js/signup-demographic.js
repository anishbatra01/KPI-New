initCharts();

function initCharts() {
    am5.ready(function () {
        // am5.addLicense("AM5C329334656");
        am4core.addLicense("CH329334656");
        am4core.addLicense("MP329334656");



        am4core.ready(function () {

            // spiderweb charts
            am4core.addLicense("CH329334656");
            am4core.addLicense("MP329334656");

            var chart = am4core.create("chart_spider_web", am4charts.RadarChart);
            am4core.useTheme(am4themes_animated);

            /* Add data */
            chart.data = [{
                "number": "10",
                "rxuser": 501,
                "enrolled": 300,
            }, {
                "number": "20",
                "rxuser": 301,
                "enrolled": 250,
            }, {
                "number": "30",
                "rxuser": 223,
                "enrolled": 200,
            }, {
                "number": "40",
                "rxuser": 300,
                "enrolled": 223,
            }, {
                "number": "50",
                "rxuser": 422,
                "enrolled": 244,
            }, {
                "number": "60",
                "rxuser": 200,
                "enrolled": 140,
            }];

            chart.colors.list = [
                am4core.color("#38D6AE"),
                am4core.color("#576877"),
                am4core.color("#BFBFBF"),
                am4core.color("#061A32"),
                am4core.color("#92EBD7"),
                am4core.color("#B61D69"),
            ];
            /* Create axes */

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "number";
            categoryAxis.fontWeight = "700";
            categoryAxis.fontSize = ".875rem";

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
            valueAxis.renderer.axisFills.template.fillOpacity = 0.05;
            valueAxis.renderer.gridType = "polygons";
            valueAxis.fontWeight = "700";
            valueAxis.fontSize = ".875rem";

            valueAxis.renderer.grid.template.strokeOpacity = 1;
            valueAxis.renderer.grid.template.stroke = am4core.color("#BFBFBF");
            valueAxis.title.fontWeight = "700";
            
            /* Create and configure series */

            var series = chart.series.push(new am4charts.RadarSeries());
            series.dataFields.valueY = "rxuser";
            series.dataFields.categoryX = "number";
            series.name = "PX POPULATION";
            series.strokeWidth = 2;
            series.fillOpacity = 0.6;
            // series.template.fill = chart.colors.getIndex(2);
            // series.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";

            var series2 = chart.series.push(new am4charts.RadarSeries());
            series2.dataFields.valueY = "enrolled";
            series2.dataFields.categoryX = "number";
            series2.name = "ENROLLED USERS";
            series2.strokeWidth = 2;
            series2.fillOpacity = 0.6;

            chart.legend = new am4charts.Legend();
            chart.legend.useDefaultMarker = true;
            chart.legend.fontSize = '0.75rem';
            chart.legend.fontWeight = '700';
            var marker = chart.legend.markers.template.children.getIndex(0);
            marker.cornerRadius(12, 12, 12, 12);

            var circleBullet = series.bullets.push(new am4charts.CircleBullet());
            var circleBullet2 = series2.bullets.push(new am4charts.CircleBullet());
            circleBullet.circle.stroke = am4core.color("#fff");
            circleBullet.circle.strokeWidth = 2;

            circleBullet2.circle.stroke = am4core.color("#fff");
            circleBullet2.circle.strokeWidth = 2;




            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create map instance

            var chart = am4core.create("map_chart", am4maps.MapChart);
            chart.maxZoomLevel = 1;
            chart.paddingLeft = 0;
            chart.paddingRight = 0;


            // Set map definition
            chart.geodata = am4geodata_usaLow;

            // Set projection
            chart.projection = new am4maps.projections.AlbersUsa();

            chart.chartContainer.wheelable = false;
            chart.seriesContainer.draggable = false;

            chart.seriesContainer.background = am4core.color("#ff00000");

            // Create map polygon series
            var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
            polygonSeries.useGeodata = true;
            polygonSeries.calculateVisualCenter = true;

            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.fill = am4core.color("#EDEDED");
            polygonTemplate.stroke = am4core.color("#EDEDED");
            // polygonTemplate.fillOpacity = .2;

            // polygonSeries.mapPolygons.template.setAll({
            //   fill: root.interfaceColors.get("alternativeBackground"),
            //   fillOpacity: 0.1,
            //   strokeOpacity: 0
            // });

            // Load data when map polygons are ready
            chart.events.on("ready", loadStores);

            var shadow = chart.filters.push(new am4core.DropShadowFilter());
            shadow.dx = 5;
            shadow.dy = 5;
            shadow.blur = 18;
            shadow.color= am4core.color("#888888")

            var shadow2 = chart.filters.push(new am4core.DropShadowFilter());
            shadow2.dx = -5;
            shadow2.dy = -5;
            shadow2.blur = 18;
            shadow2.color= am4core.color("#888888")
            // Loads store data
            function loadStores() {
                var loader = new am4core.DataSource();
                loader.url = "./store-data.json";
                loader.events.on("parseended", function (ev) {
                    setupStores(ev.target.data);
                });
                loader.load();
            }

            // Creates a series

            function createSeries(heatfield) {
                var series = chart.series.push(new am4maps.MapImageSeries());
                series.dataFields.value = heatfield;

                var template = series.mapImages.template;
                template.verticalCenter = "middle";
                template.horizontalCenter = "middle";
                template.propertyFields.latitude = "lat";
                template.propertyFields.longitude = "long";
                template.tooltipHTML = "<div style='font-size:16px; font-weight:700; margin-bottom:4px'>{name}:</div><div style='font-size:14px;''>{stores} Sign-ups</div>";

                var circle = template.createChild(am4core.Circle);
                circle.radius = 10;
                circle.fillOpacity = 0.3;
                circle.verticalCenter = "middle";
                circle.horizontalCenter = "middle";
                circle.nonScaling = true;
                circle.fill = am4core.color('#38D6AE');
                
                // circle.tooltipText = "{stores}";
                // circle.tooltipText = "{stores}";

                var circle1 = template.createChild(am4core.Image);
                circle1.href = "./dot.png";
                // circle1.width = 8;
                circle1.height = 5;
                circle1.nonScaling = true;
                // circle1.tooltipText = "{stores}";
                circle1.horizontalCenter = "middle";
                circle1.verticalCenter = "middle";

                // var label = template.createChild(am4core.Label);
                // label.text = "{stores}";
                // label.fill = am4core.color("#1A745D");
                // label.verticalCenter = "middle";
                // label.horizontalCenter = "middle";
                // label.nonScaling = true;
                // label.fontSize='.875rem';
                // label.fontWeight='800';
                // label.y = -12;

                var heat = series.heatRules.push({
                    target: circle,
                    property: "radius",
                    min: 15,
                    max: 30
                });

                var heat1 = series.heatRules.push({
                    target: circle1,
                    property: "height",
                    min: 5,
                    max: 15
                });
                return series;
            }

            var regionalSeries = {};
            var currentSeries;

            function setupStores(data) {

                // Init country-level series
                regionalSeries.US = {
                    markerData: [],
                    series: createSeries("stores")
                };

                // Set current series
                currentSeries = regionalSeries.US.series;

                // Process data
                am4core.array.each(data.query_results, function (store) {

                    // Get store data
                    var store = {
                        state: store.MAIL_ST_PROV_C,
                        long: am4core.type.toNumber(store.LNGTD_I),
                        lat: am4core.type.toNumber(store.LATTD_I),
                        location: store.co_loc_n,
                        city: store.mail_city_n,
                        count: am4core.type.toNumber(store.count)
                    };

                    // Process state-level data
                    if (regionalSeries[store.state] == undefined) {
                        var statePolygon = polygonSeries.getPolygonById("US-" + store.state);
                        if (statePolygon) {

                            // Add state data
                            regionalSeries[store.state] = {
                                target: store.state,
                                type: "state",
                                name: statePolygon.dataItem.dataContext.name,
                                count: store.count,
                                stores: 1,
                                lat: statePolygon.visualLatitude,
                                long: statePolygon.visualLongitude,
                                state: store.state,
                                markerData: []
                            };
                            regionalSeries.US.markerData.push(regionalSeries[store.state]);

                        }
                        else {
                            // State not found
                            return;
                        }
                    }
                    else {
                        regionalSeries[store.state].stores++;
                        regionalSeries[store.state].count += store.count;
                    }

                });

                regionalSeries.US.series.data = regionalSeries.US.markerData;
            }
        });
    }); // end am5.ready()
}

function drawAgeGroupCharts() {

}
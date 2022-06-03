const BASE_WIDTH = 1512
initCharts()

function initCharts() {
    am5.ready(function () {
        am5.addLicense("AM5C329334656");
        drawTimeOfDayChart()
        drawBounceRateChart()
        drawContentDrivingChart()
        drawAudienceChart()
        drawPageViewChart1(1)
        drawPageViewChart1(2)
        drawPageViewChart1(3)
    }); // end am5.ready()
}


function drawTimeOfDayChart() {
    var root = am5.Root.new("timeOfDayChart");
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    var container = root.container.children.push(am5.Container.new(root, {
        layout: root.verticalLayout,
        width: am5.percent(100),
        height: am5.percent(95),
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50),
    }));

    var chart = container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        pinchZoomX: false,
        paddingLeft: -10,
        paddingRight: 0,
        layout: root.verticalLayout
    }));

    chart.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
        am5.color(0xBFBFBF),
        am5.color(0x061A32),
        am5.color(0x92EBD7),
        am5.color(0xB61D69),
    ]);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));

    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        fontSize: 10,
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
    });

    var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });
    yRenderer.labels.template.setAll({
        visible: false
    });

    yRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
    });

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "country",
        renderer: xRenderer,
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
    }));

    // Tooltip 
    var tooltip = am5.Tooltip.new(root, {
        autoTextColor: false,
        labelText: "{categoryX}: {valueY}"
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });

    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "TIME OF THE DAY",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "country",
        tooltip
    }));

    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationY: 0.5,
            sprite: am5.Label.new(root, {
                text: "{valueY}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: am5.p50,
                centerX: am5.p50,
                populateText: true,
                fontSize: '0.75rem',
                fontWeight:700
            })
        });
    });

    series.columns.template.setAll({ cornerRadiusTL: 3, cornerRadiusTR: 3 });
    series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    var data = [{
        country: "9 AM-12 PM",
        value: 10,
    },
    {
        country: "12PM - 3PM",
        value: 14,
    },
    {
        country: "3PM - 6PM",
        value: 3,
    },
    {
        country: "6PM - 9PM",
        value: 19,
    },
    {
        country: "9PM - 12AM",
        value: 13,
    }];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    root.events.on("frameended", sizeFix);

    function sizeFix() {
        var width = jQuery(window).width() / BASE_WIDTH;
        var ff = .875 * width;

        if (jQuery(window).width() > 1920) {
            ff = .7 * width;
        }
        if (jQuery(window).width() > 3000) {
            ff = .5 * width;
        }
        if (jQuery(window).width() > 5000) {
            ff = .3 * width;
        }

        chart.bottomAxesContainer.setAll({
            paddingTop: 10 * width
        })

        // xRenderer = xAxis.get("renderer");
        // yRenderer = yAxis.get("renderer");

        // yRenderer.minGridDistance = 1;
        xRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        // yRenderer.labels.template.setAll({
        //     fontSize: ff + 'rem',
        // });

        tooltip.label.setAll({
            fontSize: ff + 'rem'
        });
    }

    var previousBulletSprites = [];
    xAxis.events.on("boundschanged", cursorMoved);

    function cursorMoved() {

        var width = jQuery(window).width() / BASE_WIDTH;
        var ff = .875 * width;
        if (jQuery(window).width() > 1920) {
            ff = .7 * width;
        }
        if (jQuery(window).width() > 3000) {
            ff = .5 * width;
        }
        if (jQuery(window).width() > 5000) {
            ff = .3 * width;
        }
        // for(var i = 0; i < previousBulletSprites.length; i++) {
        //   previousBulletSprites[i].unhover();
        // }
        previousBulletSprites = [];
        chart.series.each(function (series) {
            jQuery.each(series._dataItems, function (index, dataItem) {
                // series._dataItems.each(function(dataitem){
                // console.log(dataItem);
                if (dataItem) {
                    if (typeof dataItem.bullets !== 'undefined') {
                        // console.log(dataItem.bullets);
                        // var bulletSprite = dataItem.bullets[0].get('sprite');
                        // bulletSprite.adapters.add("radius", function (radius, target) {
                        //     if (series.get('name') == 'series') {
                        //         radius = width * 25;
                        //     }
                        //     else {
                        //         radius = width * 40;
                        //     }
                        //     return radius;
                        // });

                        var bulletSprite = dataItem.bullets[0].get('sprite');
                        bulletSprite.adapters.add("fontSize", function (radius, target) {
                            radius = ff + 'rem';
                            return radius;
                        });
                    }
                    // 	// console.log(radius); 
                }
            });
        });
    }

}


function drawBounceRateChart() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("bounceRateChart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root),
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.horizontalLayout,
        innerRadius: am5.percent(50)
    }));

    let tooltip = am5.Tooltip.new(root, {});
    tooltip.get("background").setAll({
        fill: am5.color(0xeeeeee)
    });

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
        tooltip
    }));


    series.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
    ]);

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
        { value: 80, category: "Yes" },
        { value: 20, category: "No" },
    ]);

    series.labels.template.setAll({
        maxWidth: 0,
        oversizedBehavior: "wrap" // to truncate labels, use "truncate"
    });


    var legendRoot = am5.Root.new("bounceRateLegend");
    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    var legend = legendRoot.container.children.push(am5.Legend.new(legendRoot, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
        layout: legendRoot.verticalLayout,
    }));

    legend.data.setAll(series.dataItems);

    legend.labels.template.setAll({
        fontSize: '.775rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });
    legend.valueLabels.template.setAll({
        fontSize: '.775rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });
    legend.markerRectangles.template.setAll({
        cornerRadiusTL: 100,
        cornerRadiusTR: 100,
        cornerRadiusBL: 100,
        cornerRadiusBR: 100
    });

    series.ticks.template.set("forceHidden", true);
    series.labels.template.set("forceHidden", true);
    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    root.events.on("frameended", sizeFix);

    function sizeFix() {
        var width = jQuery(window).width() / BASE_WIDTH;

        var ff = .875 * width;

        if (jQuery(window).width() > 1920) {
            ff = .7 * width;
        }
        if (jQuery(window).width() > 3000) {
            ff = .5 * width;
        }
        if (jQuery(window).width() > 5000) {
            ff = .3 * width;
        }

        legend.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        legend.markers.template.setAll({
            width: 12 * width,
            height: 12 * width
        });

        legend.valueLabels.template.setAll({
            fontSize: ff + 'rem',
        });
        
        tooltip.label.setAll({
            fontSize: ff + 'rem'
        });
    }

}


function drawContentDrivingChart() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root4 = am5.Root.new("content-driving-chart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root4.setThemes([am5themes_Animated.new(root4)]);


    // Create series
    // https://www.amcharts.com/docs/v5/charts/flow-charts/
        var container4 = root4.container.children.push(am5.Container.new(root4, {
            width: am5.percent(95),
            height: am5.percent(95),
            layout: root4.horizontalLayout,
            centerX: am5.percent(50),
            x: am5.percent(50),
            centerY: am5.percent(50),
            y: am5.percent(50)
        }));

    var series4 = container4.children.push(am5flow.Sankey.new(root4, {
        sourceIdField: "from",
        targetIdField: "to",
        valueField: "value",
        paddingLeft: 14,
        nodePadding: 7,
        nodeAlign: "right",
        idField: "id",
        nodeWidth: 10
    }));

    series4.links.template.setAll({ fillStyle: "gradient", fillOpacity: 0.15 });

    // 				series4.nodes.setAll({
    //   nameField: "name"
    // });
    series4.nodes.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
        am5.color(0xBFBFBF),
        am5.color(0x061A32),
        am5.color(0x92EBD7),
        am5.color(0xB61D69),
    ]);
    // series4.nodes.get("colors").set("step", 4);


    series4.links.template.events.on("pointerover", function (event) {
        var dataItem = event.target.dataItem;
        var id = dataItem.get("id").split("-")[0];

        am5.array.each(series4.dataItems, function (dataItem) {
            if (dataItem.get("id").indexOf(id) != -1) {
                dataItem.get("link").hover();
            }
        });
    });
    series4.links.template.events.on("pointerout", function (event) {
        am5.array.each(series4.dataItems, function (dataItem) {
            dataItem.get("link").unhover();
        });
    });

    series4.nodes.labels.template.setAll({
        fontSize: '.875rem',
        // maxWidth: 150,
        wrap: true,
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(100),
        paddingLeft: 0,
        paddingRight: 0,
        rotation: -90,

    });
    // Set data
    // https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
    // series4.nodes.data.setAll([
    // 	{ id: "A", name: "Homepage" },
    // 	{ id: "B", name: "US Patients" },
    // 	{ id: "C", name: "Healthcare Professionals" },
    // 	{ id: "D", name: "Patient Form" },
    // 	{ id: "E", name: "HCP Form" },
    // ])

    // series4.data.setAll([
    //   { from: "A", to: "D", value: 10 },
    //   { from: "B", to: "E", value: 4 },
    //   { from: "C", to: "E", value: 3 },
    //   { from: "D", to: "G", value: 5 },
    //   { from: "D", to: "I", value: 2 },
    //   { from: "B", to: "D", value: 8 },
    //   { from: "D", to: "H", value: 3 },
    //   { from: "E", to: "H", value: 6 },
    //   { from: "G", to: "J", value: 5 },
    //   { from: "I", to: "J", value: 1 },
    //   { from: "H", to: "J", value: 9 }
    // ]);


    var journeyyy = [{ "from": "Homepage", "to": "US Patients", "value": 1, "id": "10000-0" }, { "from": "US Patients", "to": "Patient Form", "value": 1, "id": "10000-1" }, { "from": "Healthcare\nProfessionals", "to": "HCP Form", "value": 1, "id": "10001-0" }, { "from": "Homepage", "to": "US Patients", "value": 1, "id": "10002-0" }, { "from": "US Patients", "to": "Patient Form", "value": 1, "id": "10002-1" }, { "from": "Homepage", "to": "Patient Form", "value": 1, "id": "10003-0" }, { "from": "Homepage", "to": "US Patients", "value": 1, "id": "10004-0" }, { "from": "US Patients", "to": "Patient Form", "value": 1, "id": "10004-1" }, { "from": "Homepage", "to": "US Patients", "value": 1, "id": "10006-0" }, { "from": "Homepage", "to": "Healthcare\nProfessionals", "value": 1, "id": "10009-0" }, { "from": "Healthcare\nProfessionals", "to": "HCP Form", "value": 1, "id": "10009-1" }, { "from": "Homepage", "to": "US Patients", "value": 1, "id": "10010-0" }, { "from": "US Patients", "to": "Patient Form", "value": 1, "id": "10010-1" }, { "from": "Homepage", "to": "US Patients", "value": 1, "id": "10011-0" }, { "from": "US Patients", "to": "Patient Form", "value": 1, "id": "10011-1" }, { "from": "Healthcare\nProfessionals", "to": "HCP Form", "value": 1, "id": "10013-0" }, { "from": "Homepage", "to": "Patient Form", "value": 1, "id": "10014-0" }, { "from": "Homepage", "to": "HCP Form", "value": 1, "id": "10017-0" }, { "from": "Healthcare\nProfessionals", "to": "HCP Form", "value": 1, "id": "10020-0" }];

    // var journeyyy = [{"from":"A","to":"B","value":1,"id":"10000-0"},{"from":"B","to":"D","value":1,"id":"10000-1"},{"from":"C","to":"E","value":1,"id":"10001-0"},{"from":"A","to":"B","value":1,"id":"10002-0"},{"from":"B","to":"D","value":1,"id":"10002-1"},{"from":"A","to":"D","value":1,"id":"10003-0"},{"from":"A","to":"B","value":1,"id":"10004-0"},{"from":"B","to":"D","value":1,"id":"10004-1"},{"from":"A","to":"B","value":1,"id":"10006-0"},{"from":"A","to":"C","value":1,"id":"10009-0"},{"from":"C","to":"E","value":1,"id":"10009-1"},{"from":"A","to":"B","value":1,"id":"10010-0"},{"from":"B","to":"D","value":1,"id":"10010-1"},{"from":"A","to":"B","value":1,"id":"10011-0"},{"from":"B","to":"D","value":1,"id":"10011-1"},{"from":"C","to":"E","value":1,"id":"10013-0"},{"from":"A","to":"D","value":1,"id":"10014-0"},{"from":"A","to":"E","value":1,"id":"10017-0"},{"from":"C","to":"E","value":1,"id":"10020-0"}];

    // Set data
    // https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
    series4.data.setAll(journeyyy);
    // console.log(journeyyy);
    // Make stuff animate on load
    series4.appear(1000, 100);

    root4.events.on("frameended", exportChart4);
    function exportChart4() {
        var width = jQuery(window).width() / 1512;
        var ff = .875 * width;

        if (jQuery(window).width() > 1920) {
            ff = .7 * width;
        }
        if (jQuery(window).width() > 3000) {
            ff = .5 * width;
        }
        if (jQuery(window).width() > 5000) {
            ff = .3 * width;
        }

        series4.nodes.labels.template.setAll({
            fontSize: ff + 'rem',
        })
        if (jQuery(window).width() > 1512) {
            series4.nodes.rectangles.template.setAll({
                minWidth: width * 10
            })
        }
        else {
            series4.nodes.rectangles.template.setAll({
                minWidth: width * 10
            })
        }
    }
}

function drawAudienceChart() {

}

function drawPageViewChart1(num) {
    let chartName = `pageview-chart${num}`

    var root6 = am5.Root.new(chartName);
    // root6.setThemes([am5themes_Animated.new(root6)]);
    root6.setThemes([am5themes_Micro.new(root6)]);

    var container = root6.container.children.push(am5.Container.new(root6, {
        layout: root6.horizontalLayout,
        width: am5.percent(100),
        height: am5.percent(80),
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50),
    }));

    var chart6 = container.children.push(am5xy.XYChart.new(root6, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
    }));

    chart6.plotContainer.set("wheelable", false);
    chart6.zoomOutButton.set("forceHidden", true);

    var xAxis6 = chart6.xAxes.push(am5xy.DateAxis.new(root6, {
        maxDeviation: 0,
        baseInterval: { timeUnit: "month", count: 1 },
        renderer: am5xy.AxisRendererX.new(root6, {})
    }));

    var yAxis6 = chart6.yAxes.push(am5xy.ValueAxis.new(root6, {
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root6, {})
    }));

    var data = [
        {
            date: new Date(2021, 3, 1, 0, 0, 0).getTime(),
            value: 76
        },
        {
            date: new Date(2021, 4, 1).getTime(),
            value: 34
        },
        {
            date: new Date(2021, 5, 1).getTime(),
            value: 45
        },
        {
            date: new Date(2021, 6, 1).getTime(),
            value: 56
        },
        {
            date: new Date(2021, 7, 1).getTime(),
            value: 23
        },
        {
            date: new Date(2021, 8, 1).getTime(),
            value: 98
        },
        {
            date: new Date(2021, 9, 1).getTime(),
            value: 76
        },
        {
            date: new Date(2021, 10, 1).getTime(),
            value: 43
        },
        {
            date: new Date(2021, 11, 1).getTime(),
            value: 35
        },
        {
            date: new Date(2022, 0, 1).getTime(),
            value: 65
        },
        {
            date: new Date(2022, 1, 1).getTime(),
            value: 96
        },
        {
            date: new Date(2022, 2, 1).getTime(),
            value: 23
        },
    ];

    var series6 = chart6.series.push(am5xy.SmoothedXLineSeries.new(root6, {
        xAxis: xAxis6,
        yAxis: yAxis6,
        valueYField: "value",
        valueXField: "date",
        stroke: '#38D6AE'
    }));

    series6.strokes.template.setAll({
        strokeWidth: 2
    });
    series6.data.setAll(data);
    series6.appear(1000);
    chart6.appear(1000, 100);

    root6.events.on("frameended", exportChart5);

    function exportChart5() {
        var width = jQuery(window).width() / BASE_WIDTH;
        var ff = .875 * width;


        if (jQuery(window).width() > 1920) {
            ff = .7 * width;
        }
        if (jQuery(window).width() > 3000) {
            ff = .5 * width;
        }
        if (jQuery(window).width() > 5000) {
            ff = .3 * width;
        }

        series6.strokes.template.setAll({
            strokeWidth: 1 * ff,
        });
    }
}


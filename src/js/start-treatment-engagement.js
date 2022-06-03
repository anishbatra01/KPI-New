initCharts();

const BASE_WIDTH = 1512

function initCharts() {
    am5.ready(function () {
        am5.addLicense("AM5C329334656");
        drawFullfilmentRxChart();
        drawWeeklyFullfilmentChart();
        drawEnrollToContentChart();

    }); // end am5.ready()
}

function drawFullfilmentRxChart() {
    var root33 = am5.Root.new("fullfilment-rx-pie");
    root33.setThemes([am5themes_Animated.new(root33)]);

    var chart1 = root33.container.children.push(
        am5percent.PieChart.new(root33, {
            layout: root33.verticalLayout
        })
    );

    var series0 = chart1.series.push(
        am5percent.PieSeries.new(root33, {
            valueField: "value",
            categoryField: "category",
            // alignLabels: true,
            radius: am5.percent(100),
            innerRadius: am5.percent(80)
        })
    );

    series0.states.create("hidden", {
        startAngle: 180,
        endAngle: 180
    });

    series0.slices.template.setAll({
        fillOpacity: 0.5,
        strokeOpacity: 0,
        templateField: "settings"
    });

    // series0.slices.template.states.create("hover", { scale: 1 });
    // series0.slices.template.states.create("active", { shiftRadius:0 });

    series0.labels.template.setAll({
        templateField: "settings"
    });

    series0.ticks.template.setAll({
        templateField: "settings"
    });

    series0.labels.template.setAll({
        textType: "circular",
        radius: .1
    });

    series0.data.setAll([
        {
            category: "First + Second",
            value: 70,
            settings: { fill: am5.color(0x38D6AE), fillOpacity: 1 }
        },
        {
            category: "Unused",
            value: 30,
            settings: { forceHidden: true }
        }
    ]);

    series0.labels.template.set("forceHidden", true);
    series0.ticks.template.setAll({
        forceHidden: true
    });

    series0.get("colors").set("colors", [
        am5.color(0x38D6AE),
    ]);
    var series1 = chart1.series.push(
        am5percent.PieSeries.new(root33, {
            radius: am5.percent(95),
            innerRadius: am5.percent(85),
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        })
    );
    series1.get("colors").set("colors", [
        am5.color(0x38D6AE),
    ]);

    series1.states.create("hidden", {
        startAngle: 180,
        endAngle: 180
    });

    series1.slices.template.setAll({
        templateField: "sliceSettings",
        strokeOpacity: 0,
    });

    series1.labels.template.setAll({
        textType: "circular"
    });

    // series1.labels.template.adapters.add("radius", function (radius, target) {
    //   var dataItem = target.dataItem;
    //   var slice = dataItem.get("slice");
    //   return -(slice.get("radius") - slice.get("innerRadius")) / 2 - 10;
    // });
    series1.labels.template.set("forceHidden", true);

    // series1.slices.template.states.create("hover", { scale: 1 });
    // series1.slices.template.states.create("active", { shiftRadius:0 });

    series1.ticks.template.setAll({
        forceHidden: true
    });


    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series1.data.setAll([{
        category: "Second",
        value: 70,
        sliceSettings: { fill: am5.color(0x586877), fillOpacity: .5 }
    }, {
        category: "Remaining",
        value: 30,
        sliceSettings: { fill: am5.color(0x586877) }
    }]);

}

function drawWeeklyFullfilmentChart() {
    var root5 = am5.Root.new("weekly-fullfilment-chart");

    root5.setThemes([am5themes_Animated.new(root5)]);

    var container5 = root5.container.children.push(am5.Container.new(root5, {
        width: am5.percent(95),
        height: am5.percent(90),
        layout: root5.horizontalLayout,
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(10),
        y: am5.percent(10)
    }));

    var chart5 = container5.children.push(am5xy.XYChart.new(root5, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingBottom: 10,
        layout: root5.verticalLayout
    }));

    chart5.zoomOutButton.set("forceHidden", true);

    var cursor = chart5.set("cursor", am5xy.XYCursor.new(root5, {}));
    cursor.lineY.set("visible", false);

    var xRenderer = am5xy.AxisRendererX.new(root5, {});

    xRenderer.labels.template.setAll({
        fontSize: '.875rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
        fillOpacity: 0
    });

    var xAxis5 = chart5.xAxes.push(am5xy.GaplessDateAxis.new(root5, {
        // maxDeviation: 0.3,
        minGridDistance: 30,
        baseInterval: {
            timeUnit: "week",
            count: 1
        },
        extraMax: 0.1,

        min: new Date(2022, 5, 1).getTime(),
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root5, {}),
        connect: false
    }));

    var yRenderer = am5xy.AxisRendererY.new(root5, { minGridDistance: 100 });

    yRenderer.labels.template.setAll({
        fontSize: '.875rem',
    });
    yRenderer.grid.template.setAll({
        fillOpacity: 1
    });

    var yAxis5 = chart5.yAxes.push(am5xy.ValueAxis.new(root5, {
        renderer: yRenderer
    }));


    var tooltip5 = am5.Tooltip.new(root5, {
        autoTextColor: false,
        labelText: "{valueX}: {valueY}"
    });

    tooltip5.label.setAll({
        fontSize: '.875rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });


    var series5 = chart5.series.push(am5xy.LineSeries.new(root5, {
        name: "Active",
        xAxis: xAxis5,
        yAxis: yAxis5,
        valueYField: "value1",
        valueXField: "date",
        // legendValueText: "Active",
        tooltip: tooltip5,
        locationX: 0,
        stroke: am5.color(0x6DD3B0)
    }));

    series5.strokes.template.setAll({
        strokeWidth: 1,
    });

    series5.get("tooltip").get("background").setAll({
        fillOpacity: 0.5,
    });
    // console.log(series5.get("tooltip").set('LabelSize','.1rem'));
    // series5.get("tooltip").set("fillOpacity", 0.1);
    series5.set("tooltip", tooltip5);


    var series51 = chart5.series.push(am5xy.LineSeries.new(root5, {
        name: "Referred",
        xAxis: xAxis5,
        yAxis: yAxis5,
        valueXField: "date",
        valueYField: "value2",
        locationX: 0,
        stroke: am5.color(0x0B1A30)
    }));

    series51.strokes.template.setAll({
        strokeWidth: 1,
    });

    root5.dateFormatter.setAll({
        dateFormat: "MMM-dd",
        dateFields: ["valueX"]
    });


    // Set data
    var data = [{
        date: new Date(2022, 5, 1).getTime(),
        value1: 50,
        previousDate: "2022-05-01",
    }, {
        date: new Date(2022, 5, 8).getTime(),
        value1: 53,
        previousDate: "2022-05-08",
    }, {
        date: new Date(2022, 5, 15).getTime(),
        value1: 56,
        previousDate: "2022-05-15",
    }, {
        date: new Date(2022, 5, 22).getTime(),
        value1: 52,
        previousDate: "2022-05-22",
    }, {
        date: new Date(2022, 5, 29).getTime(),
        value1: 48,
        previousDate: "2022-05-29",
    }, {
        date: new Date(2022, 6, 5).getTime(),
        value1: 47,
        previousDate: "2022-06-5",
    }, {
        date: new Date(2022, 6, 12).getTime(),
        value1: 59,
        previousDate: "2022-06-12",
    }];

    var data1 = [{
        date: new Date(2022, 5, 1).getTime(),
        value1: 50,
        value2: 25,
        previousDate: "2022-05-01",
    }, {
        date: new Date(2022, 5, 8).getTime(),
        value2: 44,
        previousDate: "2022-05-08",
    }, {
        date: new Date(2022, 5, 15).getTime(),
        value2: 23,
        previousDate: "2022-05-15",
    }, {
        date: new Date(2022, 5, 22).getTime(),
        value2: 11,
        previousDate: "2022-05-22",
    }, {
        date: new Date(2022, 5, 29).getTime(),
        value2: 32,
        previousDate: "2022-05-29",
    }, {
        date: new Date(2022, 6, 5).getTime(),
        value2: 11,
        previousDate: "2022-06-5",
    }, {
        date: new Date(2022, 6, 12).getTime(),
        value2: 33,
        previousDate: "2022-06-12",
    }];

    series5.data.setAll(data);
    series51.data.setAll(data1);

    var scrollbar5X = am5.Scrollbar.new(root5, {
        orientation: "horizontal",
        paddingLeft: 0,
        marginTop: 5,
        minHeight: 8,
        marginBottom: 5
    });
    chart5.set("scrollbarX", scrollbar5X);

    chart5.bottomAxesContainer.children.push(scrollbar5X);

    scrollbar5X.thumb.setAll({
        fill: am5.color(0x6DD3B0),
        height: 8
        // fillOpacity: 0.1
    });
    scrollbar5X.startGrip.setAll({
        scale: .7,
        fill: am5.color(0x6DD3B0),
        bgColor: am5.color(0x6DD3B0),
    })
    scrollbar5X.endGrip.setAll({
        scale: .7
    })

    scrollbar5X.get("background").setAll({
        fill: am5.color(0xA3A3A3),
        fillOpacity: 0.7
    })

    scrollbar5X.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });

    scrollbar5X.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });

    scrollbar5X.startGrip.get("background").setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });
    scrollbar5X.startGrip.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });
    scrollbar5X.startGrip.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });

    scrollbar5X.endGrip.get("background").setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });
    scrollbar5X.endGrip.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });
    scrollbar5X.endGrip.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });

    // series5.events.once("datavalidated", function (ev) {
    //     ev.target.get("xAxis").zoomToDates(new Date(2022, 5, 8), new Date(2022, 6, 22));
    // });

    // var legend = chart5.yAxesAndPlotContainer.children.push(am5.Legend.new(root5, {
    //   // width: 200,
    //   paddingBottom: 15,
    //   height: am5.percent(20)
    // }));

    var legendRoot = am5.Root.new("legenddiv");

    var legend = legendRoot.container.children.push(
        am5.Legend.new(legendRoot, {
            // width: am5.percent(100),
            centerX: am5.percent(50),
            x: am5.percent(50),
            y: am5.percent(50),
            centerY: am5.percent(50),
            // layout: legendRoot.grid
        })
    );

    // legend.data.setAll(series.dataItems);

    // var legend = chart5.yAxesAndPlotContainer.children.push(am5.Legend.new(root5, {
    //     centerX: am5.percent(50),
    //     x: am5.percent(50),
    //   	// paddingLeft: 15,
    // }));
    legend.markers.template.setAll({
        width: 12,
        height: 12,
    });


    legend.labels.template.setAll({
        fontSize: '.875rem',
        fontWeight: "700",
        fontFamily: 'Nunito Sans'
    });

    legend.data.setAll(chart5.series.values);

    series5.appear(1000);
    series51.appear(1000);
    chart5.appear(1000, 100);

    root5.events.on("frameended", exportChart5);

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


        var xRenderer = xAxis5.get("renderer");
        var yRenderer = yAxis5.get("renderer");

        yRenderer.minGridDistance = 1;
        xRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        yRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        series51.strokes.template.setAll({
            strokeWidth: 1 * ff,
        });
        series5.strokes.template.setAll({
            strokeWidth: 1 * ff,
        });

        scrollbar5X.endGrip.setAll({
            scale: .7 * ff
        })
        scrollbar5X.startGrip.setAll({
            scale: .7 * ff
        })
        scrollbar5X.thumb.setAll({
            fill: am5.color(0x6DD3B0),
            height: 8 * ff
            // fillOpacity: 0.1
        });

        if (jQuery(window).width() > 2000) {
            scrollbar5X.setAll({
                minHeight: 8 * ff,
                marginTop: 8 * ff,
                marginBottom: 8 * ff
            });
        }
        else {
            scrollbar5X.setAll({
                minHeight: 8,
                marginTop: 5,
                marginBottom: 5
            });
        }

        if (jQuery(window).width() > 5000) {
            scrollbar5X.endGrip.setAll({
                scale: .7 * ff * 2
            })
            scrollbar5X.startGrip.setAll({
                scale: .7 * ff * 2
            })
            scrollbar5X.thumb.setAll({
                height: 8 * ff * 2
                // fillOpacity: 0.1
            });

            //    console.log(chart);
        }

        if (jQuery(window).width() > 2000) {
            scrollbar5X.setAll({
                minHeight: 8 * ff,
                marginTop: 8 * ff,
                marginBottom: 8 * ff
            });
        }
        else {
            scrollbar5X.setAll({
                minHeight: 8,
                marginTop: 5,
                marginBottom: 5
            });
        }

        legend.labels.template.setAll({
            fontSize: ff + 'rem',
        });
        tooltip5.label.setAll({
            fontSize: ff + 'rem'
        });
    }
}

function drawEnrollToContentChart() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("enroll-to-content-chart");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    var container = root.container.children.push(am5.Container.new(root, {
        layout: root.verticalLayout,
        width: am5.percent(95),
        height: am5.percent(95),
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50),
    }));



    // Create series
    // https://www.amcharts.com/docs/v5/charts/flow-charts/
    var series = container.children.push(am5flow.Sankey.new(root, {
        sourceIdField: "from",
        targetIdField: "to",
        valueField: "value",
        paddingRight: 60
    }));

    series.nodes.setAll({
        idField: "id",
        nameField: "name",
        fillField: "color"

    });


    //     #1a745d
    // #2d846d
    // #3f957e
    // #4fa58f
    // #60b6a1
    // #70c8b2
    // #81d9c5
    // #92ebd7

    series.nodes.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
        am5.color(0xBFBFBF),
        am5.color(0x061A32),
        am5.color(0x92EBD7),
        am5.color(0xB61D69),
        am5.color(0x81d9c5),
        am5.color(0x92ebd7),
    ]);

    series.nodes.data.setAll([
        { id: "A", name: "Patient Enrolled", },
        { id: "B", name: "Patient Not Enrolled" },
        { id: "C", name: "Registered", },
        { id: "D", name: "Non Registered", },
        { id: "E", name: "Fulfillment", },
        { id: "G", name: "Nurse Training", },
        { id: "H", name: "Safe Returns", },
        { id: "I", name: "Refill", },
    ])

    // series.nodes.get("colors").set("step", 2);


    // Set data
    // https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
    series.data.setAll([
        { from: "A", to: "D", value: 3, },
        { from: "A", to: "C", value: 2, },
        { from: "B", to: "C", value: 10, },
        { from: "C", to: "E", value: 6, },
        { from: "D", to: "E", value: 2, },
        { from: "C", to: "E", value: 1, },
        { from: "E", to: "G", value: 6, },
        { from: "E", to: "H", value: 1, },
        { from: "E", to: "H", value: 2, },
        { from: "E", to: "I", value: 1, },
        { from: "E", to: "I", value: 3, },
    ]);

    // Make stuff animate on load
    series.appear(1000, 100);

    root.events.on("frameended", exportChart4);
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

        series.nodes.labels.template.setAll({
            fontSize: ff + 'rem',
        })
        if (jQuery(window).width() > 1512) {
            series.nodes.rectangles.template.setAll({
                minWidth: width * 10
            })
        }
        else {
            series.nodes.rectangles.template.setAll({
                minWidth: width * 10
            })
        }
    }
}
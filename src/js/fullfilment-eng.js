initCharts();

const BASE_WIDTH = 1512

function initCharts() {
    am5.ready(function () {
        am5.addLicense("AM5C329334656");
        drawFullfilmentRxChart();
        drawWeeklyFullfilmentChart()
        drawJCPWithMeChart()
        drawWithMeReferralChart()
        drawNumberCostChart()

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

    series1.labels.template.set("forceHidden", true);

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

    console.log(chart5);
    chart5.chartContainer.setAll({
        paddingLeft: 0
    })

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
        maxDeviation: 1,
        minGridDistance: 30,
        baseInterval: {
            timeUnit: "week",
            count: 1
        },
        extraMax: 0.1,

        min: new Date(2022, 5, 1).getTime(),
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root5, {}),
        connect: true
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

function drawJCPWithMeChart() {
    var root10 = am5.Root.new("jcp-withme-patients-chart");

    var responsive10 = am5themes_Responsive.newEmpty(root10);

    // Set themes
    root10.setThemes([am5themes_Animated.new(root10), responsive10]);

    var container10 = root10.container.children.push(am5.Container.new(root10, {
        width: am5.percent(95),
        height: am5.percent(100),
        layout: root10.verticalLayout,
        x: am5.percent(50),
        centerX: am5.percent(50)
        // marginRight:am5.percent(5),
        // centerX:am5.percent(50)
    }));

    // Create venn series
    var chart10 = container10.children.push(am5venn.Venn.new(root10, {
        categoryField: "name",
        valueField: "value",
        intersectionsField: "sets",
        paddingTop: 40,
        paddingBottom: 40,
        // paddingLeft: 40,
        // paddingRight: 40
    }));

    chart10.slices.template.setAll({ templateField: "sliceSettings" });
    chart10.labels.template.setAll({
        text: '{value}',
        fontSize: '1rem',
        fill: am5.color(0xffffff),
    });

    // Set data
    chart10.data.setAll([{
        name: "JCP Patients",
        value: 100,
        sliceSettings: {
            fill: am5.color(0x38D6AE),
            stroke: am5.color(0x38D6AE),
            fillOpacity: .8
        }
    }, {
        name: "WithMe Patients",
        value: 100,
        sliceSettings: {
            fill: am5.color(0x576877),
            fillOpacity: .8
        }
    }
        , {
        // name: "Panda",
        value: 30,
        sets: ["JCP Patients", "WithMe Patients"],
        sliceSettings: {
            // fillPattern: pattern,
            stroke: am5.color(0x576877),
            strokeOpacity: '0',
            fill: am5.color(0x576877),
            fillOpacity: '0'
        }
    }
    ]);

    var legendRoot = am5.Root.new("jcp-withme-legend");

    var legend2 = legendRoot.container.children.push(am5.Legend.new(legendRoot, {
        width: am5.percent(80),
        height: am5.percent(100),
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(10),
        layout: legendRoot.horizontalLayout,
        scale: 0.9
    }));

    legend2.data.setAll(chart10.dataItems);

    legend2.markers.template.setAll({
        width: 12,
        height: 12
    });

    legend2.labels.template.setAll({
        fontSize: '.775rem',
        fontWeight: "500"
    });


    legend2.valueLabels.template.setAll({
        fontSize: '0',
        fontWeight: "400"
    });

    legend2.markerRectangles.template.setAll({
        cornerRadiusTL: 100,
        cornerRadiusTR: 100,
        cornerRadiusBL: 100,
        cornerRadiusBR: 100
    });



    root10.events.on("frameended", exportChart);

    function exportChart() {
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


        chart10.labels.template.setAll({
            text: '{value}',
            fontSize: ff + 'rem',
            fill: am5.color(0xffffff),
        });
        legend2.labels.template.setAll({
            fontSize: ff + 'rem',
            fontWeight: "500"
        });

        legend2.markers.template.setAll({
            width: 12 * width,
            height: 12 * width
        });

        legend2.markers.template.setAll({
            width: 12 * ff,
            height: 12 * ff
        });
    }
}

function drawWithMeReferralChart() {
    var root11 = am5.Root.new("withme-referral-chart");

    root11.setThemes([am5themes_Animated.new(root11)]);

    var container11 = root11.container.children.push(am5.Container.new(root11, {
        // width:'100',
        width: am5.percent(90),
        height: am5.percent(90),
        x: am5.percent(40),
        centerX: am5.percent(40),
        // layout: root10.gridLayout,
        // marginLeft:am5.percent(25),
        // paddingLeft:am5.percent(50),
        // maxWidth:am5.percent(50),
        // minWidth:am5.percent(50),
        // centerX:am5.percent(50),
        // left:am5.percent(50)
        // marginRight:am5.percent(10),
    }));

    var chart11 = container11.children.push(am5percent.PieChart.new(root11, {
        layout: root11.horizontalLayout,
        // paddingTop: am5.percent(5),
        // paddingBottom: am5.percent(5),
        // paddingLeft: '10',
        // paddingRight: '10',
        // maxWidth:am5.percent(50)
        // marginLeft:am5.percent(10)

    }));

    var series11 = chart11.series.push(am5percent.PieSeries.new(root11, {
        // alignLabels: true,
        calculateAggregates: true,
        valueField: "value",
        categoryField: "category",
    }));

    series11.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
        am5.color(0xBFBFBF),
        am5.color(0x061A32),
        am5.color(0x92EBD7),
        am5.color(0xB61D69),
    ]);

    series11.slices.template.setAll({
        strokeWidth: 1,
        stroke: am5.color(0xffffff)
    });

    series11.slices.template.adapters.add("radius", function (radius, target) {

        var dataItem = target.dataItem;
        var high = series11.getPrivate("valueHigh");
        var rad = target._dataItem.dataContext.radiuss;
        if (dataItem) {
            var value = target.dataItem.get("valueWorking", 0);
            // console.log(radius * rad  / high);
            return radius * rad / high
        }
        return radius;
    });


    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series11.data.setAll([{
        value: 10,
        category: "Jannesen\nLink",
        radiuss: 9
    }, {
        value: 10,
        category: "JCP\nSavings",
        radiuss: 5
    }, {
        value: 10,
        category: "JCP\nCare",
        radiuss: 8
    }, {
        value: 10,
        category: "So\nSimple",
        radiuss: 4
    }]);

    series11.labels.template.setAll({
        // maxWidth: 110,
        oversizedBehavior: "wrap",
        fontSize: '.875rem',
        fontWeight: 600,
        text: "{category}",
    });
    series11.slices.template.set("tooltipText", "{category}: {radiuss}");

    series11.appear(1000, 100);

    root11.events.on("frameended", exportChart1);

    function exportChart1() {
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


        if (jQuery(window).width() <= BASE_WIDTH) {
            series11.labels.template.setAll({
                // maxWidth: 110,
                oversizedBehavior: "wrap",
                fontSize: ff + 'rem',
                fontWeight: 600,
                text: "{category}",
            });
        }
        else {
            series11.labels.template.setAll({
                // maxWidth: 110 * ff/1.5,
                oversizedBehavior: "wrap",
                fontSize: ff + 'rem',
                fontWeight: 600,
                text: "{category}",
                textAlign: "center"
            });
        }


    }
}

function drawNumberCostChart() {
    var root = am5.Root.new("number-cost-chart");

    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    var container = root.container.children.push(am5.Container.new(root, {
        width: am5.percent(90),
        height: am5.percent(90),
        x: am5.percent(40),
        centerX: am5.percent(40),
    }));

    var chart = container.children.push(am5xy.XYChart.new(root, {
        // panX: true, 
        // panY: true, 
        /* wheelY: "zoomXY", */
        /* pinchZoomX:true, */
        /* pinchZoomY:true */
        cursor: am5xy.XYCursor.new(root, {})
    }));

    var xRenderer = am5xy.AxisRendererX.new(root, {});

    xRenderer.labels.template.setAll({
        fontSize: '0',
    });

    xRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
        fillOpacity: 0
    });

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    var yRenderer = am5xy.AxisRendererY.new(root, {});

    yRenderer.labels.template.setAll({
        fontSize: '.875rem',
        fontWeight: '600',
        textAlign: 'right'
    });

    yRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
        fillOpacity: 0
    });
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {}),
        categoryField: 'cats'
    }));

    var series0 = chart.series.push(am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        name: "series0",
        categoryYField: "cats",
        valueXField: "x",
        valueField: "value",
        setStateOnChildren: true,
        tooltip: am5.Tooltip.new(root, {
            // labelText: undefined,
            // forceHidden: true,
            animationDuration: 0
        })
    }));

    var series1 = chart.series.push(am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        name: "series1",
        xAxis: xAxis,
        yAxis: yAxis,
        categoryYField: "cats",
        valueXField: "x2",
        valueField: "value2",
        tooltip: am5.Tooltip.new(root, {
            labelText: undefined,
            forceHidden: true,
            animationDuration: 0
        })
    }));

    var circleTemplate = am5.Template.new({});
    var circleTemplateText = am5.Template.new({});
    var circleTemplate1 = am5.Template.new({});
    var circleTemplate1Text = am5.Template.new({});
    var fff = jQuery(window).width() / 1512;
    series0.bullets.push(function () {
        var bulletCircle = am5.Circle.new(root, {
            tooltipText: "{value}",
            radius: fff * 40,
            stroke: am5.color(0xffffff),
            strokeWidth: 0,
            fillOpacity: 1,
            fill: am5.color(0x38D6AE),
            interactive: true,
            // templateField: "bulletSettings",
        }, circleTemplate);

        //  bulletCircle.events.on("click", function(ev) {
        // 	// ev.target.get('radius').set('radius',100);
        // 	// circleTemplate.Template.setAll({
        // 	// 	radius:500
        // 	// })
        //   console.log("Clicked on a bullet!", ev.target);
        // });
        circleTemplate.states.create("resize", {
            scale: 4
        });
        // bulletCircle.event.dragended(function(ev) {
        // 	  console.log("Clicked on a bullet!", ev.target);
        // });


        return am5.Bullet.new(root, {
            sprite: bulletCircle,
            dynamic: true,
            class: 'dssdsdsdsdsdfsdfsdfsf'
            // name:'series0Circle',
            // dragended:circleTemplateDragged(bulletCircle)
        });
        // return bulletCircleInit;
    });
    series0.bullets.push(function () {

        var bulletCircleText = am5.Label.new(root, {
            text: "{value}",
            centerX: am5.percent(50),
            centerY: am5.percent(50),
            populateText: true,
            fontSize: '.875rem',
            fontWeight: 700
        }, circleTemplateText);

        return am5.Bullet.new(root, {
            sprite: bulletCircleText
        });
    });

    var bullet1 = series1.bullets.push(function () {

        var bulletCircle1 = am5.Circle.new(root, {
            tooltipText: "{value}",
            radius: 25,
            stroke: am5.color(0xffffff),
            strokeWidth: 0,
            fillOpacity: 1,
            fill: am5.color(0xBFBFBF),
            templateField: "bulletSettings",
        }, circleTemplate1);

        return am5.Bullet.new(root, {
            sprite: bulletCircle1
        });
    });
    series1.bullets.push(function () {

        var bulletCircleText1 = am5.Label.new(root, {
            text: "{value}",
            centerX: am5.percent(50),
            centerY: am5.percent(50),
            populateText: true,
            fontSize: '.875rem',
            fontWeight: 700,
            fontFamily: 'Nunito Sans'
        }, circleTemplate1Text);

        return am5.Bullet.new(root, {
            sprite: bulletCircleText1
        });
    });

    series0.strokes.template.set("strokeOpacity", 0);
    series1.strokes.template.set("strokeOpacity", 0);

    var data = [{
        "y": 11,
        "x": 6,
        "value": '$676',
        "y2": 11,
        "x2": 5,
        "value2": 135,
        'cats': 'Janssen Link\nProgram'
    }, {
        "y": 10,
        "x": 6,
        "value": '$676',
        "y2": 10,
        "x2": 5,
        "value2": 135,
        'cats': 'So Simple'
    }]

    yAxis.data.setAll(data);

    series0.data.setAll(data);
    series1.data.setAll(data);


    root.events.on("frameended", exportChart_bubble);

    var previousBulletSprites = [];

    function exportChart_bubble() {
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


        // bullet.sprite.setAll({
        // 	radius: 40 * ff,
        // })
        var yRenderer = yAxis.get("renderer");

        yRenderer.minGridDistance = 1;

        yRenderer.labels.template.setAll({

            fontSize: ff + 'rem',

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
                if (dataItem) {
                    if (typeof dataItem.bullets !== 'undefined') {
                        // console.log(dataItem.bullets);
                        var bulletSprite = dataItem.bullets[0].get('sprite');
                        bulletSprite.adapters.add("radius", function (radius, target) {
                            if (series.get('name') == 'series1') {
                                radius = width * 25;
                            }
                            else {
                                radius = width * 40;
                            }
                            return radius;
                        });

                        var bulletSprite = dataItem.bullets[1].get('sprite');
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
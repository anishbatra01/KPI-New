initCharts();

const BASE_WIDTH = 1512

function initCharts() {
    am5.ready(function () {
        am5.addLicense("AM5C329334656");
        drawEnrollmentRx();
        drawWeeklyEnrollChart()
        drawPatientPerGuideChart()
        drawPreferredTime()
        drawPageViewChart1(1)
        drawPageViewChart1(2)
        drawPageViewChart1(3)
    }); // end am5.ready()
}

function drawEnrollmentRx() {
    var root = am5.Root.new("enrollment-rx-pie");
    root.setThemes([am5themes_Animated.new(root)]);

    var chart1 = root.container.children.push(
        am5percent.PieChart.new(root, {
            layout: root.verticalLayout
        })
    );

    var series0 = chart1.series.push(
        am5percent.PieSeries.new(root, {
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
    var series = chart1.series.push(
        am5percent.PieSeries.new(root, {
            radius: am5.percent(95),
            innerRadius: am5.percent(85),
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        })
    );
    series.get("colors").set("colors", [
        am5.color(0x38D6AE),
    ]);

    series.states.create("hidden", {
        startAngle: 180,
        endAngle: 180
    });

    series.slices.template.setAll({
        templateField: "sliceSettings",
        strokeOpacity: 0,
    });

    series.labels.template.setAll({
        textType: "circular"
    });

    // series.labels.template.adapters.add("radius", function (radius, target) {
    //   var dataItem = target.dataItem;
    //   var slice = dataItem.get("slice");
    //   return -(slice.get("radius") - slice.get("innerRadius")) / 2 - 10;
    // });
    series.labels.template.set("forceHidden", true);

    // series.slices.template.states.create("hover", { scale: 1 });
    // series.slices.template.states.create("active", { shiftRadius:0 });

    series.ticks.template.setAll({
        forceHidden: true
    });


    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([{
        category: "Second",
        value: 70,
        sliceSettings: { fill: am5.color(0x586877), fillOpacity: .5 }
    }, {
        category: "Remaining",
        value: 30,
        sliceSettings: { fill: am5.color(0x586877) }
    }]);

}

function drawWeeklyEnrollChart() {
    var root = am5.Root.new("weekly-enroll-chart");

    root.setThemes([am5themes_Animated.new(root)]);

    var container = root.container.children.push(am5.Container.new(root, {
        width: am5.percent(95),
        height: am5.percent(90),
        layout: root.horizontalLayout,
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(10),
        y: am5.percent(10)
    }));

    var chart = container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingBottom: 10,
        layout: root.verticalLayout
    }));

    chart.zoomOutButton.set("forceHidden", true);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    var xRenderer = am5xy.AxisRendererX.new(root, {});

    xRenderer.labels.template.setAll({
        fontSize: '.875rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
        fillOpacity: 0
    });

    var xAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
        // maxDeviation: 0.3,
        minGridDistance: 30,
        baseInterval: {
            timeUnit: "week",
            count: 1
        },
        extraMax: 0.1,

        min: new Date(2022, 5, 1).getTime(),
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
        connect: false
    }));

    var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 100 });

    yRenderer.labels.template.setAll({
        fontSize: '.875rem',
    });
    yRenderer.grid.template.setAll({
        fillOpacity: 1
    });

    var yAxis5 = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: yRenderer
    }));


    var tooltip5 = am5.Tooltip.new(root, {
        autoTextColor: false,
        labelText: "{valueX}: {valueY}"
    });

    tooltip5.label.setAll({
        fontSize: '.875rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });


    var series0 = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Active",
        xAxis: xAxis,
        yAxis: yAxis5,
        valueYField: "value1",
        valueXField: "date",
        // legendValueText: "Active",
        tooltip: tooltip5,
        locationX: 0,
        stroke: am5.color(0x6DD3B0)
    }));

    series0.strokes.template.setAll({
        strokeWidth: 1,
    });

    series0.get("tooltip").get("background").setAll({
        fillOpacity: 0.5,
    });
    // console.log(series.get("tooltip").set('LabelSize','.1rem'));
    // series.get("tooltip").set("fillOpacity", 0.1);
    series0.set("tooltip", tooltip5);


    var series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Referred",
        xAxis: xAxis,
        yAxis: yAxis5,
        valueXField: "date",
        valueYField: "value2",
        locationX: 0,
        stroke: am5.color(0x0B1A30)
    }));

    series.strokes.template.setAll({
        strokeWidth: 1,
    });

    root.dateFormatter.setAll({
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

    series0.data.setAll(data);
    series.data.setAll(data1);

    var scrollbarX = am5.Scrollbar.new(root, {
        orientation: "horizontal",
        paddingLeft: 0,
        marginTop: 5,
        minHeight: 8,
        marginBottom: 5
    });
    chart.set("scrollbarX", scrollbarX);

    chart.bottomAxesContainer.children.push(scrollbarX);

    scrollbarX.thumb.setAll({
        fill: am5.color(0x6DD3B0),
        height: 8
        // fillOpacity: 0.1
    });
    scrollbarX.startGrip.setAll({
        scale: .7,
        fill: am5.color(0x6DD3B0),
        bgColor: am5.color(0x6DD3B0),
    })
    scrollbarX.endGrip.setAll({
        scale: .7
    })

    scrollbarX.get("background").setAll({
        fill: am5.color(0xA3A3A3),
        fillOpacity: 0.7
    })

    scrollbarX.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });

    scrollbarX.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });

    scrollbarX.startGrip.get("background").setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });
    scrollbarX.startGrip.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });
    scrollbarX.startGrip.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });

    scrollbarX.endGrip.get("background").setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });
    scrollbarX.endGrip.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });
    scrollbarX.endGrip.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });

    // series.events.once("datavalidated", function (ev) {
    //     ev.target.get("xAxis").zoomToDates(new Date(2022, 5, 8), new Date(2022, 6, 22));
    // });

    // var legend = chart.yAxesAndPlotContainer.children.push(am5.Legend.new(root, {
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


    legend.labels.template.setAll({
        fontSize: '.875rem',
        fontWeight: "700",
        fontFamily: 'Nunito Sans'
    });


    legend.data.setAll(chart.series.values);



    series0.appear(1000);
    series.appear(1000);
    chart.appear(1000, 100);

    root.events.on("frameended", exportchart);

    function exportchart() {
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


        var xRenderer = xAxis.get("renderer");
        var yRenderer = yAxis5.get("renderer");

        yRenderer.minGridDistance = 1;
        xRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        yRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        series0.strokes.template.setAll({
            strokeWidth: 1 * ff,
        });
        series.strokes.template.setAll({
            strokeWidth: 1 * ff,
        });

        scrollbarX.endGrip.setAll({
            scale: .7 * ff
        })
        scrollbarX.startGrip.setAll({
            scale: .7 * ff
        })
        scrollbarX.thumb.setAll({
            fill: am5.color(0x6DD3B0),
            height: 8 * ff
            // fillOpacity: 0.1
        });

        if (jQuery(window).width() > 2000) {
            scrollbarX.setAll({
                minHeight: 8 * ff,
                marginTop: 8 * ff,
                marginBottom: 8 * ff
            });
        }
        else {
            scrollbarX.setAll({
                minHeight: 8,
                marginTop: 5,
                marginBottom: 5
            });
        }

        if (jQuery(window).width() > 5000) {
            scrollbarX.endGrip.setAll({
                scale: .7 * ff * 2
            })
            scrollbarX.startGrip.setAll({
                scale: .7 * ff * 2
            })
            scrollbarX.thumb.setAll({
                height: 8 * ff * 2
                // fillOpacity: 0.1
            });

            //    console.log(chart);
        }

        if (jQuery(window).width() > 2000) {
            scrollbarX.setAll({
                minHeight: 8 * ff,
                marginTop: 8 * ff,
                marginBottom: 8 * ff
            });
        }
        else {
            scrollbarX.setAll({
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


function drawPatientPerGuideChart() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("patient-per-guide-chart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    const myTheme = am5.Theme.new(root);

    myTheme.rule("Grid").setAll({
        strokeOpacity: 0,
    });

    myTheme.rule("AxisTick").setAll({
        // stroke: am5.color(0xFFFFFFF),
        visible: false
    });


    var container = root.container.children.push(am5.Container.new(root, {
        layout: root.verticalLayout,
        width: am5.percent(95),
        height: am5.percent(98),
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50),
    }));

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
    }));


    // Fix the  left padding
    chart.leftAxesContainer.setAll({
        width: 0
    })

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(root, {})
    }));

    var xRenderer = xAxis.get("renderer")
    xRenderer.labels.template.setAll({
        fill: am5.color(0x061A32),
        fontSize: '0.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    var yRenderer = yAxis.get("renderer")
    yRenderer.labels.template.setAll({
        visible: false
    });


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

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip
    }));

    series.set("fill", am5.color(0x38D6AE));
    series.set("stroke", am5.color(0x38D6AE));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/

    var scrollbarX = am5.Scrollbar.new(root, {
        orientation: "horizontal",
        paddingLeft: 0,
        marginTop: 5,
        minHeight: 8,
        marginBottom: 5
    });

    scrollbarX.thumb.setAll({
        fill: am5.color(0x38d6ae),
        height: '0.5rem'
    });

    scrollbarX.startGrip.setAll({
        scale: .7,
        fill: am5.color(0x6DD3B0),
        bgColor: am5.color(0x6DD3B0),

    });

    scrollbarX.endGrip.setAll({
        scale: .7
    });


    scrollbarX.get("background").setAll({
        fill: am5.color(0xA3A3A3),
        fillOpacity: 0.7
    })

    scrollbarX.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });

    scrollbarX.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });

    scrollbarX.startGrip.get("background").setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });
    scrollbarX.startGrip.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });
    scrollbarX.startGrip.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });

    scrollbarX.endGrip.get("background").setAll({
        fill: am5.color(0x6DD3B0),
        // fillOpacity: 0.7
    });
    scrollbarX.endGrip.get("background").states.create("hover", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });
    scrollbarX.endGrip.get("background").states.create("down", {}).setAll({
        fill: am5.color(0x6DD3B0),
        fillOpacity: 0.8
    });



    chart.set("scrollbarX", scrollbarX);
    chart.chartContainer.children.push(scrollbarX);

    var data = [{
        category: "G1",
        value: 8
    }, {
        category: "G2",
        value: 10
    }, {
        category: "G3",
        value: 12
    }, {
        category: "G4",
        value: 11
    }, {
        category: "G5",
        value: 10
    }, {
        category: "G6",
        value: 11
    }, {
        category: "G7",
        value: 5
    }, {
        category: "G8",
        value: 10
    },
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // var categoryLabel = series.bullets.push(function () {
    //     return am5.Bullet.new(root, {
    //         sprite: am5.Label.new(root, {
    //             text: "{valueX}",
    //             fill: root.interfaceColors.get("alternativeText"),
    //             centerY: am5.p50,
    //             centerX: am5.p50,
    //             populateText: true
    //         })
    //     });
    // });

    series.columns.template.setAll({
        tooltipText: "{categoryX}: {valueY}",
        tooltipY: am5.percent(10),
        cornerRadiusTL: 2,
        cornerRadiusTR: 2
    });

    var bullet = series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationX: 0.5,
            locationY: 1,
            sprite: am5.Label.new(root, {
                text: "{valueY}",
                centerY: am5.p10,
                centerX: am5.p50,
                populateText: true,
                templateField: "bulletSettings",
                fontSize: 12,
                fontFamily: 'Nunito Sans',
                fontWeight: 700
            })
        });
    });

    series.columns.template.onPrivate("height", function (height, target) {
        am5.array.each(target.dataItem.bullets, function (bullet) {
            if (height > 20) {
                bullet.set("locationY", 0.5);
                bullet.get("sprite").set("centerY", am5.p50);
            }
            else {
                bullet.set("locationY", 1);
                bullet.get("sprite").set("centerY", am5.p100);
            }

        });
    });


    root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Responsive.new(root),
        myTheme,
    ]);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
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

        yRenderer.minGridDistance = 1;
        xRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        yRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });


        // series?.strokes?.template?.setAll({
        //     strokeWidth: 1 * ff,
        // });


        scrollbarX.endGrip.setAll({
            scale: .7 * ff
        })
        scrollbarX.startGrip.setAll({
            scale: .7 * ff
        })
        scrollbarX.thumb.setAll({
            height: 8 * ff
            // fillOpacity: 0.1
        });

        if (jQuery(window).width() > 5000) {
            scrollbarX.endGrip.setAll({
                scale: .7 * ff * 2
            })
            scrollbarX.startGrip.setAll({
                scale: .7 * ff * 2
            })
            scrollbarX.thumb.setAll({
                height: 8 * ff * 2
                // fillOpacity: 0.1
            });

            //    console.log(chart);
        }

        if (jQuery(window).width() > 2000) {
            scrollbarX.setAll({
                minHeight: 8 * ff,
                marginTop: 8 * ff,
                marginBottom: 8 * ff
            });
        }
        else {
            scrollbarX.setAll({
                minHeight: 8,
                marginTop: 5,
                marginBottom: 5
            });
        }


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



function drawPreferredTime() {
    var root8 = am5.Root.new("preferred-time-chart");

    root8.setThemes([am5themes_Animated.new(root8)]);

    var container8 = root8.container.children.push(am5.Container.new(root8, {
        width: am5.percent(95),
        height: am5.percent(95),
        layout: root8.verticalLayout,
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50)
        // marginRight:am5.percent(5),
        // centerX:am5.percent(50)
    }));

    var chart8 = container8.children.push(am5xy.XYChart.new(root8, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root8.verticalLayout,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        // paddingBottom:0
    }));

    var yRenderer8 = am5xy.AxisRendererY.new(root8, {
        visible: false,
        minGridDistance: 20,
        inversed: true,
    });

    yRenderer8.labels.template.setAll({
        fontSize: '.875rem',
        fontWeight: 600,
        paddingRight: 10
    });
    yRenderer8.grid.template.set("visible", false);

    var yAxis8 = chart8.yAxes.push(am5xy.CategoryAxis.new(root8, {
        maxDeviation: 0,
        renderer: yRenderer8,
        categoryField: "weekday"
    }));

    var xRenderer8 = am5xy.AxisRendererX.new(root8, {
        visible: false,
        minGridDistance: 30,
        opposite: true,
    });

    xRenderer8.labels.template.setAll({
        fontSize: '.875rem',
        fontWeight: 600,
        paddingBottom: 10
    });
    xRenderer8.grid.template.set("visible", false);

    var xAxis8 = chart8.xAxes.push(am5xy.CategoryAxis.new(root8, {
        renderer: xRenderer8,
        categoryField: "hour"
    }));

    // Tooltip 
    var tooltip = am5.Tooltip.new(root8, {
        autoTextColor: false,
        labelText: "{value}"
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });

    var series8 = chart8.series.push(am5xy.ColumnSeries.new(root8, {
        calculateAggregates: true,
        stroke: am5.color(0xffffff),
        clustered: false,
        xAxis: xAxis8,
        yAxis: yAxis8,
        categoryXField: "hour",
        categoryYField: "weekday",
        valueField: "value",
        tooltip
    }));

    series8.columns.template.setAll({
        tooltipText: "{value}",
        strokeOpacity: 1,
        strokeWidth: 2,
        width: am5.percent(100),
        height: am5.percent(100)
    });

    // series8.columns.template.events.on("pointerover", function(event) {
    //   var di = event.target.dataItem;
    //   if (di) {
    //     heatLegend.showValue(di.get("value", 0));
    //   }
    // });

    // series8.events.on("datavalidated", function() {
    //   heatLegend.set("startValue", series.getPrivate("valueHigh"));
    //   heatLegend.set("endValue", series.getPrivate("valueLow"));
    // });


    series8.set("heatRules", [{
        target: series8.columns.template,
        min: am5.color(0xB8F5E7),
        max: am5.color(0x38D6AE),
        dataField: "value",
        key: "fill"
    }]);

    var data = [{
        hour: "MORNING",
        weekday: "SUN",
        value: 2990
    }, {
        hour: "AFTERNOON",
        weekday: "SUN",
        value: 2520
    }, {
        hour: "EVENING",
        weekday: "SUN",
        value: 2334
    }, {
        hour: "MORNING",
        weekday: "MON",
        value: 3346
    }, {
        hour: "AFTERNOON",
        weekday: "MON",
        value: 2725
    }, {
        hour: "EVENING",
        weekday: "MON",
        value: 3052
    }, {
        hour: "MORNING",
        weekday: "TUE",
        value: 4468
    }, {
        hour: "AFTERNOON",
        weekday: "TUE",
        value: 3306
    }, {
        hour: "EVENING",
        weekday: "TUE",
        value: 3906
    }, {
        hour: "MORNING",
        weekday: "WED",
        value: 8145
    }, {
        hour: "AFTERNOON",
        weekday: "WED",
        value: 7177
    }, {
        hour: "EVENING",
        weekday: "WED",
        value: 5657
    }, {
        hour: "MORNING",
        weekday: "THU",
        value: 3689
    }, {
        hour: "AFTERNOON",
        weekday: "THU",
        value: 3081
    }, {
        hour: "EVENING",
        weekday: "THU",
        value: 6525
    }, {
        hour: "MORNING",
        weekday: "FRI",
        value: 4022
    }, {
        hour: "AFTERNOON",
        weekday: "FRI",
        value: 3063
    }, {
        hour: "EVENING",
        weekday: "FRI",
        value: 3638
    }, {
        hour: "MORNING",
        weekday: "SAT",
        value: 3503
    }, {
        hour: "AFTERNOON",
        weekday: "SAT",
        value: 2842
    }, {
        hour: "EVENING",
        weekday: "SAT",
        value: 2808
    }
    ];

    series8.data.setAll(data);
    yAxis8.data.setAll([
        { weekday: "SUN" },
        { weekday: "MON" },
        { weekday: "TUE" },
        { weekday: "WED" },
        { weekday: "THU" },
        { weekday: "FRI" },
        { weekday: "SAT" }
    ]);

    xAxis8.data.setAll([
        { hour: "MORNING" },
        { hour: "AFTERNOON" },
        { hour: "EVENING" },
    ]);

    chart8.appear(1000, 100);

    root8.events.on("frameended", exportChart8);

    function exportChart8() {
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

        var xRenderer = xAxis8.get("renderer");
        var yRenderer = yAxis8.get("renderer");

        yRenderer.minGridDistance = 1;
        xRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
            paddingBottom: 10 * ff
        });

        yRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
            paddingRight: 10 * ff
        });


        tooltip.label.setAll({
            fontSize: ff + 'rem'
        });
    }
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
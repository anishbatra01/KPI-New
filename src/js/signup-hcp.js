let hcpBrochureChartRoot = null;
let hcpBrochureChartLegendRoot = null;
let enrollChartRoot = null;
let enrollChartLegendRoot = null;
let hcpCountChartRoot = null;




const BASE_WIDTH = 1512;

initCharts();

function initCharts() {
    am5.ready(function () {
        am5.addLicense("AM5C329334656");
        darwHcpBrochureChart();
        drawEnrollmentChart();
        drawHCPCountChart();
        // chartTest()
    }); // end am5.ready()
}


function darwHcpBrochureChart() {

    if (hcpBrochureChartRoot) {
        hcpBrochureChartRoot.dispose();
    }
    if (hcpBrochureChartLegendRoot) {
        hcpBrochureChartLegendRoot.dispose();
    }
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    hcpBrochureChartRoot = am5.Root.new("referral-type");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/

    const myTheme = am5.Theme.new(hcpBrochureChartRoot);

    myTheme.rule("Grid").setAll({
        stroke: am5.color(0xFFFF00),
        strokeOpacity: 0
    });

    myTheme.rule("AxisTick").setAll({
        // stroke: am5.color(0xFFff00),
        visible: false
    });

    const responsive = am5themes_Responsive.newEmpty(hcpBrochureChartRoot);


    hcpBrochureChartRoot.setThemes([
        am5themes_Animated.new(hcpBrochureChartRoot),
        responsive,
        myTheme,
    ]);



    var container = hcpBrochureChartRoot.container.children.push(am5.Container.new(hcpBrochureChartRoot, {
        layout: hcpBrochureChartRoot.verticalLayout,
        width: am5.percent(95),
        height: am5.percent(95),
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50),
    }));

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = container.children.push(am5xy.XYChart.new(hcpBrochureChartRoot, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: hcpBrochureChartRoot.verticalLayout,
        fontFamily: 'Nunito Sans'
    }));


    // Fix the  left padding
    chart.leftAxesContainer.setAll({
        width: 0
    })

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    var scrollbarX = am5.Scrollbar.new(hcpBrochureChartRoot, {
        orientation: "horizontal",
        paddingLeft: 0,
        marginTop: 0,
        marginLeft: 0,
        minHeight: 8,
        marginBottom: 5
    });

    chart.set("scrollbarX", scrollbarX);
    chart.chartContainer.children.push(scrollbarX);

    scrollbarX.thumb.setAll({
        fill: am5.color(0x38d6ae),
        height: 8,
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

    // scrollbarX.startGrip.children.dispose()
    // scrollbarX.endGrip.children.dispose()




    chart.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
        am5.color(0xBFBFBF),
        am5.color(0x061A32),
    ]);

    var data = [
        {
            "year": "Jul 2021",
            "wct": 3.5,
            "text": 5.5,
            "website": 2.1,
            "w": 4.1,
        },
        {
            "year": "Aug 2021",
            "wct": 2.6,
            "text": 2.7,
            "website": 2.2,
            "w": 5.2,

        },
        {
            "year": "Sept 2021",
            "wct": 2.8,
            "text": 2.9,
            "website": 2.4,
            "w": 3.7,
        },
        {
            "year": "Oct 2021",
            "wct": 2.8,
            "text": 2.9,
            "website": 2.4,
            "w": 1.9,
        },
        {
            "year": "Nov 2021",
            "wct": 3,
            "text": 5,
            "website": 2.6,
            "w": 7.0,
        },
        {
            "year": "Dec 2021",
            "wct": 2.1,
            "text": 3.9,
            "website": 5.4,
            "w": 3.8,
        },
    ]

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(hcpBrochureChartRoot, {
        categoryField: "year",
        renderer: am5xy.AxisRendererX.new(hcpBrochureChartRoot, {
            minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(hcpBrochureChartRoot, {}),

    }));

    // xRenderer.grid.template.setAll({
    //     stroke: am5.color(0xFFffff),
    // });

    // xAxis.get("renderer").grid.template.setAll({
    //     stroke: am5.color(0xFFffff),
    //     strokeOpacity: 0
    // });

    var xRenderer = xAxis.get("renderer")
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        fontWeight: 'bold',
        fill: am5.color(0x061A32),
        oversizedBehavior: 'wrap',
        stroke: am5.color(0xff00ff),
        fontSize: '0.505rem',
        fontFamily: 'Nunito Sans'
    });

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(hcpBrochureChartRoot, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(hcpBrochureChartRoot, {})
    }));

    // yAxis.label.disabled = true
    // hide axis label 
    var yRenderer = yAxis.get("renderer")
    yRenderer.labels.template.setAll({
        visible: false
    });

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/

    hcpBrochureChartLegendRoot = am5.Root.new("referral-legend");

    let legend = hcpBrochureChartLegendRoot.container.children.push(
        am5.Legend.new(hcpBrochureChartLegendRoot, {
            // width: am5.percent(50),
            // height: am5.percent(100),
            x: am5.percent(50),
            centerX: am5.percent(50),
            y: am5.percent(50),
            centerY: am5.percent(50),
            // paddingTop: 5,
            layout: hcpBrochureChartLegendRoot.gridLayout,
            scale: 0.9
        })
    );

    // legend.data.setAll(series.dataItems);
    // var legend = chart.children.push(am5.Legend.new(root, {
    //     centerX: am5.percent(45),
    //     x: am5.p50,
    //     useDefaultMarker: true,
    //     layout: root.horizontalLayout
    // }));

    legend.markers.template.setAll({
        width: 12,
        height: 12
    });

    legend.labels.template.setAll({
        fontSize: '0.75rem',
        fontWeight: "700",
        fill: am5.color(0x263238),
        scale: 0.8
    });

    legend.markerRectangles.template.setAll({
        cornerRadiusTL: 100,
        cornerRadiusTR: 100,
        cornerRadiusBL: 100,
        cornerRadiusBR: 100
    });

    let seriesData = []

    // console.log(chart);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/


    var tooltip = am5.Tooltip.new(hcpBrochureChartRoot, {
        autoTextColor: false,
        labelText: "{categoryX}: {valueY}"
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });

    function makeSeries(name, fieldName, curve) {
        var series = chart.series.push(am5xy.ColumnSeries.new(hcpBrochureChartRoot, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year",
            tooltip
        }));

        // series.columns.template.setAll({
        //     tooltipText: "{name}, {categoryX}: {valueY}",
        //     tooltipY: am5.percent(10),
        //     cornerRadiusTL: curve ? 2 : 0,
        //     cornerRadiusTR: curve ? 2 : 0

        // });

        xAxis.data.setAll(data);
        legend.data.push(series);
        series.data.setAll(data);


        seriesData.push(series)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        // series.bullets.push(function () {
        //     return am5.Bullet.new(root, {
        //         sprite: am5.Label.new(root, {
        //             text: "{valueY}",
        //             fill: root.interfaceColors.get("alternativeText"),
        //             centerY: am5.p50,
        //             centerX: am5.p50,
        //             populateText: true
        //         })
        //     });
        // });

    }

    // axis.disabled = true;

    makeSeries("RHEUM FRAS", "wct");
    makeSeries("DERM FRAS", "text");
    makeSeries("RHEUM DEM", "website", true);
    makeSeries("DERM DEM", "w",);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/

    chart.zoomOutButton.set("forceHidden", true);
    chart.appear(1000, 100);


    hcpBrochureChartRoot.events.on("frameended", sizeFix);

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

        let title = .875 * width
        let value = 2.125 * width

        if (jQuery(window).width() > 1700) {
            title = .675 * width
            value = 1.5 * width
        }

        if (jQuery(window).width() > 3840) {
            title = .575 * width
            value = 1.2 * width
        }
        if (jQuery(window).width() > 5119) {
            title = .375 * width
            value = 1 * width
        }




        yRenderer.minGridDistance = 1;
        xRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        yRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        chart.series.values.forEach(series => {
            series?.strokes?.template?.setAll({
                strokeWidth: 5 * ff,
            });
            series.columns.template.setAll({
                tooltipText: `[fontSize:${title}rem][bold]{name}[fontSize:${value}rem][bold]{valueY}[/][/]`,

            });
        })



        scrollbarX.endGrip.setAll({
            scale: .7 * ff
        })
        scrollbarX.startGrip.setAll({
            scale: .7 * ff
        })
        scrollbarX.thumb.setAll({
            height: 8 * ff
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

        legend.markers.template.setAll({
            width: 12 * width,
            height: 12 * width
        });

        tooltip.label.setAll({
            fontSize: ff + 'rem'
        });
    }
}

function drawEnrollmentChart() {

    if (enrollChartRoot) {
        enrollChartRoot.dispose();
    }
    if (enrollChartLegendRoot) {
        enrollChartLegendRoot.dispose();
    }
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    enrollChartRoot = am5.Root.new("enrollment-chart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/

    const myTheme = am5.Theme.new(enrollChartRoot);

    myTheme.rule("Grid").setAll({
        stroke: am5.color(0xFFFF00),
        strokeOpacity: 0
    });

    myTheme.rule("AxisTick").setAll({
        // stroke: am5.color(0xFFff00),
        visible: false
    });

    const responsive = am5themes_Responsive.newEmpty(enrollChartRoot);


    enrollChartRoot.setThemes([
        am5themes_Animated.new(enrollChartRoot),
        responsive,
        myTheme,
    ]);



    var container = enrollChartRoot.container.children.push(am5.Container.new(enrollChartRoot, {
        layout: enrollChartRoot.verticalLayout,
        width: am5.percent(95),
        height: am5.percent(95),
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50),
    }));

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = container.children.push(am5xy.XYChart.new(enrollChartRoot, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: enrollChartRoot.verticalLayout,
        fontFamily: 'Nunito Sans'
    }));


    // Fix the  left padding
    chart.leftAxesContainer.setAll({
        width: 0
    })





    chart.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
        am5.color(0xBFBFBF),
        am5.color(0x061A32),
    ]);

    var data = [
        {
            "year": "2020",
            "wct": 3.5,
            "text": 5.5,
        },
        {
            "year": "2021",
            "wct": 2.6,
            "text": 2.7,

        },
        {
            "year": "2022",
            "wct": 2.8,
            "text": 2.9,
        },
        {
            "year": "2023",
            "wct": 2.8,
            "text": 2.9,
        },
    ]

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(enrollChartRoot, {
        categoryField: "year",
        renderer: am5xy.AxisRendererX.new(enrollChartRoot, {
            minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(enrollChartRoot, {}),

    }));

    // xRenderer.grid.template.setAll({
    //     stroke: am5.color(0xFFffff),
    // });

    // xAxis.get("renderer").grid.template.setAll({
    //     stroke: am5.color(0xFFffff),
    //     strokeOpacity: 0
    // });

    var xRenderer = xAxis.get("renderer")
    xRenderer.labels.template.setAll({
        fontWeight: 'bold',
        fill: am5.color(0x061A32),
        oversizedBehavior: 'wrap',
        stroke: am5.color(0xff00ff),
        fontSize: '0.875rem',
        fontFamily: 'Nunito Sans'
    });

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(enrollChartRoot, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(enrollChartRoot, {})
    }));

    // yAxis.label.disabled = true
    // hide axis label 
    var yRenderer = yAxis.get("renderer")
    yRenderer.labels.template.setAll({
        visible: false
    });

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/

    enrollChartLegendRoot = am5.Root.new("enrollment-legend");

    let legend = enrollChartLegendRoot.container.children.push(
        am5.Legend.new(enrollChartLegendRoot, {
            // width: am5.percent(100),
            // width: am5.percent(95),
            height: am5.percent(100),
            x: am5.percent(50),
            centerX: am5.percent(50),
            y: am5.percent(50),
            centerY: am5.percent(10),
            // paddingTop: 5,
            layout: enrollChartLegendRoot.horizontalLayout,
            scale: 0.9
        })
    );

    // legend.data.setAll(series.dataItems);
    // var legend = chart.children.push(am5.Legend.new(root, {
    //     centerX: am5.percent(45),
    //     x: am5.p50,
    //     useDefaultMarker: true,
    //     layout: root.horizontalLayout
    // }));

    legend.markers.template.setAll({
        width: 12,
        height: 12
    });

    legend.labels.template.setAll({
        fontSize: '0.75rem',
        fontWeight: "700",
        fill: am5.color(0x263238),
        scale: 0.8
    });

    legend.markerRectangles.template.setAll({
        cornerRadiusTL: 100,
        cornerRadiusTR: 100,
        cornerRadiusBL: 100,
        cornerRadiusBR: 100
    });

    let seriesData = []

    // console.log(chart);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/


    var tooltip = am5.Tooltip.new(enrollChartRoot, {
        autoTextColor: false,
        labelText: "{categoryX}: {valueY}"
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });

    function makeSeries(name, fieldName, curve) {
        var series = chart.series.push(am5xy.ColumnSeries.new(enrollChartRoot, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year",
            tooltip
        }));

        // series.columns.template.setAll({
        //     tooltipText: "{name}, {categoryX}: {valueY}",
        //     tooltipY: am5.percent(10),
        //     cornerRadiusTL: curve ? 2 : 0,
        //     cornerRadiusTR: curve ? 2 : 0

        // });

        xAxis.data.setAll(data);
        legend.data.push(series);
        series.data.setAll(data);


        seriesData.push(series)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        // series.bullets.push(function () {
        //     return am5.Bullet.new(root, {
        //         sprite: am5.Label.new(root, {
        //             text: "{valueY}",
        //             fill: root.interfaceColors.get("alternativeText"),
        //             centerY: am5.p50,
        //             centerX: am5.p50,
        //             populateText: true
        //         })
        //     });
        // });

    }

    // axis.disabled = true;

    makeSeries("RHEUMATOLOGISTS", "wct");
    makeSeries("DERMATOLOGISTS", "text");


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.zoomOutButton.set("forceHidden", true);
    chart.appear(1000, 100);


    enrollChartRoot.events.on("frameended", sizeFix);

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

        let title = .875 * width
        let value = 2.125 * width

        if (jQuery(window).width() > 1700) {
            title = .675 * width
            value = 1.5 * width
        }

        if (jQuery(window).width() > 3840) {
            title = .575 * width
            value = 1.2 * width
        }
        if (jQuery(window).width() > 5119) {
            title = .375 * width
            value = 1 * width
        }




        yRenderer.minGridDistance = 1;
        xRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        yRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        chart.series.values.forEach(series => {
            series?.strokes?.template?.setAll({
                strokeWidth: 5 * ff,
            });
            series.columns.template.setAll({
                tooltipText: `[fontSize:${title}rem][bold]{name}[fontSize:${value}rem][bold]{valueY}[/][/]`,

            });
        })


        legend.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        legend.markers.template.setAll({
            width: 12 * width,
            height: 12 * width
        });

        tooltip.label.setAll({
            fontSize: ff + 'rem'
        });
    }
}

function drawHCPCountChart() {
    var hcpCountChartRoot = am5.Root.new("enrollment-count-pie");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    hcpCountChartRoot.setThemes([
        am5themes_Animated.new(hcpCountChartRoot)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = hcpCountChartRoot.container.children.push(
        am5radar.RadarChart.new(hcpCountChartRoot, {
            panX: false,
            panY: false,
            startAngle: 180,
            endAngle: 360
        })
    );

    chart.getNumberFormatter().set("numberFormat", "#'%'");

    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    var axisRenderer = am5radar.AxisRendererCircular.new(hcpCountChartRoot, {
        innerRadius: -40
    });

    axisRenderer.grid.template.setAll({
        stroke: hcpCountChartRoot.interfaceColors.get("background"),
        visible: true,
        strokeOpacity: 0.8
    });

    var xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(hcpCountChartRoot, {
            maxDeviation: 0,
            min: 0,
            max: 100,
            strictMinMax: true,
            renderer: axisRenderer
        })
    );

    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    var axisDataItem = xAxis.makeDataItem({});

    var clockHand = am5radar.ClockHand.new(hcpCountChartRoot, {
        pinRadius: 10,
        radius: am5.percent(100),
        innerRadius: 5,
        bottomWidth: 10,
        topWidth: 0
    });

    clockHand.pin.setAll({
        fillOpacity: 1,
        strokeOpacity: 0.5,
        stroke: am5.color(0x061A32),
        strokeWidth: 2,
        strokeDasharray: [2, 2]
    });
    clockHand.hand.setAll({
        fillOpacity: 1,
        strokeOpacity: 0.5,
        stroke: am5.color(0x061A32),
        strokeWidth: 0.5
    });

    var bullet = axisDataItem.set(
        "bullet",
        am5xy.AxisBullet.new(hcpCountChartRoot, {
            sprite: clockHand
        })
    );

    xAxis.createAxisRange(axisDataItem);



    // setInterval(function () {
    //     var value = Math.round(Math.random() * 100);

    //     axisDataItem.animate({
    //         key: "value",
    //         to: value,
    //         duration: 500,
    //         easing: am5.ease.out(am5.ease.cubic)
    //     });

    //     axisRange0.animate({
    //         key: "endValue",
    //         to: value,
    //         duration: 500,
    //         easing: am5.ease.out(am5.ease.cubic)
    //     });

    //     axisRange1.animate({
    //         key: "value",
    //         to: value,
    //         duration: 500,
    //         easing: am5.ease.out(am5.ease.cubic)
    //     });
    // }, 2000);

    axisDataItem.set("value", 27);

    chart.bulletsContainer.set("mask", undefined);


    var axisRange0 = xAxis.createAxisRange(
        xAxis.makeDataItem({
            above: true,
            value: 0,
            endValue: 50
        })
    );

    axisRange0.get("axisFill").setAll({
        visible: true,
        fill: am5.color(0x38D6AE),
    });

    axisRange0.get("label").setAll({
        forceHidden: true
    });

    var axisRange1 = xAxis.createAxisRange(
        xAxis.makeDataItem({
            above: true,
            value: 27,
            endValue: 100
        })
    );

    axisRange1.get("axisFill").setAll({
        visible: true,
        fill: am5.color(0x576877),
    });

    axisRange1.get("label").setAll({
        forceHidden: true
    });


    // Make stuff animate on load
    chart.zoomOutButton.set("forceHidden", true);
    chart.appear(1000, 100);


}

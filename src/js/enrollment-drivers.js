let pieChartRoot = null;
let referralChartRoot = null;
let referralChartLegendRoot = null;
let enrollChartRoot = null;
let enrollChannelChartRoot = null;



const BASE_WIDTH = 1512;

initCharts();

function initCharts() {
    am5.ready(function () {
        am5.addLicense("AM5C329334656");
        drawPieChart();
        darwReferralTypeChart();
        drawEnrollmentChart();
        drawEnrollmentChannelChart();
        // chartTest()
    }); // end am5.ready()
}

function drawPieChart() {
    if (pieChartRoot) {
        pieChartRoot.dispose();
    }

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    pieChartRoot = am5.Root.new("referral-pie");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/

    const responsive = am5themes_Responsive.newEmpty(pieChartRoot);

    pieChartRoot.setThemes([
        am5themes_Animated.new(pieChartRoot),
        responsive
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chartRef = pieChartRoot.container.children.push(
        am5percent.PieChart.new(pieChartRoot, {
            startAngle: 160, endAngle: 380
        })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series

    var series0 = chartRef.series.push(
        am5percent.PieSeries.new(pieChartRoot, {
            valueField: "litres",
            categoryField: "country",
            startAngle: 160,
            endAngle: 380,
            radius: am5.percent(70),
            innerRadius: am5.percent(60)
        })
    );

    var colorSet = am5.ColorSet.new(pieChartRoot, {
        colors: [series0.get("colors").getIndex(0)],
        passOptions: {
            lightness: -0.05,
            hue: 0
        }
    });

    // series0.set("colors", colorSet);

    series0.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0xBFBFBF),
        am5.color(0x576877),
    ]);

    series0.ticks.template.set("forceHidden", true);
    series0.labels.template.set("forceHidden", true);

    var series1 = chartRef.series.push(
        am5percent.PieSeries.new(pieChartRoot, {
            startAngle: 160,
            endAngle: 380,
            valueField: "bottles",
            innerRadius: am5.percent(75),
            categoryField: "country"
        })
    );

    series1.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0xBFBFBF),
        am5.color(0x576877),
    ]);

    series1.ticks.template.set("forceHidden", true);
    series1.labels.template.set("forceHidden", true);

    var label = chartRef.seriesContainer.children.push(
        am5.Label.new(pieChartRoot, {
            textAlign: "center",
            centerY: am5.p50,
            centerX: am5.p50,
            paddingTop: 5,
            paddingRight: 5,
            paddingBottom: 5,
            paddingLeft: 5,
        })
    );


    var data = [
        {
            country: "Lithuania",
            litres: 501.9,
            bottles: 1500
        },
        {
            country: "Czech Republic",
            litres: 301.9,
            bottles: 990
        },
        {
            country: "Ireland",
            litres: 201.1,
            bottles: 785
        },
    ];

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series0.data.setAll(data);
    series1.data.setAll(data);

    pieChartRoot.events.on("frameended", sizeFix);

    function sizeFix() {

        var width = jQuery(window).width() / BASE_WIDTH;

        var ff = .875 * width;

        if (jQuery(window).width() > 1920) {
            ff = .7 * width;
        }
        if (jQuery(window).width() > 3000) {
            ff = .5 * width / 2;
        }
        if (jQuery(window).width() > 5000) {
            ff = .3 * width / 2;
        }

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


        label.setAll({
            text: `[bold fontFamily:'Nunito Sans' fontSize:${title}rem]TOTAL[/]\n[bold fontFamily:'Nunito Sans' fontSize:${value}rem]900[/]`,

        })
    }
}

function darwReferralTypeChart() {

    if (referralChartRoot) {
        referralChartRoot.dispose();
    }
    if (referralChartLegendRoot) {
        referralChartLegendRoot.dispose();
    }
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    referralChartRoot = am5.Root.new("referral-type");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/

    const myTheme = am5.Theme.new(referralChartRoot);

    myTheme.rule("Grid").setAll({
        stroke: am5.color(0xFFFF00),
        strokeOpacity: 0
    });

    myTheme.rule("AxisTick").setAll({
        // stroke: am5.color(0xFFff00),
        visible: false
    });

    const responsive = am5themes_Responsive.newEmpty(referralChartRoot);


    referralChartRoot.setThemes([
        am5themes_Animated.new(referralChartRoot),
        responsive,
        myTheme,
    ]);



    var container = referralChartRoot.container.children.push(am5.Container.new(referralChartRoot, {
        layout: referralChartRoot.verticalLayout,
        width: am5.percent(95),
        height: am5.percent(95),
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50),
    }));

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = container.children.push(am5xy.XYChart.new(referralChartRoot, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: referralChartRoot.verticalLayout,
        fontFamily: 'Nunito Sans'
    }));


    // Fix the  left padding
    chart.leftAxesContainer.setAll({
        width: 0
    })

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    var scrollbarX = am5.Scrollbar.new(referralChartRoot, {
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
        am5.color(0xBFBFBF),
        am5.color(0x576877),
    ]);

    var data = [
        {
            "year": "OCT 15",
            "wct": 3.5,
            "text": 5.5,
            "website": 2.1,
        },
        {
            "year": "OCT 16",
            "wct": 2.6,
            "text": 2.7,
            "website": 2.2,

        },
        {
            "year": "OCT 17",
            "wct": 2.8,
            "text": 2.9,
            "website": 2.4,
        },
        {
            "year": "OCT 18",
            "wct": 2.8,
            "text": 2.9,
            "website": 2.4,
        },
        {
            "year": "OCT 19",
            "wct": 3,
            "text": 5,
            "website": 2.6,
        },
        {
            "year": "OCT 20",
            "wct": 2.1,
            "text": 3.9,
            "website": 5.4,
        },
    ]

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(referralChartRoot, {
        categoryField: "year",
        renderer: am5xy.AxisRendererX.new(referralChartRoot, {
            minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(referralChartRoot, {}),

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
        fontSize: '0.875rem',
        fontFamily: 'Nunito Sans'
    });

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(referralChartRoot, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(referralChartRoot, {})
    }));

    // yAxis.label.disabled = true
    // hide axis label 
    var yRenderer = yAxis.get("renderer")
    yRenderer.labels.template.setAll({
        visible: false
    });

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/

    referralChartLegendRoot = am5.Root.new("referral-legend");

    let legend = referralChartLegendRoot.container.children.push(
        am5.Legend.new(referralChartLegendRoot, {
            // width: am5.percent(100),
            width: am5.percent(90),
            height: am5.percent(100),
            x: am5.percent(50),
            centerX: am5.percent(50),
            y: am5.percent(50),
            centerY: am5.percent(10),
            // paddingTop: 5,
            layout: referralChartLegendRoot.horizontalLayout,
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


    var tooltip = am5.Tooltip.new(referralChartRoot, {
        autoTextColor: false,
        labelText: "{categoryX}: {valueY}"
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });

    function makeSeries(name, fieldName, curve) {
        var series = chart.series.push(am5xy.ColumnSeries.new(referralChartRoot, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year",
            tooltip
        }));

        xAxis.data.setAll(data);
        legend.data.push(series);
        series.data.setAll(data);
        seriesData.push(series)

        series.appear();

    }
    chart.zoomOutButton.set("forceHidden", true);

    // axis.disabled = true;
    makeSeries("WARM CALL TRANSFER", "wct");
    makeSeries("TEXT", "text");
    makeSeries("WEBSITE", "website", true);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    referralChartRoot.events.on("frameended", sizeFix);

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
        enrollChartRoot.dispose()
    }
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    enrollChartRoot = am5.Root.new("enrollment-chart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    const myTheme = am5.Theme.new(enrollChartRoot);

    myTheme.rule("Grid").setAll({
        strokeOpacity: 0
    });

    myTheme.rule("AxisTick").setAll({
        // stroke: am5.color(0xFFFFFFF),
        visible: false
    });


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
    }));


    // Fix the  left padding
    chart.leftAxesContainer.setAll({
        width: 0
    })

    var cursor = chart.set("cursor", am5xy.XYCursor.new(enrollChartRoot, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(enrollChartRoot, {
        categoryField: "sp",
        renderer: am5xy.AxisRendererX.new(enrollChartRoot, {
            minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(enrollChartRoot, {})
    }));

    var xRenderer = xAxis.get("renderer")
    xRenderer.labels.template.setAll({
        fontWeight: 'bold',
        fill: am5.color(0x061A32),
        fontSize: '0.875rem',
        fontFamily: 'Nunito Sans'
    });

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(enrollChartRoot, {
        renderer: am5xy.AxisRendererY.new(enrollChartRoot, {})
    }));

    var yRenderer = yAxis.get("renderer")
    yRenderer.labels.template.setAll({
        visible: false
    });


    // Tooltip 
    var tooltip = am5.Tooltip.new(enrollChartRoot, {
        autoTextColor: false,
        labelText: "{categoryX}: {valueY}"
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/

    var scrollbarX = am5.Scrollbar.new(enrollChartRoot, {
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
    chart.zoomOutButton.set("forceHidden", true);

    var data = [{
        sp: "SP1",
        value: 20
    }, {
        sp: "SP2",
        value: 25
    }, {
        sp: "SP3",
        value: 15
    }, {
        sp: "SP4",
        value: 21
    }, {
        sp: "SP5",
        value: 14
    }, {
        sp: "SP6",
        value: 11
    }, {
        sp: "SP7",
        value: 20
    }, {
        sp: "SP8",
        value: 24
    },
    ];

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(enrollChartRoot, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "sp",
        tooltip
    }));

    series.set("fill", am5.color(0x38D6AE));
    series.set("stroke", am5.color(0x38D6AE));

    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.columns.template.setAll({
        tooltipText: "{categoryX}: {valueY}",
        tooltipY: am5.percent(10),
        cornerRadiusTL: 2,
        cornerRadiusTR: 2
    });

    var bullet = series.bullets.push(function () {
        return am5.Bullet.new(enrollChartRoot, {
            locationX: 0.5,
            locationY: 1,
            sprite: am5.Label.new(enrollChartRoot, {
                text: "{valueY}",
                centerY: am5.p10,
                centerX: am5.p50,
                populateText: true,
                templateField: "bulletSettings",
                fontSize: 14,
                fontFamily: 'Nunito Sans',
                fontWeight: 700,
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


    enrollChartRoot.setThemes([
        am5themes_Animated.new(enrollChartRoot),
        am5themes_Responsive.new(enrollChartRoot),
        myTheme,
    ]);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
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

        yRenderer.minGridDistance = 1;
        xRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        yRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });


        series?.strokes?.template?.setAll({
            strokeWidth: 1 * ff,
        });


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


function drawEnrollmentChannelChart() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("enrollment-channel");
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    const myTheme = am5.Theme.new(root);

    myTheme.rule("Grid").setAll({
        strokeOpacity: 1
    });

    myTheme.rule("AxisTick").setAll({
        stroke: am5.color(0xFFff00),
        visible: false
    });



    root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Responsive.new(root),
        myTheme,
    ]);

    // var container = root.container.children.push(am5.Container.new(root, {
    //     width: am5.percent(95),
    //     height: am5.percent(100),
    //     // layout: root.verticalLayout,
    //     x: am5.percent(60),
    //     centerX: am5.percent(50),
    //     y: am5.percent(50),
    //     centerY: am5.percent(50),
    // }));

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        paddingRight: 0
    }));

    chart.rightAxesContainer.setAll({
        width: 0
    })


    var data = [{
        "cat": "MICROSITE\n(HCP) - 45",
        "active": 15,
        "onhold": 24,
        "offboarded": 6,

    }, {
        "cat": "MICROSITE\n(PATIENT)",
        "active": 41,
        "onhold": 42,
        "offboarded": 26,

    },
    {
        "cat": "JCP",
        "active": 55,
        "onhold": 40,
        "offboarded": 20,

    },
    {
        "cat": "1-833-\nWITHME1",
        "active": 15,
        "onhold": 24,
        "offboarded": 6,

    },
    {
        "cat": "CMM",
        "active": 12,
        "onhold": 9,
        "offboarded": 0,

    },
    {
        "cat": "WEGMANS",
        "active": 0,
        "onhold": 0,
        "offboarded": 0,

    },
    ].reverse()

    chart.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
        am5.color(0xBFBFBF),
        am5.color(0x061A32),
        am5.color(0x92EBD7),
        am5.color(0xB61D69),
    ]);

    // Create axes

    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 10, inversed: true, });
    xRenderer.labels.template.setAll({
        fontSize: 10,
        fontWeight: 700,
        rotation: -90,
        fontSize: '0',

    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
    });

    var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30, opposite: true });
    yRenderer.labels.template.setAll({
        fontSize: '0',
    });
    yRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
    });

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
    }));


    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        // min: 0,
        categoryField: "cat",
        // max: 100,
        // numberFormat: "#'%'",
        // strictMinMax: true,
        // calculateTotals: true,


        renderer: yRenderer,
    }));
    yAxis.data.setAll(data);

    var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });
    yRenderer.labels.template.setAll({
        fontSize: 21,
        textAlign: 'right',
        fontWeight: 700,
        maxWidth: 40,
        fontFamily: 'Nunito Sans',

    });
    // yRenderer.grid.template.setAll({
    //     stroke: am5.color(0xFFffff),
    // });

    yRenderer.grid.template.setAll({
        stroke: am5.color(0xffffff),
        strokeWidth: 0
    });
    var yAxis1 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        // min: 0,
        categoryField: "cat",
        // max: 100,
        // numberFormat: "#'%'",
        // strictMinMax: true,
        // calculateTotals: true,
        renderer: yRenderer,
    }));


    yAxis1.data.setAll(data);

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    // enroll-channel-legend
    var enrollChannelLegend = am5.Root.new("enroll-channel-legend");

    var legend = enrollChannelLegend.container.children.push(
        am5.Legend.new(enrollChannelLegend, {
            width: am5.percent(90),
            // marginTop: 0,
            // marginRight:0,
            // centerX: am5.p10,
            // x: am5.p50,
            // width: am5.percent(95),
            height: am5.percent(100),
            x: am5.percent(50),
            centerX: am5.percent(50),
            y: am5.percent(50),
            centerY: am5.percent(10),
            layout: enrollChannelLegend.horizontalLayout,
            scale: 0.9
        }));

    legend.markers.template.setAll({
        width: 12,
        height: 12,
    });

    legend.markerRectangles.template.setAll({
        cornerRadiusTL: 100,
        cornerRadiusTR: 100,
        cornerRadiusBL: 100,
        cornerRadiusBR: 100,
        // marginTop:10
    });

    legend.labels.template.setAll({
        fontSize: '0.75rem',
        fontWeight: "700",
        fontFamily: 'Nunito Sans',
        // textAlign:'right',
        scale: .8
    });

    var tooltip = am5.Tooltip.new(root, {
        autoTextColor: false,
        labelText: `[fontSize:12px][fontFamily:'Nunoito Sans'][bold]{name}[/][/]\n[fontSize:14px][bold][fontFamily:'Nunito Sans']{valueX}[/][/]`
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });


    let seriesData = []
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, curve) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            baseAxis: yAxis,
            valueXField: fieldName,
            categoryYField: "cat",
            maskBullets: false,
            tooltip,
        }));

        series.columns.template.setAll({
            tooltipText: `[fontSize:12px][fontFamily:'Nunoito Sans'][bold]{name}[/][/]\n[fontSize:14px][bold][fontFamily:'Nunito Sans']{valueX}[/][/]`,
            tooltipY: am5.percent(10),
            cornerRadiusBR: curve ? 2 : 0,
            cornerRadiusTR: curve ? 2 : 0,


        });

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                    text: "{valueX}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: am5.p50,
                    centerX: am5.p50,
                    populateText: true,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: 'Nunito Sans'
                })
            });
        });
        // series.bullets.push(function (root, series, dataItem) {
        //     if (dataItem.dataContext.offboarded > 0) {
        //         return am5.Bullet.new(root, {
        //             sprite: am5.Label.new(root, {
        //                 text: "{valueX}",
        //                 fill: root.interfaceColors.get("alternativeText"),
        //                 centerY: am5.p50,
        //                 centerX: am5.p50,
        //                 populateText: true,
        //                 fontSize: 14
        //             })
        //         });
        //     }

        // });

        series.columns.template.setAll({
            height: am5.percent(97),
            maxWidth: am5.percent(50),
            maxHeight: am5.percent(50),
        });


        series.columns.template.onPrivate("width", function (width, target) {
            am5.array.each(target.dataItem.bullets, function (bullet) {
                if (width !== 0) {
                    bullet.get("sprite").show();
                }
                else {
                    bullet.get("sprite").hide();
                }
            });
        });

        // series.columns.template.setAll({
        //     tooltipText: "{name}, {categoryY}: {valueX}",
        //     tooltipY: am5.percent(10),
        // });

        legend.data.push(series);
        series.data.setAll(data);
        series.appear();
    }

    makeSeries("ACTIVE PATIENTS", "active");
    makeSeries("ON HOLD", "onhold");
    makeSeries("OFF BOARDED", "offboarded", true);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
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


        tooltip.label.setAll({
            fontSize: ff + 'rem'
        });

        // xRenderer = xAxis.get("renderer");
        // yRenderer = yAxis.get("renderer");

        xRenderer.minGridDistance = 1;
        yRenderer.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        // xRenderer.labels.template.setAll({
        //     fontSize: ff + 'rem',
        // });

        seriesData.forEach(series => {
            series?.strokes?.template?.setAll({
                strokeWidth: 1 * ff,
            });
        })

        legend.labels.template.setAll({
            fontSize: ff + 'rem',
        });

        legend.markers.template.setAll({
            width: 12 * width,
            height: 12 * width
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

const throttle = (fn, limit) => {
    let flag = true;
    return function () {
        let context = this;
        let args = arguments;
        if (flag) {
            fn.apply(context, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, limit);
        }
    }
}

function _debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
const redrawCharts = _debounce(initCharts, 300)

// window.addEventListener("resize", redrawCharts);

function getThumbSizes() {

    let screenWidth = $(document).width()
    if (screenWidth >= 5120) {
        return {
            height: 54,
            width: 54,
        }
    }
    if (screenWidth >= 3840 && screenWidth < 5120) {
        return {
            height: 38,
            width: 38,
            paddingTop: 4,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 8,
        }
    }
    if (screenWidth >= 2880 && screenWidth < 3840) {
        return {
            height: 34,
            width: 34,
            paddingTop: 4,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 8,
        }
    }
    if (screenWidth >= 2048 && screenWidth < 2880) {
        return {
            height: 30,
            width: 30,
            paddingTop: 4,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 8,
        }
    }

    if (screenWidth >= 1920 && screenWidth < 2048) {
        return {
            height: 24,
            width: 24,
            paddingTop: 4,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 8,
        }
    }

    return {
        height: 21,
        width: 21,
        paddingTop: 4,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 8,
    }

}
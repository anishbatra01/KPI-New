am5.ready(function () {

    // drawPieChart();
    darwReferralTypeChart();
    // chartTest()
    // drawEnrollmentChart();
    // drawEnrollmentChannelChart();

}); // end am5.ready()

function drawPieChart() {
    am5.addLicense("AM5C329334656");
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("referral-pie");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/


    root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Responsive.new(root),
    ]);


    // root.defaultTheme.rule("ColorSet").set("colors", [
    //     am5.color(0xff00ff),
    //     am5.color(0x087f8c),
    //     am5.color(0x5aaa95),
    //     am5.color(0x86a873),
    //     am5.color(0xbb9f06)
    // ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            startAngle: 160, endAngle: 380
        })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series

    var series0 = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "litres",
            categoryField: "country",
            startAngle: 160,
            endAngle: 380,
            radius: am5.percent(70),
            innerRadius: am5.percent(60)
        })
    );

    var colorSet = am5.ColorSet.new(root, {
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

    var series1 = chart.series.push(
        am5percent.PieSeries.new(root, {
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

    var label = chart.seriesContainer.children.push(
        am5.Label.new(root, {
            textAlign: "center",
            centerY: am5.p50,
            centerX: am5.p50,
            text: "[bold fontSize:14px]TOTAL[/]\n[bold fontSize:32px]900[/]"
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
}

function darwReferralTypeChart() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("referral-type");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/

    const myTheme = am5.Theme.new(root);

    myTheme.rule("Grid").setAll({
        stroke: am5.color(0xFFFF00),
        strokeOpacity: 0
    });

    myTheme.rule("AxisTick").setAll({
        // stroke: am5.color(0xFFff00),
        visible: false
    });

    root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Responsive.new(root),
        myTheme
    ]);

    // root.setThemes([
    //     am5themes_Animated.new(root)
    // ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
    }));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    var scrollbarX = am5.Scrollbar.new(root, {
        orientation: "horizontal",
    });

    scrollbarX.thumb.setAll({
        fill: am5.color(0xE8E8E8),
    });

    scrollbarX.startGrip.setAll({
        visible: true,
        fill: am5.color(0xBFBFBF)
    });

    scrollbarX.endGrip.setAll({
        visible: true,
        fill: am5.color(0xBFBFBF)
    });

    chart.set("scrollbarX", scrollbarX);
    chart.chartContainer.children.push(scrollbarX);


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
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(root, {}),

    }));

    // xRenderer.grid.template.setAll({
    //     stroke: am5.color(0xFFffff),
    // });



    // xAxis.get("renderer").grid.template.setAll({
    //     stroke: am5.color(0xFFffff),
    //     strokeOpacity: 0
    // });

    xAxis.get("renderer").labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        fontSize: 12,
        fontWeight: 'bold',
        fill: am5.color(0x061A32),
        // minPosition: 0.8,
        // oversizedBehavior : 'fit',
        oversizedBehavior: 'wrap',
        stroke: am5.color(0xFFffff),
    });




    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // yAxis.label.disabled = true

    // hide axis label 
    yAxis.get("renderer").labels.template.setAll({
        visible: false
    });

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/

    let legendRoot = am5.Root.new("referral-legend");


    let legend = legendRoot.container.children.push(
        am5.Legend.new(legendRoot, {
            width: am5.percent(100),
            centerX: am5.percent(50),
            x: am5.percent(50),
            paddingTop: 5,
            paddingBottom: 10,
            layout: legendRoot.horizontalLayout
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
        width: 11,
        height: 11
    });

    legend.labels.template.setAll({
        fontSize: 11,
        fontWeight: "700",
        fill: am5.color(0x263238),
    });

    legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10
    });


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year"
        }));

        series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}: {valueY}",
            tooltipY: am5.percent(10),

        });

        xAxis.data.setAll(data);
        legend.data.push(series);
        series.data.setAll(data);

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

    makeSeries("WARM CALL TRANSFER", "wct");
    makeSeries("TEXT", "text");
    makeSeries("WEBSITE", "website");


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
}


function drawEnrollmentChart() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("enrollment-chart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    const myTheme = am5.Theme.new(root);

    myTheme.rule("Grid").setAll({
        strokeOpacity: 0
    });

    myTheme.rule("AxisTick").setAll({
        // stroke: am5.color(0xFFFFFFF),
        visible: false
    });

    root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Responsive.new(root),
        myTheme
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX"
    }));


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "sp",
        renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(root, {})
    }));

    xAxis.get("renderer").labels.template.setAll({
        fontSize: 12,
        fontWeight: 'bold',
        fill: am5.color(0x061A32),
    });

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    yAxis.get("renderer").labels.template.setAll({
        visible: false
    });


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "sp",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
        })
    }));

    series.set("fill", am5.color(0x38D6AE));
    series.set("stroke", am5.color(0x38D6AE));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    var scrollbarX = am5.Scrollbar.new(root, {
        orientation: "horizontal",
    });

    scrollbarX.thumb.setAll({
        fill: am5.color(0xE8E8E8),
    });

    scrollbarX.startGrip.setAll({
        visible: true,
        fill: am5.color(0xBFBFBF)
    });

    scrollbarX.endGrip.setAll({
        visible: true,
        fill: am5.color(0xBFBFBF)
    });

    chart.set("scrollbarX", scrollbarX);
    chart.chartContainer.children.push(scrollbarX);

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

    xAxis.data.setAll(data);
    series.data.setAll(data);

    var categoryLabel = series.bullets.push(function () {
        return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
                text: "{valueX}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: am5.p50,
                centerX: am5.p50,
                populateText: true
            })
        });
    });

    series.columns.template.setAll({
        tooltipText: "{categoryX}: {valueY}",
        tooltipY: am5.percent(10)
    });

    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationX: 0.5,
            locationY: 1,
            sprite: am5.Label.new(root, {
                text: "{valueY}",
                // fill: root.interfaceColors.get("alternativeText"),
               
                fill: am5.color(0x000000),
                centerY: am5.p10,
                centerX: am5.p50,
                populateText: true
            })
        });
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
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


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 13,
        paddingLeft: -10,

    }));

    // Set color 
    chart.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0xBFBFBF),
        am5.color(0x576877),
    ]);

    var data = [{
        "cat": "MICROSITE (HCP) - 45",
        "active": 15,
        "onhold": 24,
        "offboarded": 6,

    }, {
        "cat": "MICROSITE (PATIENT)",
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
        "cat": "1-833-WITHME1",
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

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "cat",
        renderer: am5xy.AxisRendererY.new(root, {
            opposite: false
        }),
        tooltip: am5.Tooltip.new(root, {}),
        bullet: function (root, axis, dataItem) {
            return am5xy.AxisBullet.new(root, {
                location: 0.5,
                sprite: am5.Circle.new(root, {
                    text: "{valueX}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: am5.p50,
                    centerX: am5.p50,
                    populateText: true
                })
            });
        }
    }));

    yAxis.get("renderer").labels.template.setAll({
        visible: false,
    });

    yAxis.data.setAll(data);

    let yRenderer = yAxis.get("renderer");
    yRenderer.grid.template.setAll({
        stroke: am5.color(0x000000),
        strokeWidth: 1
    });

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, { inversed: true, }),
    }));

    xAxis.get("renderer").labels.template.setAll({
        visible: false,
    });



    let xRenderer = xAxis.get("renderer");
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xFFFFFF),
        strokeWidth: 0,
        strokeOpacity: 0,

    });


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(45),
        x: am5.p50,
        useDefaultMarker: true,
        layout: root.horizontalLayout

    }));

    legend.markers.template.setAll({
        width: 11,
        height: 11
    });

    legend.labels.template.setAll({
        fontSize: 12,
        fontWeight: "700",
        fill: am5.color(0x263238),
    });

    legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10
    });


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            baseAxis: yAxis,
            valueXField: fieldName,
            categoryYField: "cat"
        }));

        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        var categoryLabel = series.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                    text: "{valueX}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: am5.p50,
                    centerX: am5.p50,
                    populateText: true
                })
            });
        });

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationX: 0.5,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                    text: "{category}",
                    centerX: am5.percent(50),
                    centerY: am5.percent(50),
                    textAlign: "center",
                    populateText: true
                })
            });
        });

        series.columns.template.setAll({
            height: am5.percent(98)
        });

        legend.data.push(series);
    }

    makeSeries("ACTIVE PATIENTS", "active");
    makeSeries("ON HOLD", "onhold");
    makeSeries("OFF BOARDED", "offboarded");


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
}


function chartTest(params) {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("referral-type");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    const myTheme = am5.Theme.new(root);

    myTheme.rule("Grid").setAll({
        strokeOpacity: 1
    });

    myTheme.rule("AxisTick").setAll({
        stroke: am5.color(0xFFff00),
        visible: true
    });

    root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Responsive.new(root),
        myTheme,
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
    }));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    var data = [{
        "year": "2021",
        "europe": 2.5,
        "namerica": 2.5,
        "asia": 2.1,
        "lamerica": 1,
        "meast": 0.8,
        "africa": 0.4
    }, {
        "year": "2022",
        "europe": 2.6,
        "namerica": 2.7,
        "asia": 2.2,
        "lamerica": 0.5,
        "meast": 0.4,
        "africa": 0.3
    },
    {
        "year": "2023",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": 2.4,
        "lamerica": 0.3,
        "meast": 0.9,
        "africa": 0.5
    },
    ]


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));

    xAxis.get("renderer").labels.template.setAll({
        rotation: -90,
        centerY: am5.percent(50),
        centerX: am5.percent(100),
        fontSize: 12,
        fontWeight: 'bold',
        fill: am5.color(0x061A32),
        oversizedBehavior: 'wrap',
    });


    xAxis.data.setAll(data);

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year"
        }));

        series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}: {valueY}",
            tooltipY: am5.percent(10)
        });
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                    text: "{valueY}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: am5.p50,
                    centerX: am5.p50,
                    populateText: true
                })
            });
        });

        legend.data.push(series);
    }

    makeSeries("Europe", "europe");
    makeSeries("North America", "namerica");
    makeSeries("Asia", "asia");
    makeSeries("Latin America", "lamerica");
    makeSeries("Middle East", "meast");
    makeSeries("Africa", "africa");


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
}
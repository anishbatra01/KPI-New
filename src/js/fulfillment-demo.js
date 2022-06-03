const BASE_WIDTH = 1512

$(document).ready(function () {

    initCharts()

    function initCharts() {
        am5.ready(function () {
            am5.addLicense("AM5C329334656");
            drawInsuranceTypeChart()
            drawAgeGroupChart()
        }); // end am5.ready()
    }

})

function drawInsuranceTypeChart() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("insuranceTypeChart");

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
        tooltip,
        legendLabelText: "{category}",
        legendValueText: "-{value}%"
    }));


    series.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
    ]);

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
        { value: 70, category: "COMMERCIAL" },
        { value: 30, category: "GOVERNMENT" },
    ]);

    series.labels.template.setAll({
        maxWidth: 0,
        oversizedBehavior: "wrap" // to truncate labels, use "truncate"
    });

    var legendRoot = am5.Root.new("insuranceTypeLegend");

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
        scale: 0.9
    }));

    legend.data.setAll(series.dataItems);

    legend.labels.template.setAll({
        fontSize: '0.775rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });
    legend.valueLabels.template.setAll({
        fontSize: '0.775rem',
        fontWeight: 400,
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

function drawAgeGroupChart() {
    var root = am5.Root.new("chart_age_group");
    root.setThemes([am5themes_Animated.new(root)]);

    var container = root.container.children.push(am5.Container.new(root, {
        width: am5.percent(95),
        height: am5.percent(95),
        // layout: root.verticalLayout,
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(50),
        centerY: am5.percent(50)
    }));

    var chart = container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            arrangeTooltips: false,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingTop: 20
        })
    );

    chart.getNumberFormatter().set("numberFormat", "#s %");

    // var legend = chart.children.push(
    // 		am5.Legend.new(root, {
    // 		centerX: am5.p50,
    // 		x: am5.p50,
    // 	})
    // );

    chart.get("colors").set("colors", [
        am5.color(0x38D6AE),
        am5.color(0x576877),
        am5.color(0xBFBFBF),
        am5.color(0x061A32),
        am5.color(0x92EBD7),
        am5.color(0xB61D69),
    ]);

    // Data
    var data = [
        {
            age: "85+",
            male: -10,
            female: 5
        },
        {
            age: "75-84",
            male: -5,
            female: 10
        },
        {
            age: "65-74",
            male: -18,
            female: 18
        },
        {
            age: "55-64",
            male: -18,
            female: 15
        },
        {
            age: "45-54",
            male: -10,
            female: 5
        },
        {
            age: "35-44",
            male: 0,
            female: 0
        },
        {
            age: "25-34",
            male: -10,
            female: 5
        },
        {
            age: "18-24",
            male: -5,
            female: 10
        },
        {
            age: "10-17",
            male: -6,
            female: 18
        },
        {
            age: "0-9",
            male: -0,
            female: 5
        }
    ];

    var yRenderer = am5xy.AxisRendererY.new(root, {
        minGridDistance: 20,
        inversed: true,
        cellStartLocation: 0.3,
        cellEndLocation: 0.7
    });

    yRenderer.labels.template.setAll({
        fontSize: '.775rem',
        fontWeight: 700,
        paddingRight: 10,
        fontFamily: 'Nunito Sans'
    });
    yRenderer.grid.template.setAll({
        stroke: am5.color(0xBFBFBF),
        fillOpacity: 1
    });

    var yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "age",
            renderer: yRenderer
        })
    );

    yAxis.data.setAll(data);

    var yRenderer1 = am5xy.AxisRendererY.new(root, {
        minGridDistance: 20,
        inversed: true,
        cellStartLocation: 0.3,
        cellEndLocation: 0.7,
        opposite: true
    });

    yRenderer1.labels.template.setAll({
        fontSize: '.775rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans',
        paddingLeft: 10
    });
    yRenderer1.grid.template.setAll({
        stroke: am5.color(0xBFBFBF),
        fillOpacity: 1,
    });

    var yAxis1 = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "age",
            renderer: yRenderer1,
        })
    );

    yAxis1.data.setAll(data);

    var xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.labels.template.setAll({
        fontSize: '.775rem',
        fontWeight: 700,
        paddingTop: 10,
        fontFamily: 'Nunito Sans'
    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xBFBFBF),
        fillOpacity: 1
    })
    var xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            // min: -20,
            // max: 20,
            renderer: xRenderer
        })
    );
    var labelmale, labelfemale;
    function createSeries(field, labelCenterX, pointerOrientation, rangeValue, yaxisss) {
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                xAxis: xAxis,
                yAxis: yaxisss,
                valueXField: field,
                categoryYField: "age",
                sequencedInterpolation: true,
                clustered: false,
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: pointerOrientation,
                    labelText: "{categoryY} years : {valueX}"
                })
            })
        );

        series.columns.template.setAll({
            height: am5.percent(100)
        });

        // series.bullets.push(function() {
        //   return am5.Bullet.new(root, {
        //     locationX: 1,
        //     locationY: 0.5,
        //     sprite: am5.Label.new(root, {
        //       centerY: am5.p50,
        //       text: "{valueX}",
        //       populateText: true,
        //       centerX: labelCenterX
        //     })
        //   });
        // });

        series.data.setAll(data);
        series.appear();

        var rangeDataItem = xAxis.makeDataItem({
            value: rangeValue
        });
        xAxis.createAxisRange(rangeDataItem);

        // rangeDataItem.get("grid").setAll({
        // 		strokeOpacity: 0,
        // 		stroke: series.get("stroke")
        // });


        // var label = rangeDataItem.get("label");
        // label.setAll({
        // 		text: field.toUpperCase(),
        // 		fontSize: ".875rem",
        // 		fill: am5.color(0x000000),
        // 		// paddingTop: 10,
        // 		isMeasured: false,
        // 		// centerX: labelCenterX
        // 		y:am5.percent(100),
        // 		centerY:am5.percent(100)
        // });

        if (field == 'male') {
            labelmale = chart.plotContainer.children.push(am5.Label.new(root, {
                text: field.toUpperCase(),
                fontSize: ".875rem",
                fontWeight: '700',
                fill: series.get("fill"),
                y: -30,
                dx: -3,
                paddingTop: 10,
                isMeasured: false,
                x: am5.percent(30),
                centerX: am5.percent(30),
                fontFamily: 'Nunito Sans'
            }));
        }
        if (field == 'female') {
            labelfemale = chart.plotContainer.children.push(am5.Label.new(root, {
                text: field.toUpperCase(),
                fontSize: ".875rem",
                fontWeight: '700',
                fill: am5.color(0x000000),
                y: -30,
                dx: 3,
                paddingTop: 10,
                isMeasured: false,
                x: am5.percent(60),
                centerX: am5.percent(60),
                fontFamily: 'Nunito Sans'
            }));
        }
        return series;
    }

    createSeries("male", am5.p100, "right", -20, yAxis);
    createSeries("female", 0, "left", 20, yAxis1);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomY"
    }));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);


    chart.appear(1000, 100);

    root.events.on("frameended", exportChart);

    function exportChart() {
        var width = jQuery(window).width() / BASE_WIDTH;
        var ff = .875 * width;
        var dd = .775 * width;

        if (jQuery(window).width() > 1920) {
            ff = .7 * width;
            dd = .7 * width;
        }
        if (jQuery(window).width() > 3000) {
            ff = .5 * width;
            dd = .5 * width;
        }
        if (jQuery(window).width() > 5000) {
            ff = .3 * width;
            dd = .3 * width;
        }

        var xRenderer = xAxis.get("renderer");
        var yRenderer = yAxis.get("renderer");
        var yRenderer1 = yAxis1.get("renderer");

        yRenderer.minGridDistance = width * 20;
        yRenderer1.minGridDistance = width * 20;
        xRenderer.minGridDistance = width * 50;
        xRenderer.labels.template.setAll({
            fontSize: dd + 'rem',
            paddingBottom: 10 * width
        });

        yRenderer1.labels.template.setAll({
            fontSize: dd + 'rem',
            paddingLeft: 10 * width
        });

        yRenderer.labels.template.setAll({
            fontSize: dd + 'rem',
            paddingRight: 10 * width
        });

        labelmale.set('fontSize', ff + 'rem');
        labelfemale.set('fontSize', ff + 'rem');


        if (width > 1.5) {
            labelmale.set('y', width * -15);
            labelfemale.set('y', width * -15);
        }
        // console.log(labelmale);
        // labelmale.template.setAll({
        // 	fontSize:ff+'rem',
        // })
        // labelfemale.template.setAll({
        // 	fontSize:ff+'rem',
        // })
    }
}
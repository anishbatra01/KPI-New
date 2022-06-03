let enrollChannelChartRoot = null;



const BASE_WIDTH = 1512;

initCharts();

function initCharts() {
    am5.ready(function () {
        am5.addLicense("AM5C329334656");
        drawEnrollmentChannelChart();
        drawEnrollToContentChart();
        drawAbandonChart();
        drawProtalEngChart()
        // chartTest()
    }); // end am5.ready()
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



    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        paddingLeft: 5,
        paddingTop: 0,
        paddingRight: 0
    }));

    // console.log(chart);
    chart.rightAxesContainer.setAll({
        width: 0
    })


    var data = [{
        "year": "COST SUPPORT",
        "type1": 200,
    },
    {
        "year": "INJECTION SUPPORT",
        "type1": 170,
    }, {
        "year": "SIDE EFFECT CONCERNS",
        "type1": 180,
    }, {
        "year": "COMMUNITY",
        "type1": 160,
    }].reverse();

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
        fontSize: '0'
    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
    });

    var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30, opposite: true });
    yRenderer.labels.template.setAll({
        fontSize: '0'
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
        categoryField: "year",
        // max: 100,
        // numberFormat: "#'%'",
        // strictMinMax: true,
        // calculateTotals: true,
        renderer: yRenderer,
    }));
    yAxis.data.setAll(data);

    var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });
    yRenderer.labels.template.setAll({
        fontSize: '0.75rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });
    yRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
    });
    var yAxis1 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        // min: 0,
        categoryField: "year",
        // max: 100,
        // numberFormat: "#'%'",
        // strictMinMax: true,
        // calculateTotals: true,
        renderer: yRenderer,
    }));

    yAxis1.data.setAll(data);


    // Tooltip 
    var tooltip = am5.Tooltip.new(root, {
        autoTextColor: false,
        labelText: "{categoryY}: {valueX}"
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });


    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: 'ACTIVE PATIENTS',
        stacked: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: 'type1',
        // valueYShow: "valueYTotalPercent",
        categoryYField: "year",
        tooltip: tooltip
    }));

    series.columns.template.setAll({
        // tooltipText: "[fontSize:16px][bold]{name}[/][/]\n[fontSize:14px][bold]{type1}[/][/]",
        tooltipText: "{categoryX}: {valueY}",
        tooltipY: am5.percent(10),
        cornerRadiusTL: 2,
        cornerRadiusTR: 2,
        height: am5.percent(97),
        maxWidth: am5.percent(50),
        maxHeight: am5.percent(50),
    });
    series.data.setAll(data);

    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
                centerY: am5.p50,
                text: "{valueX}",
                populateText: true,
                fontSize: '.75rem',
                fontWeight: 700,
                fontFamily: 'Nunito Sans'
            })
        });
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

    series.appear(1000, 100);
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
function drawAbandonChart() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("abandon-chart");
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



    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        paddingLeft: 5,
        paddingTop: 0,
        paddingRight: 0
    }));

    chart.rightAxesContainer.setAll({
        width: 0
    })


    var data = [{
        "year": "COST SUPPORT",
        "type1": 333,
    },
    {
        "year": "INJECTION SUPPORT",
        "type1": 353,
    }, {
        "year": "SIDE EFFECT CONCERNS",
        "type1": 253,
    }, {
        "year": "COMMUNITY",
        "type1": 343,
    }];

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
        fontSize: '0'
    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
    });

    var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30, opposite: true });
    yRenderer.labels.template.setAll({
        fontSize: '0'
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
        categoryField: "year",
        // max: 100,
        // numberFormat: "#'%'",
        // strictMinMax: true,
        // calculateTotals: true,
        renderer: yRenderer,
    }));
    yAxis.data.setAll(data);

    var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });
    yRenderer.labels.template.setAll({
        fontSize: '0.75rem',
        fontWeight: 700,
        fontFamily: 'Nunito Sans'
    });
    yRenderer.grid.template.setAll({
        stroke: am5.color(0xFFffff),
    });
    var yAxis1 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        // min: 0,
        categoryField: "year",
        // max: 100,
        // numberFormat: "#'%'",
        // strictMinMax: true,
        // calculateTotals: true,
        renderer: yRenderer,
    }));

    yAxis1.data.setAll(data);


    // Tooltip 
    var tooltip = am5.Tooltip.new(root, {
        autoTextColor: false,
        labelText: "{categoryY}: {valueX}"
    });

    tooltip.label.setAll({
        fontSize: '.875rem',
        fontFamily: 'Nunito Sans',
        fontWeight: 700
    });


    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: 'ACTIVE PATIENTS',
        stacked: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: 'type1',
        // valueYShow: "valueYTotalPercent",
        categoryYField: "year",
        tooltip: tooltip
    }));

    series.columns.template.setAll({
        // tooltipText: "[fontSize:16px][bold]{name}[/][/]\n[fontSize:14px][bold]{type1}[/][/]",
        tooltipText: "{categoryX}: {valueY}",
        tooltipY: am5.percent(10),
        cornerRadiusTL: 2,
        cornerRadiusTR: 2,
        height: am5.percent(97),
        maxWidth: am5.percent(50),
        maxHeight: am5.percent(50),
    });
    series.data.setAll(data);

    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
                centerY: am5.p50,
                text: "{valueX}",
                populateText: true,
                fontSize: '.75rem',
                fontWeight: 700,
                fontFamily: 'Nunito Sans'
            })
        });
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

    series.appear(1000, 100);
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


function drawProtalEngChart() {

    var root4 = am5.Root.new("portal-eng-chart");
    root4.setThemes([am5themes_Animated.new(root4)]);


    var chart4 = root4.container.children.push(am5xy.XYChart.new(root4, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root4.verticalLayout
    }));



    var categories = [
        {
            category: "CONTENT 1",
            phoneCall: 2317,
            emailClick: 676,
            color: am5.color(0x00aade)
        },
        {
            category: "CONTENT 2",
            phoneCall: 2317,
            emailClick: 676,
            color: am5.color(0x00aade)
        },
        {
            category: "CONTENT 3",
            phoneCall: 2317,
            emailClick: 676,
            color: am5.color(0x00aade)
        },
        {
            category: "CONTENT 4",
            phoneCall: 2317,
            emailClick: 676,
            color: am5.color(0x00aade)
        },
        {
            category: "CONTENT 5",
            phoneCall: 2317,
            emailClick: 676,
            color: am5.color(0x00aade)
        },
        {
            category: "CONTENT 6",
            phoneCall: 2317,
            emailClick: 676,
            color: am5.color(0x00aade)
        },
    ];

    var yAxis = chart4.yAxes.push(am5xy.ValueAxis.new(root4, {
        renderer: am5xy.AxisRendererY.new(root4, {
        }),
        min: 10,
        max: 3500,
        strictMinMax: true,
        // dy:-10,
        bullet: function (root, axis, dataItem) {
            return am5xy.AxisBullet.new(root4, {
                location: 0.5,
                sprite: am5.Picture.new(root4, {
                    dy: -10,
                    width: 24,
                    height: 24,
                    centerY: am5.p50,
                    centerX: am5.p100,
                })
            });
        }
    }));
    var yRenderer = yAxis.get("renderer");
    yRenderer.labels.template.setAll({
        paddingRight: 0,
        paddingleft: 0,
        forceHidden: true
    });
    yRenderer.grid.template.setAll({
        forceHidden: true,
    });
    var xAxis = chart4.xAxes.push(am5xy.CategoryAxis.new(root4, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root4, { minGridDistance: 50 }),
        paddingTop: 10
    }));

    var xRenderer = xAxis.get("renderer");
    xRenderer.labels.template.setAll({
        fontSize: '.875rem',
        fontWeight: 700,
        textAlign: "center",
        fontFamily: 'Nunito Sans'
    });
    xRenderer.grid.template.setAll({
        forceHidden: true,
        location: 0.5

    });

    xAxis.data.setAll(categories);

    // Data
    var data = [];
    var data1 = [];
    var data2 = [];

    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        data.push({
            category: category.category,
            position: category.emailClick,
            value: category.emailClick,
            // value:(category.emailClick/(category.phoneCall + category.emailClick + category.portalClick))*50,
            bulletSettings: {
                fill: am5.color(0x38D6AE)
            }
        });

        data2.push({
            category: category.category,
            position: category.phoneCall,
            value: category.phoneCall,
            // value:(category.phoneCall/(category.phoneCall + category.emailClick + category.portalClick))*50,
            // value:category.phoneCall + category.emailClick + category.portalClick,
            bulletSettings: {
                fill: am5.color(0x576877)
            }
        })
    };
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series3 = chart4.series.push(am5xy.LineSeries.new(root4, {
        xAxis: xAxis,
        yAxis: yAxis,
        baseAxis: xAxis,
        valueYField: "position",
        valueField: "value",
        categoryXField: "category",
        calculateAggregates: true,
    }));

    series3.strokes.template.setAll({
        strokeOpacity: 0
    });

    var series2 = chart4.series.push(am5xy.LineSeries.new(root4, {
        xAxis: xAxis,
        yAxis: yAxis,
        baseAxis: xAxis,
        valueYField: "position",
        valueField: "value",
        categoryXField: "category",
        calculateAggregates: true
    }));

    series2.strokes.template.setAll({
        strokeOpacity: 0
    });

    series3.data.setAll(data);
    series2.data.setAll(data2);

    // Add bullets
    var circleTemplate = am5.Template.new({});
    var circleTemplate2 = am5.Template.new({});

    var bullet = series3.bullets.push(function () {
        return am5.Bullet.new(root4, {
            locationY: 0.5,
            sprite: am5.Circle.new(root4, {
                tooltipText: "{categoryX}: [bold]{position}[/]",
                radius: 28,
                stroke: am5.color(0xffffff),
                strokeWidth: 0,
                fillOpacity: 1,
                templateField: "bulletSettings",
            }, circleTemplate),
        });
    });
    series3.bullets.push(function () {
        return am5.Bullet.new(root4, {
            // locationX: 0.5,
            // locationY: 0.5,
            sprite: am5.Label.new(root4, {
                text: "{position}",
                centerX: am5.percent(50),
                centerY: am5.percent(50),
                populateText: true,
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'Nunito Sans',
                fill: root4.interfaceColors.get("alternativeText"),
            })
        });
    });

    var bullet2 = series2.bullets.push(function () {
        return am5.Bullet.new(root4, {
            locationY: 0.5,
            sprite: am5.Circle.new(root4, {
                tooltipText: "{categoryX}: [bold]{position}[/]",
                radius: 35,
                stroke: am5.color(0xffffff),
                strokeWidth: 0,
                fillOpacity: 1,
                templateField: "bulletSettings"
            }, circleTemplate2)
        });
    });

    series2.bullets.push(function () {
        return am5.Bullet.new(root4, {
            // locationX: 0.5,
            // locationY: 0.5,
            sprite: am5.Label.new(root4, {
                text: "{position}",
                centerX: am5.percent(50),
                centerY: am5.percent(50),
                fill: root4.interfaceColors.get("alternativeText"),
                populateText: true,
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'Nunito Sans'
            })
        });
    });

    // var legend2 = chart4.children.push(am5.Legend.new(root4, {}));
    // legend2.data.setAll(chart4.series.values);

    // var legend2 = chart4.children.push(am5.Legend.new(root4, {
    // 			  // centerY: am5.percent(50),
    // 			  // y: am5.percent(50),
    // 			  // x: am5.percent(90),
    // 			  // marginTop: 15,
    // 			  // marginBottom: 15,
    // 			  layout: root.horizontalLayout,
    // 			}));

    // 			legend2.data.setAll(chart4.series.values);

    // 			legend2.markers.template.setAll({
    // 				width: 15,
    // 				height: 15
    // 			});

    // 			legend2.labels.template.setAll({
    // 			  fontSize: '.775rem',
    // 			  fontWeight: "500"
    // 			});


    // 			legend2.valueLabels.template.setAll({
    // 			  fontSize: '.775rem',
    // 			  fontWeight: "400"
    // 			});

    // 			legend2.markerRectangles.template.setAll({
    // 				  cornerRadiusTL: 10,
    // 				  cornerRadiusTR: 10,
    // 				  cornerRadiusBL: 10,
    // 				  cornerRadiusBR: 10
    // // 			});

    series2.appear();
    series3.appear();
    chart4.appear(1000, 100);

    root4.events.on("frameended", exportChart_bubble);

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
        var xRenderer = xAxis.get("renderer");

        xRenderer.minGridDistance = 1;

        xRenderer.labels.template.setAll({

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
        chart4.series.each(function (series) {
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
        width: am5.percent(95),
        height: am5.percent(95),
        layout: root.horizontalLayout,
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(50),
        y: am5.percent(50)
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
        // fillField: "color"

    });

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
        { id: "A", name: "Patient Enrolled", color: am5.color(0x54A0FF) },
        { id: "B", name: "Patient Not Enrolled", color: am5.color(0x54A0FF) },
        { id: "C", name: "Registered", color: am5.color(0x10AC84) },
        { id: "D", name: "Non Registered", color: am5.color(0x10AC84) },
        { id: "E", name: "Content 01", color: am5.color(0x54A0FF) },
        { id: "G", name: "Content 02", color: am5.color(0x54A0FF) },
        { id: "H", name: "Content 03", color: am5.color(0x54A0FF) },
        { id: "I", name: "Content 04", color: am5.color(0x54A0FF) },
        { id: "J", name: "Content 05", color: am5.color(0x54A0FF) },
        { id: "K", name: "Content 06", color: am5.color(0x54A0FF) },
    ])

    series.nodes.get("colors").set("step", 2);

    // series.nodes.rectangles.template.setAll({
    //     fillOpacity: 1,
    //     strokeOpacity: 1,
    //     fill: am5.color(0xff00ff)
    //   });

    //   series.links.template.setAll({
    //     tooltipText: null,
    //     templateField: "linkSettings",
    //     fillOpacity: 1,
    //     strokeOpacity: 1,
    //     interactive: true
    //   });
    //   series.links.template.states.create("hover", { fillOpacity: 1 });

    // series.nodes.labels.template.setAll({
    //     forceHidden: true,
    //     templateField: "labelSettings"
    // });


    series.nodes.labels.template.setAll({
        fontSize: '.875rem',
        maxWidth: 100,
        wrap: true,
        // x: am5.percent(50),
        // centerX: am5.percent(50),
        // y: am5.percent(50),
        // centerY: am5.percent(100),
        // paddingLeft: 0,
        // paddingRight: 0,
        fontFamily: 'Nunito Sans'
        // rotation: -90,

    });



    // Set data
    // https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
    series.data.setAll([
        { from: "A", to: "D", value: 3, },
        { from: "A", to: "C", value: 2, },
        { from: "B", to: "C", value: 10, },
        {
            from: "C", to: "E", value: 6,
        },
        {
            from: "D", to: "E", value: 2,
        },
        { from: "C", to: "E", value: 1, },
        { from: "C", to: "G", value: 6, },
        { from: "D", to: "H", value: 1, },
        { from: "C", to: "J", value: 2, },
        { from: "C", to: "I", value: 1, },
        { from: "D", to: "K", value: 3, },
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
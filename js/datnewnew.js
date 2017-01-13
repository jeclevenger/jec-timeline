function someFunction(site)
{
    // http://stackoverflow.com/questions/6680825/return-string-without-trailing-slash
    return site.replace(/\/$/, "");
}
var qs = (function(a) {
    // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

$(document).ready(function() {
    $("ul.dropdown-menu a").click(function() {
        loadData($(this).attr("title"));
        //todo fix titles, for example auto generate in html or somewhere based on file name?
        // todo finish this now that data load is based on url, move into plotting loop
        $("#currentdataset").text($(this).text());
    });
    $(".jumbotoggle").click(function() {
        $(".jumbotron").remove();
        $("html,body").scrollTop(0);
    });
    $("#navv").scrollTop(1000);
    var info;
    //maybe pass data as variable since everything is moved inside asynchronous data call
    //added d3 data load to try new data format
    //todo connect math for sizing and text, scroll top, etc
    function loadData(datafilename) {
            d3.json("data/" + datafilename + ".json", function(error, data) {
                d3.select("#metadatatitle").text(data.meta.data_set_title);
                d3.select("#metadatadescription").text(data.meta.data_set_description);
                var navlength = data.meta.nav.length;
                $("#nav").empty();
                $("#svg").remove();
                $("#mini_svg").remove();
                for (var i = 0; i < navlength; i++) {
                    d3.select("#nav").append("h5")
                        .attr("id", "nav_" + i.toString())
                        .attr("class", "tier")
                        .attr("sets", data.meta.nav[i].sets);
                    d3.select("#nav_" + i.toString())
                        .append("span")
                        .attr("class", "glyphicon glyphicon-ok tier_span");
                    d3.select("#nav_" + i.toString())
                        .append("span")
                        .text(" " + data.meta.nav[i].label)
                }

                info = data.data;
                var min_date = d3.min(info, function (d) {
                    var temp = new Date(d.start);
                    return temp
                });

                var max_date = d3.max(info, function (d) {
                    if (d.end == "Current") {
                        var temp = new Date;
                        return temp
                    } else {
                        var temp = new Date(d.end);
                        return temp
                    }
                });
                //svg dims and margin
                //todo connnect column width and and width setting math..its sized for available data sets currently
                var margin = {top: 20, right: 20, bottom: 20, left: 20},
                    mini_margin = {top: 5, right: 5, bottom: 5, left: 5},
                    width = 600,
                    height = 1500,
                    mini_width = 300,
                    mini_height = 160;
                //create svg
                var svg = d3.select("#timeline").append("svg").attr({
                    width: width,
                    height: height,
                    id: "svg"
                });
                var mini_svg = d3.select("#mini_timeline").append("svg").attr({
                    width: mini_width,
                    height: mini_height,
                    id: "mini_svg"
                });
                //function for scale
                var plotnames = [];
                function startFunction() {
                    plotnames = [];
                    $('.tier').each(function (index) {
                        if ($(this).find('span').hasClass("glyphicon-ok")) {
                            var topush = JSON.parse("[" + $(this).attr("sets") + "]");
                            for (i = 0; i < topush.length; i++) {
                                plotnames.push(topush[i])

                            }
                        } else {

                        }
                    });
                }
                //other
                function findSet(){
                    var inputdata = [];
                    plotnames.forEach(function(entry) {
                         setcut = $.grep(info, function(n, i){
                            return n.set == entry
                        });
                        inputdata = inputdata.concat(setcut)
                    });
                    return inputdata
                }
                //nav on click
                $(".tier").click(function() {
                    //$( "#tier_" + this.id + "_span" ).toggleClass('glyphicon-ok glyphicon-remove');
                    $( this ).find(":first-child").toggleClass('glyphicon-ok glyphicon-remove');

                    startFunction();
                    plot(findSet(info));
                    mini_plot(findSet(info));
                });
                //plotting
                var axisPadding = 45;
                var mini_axisPadding = 20;
                // added mini_axisPadding todo add math to connect it with font size, add to gui
                var col_width = 50;
                var mini_col_width = 12;
                var counter = 0;
                var colPadding = 10;
                var mini_colPadding = 2;

                var events = d3.select("#svg");
                var mini_events = d3.select("#mini_svg");
                //might be mini_svg
                mini_events.append("mini_svg:g")
                    .attr("id", "mini_barchart");

                events.append("svg:g")
                    .attr("id", "barchart");

                var vis = d3.select("#barchart");
                var mini_vis = d3.select("#mini_barchart");

            //scale
                var timeScale = d3.time.scale()
                    .domain([min_date, max_date])
                    .nice(d3.time.year)
                    .rangeRound([height - margin.bottom, margin.top]);
                    //might need mini margin
                var mini_timeScale = d3.time.scale()
                    .domain([min_date, max_date])
                    .nice(d3.time.year)
                    .rangeRound([mini_width - mini_margin.right, mini_margin.left]);
            //axis
                var yAxis = d3.svg.axis().scale(timeScale).orient("left")
                    .ticks(d3.time.years, 1);

                var mini_yAxis = d3.svg.axis().scale(mini_timeScale).orient("bottom")
                    .ticks(d3.time.years, 1);

                var yAxisGroup = svg.append("g").attr({
                    "class": "axis",
                    transform: "translate(" + [axisPadding, 0] + ")"
                    }).call(yAxis);

                var mini_yAxisGroup = mini_svg.append("g")
                    .attr({
                        "class": "mini_axis",
                        "font-size": "0.75em",
                        transform: "translate(" + [0, (mini_height-margin.bottom - mini_axisPadding)] + ")"
                    })
                    .call(mini_yAxis);


            function plot(data) {
                min_date = d3.min(data, function (d) {
                    temp = new Date(d.start);
                    return temp
                });

                max_date = d3.max(data, function (d) {
                    if (d.end == "Current") {
                        temp = new Date;
                        return temp
                    } else {
                        temp = new Date(d.end);
                        return temp
                    }
                });
                timeScale.domain([min_date, max_date]).nice(d3.time.year).rangeRound([height - margin.bottom, margin.top]);
                yAxisGroup.transition().ease("linear").duration(500).call(yAxis);
                var eventAttrs = {
                        x: function (d, i) {
                            return col_width * (d.set - 1) + colPadding * d.set + axisPadding
                        },
                        y: function (d, i) {
                            if (d.end == "Current") {
                                return timeScale(new Date)
                            } else {
                                return timeScale(new Date(d.end))
                            }
                        },
                        width: col_width,
                        height: function (d, i) {
                                if (d.end == "Current") {
                                    return (timeScale(new Date(d.start)) - timeScale(new Date))
                                } else {
                                    return (timeScale(new Date(d.start)) - timeScale(new Date(d.end)))
                                }
                        },
                        fill: function (d, i) {
                            return d.color;
                        }

                };

                var rects = vis.selectAll("rect.bar")
                    .data(data);

                    rects.enter()
                        .append("svg:rect")
                        .attr(eventAttrs)
                        .attr("height", 0)
                        .on("click", function (d, i) {
                            $("h5#timelineTitle").text(d.title);
                            $("h5#timelineTitle").css('border-left-color', $(this).css('fill'));
                            $("h5#timelinestartdate").text(d.start);
                            $("h5#timelinestartdate").css('border-left-color', $(this).css('fill'));
                            $("h5#timelineenddate").text(d.end);
                            $("h5#timelineenddate").css('border-left-color', $(this).css('fill'));
                            $("p#timelineDes").text(d.description);
                            $("p#timelineDes").css('border-left-color', $(this).css('fill'));
                            d3.selectAll("rect").classed("mini_selected", false);
                            d3.selectAll("rect").classed("selected", false);
                            d3.select(this).classed("selected", true);
                            d3.select("#mini_bar"+d.id).classed("mini_selected", true);
                            return false;

                        });

                    //update
                    rects
                        .transition()
                        .ease("linear")
                            .attr(eventAttrs)
                            .duration(1000)
                        .attr("class", "bar")
                        .attr("id", function (d, i) {
                            return "bar" + d.id
                        });

                    //exit
                    rects.exit().transition()
                        .ease("linear")
                            .attr("height", 0)
                            .duration(1000)
                            .remove();

            }

        //////////mini plot

            function mini_plot(data) {
                min_date = d3.min(data, function (d) {
                    temp = new Date(d.start);
                    return temp
                });

                max_date = d3.max(data, function (d) {
                    if (d.end == "Current") {
                        temp = new Date;
                        return temp
                    } else {
                        temp = new Date(d.end);
                        return temp
                    }
                });
                mini_timeScale.domain([min_date, max_date]).nice(d3.time.year).rangeRound([mini_width - mini_margin.bottom, mini_margin.top]);
                mini_yAxisGroup.transition().ease("linear").duration(500).call(mini_yAxis);

                var mini_eventAttrs = {
                        x: function (d, i) {
                            if (d.end == "Current") {
                                return mini_timeScale(new Date)
                            } else {
                                return mini_timeScale(new Date(d.end))
                            }
                        },
                        y: function (d, i) {
                            return mini_height - (mini_col_width * (d.set + 1) + mini_colPadding * d.set + mini_col_width + mini_axisPadding )
                        },
                        width: function (d, i) {
                                if (d.end == "Current") {
                                    return (mini_timeScale(new Date(d.start)) - mini_timeScale(new Date))
                                } else {
                                    return (mini_timeScale(new Date(d.start)) - mini_timeScale(new Date(d.end)))
                                }
                        },
                        height: mini_col_width,

                        fill: function (d, i) {
                            return d.color;
                        }
                };

                var mini_rects = mini_vis.selectAll("rect.mini_bar")
                    .data(data);

                    //enter
                    mini_rects.enter()
                        .append("mini_svg:rect")
                        .attr(mini_eventAttrs)
                        .attr("width", 0)
                        .on("click", function (d, i) {
                            $("h5#timelineTitle").text(d.title);
                            $("h5#timelineTitle").css('border-left-color', $(this).css('fill'));
                            $("h5#timelinestartdate").text(d.start);
                            $("h5#timelinestartdate").css('border-left-color', $(this).css('fill'));
                            $("h5#timelineenddate").text(d.end);
                            $("h5#timelineenddate").css('border-left-color', $(this).css('fill'));
                            $("p#timelineDes").text(d.description);
                            $("p#timelineDes").css('border-left-color', $(this).css('fill'));
                            d3.selectAll("rect").classed("mini_selected", false);
                            d3.selectAll("rect").classed("selected", false);
                            d3.select(this).classed("mini_selected", true);
                            d3.select("#bar"+d.id).classed("selected", true);
                            return false;
                        });

                    //update
                    mini_rects
                        .transition()
                        .ease("linear")
                            .attr(mini_eventAttrs)
                            .duration(1000)
                        .attr("class", "mini_bar")
                        .attr("id", function (d, i) {
                            return "mini_bar" + d.id
                        });

                    //exit
                    mini_rects.exit()
                        .transition()
                        .ease("linear")
                            .attr("width", 0)
                            .duration(1000)
                            .remove();

                mini_svg
                    .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-0.8em")
                        .attr("dy", "-0.0em")
                        .attr("transform", function(d) {
                            return "translate(-5,0) rotate(-90)"
                            });
            }

            startFunction();
            plot(findSet(info.data));
            mini_plot(findSet(info.data));

        });
        $("#navv").scrollTop(1000);
        // scroll top already done ...because elements are erased? $("#jec-timeline-header").scrollTop(0);
    }
    //todo fix titles, for example auto generate in html or somewhere based on file name?
    if (qs['v'] == undefined) {
        $("#currentdataset").text("example");
        loadData("example")
    }
    $("#currentdataset").text(someFunction(qs["v"]));
    loadData(someFunction(qs["v"]))
});

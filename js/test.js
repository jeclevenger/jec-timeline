$(document).ready(function() {
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
			width = 600,
			height = 1500,
			mini_width = 600,
			mini_height = 144;
    var axisPadding = 45;
	var col_width = 50;
	var mini_col_width = 12;
	var counter = 0;
	var colPadding = 10;
	var mini_colPadding = 2;
	var $root = $('html, body');


    $("#fresh").click(function() {
        $(".wrapper").remove();
        $(".container").append("<div class='wrapper'><div id='timeline'></div></div>");    

        var svg = d3.select("#timeline").append("svg").attr({
			width: width,
			height: height,
			id: "svg"
		});
        svg.append("svg:g")
            .attr("id", "barchart")
        
        svg.append("g").attr({
			    "class": "axis",
			    transform: "translate(" + [axisPadding, 0] + ")"
			    });
    });

    $("#freshh").click(function() {
        d3.json("data/sample.json", function(error, data) {
            plot(data)
        });        
    });
    $("#freshhh").click(function() {
        d3.json("data/jec-resume.json", function(error, data) {          
            plot(data)
        });        
    });



//add to plot function

var timeScale = d3.time.scale()
			.nice(d3.time.year)
			.rangeRound([height - margin.bottom, margin.top]);


function plot(data) {
        
        var svg = d3.select("#svg");
        var vis = d3.select("#barchart");
        var yAxis = d3.svg.axis().scale(timeScale).orient("left")
			    .ticks(d3.time.years, 1);
        
        var yAxisGroup = d3.select(".axis");        

        var min_date = d3.min(data, function (d) {
            temp = new Date(d.t)
            return temp
        });

        var max_date = d3.max(data, function (d) {
            if (d.tt == "Current") {
                temp = new Date
                return temp
            } else {
                temp = new Date(d.tt)
                return temp
            }
        });

		timeScale.domain([min_date, max_date]).nice(d3.time.year).rangeRound([height - margin.bottom, margin.top]);

		yAxisGroup.transition().ease("linear").duration(500).call(yAxis);

		var eventAttrs = {
				x: function (d, i) {
					return col_width * (i + 1) + colPadding * i + axisPadding
				},
				y: function (d, i) {
					return timeScale(new Date(d.tt))
				},
				width: col_width,
				height: function (d, i) {
						return (timeScale(new Date(d.t)) - timeScale(new Date(d.tt)))
				},
				fill: function (d, i) {
					return "#000"
				}	
				
		};

		var rects = vis.selectAll("rect.bar")
			.data(data)

			//enter
			rects.enter()
				.append("svg:rect")
				.attr("class", "bar")
				.attr(eventAttrs)
				

			//exit
			rects.exit()
				.transition()
				.ease("linear")
					.attr("height", 0)
					.duration(1000)
					.remove()

			//update
			rects
				.data(data)
				.transition()
				.ease("linear")
					.duration(1000)
				.attr(eventAttrs)
        
    };

});

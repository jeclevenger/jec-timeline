$(document).ready(function() {
	//svg dims and margin  
		var margin = {top: 20, right: 20, bottom: 20, left: 20},
            mini_margin = {top: 2, right: 0, bottom: 2, left: 0},
			width = 600,
			height = 1500,
			mini_width = 300,
			mini_height = 144;
	//create svg
		svg = d3.select("#timeline").append("svg").attr({
			width: width,
			height: height,
			id: "svg"
		});
		mini_svg = d3.select("#mini_timeline").append("svg").attr({
			width: mini_width,
			height: mini_height,
			id: "mini_svg"
		});
	//function for scale
	plotnames = []
		function startFunction() {
			plotnames = []
			setdate = ""
			$('.tier').each(function (index) {
				if ($(this).find(':first-child').hasClass("glyphicon-ok")) {                                   
					if (this.id == 11) {
						plotnames.push(1);
						plotnames.push(2);
						setdate = "15 March 2010"
					} else if (this.id == 22) {
						plotnames.push(3);
						setdate = "15 March 2005"
					} else if (this.id == 33) {
						plotnames.push(4);                    
						plotnames.push(5);
						setdate = "15 March 2000"
					} else if (this.id == 44) {
						plotnames.push(6);
						setdate = "15 March 1995"
					} else if (this.id == 55) {
						plotnames.push(7);
						plotnames.push(8);
						setdate = "15 March 1990"
					} else {
						
					}
				} else {
					
				}
			});
		};
	startFunction();
	//plotting
		var axisPadding = 45;
		var col_width = 50;
		var mini_col_width = 12;
		var counter = 0;
		var colPadding = 10;
		var mini_colPadding = 2;
		
		var events = d3.select("#svg")
		var mini_events = d3.select("#mini_svg")
		//might be mini_svg
		mini_events.append("mini_svg:g")
			.attr("id", "mini_barchart")

		events.append("svg:g")
			.attr("id", "barchart")
			
		var vis = d3.select("#barchart")
		var mini_vis = d3.select("#mini_barchart")

	//scale
		var timeScale = d3.time.scale()
			.domain([new Date(setdate), new Date])
			.nice(d3.time.year)
			.rangeRound([height - margin.bottom, margin.top]);
			//might need mini margin
		var mini_timeScale = d3.time.scale()
			.domain([new Date(setdate), new Date])
			.nice(d3.time.year)
			.rangeRound([mini_width - mini_margin.bottom, mini_margin.top]);
	//axis
		var yAxis = d3.svg.axis().scale(timeScale).orient("left")
			.ticks(d3.time.years, 1);
		
		var mini_yAxis = d3.svg.axis().scale(mini_timeScale).orient("top")
			.ticks(d3.time.years, 2);

		var yAxisGroup = svg.append("g").attr({
			"class": "axis",
			transform: "translate(" + [axisPadding, 0] + ")"
			}).call(yAxis);
			//might need custom mini axis padding
		var mini_yAxisGroup = mini_svg.append("g").attr({
			"class": "mini_axis",
			transform: "translate(" + [0, (mini_height-margin.bottom)] + ")"
			}).call(mini_yAxis);
		
	function plot(data) {
		timeScale.domain([new Date(setdate), new Date]).nice(d3.time.year).rangeRound([height - margin.bottom, margin.top]);
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
					if (d.title == "Minnesota Public School") {
						return "#c6dbef"
					} else if (d.title == "Minnesota Private School") {
						return "#9ecae1"
					} else if (d.title == "Michigan Public School") {
						return "#6baed6"
					} else if (d.title == "Michigan Public University") {
						return "#3182bd"
					} else if (d.title == "Cumbria University (United Kingdom)") {
						return "#08519c"
					} else if (d.title == "Parental Home Teachings") {
						return "#bae4b3"
					} else if (d.title == "Indirect Computer Learning") {
						return "#74c476"
					} else if (d.title == "Direct Computer Learning") {
						return "#238b45"
					} else if (d.title == "Family Owned Restaurant & Resort") {
						return "#d4b9da"
					} else if (d.title == "Super Market") {
						return "#c994c7"
					} else if (d.title == "Hardware Store") {
						return "#df65b0"
					} else if (d.title == "Self Employed Odd Jobs") {
						return "#e7298a"
					} else if (d.title == "Apartment Maintenance") {
						return "#ce1256"
					} else if (d.title == "University Tutor") {
						return "#91003f"
					} else if (d.title == "R&D Machine Shop") {
						return "#fc9272"
					} else if (d.title == "Industry Leading Engine Manufacturer (R&D)") {
						return "#de2d26"
					} else if (d.title == "Casl Media LLC") {
						return "#000"
					} else {
						return "#000"
					}
				}	
				
		};

		var rects = vis.selectAll("rect.bar")
			.data(data)

			//enter
			rects.enter()
				.append("svg:rect")
				.attr("class", "bar")
				.attr("id", function (d, i) {
                    return "bar" + d.id
                })
				.attr(eventAttrs)
				.on("click", function (d, i) {
					$("h5#timelineTitle").text(d.title);
					$("h5#timelineTitle").css('border-left-color', $(this).css('fill'));
					$("p#timelineDes").text(d.description);
                    $("p#timelineDes").css('border-left-color', $(this).css('fill'));
					d3.selectAll("rect").classed("mini_selected", false);
                    d3.selectAll("rect").classed("selected", false);
					d3.select(this).classed("selected", true);
                    d3.select("#mini_bar"+d.id).classed("mini_selected", true);
					return false;

				});

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
				.attr("class", "bar")
				.attr("id", function (d, i) {
                    return "bar" + d.id
                })
	};
	
//////////mini plot
// mini map bug for axis ticks, not "nicely" rounding the range..margins need to use proper names as well..
	function mini_plot(data) {
		mini_timeScale.domain([new Date(setdate), new Date]).nice(d3.time.year).rangeRound([mini_width - mini_margin.bottom, mini_margin.top]);
		mini_yAxisGroup.transition().ease("linear").duration(500).call(mini_yAxis)
		
		var mini_eventAttrs = {
				x: function (d, i) {
					if (d.end == "Current") {
						return mini_timeScale(new Date)
					} else {
						return mini_timeScale(new Date(d.end))
					}
				},
				y: function (d, i) {
					return mini_col_width * (d.set - 1) + mini_colPadding * d.set
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
					if (d.title == "Minnesota Public School") {
						return "#c6dbef"
					} else if (d.title == "Minnesota Private School") {
						return "#9ecae1"
					} else if (d.title == "Michigan Public School") {
						return "#6baed6"
					} else if (d.title == "Michigan Public University") {
						return "#3182bd"
					} else if (d.title == "Cumbria University (United Kingdom)") {
						return "#08519c"
					} else if (d.title == "Parental Home Teachings") {
						return "#bae4b3"
					} else if (d.title == "Indirect Computer Learning") {
						return "#74c476"
					} else if (d.title == "Direct Computer Learning") {
						return "#238b45"
					} else if (d.title == "Family Owned Restaurant & Resort") {
						return "#d4b9da"
					} else if (d.title == "Super Market") {
						return "#c994c7"
					} else if (d.title == "Hardware Store") {
						return "#df65b0"
					} else if (d.title == "Self Employed Odd Jobs") {
						return "#e7298a"
					} else if (d.title == "Apartment Maintenance") {
						return "#ce1256"
					} else if (d.title == "University Tutor") {
						return "#91003f"
					} else if (d.title == "R&D Machine Shop") {
						return "#fc9272"
					} else if (d.title == "Industry Leading Engine Manufacturer (R&D)") {
						return "#de2d26"
					} else if (d.title == "Casl Media LLC") {
						return "#000"
					} else {
						return "#000"
					}
				}		
		};
				
		var mini_rects = mini_vis.selectAll("rect.mini_bar")
			.data(data)

			//enter
			mini_rects.enter()
				.append("mini_svg:rect")
				.attr("class", "mini_bar")
				.attr("id", function (d, i) {
                    return "mini" + d.id
                })
				.attr(mini_eventAttrs)
				.on("click", function (d, i) {
					$("h5#timelineTitle").text(d.title);
					$("h5#timelineTitle").css('border-left-color', $(this).css('fill'));
					$("p#timelineDes").text(d.description);
					$("p#timelineDes").css('border-left-color', $(this).css('fill'));
					d3.selectAll("rect").classed("mini_selected", false);
                    d3.selectAll("rect").classed("selected", false);
					d3.select(this).classed("mini_selected", true);
                    d3.select("#bar"+d.id).classed("selected", true);
					return false;

				});

			//exit
			mini_rects.exit()
				.transition()
				.ease("linear")
					.attr("height", 0)
					.duration(1000)
					.remove()

			//update
			mini_rects
				.data(data)
				.transition()
				.ease("linear")
					.duration(1000)
				.attr(mini_eventAttrs)
				.attr("class", "mini_bar")
				.attr("id", function (d, i) {
                    return "mini_bar" + d.id
                })
	};


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
	};


	$(".tier").click(function() {
		$( "#tier_" + this.id + "_span" ).toggleClass('glyphicon-ok glyphicon-remove');  

		startFunction();
		if (jQuery.isEmptyObject(plotnames)) {
			plot(findSet(info))
			mini_plot(findSet(info))
		} else {
			plot(findSet(info))
			mini_plot(findSet(info))
		}

	});
	plot(findSet(info));
	mini_plot(findSet(info));
});

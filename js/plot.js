$(document).ready(function() {


    $("#static-top").click(function() {
    	//everything moved inside the button function
        $(".wrapper").remove();
        //--html
        $("#top-alert").text("latest update: There is a horizontal mini map and vertical full timeline. clicking on the tiers of employment and education will enable and disable their visibility. clicking on the rectangles will display the timeline event info below this. The currently selected event will have a border its rectangle. It is currently place-holder-ish information, its update is planned for the next version. Mini map/nav only really formatted for desktop viewing");
        $(".container").append("<div class='wrapper'><div id='timeline' class='col-md-12' style='font-weight:300'><div class='row'><div id='mini_timeline'class='col-sm-12'></div></div><div class='row'><div class='col-sm-3'><h5 id='11' class='tier'><span id='tier_11_span' class='glyphicon glyphicon-ok tier_span' style=''></span> Tier 1 Employment <small>(click)</small></h5><h5 id='22' class='tier'><span id='tier_22_span' class='glyphicon glyphicon-ok tier_span' style=''></span> Tier 2 Employment <small>(on)</small></h5><h5 id='33' class='tier'><span id='tier_33_span' class='glyphicon glyphicon-remove tier_span' style=''></span> Tier 3 Employment <small>(these)</small></h5><h5 id='44' class='tier'><span id='tier_44_span' class='glyphicon glyphicon-ok tier_span' style=''></span> Formal Education <small>(for)</small></h5><h5 id='55' class='tier'><span id='tier_55_span' class='glyphicon glyphicon-ok tier_span' style=''></span> Informal Education <small>(animation)</small></h5></div><div class='col-sm-9'><h5><span style='color: blue;'>Timeline Event:</span></h5><h5 id='timelineTitle' style='border: 2px solid #eee'>Interactive Timeline <small>(start clicking!)</small></h5><h5><span style='color: blue;'>Event Information:</span></h5><p id='timelineDes' style='border: 2px solid #eee'>Choose which timeline events to display. Selecting an event will display its description here.</p></div></div></div></div>");
        //js for appended nav
        $(".tier").click(function() {
		    $( "#tier_" + this.id + "_span" ).toggleClass('glyphicon-ok glyphicon-remove');  

		    startFunction();
		    if (jQuery.isEmptyObject(plotnames)) {
			
		    } else {
			    plot(findSet(info))
			    mini_plot(findSet(info))
		    }

	    });        

        //--plotting

        //svg dims and margin  
		var margin = {top: 20, right: 20, bottom: 20, left: 20},
			width = 600,
			height = 1500,
			mini_width = 600,
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
	    startFunction();
	//plotting  
		var axisPadding = 45;
		var col_width = 50;
		var mini_col_width = 12;
		var counter = 0;
		var colPadding = 10;
		var mini_colPadding = 2;
		var $root = $('html, body');
		
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
			.rangeRound([width - margin.bottom, margin.top]);
	//axis
		var yAxis = d3.svg.axis().scale(timeScale).orient("left")
			.ticks(d3.time.years, 1);
		
		var mini_yAxis = d3.svg.axis().scale(mini_timeScale).orient("bottom")
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
					} else if (d.title == "Family Owned Resturant & Resort") {
						return "#d4b9da"
					} else if (d.title == "Super Market") {
						return "#c994c7"
					} else if (d.title == "Hardware Store") {
						return "#df65b0"
					} else if (d.title == "Self Employed Odd Jobs") {
						return "#e7298a"
					} else if (d.title == "Apartment Maintence") {
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
				.attr(eventAttrs)
				.on("click", function (d, i) {
					$("h5#timelineTitle").text(d.title);
					$("h5#timelineTitle").css('color', $(this).css('fill'));
					$("p#timelineDes").text(d.description);
					d3.selectAll("rect").classed("selected", false);
					d3.select(this).classed("selected", true);
					$root.animate({
						scrollTop: $( "div#timeline" ).offset().top
					}, 500);
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
	};
	
//////////mini plot
	function mini_plot(data) {
		mini_timeScale.domain([new Date(setdate), new Date]).nice(d3.time.year).rangeRound([width - margin.bottom, margin.top]);
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
					} else if (d.title == "Family Owned Resturant & Resort") {
						return "#d4b9da"
					} else if (d.title == "Super Market") {
						return "#c994c7"
					} else if (d.title == "Hardware Store") {
						return "#df65b0"
					} else if (d.title == "Self Employed Odd Jobs") {
						return "#e7298a"
					} else if (d.title == "Apartment Maintence") {
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
				.attr(mini_eventAttrs)
				.on("click", function (d, i) {
					$("h5#timelineTitle").text(d.title);
					$("h5#timelineTitle").css('color', $(this).css('fill'));
					$("p#timelineDes").text(d.description);
					d3.selectAll("rect").classed("selected", false);
					d3.select(this).classed("selected", true);
					$root.animate({
						scrollTop: $( "div#timeline" ).offset().top
					}, 500);
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

	};
	    plot(findSet(info));
        mini_plot(findSet(info));
        
//end static-top button
    });

    $("#static-left").click(function() {
    	//everything moved inside the button function
        $(".wrapper").remove();
        //--html
        $("#top-alert").text("latest update: try scrolling down, reformatted with colums, still raw");
        $(".container").append("<div class='wrapper'><div class='row'><div class='col-sm-3' style='position: fixed;'><h5 id='11' class='tier'><span id='tier_11_span' class='glyphicon glyphicon-ok tier_span' style=''></span> Tier 1 Employment <small>(click)</small></h5><h5 id='22' class='tier'><span id='tier_22_span' class='glyphicon glyphicon-ok tier_span' style=''></span> Tier 2 Employment <small>(on)</small></h5><h5 id='33' class='tier'><span id='tier_33_span' class='glyphicon glyphicon-remove tier_span' style=''></span> Tier 3 Employment <small>(these)</small></h5><h5 id='44' class='tier'><span id='tier_44_span' class='glyphicon glyphicon-ok tier_span' style=''></span> Formal Education <small>(for)</small></h5><h5 id='55' class='tier'><span id='tier_55_span' class='glyphicon glyphicon-ok tier_span' style=''></span> Informal Education <small>(animation)</small></h5><h5><span style='color: blue;'>Timeline Event:</span></h5><h5 id='timelineTitle' style='border: 2px solid #eee'>Interactive Timeline <small>(start clicking!)</small></h5><h5><span style='color: blue;'>Event Information:</span></h5><p id='timelineDes' style='border: 2px solid #eee'>Choose which timeline events to display. Selecting an event will display its description here.</p></div><div class='col-sm-8 col-sm-offset-5'><div class='row'><div id='timeline' class='col-md-12' style='font-weight:300'></div>                        </div></div></div><h5><span style='color: blue;'>UPDATE</span>: There is a horizontal mini map and vertical full timeline. <b>clicking on</b> the tiers of employment and education will enable and disable their visibility. <b>clicking on</b> the rectangles will display the timeline event info below this. The currently selected event will have a border its rectangle. It is currently place-holder-ish information, its update is planned for the next version. Mini map/nav only really formatted for desktop viewing.</h5><div class='row'><div id='mini_timeline'class='col-sm-12'></div></div></div>");
        $(".tier").click(function() {
		    $( "#tier_" + this.id + "_span" ).toggleClass('glyphicon-ok glyphicon-remove');  

		    startFunction();
		    if (jQuery.isEmptyObject(plotnames)) {
			
		    } else {
			    plot(findSet(info))
			    mini_plot(findSet(info))
		    }
        
	    });        

        //--plotting
//svg dims and margin  
		var margin = {top: 20, right: 20, bottom: 20, left: 20},
			width = 600,
			height = 1500,
			mini_width = 600,
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
		var $root = $('html, body');
		
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
			.rangeRound([width - margin.bottom, margin.top]);
	//axis
		var yAxis = d3.svg.axis().scale(timeScale).orient("left")
			.ticks(d3.time.years, 1);
		
		var mini_yAxis = d3.svg.axis().scale(mini_timeScale).orient("bottom")
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
					} else if (d.title == "Family Owned Resturant & Resort") {
						return "#d4b9da"
					} else if (d.title == "Super Market") {
						return "#c994c7"
					} else if (d.title == "Hardware Store") {
						return "#df65b0"
					} else if (d.title == "Self Employed Odd Jobs") {
						return "#e7298a"
					} else if (d.title == "Apartment Maintence") {
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
				.attr(eventAttrs)
				.on("click", function (d, i) {
					$("h5#timelineTitle").text(d.title);
					$("h5#timelineTitle").css('color', $(this).css('fill'));
					$("p#timelineDes").text(d.description);
					d3.selectAll("rect").classed("selected", false);
					d3.select(this).classed("selected", true);
					//$root.animate({
					//	scrollTop: $( "div#timeline" ).offset().top
					//}, 500);
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
	};
	
//////////mini plot
	function mini_plot(data) {
		mini_timeScale.domain([new Date(setdate), new Date]).nice(d3.time.year).rangeRound([width - margin.bottom, margin.top]);
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
					} else if (d.title == "Family Owned Resturant & Resort") {
						return "#d4b9da"
					} else if (d.title == "Super Market") {
						return "#c994c7"
					} else if (d.title == "Hardware Store") {
						return "#df65b0"
					} else if (d.title == "Self Employed Odd Jobs") {
						return "#e7298a"
					} else if (d.title == "Apartment Maintence") {
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
				.attr(mini_eventAttrs)
				.on("click", function (d, i) {
					$("h5#timelineTitle").text(d.title);
					$("h5#timelineTitle").css('color', $(this).css('fill'));
					$("p#timelineDes").text(d.description);
					d3.selectAll("rect").classed("selected", false);
					d3.select(this).classed("selected", true);
					//$root.animate({
					//	scrollTop: $( "h3#3" ).offset().top
					//}, 500);
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

	};
plot(findSet(info));
mini_plot(findSet(info));
//end static-left button
    });
	



///from original
//for scale
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


	



// replace glyphicons w/ +/-
//    var text = $( "#tier_" + this.id + "_span" ).text();
//        $("#tier_" + this.id + "_span" ).text(
//            text == "+" ? "-" : "+");



//text view i think?
	var unique = [];
	for (i = 0; i < info.length; ++i) {
		var test = $.inArray(info[i].title, unique);
		if (test == -1) {
		
			var start = info[i].start;
			var end = info[i].end;
			
			if (info[i].end == "Current") {
				end = info[i].end;
				start = start.slice(3);
			} else {
				start = start.slice(3);
				end = end.slice(3);
			}
			
			if (info[i].type == "employment") {
				$("#employment").after("<p>" + info[i].description + "</p>");
				$("#employment").after("<h5>" + info[i].title + " <small>" + start + " - " + end + "</small></h5>");
			} else if (info[i].type == "formal education") {
				$("#formal").after("<p>" + info[i].description + "</p>");
				$("#formal").after("<h5>" + info[i].title + " <small>" + start + " - " + end + "</small></h5>");
			} else if (info[i].type == "informal education") {
				$("#informal").after("<p>" + info[i].description + "</p>");
				$("#informal").after("<h5>" + info[i].title + " <small>" + start + " - " + end + "</small></h5>");
			} else {
			
			}
			
			unique.push(info[i].title)
		}
		
	}
});

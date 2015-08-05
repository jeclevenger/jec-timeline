$(document).ready(function() {
	$(".button").click(function() {
		var id = $(this).attr("id");
		var span_id = "#span_" + id;
		var div_id = "#div_" + id;
		$(span_id).toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
		$(div_id).toggle("clip");
	});
/*
   setTimeout(function () {
    $("#1").trigger("click");
   }, 750);
*/
});


	



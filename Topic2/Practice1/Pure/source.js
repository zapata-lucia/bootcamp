$(document).ready(function(){
	$('#search').on('click', function(){
		var searchVideos= $('#query').val();
		  		debugger;
		$.ajax({
			url: 'https://gdata.youtube.com/feeds/api/videos?q='+searchVideos+'&v=2&alt=jsonc',
		 	type: 'GET',
		 	dataType: 'jsonp',
		  	success: function(response) {

		  		showVideos(response.data.items);	
		   	},
		  	error: function() {
		    	$('.row').append('<p>Server Error</p>');
		  	}
		});
	});

});

function showVideos(videos){
	var video;
	$('#videos').html("");
	$.each(videos, function (index,value)
		{
			console.log(value.id);
			video = "<iframe id=\"player\" type=\"text/html\" width=\"300\" height=\"190\" src=\"http://www.youtube.com/embed/"+value.id+"\"></iframe>";
			$('#videos').append("<div class='pure-u-1-4'>"+video+ "</div>");
		});
}

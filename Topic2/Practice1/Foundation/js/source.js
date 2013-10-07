$(document).ready(function(){
	$('#search').on("click",function(){
	var searchVideos= $('#query').val();
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

			video = "<iframe width=\"230\" height=\"130\" src=\"http://www.youtube.com/embed/"+value.id+"\"></iframe>";
			$('#videos').append("<div class='small-12 large-3 columns'>"+video+ "</div>");
		});
}

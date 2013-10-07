$(document).ready(function(){
	$('#search').on("click",function(){
	var searchVideos= $('.form-inline').val();
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
	$('.row').html("");
	$.each(videos, function (index,value)
		{

			video = "<iframe width=\"300\" height=\"190\" src=\"http://www.youtube.com/embed/"+value.id+"\"></iframe>";
			$('.row').append("<div class='col-xs-12 col-md-3'>"+video+ "</div>");
		});
}

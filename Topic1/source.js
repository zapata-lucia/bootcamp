$(document).ready(function(){
	$('#hidden').fadeIn(3000,function(){
		$('#alias').focus();
	});
	
	$('#callFunction').on("click",function(){
		var inputName= $('.alias').val();
		$.ajax({
			url: 'http://bootcamp.aws.af.cm/welcome/'+inputName,
	 		type: 'GET',
	 	 	dataType: 'json',
	  		success: function(data) {
	  			if(data.response)
	  				{
	  					$('#response').html("<h2>"+data.response+"</h2>");
	  					highlightText($('#response h2'), inputName);
	  				}
	  			else	
	  				$('#response').html("<h2>Ingrese un nombre</h2>");		
	   		},
	  		error: function() {
	    		$('#response').html('500 Internal Server Error')
	    		.css({"color": "rgb(255,0,0)"});
	  		}
		});
	});

	$.ajax({
			url: 'http://tweetproxy.ap01.aws.af.cm/search',
	 		type: 'GET',
	 	 	dataType: 'jsonp',
	 	 	data: {'q' : 'html5'},
	  		success: function(data) {
	  			showTweets(data.statuses);	
	   		},
	  		error: function() {
	    		console.log("something went wrooong!");
	  		}
		});

});

function highlightText(elem, name)
{
	var replace= "<span id='highlight'>"+ name +"</span>";
	var inner= elem.text().replace(name, replace);
	elem.html(inner);
	$('#highlight').css({"color": "rgb(255,128,0)"});
}

function showTweets(tweetArray)
{
	console.log(tweetArray);
	var tweet;
	$.each(tweetArray, function (index,value)
		{
			tweet= "<span>"+value.created_at+ "</span>";
			tweet+= "<img src=\""+value.user.profile_image_url+ "\" alt='user_profile'>";
			tweet+= "<h3>"+value.user.name+"</h3>";
			tweet += "<p>"+value.text+"</p>";
			$('#tweets').append("<section class='tweet'>"+tweet+ "</section>");
		});
}
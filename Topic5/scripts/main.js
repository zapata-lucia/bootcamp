//CONFIGURATION OF SHIM TO ADD JQUERY AS A MODULE
requirejs.config({
    shim: {
        'Jquery': {
            deps: ['jquery'],
            exports: 'jquery'
        },
    }
});

//MAIN
require(["Jquery", "Movie", "Director"], function(Jquery, Movie, Director) {
   
    var charly = new Movie("Charlie and the Chocolate Factory", 2000);
    var tim = new Director("Tim Burton");
    tim.setQuotes(["Carpe Diem", "Let it Be"]);
    charly.set("director", tim);
    console.log(charly.get("director").speak());
    $(".quotes").append("<h1>Director quotes</h1>");
    $(".quotes").append("<p>"+charly.get("director").speak()+"</p>");
});
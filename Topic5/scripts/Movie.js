//MOVIE MODULE
define(["Director"],function() {

  function Movie(t,y) {

    var title = t;
    var year = y;
    var director;
    
    this.get = function(attr) {
      return this[attr];
    };

    this.set = function(attr, value) {
      this[attr] = value;
    };

    this.play = function() {
      this.Notify(title + " is being played");
    };

    this.stop = function() {
      this.Notify(title + "stopped");
    };
  }  
    return (Movie);
  }
);
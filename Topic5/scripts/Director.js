//DIRECTOR MODULE
define(function() {
   
  function Director(n) { 
    var name = n;
    var quotes = [];

    this.get = function(attr) {
      if(attr=="name")
        return name;
      else
        return quotes;
    };

    this.setName = function(value) {
      name = value;
    };
    this.setQuotes = function(value) {
      quotes = value;
    };

    this.speak = function() {
      return n+ " said: "+ quotes.toString();
    };
  };
      
  return (Director);
  }
);
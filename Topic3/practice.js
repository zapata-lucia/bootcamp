//OBSERVER LIST CLASS
function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.Add = function( obj ){
  return this.observerList.push( obj );
};

ObserverList.prototype.Empty = function(){
  this.observerList = [];
};

ObserverList.prototype.Count = function(){
  return this.observerList.length;
};

ObserverList.prototype.Get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};

ObserverList.prototype.Insert = function( obj, index ){
  var pointer = -1;

  if( index === 0 ){
    this.observerList.unshift( obj );
    pointer = index;
  }else if( index === this.observerList.length ){
    this.observerList.push( obj );
    pointer = index;
  }

  return pointer;
};

ObserverList.prototype.IndexOf = function( obj, startIndex ){
  var i = startIndex, pointer = -1;

  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      pointer = i;
    }
    i++;
  }

  return pointer;
};

ObserverList.prototype.RemoveAt = function( index ){
  if( index === 0 ){
    this.observerList.shift();
  }else if( index === this.observerList.length -1 ){
    this.observerList.pop();
  }
};


//SUBJECT CLASS
function Subject() {
  this.observers = new ObserverList();
}
Subject.prototype.AddObserver = function( observer ) {
  this.observers.Add( observer );
};  
Subject.prototype.RemoveObserver = function( observer ) {
  this.observers.RemoveAt( this.observers.IndexOf( observer, 0 ) );
};  
Subject.prototype.Notify = function( context ) {
  var observerCount = this.observers.Count();
  for(var i=0; i < observerCount; i++){
    this.observers.Get(i).Update( context );
  }
};


// Extend an object with an extension
function extend( extension, obj ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}
 

//MIXIN OBJECT
var Social = {
  share: function(friend) {
    console.log("Sharing "+this.get("title")+" with "+ friend);    
  },
  like: function(){
    console.log("You liked "+ this.get("title"));    
  }
};


//MOVIE OBJECT
/*var Movie = Object.create(null);
Movie.title = "";
Movie.year = null;
Movie.set= function(key, value) {
  this[key] = value;
};
Movie.get = function(key) {
  return this[key];
};
Movie.play = function() {
  //return this.title+ " is playing";
  this.Notify(this.title+ " is playing");
};
Movie.stop = function() {
  //return this.title+ " stop";
  this.Notify(this.title+ " stop");
};*/


//MOVIE CLASS
/*function Movie() {
  this.title = "";
  this.year = null;
  this.set= function(key, value) {
    this[key] = value;
  };
  this.get = function(key) {
    return this[key];
  };
  this.play = function() {
    //return this.title+ " is playing";
    this.Notify(this.title+ " is playing");
  };
  this.stop = function() {
    //return this.title+ " stop";
    this.Notify(this.title+ " stop");
  };
};*/


//MOVIE WITH MODULE PATTERN
var Movie = (function() {
 
  //CONSTRUCTOR
  var Movie = function(t, y) {
    this.title = t;
    this.year = y;
    extend(new Subject(), this);
    extend(Social, this); 
  };

  Movie.prototype.constructor = Movie;

  Movie.prototype.get = function(attr) {
    return this[attr];
  };

  Movie.prototype.setTitle = function(attr, value) {
    this[attr] = value;
  };

  Movie.prototype.play = function() {
    this.Notify(this.title + " is playing");
  };

  Movie.prototype.stop = function() {
    this.Notify(this.title + "stopped");
  };

  return Movie;
})();


//DOWNLOADABLE MOVIE
var DownloadableMovie = (function() {

  var DownloadableMovie = function(t,y){
    extend(new Movie(t,y), this);
  };

  DownloadableMovie.prototype.constructor = DownloadableMovie; 

  DownloadableMovie.prototype.download = function() {
    console.log(this.get("title")+ " is downloading");
  };

  return DownloadableMovie;
})();  



//INSTANCES
var terminator = new DownloadableMovie("Terminator", 1984);
var goodfellas = new Movie("Goodfellas", 1990);



//OBSERVER CLASS
var Observer = function() {};
Observer.prototype.Update = function(value) {
  console.log("Observer: " + value);
};

//CREATE MOVIE OBSERVER
var MovieObserver = new Observer();

//ADD OBSERVER TO MOVIE
terminator.AddObserver(MovieObserver);

//ACTOR CLASS
function Actor(nameInput, ageInput) {
  this.name = nameInput;
  this.age = ageInput;
};

var arnold = new Actor("Arnold Schwarzenegger", 66);
var robert = new Actor("Robert De Niro", 70);


//USE OF DECORATOR PATTERN: ADD ACTORS TO A MOVIE OBJECT
function addActorsArray(movie, array){
  if (array instanceof Array)
    movie.actors = array;
  else
    movie.actors = [array];
};

addActorsArray(terminator, [arnold, robert]);

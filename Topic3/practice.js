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


// Extend an object with an extension
function extend( extension, obj ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}
 

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
var Movie=(function () {
  var title = "";
  var year = null;
  var actors = [];
  return {
    get: function(key) {
      return this[key];
    },

    set: function (key, value) {
      this[key] = value;
    },

    play: function() {
      this.Notify(title+ " is playing");
    },

    stop: function() {
      this.Notify(title+ " stop");
    }
  };

}());


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

extend(new Subject(), Movie);


//MIXIN OBJECT
var Social = {
  share: function(friend) {
    console.log("Sharing "+this.get("title")+" with "+ friend);    
  },
  like: function(){
    console.log("You liked "+ this.title);    
  }
};

extend(Social, Movie);

//DOWNLOADABLE MOVIE
var DownloadableMovie = {}; 
//OR var DownloadableMovie = Object.create(Movie); 
DownloadableMovie.download = function() {
  console.log(this.get("title")+ "is downloading");
};

extend(Movie, DownloadableMovie);

//INSTANCES
var terminator = Object.create(DownloadableMovie);
terminator.set("title","Terminator");
terminator.set("year", 1984);

var goodfellas = Object.create(Movie);
goodfellas.set("title", "Goodfellas");
goodfellas.set("year", 1990);


//OBSERVER CLASS
function Observer(){
  this.play = null;
  this.Update = function(){
    // ...
  };
}

//CREATE MOVIE OBSERVER
var MovieObserver = new Observer();
MovieObserver.Update = function(value) {
  this.play = value;
  console.log("Movie Observer: " + this.play);
};

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

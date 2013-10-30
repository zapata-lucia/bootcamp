

$(document).ready(function(){
  retriveData();
});

function retriveData() {
  var dataSource = 'data.json';
  $.getJSON(dataSource, VisualTemplate);
};

function VisualTemplate(data){
  var source = $("#entry-template").html();
  template = Handlebars.compile(source);
  $(document.body).append (template (data));
};

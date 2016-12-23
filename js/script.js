//Insert prompt

var dimensions = prompt("How many squares per side would you like?");
var unitSize = 560 / dimensions;


$(document).ready( function() {
  for(var i = 0; i < dimensions; i++) {
    for(var j = 0; j < dimensions; j++) {
      var unit = $("<div class = \"unit\"></div>");
      unit.appendTo("#container");
    }
  }
  $(".unit").css("width", unitSize + "px");
  $(".unit").css("height", unitSize + "px");

  $(".unit").hover(function() {
    $(this).css("background-color", "#FFF");
    console.log("wtf");
  });
});

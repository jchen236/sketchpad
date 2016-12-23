
$(document).ready( function() {
  clear();
  $(".unit").hover(function() {
    $(this).css("background-color", "#000");
  });
});

function draw(dimensions) {
  for(var i = 0; i < dimensions; i++) {
    for(var j = 0; j < dimensions; j++) {
      var unit = $("<div class = \"unit\"></div>");
      unit.appendTo("#container");
    }
  }
}

function clear() {
  var dimensions = prompt("How many squares per side would you like?");
  var unitSize = 560 / dimensions;
  draw(dimensions);
  $(".unit").css("width", unitSize + "px");
  $(".unit").css("height", unitSize + "px");
  console.log("clearing");
}

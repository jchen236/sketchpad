
$(document).ready( function() {
  clean();

  function draw(dimensions) {
    for(var i = 0; i < dimensions; i++) {
      for(var j = 0; j < dimensions; j++) {
        var unit = $("<div class = \"unit\"></div>");
        unit.appendTo("#container");
      }
    }
  }

  function clean() {
    var dimensions = prompt("How many squares per side would you like?");
    var unitSize = 560 / dimensions;
    draw(dimensions);
    $(".unit").css("width", unitSize + "px");
    $(".unit").css("height", unitSize + "px");
    $(".unit").hover(function() {
      $(this).css("background-color", "#000");
    });
  };

  $("button").click(function () {
    var myNode = document.getElementById("container");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    clean();
  });

  
});

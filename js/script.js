
$(document).ready( function() {
  var dimensions = -1;
  var unitSize = -1;
  repaint();

  //Remakes the grid with the dimensions
  function createGrid(dimensions) {
    for(var i = 0; i < dimensions; i++) {
      for(var j = 0; j < dimensions; j++) {
        var unit = $("<div class = \"unit\"></div>");
        unit.appendTo("#container");
      }
    }
  }

  //Calls createGrid(), also specifies the box size and color
  function reset() {
    createGrid(dimensions);
    $(".unit").css("width", unitSize + "px");
    $(".unit").css("height", unitSize + "px");
    $(".unit").hover(function() {
      $(this).css("background-color", "#000");
    });
  }

  //Prompts for dimension and calls reset()
  function repaint() {
    dimensions = prompt("How many squares per side would you like?");
    unitSize = 590 / dimensions;
    reset()
    }


  //Deletes the inner divs
  function deleteUnits() {
    var myNode = document.getElementById("container");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  //Delete divs and reprompt for size change
  $("#newgrid").click(function () {
    deleteUnits();
    repaint();
  });

  $("#reset").click(function () {
    deleteUnits();
    reset();
  })


});

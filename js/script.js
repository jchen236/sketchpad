
$(document).ready( function() {
  var dimensions = -1;
  var unitSize = -1;
  var currentColor = "black";
  var isErase = false;
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

  function setCurrentColor(color) {
    currentColor = color;
  }

  function setHoverColor(color){
    $(".unit").hover(function() {
      $(this).css("background-color", color);
  });
}

  //Calls createGrid(), also specifies the box size and color
  function reset() {
    createGrid(dimensions);
    $(".unit").css("width", unitSize + "px");
    $(".unit").css("height", unitSize + "px");
    setCurrentColor("#000000");
    setHoverColor("#000000");
  }

  //Prompts for dimension and calls reset()
  function repaint() {
    dimensions = prompt("How many squares per side would you like?");
    unitSize = 590 / dimensions;
    reset();
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
    $("#color_picker").hide();
  });

  $("#reset").click(function () {
    deleteUnits();
    reset();
    $("#color_picker").hide();
  })

  $("#erase").click(function () {
    if(!isErase) {
      setHoverColor("#FFFFFF");
      isErase = true;
    }
    else {
      setHoverColor(currentColor);
      isErase = false;
    }
  });

  $("#freestyle").click(function() {
    $("#color_picker").show();
  });

  $("#color_submit").click(function() {
    var color = $("#color_input").val();
    console.log(color);
    var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    if(color.substring(0,1) != "#") {
      console.log("begin with #");
      return false;
    }
    else if (!isOk) {
      console.log("Please enter a valid hex color");
      return false;
    }
    else {
      setCurrentColor(color);
      setHoverColor(color);
      return false;
    }
  });

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.round(Math.random() * 15)];
      }
    return color;
  }
  //Beautiful colors!
  $("#rainbow").click(function() {
    $(".unit").hover(function() {
      $(this).css("background-color", getRandomColor());
    });
  });


  //Greyscale
  $("#greyscale").click(function() {
    console.log("greyscale");
    setHoverColor("#000");
    $(".unit").hover(function() {
      var color = $(this).css("background-color");
      //
      // if(color === "rgb(255, 255, 255)") {
      //   console.log("color is white!");
      //   $(this).css("background-color", "#000000");
      //   $(this).css({'opacity': 0.1});
      // }
      // else {
        var currentOpacity = $(this).css('opacity');
        console.log(currentOpacity);
        if(currentOpacity == 1) {
          console.log("if loop")
          currentOpacity = "0.1";
          $(this).css({'opacity': currentOpacity});
        }
        else if (currentOpacity > 0) {
          console.log("inc opacity from " + currentOpacity);
          console.log(parseFloat(currentOpacity) + " blah");
          currentOpacity= (parseFloat(currentOpacity, 10) + 0.1);
          console.log(currentOpacity + " is the new opacity");
          $(this).css({'opacity': currentOpacity});
        }
      //}
    });


  });

  //http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  function shadeBlendConvert(p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
    if(!this.sbcRip)this.sbcRip=function(d){
        var l=d.length,RGB=new Object();
        if(l>9){
            d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
        }else{
            if(l==8||l==6||l<4)return null; //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
        }
        return RGB;}
    var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}
console.log(shadeBlendConvert(-0.1, "#FFF"));




});

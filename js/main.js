////////////
//EXTERNAL//
////////////
function sleep(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
function download(){
  var link = document.createElement('a');
  link.download = 'image.png';
  link.href = canvas.toDataURL();
  link.click();
  link.remove();
}



////////
//MAIN//
////////
    //VARS//
var TICK = 0;
let E;





//////////
//CANVAS//
//////////

    //VARS//
var canvasSize = {x: 512,y: 256}
var resolution = {x:512,y:256}
var resScale = 0.25; //for mouse


    //ELEMENTS//
var uiCanvas = document.getElementById("uicanvas");
var previewCanvas = document.getElementById("previewcanvas");
var canvas = document.getElementById("canvas");var ctx = canvas.getContext("2d");
let background = document.getElementById("background");
var div = document.getElementById("canvasdiv");
div.style.height = ""+canvasSize.y+"px";
div.style.width = ""+canvasSize.x+"px";

    //FUNC//
function UpdateCanvas(){
  canvas.height = resolution.y;
  canvas.width = resolution.x;
  previewCanvas.height = resolution.y;
  previewCanvas.width = resolution.x;
  uiCanvas.height = resolution.y;
  uiCanvas.width = resolution.x;
}
function ChangeRes(){
  if(resolution.x > resolution.y){
    resScale =  resolution.x / canvasSize.x;
  }
  else{
    resScale =  resolution.y / canvasSize.y; 
  }
canvas.style.backgroundSize = 200/resolution.x  + "%";
}
function ScrollUpdate(){
var rect = canvas.getBoundingClientRect();
 canvasOffset.x = rect.left;
 canvasOffset.y = rect.top;
}

function MoveCanvas(){

  div.style.left = canvasOffset.x + ((AbsPos.x-AbsLastPos.x))+"px";
  div.style.top = canvasOffset.y +((AbsPos.y-AbsLastPos.y))+"px";
  
  ScrollUpdate();
  }

////////
//TOOL//
////////
    //VARS//
var PRIMARY = "pencil";
var PRIMARY_MODE = "PENCIL_MODE_BASIC";
var lineWidth = 1;
var lineCap = 'butt';
var lineColor = "rgba(0,0,0,255)";

var SECONDARY = "eraser";
var SECONDARY_MODE = "ERASER_MODE_BASIC";
var lineWidthS = 0.1;
var lineCapS = 'butt';
var lineColorS = "rgba(0,0,0,255)";



////////////////
//COLORPALETTE//
////////////////
    //FUNC//
    function ChangeColor(value){//changes modified color at relevant places
 
  CurrentColor.getContext("2d").fillStyle = value;
  CurrentColor.getContext("2d").clearRect(0,0,1,1);
    CurrentColor.getContext("2d").fillRect(0,0,1,1);
       Color = value;
}

    //VARS//
var Color = "#000000"; //color being modified
var ColorSelected = false; //false=>PRIMARY,true=>SECONDARY

    //ELEMENTS//
let colorpickerBackground = document.getElementById("colorCanvasGradient"); //SATURATIONxLEVEL gradient
let cpbtx = colorpickerBackground.getContext("2d");
colorpickerBackground.width = 256;
colorpickerBackground.height = 256;
let huepickerBackground = document.getElementById("hueCanvasGradient"); //HUE gradient
let htx = huepickerBackground.getContext("2d");
huepickerBackground.width = 1;
huepickerBackground.height = 360;
let trpickerBackground = document.getElementById("trCanvasGradient"); //TRANSPARENTCY gradient
let trtx = trpickerBackground.getContext("2d");
trpickerBackground.width = 1;
trpickerBackground.height = 360;

    //UI//
const PRIMARY_COLOR = document.getElementById("PRIMARYCOLOR");
const SECONDARY_COLOR = document.getElementById("SECONDARYCOLOR");
const CurrentColor = document.getElementById("CurrentColor");
CurrentColor.width = 1;
CurrentColor.height = 1;
CurrentColor.getContext("2d").fillStyle = "#000000";
CurrentColor.getContext("2d").fillRect(0,0,1,1);
const styleCPE = getComputedStyle(document.querySelector('#colorpicker'));
const ColorButtonNew = document.getElementById("ColorButtonNew");
ColorButtonNew.addEventListener("click",function(){
if(!ColorSelected){
  lineColor = Color;
  PRIMARY_COLOR.style.backgroundColor = Color;

}else{
  lineColorS = Color;
  SECONDARY_COLOR.style.backgroundColor = Color;
}
});


let hex = document.getElementById("hex");
hex.addEventListener("input",function(){
//validate
if(hex.value.length == 7 || hex.value.length == 9){
  if(hex.value.includes("#")){
ChangeColor(hex.value);
  }

}
});
let rgba = document.getElementById("rgba");
rgba.addEventListener("input",function(){
//validate

  if(rgba.value.includes("rgba(")||rgba.value.includes("rgb(")){
    ChangeColor(rgba.value);
  }
});
let hsla = document.getElementById("hsla");
hsla.addEventListener("input",function(){
//validate

  if(hsla.value.includes("hsla(")||rgba.value.includes("hsl(")){
    ChangeColor(hsla.value);
  }


 
});
let setcolor = "rbg(0,0,0,255)";
let oncolor=false;
let colors = document.getElementsByClassName("color");
for (let i = 0; i < colors.length;i++){
  colors[i].onmouseover = function() {

  let color = colors[i].getAttribute("style");
  color = color.split(" ")[1];
  color = color.split(";")[0];
 
  setcolor = color;
  oncolor = true;
  }
  colors[i].onmouseout = function(){
    oncolor = false;;
  }
}






/////////
//MOUSE//
/////////

    //HOVER//
let hoveringON;
let hoveredON; //When mousedown
uiCanvas.onmouseover = function(){
hoveringON = "canvas";
}
uiCanvas.onmouseout = function(){
hoveringON = "none";
}
background.onmouseover = function(){
hoveringON = "background";
}
background.onmouseout = function(){
//hoverBackground = false;
hoveringON = "none";
}

//color mouse changes
colorpickerBackground.onmouseover = function(){
hoveringON = "colorpicker";
}
colorpickerBackground.onmouseout = function(){
hoveringON = "none";
}

 let colorPickerCursor = document.getElementById("gradientcursor");
colorPickerCursor.onmouseover = function(){
  hoveringON = "colorpicker";
  }
  colorPickerCursor.onmouseout = function(){
    hoveringON = "none";
    }

      //MOUSE//
var left = false;
var middle = false;
var right = false;
var canvasOffset = {x:0,y:0}

var pos = {x:0,y:0}//current position on canvas
var lastPos = {x:-1, y:-1}//last position on canvas
var downPos = {x:0, y:0}//last clicked position on canvas
var upPos = {x:0, y:0}//last let go position on canvas
let perfectPos = {x:0,y:0}//last confirmed pixel on canvas
let lastIntPos = {x:0,y:0}
var AbsPos = {x:0,y:0}
var AbsLastPos = {x:0,y:0}

    //FUNC//
function UpdatePos(){
  AbsLastPos.x = AbsPos.x;
  AbsLastPos.y = AbsPos.y;
  lastPos.x = pos.x;
  lastPos.y = pos.y;
  pos.x = ((E.clientX-canvasOffset.x)*resScale);
  pos.y = ((E.clientY-canvasOffset.y)*resScale);
 AbsPos.x = E.clientX;
 AbsPos.y = E.clientY;

}
    //EVENTS//

    document.addEventListener("mousedown", function(e){
      downPos.x = pos.x;
      downPos.y = pos.y;
      switch(e.button){
        case(0): //console.log("left");
        hoveredON = hoveringON;
       
         left = true;
         previewCanvas.getContext("2d").fillStyle = lineColor;ctx.fillStyle = lineColor; ctx.strokeStyle = lineColor;  
         switch(PRIMARY){
          case("pencil"):
          switch(PRIMARY_MODE){
      case("PENCIL_MODE_PIXEL"):
      
      perfectPos.x = ~~pos.x;
      perfectPos.y = ~~pos.y;
      if(hoveredON == "canvas"){
         ctx.fillRect(perfectPos.x,perfectPos.y,lineWidth,lineWidth);
        PixelPerfectLinePencil(lastPos.x,lastPos.y,pos.x,pos.y,lineWidth);
      }
     
      
     
      break;
      
          }
      
       break;
        }
         E = e;
         Draw();
         break;
        case(1): /*console.log("middle");*/ middle = true; break;
        case(2): /*console.log("right");*/ right = true;
        hoveredON = hoveringON;
        previewCanvas.getContext("2d").fillStyle = lineColorS;ctx.fillStyle = lineColorS; ctx.strokeStyle = lineColorS;  
        E = e;
        Draw();
        break;
      }
    
    
       if(oncolor){
      if(left){
        lineColor = setcolor;
      }else if(right){
        lineColorS = setcolor;
      }else if(middle){
        //move+ color
        console.log("middle");
      }
     }
      
    
    
    });
    document.addEventListener("mouseup", function(e){
     
      //lastPos.x = pos.x;
      //lastPos.y = pos.y;
        switch(e.button){
        case(0): /*console.log("left");*/ left = false;
          switch(PRIMARY){
        case("pencil"):
        switch(PRIMARY_MODE){
    case("PENCIL_MODE_PIXEL"):
     previewCanvas.getContext("2d").clearRect(lastIntPos.x,lastIntPos.y,lineWidth,lineWidth);
    if(hoveredON == "canvas"){
      console.log("hever");
       ctx.fillStyle = lineColor;
    ctx.fillRect(lastIntPos.x,lastIntPos.y,lineWidth,lineWidth);
    }
   
    break;
    
        }
    
     break;
      }
     break;
        case(1): /*console.log("middle");*/ middle = false; break;
        case(2): /*console.log("right");*/ right = false; break;
      }
    
    
    
    
    
    
     if(left&!right){
        previewCanvas.getContext("2d").fillStyle = lineColor;ctx.fillStyle = lineColor; ctx.strokeStyle = lineColor;  
      }else if(!left&right){
        previewCanvas.getContext("2d").fillStyle = lineColorS;ctx.fillStyle = lineColorS; ctx.strokeStyle = lineColorS;  
      }
    
    
          UpdatePos();
          upPos.x =pos.x;
          upPos.y = pos.y;
          Draw();
    
     
      
      //pixel
     hoveredON = "none";
    
    });
    //drawing, pos update
    document.addEventListener("mousemove", function(e) {
      E = e;
    
    if(lastPos.x == -1){
    
     
        UpdatePos();
        lastPos.x = pos.x;
        lastPos.y = pos.y;
        AbsLastPos.x = AbsPos.x;
        AbsLastPos.y = AbsPos.y;
      }
    
    
     // lastPos.x = pos.x;
      //AbsLastPos.x = AbsPos.x;
      //AbsLastPos.y = AbsPos.y;
      //lastPos.y = pos.y;
       UpdatePos();
    if(middle){
     
      MoveCanvas();
     
      return true;
    }
      Draw();
    
    });
    
    document.addEventListener('wheel', function(e){
    
      if(e.wheelDelta > 0){
    
    
        if(canvasSize.x >= resolution.x/4 && canvasSize.x < resolution.x*2){
          var before = {x:0,y:0}
          var after = {x:0,y:0}
          before.x = ((E.clientX-canvasOffset.x)*resScale);
          before.y = ((E.clientY-canvasOffset.y)*resScale);
    canvasSize.x += resolution.x/4;
    canvasSize.y += resolution.y/4;
    div.style.height = canvasSize.y+"px";
    div.style.width = canvasSize.x+"px";
    ChangeRes();
    after.x = ((E.clientX-canvasOffset.x));
    after.y = ((E.clientY-canvasOffset.y));
    
    canvasOffset.x += (after.x-(before.x/resScale));
    canvasOffset.y += (after.y-(before.y/resScale));
    div.style.left = canvasOffset.x+"px";
    div.style.top = canvasOffset.y+"px";
         }
        else if(canvasSize.x < resolution.x * 24){
          var before = {x:0,y:0}
          var after = {x:0,y:0}
          before.x = ((E.clientX-canvasOffset.x)*resScale);
          before.y = ((E.clientY-canvasOffset.y)*resScale);
    canvasSize.x += resolution.x;
    canvasSize.y += resolution.y;
    div.style.height = canvasSize.y+"px";
    div.style.width = canvasSize.x+"px";
    ChangeRes();
    after.x = ((E.clientX-canvasOffset.x));
    after.y = ((E.clientY-canvasOffset.y));
    
    canvasOffset.x += (after.x-(before.x/resScale));
    canvasOffset.y += (after.y-(before.y/resScale));
    div.style.left = canvasOffset.x+"px";
    div.style.top = canvasOffset.y+"px";
        }
        /*
       else if(canvasSize.x < resolution.x*48){
        return false;
        canvasSize.x += resolution.x;
        canvasSize.y += resolution.y;
        canvas.style.height = ""+canvasSize.y+"px";
    canvas.style.width = ""+canvasSize.x+"px";
       }
       */
        
        
      }else{
    
        if(canvasSize.x > resolution.x*2){
         
          var before = {x:0,y:0}
          var after = {x:0,y:0}
          before.x = ((E.clientX-canvasOffset.x)*resScale);
          before.y = ((E.clientY-canvasOffset.y)*resScale);
          canvasSize.x -= resolution.x;
        canvasSize.y -= resolution.y;
        div.style.height = ""+canvasSize.y+"px";
    div.style.width = ""+canvasSize.x+"px";
    ChangeRes();
    after.x = ((E.clientX-canvasOffset.x));
    after.y = ((E.clientY-canvasOffset.y));
    
    canvasOffset.x += (after.x-(before.x/resScale));
    canvasOffset.y += (after.y-(before.y/resScale));
    div.style.left = canvasOffset.x+"px";
    div.style.top = canvasOffset.y+"px";
        } else if(canvasSize.x > resolution.x/4){
         
          var before = {x:0,y:0}
          var after = {x:0,y:0}
          before.x = ((E.clientX-canvasOffset.x)*resScale);
          before.y = ((E.clientY-canvasOffset.y)*resScale);
          canvasSize.x -= resolution.x/4;
        canvasSize.y -= resolution.y/4;
        div.style.height = ""+canvasSize.y+"px";
    div.style.width = ""+canvasSize.x+"px";
    ChangeRes();
    after.x = ((E.clientX-canvasOffset.x));
    after.y = ((E.clientY-canvasOffset.y));
    
    canvasOffset.x += (after.x-(before.x/resScale));
    canvasOffset.y += (after.y-(before.y/resScale));
    div.style.left = canvasOffset.x+"px";
    div.style.top = canvasOffset.y+"px";
        /*
        else if (canvasSize.x > resolution.x/2){
          return false;
          canvasSize.x -= resolution.x/2;
        canvasSize.y -= resolution.y/2;
        canvas.style.height = ""+canvasSize.y+"px";
    canvas.style.width = ""+canvasSize.x+"px";
        }
        */
        
      }
    }                              
      
      },true);
    
    
    
//////////
//WINDOW//
//////////
window.oncontextmenu = function ()
{
    return false;
}
window.onbeforeunload = function() {
  return "wait!";
};



////////
//DRAW//
////////
function PerfectLinePencil(X,Y,x,y,width) {
 
   if(X > x){//DONE
    if(Y > y){ //DONE
      
      let diffX = (X-x);
      let diffY = (Y-y);
     if(diffX >=diffY){
       for(let i = 0; i < diffX;i++){
   ctx.fillRect(~~(x+i),~~(y+(i/diffX)*diffY),width,width);
   }
     } else{
      for(let i = 0; i < diffY;i++){
        ctx.fillRect(~~(x+(i/diffY)*diffX),~~(y+i),width,width);
        }  
     }
    
    }
    else if (Y<y){//D
      let diffX = X-x;
      let diffY = y-Y;
      if(diffX >=diffY){
        for(let i = 0; i < diffX;i++){
   ctx.fillRect(~~(x+i),~~(y-(i/diffX)*diffY),width,width);
   }
      }else{
        for(let i = 0; i < diffY;i++){
          ctx.fillRect(~~(x+(i/diffY)*diffX),~~(y-i),width,width);
          }
      }
     
    }
    else{ // DONE
      let diffX = X-x;
     for(let i = 0; i < diffX;i++){
   ctx.fillRect(~~(x+i),~~y,width,width);
   }
    }
    
   }
   else if(X<x){
    if(Y > y){ //
      
      let diffX = (x-X);
      let diffY = (Y-y);
     
     if(diffX >=diffY){
  
       for(let i = 0; i < diffX;i++){
   ctx.fillRect(~~(x-i),~~(y+(i/diffX)*diffY),width,width);
   }
     } else{
     
      for(let i = 0; i < diffY;i++){
        ctx.fillRect(~~(x-(i/diffY)*diffX),~~(y+i),width,width);
        }  
     }
    
    }
    else if (Y<y){//
      let diffX = x-X;
      let diffY = y-Y;
      if(diffX >=diffY){
        for(let i = 0; i < diffX;i++){
   ctx.fillRect(~~(x-i),~~(y-(i/diffX)*diffY),width,width);
   }
      }else{
        for(let i = 0; i < diffY;i++){
          ctx.fillRect(~~(x-(i/diffY)*diffX),~~(y-i),width,width);
          }
      }
     
    }
    else{ // 
     
      let diffX = x-X;
     for(let i = 0; i < diffX;i++){
   ctx.fillRect(~~(x-i),~~y,width,width);
   }
    }
    
   }
   else{
    
    if(Y > y){
      
      let diffY = Y-y;
     
     for(let i = 0; i < diffY;i++){
   ctx.fillRect(~~X,~~(y+i),width,width);
   }
    }
    else if (Y<y){
    
      let diffY = y-Y;
     for(let i = 0; i < diffY;i++){
   ctx.fillRect(~~X,~~(y-i),width,width);
   }
    }
    else{
     
   ctx.fillRect(~~X,~~Y,width,width);
   
    }
    
   }
   if(TICK > 0){
   sleep(TICK);
   }
  //sleep(100);
  }
  
function PixelPerfectLinePencil(X,Y,x,y,width) {
  
    

    if((Math.abs(perfectPos.x- ~~x) < 2) && (Math.abs(perfectPos.y- ~~y) < 2)){
      var xy = {x:~~x,y:~~y}
     if(xy.x != lastIntPos.x || xy.y != lastIntPos.y){
      //previewCanvas.getContext("2d").clearRect(0,0,resolution.x,resolution.y);      //this is... something
      previewCanvas.getContext("2d").clearRect(lastIntPos.x,lastIntPos.y,1,1); //less of a war crime than above
      lastIntPos.x = xy.x;
      lastIntPos.y = xy.y;
      previewCanvas.getContext("2d").fillRect(lastIntPos.x,lastIntPos.y,lineWidth,lineWidth);
      
      
      
      
     }
    

      return;
    }
    
    else if ((Math.abs(perfectPos.x- ~~x) < 3) && (Math.abs(perfectPos.y- ~~y) < 3)){
   
    ctx.fillRect(lastIntPos.x,lastIntPos.y,lineWidth,lineWidth);
    perfectPos.x = lastIntPos.x;
    perfectPos.y = lastIntPos.y;

    return;
    }




 X = perfectPos.x;
 Y = perfectPos.y;
 

perfectPos.x = ~~x;
perfectPos.y = ~~y;

   PerfectLinePencil(X,Y,x,y,lineWidth);
  
   }
   
//DRAW CODE
function Draw(){
      //COLORPICKER//
  let Xoff = styleCPE.left.split("px")[0];
  let Yoff = styleCPE.top.split("px")[0];  
  if(hoveredON == "colorpicker"){
    if(left){
     
      //var idk = cpbtx.getImageData(~~(AbsPos.x-Xoff),~~(AbsPos.y-Yoff),1,1).data;
      var x = ~~(AbsPos.x-Xoff-4)*2;
      var y = ~~(AbsPos.y-Yoff-4)*2;
      if(x > 255){x=255;}
      if(y > 255){y=255;}
      if(x < 0){x=0;}
      if(y < 0){y=0;}
      //UI
       colorPickerCursor.style.left = (x/2-8)+"px";
      colorPickerCursor.style.top = (y/2-8)+"px";
      var idk = cpbtx.getImageData(x,y,1,1).data;
    Color = "rgba("+idk[0]+","+idk[1]+","+idk[2]+",1)";
      CurrentColor.getContext("2d").fillStyle = Color;
       CurrentColor.getContext("2d").fillRect(0,0,1,1);
    }
  }
      //DRAW//
  if(hoveredON != "canvas" && hoveredON!= "background"){
    return;
  }
  if(left){
    switch(PRIMARY){
      case("pencil"):




          ctx.lineWidth = lineWidth;
      ctx.beginPath();
      switch(PRIMARY_MODE){
case("PENCIL_MODE_BASIC"):
  ctx.fillRect(~~pos.x,~~pos.y,lineWidth,lineWidth);
break;
case("PENCIL_MODE_NOGAPS"):

PerfectLinePencil(lastPos.x,lastPos.y,pos.x,pos.y,lineWidth);
 
break;

case("PENCIL_MODE_BLURRY"):

ctx.beginPath(); // begin

  ctx.lineWidth = lineWidth/2;
  ctx.lineCap = "round";
 
if(lastPos.x == pos.x){
  lastPos.x += 0.1;
}
  ctx.moveTo(lastPos.x, lastPos.y); // from
  
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
break;
case("PENCIL_MODE_PIXEL"):

PixelPerfectLinePencil(lastPos.x,lastPos.y,pos.x,pos.y,lineWidth);
 
break;

      }

     
      break;
      case("line"):

    }




    /*
    // update mouse
    ctx.beginPath();
    if(PRIMARY == "eraser"){
      ctx.clearRect(~~pos.x,~~pos.y,1,1);
    }
    else{
      ctx.fillRect(~~pos.x,~~pos.y,1,1);
    }
    
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  
    pos.x = (E.clientX*resScale)*scale;
    pos.y = (E.clientY*resScale)*scale;
    /*
    ctx.fillRect(~~pos.x+.5,~~pos.y+.5,lineWidth,lineWidth);
  
    ctx.fillRect(~~pos.x+.5,~~pos.y+.5,lineWidth,lineWidth);
    */
    
   
  }
  else if (right){
   
    // update mouse
    ctx.beginPath();
    if(SECONDARY == "eraser"){
      ctx.clearRect(~~pos.x,~~pos.y,lineWidth,lineWidth);
    }
    else{
      ctx.fillRect(~~pos.x,~~pos.y,lineWidth,lineWidth);
    }
    
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  
  UpdatePos();
    /*
    ctx.beginPath();
  
    ctx.lineWidth = lineWidthS;
    ctx.lineCap = lineCapS;
    ctx.strokeStyle = lineColorS;
    ctx.moveTo(pos.x, pos.y); 
    // update mouse
    pos.x = (e.clientX*resScale)*scale;
    pos.y = (e.clientY*resScale)*scale;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke(); 
    */
  }
  else {
     // update mouse
    UpdatePos();
  }
  
  
}




//////////////
//GENERIC UI//
//////////////
let LeftHidden = false;
let UILeft = document.getElementById("UIleft");
let UILeftToggle = document.getElementById("left");
UILeftToggle.addEventListener("click",function(x){
if(LeftHidden){
  UILeft.style.visibility = "visible";
}else{
  UILeft.style.visibility = "hidden";
}
LeftHidden = !LeftHidden;
});
let Input_tick = document.getElementById("tick");
Input_tick.addEventListener("input",function(e){
  if(Input_tick.value < 2001 && Input_tick.value > -1){
      TICK = Input_tick.value;
  }else{
    TICK = 0;
    Input_tick.value = 0;
  }


});
let Input_lnW = document.getElementById("lnW");
Input_lnW.addEventListener("input",function(e){
  if(Input_lnW.value < 1024 && Input_lnW.value > 0){
    lineWidth = Input_lnW.value;
}else{
  lineWidth = 1;
  Input_lnW.value = 1;
}

});

    //FILE MENU//
let New = document.getElementById("new");
New.addEventListener("click",function(e){
ctx.clearRect(0,0,resolution.x,resolution.y);  
previewCanvas.getContext("2d").clearRect(0,0,resolution.x,resolution.y);   
uiCanvas.getContext("2d").clearRect(0,0,resolution.x,resolution.y);   
});
let Resize = document.getElementById("resize");
let UIResize = document.getElementById("UIres");
Resize.addEventListener("click",function(e){
  if(UIResize.style.visibility == "hidden"){
    UIResize.style.visibility = "visible";
    document.getElementById("resX").value = resolution.x;
    document.getElementById("resY").value = resolution.y;
  }else{
    UIResize.style.visibility = "hidden";
  }


  
});
document.getElementById("resizeconfirm").addEventListener("click",function(e){ 
  var sx = Number(document.getElementById("resX").value);
  var sy =  Number(document.getElementById("resY").value);
var img = new Image();
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
  img.src = url;
  });
img.onload = function(){

  canvasSize.x = sx;
  canvasSize.y = sy
  resolution.x = sx;
  resolution.y = sy;

  div.style.height = ""+canvasSize.y+"px";
  div.style.width = ""+canvasSize.x+"px";
  UpdateCanvas();
  div.style.left = "119px";
  div.style.top = "40px";
  ChangeRes();
ScrollUpdate();

ctx.drawImage(img,0,0);
}




});
let Save = document.getElementById("save");
let OpenButton = document.getElementById("fileClick");
let Open = document.getElementById("open");
Save.addEventListener("click",download);
OpenButton.addEventListener("click",function(e){
Open.click();
});
Open.addEventListener("change",function(e){
  var image = new Image();
  image.onload = function(){
canvasSize.x = image.width;
canvasSize.y = image.height;
resolution.x = image.width;
resolution.y = image.height;

ChangeRes();
ScrollUpdate();



div.style.height = ""+canvasSize.y+"px";
div.style.width = ""+canvasSize.x+"px";
UpdateCanvas();

 ctx.drawImage(image,0,0);
  }
  image.src = URL.createObjectURL(this.files[0]);
  
 
});

let select = false; //false=PRIMARY,true=SECONDARY
let PRIMARYtoolSELECT;
let SECONDARYtoolSELECT; 

let Button_primary = document.getElementById("primary");
let Button_secondary = document.getElementById("secondary");
Button_primary.addEventListener("click",function(e) {
  select = false;
  Button_primary.classList.add("selectP");
  Button_secondary.classList.remove("selectS");
  });
  Button_secondary.addEventListener("click",function(e) {
    select = true;
    Button_primary.classList.remove("selectP");
    Button_secondary.classList.add("selectS");
    });
let Button_pencil = document.getElementById("pencil");
let Button_line = document.getElementById("line");
let Button_poly = document.getElementById("poly");
let Button_circle = document.getElementById("circle");
let Button_select = document.getElementById("select");
let Button_eraser = document.getElementById("eraser");
PRIMARYtoolSELECT = Button_pencil;
SECONDARYtoolSELECT = Button_eraser;

let Menu_Tool = document.getElementById("toolmenu");
      //FUNC//
function CreateIcon(img,id){
  let temp = document.createElement("button");
  let imgobj = document.createElement("img");
  imgobj.src = img;
  imgobj.width = 48;
  imgobj.height = 48;
  temp.appendChild(imgobj);
  temp.classList.add("icon");
  temp.id = id;




  //BUTTONCLICK
  temp.addEventListener("click", function(e) {
console.log(id);
if(!select){
  PRIMARY_MODE = id;
}else{
  SECONDARY_MODE = id;
}

  });
  return temp;
}

function MenuChange() {
  
if(!select){
  let name;
  let br;
  let label,input;
  switch(PRIMARY){
    case("pencil"): 
    Menu_Tool.textContent = "";
    name = document.createElement("h2"); 
     br = document.createElement("br");
    name.innerHTML = "Pencil";
    Menu_Tool.appendChild(name);
    name = document.createElement("p"); 
 
    name.innerHTML = "Mode:";
    Menu_Tool.appendChild(name);

      
    Menu_Tool.appendChild(CreateIcon("./icons/toolmodes/pencil_mode-13.png","PENCIL_MODE_BASIC"));
    Menu_Tool.appendChild(CreateIcon("./icons/toolmodes/pencil_mode-2.png","PENCIL_MODE_BLURRY"));
    br = document.createElement("br");
    Menu_Tool.appendChild(br);
    Menu_Tool.appendChild(CreateIcon("./icons/toolmodes/pencil_mode-2-2.png","PENCIL_MODE_NOGAPS"));
    Menu_Tool.appendChild(CreateIcon("./icons/toolmodes/pencil_mode-14.png","PENCIL_MODE_PIXEL"));
    br = document.createElement("br");
    Menu_Tool.appendChild(br);
    label = document.createElement("label");
    label.setAttribute("for","size");
    label.innerHTML = "Size:";
    Menu_Tool.appendChild(label);
    br = document.createElement("br");
    Menu_Tool.appendChild(br);
    /*
    input = document.createElement("input");
    input.id = "size";
    input.setAttribute("type","number");
    input.setAttribute("name","size");
    input.value = 1;
    input.addEventListener("change", function(e){
    if(input.value > 0){
      if(!select){
        lineWidth = input.value;
      }else{
        lineWidthS = input.value;
      }

    }
    });

    Menu_Tool.appendChild(input);
*/




    break;

    case("line"): 
    Menu_Tool.textContent = "";
    name = document.createElement("h2"); 
      br = document.createElement("br");
    name.innerHTML = "Line";
    Menu_Tool.appendChild(name);
    name = document.createElement("p"); 
    name.innerHTML = "Style:";
    Menu_Tool.appendChild(name);
    name = document.createElement("p"); 
    Menu_Tool.appendChild(CreateIcon("./icons/pencil.png","crisp"));
    Menu_Tool.appendChild(CreateIcon("./icons/line.png","blurry"));
    br = document.createElement("br");
    Menu_Tool.appendChild(br);
    name.innerHTML = "Mode:";
    Menu_Tool.appendChild(name);
    name = document.createElement("p"); 
    Menu_Tool.appendChild(CreateIcon("./icons/poly.png","BASIC"));
    Menu_Tool.appendChild(CreateIcon("./icons/circle.png","NOGAPS"));
    br = document.createElement("br");
    Menu_Tool.appendChild(br);
   
    break;
  }
}
}

function UIbuttonCLICK(obj){
  if(select){
    
    SECONDARYtoolSELECT.classList.remove("selectS");
    SECONDARYtoolSELECT.classList.remove("select");
    SECONDARYtoolSELECT.classList.remove("selectP");
    if(SECONDARYtoolSELECT == PRIMARYtoolSELECT){
      
      PRIMARYtoolSELECT.classList.add("selectP");
    }
    if(PRIMARYtoolSELECT == obj){
      obj.classList.remove("selectP");
      obj.classList.remove("selectS");
      obj.classList.add("select");
    }else{
      obj.classList.remove("select");
      obj.classList.remove("selectP");
      obj.classList.add("selectS");
    }
SECONDARYtoolSELECT = obj;
  } else {
    PRIMARYtoolSELECT.classList.remove("selectS");
    PRIMARYtoolSELECT.classList.remove("select");
    PRIMARYtoolSELECT.classList.remove("selectP");
    if(SECONDARYtoolSELECT == PRIMARYtoolSELECT){
      
      SECONDARYtoolSELECT.classList.add("selectS");
    }
    if(SECONDARYtoolSELECT == obj){
      obj.classList.remove("selectP");
      obj.classList.remove("selectS");
      obj.classList.add("select");
    }else{
      obj.classList.remove("select");
      obj.classList.remove("selectS");
      obj.classList.add("selectP");
    }
PRIMARYtoolSELECT = obj;
  }
  MenuChange();
 
return;
}

    //TOOLS//
Button_pencil.addEventListener("click",function(e) {
if(!select){
PRIMARY = "pencil";
}else{
SECONDARY = "pencil";
}

UIbuttonCLICK(Button_pencil);

});
Button_line.addEventListener("click",function(e) {
  if(!select){
    PRIMARY = "line";
    }else{
    SECONDARY = "line";
    }
  UIbuttonCLICK(Button_line);
  });
  Button_poly.addEventListener("click",function(e) {
    if(!select){
      PRIMARY = "poly";
      }else{
      SECONDARY = "poly";
      }
    UIbuttonCLICK(Button_poly);
    });
    Button_circle.addEventListener("click",function(e) {
      if(!select){
        PRIMARY = "circle";
        }else{
        SECONDARY = "circle";
        }
      UIbuttonCLICK(Button_circle);
      });
      Button_select.addEventListener("click",function(e) {
        if(!select){
          PRIMARY = "select";
          }else{
          SECONDARY = "select";
          }
        UIbuttonCLICK(Button_select);
        });
        Button_eraser.addEventListener("click",function(e) {
          if(!select){
            PRIMARY = "eraser";
            }else{
            SECONDARY = "eraser";
            }
          UIbuttonCLICK(Button_eraser);
          });



////////////////////
//III-NN-N-III-TTT//
//-I--N-NN--I---T-//
//III-N--N-III--T-//
////////////////////
function Init() {

//UI//
 MenuChange();
//CANVAS//
UpdateCanvas();
ChangeRes();
ScrollUpdate();

 //TOOL//
 ctx.fillStyle = lineColor;

 //COLORPALETTE//
 cpbtx.fillStyle = "#FFFFFFFF";
 cpbtx.fillRect(0,0,256,256);
 //colored gradient
 for(let i = 0; i < 256;i++){
  cpbtx.fillStyle = "rgba(255,0,0,"+(i/255)+")";
  cpbtx.fillRect(i,0,1,256);
 }
 for(let i = 0; i < 256;i++){
  cpbtx.fillStyle = "rgba(0,0,0,"+(i/255)+")";
  cpbtx.fillRect(0,i,256,1);
 }
 for(let i = 0; i < 360;i++){
  htx.fillStyle = "hsla("+i+",100%,50%,1)";
   htx.fillRect(0,i,1,1);
 }
 for(let i = 0; i < 360;i++){
  trtx.fillStyle = "rgba(255,0,0,"+(i/360)+")";
   trtx.fillRect(0,i,1,1);
 }

}
Init();
   
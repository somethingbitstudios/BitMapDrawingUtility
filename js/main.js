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



//////////////
//CONVERSION//
//////////////
function BinaryToHex(string){
  switch(string){
  case("0000"):
    return "0";
    break;
    case("0001"):
    return "1";
    break;
    case("0010"):
    return "2";
    break;
    case("0011"):
    return "3";
    break;
    case("0100"):
    return "4";
    break;
    case("0101"):
    return "5";
    break;
    case("0110"):
    return "6";
    break;
    case("0111"):
    return "7";
    break;
    case("1000"):
    return "8";
    break;
    case("1001"):
    return "9";
    break;
    case("1010"):
    return "a";
    break;
    case("1011"):
    return "b";
    break;
    case("1100"):
    return "c";
    break;
    case("1101"):
    return "d";
    break;
    case("1110"):
    return "e";
    break;
    case("1111"):
    return "f";
    break;
}
}
function HexToBinary(string){
  switch(string){
  case("0"):
    return "0000";
    break;
    case("1"):
    return "0001";
    break;
    case("2"):
    return "0010";
    break;
    case("3"):
    return "0011";
    break;
    case("4"):
    return "0100";
    break;
    case("5"):
    return "0101";
    break;
    case("6"):
    return "0110";
    break;
    case("7"):
    return "0111";
    break;
    case("8"):
    return "1000";
    break;
    case("9"):
    return "1001";
    break;
    case("a"):
    return "1010";
    break;
    case("b"):
    return "1011";
    break;
    case("c"):
    return "1100";
    break;
    case("d"):
    return "1101";
    break;
    case("e"):
    return "1110";
    break;
    case("f"):
    return "1111";
    break;
}
}
function DecimalToHex(string){
  let num = Number(string);
  let binary = [];
 while(num > 0){
  let rem = num % 2;
 
  binary.push(rem);
  num = Math.floor(num/2);
 }

 let len = binary.length;
 for(let i = 0; i < 8-len;i++){
  binary.push("0");
  
 }

  binary.reverse();
 
  let hex1 = ""+binary[0]+binary[1]+binary[2]+binary[3];
  let hex2 = ""+binary[4]+binary[5]+binary[6]+binary[7];
 
  hex1 = BinaryToHex(hex1);
 
  hex2 = BinaryToHex(hex2);
  return hex1+hex2;


}
function HexToDecimal(string){
let HEX1 = string[0];
let HEX2 = string[1];
HEX1 = HexToBinary(HEX1);
HEX2 = HexToBinary(HEX2); 
let Binary = HEX1+HEX2;
let Decimal = 0;
//binary to decimal
for(let i = 0;i < 8;i++){
 Decimal =  Decimal*2+Number(Binary[i])
}

return Decimal;
}

function RGBAtoHEX(rgba){
  let r = rgba.split("rgba(")[1].split(",")[0];
  let g = rgba.split("rgba(")[1].split(",")[1];
  let b = rgba.split("rgba(")[1].split(",")[2];
  let a = rgba.split("rgba(")[1].split(",")[3].split(")")[0];
let HEXr = DecimalToHex(r);
let HEXg = DecimalToHex(g);
let HEXb = DecimalToHex(b);

let HEXa = DecimalToHex(~~(a*255)); //FIX
let HEX = "#"+HEXr+HEXg+HEXb+HEXa;

return HEX;
}
function HEXtoRGBA(hex){
  let hex1 = hex.substring(1,3); hex1 = Number(HexToDecimal(hex1));
  let hex2 = hex.substring(3,5); hex2 = Number(HexToDecimal(hex2));
  let hex3 = hex.substring(5,7); hex3 = Number(HexToDecimal(hex3));
let hexa = 0;
  if(hex.length == 7){
  hexa = 255;
  }else{
  hexa = hex.substring(7,9); hexa = Number(HexToDecimal(hexa));
  }

  hexa = (hexa/255)+"";
  hexa = Number(hexa.substring(0,4));
  return ("rgba("+hex1+","+hex2+","+hex3+","+hexa+")");
}
function RGBAtoHSLA(rgba){
  let r = Number(rgba.split("rgba(")[1].split(",")[0])/255;
  let g = Number(rgba.split("rgba(")[1].split(",")[1])/255;
  let b = Number(rgba.split("rgba(")[1].split(",")[2])/255;
  let a = rgba.split("rgba(")[1].split(",")[3].split(")")[0];
  let cmax = Math.max(r,Math.max(g,b));
  let cmin = Math.min(r,Math.min(g,b));
  let diff = cmax - cmin;
  var hue = 0;
 if(r==g&&g==b){
  hue=0;
 }else{
   switch(cmax){
    case(0):break;
    case(r): hue = (60 * ((g - b) / diff) + 360) % 360;break;
    case(g): hue = (60 * ((b - r) / diff) + 120) % 360;break;
    case(b): hue = (60 * ((r - g) / diff) + 240) % 360;break;

  }
 }
 
  var sat = 0;
  if(cmax > 0){
    sat = (diff/cmax)*100;
  }
  var value = cmax*100;
  hue = (""+hue).split(".")[0];
  sat = (""+sat).split(".")[0];
  value = (""+value).split(".")[0];
return "hsla("+hue+","+sat+","+value+","+a+")";

}
function HSLAtoRGBA(hsla){





  let h = Number(hsla.split("hsla(")[1].split(",")[0]);
  let s = Number(hsla.split("hsla(")[1].split(",")[1])*255/100;
  let v = Number(hsla.split("hsla(")[1].split(",")[2])*255/100;
  let a = Number(hsla.split(")")[0].split("hsla(")[1].split(",")[3]);




//credit to that_guy for finding this convertor somewhere

var rgb = { };

      if (s == 0) {

      rgb.r = rgb.g = rgb.b = v;
      } else {
      var t1 = v;
      var t2 = (255 - s) * v / 255;
      var t3 = (t1 - t2) * (h % 60) / 60;

          if (h == 360) h = 0;

              if (h < 60) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3 }
              else if (h < 120) { rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3 }
              else if (h < 180) { rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3 }
              else if (h < 240) { rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3 }
              else if (h < 300) { rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3 }
              else if (h < 360) { rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3 }
              else { rgb.r = 0; rgb.g = 0; rgb.b = 0 }
      }
return "rgba("+Math.round(rgb.r)+","+Math.round(rgb.g)+","+Math.round(rgb.b)+","+a+")";
  


}
function ALLToRGBA(value){
  if(value.includes("rgba(")){
    return value;
  }else if (value.includes("#")){
    return HEXtoRGBA(value);
  }else if (value.includes("hsla(")){
    return HSLAtoRGBA(value);
  }else{
    return "rgba("+value+")";
  }
  
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
var canvasSize = {x: 64,y: 64}
var resolution = {x:64,y:64}
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
  var selected = false; //false = primary,true = secondary
var PRIMARY = "pencil";
var PRIMARY_MODE = "PENCIL_MODE_BASIC";
var lineWidth = 1;
var lineCap = 'butt';
var lineColor = "rgba(255,0,0,1)";

var SECONDARY = "eraser";
var SECONDARY_MODE = "ERASER_MODE_BASIC";
var lineWidthS = 0.1;
var lineCapS = 'butt';
var lineColorS = "rgba(0,0,0,1)";

    //fill//

var fillTool = false;

//OS-off screen fill

var OS_canvas;
var OS_fillColor;

var tobefilledpos = [];
var lastfilledpos = []; //also seeds
var filledcolor;
var lastfilledlenght = 0;
var fillUpdate;
var filling = false;



var upSeeded = false;
var downSeeded = false;
function FourWayFill(){
  lastfilledlenght = lastfilledpos.length;
  for(let i = 0;i< lastfilledlenght;i++){
      FillAround();
      
  }
  if(tobefilledpos.length==0){
    clearInterval(fillUpdate);
  filling = false;
  }else{
  
    lastfilledpos = tobefilledpos;
    tobefilledpos = [];
  }
}


function ScanlineFill(){
  //XY expected to be most left, different color right of the x
  for(let i = 0; i < lastfilledpos.length;i++){
      downSeeded =  false;
  upSeeded = false;
    FillLine(lastfilledpos[0]);
    lastfilledpos.splice(0, 1);
  }

}

function OS_ScanlineFill(){
   //XY expected to be most left, different color right of the x
   for(let i = 0; i < lastfilledpos.length;i++){
    downSeeded =  false;
upSeeded = false;
  OS_FillLine(lastfilledpos[0]);
  lastfilledpos.splice(0, 1);
}
if(lastfilledpos.length < 1){
  //clearInterval(fillUpdate);
  ctx.putImageData(OS_canvas,0,0);
  //console.log("complete");
  filling = false;

}

}
function FillLine(xy){
while( String(ctx.getImageData(xy.x,xy.y,1,1).data)==String(filledcolor) && xy.x < resolution.x){
  ctx.fillRect(xy.x,xy.y,1,1);

  if(xy.y+1 < resolution.y){
    
    if(String(ctx.getImageData(xy.x,xy.y+1,1,1).data)==String(filledcolor)){ 
       
      if(!downSeeded){
        var tempCords = {x:xy.x,y:xy.y+1};
        while (String(ctx.getImageData(tempCords.x,tempCords.y,1,1).data)==String(filledcolor)){

          if(tempCords.x <= 0){
            tempCords.x--;
            break;
               
          }tempCords.x--;
          
        
        }
        tempCords.x++;
        lastfilledpos.push({x:tempCords.x,y:tempCords.y});
        downSeeded = true;
      }
  }else{
    downSeeded = false;
  }
  }
  if(xy.y > 0){
     if(String(ctx.getImageData(xy.x,xy.y-1,1,1).data)==String(filledcolor)){
      if(!upSeeded){
        var tempCords = {x:xy.x,y:xy.y-1};
        while (String(ctx.getImageData(tempCords.x,tempCords.y,1,1).data)==String(filledcolor)){

          if(tempCords.x <= 0){
            tempCords.x--;
            break;
               
          }tempCords.x--;
          
        
        }
        tempCords.x++;
        lastfilledpos.push({x:tempCords.x,y:tempCords.y});
    upSeeded = true;
      }
  }else{
    upSeeded = false;
  }
  }
  xy.x++;
}
}
function ArrayEqual(arr1,arr2){
if(arr1.length != arr2.length){
  return false;
}
for(let i = 0; i < arr1.length;i++){
  if(arr1[i]!=arr2[i]){
    return false;
  }
}
return true;
}
function OS_GetPixel(xy){
  //return OS_canvas[]
  return [OS_canvas.data[(xy.x+xy.y*resolution.x)* 4],OS_canvas.data[(xy.x+xy.y*resolution.x)* 4+1],OS_canvas.data[(xy.x+xy.y*resolution.x)* 4+2],OS_canvas.data[(xy.x+xy.y*resolution.x)* 4+3]];
}
function OS_SetPixel(xy,color,add){
  //console.log("set");
  if(!add){ // with no regard to alpha
      OS_canvas.data[(xy.x+xy.y*resolution.x)* 4] = color[0];
  OS_canvas.data[(xy.x+xy.y*resolution.x)* 4+1] = color[1];
  OS_canvas.data[(xy.x+xy.y*resolution.x)* 4+2] = color[2];
  OS_canvas.data[(xy.x+xy.y*resolution.x)* 4+3] = color[3];
  }else{

  }

}
function OS_FillLine(xy){
//ctx.get... = OS_GetPixel ale je to array
//console.log(filledcolor);
//console.log(OS_GetPixel(xy));
  while( ArrayEqual(OS_GetPixel(xy),filledcolor) && xy.x < resolution.x){
   OS_SetPixel(xy,OS_fillColor,false);
  
    if(xy.y+1 < resolution.y){
       var tempCords = {x:xy.x,y:xy.y+1};
      if(ArrayEqual(OS_GetPixel(tempCords),filledcolor)){ 
         
        if(!downSeeded){
         
          while (ArrayEqual(OS_GetPixel(tempCords),filledcolor)){
  
            if(tempCords.x <= 0){
              tempCords.x--;
              break;
                 
            }tempCords.x--;
            
          
          }
          tempCords.x++;
          lastfilledpos.push({x:tempCords.x,y:tempCords.y});
          downSeeded = true;
        }
    }else{
      downSeeded = false;
    }
    }
    if(xy.y > 0){ 
        tempCords = {x:xy.x,y:xy.y-1};
        if(ArrayEqual(OS_GetPixel(tempCords),filledcolor)){ 
        if(!upSeeded){
       
          while (ArrayEqual(OS_GetPixel(tempCords),filledcolor)){
  
            if(tempCords.x <= 0){
              tempCords.x--;
              break;
                 
            }tempCords.x--;
            
          
          }
          tempCords.x++;
          lastfilledpos.push({x:tempCords.x,y:tempCords.y});
      upSeeded = true;
        }
    }else{
      upSeeded = false;
    }
    }
    xy.x++;
  }
}
function FillAround(){
  let cordX = lastfilledpos[lastfilledpos.length-1].x;
  let cordY = lastfilledpos[lastfilledpos.length-1].y;

  lastfilledpos.pop();  
  if(cordX>=resolution.x||cordY>=resolution.y||cordX<0||cordY<0){
    
     return;
     
   }
  
  FillPixel(cordX+1,cordY);
  FillPixel(cordX-1,cordY);
  FillPixel(cordX,cordY+1);
  FillPixel(cordX,cordY-1);
  
}
  function FillPixel(cX,cY){
   
   
       var pixel = ctx.getImageData(cX,cY,1,1).data;

    //if(pixel[0]==filledcolor[0]&&pixel[1]==filledcolor[1]&&pixel[2]==filledcolor[2]&&pixel[3]==filledcolor[3]){
     if(String(pixel)==String(filledcolor)){
      ctx.fillRect(cX,cY,1,1);
      tobefilledpos.push({x:cX,y:cY});
    }
    }
    
 
  




////////////////
//COLORPALETTE//
////////////////
    //FUNC//
    function UpdateColorCode(color){
        hexElem.value = RGBAtoHEX(color);
        rgbaElem.value = color;
        hslaElem.value = RGBAtoHSLA(color);
    }
    function UpdateTransparent(color){
      let r = color.split(",")[0].split("(")[1];
      let g = color.split(",")[1];
      let b = color.split(",")[2];
      trtx.clearRect(0,0,1,360);
      for(let i = 0; i < 360;i++){
        trtx.fillStyle = "rgba("+r+","+g+","+b+","+(i/360)+")";
        //trtx.fillStyle = "rgba(255,0,0,"+(i/360)+")";
       //trtx.fillStyle = "rgba(255,0,0,"+(i/360)+")";
        trtx.fillRect(0,360-i,1,1);
      }
     
    }
    function UpdateColorPicker(color){ //updates color and transparency ui
      cpbtx.fillStyle = "rgb(255,255,255)";
      
      let r = color.split(",")[0].split("(")[1];
      let g = color.split(",")[1];
      let b = color.split(",")[2];
      cpbtx.fillRect(0,0,256,256);
      //colored gradient
      for(let i = 0; i < 256;i++){
        cpbtx.fillStyle = "rgba("+r+","+g+","+b+","+(i/254)+")";
       
        //cpbtx.fillStyle = "rgba(255,0,0,"+(i/255)+")";
       cpbtx.fillRect(i,0,1,256);
      }
      for(let i = 0; i < 256;i++){
       cpbtx.fillStyle = "rgba(0,0,0,"+(i/254)+")";
       cpbtx.fillRect(0,i,256,1);
      }
      trtx.clearRect(0,0,1,360);
      for(let i = 0; i < 360;i++){
        trtx.fillStyle = "rgba("+r+","+g+","+b+","+(i/360)+")";
        //trtx.fillStyle = "rgba(255,0,0,"+(i/360)+")";
       //trtx.fillStyle = "rgba(255,0,0,"+(i/360)+")";
        trtx.fillRect(0,360-i,1,1);
      }
      var idk = cpbtx.getImageData(ColorCords.x,ColorCords.y,1,1).data;
      let Transparency = Color.split(",")[3].split(")")[0];
    Color = "rgba("+idk[0]+","+idk[1]+","+idk[2]+","+Transparency+")";
    ChangeColor(Color);
    UpdateTransparent(Color); //e.log(Color);
    }
    function ChangeColor(value){//changes modified color at relevant places
 
  CurrentColor.getContext("2d").fillStyle = value;
  CurrentColor.getContext("2d").clearRect(0,0,1,1);
    CurrentColor.getContext("2d").fillRect(0,0,1,1);
       Color = value;
}

    //VARS//
    var ColorCords = {x:255,y:0}
var Color = "rgba(0,0,0,1)"; //color being modified
var ColorSelected = false; //false=>PRIMARY,true=>SECONDARY

    //ELEMENTS//
    let hexElem = document.getElementById("hex");
    let rgbaElem = document.getElementById("rgba");
    let hslaElem = document.getElementById("hsla");
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
CurrentColor.getContext("2d").fillStyle = "rgba(255,0,0,1)";
CurrentColor.getContext("2d").fillRect(0,0,1,1);
const styleCPE = getComputedStyle(document.querySelector('#colorpicker'));
const ColorButtonNew = document.getElementById("ColorButtonNew");
ColorButtonNew.addEventListener("click",function(){
  Color = ALLToRGBA(Color);
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
ChangeColor(HEXtoRGBA(hex.value));
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
    ChangeColor(HSLAtoRGBA(hsla.value));
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


    huepickerBackground.onmouseover = function(){
      hoveringON = "huepicker";
      }
      huepickerBackground.onmouseout = function(){
      hoveringON = "none";
      }
      
       let huePickerCursor = document.getElementById("huecursor");
      huePickerCursor.onmouseover = function(){
        hoveringON = "huepicker";
        }
        colorPickerCursor.onmouseout = function(){
          hoveringON = "none";
          }



    trpickerBackground.onmouseover = function(){
      hoveringON = "trpicker";
      }
      trpickerBackground.onmouseout = function(){
      hoveringON = "none";
      }
      
       let trPickerCursor = document.getElementById("trcursor");
      trPickerCursor.onmouseover = function(){
        hoveringON = "trpicker";
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
var intPos = {x:0,y:0}//int
var lastPos = {x:-1, y:-1}//last position on canvas
var downPos = {x:0, y:0}//last clicked position on canvas
var downIntPos = {x:0,y:0}//int
var upPos = {x:0, y:0}//last let go position on canvas
let perfectPos = {x:0,y:0}//last confirmed pixel on canvas
let previewPos = {x:0,y:0}//last previewed pixel in pp pencil mode
let lastIntPos = {x:0,y:0}
var AbsPos = {x:0,y:0}
var AbsLastPos = {x:0,y:0}

    //FUNC//
function UpdatePos(){
  AbsLastPos.x = AbsPos.x;
  AbsLastPos.y = AbsPos.y;
  lastPos.x = pos.x;
  lastPos.y = pos.y;
  lastIntPos.x = intPos.x;
  lastIntPos.y = intPos.y;
    pos.x = ((E.clientX-canvasOffset.x)*resScale);
  pos.y = ((E.clientY-canvasOffset.y)*resScale);
  intPos.x = ~~pos.x;
  intPos.y = ~~pos.y;
 AbsPos.x = E.clientX;
 AbsPos.y = E.clientY;

}
    //EVENTS//

    document.addEventListener("mousedown", function(e){
      downPos.x = pos.x;
      downPos.y = pos.y;
      downIntPos.x = ~~ pos.x;
      downIntPos.y = ~~ pos.y;
      switch(e.button){
        case(0): //console.log("left");
        hoveredON = hoveringON;
       
         left = true;
         previewCanvas.getContext("2d").fillStyle = lineColor;ctx.fillStyle = lineColor; ctx.strokeStyle = lineColor;  
         if(hoveredON == "canvas"||hoveredON=="background"){
         switch(PRIMARY){

          case("pencil"):
          switch(PRIMARY_MODE){
      case("PENCIL_MODE_PIXEL"):
      perfectPos.x = ~~pos.x;
      perfectPos.y = ~~pos.y;
      
         ctx.fillRect(perfectPos.x,perfectPos.y,lineWidth,lineWidth);
        //PixelPerfectLinePencil(lastPos.x,lastPos.y,pos.x,pos.y,lineWidth);
      
      break;
          }
       break;
case("line"):
switch(PRIMARY_MODE){
  default:
    
     ctx.fillRect(downIntPos.x,downIntPos.y,lineWidth,lineWidth);  
    

  break;
}
break;
case("fill"):
if(hoveredON == "canvas"){

  switch(PRIMARY_MODE){
    case("FILL_MODE_SLOW"):
var beftemp = ctx.getImageData(~~pos.x,~~pos.y,1,1).data;
ctx.fillRect(~~pos.x,~~pos.y,1,1);
var temp = ctx.getImageData(~~pos.x,~~pos.y,1,1).data;

if(String(beftemp)!=String(temp)){
  filledcolor = beftemp;

  var xy = {x:~~pos.x,y:~~pos.y};

  lastfilledpos.push(xy);
  if(!filling){
    filling = true;
    fillUpdate=setInterval(function(){
   FourWayFill();
  },TICK);
  }
}
break;
case("FILL_MODE_FAST"):


var beftemp = ctx.getImageData(~~pos.x,~~pos.y,1,1).data;

var Colorette = lineColor.split("rgba(")[1].split(")")[0].split(",");

if(Number(Colorette[3]) * 256 < 1){
  //console.log("trans");
  break;
}
if(beftemp[3] == 255 ){
//put colorette is not same color as beftemp here!
if(String(beftemp[0])==Colorette[0]&&String(beftemp[1])==Colorette[1]&&String(beftemp[2])==Colorette[2]){
break;
}
}

var xy = {x:~~pos.x,y:~~pos.y};
filledcolor = ctx.getImageData(xy.x,xy.y,1,1).data;

while (String(ctx.getImageData(xy.x,xy.y,1,1).data)==String(filledcolor)){

  if(xy.x <= 0){
    xy.x--;
    break;
       
  }xy.x--;
  

}
xy.x++;

lastfilledpos.push(xy);
if(!filling){
  filling = true;
  fillUpdate=setInterval(function(){

  ScanlineFill();
},TICK);
}
break;
case("FILL_MODE_INST"):
//should be fast
if(!filling){ 
   OS_fillColor = lineColor.split("rgba(")[1].split(")")[0].split(",");
  OS_fillColor = [Number(OS_fillColor[0]),Number(OS_fillColor[1]),Number(OS_fillColor[2]),Math.round(Number(OS_fillColor[3])*255)];
   //load canvas to var
  OS_canvas = ctx.getImageData(0,0,resolution.x,resolution.y);
filledcolor = OS_GetPixel({x:~~pos.x,y:~~pos.y})//ctx.getImageData(~~pos.x,~~pos.y,1,1).data; //needed
//var Colorette = lineColor.split("rgba(")[1].split(")")[0].split(",");
if(OS_fillColor[3] < 1){
  break;
}

//put colorette is not same color as beftemp here!
if(filledcolor[0]==OS_fillColor[0]&&filledcolor[1]==OS_fillColor[1]&&filledcolor[2]==OS_fillColor[2]&&filledcolor[3]==OS_fillColor[3]){
break;
}

var xy = {x:~~pos.x,y:~~pos.y};
while (ArrayEqual(OS_GetPixel(xy),filledcolor)){
  
  if(xy.x <= 0){
    xy.x--;
    break;
  }xy.x--;


}

xy.x++;
lastfilledpos.push(xy);
  filling = true;
  
  //fillUpdate=setInterval(function(){ //this slowed the function down immensely, + it could allow for some glitches so while wins, just lags a bit
  while(filling){OS_ScanlineFill();}
//},0);
}
break;
  }
}
break;

        }
      }
         E = e;
         Draw();
         break;
        case(1): /*console.log("middle");*/ middle = true; break;
        case(2): /*console.log("right");*/ right = true;
        hoveredON = hoveringON;
           E = e;
        previewCanvas.getContext("2d").fillStyle = lineColorS;ctx.fillStyle = lineColorS; ctx.strokeStyle = lineColorS;  
        if(hoveredON == "canvas"){
           Draw();
        }
       
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
    //previewCanvas.getContext("2d").clearRect(0,0,resolution.x,resolution.y);
      //lastPos.x = pos.x;
      //lastPos.y = pos.y;
        switch(e.button){
        case(0): /*console.log("left");*/ left = false;
     
        if(hoveredON == "canvas"||hoveredON=="background"){
          switch(PRIMARY){
        case("pencil"):
        switch(PRIMARY_MODE){
    case("PENCIL_MODE_PIXEL"):
     previewCanvas.getContext("2d").clearRect(intPos.x,intPos.y,lineWidth,lineWidth);
 
    
       ctx.fillStyle = lineColor;
       if(downIntPos.x !=intPos.x||downIntPos.y!=intPos.y){
          ctx.fillRect(intPos.x,intPos.y,lineWidth,lineWidth);
       }
  
    }
   
    break;
    
        
    
   
     case("line"):
    switch(PRIMARY_MODE){
default:
  Line(false,previewCanvas.getContext("2d"),downIntPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);
  Line(true,ctx,downIntPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);
  break;
    }
     break;
      }
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
  X = ~~X;
  Y = ~~Y;
  x = ~~x;
  y = ~~y;
    

    if((Math.abs(perfectPos.x- x) < 2) && (Math.abs(perfectPos.y- y) < 2)){
      
     if(x != lastIntPos.x || y != lastIntPos.y){
      //previewCanvas.getContext("2d").clearRect(0,0,resolution.x,resolution.y);      //this is... something
      previewCanvas.getContext("2d").clearRect(lastIntPos.x,lastIntPos.y,1,1); //less of a war crime than above
      lastIntPos.x = x;
      lastIntPos.y = y;
      previewCanvas.getContext("2d").fillRect(lastIntPos.x,lastIntPos.y,lineWidth,lineWidth);
      
      
      
      
     }
    

      return;
    }
    
    else if ((Math.abs(perfectPos.x- x) < 3) && (Math.abs(perfectPos.y- y) < 3)){
   
    ctx.fillRect(lastIntPos.x,lastIntPos.y,lineWidth,lineWidth);
    perfectPos.x = lastIntPos.x;
    perfectPos.y = lastIntPos.y;

    return;
    }




 X = perfectPos.x;
 Y = perfectPos.y;
 

perfectPos.x = x;
perfectPos.y = y;

   PerfectLinePencil(X,Y,x,y,lineWidth);
  
   }

   function PixelPerfectPencil(lineWidth){
  let dist = 0;
  let offset = 0;
  if(perfectPos.x==previewPos.x&&perfectPos.y==previewPos.y){
offset = 1;

  }
  dist = Math.abs(intPos.x-perfectPos.x);
  let temp = Math.abs(intPos.y-perfectPos.y);
  if(dist < temp){
    dist = temp;
  }
  
  switch(dist){
    case(0):
    previewCanvas.getContext("2d").clearRect(previewPos.x,previewPos.y,lineWidth,lineWidth);
    previewPos.x = perfectPos.x;
    previewPos.y = perfectPos.y;
    break;
    case(1):

    previewCanvas.getContext("2d").clearRect(previewPos.x,previewPos.y,lineWidth,lineWidth);
    previewCanvas.getContext("2d").fillRect(intPos.x,intPos.y,lineWidth,lineWidth);
    previewPos.x = intPos.x;
    previewPos.y = intPos.y;

    break;
    default:
      
    previewCanvas.getContext("2d").clearRect(previewPos.x,previewPos.y,lineWidth,lineWidth);
      //Line code//
      let beforePos = LinePPP(true,ctx,previewPos.x,previewPos.y,intPos.x,intPos.y,lineWidth,offset);


      //END//
     
      previewPos.x = intPos.x;
      previewPos.y = intPos.y;
      perfectPos.x = beforePos.x;//inpos =>1px before intpos
      perfectPos.y = beforePos.y;
      previewCanvas.getContext("2d").fillRect(intPos.x,intPos.y,lineWidth,lineWidth);
    break;
  }
  
   }
  function Line(fill,Vctx,X,Y,x,y,lineWidth){
    var color = "rgb(0,0,0)";
    if(selected){
      color = lineColorS;
   }else{
     color = lineColor;
   }
    var width = 1;
    if(selected){
       width = lineWidthS;
    }else{
      width = lineWidth;
    }
   

    Vctx.fillStyle=color;

   var diffX = X-x;
   var AdiffX = Math.abs(diffX);
   var diffY = Y-y;
   var AdiffY = Math.abs(diffY);
   if(AdiffX>=AdiffY){
      for(let i = 1;i < AdiffX+1;i++){

        if(fill){
 Vctx.fillRect(X-(i*(diffX/AdiffX)),Y-(Math.round((i/AdiffX)*diffY)),lineWidth,lineWidth);
        }
        else{
          Vctx.clearRect(X-(i*(diffX/AdiffX)),Y-(Math.round((i/AdiffX)*diffY)),lineWidth,lineWidth);
        }
        
      }
   }else{
    for(let i = 1;i < AdiffY+1;i++){

      if(fill){
Vctx.fillRect(X-(Math.round((i/AdiffY)*diffX)),Y-(i*(diffY/AdiffY)),lineWidth,lineWidth);
      }
      else{
        Vctx.clearRect(X-(Math.round((i/AdiffY)*diffX)),Y-(i*(diffY/AdiffY)),lineWidth,lineWidth);
      }
      
    }
   }
    /*
    if(fill){

   if(X > x){//DONE
    if(Y > y){ //DONE
      
      let diffX = (X-x+1);
      let diffY = (Y-y+1);
     if(diffX >=diffY){
       for(let i = 0; i < diffX;i++){
   Vctx.fillRect(~~(x+i),~~(y+(i/diffX)*diffY),width,width);
   }
     } else{
      for(let i = 0; i < diffY;i++){
        Vctx.fillRect(~~(x+(i/diffY)*diffX),~~(y+i),width,width);
        }  
     }
    
    }
    else if (Y<y){//D
      let diffX = X-x+1;
      let diffY = y-Y+2;
      if(diffX >=diffY){
        diffY-=1;
        y++;
        for(let i = 0; i < diffX;i++){
   Vctx.fillRect(~~(x+i),~~(y-((i+1)/diffX)*diffY),width,width);
   }
      }else{
        diffY--;
        for(let i = 0; i < diffY;i++){
          Vctx.fillRect(~~(x+(i/diffY)*diffX),~~(y-i),width,width);
          }
      }
    }
    else{ // DONE
      let diffX = X-x+1;
     for(let i = 0; i < diffX;i++){
   Vctx.fillRect(~~(x+i),~~y,width,width);
   }
    }
    
   }
   else if(X<x){ 
    if(Y > y){ //
      
      let diffX = (x-X);
      let diffY = (Y-y+1);
     
     if(diffX >=diffY){
 diffX++;
       for(let i = 0; i < diffX;i++){
   Vctx.fillRect(~~(x-i),~~(y+(i/diffX)*diffY),width,width);
   
   }
     } else{
        x++;
        diffX++
      for(let i = 0; i < diffY;i++){
        
        Vctx.fillRect(~~(x-((i+1)/diffY)*diffX),~~(y+i),width,width);
        }  
     }
    
    }
    else if (Y<y){//
      let diffX = x-X;
      let diffY = y-Y;
      if(diffX >=diffY){
        diffX++;
        for(let i = 0; i < diffX;i++){
   Vctx.fillRect(~~(x-i),~~(y-((i+1)/diffX)*diffY),width,width);
   }
      }else{
      diffY++;
        for(let i = 0; i < diffY;i++){
          Vctx.fillRect(~~(x-((i+1)/diffY)*diffX),~~(y-i),width,width);
          }
      }
     
    }
    else{ // 
     
      let diffX = x-X+1;
     for(let i = 0; i < diffX;i++){
   Vctx.fillRect(~~(x-i),~~y,width,width);
   }
    }
    
   }
   else{
    
    if(Y > y){
      
      let diffY = Y-y+1;
     
     for(let i = 0; i < diffY;i++){
   Vctx.fillRect(~~X,~~(y+i),width,width);
   }
    }
    else if (Y<y){
    
      let diffY = y-Y+1;
     for(let i = 0; i < diffY;i++){
   Vctx.fillRect(~~X,~~(y-i),width,width);
   }
    }
    else{
     
   Vctx.fillRect(~~X,~~Y,width,width);
   
    }
    
   }
  
    }else{
      x = ~~lastPos.x;
      y = ~~lastPos.y;
      
   if(X > x){//DONE
    if(Y > y){ //DONE
      
      let diffX = (X-x+1);
      let diffY = (Y-y+1);
     if(diffX >=diffY){
       for(let i = 0; i < diffX;i++){
   Vctx.clearRect(~~(x+i),~~(y+(i/diffX)*diffY),width,width);
   }
     } else{
      for(let i = 0; i < diffY;i++){
        Vctx.clearRect(~~(x+(i/diffY)*diffX),~~(y+i),width,width);
        }  
     }
    
    }
    else if (Y<y){//D
      let diffX = X-x+1;
      let diffY = y-Y+2;
      if(diffX >=diffY){
        diffY-=1;
        y++;
        for(let i = 0; i < diffX;i++){
   Vctx.clearRect(~~(x+i),~~(y-((i+1)/diffX)*diffY),width,width);
   }
      }else{
        diffY--;
        for(let i = 0; i < diffY;i++){
          Vctx.clearRect(~~(x+(i/diffY)*diffX),~~(y-i),width,width);
          }
      }
    }
    else{ // DONE
      let diffX = X-x+1;
     for(let i = 0; i < diffX;i++){
   Vctx.clearRect(~~(x+i),~~y,width,width);
   }
    }
    
   }
   else if(X<x){ 
    if(Y > y){ //
      
      let diffX = (x-X);
      let diffY = (Y-y+1);
     
     if(diffX >=diffY){
 diffX++;
       for(let i = 0; i < diffX;i++){
   Vctx.clearRect(~~(x-i),~~(y+(i/diffX)*diffY),width,width);
   
   }
     } else{
        x++;
        diffX++
      for(let i = 0; i < diffY;i++){
        
        Vctx.clearRect(~~(x-((i+1)/diffY)*diffX),~~(y+i),width,width);
        }  
     }
    
    }
    else if (Y<y){//
      let diffX = x-X;
      let diffY = y-Y;
      if(diffX >=diffY){
        diffX++;
        for(let i = 0; i < diffX;i++){
   Vctx.clearRect(~~(x-i),~~(y-((i+1)/diffX)*diffY),width,width);
   }
      }else{
      diffY++;
        for(let i = 0; i < diffY;i++){
          Vctx.clearRect(~~(x-((i+1)/diffY)*diffX),~~(y-i),width,width);
          }
      }
     
    }
    else{ // 
     
      let diffX = x-X+1;
     for(let i = 0; i < diffX;i++){
   Vctx.clearRect(~~(x-i),~~y,width,width);
   }
    }
    
   }
   else{
    
    if(Y > y){
      
      let diffY = Y-y+1;
     
     for(let i = 0; i < diffY;i++){
   Vctx.clearRect(~~X,~~(y+i),width,width);
   }
    }
    else if (Y<y){
    
      let diffY = y-Y+1;
     for(let i = 0; i < diffY;i++){
   Vctx.clearRect(~~X,~~(y-i),width,width);
   }
    }
    else{
     
   Vctx.clearRect(~~X,~~Y,width,width);
   
    }
    
   }
   
    }
    */
    if(TICK > 0){
   sleep(TICK);
   }
  }

  function LinePPP(fill,Vctx,X,Y,x,y,lineWidth,offset){
    let result = {x:0,y:0}
    var color = "rgb(0,0,0)";
    if(selected){
      color = lineColorS;
   }else{
     color = lineColor;
   }
    var width = 1;
    if(selected){
       width = lineWidthS;
    }else{
      width = lineWidth;
    }
   

    Vctx.fillStyle=color;

   var diffX = X-x;
   var AdiffX = Math.abs(diffX);
   var diffY = Y-y;
   var AdiffY = Math.abs(diffY);
   if(AdiffX>=AdiffY){
    result.x = X-((AdiffX-1)*(diffX/AdiffX));
    result.y = Y-(Math.round(((AdiffX-1)/AdiffX)*diffY));
      for(let i = offset;i < AdiffX;i++){

        if(fill){
 Vctx.fillRect(X-(i*(diffX/AdiffX)),Y-(Math.round((i/AdiffX)*diffY)),lineWidth,lineWidth);
        }
        else{
          Vctx.clearRect(X-(i*(diffX/AdiffX)),Y-(Math.round((i/AdiffX)*diffY)),lineWidth,lineWidth);
        }
        
      }
   }else{
    result.x = X-(Math.round(((AdiffY-1)/AdiffY)*diffX));
    result.y = Y-((AdiffY-1)*(diffY/AdiffY));
    for(let i = offset;i < AdiffY;i++){

      if(fill){
Vctx.fillRect(X-(Math.round((i/AdiffY)*diffX)),Y-(i*(diffY/AdiffY)),lineWidth,lineWidth);
      }
      else{
        Vctx.clearRect(X-(Math.round((i/AdiffY)*diffX)),Y-(i*(diffY/AdiffY)),lineWidth,lineWidth);
      }
      
    }
   }
    
    if(TICK > 0){
   sleep(TICK);
   }
   return result;
  }

//DRAW CODE
function Draw(){
      //COLORPICKER//
 
  switch(hoveredON){ 
 
    case("colorpicker"):
     
 if(left){
     let Xoff = styleCPE.left.split("px")[0];
  let Yoff = styleCPE.top.split("px")[0];  
      //var idk = cpbtx.getImageData(~~(AbsPos.x-Xoff),~~(AbsPos.y-Yoff),1,1).data;
      var x = ~~(AbsPos.x-Xoff-4);
      var y = ~~(AbsPos.y-Yoff-4);
      if(x > 127){x=127;}
      if(y > 127){y=127;}
      if(x < 0){x=0;}
      if(y < 0){y=0;}
      //UI
       colorPickerCursor.style.left = (x-8)+"px";
      colorPickerCursor.style.top = (y-8)+"px";

      var idk = cpbtx.getImageData(x*2,y*2,1,1).data;
      ColorCords.x = x*2;
      ColorCords.y = y*2;
      let Transparency = Color.split(",")[3].split(")")[0];
      
    Color = "rgba("+idk[0]+","+idk[1]+","+idk[2]+","+Transparency+")";
    
      CurrentColor.getContext("2d").fillStyle = Color;
      CurrentColor.getContext("2d").clearRect(0,0,1,1);
       CurrentColor.getContext("2d").fillRect(0,0,1,1);
       UpdateTransparent(Color);
       UpdateColorCode(Color);
    }
    break;
    case("huepicker"):
    if(left){
      //let Xoff = styleCPE.left.split("px")[0];
      let Yoff = styleCPE.top.split("px")[0];  
         //var idk = cpbtx.getImageData(~~(AbsPos.x-Xoff),~~(AbsPos.y-Yoff),1,1).data;
         var x = 8;
         var y = ~~(AbsPos.y-Yoff-6);
         //if(x > 127){x=127;}
         if(y > 127){y=127;}
         //if(x < 0){x=0;}
         if(y < 0){y=0;}
         //UI
         
          huePickerCursor.style.left = (x-8)+"px";
         huePickerCursor.style.top = (y-2)+"px";
         //2.8125 = 360/128
         var idk = htx.getImageData(0,~~(y*2.8125),1,1).data;
         let Transparent = Color.split(")")[0].split(",")[3];
         let tempColor = "rgba("+idk[0]+","+idk[1]+","+idk[2]+","+Transparent+")";
       
        UpdateColorPicker(tempColor);
        UpdateColorCode(Color);
        
       
          
       }
       break;
       case("trpicker"):
    if(left){
      //let Xoff = styleCPE.left.split("px")[0];
      let Yoff = styleCPE.top.split("px")[0];  
         //var idk = cpbtx.getImageData(~~(AbsPos.x-Xoff),~~(AbsPos.y-Yoff),1,1).data;
         var x = 8;
         var y = ~~(AbsPos.y-Yoff-6);
         //if(x > 127){x=127;}
         if(y > 127){y=127;}
         //if(x < 0){x=0;}
         if(y < 0){y=0;}
         //UI
         
          trPickerCursor.style.left = (x-8)+"px";
         trPickerCursor.style.top = (y-2)+"px";
         //2.8125 = 360/128
        let Transparency = Number((1-(y*2.8125)/360+"").substring(0,4));
      let rgb = Color.split("rgba(")[1].split(",");
    Color = "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+Transparency+")";
    
      CurrentColor.getContext("2d").fillStyle = Color;
      CurrentColor.getContext("2d").clearRect(0,0,1,1);
       CurrentColor.getContext("2d").fillRect(0,0,1,1);
       
       UpdateColorCode(Color);  
       }
       break;
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

//PixelPerfectLinePencil(lastPos.x,lastPos.y,pos.x,pos.y,lineWidth);
 PixelPerfectPencil(lineWidth);
break;

      }

     
      break;
      case("line"):
      switch(PRIMARY_MODE){
        default:
           Line(false,previewCanvas.getContext("2d"),downIntPos.x,downIntPos.y,lastIntPos.x,lastIntPos.y,lineWidth);
      Line(true,previewCanvas.getContext("2d"),downIntPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);
          break;
      }
      
      break;
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
    ctx.strokeStyle = "rgba(0,0,0,1)";
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
let Button_fill = document.getElementById("fill");
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


    case("fill"): 
    Menu_Tool.textContent = "";
    name = document.createElement("h2"); 
      br = document.createElement("br");
    name.innerHTML = "Fill";
    Menu_Tool.appendChild(name);
    name = document.createElement("p"); 
    name.innerHTML = "Style:";
    Menu_Tool.appendChild(name);
    name = document.createElement("p"); 
    Menu_Tool.appendChild(CreateIcon("./icons/pencil.png","FILL_MODE_SLOW"));
    Menu_Tool.appendChild(CreateIcon("./icons/line.png","FILL_MODE_FAST"));
    br = document.createElement("br");
    Menu_Tool.appendChild(br);
    Menu_Tool.appendChild(CreateIcon("./icons/pencil.png","FILL_MODE_INST"));
    Menu_Tool.appendChild(CreateIcon("./icons/line.png","FILL_MODE_PATTERN"));
    
   
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
    Button_fill.addEventListener("click",function(e) {
      if(!select){
        PRIMARY = "fill";
        PRIMARY_MODE = "FILL_MODE_INST";
        }else{
        SECONDARY = "fill";
        }
      UIbuttonCLICK(Button_fill);
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



  /* log i
setInterval (function(){ 

  console.log(lineColor);
 
},1000);
*/


//UI//
 MenuChange();
//CANVAS//
UpdateCanvas();
ChangeRes();
ScrollUpdate();

 //TOOL//
 ctx.fillStyle = lineColor;
 
 for(let i = 0; i < 360;i++){
  htx.fillStyle = "hsla("+i+",100%,50%,1)";
   htx.fillRect(0,i,1,1);
 }
 UpdateColorPicker(lineColor);
 UpdateColorCode(lineColor);
/*
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
   trtx.fillRect(0,360-i,1,1);
 }
*/
}
Init();
/*
lastfilledpos.push({x:100,y:100});
FillAround();
console.log(tobefilledpos);
console.log(lastfilledpos);
lastfilledpos=tobefilledpos;
console.log(tobefilledpos);
console.log(lastfilledpos);
*/
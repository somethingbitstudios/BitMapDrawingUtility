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

function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
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
  switch(string.toLowerCase()){
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

let HEXa = DecimalToHex(Math.round(a*255)); //FIX
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
 var sat;
   var value = (cmax+cmin);
   if(cmax==cmin){
      sat = 0;
   }
   else{
    
    sat = diff/(1-Math.abs(value-1))*100;
  
   }

  
  value*=50;

  

  


  hue = (""+hue).split(".")[0];
  sat = (""+sat).split(".")[0];
  value = (""+value).split(".")[0];
  
return "hsla("+hue+","+sat+","+value+","+a+")";

}
function HSLAtoRGBA(hsla){




//credit to Garry Tan
  let h = Number(hsla.split("hsla(")[1].split(",")[0])/360;
  let s = Number(hsla.split("hsla(")[1].split(",")[1])/100;
  let l = Number(hsla.split("hsla(")[1].split(",")[2])/100;
  let a = Number(hsla.split(")")[0].split("hsla(")[1].split(",")[3]);


    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return "rgba("+Math.round(r * 255)+","+ Math.round(g * 255)+","+Math.round(b * 255)+","+a+")";


//credit to that_guy for finding this convertor somewhere
/*
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
  

*/
}
function ALLToRGBA(value){
  if(value.includes("rgba(")){
    return value;
  }else if(value.includes("rgb(")){
    return "rgba"+value.split("b")[1].split(")")[0]+",1)";
  }else if (value.includes("#")){
    return HEXtoRGBA(value);
  }else if (value.includes("hsla(")){
    return HSLAtoRGBA(value);
  }
  else if(value.includes("hsl(")){
    return HSLAtoRGBA("hsla"+value.split("l")[1].split(")")[0]+",1)");
  }else if(value.includes(",")){
    return "rgba("+value+")";
  }
  else{
    return "rgba(0,0,0,1)";
  }
  
}
function ColorsToArray(){
  var arr = [];
  for(let i = 0;i< colors.length;i++){
    arr.push(colors[i].getAttribute("style").split(" ")[1].split(";")[0]);
  }
  return arr;
}




//palette//
let colorpalettes = [];//name is last item of arrays within
let colorpaletteindex=0;
let palettelist = document.getElementById("colorpalette_select");
palettelist.onchange = function(){

Palette_clear();
LoadPalette(palettelist.value);
}
function AddPaletteToList(cs,name){
  cs.push(name);
colorpalettes.push(cs);
UpdatePaletteList();
SelectPalette(colorpalettes.length-1);
LoadPalette(colorpalettes.length-1);

//update list
}
function UpdatePaletteList(){
  palettelist.innerHTML="";
  for(let i = 0;i< colorpalettes.length;i++){
      var temp = document.createElement("option");
      temp.innerHTML= colorpalettes[i][colorpalettes[i].length-1];
      temp.value = i;
      palettelist.appendChild(temp);
  }

}
function SelectPalette(index){
  for(let i = 0;i<palettelist.children.length;i++){
    palettelist.children[i].setAttribute("selected",false);
  }
  palettelist.children[index].setAttribute("selected",true);
}
function LoadPalette(index){
  movedColor=null;
  colorpaletteindex=index;
  var palette = colorpalettes[index].map((x) => x);
  palette.pop();//removes name
 
  for(let i = 0;i < palette.length;i++){
    Color_add(palette[i]);
  }
  Color_last();
  for(let i = 0; i < colors.length;i++){
    colors[i].classList.remove("secondaryColor");
    colors[i].classList.remove("primaryColor");
    colors[i].classList.remove("bothColor");
    colors[i].classList.remove("selected");
  }
  if(colors.length==0){return;}
  colors[0].classList.add("primaryColor");
  oncolorleft=0;
    let color = colors[0].getAttribute("style");
  color = color.split(" ")[1];
  color = color.split(";")[0];
  Color_set(false,color);
  colors[1].classList.add("secondaryColor");
  oncolorright=1;
  color = colors[1].getAttribute("style");
  color = color.split(" ")[1];
  color = color.split(";")[0];
  Color_set(true,color);
}
/////////////////////
//FILE MANIPULATION//
/////////////////////
function ImportPalette(text,name){
var lines = text.split("\n");

var cArray = [];
for(let i = 0;i<lines.length;i++){
  if(lines[i].includes("//")){
    if(lines[i].split("//")[0].trim().length > 0){
       cArray.push(lines[i].split("//")[0]);
    }
   
 
  }
  else if(lines[i].trim().length > 0){

  
  cArray.push(lines[i]);
 
  }
  

  

};

InitializeColorPalette(cArray,name);
}
function SubtractPalette(text){
  var lines = text.split("\n");

  var cArray = [];
  for(let i = 0;i<lines.length;i++){
    if(lines[i].includes("//")){
      if(lines[i].split("//")[0].trim().length > 0){
         cArray.push(lines[i].split("//")[0]);
      }
     
   
    }
    else if(lines[i].trim().length > 0){
  
    //convert cArray to rgba to compare
    cArray.push(ALLToRGBA(lines[i]));
   
    }
    
  
    
  
  }
 

  

  var bArray = [];
  for(let i = 0; i < colors.length;i++){
    bArray.push(colors[i].getAttribute("style").split(" ")[1].split(";")[0]);
  }


  bArray = bArray.filter(function(val,idx,array){
    if(cArray.includes(val)){
      //return val;
      cArray = arrayRemove(cArray,val);
    }else{
      return val;
    }
  });

 
  bArray.push( colorpalettes[colorpaletteindex][ colorpalettes[colorpaletteindex].length-1]);
   
  colorpalettes[colorpaletteindex] = bArray;

  Palette_clear();
  LoadPalette(colorpaletteindex)
  }
function ExportPalette(name){
  var cArray = [];
  for(let i = 0; i < colors.length;i++){
    cArray.push(colors[i].getAttribute("style").split(" ")[1].split(";")[0]);
  }


  var element = document.createElement('a');
  element.setAttribute('href', 'data:;charset=utf-8,' + encodeURIComponent(cArray.join("\n")));
  element.setAttribute('download', name+".cpt");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function ImportPaletteOR(text,name){
  var lines = text.split("\n");
  
  var cArray = [];
  for(let i = 0;i<lines.length;i++){
    if(lines[i].includes("//")){
      if(lines[i].split("//")[0].trim().length > 0){
         cArray.push(lines[i].split("//")[0]);
      }
     
   
    }
    else if(lines[i].trim().length > 0){
  
    
    cArray.push(lines[i]);
   
    }
    
  
    
  
  }
  
  InitializeColorPaletteOR(cArray,name);
  }
////////
//MAIN//
////////
    //VARS//
var TICK = 0;
let E;
var Qindex = -1;
var StateQueue = []; //max size- 32?
var SQchanged = true;
function SQ_SAVE(){

  var canv = ctx.getImageData(0,0,resolution.x,resolution.y).data;
if(Qindex != -1){
  StateQueue.splice(Qindex+1,StateQueue.length-Qindex);
}

  StateQueue.push( canv);
  if(StateQueue.length > 64){
    StateQueue.splice(0,1);
  }
  Qindex = -1;  
 // console.log(StateQueue.length);
}
function SQ_UNDO(){
  if(StateQueue.length<2){return;}
if(Qindex==-1){
  Qindex=StateQueue.length-2;
}else if (Qindex>0){
Qindex--;
}


ctx.putImageData(new ImageData(StateQueue[Qindex],resolution.x),0,0);
}
function SQ_REDO(){
  if(Qindex == -1){return;}
  if(Qindex == StateQueue.length-1){Qindex=-1;return;}
  Qindex++;

  ctx.putImageData(new ImageData(StateQueue[Qindex],resolution.x),0,0);
}

    

function ColorArray_Equal(arr1,arr2,tolerance){
  var same = 0;
  arr1[0] = Number(arr1[0]);
  arr1[1] = Number(arr1[1]);
  arr1[2] = Number(arr1[2]);

  arr2[0] = Number(arr2[0]);
  arr2[1] = Number(arr2[1]);
  arr2[2] = Number(arr2[2]);
  if(arr1[0]>=arr2[0]-tolerance && arr1[0]<=arr2[0]+tolerance){same++;}
  if(arr1[1]>=arr2[1]-tolerance && arr1[1]<=arr2[1]+tolerance){same++;}
  if(arr1[2]>=arr2[2]-tolerance && arr1[2]<=arr2[2]+tolerance){same++;}
  if(same == 3){
    return true;
  }return false;
}

//////////
//CANVAS//
//////////

    //VARS//
var canvasSize = {x: 960,y: 600}
var resolution = {x:240,y:150}
var resScale = 0.25; //for mouse


    //ELEMENTS//
var uiCanvas = document.getElementById("uicanvas"); var uictx = uiCanvas.getContext("2d");

var previewCanvas = document.getElementById("previewcanvas");var pctx = previewCanvas.getContext("2d");

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
var lineColor = "rgba(0,0,0,1)";

var SECONDARY = "eraser";
var SECONDARY_MODE = "ERASER_MODE_BASIC";
var lineWidthS = 0.1;
var lineCapS = 'butt';
var lineColorS = "rgba(255,255,255,1)";

var EditedColor = "";
var selectFill ="rgba(100,150,255,0.4)";
var SelectActive = false; //if true, area is  selected
var SelectDragging = false;
var SelectArea;
var SelectPos = {x:-1,y:-1,w:0,h:0};
var LastDir = -1;
    //fill//

var fillTool = false;




    //poly//
var polysides = 4;


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

function PolyPreview(){
  switch(polysides){
    case(2):
   
    Line(false,pctx,downIntPos.x,downIntPos.y,lastIntPos.x,lastIntPos.y,lineWidth);
    Line(true,pctx,downIntPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);

    break;
    case(4):
   //rect
    
    Line(false,pctx,downIntPos.x,downIntPos.y,downIntPos.x,lastIntPos.y,lineWidth);

    Line(false,pctx,downIntPos.x,downIntPos.y,lastIntPos.x,downIntPos.y,lineWidth);

    Line(false,pctx,lastIntPos.x,downIntPos.y,lastIntPos.x,lastIntPos.y,lineWidth);

    Line(false,pctx,downIntPos.x,lastIntPos.y,lastIntPos.x,lastIntPos.y,lineWidth);


    Line(true,pctx,downIntPos.x,downIntPos.y,downIntPos.x,intPos.y,lineWidth);

    Line(true,pctx,downIntPos.x,downIntPos.y,intPos.x,downIntPos.y,lineWidth);

    Line(true,pctx,intPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);
    if(intPos.x != downIntPos.x || intPos.y != downIntPos.y ){
          pctx.clearRect(intPos.x,intPos.y,1,1);
    }

    Line(true,pctx,downIntPos.x,intPos.y,intPos.x,intPos.y,lineWidth);

    break;
  }
  
  }


  function PolyDraw(){
    switch(polysides){
      case(2):
     
      Line(false,pctx,downIntPos.x,downIntPos.y,lastIntPos.x,lastIntPos.y,lineWidth);
      Line(true,ctx,downIntPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);
  
      break;
      case(4):
     //rect
      
      Line(false,pctx,downIntPos.x,downIntPos.y,downIntPos.x,lastIntPos.y,lineWidth);
  
      Line(false,pctx,downIntPos.x,downIntPos.y,lastIntPos.x,downIntPos.y,lineWidth);
  
      Line(false,pctx,lastIntPos.x,downIntPos.y,lastIntPos.x,lastIntPos.y,lineWidth);

      Line(false,pctx,downIntPos.x,lastIntPos.y,lastIntPos.x,lastIntPos.y,lineWidth);
      pctx.clearRect(downIntPos.x,downIntPos.y,1,1);
      ctx.fillRect(downIntPos.x,downIntPos.y,1,1);
      Line(true,ctx,downIntPos.x,downIntPos.y,downIntPos.x,intPos.y,lineWidth);
  
      Line(true,ctx,downIntPos.x,downIntPos.y,intPos.x,downIntPos.y,lineWidth);
  
      Line(true,ctx,intPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);
      ctx.clearRect(intPos.x,intPos.y,1,1);
      Line(true,ctx,downIntPos.x,intPos.y,intPos.x,intPos.y,lineWidth);
  
      break;
    }
    
    }
  
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
  if(lastfilledpos.length < 1){
    //clearInterval(fillUpdate);
   //ctx.putImageData(OS_canvas,0,0);
    //console.log("complete");
    filling = false;
    clearInterval(fillUpdate);
  
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
    function UpdateColor(color){
      color = ALLToRGBA(color);
      //console.log(color);
     
      if(!selected){
        lineColor = color;
        PRIMARY_COLOR.style.backgroundColor = Color;
      
      }else{
        lineColorS = color;
        SECONDARY_COLOR.style.backgroundColor = color;
      }
    
     ColorPickerUpdate(color);
      //ChangeColor(color);
      //UpdateColorCode(color);

      //var huetemp = RGBAtoHSLA(color).split("hsla(")[1].split(")")[0].split(",")[0];
      //var hue = HSLAtoRGBA("hsla("+huetemp+",100,100,1)");
//console.log(huetemp);
      //UpdateColorPicker(hue);
      //UpdateWholeColorPicker(color);

    }
    
    function ColorPickerUpdate(color){
      UpdateColorCode(color);
      UpdateWholeColorPicker(color);
      var huetemp = RGBAtoHSLA(color).split("hsla(")[1].split(")")[0].split(",")[0];
      var hue = HSLAtoRGBA("hsla("+huetemp+",100,50,1)");
      UpdateColorPicker(hue);
         ChangeColor(color);
    
      UpdateTransparent(color);
      var cords = FindColorOnPicker(color);

      //colorPickerCursor.style.top = (cords.y/2)-8 +"px";
      //colorPickerCursor.style.left = (cords.x/2)-8 +"px";

   
      //console.log(cords);


      var x = cords.x/2 + 2;
      var y = cords.y/2 + 2;
      if(x > 127){x=127;}
      if(y > 127){y=127;}
      if(x < 3){x=0;}
      if(y < 3){y=0;}
      //UI
       colorPickerCursor.style.left = (x-8)+"px";
      colorPickerCursor.style.top = (y-8)+"px";

      ColorCords.x = x*2;
      ColorCords.y = y*2;
    

       //UpdateTransparent(Color);
       //UpdateColorCode(Color);
    }
    function InitializeColorPicker(secondary,color){
      EditedColor=color;
      if(secondary){
        document.getElementById("labelColor").innerHTML = "SECONDARY";
        ColorPickerUpdate(color);
      }else{
        document.getElementById("labelColor").innerHTML = "PRIMARY";
        ColorPickerUpdate(color);
      }
    }
    function FindColorOnPicker(color){
      var ColorArray = color.split("rgba(")[1].split(")")[0].split(",");
      //console.log(ColorArray);
      var pickerImage = colorpickerBackground.getContext("2d").getImageData(0,0,256,256);
      for(let i = 0; i < 255; i++){
        for(let j = 0;j<255;j++){
          //each pixel
         
            //return OS_canvas[]
            var pixel = [pickerImage.data[(i+j*256)* 4],pickerImage.data[(i+j*256)* 4+1],pickerImage.data[(i+j*256)* 4+2]];
            if(ColorArray_Equal(ColorArray,pixel,3)){
              return {x:i,y:j};
            }
        }
      }

      return {x:0,y:0};
    }
    function UpdateWholeColorPicker(color){
      var hsla = RGBAtoHSLA(color);
    
  let h = Number(hsla.split("hsla(")[1].split(",")[0])/2.8;
  let s = Number(hsla.split("hsla(")[1].split(",")[1])*255/100;
  let v = Number(hsla.split("hsla(")[1].split(",")[2])*255/100;
  let a = Number(hsla.split(")")[0].split("hsla(")[1].split(",")[3])*127;
//really bad, does not matter tho
var left = s/(1+(v/255))-8;

var top = 119 -((v*(1+(s/255)))/2);
if(top < -8){
  top = -8;
}else if(top > 119){
  top = 119;
}

                                              //<0,1>
  // s 100 => v * 2 , s 0 => v * 1   s ? => v *(?/255+1)
  
   //colorPickerCursor.style.top = top +"px";
  huePickerCursor.style.top = h-2+"px";
  trPickerCursor.style.top = 125-a+"px";
//console.log(125-a);
    }
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
       //UpdateWholeColorPicker(Color);
}

    //VARS//
    var ColorCords = {x:255,y:0}
var Color = "rgba(0,0,0,1)"; //color being modified
var ColorSelected = false; //false=>PRIMARY,true=>SECONDARY

    //ELEMENTS//
const NewPalette = document.getElementById("newPalette");
NewPalette.onmousedown = function(){
  var pal = [];
  InitializeColorPaletteOR(pal,"Custom");
}
const DeletePalette = document.getElementById("delPalette");
DeletePalette.onmousedown = function(){
  if(colorpalettes.length > 0){
      
      colorpalettes.splice(colorpaletteindex,1);
    
colorpaletteindex--;

if(colorpaletteindex < 0){
 colorpaletteindex=0;
}
if(colorpalettes.length == 0){
  var pal = [];
  InitializeColorPaletteOR(pal,"Custom");
}

 
 UpdatePaletteList();
 SelectPalette(colorpaletteindex);
 Palette_clear();
 LoadPalette(colorpaletteindex);
 Palette_clear();
LoadPalette(palettelist.value);
  }
 
}


const ImportFilePalette = document.getElementById("importFilePal");
const ImportPaletteButton = document.getElementById("importPalette");

ImportPaletteButton.addEventListener("click",function(){
ImportFilePalette.click();
});
ImportFilePalette.addEventListener("change",function(){


  const reader = new FileReader();
  reader.addEventListener("load", () => {
   
    ImportPalette(reader.result,this.files[0].name.split(".")[0]);ImportFilePalette.value = null;
    
  }, false);

 
  reader.readAsText(this.files[0]);



});

const ImportFilePaletteOR = document.getElementById("importFilePalOR");
const ImportPaletteButtonOR= document.getElementById("importPaletteOR");

ImportPaletteButtonOR.addEventListener("click",function(){
ImportFilePaletteOR.click();
});
ImportFilePaletteOR.addEventListener("change",function(){


  const reader = new FileReader();
  reader.addEventListener("load", () => {
    
    ImportPaletteOR(reader.result,this.files[0].name.split(".")[0]);
    
  }, false);

 
  reader.readAsText(this.files[0]);



});

const SubtractFilePalette = document.getElementById("subtractFilePal");
const SubtractPaletteButton = document.getElementById("subtractPalette");

SubtractPaletteButton.addEventListener("click",function(){
  SubtractFilePalette.click();
});
SubtractFilePalette.addEventListener("change",function(){


  const reader = new FileReader();
  reader.addEventListener("load", () => {
   
    SubtractPalette(reader.result);SubtractFilePalette.value = null;
    
  }, false);

 
  reader.readAsText(this.files[0]);



});

const ExportPaletteButton= document.getElementById("exportPalette");

ExportPaletteButton.addEventListener("click",function(){
 ExportPalette(colorpalettes[colorpaletteindex][colorpalettes[colorpaletteindex].length-1]);
});
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
const PRIMARY_COLOR = document.getElementById("PRIMARYCOLORcanvas");
PRIMARY_COLOR.width = 1;
PRIMARY_COLOR.height = 1;
PRIMARY_COLOR.addEventListener("click",function(e){
  colorpicker.style.visibility = "visible";
  ColorSelected = false;
  InitializeColorPicker(false,lineColor);
});
const SECONDARY_COLOR = document.getElementById("SECONDARYCOLORcanvas");
SECONDARY_COLOR.width = 1;
SECONDARY_COLOR.height = 1;
PRIMARY_COLOR.getContext("2d").fillStyle = "rgb(0,0,0)";
PRIMARY_COLOR.getContext("2d").clearRect(0,0,1,1);
PRIMARY_COLOR.getContext("2d").fillRect(0,0,1,1);
SECONDARY_COLOR.getContext("2d").fillStyle = "rgb(255,255,255)";
SECONDARY_COLOR.getContext("2d").clearRect(0,0,1,1);
SECONDARY_COLOR.getContext("2d").fillRect(0,0,1,1);
SECONDARY_COLOR.addEventListener("click",function(e){
  colorpicker.style.visibility = "visible";
  ColorSelected = true;
  InitializeColorPicker(true,lineColorS);
});
const CurrentColor = document.getElementById("CurrentColor");
CurrentColor.width = 1;
CurrentColor.height = 1;
CurrentColor.getContext("2d").fillStyle = "rgba(255,0,0,1)";
CurrentColor.getContext("2d").fillRect(0,0,1,1);
const styleCPE = getComputedStyle(document.querySelector('#colorpicker'));
const colorpicker = document.getElementById("colorpicker");
const ColorButtonNew = document.getElementById("ColorButtonNew");
ColorButtonNew.addEventListener("click",function(){
  Color = ALLToRGBA(Color);
if(!ColorSelected){
  lineColor = Color;
  //PRIMARY_COLOR.style.backgroundColor = Color;
  Color_set(false,Color);
  Color_add(Color);
  EditedColor=Color;
  for(let i = 0; i < colors.length;i++){
    colors[i].classList.remove("primaryColor");
    colors[i].classList.remove("selected");
    colors[i].classList.remove("bothColor");
  }
  colors[colors.length-1].classList.add("primaryColor");
  oncolorleft=colors.length-1;
}else{
  lineColorS = Color;
  //SECONDARY_COLOR.style.backgroundColor = Color;
  Color_set(true,Color);
  Color_add(Color);
  
  EditedColor=Color;
  for(let i = 0; i < colors.length;i++){
    colors[i].classList.remove("secondaryColor");
    colors[i].classList.remove("selected");
    colors[i].classList.remove("bothColor");
  }
  colors[colors.length-1].classList.add("secondaryColor");
  oncolorright=colors.length-1;
}
});
const ColorButtonEdit = document.getElementById("ColorButtonEdit");
ColorButtonEdit.addEventListener("click",function(){

  Color = ALLToRGBA(Color);
if(!ColorSelected){
  lineColor = Color;
  //PRIMARY_COLOR.style.backgroundColor = Color;
  Color_edit(EditedColor,Color,false);
  EditedColor=Color;
  Color_set(false,Color);
}else{
  lineColorS = Color;
  Color_edit(EditedColor,Color,true);
  EditedColor=Color;
  //SECONDARY_COLOR.style.backgroundColor = Color;
  Color_set(true,Color);
}
});
function Color_set(bool,color){
  //console.log(bool + " "+ color);
if(!bool){
PRIMARY_COLOR.getContext("2d").fillStyle = color;
PRIMARY_COLOR.getContext("2d").clearRect(0,0,1,1);
PRIMARY_COLOR.getContext("2d").fillRect(0,0,1,1);
}else{
  SECONDARY_COLOR.getContext("2d").fillStyle = color;
  SECONDARY_COLOR.getContext("2d").clearRect(0,0,1,1);
  SECONDARY_COLOR.getContext("2d").fillRect(0,0,1,1);
}
}
function Color_edit(oldColor,newColor,bool){
  //find old color
//replace old w . new
  if(!bool)//left
  {
if(oncolorleft==-1){
for(let i = 0; i < colors.length;i++){
  let color = colors[i].getAttribute("style");
color = color.split(" ")[1];

color = color.split(";")[0];

if(color == oldColor){
  colors[i].setAttribute("style","background-color: "+newColor+";");
  
  break;
}
}
}else{
  colors[oncolorleft].setAttribute("style","background-color: "+newColor+";");
}

  }else{
    if(oncolorright==-1){
      for(let i = 0; i < colors.length;i++){
        let color = colors[i].getAttribute("style");
      color = color.split(" ")[1];
      
      color = color.split(";")[0];
      
      if(color == oldColor){
        colors[i].setAttribute("style","background-color: "+newColor+";");
        
        break;
      }
      }
      }else{
        colors[oncolorright].setAttribute("style","background-color: "+newColor+";");
      }
      
  }

}
function Palette_clear(){
  document.getElementById("colorpalette").innerHTML="";
}
function Color_add(Color){
 
  Color = ALLToRGBA(Color);

  //add color to colors
  var colr = document.createElement("button");
  colr.classList.add("color");
  colr.setAttribute("style","background-color: "+Color+";");
  document.getElementById("colorpalette").appendChild(colr);

  Update_Colors();
  
}
function Color_last(){
 
  let Color = "rgba(0,0,0,0)";
//remove color
var tmp = document.getElementById("colr");
if(tmp!=null){
  document.getElementById("colorpalette").removeChild(tmp);
}
tmp = document.getElementById("colrI");
if(tmp!=null){
  document.getElementById("colorpalette").removeChild(tmp);
}

  //add color to colors
  var colr = document.createElement("button");
  colr.classList.add("colorE");
  colr.id="colr";
 var img = document.createElement("img");
 img.src = "./icons/plusW.png";
 img.width=16;
 img.height=16;
 img.style.position="absolute"
 img.style.left="-2px";
 img.style.top="-2px";



 


 colr.appendChild(img);
 
  colr.onmouseover = function(){
  
    oncolor=-1;
  }
  colr.setAttribute("style","background-color: "+Color+";");
  colr.style.position="relative";
  colr.style.top="-6px";
  colr.style.marginBottom="-10px";
  colr.onmousedown = function(e){
    colrDown =true;
 
  }
  document.getElementById("colorpalette").appendChild(colr);
  colr = document.createElement("button");
  colr.classList.add("colorE");
  colr.style.visibility="hidden";
colr.id="colrI";


  document.getElementById("colorpalette").appendChild(colr);
  Update_Colors();
  
}





document.getElementById("removeColorP").addEventListener("click",function(){
  let fix = true;
 if(colors.length==0){return;}
 if(oncolorleft > colors.length-1){

  oncolorleft = colors.length-1;
  for(let i = 0; i < colors.length;i++){
   
    colors[i].classList.remove("primaryColor");
    colors[i].classList.remove("bothColor");
    colors[i].classList.remove("selected");
  }
  colors[oncolorleft].classList.add("primaryColor");
  if(colors[oncolorleft].classList.contains("secondaryColor")){
    colors[oncolorleft].classList.add("bothColor");
  }
  return;}
  if(oncolorleft==oncolorright){
 
    oncolorright+=999;
    fix = false;
  }

  var child = colors[oncolorleft];

  if(oncolorleft<colors.length-1){
      document.getElementById("colorpalette").removeChild(child);
      if(colors.length==0){return;}
      lineColor = colors[oncolorleft].getAttribute("style").split(" ")[1].split(";")[0];
      for(let i = 0; i < colors.length;i++){
   
        colors[i].classList.remove("primaryColor");
        colors[i].classList.remove("bothColor");
        colors[i].classList.remove("selected");
      }
      
      colors[oncolorleft].classList.add("primaryColor");
      if(colors[oncolorleft].classList.contains("secondaryColor")){
        colors[oncolorleft].classList.add("bothColor");
      }
      Color_set(false,lineColor);
      InitializeColorPicker(false,lineColor);
      Update_Colors();
      if(oncolorleft <= oncolorright){
        oncolorright--;
      }
    return;
  }
  if(oncolorleft>0){
     oncolorleft--;
  }
 
  
  lineColor = colors[oncolorleft].getAttribute("style").split(" ")[1].split(";")[0];
  for(let i = 0; i < colors.length;i++){
   
    colors[i].classList.remove("primaryColor");
    colors[i].classList.remove("bothColor");
    colors[i].classList.remove("selected");
  }
  colors[oncolorleft].classList.add("primaryColor");
  if(colors[oncolorleft].classList.contains("secondaryColor")){
    colors[oncolorleft].classList.add("bothColor");
  }
 Color_set(false,lineColor);
  InitializeColorPicker(false,lineColor);
  document.getElementById("colorpalette").removeChild(child);
  if(oncolorright > colors.length-1 && fix){oncolorright = colors.length-1; return;}
  if(oncolorleft > colors.length-1){oncolorleft = colors.length-1; return;}
  Update_Colors();
});
document.getElementById("removeColorS").addEventListener("click",function(){
  let fix = true;
  if(colors.length==0){return;} if(oncolorright > colors.length-1){

    oncolorright = colors.length-1;
    for(let i = 0; i < colors.length;i++){
      colors[i].classList.remove("secondaryColor");
      colors[i].classList.remove("bothColor");
      colors[i].classList.remove("selected");
    }
    colors[oncolorright].classList.add("secondaryColor");
    if(colors[oncolorright].classList.contains("primaryColor")){
      colors[oncolorright].classList.add("bothColor");
    }
    return;}
    if(oncolorleft==oncolorright){
    
      oncolorleft+=999;
      fix = false;
    }
  var child = colors[oncolorright];
  

  if(oncolorright<colors.length-1){
      document.getElementById("colorpalette").removeChild(child);
      if(colors.length==0){return;}
      lineColorS = colors[oncolorright].getAttribute("style").split(" ")[1].split(";")[0];
      colors[oncolorright].classList.add("secondaryColor");
      if(colors[oncolorright].classList.contains("primaryColor")){
        colors[oncolorright].classList.add("bothColor");
      }
      Color_set(true,lineColorS);
      InitializeColorPicker(true,lineColorS);
      Update_Colors();
      if(oncolorright <= oncolorleft){
        oncolorleft--;
      }
    return;
  }
  if(oncolorright>0){
     oncolorright--;
  }
 
  
  lineColorS = colors[oncolorright].getAttribute("style").split(" ")[1].split(";")[0];
  colors[oncolorright].classList.add("secondaryColor");
  if(colors[oncolorright].classList.contains("primaryColor")){
    colors[oncolorright].classList.add("bothColor");
  }
 Color_set(true,lineColorS);
  InitializeColorPicker(true,lineColorS);
  document.getElementById("colorpalette").removeChild(child);
  if(oncolorright > colors.length-1){oncolorright = colors.length-1; return;}
  if(oncolorleft > colors.length-1 && fix){oncolorleft = colors.length-1; return;}
  Update_Colors();
});
function InitializeColorPalette(palette,name){

  for(let i = 0;i < palette.length;i++){
    Color_add(palette[i]);
  }
  Color_last();
  for(let i = 0; i < colors.length;i++){
    colors[i].classList.remove("secondaryColor");
    colors[i].classList.remove("primaryColor");
    colors[i].classList.remove("bothColor");
    colors[i].classList.remove("selected");
  }
  colors[0].classList.add("primaryColor");
  oncolorleft=0;
    let color = colors[0].getAttribute("style");
  color = color.split(" ")[1];
  color = color.split(";")[0];
  Color_set(false,color);
  colors[1].classList.add("secondaryColor");
  oncolorright=1;
  color = colors[1].getAttribute("style");
  color = color.split(" ")[1];
  color = color.split(";")[0];
  Color_set(true,color);
  
//AddPaletteToList(palette,name);

}
function InitializeColorPaletteOR(palette,name){
  Palette_clear();
  
  AddPaletteToList(palette,name);
  }
let hex = document.getElementById("hex");
hex.addEventListener("focusout",function(){
//validate
if(hex.value.length == 7 || hex.value.length == 9){
  if(hex.value.includes("#")){
    var rgba = HEXtoRGBA(hex.value);
ChangeColor(rgba);
UpdateColorCode(rgba);

      var huetemp = RGBAtoHSLA(rgba).split("hsla(")[1].split(")")[0].split(",")[0];
      var hue = HSLAtoRGBA("hsla("+huetemp+",100,50,1)");
//console.log(huetemp);
      UpdateColorPicker(hue);
      UpdateWholeColorPicker(rgba);
  }

}
});
let rgba = document.getElementById("rgba");
rgba.addEventListener("focusout",function(){
//validate

  if(rgba.value.includes("rgba(")||rgba.value.includes("rgb(")){
    
    ChangeColor(rgba.value);
    UpdateColorCode(rgba.value);
    
          var huetemp = RGBAtoHSLA(rgba.value).split("hsla(")[1].split(")")[0].split(",")[0];
          var hue = HSLAtoRGBA("hsla("+huetemp+",100,50,1)");
    //console.log(huetemp);
          UpdateColorPicker(hue);
          UpdateWholeColorPicker(rgba.value);
    ChangeColor(rgba.value);
  }
});
let hsla = document.getElementById("hsla");
hsla.addEventListener("focusout",function(){
//validate

  if(hsla.value.includes("hsla(")||hsla.value.includes("hsl(")){


    var rgba = HSLAtoRGBA(hsla.value);
    ChangeColor(rgba);
    UpdateColorCode(rgba);
    
          var huetemp = RGBAtoHSLA(rgba).split("hsla(")[1].split(")")[0].split(",")[0];
          var hue = HSLAtoRGBA("hsla("+huetemp+",100,50,1)");
    //console.log(huetemp);
          UpdateColorPicker(hue);
          UpdateWholeColorPicker(rgba);
  
  }


 
});




let setcolor = "rbg(0,0,0,255)";
let oncolor=-1; 
let oncolorleft=-1;
let oncolorright=-1;
 let colors = document.getElementsByClassName("color");
 let movedColor = null;
 let movedIdx = null;
 let movedColorObj = document.getElementById("movedColorObj");
function Update_Colors(){
  colors = document.getElementsByClassName("color");
for (let i = 0; i < colors.length;i++){
  colors[i].onmouseover = function() {
    colors[i].classList.add("selected");
  let color = colors[i].getAttribute("style");
  color = color.split(" ")[1];
  
  color = color.split(";")[0];
 
  setcolor = color;
  oncolor = i;
  }

  colors[i].onmouseout = function(){
    if(!middle){
       oncolor = -1;
    }
   
    colors[i].classList.remove("selected");
  }
  
}
}
Update_Colors();




var colrDown=false;


/////////
//MOUSE//
/////////

    //HOVER//
let hoveringON;
let hoveredON; //When mousedown
document.getElementById("colorpalette").onmouseover = function(){
  hoveringON = "colorpalette";
  }
document.getElementById("colorpalette").onmouseout = function(){
    hoveringON = "none";
    //oncolor = -1;
    }
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
var DoubleClickSpeed = 130;//ms
var left = false;
var leftDouble = false;
var leftClicked = false;
var middle = false;
var right = false;
var rightDouble = false;
var rightClicked = false;
var canvasOffset = {x:0,y:0}

var pos = {x:0,y:0}//current position on canvas
var intPos = {x:0,y:0}//int
var lastPos = {x:-1, y:-1}//last position on canvas
var downPos = {x:0, y:0}//last clicked position on canvas
var downIntPos = {x:0,y:0}//int
var upPos = {x:0, y:0}//last let go position on canvas
var upIntPos = {x:0,y:0}//int
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

    document.addEventListener("mousedown", function(e)
    {
      downPos.x = pos.x;
      downPos.y = pos.y;
      downIntPos.x = ~~ pos.x;
      downIntPos.y = ~~ pos.y;
      hoveredON = hoveringON;
      switch(e.button){
        case(0): //console.log("left");
        
       
         left = true;
         if(leftClicked){
        leftDouble=true;
         }else{
          leftDouble = false;
         }
       
         previewCanvas.getContext("2d").fillStyle = lineColor;ctx.fillStyle = lineColor; ctx.strokeStyle = lineColor;  
         if(hoveredON == "canvas"||hoveredON=="background"){

          if(SelectActive){
            if(IsMouseInArea()){
              //if mouse inside selected area, break
            SelectDragging = true;
              break;
            }else{
              ConfirmSelect();
            }
            
            }

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
case("picker"):
if(hoveredON == "canvas"){
  var color = ctx.getImageData(intPos.x,intPos.y,1,1).data;
  var a = String(color[3]/255).split("");
  a.length = 5;
  a=Number(a.join(""));

  var floatColor = [color[0],color[1],color[2],a];
  //console.log(floatColor);
  UpdateColor(floatColor);
}
break;
case("select"):
if(hoveredON == "canvas" || hoveredON == "background"){



uictx.clearRect(0,0,resolution.x,resolution.y);
uictx.fillStyle=selectFill;
RenderSelectUI();
 
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
  SQ_SAVE();
  SQchanged=false;
//},0);
}
break;
  }
}
break;
case("poly"):
switch(PRIMARY_MODE){
  default:
    pctx.fillRect(intPos.x,intPos.y,1,1);
PolyPreview();
  break;
}

//console.log("poly");
        }
      }
         
         E = e;
         Draw();
         break;
        case(1): /*console.log("middle");*/ middle = true; break;
        case(2): /*console.log("right");*/ right = true;
        if(rightClicked){
          rightDouble=true;
           }else{
            rightDouble = false;
           }

        hoveredON = hoveringON;
           E = e;
        previewCanvas.getContext("2d").fillStyle = lineColorS;ctx.fillStyle = lineColorS; ctx.strokeStyle = lineColorS;  
        if(hoveredON == "canvas"){
           Draw();
        }
       
        break;
      }
    
      if(colrDown){
          colrDown=false;
      
        Color_add("rgba(0,0,0,1)");
            if(left){
              colorpicker.style.visibility = "visible";
              ColorSelected = false;
              Update_Colors();
              for(let i = 0; i < colors.length;i++){
                colors[i].classList.remove("primaryColor");
        
              }
              colors[colors.length-1].classList.add("primaryColor");
              InitializeColorPicker(false,"rgba(0,0,0,1)");
            }  
            if(right){
              colorpicker.style.visibility = "visible";
              ColorSelected = true;
              for(let i = 0; i < colors.length;i++){
                colors[i].classList.remove("secondaryColor");
               
              }
              colors[colors.length-1].classList.add("secondaryColor");
              InitializeColorPicker(true,"rgba(0,0,0,1)");
            }
           
          Color_last();
        }
      
             
       if(hoveringON=="colorpalette" && oncolor != -1){
      
          
        
      if(left){
      
        for(let i = 0; i < colors.length;i++){
          colors[i].classList.remove("primaryColor");
          colors[i].classList.remove("selected");
          colors[i].classList.remove("bothColor");
        }
        colors[oncolor].classList.add("primaryColor");
        if(colors[oncolor].classList.contains("secondaryColor")){
          colors[oncolor].classList.add("bothColor");
        }
        oncolorleft=oncolor;
        lineColor = setcolor;
              Color_set(false,setcolor);
        if(leftDouble || (colorpicker.style.visibility == "visible")){
          colorpicker.style.visibility = "visible";
          ColorSelected = false;
            InitializeColorPicker(false,setcolor);
          }
      }else if(right){
        for(let i = 0; i < colors.length;i++){
          colors[i].classList.remove("secondaryColor");
          colors[i].classList.remove("selected");
          colors[i].classList.remove("bothColor");
        }
        colors[oncolor].classList.add("secondaryColor");
        if(colors[oncolor].classList.contains("primaryColor")){
          colors[oncolor].classList.add("bothColor");
        }
        oncolorright=oncolor; 
        lineColorS = setcolor;    Color_set(true,setcolor);
         if(rightDouble|| (colorpicker.style.visibility == "visible")){
          colorpicker.style.visibility = "visible";
          ColorSelected = true;
            InitializeColorPicker(true,setcolor);
          }
      }else if(middle){
        //move+ color
  
          movedColor = colors[oncolor];
          movedIdx = oncolor;
          colors[oncolor].onmouseout = function(){

          };
          document.getElementById("colorpalette").removeChild(colors[oncolor]);
          

          Update_Colors();
          
         movedColorObj.style.visibility = "visible";
         movedColorObj.style.left = e.clientX+"px";
         movedColorObj.style.top = e.clientY-2+"px";
         movedColorObj.style.backgroundColor = movedColor.style.backgroundColor;
      
      }
     }
      
    
    
    });
    document.addEventListener("mouseup", function(e){
    //previewCanvas.getContext("2d").clearRect(0,0,resolution.x,resolution.y);
      //lastPos.x = pos.x;
      //lastPos.y = pos.y;
      upPos.x = pos.x;
      upPos.y = pos.y;
      upIntPos.x = ~~ pos.x;
      upIntPos.y = ~~ pos.y;
   
        switch(e.button){
        case(0): /*console.log("left");*/ left = false;
        leftClicked = true;
        leftDouble=false;
        setTimeout(function(){
        leftClicked = false;
        },DoubleClickSpeed);
       
         if(SelectDragging){
          lrtb.left = SelectPos.x;
          lrtb.right = SelectPos.x+SelectPos.w;
          lrtb.top = SelectPos.y;
          lrtb.bottom = SelectPos.y+SelectPos.h;
          
          SelectDragging = false;
          SelectActive=true;
          return;
         }
        if(hoveredON == "canvas"||hoveredON=="background"){ 
        
          
          switch(PRIMARY){
        case("pencil"):
        SQchanged=true;
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
     SQchanged=true;
    switch(PRIMARY_MODE){
default:
  Line(false,previewCanvas.getContext("2d"),downIntPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);
  Line(true,ctx,downIntPos.x,downIntPos.y,intPos.x,intPos.y,lineWidth);
  break;
    }
     break;
     case("poly"):
     SQchanged=true;
    PolyDraw();
    previewCanvas.getContext("2d").clearRect(0,0,resolution.x,resolution.y);//hotfix
    
     break;
     case("select"):
      SelectPr();
      RenderSelectUI();
     //pctx
     break;
      }
      if(SQchanged){
        SQ_SAVE();
        SQchanged=false;
      }
    }
     break;
        case(1): /*console.log("middle");*/ middle = false;





        if(movedColor != null){
         
            movedColorObj.style.left = e.clientX+"px";
            movedColorObj.style.top = e.clientY-2+"px";
            movedColorObj.style.visibility = "hidden";
            movedColor.classList.remove("selected");
  
         if(hoveringON == "colorpalette"){
           var arr = ColorsToArray();
            if(oncolor < 0){
            oncolor=colors.length;
           }
          if(oncolor <= oncolorleft && movedIdx>oncolorleft){
            oncolorleft++;
          }
          if(oncolor <= oncolorright&& movedIdx>oncolorright){
            oncolorright++;
          }
          if(oncolor >= oncolorleft && movedIdx<oncolorleft){
            oncolorleft--;
          }
          if(oncolor >= oncolorright&& movedIdx<oncolorright){
            oncolorright--;
          }
          

           arr.splice(oncolor,0,movedColor.getAttribute("style").split(" ")[1].split(";")[0]);
       
           var lert = {l:oncolorleft,r:oncolorright};
          InitializeColorPaletteOR(arr,"test");
          for(let i = 0; i < colors.length;i++){
            colors[i].classList.remove("secondaryColor");
            colors[i].classList.remove("primaryColor");
            colors[i].classList.remove("bothColor");
            colors[i].classList.remove("selected");
          }
          oncolorleft=lert.l;
    let color = colors[oncolorleft].getAttribute("style");
  color = color.split(" ")[1];
  color = color.split(";")[0];
  Color_set(false,color);
  colors[oncolorleft].classList.add("primaryColor");
  oncolorright=lert.r;
  color = colors[oncolorright].getAttribute("style");
  color = color.split(" ")[1];
  color = color.split(";")[0];
  Color_set(true,color);
  colors[oncolorright].classList.add("secondaryColor");
          Update_Colors();
          if(colors[oncolorleft].classList.contains("secondaryColor") && colors[oncolorleft].classList.contains("primaryColor")){
            colors[oncolorleft].classList.add("bothColor");
          }
        }
        movedColor=null;
        }
        
        
        break;
        case(2): /*console.log("right");*/ right = false;
        rightDouble=false;
        rightClicked = true;
        setTimeout(function(){
        rightClicked = false;
        },DoubleClickSpeed);
       
        break;
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
    if(middle && (hoveredON=="canvas"||hoveredON=="background")){
      MoveCanvas();
      return true;
    }else if(middle && movedColor != null){
      //move+ color

        //movedColor = colors[oncolor];
       // document.getElementById("colorpalette").removeChild(colors[oncolor]);
        

        //Update_Colors();
        
       //movedColorObj.style.visibility = "visible";
       movedColorObj.style.left = e.clientX+"px";
       movedColorObj.style.top = e.clientY-2+"px";
       //movedColorObj.style.backgroundColor = movedColor.style.backgroundColor;
    
    }
      Draw();
    });
    
    document.addEventListener('wheel', function(e){
    if(hoveringON!="canvas"&&hoveringON!="background"){return;}
      if(e.wheelDelta > 0 ){
    
    
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


  function putImageDataTransparent(ctx,array,x,y,w){
    
    
    for(let r = 0; r < array.length/4/w;r++){
       for(let j = 0; j < w;j++){
        let i = r*4*w+j*4
        ctx.fillStyle = "rgba("+array[i]+","+array[i+1]+","+array[i+2]+","+array[i+3]/255+")";
        ctx.fillRect(x+j,y+r,1,1);
      }
    }
     
    
    
   
  }
function putImageDataOptimized(ctx,array,x,y,w,h){
var ctxArray = ctx.getImageData(x,y,w,h).data;

for(let i = 0;i < array.length;i+=4){

var tr0 = ctxArray[i+3]/255;
var tr1 = array[i+3]/255;
array[i] = ((array[i]*tr1)+(ctxArray[i]*((1-tr1)*tr0)));
array[i+1] = ((array[i+1]*tr1)+(ctxArray[i+1]*((1-tr1)*tr0)));
array[i+2] = ((array[i+2]*tr1)+(ctxArray[i+2]*((1-tr1)*tr0)));
if(array[i+3]+ctxArray[i+3] > 255){
  array[i+3] = 255;
}else{
  array[i+3] = array[i+3]+ctxArray[i+3]; 
}

}
ctx.putImageData(new ImageData(array,w),x,y);

}
//////////
//SELECT//
//////////
var lrtb = {left:1,right:-1,top:1,bottom:-1}
function IsMouseInArea(){
  
if(intPos.x >= lrtb.left && intPos.x <= lrtb.right && intPos.y >= lrtb.top && intPos.y <=lrtb.bottom){
  return true;
}
return false;
}
function RenderSelectUI(){
  //make rect from downpos to pos on ui

  switch(LastDir){
    case(0):
uictx.clearRect(downIntPos.x,downIntPos.y,lastIntPos.x-downIntPos.x+1,lastIntPos.y-downIntPos.y+1);
    break;
    case(1):
 uictx.clearRect(lastIntPos.x,lastIntPos.y,downIntPos.x-lastIntPos.x+1,downIntPos.y-lastIntPos.y+1);
    break;
    case(2):
 uictx.clearRect(downIntPos.x,lastIntPos.y,lastIntPos.x-downIntPos.x+1,downIntPos.y-lastIntPos.y+1);
    break;
    case(3):
 uictx.clearRect(lastIntPos.x,downIntPos.y,downIntPos.x-lastIntPos.x+1,lastIntPos.y-downIntPos.y+1);
    break;
  }
  if(downIntPos.x <= intPos.x  && downIntPos.y <= intPos.y ){
    
  uictx.fillRect(downIntPos.x,downIntPos.y,intPos.x-downIntPos.x+1,intPos.y-downIntPos.y+1);
  LastDir=0;
  }
  else if(downIntPos.x > intPos.x  && downIntPos.y > intPos.y ){
   
  uictx.fillRect(intPos.x,intPos.y,downIntPos.x-intPos.x+1,downIntPos.y-intPos.y+1);
  LastDir=1;
  } 
  else if(downIntPos.x <= intPos.x  && downIntPos.y > intPos.y ){
   
  uictx.fillRect(downIntPos.x,intPos.y,intPos.x-downIntPos.x+1,downIntPos.y-intPos.y+1);
  LastDir=2;
  }
  else if(downIntPos.x > intPos.x  && downIntPos.y <= intPos.y ){
   
  uictx.fillRect(intPos.x,downIntPos.y,downIntPos.x-intPos.x+1,intPos.y-downIntPos.y+1);
  LastDir=3;
  } 
  


}
function SelectPr(){
  SelectActive=true;
 
  if(downIntPos.x <= upIntPos.x  && downIntPos.y <= upIntPos.y ){
    lrtb.left = downIntPos.x;lrtb.right=upIntPos.x;lrtb.top=downIntPos.y;lrtb.bottom=upIntPos.y;
    SelectArea = ctx.getImageData(downIntPos.x,downIntPos.y,upIntPos.x-downIntPos.x+1,upIntPos.y-downIntPos.y+1);
    ctx.clearRect(downIntPos.x,downIntPos.y,upIntPos.x-downIntPos.x+1,upIntPos.y-downIntPos.y+1);
    pctx.putImageData(new ImageData(SelectArea.data,upIntPos.x-downIntPos.x+1),downIntPos.x,downIntPos.y);
    SelectPos.x = downIntPos.x;   SelectPos.y = downIntPos.y; SelectPos.w=upIntPos.x-downIntPos.x+1; SelectPos.h=upIntPos.y-downIntPos.y+1;
    LastDir=0;
    }
    else if(downIntPos.x > upIntPos.x  && downIntPos.y > upIntPos.y ){
     
    //uictx.fillRect(upIntPos.x,upIntPos.y,downIntPos.x-upIntPos.x+1,downIntPos.y-upIntPos.y+1);
    lrtb.right = downIntPos.x;lrtb.left=upIntPos.x;lrtb.bottom=downIntPos.y;lrtb.top=upIntPos.y;
    SelectArea = ctx.getImageData(upIntPos.x,upIntPos.y,downIntPos.x-upIntPos.x+1,downIntPos.y-upIntPos.y+1);
    ctx.clearRect(upIntPos.x,upIntPos.y,downIntPos.x-upIntPos.x+1,downIntPos.y-upIntPos.y+1);
    pctx.putImageData(new ImageData(SelectArea.data,downIntPos.x-upIntPos.x+1),upIntPos.x,upIntPos.y);
    SelectPos.x = upIntPos.x;   SelectPos.y = upIntPos.y; SelectPos.w=downIntPos.x-upIntPos.x+1;SelectPos.h=downIntPos.y-upIntPos.y+1;
    LastDir=1;
    } 
    else if(downIntPos.x <= upIntPos.x  && downIntPos.y > upIntPos.y ){
      lrtb.left = downIntPos.x;lrtb.right=upIntPos.x;lrtb.bottom=downIntPos.y;lrtb.top=upIntPos.y;
    //uictx.fillRect(downIntPos.x,upIntPos.y,upIntPos.x-downIntPos.x+1,downIntPos.y-upIntPos.y+1);
    SelectArea = ctx.getImageData(downIntPos.x,upIntPos.y,upIntPos.x-downIntPos.x+1,downIntPos.y-upIntPos.y+1);
    ctx.clearRect(downIntPos.x,upIntPos.y,upIntPos.x-downIntPos.x+1,downIntPos.y-upIntPos.y+1);
    pctx.putImageData(new ImageData(SelectArea.data,upIntPos.x-downIntPos.x+1),downIntPos.x,upIntPos.y);
    SelectPos.x = downIntPos.x;   SelectPos.y = upIntPos.y;SelectPos.w=upIntPos.x-downIntPos.x+1;SelectPos.h=downIntPos.y-upIntPos.y+1;
    LastDir=2;
    }
    else if(downIntPos.x > upIntPos.x  && downIntPos.y <= upIntPos.y ){
      lrtb.right= downIntPos.x;lrtb.left=upIntPos.x;lrtb.top=downIntPos.y;lrtb.bottom=upIntPos.y;
    //uictx.fillRect(upIntPos.x,downIntPos.y,downIntPos.x-upIntPos.x+1,upIntPos.y-downIntPos.y+1);
    lrtb.right = downIntPos.x;lrtb.left=upIntPos.x;lrtb.top=downIntPos.y;lrtb.bottom=upIntPos.y;
    SelectArea = ctx.getImageData(upIntPos.x,downIntPos.y,downIntPos.x-upIntPos.x+1,upIntPos.y-downIntPos.y+1);
    ctx.clearRect(upIntPos.x,downIntPos.y,downIntPos.x-upIntPos.x+1,upIntPos.y-downIntPos.y+1);
    pctx.putImageData(new ImageData(SelectArea.data,downIntPos.x-upIntPos.x+1),upIntPos.x,downIntPos.y);
      SelectPos.x = upIntPos.x;   SelectPos.y = downIntPos.y;SelectPos.w=downIntPos.x-upIntPos.x+1;SelectPos.h=upIntPos.y-downIntPos.y+1;
    LastDir=3;
    } 
  uictx.clearRect(lrtb.left,lrtb.top,lrtb.right,lrtb.bottom);

}
function MoveSelectedPr(relX,relY){
  pctx.clearRect(SelectPos.x,SelectPos.y,SelectPos.w,SelectPos.h);
  uictx.clearRect(SelectPos.x,SelectPos.y,SelectPos.w,SelectPos.h);
  SelectPos.x = SelectPos.x+relX;   SelectPos.y = SelectPos.y+relY;
  pctx.putImageData(new ImageData(SelectArea.data,SelectPos.w),SelectPos.x,SelectPos.y);
  uictx.fillRect(SelectPos.x,SelectPos.y,SelectPos.w,SelectPos.h);

}
function ConfirmSelect(){
  if(!SelectActive){
    return;
  }
  pctx.clearRect(SelectPos.x,SelectPos.y,SelectPos.w,SelectPos.h);
  uictx.clearRect(SelectPos.x,SelectPos.y,SelectPos.w,SelectPos.h);
  //ctx.putImageData(new ImageData(SelectArea.data,SelectPos.w),SelectPos.x,SelectPos.y);
  //putImageDataTransparent(ctx,SelectArea.data,SelectPos.x,SelectPos.y,SelectPos.w); 
  putImageDataOptimized(ctx,SelectArea.data,SelectPos.x,SelectPos.y,SelectPos.w,SelectPos.h);
  SelectActive=false;
  SelectDragging=false;
 
  SQ_SAVE();
}
//DRAW CODE
function Draw(){
      //COLORPICKER//
 
  switch(hoveredON){ 
 
    case("colorpicker"):
     
 if(left){
     //let Xoff = styleCPE.left.split("px")[0];
  //let Yoff = styleCPE.top.split("px")[0];  
      //var idk = cpbtx.getImageData(~~(AbsPos.x-Xoff),~~(AbsPos.y-Yoff),1,1).data;
    //  console.log(E.clientX);
      var x = ~~(E.clientX-colorpicker.getBoundingClientRect().left-4);
      var y = ~~(E.clientY-colorpicker.getBoundingClientRect().top-4);
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

    if(SelectDragging){
      if(lastIntPos.x != intPos.x || lastIntPos.y != intPos.y){
        MoveSelectedPr(intPos.x-lastIntPos.x,intPos.y-lastIntPos.y);
      }
     
      return;
    }
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
      case("poly"):
      PolyPreview();
      break;
      case("select"):
      RenderSelectUI();
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
let UIUndo = document.getElementById("undo");
UIUndo.addEventListener("click",SQ_UNDO);
let UIRedo = document.getElementById("redo");
UIRedo.addEventListener("click",SQ_REDO);
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
let RightHidden = false;
let UIRight = document.getElementById("UIright");
let UIRightToggle = document.getElementById("right");
UIRightToggle.addEventListener("click",function(x){
if(RightHidden){
  UIRight.style.visibility = "visible";
}else{
  UIRight.style.visibility = "hidden";
}
RightHidden = !RightHidden;
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
  UIOptions.style.visibility = "hidden";
  if(UIResize.style.visibility == "hidden"){
    UIResize.style.visibility = "visible";
    document.getElementById("resX").value = resolution.x;
    document.getElementById("resY").value = resolution.y;
  }else{
    UIResize.style.visibility = "hidden";
  }


  
});
let Options = document.getElementById("options");
let UIOptions = document.getElementById("UIopt");
Options.addEventListener("click",function(e){
  UIResize.style.visibility = "hidden";
  if(UIOptions.style.visibility == "hidden"){
    UIOptions.style.visibility = "visible";
  //get values
  }else{
    UIOptions.style.visibility = "hidden";
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
if(SelectActive){

  pctx.putImageData(SelectArea,SelectPos.x,SelectPos.y);
  uictx.fillStyle = selectFill;
  uictx.fillRect(SelectPos.x,SelectPos.y,SelectPos.w,SelectPos.h);
  console.log(SelectPos);
}
}





});
let Save = document.getElementById("save");
let OpenButton = document.getElementById("fileClick");
let Open = document.getElementById("open");
let ImportButton = document.getElementById("impClick");
let Import = document.getElementById("import");
Save.addEventListener("click",download);
OpenButton.addEventListener("click",function(e){
Open.click();
});
ImportButton.addEventListener("click",function(e){
  Import.click();
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
Import.addEventListener("change",function(e){
  ConfirmSelect();
  
  var image = new Image();
  image.onload = function(){
    
  //make image selected
  const canv = document.createElement("canvas");
  canv.width = image.width;
  canv.height = image.height;

  const Actx = canv.getContext("2d");  Actx.drawImage(image, 0, 0);
  SelectArea = Actx.getImageData(0,0,image.width,image.height);

   SelectActive = true;
  SelectPos.x = 0;
  SelectPos.y = 0;
  SelectPos.w = image.width;
  SelectPos.h = image.height;
  lrtb.left = 0;  //not the same as pos
  lrtb.top = 0;
  lrtb.right = image.width;  //0+width
  lrtb.bottom = image.height;//0+height


  pctx.putImageData(SelectArea,0,0);
  uictx.fillStyle = selectFill;
  uictx.fillRect(0,0,image.width,image.height);
 
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
let Button_picker = document.getElementById("picker");
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
    case("picker"): 
    Menu_Tool.textContent = "";
    name = document.createElement("h2"); 
      br = document.createElement("br");
    name.innerHTML = "Picker";
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
    case("select"): 
    Menu_Tool.textContent = "";
    name = document.createElement("h2"); 
      br = document.createElement("br");
    name.innerHTML = "Picker";
    Menu_Tool.appendChild(name);
    Menu_Tool.appendChild(CreateIcon("./icons/copy.png","COPY"));
    Menu_Tool.appendChild(CreateIcon("./icons/paste.png","PASTE"));
    Menu_Tool.appendChild(CreateIcon("./icons/scissors.png","CUT"));
    Menu_Tool.appendChild(CreateIcon("./icons/delete.png","DELETE"));
    name = document.createElement("p"); 
    name.innerHTML = "Mode:";
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

document.getElementById("cancel_colorpicker").addEventListener("click",function(e){
colorpicker.style.visibility = "hidden";
});
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
      Button_picker.addEventListener("click",function(e) {
        if(!select){
          PRIMARY = "picker";
          PRIMARY_MODE = "PICKER_TRANSPARENT";
          }else{
          SECONDARY = "picker";
          }
        UIbuttonCLICK(Button_picker);
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
/*
  var c = "rgba(200,48,150,1)";
console.log(c);
console.log(RGBAtoHSLA(c));
console.log(HSLAtoRGBA(RGBAtoHSLA(c)));
*/


SQ_SAVE();

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
 //UpdateColorPicker(lineColor);
 //UpdateColorCode(lineColor);
 InitializeColorPicker(false,lineColor);
 
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
InitializeColorPaletteOR(["rgba(0,0,0,1)","rgba(255,255,255,1)","rgba(31,31,31,1)","rgba(63,63,63,1)","rgba(95,95,95,1)","rgba(127,127,127,1)","rgba(159,159,159,1)","rgba(191,191,191,1)",          "rgba(255,0,0,1)","rgba(255,127,0,1)","rgba(255,255,0,1)","rgba(127,255,0,1)","rgba(0,255,0,1)","rgba(0,255,255,1)","rgba(0,0,255,1)","rgba(255,0,255,1)"],"Default");
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
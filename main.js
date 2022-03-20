import {ElementHandler, UI_StylesManager, EventHandler} from "./lib/JSUI/index.js";

UI_StylesManager.injectAllStyles();

var bodyElementHandler = new ElementHandler();
var toolBarEventHandler = new EventHandler(document.querySelector('#toolBar'));

toolBarEventHandler.onLeftSwipe = function() {
  alert(8);
};
var cnvs = document.getElementById('cnvs');
var colorPicker = document.getElementById('colorPicker');
var brushSize = document.getElementById('brushSize');
var ctx = cnvs.getContext('2d');
ctx.lineWidth = 5;
ctx.strokeStyle = "#ffffff";
ctx.fillStyle = "#ffffff";
setBrushSize();
var pointerCoords = {
  previous3: {x:0,y:0},
  previous2: {x:0,y:0},
  previous1: {x:0,y:0},
  current: {x:0,y:0}
};
window.onload = function() {
  
  window.document.querySelector('#main-container-div').style.display = "block";
  /*setTimeout(function() {
    bodyElementHandler.alert("Sorry, some files could not be loaded. Please press OK to Try Again and load the required contents.", () => {
      bodyElementHandler.showLoadingBufferPopUp("#ff0000");
      setTimeout(() => {
        bodyElementHandler.hideLoadingBufferPopUp();
        bodyElementHandler.prompt("Enter Brush Size:", "number", (size) => {
          bodyElementHandler.confirm("Do you want to confirm?", (gotConfirmed) => {
            if (gotConfirmed) {
              brushSize.value = size;
              setBrushSize();
              window.setTimeout(function() {
                
              bodyElementHandler.formInput( window.document.querySelector('form').innerHTML, () => {
                alert()
              } );
              }, 100);
            } else {
              window.close();
            }
          });
        });
      }, 100);
    });
  }, 100);
    bodyElementHandler.showLoadingBufferPage();*/
    
  cnvs.addEventListener('touchstart', handleTouchStart);
  cnvs.addEventListener('touchmove', handleTouchMove);
  cnvs.addEventListener('touchend', handleTouchEnd);
  cnvs.addEventListener('pointerdown', handlePointerDown);
  cnvs.addEventListener('pointermove', handlePointerMove);
  cnvs.addEventListener('pointerup', handlePointerUp);
  colorPicker.addEventListener('input', setColor);
  brushSize.addEventListener('input', setBrushSize);
};

function drawPixel(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, brushSize.value/2, 0, 6.28, false);
  ctx.fill();
}
var isFirstLineStroke = true;
function drawLine() {
  
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  
  if (isFirstLineStroke) {
    
    //For first line stroke, draw simple straight line to the mid way 
    //so that the quadratic Bézier curve would start from there.
    
    ctx.moveTo(pointerCoords.previous1.x, pointerCoords.previous1.y);
    
    var mpx = (pointerCoords.previous1.x + pointerCoords.current.x) / 2;
    var mpy = (pointerCoords.previous1.y + pointerCoords.current.y) / 2;
    ctx.lineTo(mpx, mpy);
    ctx.stroke();
    
    isFirstLineStroke = false;
    return;
  }
  
  // After the first stroke, draw quadratic curves between the previous two mid points using the 
  // original point as the control point, so that the curve looks continuous

  var mp1x = (pointerCoords.previous2.x + pointerCoords.previous1.x) / 2;
  var mp1y = (pointerCoords.previous2.y + pointerCoords.previous1.y) / 2;
  
  var mp2x = (pointerCoords.previous1.x + pointerCoords.current.x) / 2;
  var mp2y = (pointerCoords.previous1.y + pointerCoords.current.y) / 2;
  
  ctx.moveTo(mp1x,mp1y);
  ctx.quadraticCurveTo(pointerCoords.previous1.x, pointerCoords.previous1.y, mp2x, mp2y);

  ctx.stroke();
}
function setColor() {
  ctx.strokeStyle = colorPicker.value;
  ctx.fillStyle = colorPicker.value;
}
function setBrushSize() {
  ctx.lineWidth = brushSize.value;
  document.querySelector("label[for=brushSize]").innerText = brushSize.value + "px";
}
function handleTouchStart(e) {
  e.preventDefault();

}
function handleTouchMove(e) {
  e.preventDefault();
}
function handleTouchEnd(e) {
  e.preventDefault();
}

function handlePointerDown(e) {
  e.preventDefault();
  var x = e.offsetX;
  var y = e.offsetY;
  pointerCoords.current.x = x;
  pointerCoords.current.y = y;
  
  drawPixel(pointerCoords.current.x, pointerCoords.current.y);
  isFirstLineStroke = true;
  
}
function handlePointerMove(e) {
  e.preventDefault();
  var x = e.offsetX;
  var y = e.offsetY;
  swapPointerCoords(x,y); 
  
  drawLine();
}
function handlePointerUp(e) {
  e.preventDefault();
  
  pointerCoords = {
  previous3: {x:0,y:0},
  previous2: {x:0,y:0},
  previous1: {x:0,y:0},
  current: {x:0,y:0}
  };
}
function downloadCanvas() {
  var dataURL = cnvs.toDataURL("image/png").replace("image/png", "image/octet-stream");
  document.querySelector('a').href = dataURL;
  
}
function swapPointerCoords(x,y) {
  pointerCoords.previous3.x = pointerCoords.previous2.x;
  pointerCoords.previous3.y = pointerCoords.previous2.y;
  pointerCoords.previous2.x = pointerCoords.previous1.x;
  pointerCoords.previous2.y = pointerCoords.previous1.y;
  pointerCoords.previous1.x = pointerCoords.current.x;
  pointerCoords.previous1.y = pointerCoords.current.y;
  pointerCoords.current.x = x;
  pointerCoords.current.y = y;
}
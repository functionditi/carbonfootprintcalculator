let colors=[];
colors.push("#4C6C7B");//0 bg blue
colors.push("#E7DCCA");//1 off white
colors.push("#DA6921");//2 orange
colors.push("#342413");//3 dark brown
colors.push("#8E8B43"); //4 olive green
colors.push("#80B149"); //5 green


let theFont;
let theFontSF;
let kern=0.95;

let ref;
let crest1, crest2;
let takeASeat, notBad, doingGreat;
let seeHowYouCompare;
let chimneys;

let grabCurrent=0;
let inflate=[];
let smokeCycles=2;
let noBubbles=50;
let bubblePeriod=1640;
let sizeIncrease=0;
let rest=0;
let lock;
let flash=0;
let appear=120;
let commuteZeroFlag=0;
let homeZeroFlag=0;
let travelZeroFlag=0;

let activateSeeHowPos=0;
let activateCommentScale=-0.8, activateCommentBuoyant=0;
let activateFeet=0;
let activateFeetFlag=0;
let activateSeeHowFlag=0;
let activateCommentFlag=0;
let resultStatus=0;
let table;

let easingVariables=[];


var serial;   // variable to hold an instance of the serialport library
var portName = '/dev/tty.usbmodem14101';    // fill in your serial port name here
var inData;   // variable to hold the input data from Arduino
var inByte;


let fooddata, commutedata, shoppingdata, recdata, homedata, traveldata;
let foodval, commuteval, shoppingval, recval, homeval, travelval;
let a=0, b=0, c=0, d=0, e=0, f=0;
let z=0;
let checkFood=[], checkShopping=[], checkCommute=[], checkRec=[], checkHome=[], checkTravel=[];
let checkIndexFood=0, checkIndexShopping=0, checkIndexCommute=0, checkIndexRec=0, checkIndexHome=0, checkIndexTravel=0;
let flagFood=0, flagShopping=0, flagCommute=0, flagRec=0, flagHome=0, flagTravel=0;
let drawz;

let chimneyPoints=[];
let feetPoints=[];
let feetCounter=[];
let feetScale=[];
let noFeet=10;

let footprintBuffer;

let inactivityCheck=0;
let shouldRefresh=0;


function preload() {
  theFont = loadFont('assets/fonts/HelveticaNeue.ttf');
  theFontSF = loadFont('assets/fonts/SF-Pro.ttf');
  ref = loadImage('assets/images/reference.jpg');
  crest1 = loadImage('assets/images/math-logo.png');
  crest2 = loadImage('assets/images/science-logo.png');
  takeASeat = loadImage('assets/images/takeaseat.png');
  notBad = loadImage('assets/images/not-bad.png');
  doingGreat = loadImage('assets/images/doing-great.png');
  seeHowYouCompare = loadImage('assets/images/comparison.png');
  chimneys=loadImage('assets/images/chimneys.png');
  table = loadTable("carbonestimator.csv", "csv", "header");
}


function setup() {

  createCanvas(1920, windowHeight);
  footprintBuffer=createGraphics(width/2, windowHeight);
  textAlign(LEFT);

  // for (let r = 0; r < table.getRowCount(); r++){
  //   for (let c = 0; c < table.getColumnCount(); c++) {
  //     print(table.getString(r, c));
  //   }   
  // }

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  //serial.open(portName);
       
  randomSeed(1);


  initializeEasing();
  initializeFeetDetails();

  

  for (let i=0; i<smokeCycles; i++){
    inflate[i]=[];
    for (let j=0; j<noBubbles; j++){
      inflate[i][j]=0;
    } 
  }
 

}


function draw() {
  background(colors[0]);
 
  image(footprintBuffer, 0, 0);
  randomSeed(1290);
  //text(frameCount, width/2, height/2);
    drawSmoke(frameCount, 0);
    randomSeed(12000);
    //text(frameCount- (bubblePeriod/2), width/2, height/2+20);
    drawSmoke(frameCount- (bubblePeriod/2), 1);

   image(chimneys, 0, 882);
   

   //addition section

   //labels
   fill(colors[1])
   drawText("Food", 42.8, 170, 321, width, height, 29);
   drawText("Commute", 42.8, 425, 321, width, height, 29);
   drawText("Shopping", 42.8, 719, 321, width, height, 29);
  //  drawText("Recreation", 42.8, 1019, 321, width, height, 29);
  drawText("Home", 42.8, 1050, 321, width, height, 29);
   drawText("Travel", 42.8, 1330, 321, width, height, 29);
   drawText("Recreation", 42.8, 1604, 321, width, height, 29);


   //numbers

   let foodNum=0.0;
   //print(fooddata);
   if (fooddata==0 || fooddata==1 || fooddata==2 || fooddata==3){
    let r=int(fooddata);
    foodNum=table.getNum(r, 3);
    if (frameCount%1==0 && a<foodNum)
      a+=0.1;
    
    let tempa=Math.floor(a*10);
    let drawa=tempa/10;
    //let drawa=a.toFixed(1);
    drawText(convertStr(drawa), 120, 134, 477, width, height, 29);
    }
    
    else {
      drawText(convertStr(foodNum), 120, 134, 477, width, height, 29);
      a=0;
    }
  
   drawText("+", 120, 324.4, 477, width, height, 29);


   let commuteNum=0.0;
   if (commutedata==0 || commutedata==1 || commutedata==2 || commutedata==3){
    let r=int(commutedata)+4;
    commuteNum=table.getNum(r, 3);
    if (frameCount%1==0 && b<commuteNum)
      b+=0.1;
    //print(b);
    let tempb=Math.floor(b*10);
    let drawb=tempb/10;
    drawText(convertStr(drawb), 120, 427, 477, width, height, 29);
   // print(commuteZeroFlag)
    if (commutedata==0){
      if (commuteZeroFlag>20 && commuteZeroFlag<40 || commuteZeroFlag>60 && commuteZeroFlag<80 || commuteZeroFlag>100){
         push();
      fill(colors[5]);
          drawText(convertStr(drawb), 120, 427, 477, width, height, 29);
      pop();

      } 
     //if (commuteZeroFlag>100) commuteZeroFlag=0;
      commuteZeroFlag++;
    }
    
    }
    else {
      drawText(convertStr(commuteNum), 120, 427, 477, width, height, 29);
      commuteZeroFlag=0;
      b=0;
    }

   let shoppingNum=0.0;
   if (shoppingdata==0 || shoppingdata==1 || shoppingdata==2 || shoppingdata==3){
    let r=int(shoppingdata)+8;
    shoppingNum=table.getNum(r, 3);
    if (frameCount%1==0 && c<shoppingNum)
      c+=0.1;
   // print(c);
   let tempc=Math.floor(c*10);
    let drawc=tempc/10;
    drawText(convertStr(drawc), 120, 721, 477, width, height, 29);
    }
    else{
      drawText(convertStr(shoppingNum), 120, 721, 477, width, height, 29);
      c=0;
    }
  
   //120, 1024, 477

   let recNum=0.0;
   if (recdata==0 || recdata==1 || recdata==2 || recdata==3){
    let r=int(recdata)+12;
    recNum=table.getNum(r, 3);
    if (frameCount%1==0 && d<recNum)
    d+=0.1;
    //print(d);
    let tempd=Math.floor(d*10);
    let drawd=tempd/10;
    drawText(convertStr(drawd), 120, 1024, 477, width, height, 29);
}
    else{
  drawText(convertStr(recNum), 120, 1024, 477, width, height, 29);
    d=0;
}   



let homeNum=0.0;
if (homedata==0 || homedata==1 || homedata==2 || homedata==3){
  
 let r=int(homedata)+16;
 homeNum=table.getNum(r, 3);
 if (frameCount%1==0 && e<homeNum)
   e+=0.1;
 //print(e);
 let tempe=Math.floor(e*10);
 let drawe=tempe/10;
 if (homedata==3) drawText(convertStr(drawe), 120, 1290, 477, width, height, 29);
 else drawText(convertStr(drawe), 120, 1303, 477, width, height, 29);
 

 if (homedata==0){
  if (homeZeroFlag>20 && homeZeroFlag<40 || homeZeroFlag>60 && homeZeroFlag<80 || homeZeroFlag>100){
     push();
  fill(colors[5]);
  drawText(convertStr(drawe), 120, 1303, 477, width, height, 29);
  pop();

  } 
 //if (homeZeroFlag>100) homeZeroFlag=0;
 homeZeroFlag++;
}
}


else{
 drawText(convertStr(homeNum), 120, 1303, 477, width, height, 29);
 e=0;
 homeZeroFlag=0;
}
  
   

   let travelNum=0.0;
    if (traveldata==0 || traveldata==1 || traveldata==2 || traveldata==3){
     let r=int(traveldata)+20;
     travelNum=table.getNum(r, 3);
     if (frameCount%1==0 && f<travelNum)
      f+=0.1;
    //print(f);
    let tempf=Math.floor(f*10);
    let drawf=tempf/10;
    drawText(convertStr(drawf), 120, 1617, 477, width, height, 29);

    if (traveldata==0){
      if (travelZeroFlag>20 && travelZeroFlag<40 || travelZeroFlag>60 && travelZeroFlag<80 || travelZeroFlag>100){
         push();
      fill(colors[5]);
      drawText(convertStr(drawf), 120, 1617, 477, width, height, 29);
      pop();
    
      } 
     //if (travelZeroFlag>100) travelZeroFlag=0;
     travelZeroFlag++;
    }

 }
 else{
  drawText(convertStr(travelNum), 120, 1617, 477, width, height, 29);
  f=0;
  travelZeroFlag=0;
 }

  //end of numbers
   

   // plus signs

   drawText("+", 120, 324.4, 477, width, height, 29);
   drawText("+", 120, 617, 477, width, height, 29);
   drawText("+", 120, 917, 477, width, height, 29);
   drawText("+", 120, 1206, 477, width, height, 29);
   drawText("+", 120, 1515, 477, width, height, 29);
   

   //end of addition section



   //result section
   drawText("Your \nCarbon \nFootprint", 74.8, 711, 646.8, 300, height, 66);
   drawTextSF("=", 130, 1030, 790, 300, height, 66);

   let sum=foodNum+commuteNum+shoppingNum+recNum+homeNum+travelNum;
  

   if (frameCount%1==0 && z<sum+0.0){
    z+=0.1;
   }

   if (frameCount%1==0 && z>=sum+0.1){
    z-=0.1;
   }

   if (sum==0){
    z=0;
   }
   //let drawz=z.toFixed(1);
   let tempz=Math.floor(z*10);
   drawz=tempz/10;
   let resultNum=sum.toFixed(1);
   drawText(convertStr(drawz), 251, 1113, 780.5, width, height, 29);

   drawText("Tonnes of\nCO2 / year", 44, 1562+70, 628.5, 300, height, 40);
   
   drawText("Source: https://whatismycarbonfootprint.com/sg", 10.46, 727, 1042, 300, height, 40);

   //end of result section

  

   //calculate result and activate other actions section


    sum=foodNum+commuteNum+shoppingNum+recNum+homeNum+travelNum;

  if (fooddata!=5 && fooddata!=null && commutedata!=5 && commutedata!=null && shoppingdata!=5 && shoppingdata!=null && recdata!=5 && recdata!=null && homedata!=5 && homedata!=null && traveldata!=5 && traveldata!=null){
      lock=30;
      flash=1;
      sum=foodNum+commuteNum+shoppingNum+recNum+homeNum+travelNum;
  }
  else{
    flash=0;
    appear=120;
    activateSeeHowPos=0;
    activateCommentScale=-0.8;
    if (activateSeeHowFlag==1)deActivateSeeHowYouCompare();
    if (activateCommentFlag==1) deActivateComment(sum);
    //initializeEasing();
    sum=foodNum+commuteNum+shoppingNum+recNum+homeNum+travelNum;
    if (activateFeetFlag==1){

      activateFootprint();
      activateFeet-=7;
      if (activateFeet<=-800)
      activateFeetFlag=0;
      
    } 
    else if (activateFeetFlag==0){
      activateFeet=0;
      initializeFeetDetails();
    }

    if (activateCommentFlag==0 && activateSeeHowFlag==0){

      initializeEasing();
      resultStatus=0;
    }
    
  }


  if (flash==1) {
    activateFootprint();
    activateFlash(sum);
    activateSeeHowYouCompare();
    activateComment(sum);
  }
 
  //end of calculate result and activate other actions section

  //checking if should refresh
  
    if (sum==0)
    inactivityCheck++;
  else inactivityCheck=0;


  if (inactivityCheck>(10*60*1000)) shouldRefresh=1;
  else shouldRefresh=0;

  if (shouldRefresh==1) setInterval('autoRefresh()', 50);

  //end of checking if should refresh
  
  //off white banner- top
  
  fill(colors[1]);
  noStroke();
  rect(0, 0, width, 210);

  noFill();
  stroke(colors[3]);
  strokeWeight(3.275);
  line(0, 210, width, 210);

  noStroke();
  fill(colors[3])

  image(crest1, 1503, 33);
  image(crest2, 1658, 32)

  //title text
  drawText("The Carbon", 66, 146.3, 105, width, height, 50);
  drawText("Footprint Calculator", 66, 146.3, 161, width, height, 50);

  let desc="See how your habits and lifestyle add up ecologically. \nApproach the teacher’s table \nto take the test."
  drawText(desc, 28.95, 800, 75, 383, height, 29);

   //end of off white banner- top
  // text(easingVariables[4].easeX, width/2, height/2);

 
}

function drawSmoke(theCount, cycle){
  push();
    fill(colors[2]);
    stroke(colors[3]);
  
    for (let i=0; i<noBubbles; i++){
      let pickX=int(random(8))
      let current=random(0, 3000)+1200-(theCount%bubblePeriod)*random(2, 3);
      if (current<chimneyPoints[pickX].y && current>700) inflate[cycle][i]+=0.1; 
      
      ellipse(chimneyPoints[pickX].x+sin(frameCount*random(0.01, 0.07))*random(5, 20), current, random(2, 10)*inflate[cycle][i]);
      push();
      // text(i, chimneyPoints[pickX].x, current)
      // text(cycle, chimneyPoints[pickX].x, current+10)
      pop();
    }

    if (theCount%bubblePeriod==0){
      for (let i=0; i<noBubbles; i++){
        inflate[cycle][i]=0;
      }
    }
  pop();
}

//activation functions

function activateFootprint(){
  activateFeetFlag=1;
  footprintBuffer.push()
  footprintBuffer.background(colors[0])
  footprintBuffer.strokeWeight(3.275);
  footprintBuffer.fill(colors[2]);
  footprintBuffer.stroke(colors[3]);
  footprintBuffer.translate(0, activateFeet)
    for (let i=0; i<noFeet; i++){
    
      let time=10;
      let distance=feetCounter[i].y-feetPoints[i].y;

      let speed=distance/time;
      footprintBuffer.ellipse(feetCounter[i].x+sin((frameCount)*random(0.01, 0.05))*random(2, 15), feetCounter[i].y, feetPoints[i].size*feetScale[i])

      if (feetCounter[i].y>feetPoints[i].y){
        feetCounter[i].y-=speed;
        
      }
      if (feetCounter[i].x>feetPoints[i].x){
        feetCounter[i].x--;
      }
      else if (feetCounter[i].x<feetPoints[i].x){
        feetCounter[i].x++;
      }

      if (feetScale[i]<1) feetScale[i]+=0.013+(speed*0.002);
    }
    footprintBuffer.pop();
  if (activateFeet>-800) activateFeet-=3;
}



function activateComment(theSum){

  // if (activateCommentBuoyant<1) activateCommentScale+=0.03;

  let targetScale= 1.2;

  let ds = targetScale - easingVariables[2].easeScale;

  
  easingVariables[2].easeScale += ds * easingVariables[2].easing;
  
  let scaleBy=easingVariables[2].easeScale+activateCommentBuoyant;

  if (easingVariables[2].easeScale>1 && activateCommentBuoyant>=-0.2){
   let targetScale2=0.01;

   let dds= targetScale2- easingVariables[3].easeScale
   easingVariables[3].easeScale+=dds * easingVariables[3].easing;
   print(scaleBy)
    activateCommentBuoyant-=easingVariables[3].easeScale;
    if (scaleBy>0.9 && scaleBy<0.98) activateCommentFlag=1;
  } 

  

 
  // if (activateCommentScale<1) activateCommentScale+=0.03;
  // if (activateCommentScale>0){
  push();
  translate(1562+30, 723);
  translate(134, 31);
  scale(scaleBy);
  translate(-134, -31);

  if(theSum<=2){
    image(doingGreat, 0, 0 );
    resultStatus=1;

  } 
  else if (theSum>2 && theSum < 9){
    image(notBad, 0, 0);
    resultStatus=2;
  } 
  else if (theSum>=9){

    image(takeASeat, 0, 0)
    resultStatus=3;
  }  
  
  pop();
  //}

  //activateCommentBuoyant+=0.03;

  
}

function deActivateComment(theSum){


  let targetScale= 0;

  let ds = targetScale - easingVariables[6].easeScale;

  
  easingVariables[6].easeScale += ds * easingVariables[6].easing;
  
  let scaleBy=easingVariables[6].easeScale;

  if (scaleBy<=targetScale+0.1) activateCommentFlag=0;
 

  push();
  translate(1562+30, 723);
  translate(134, 31);
  scale(scaleBy);
  translate(-134, -31);

  if(resultStatus==1) image(doingGreat, 0, 0 );
  else if (resultStatus==2) image(notBad, 0, 0)
  else if (resultStatus==3)  image(takeASeat, 0, 0)
  
  pop();
  


  
}

function activateSeeHowYouCompare(){



  push();
  translate(1166+20, 859);
  let targetX = 0;
  let dx = targetX - easingVariables[0].easeX;
  easingVariables[0].easeX += dx * easingVariables[0].easing;

  let targetY = 15;
  let dy = targetY - easingVariables[0].easeY;
  easingVariables[0].easeY += dy * easingVariables[0].easing;

  
  image(seeHowYouCompare, easingVariables[0].easeX, easingVariables[0].easeY);

  if (easingVariables[0].easeX>targetX-0.01) activateSeeHowFlag=1;


  targetX=0;
  dx=targetX - easingVariables[1].easeX;
  easingVariables[1].easeX += dx * easingVariables[1].easing;

  targetY=0;
  dy = targetY - easingVariables[1].easeY;
  easingVariables[1].easeY += dy * easingVariables[1].easing;
  drawText("See How You Compare", 22, easingVariables[1].easeX, easingVariables[1].easeY, 300, height, 40);
  pop();

}

function deActivateSeeHowYouCompare(){



  push();
  translate(1166+20, 859);
  let targetX = 700;
  let dx = targetX - easingVariables[0].easeX;
  easingVariables[4].easeX += dx * easingVariables[4].easing;

  let targetY = 15;
  let dy = targetY - easingVariables[0].easeY;
  easingVariables[4].easeY += dy * easingVariables[4].easing;

  
  image(seeHowYouCompare, easingVariables[4].easeX, easingVariables[4].easeY);

  if (easingVariables[4].easeX>targetX-0.001){
  
     activateSeeHowFlag=0;
   } 

   //easeX: -20, easeY: 0, easing:0.07
  targetX=-20;
  dx=targetX - easingVariables[1].easeX;
  easingVariables[5].easeX += dx * easingVariables[5].easing;

  targetY=0;
  dy = targetY - easingVariables[1].easeY;
  easingVariables[5].easeY += dy * easingVariables[5].easing;
  drawText("See How You Compare", 22, easingVariables[5].easeX, easingVariables[1].easeY, 300, height, 40);
  pop();

}

function activateFlash(theSum){
  appear+=1;
  push();
  if (appear<140 && appear>100){
    
    //rect(1105, 590, 500, 225);
    push();
    if(theSum<=2) fill(colors[5]);
    else if (theSum>2 && theSum < 9) fill(colors[4]);
    else if (theSum>=9)  fill(colors[2]);
    
    stroke(colors[3]);
    strokeWeight(6);
    drawText(convertStr(drawz), 251, 1113, 780.5, width, height, 29);
    pop();
    
  }
 
  if (frameCount%40==0 && appear>100) appear=120;
  
  pop();
  
}



//end of activation functions



//text functions


function drawText(theText, theSize, x, y, w, h, leading){
  textFont(theFont);
  textSize(theSize);
  let splitString=split(theText, '');
  let acc_x=0;
  let acc_y=0;
  for (let i = 0; i < splitString.length; i++) {
    text(splitString[i], x + acc_x * kern, y +acc_y);
    acc_x += textWidth(splitString[i])* kern;
    if (acc_x>w && splitString[i]==" " || splitString[i]=="\n"){
      acc_x=0;
      acc_y+=leading;
    }
  }
  // text(splitString[0], x, y)
}

function drawTextSF(theText, theSize, x, y, w, h, leading){
  textFont(theFontSF);
  textSize(theSize);
  let splitString=split(theText, '');
  let acc_x=0;
  let acc_y=0;
  for (let i = 0; i < splitString.length; i++) {
    text(splitString[i], x + acc_x * kern, y +acc_y);
    acc_x += textWidth(splitString[i])* kern;
    if (acc_x>w && splitString[i]==" " || splitString[i]=="\n"){
      acc_x=0;
      acc_y+=leading;
    }
  }
  // text(splitString[0], x, y)
}

function convertStr(theThing){
  let converted=str(theThing);
  let flag=0;
  for (let i=0; i<converted.length; i++){
    if (converted[i]=='.')
      flag=1;
  }

  if (flag==0){

    let toAdd=['.0'];
    let newString=concat(converted, toAdd);
    converted=newString;
    
  }

  return converted;
}

//end of text functions


//functions for keyboard-activated control


function keyPressed(){
 if (keyCode==16) {
  flash=0;
  activateSeeHowPos=0;
  activateCommentScale=-0.8;
  
 }
 
}


function keyTyped(){
  


  if (key== 'Q') fooddata=0;
  if (key== 'W') fooddata=1;
  if (key== 'E') fooddata=2;
  if (key== 'R') fooddata=3;
  if (key== 'T') fooddata=5;


  if (key== 'A') commutedata=0;
  if (key== 'S') commutedata=1;
  if (key== 'D') commutedata=2;
  if (key== 'F') commutedata=3;
  if (key== 'G') commutedata=5;


  if (key== 'Z') shoppingdata=0;
  if (key== 'X') shoppingdata=1;
  if (key== 'C') shoppingdata=2;
  if (key== 'V') shoppingdata=3;
  if (key== 'B') shoppingdata=5;


  if (key== 'P') recdata=0;
  if (key== 'O') recdata=1;
  if (key== 'I') recdata=2;
  if (key== 'U') recdata=3;
  if (key== 'Y') recdata=5;

  if (key== 'L') homedata=0;
  if (key== 'K') homedata=1;
  if (key== 'J') homedata=2;
  if (key== 'H') homedata=3;
  if (key== ';') homedata=5;


  if (key== '1') traveldata=0;
  if (key== '2') traveldata=1;
  if (key== '3') traveldata=2;
  if (key== '4') traveldata=3;
  if (key== '5') traveldata=5;


  
  
}


//end of functions for keyboard-activated control

// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
    }
   }
   
   function serverConnected() {
     print('connected to server.');
   }
   
   function portOpen() {
     print('the serial port opened.')
   }

   function serialEvent() {
    // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      foodval = sensors[0];   // element 0 is the locH
      commuteval = sensors[1]; // element 1 is the locV
      shoppingval = sensors[2];      // element 2 is the button
      recval = sensors[3];
      homeval = sensors[4];
      travelval = sensors[5];
    }

    //debug
    
   print(foodval, commuteval, shoppingval, recval, homeval, travelval);


   fooddata=foodval;
   commutedata=commuteval;
   shoppingdata=shoppingval;
   recdata=recval;
   homedata=homeval;
   traveldata=travelval;
   
    
   }
  }

   function serialError(err) {
     print('Something went wrong with the serial port. ' + err);
   }
   
   function portClose() {
     print('The serial port closed.');
   }
  

   function initializeEasing(){

    activateCommentBuoyant=0;
    easingVariables.length=0;
    easingVariables.push({easeX: 600, easeY: 15, easing:0.07});
easingVariables.push({easeX: -20, easeY: 0, easing:0.07});
easingVariables.push({easeScale: 0, easing: 0.07});
easingVariables.push({easeScale: 0.002, easing: 0.07});
easingVariables.push({easeX: 0, easeY: 15, easing:0.07}); //4
easingVariables.push({easeX: 0, easeY: 0, easing:0.07}); //5
easingVariables.push({easeScale: 1.2, easing: 0.07}); //6


   }

   function initializeFeetDetails(){

    for (let i=0; i<noFeet; i++){
      feetScale[i]=0;
    }
  
    chimneyPoints.length=0;
    chimneyPoints.push({x: 60, y:993});
    chimneyPoints.push({x: 124, y:947});
    chimneyPoints.push({x: 217, y:973});
    chimneyPoints.push({x: 273, y:951});
    chimneyPoints.push({x: 370, y:992});
    chimneyPoints.push({x: 462, y:881});
    chimneyPoints.push({x: 529, y:969});
    chimneyPoints.push({x: 625, y:928});
  
    feetPoints.length=0;
    feetPoints.push({x: 459, y:717, size: 258})
    feetPoints.push({x: 347, y:840, size: 178})
    feetPoints.push({x: 286, y:768, size: 154})
    feetPoints.push({x: 286, y:922, size: 94})
    feetPoints.push({x: 190, y:840, size: 193})
    //toes
    feetPoints.push({x: 529, y:543, size: 94})
    feetPoints.push({x: 598, y:711, size: 64})
    feetPoints.push({x: 588, y:809, size: 58})
    feetPoints.push({x: 568, y:879, size: 43})
    feetPoints.push({x: 531, y:924, size: 37})
  
  
    feetCounter.length=0;
    feetCounter.push({x: chimneyPoints[5].x, y: chimneyPoints[5].y});
    feetCounter.push({x: chimneyPoints[4].x, y: chimneyPoints[4].y});
    feetCounter.push({x: chimneyPoints[3].x, y: chimneyPoints[3].y});
    feetCounter.push({x: chimneyPoints[3].x, y: chimneyPoints[3].y});
    feetCounter.push({x: chimneyPoints[2].x, y: chimneyPoints[2].y});
    feetCounter.push({x: chimneyPoints[6].x, y: chimneyPoints[6].y-50});
    feetCounter.push({x: chimneyPoints[7].x, y: chimneyPoints[7].y});
    feetCounter.push({x: chimneyPoints[7].x, y: chimneyPoints[7].y+100});
    feetCounter.push({x: chimneyPoints[7].x, y: chimneyPoints[7].y});
    feetCounter.push({x: chimneyPoints[6].x, y: chimneyPoints[6].y});
  
  }


function autoRefresh() {
    window.location = window.location.href;
}

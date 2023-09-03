let colors=[];
colors.push("#4C6C7B");//bg blue
colors.push("#E7DCCA");// off white
colors.push("#DA6921");// orange
colors.push("#342413");// dark brown

let theFont;
let theFontSF;
let kern=0.95;

let ref;
let crest1, crest2;
let takeASeat;
let seeHowYouCompare;
let chimneys;

let grabCurrent=0;
let lock;


let table;

var serial;   // variable to hold an instance of the serialport library
var portName = '/dev/tty.usbmodem142201';    // fill in your serial port name here
var inData;   // variable to hold the input data from Arduino
var inByte;

let fooddata, commutedata, shoppingdata;
let foodval, commuteval, shoppingval;

let checkFood=[], checkShopping=[], checkCommute=[];
let checkIndexFood=0, checkIndexShopping=0, checkIndexCommute=0;
let flagFood=0, flagShopping=0, flagCommute;


function preload() {
  theFont = loadFont('assets/fonts/HelveticaNeue.ttf');
  theFontSF = loadFont('assets/fonts/SF-Pro.ttf');
  ref = loadImage('assets/images/reference.jpg');
  crest1 = loadImage('assets/images/math-logo.png');
  crest2 = loadImage('assets/images/science-logo.png');
  takeASeat = loadImage('assets/images/takeaseat.png');
  seeHowYouCompare = loadImage('assets/images/comparison.png');
  chimneys=loadImage('assets/images/chimneys.png');
  table = loadTable("carbonestimator.csv", "csv", "header");
}


function setup() {

  createCanvas(1920, 1080);
  textAlign(LEFT);

  for (let r = 0; r < table.getRowCount(); r++){
    for (let c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));
    }   
  }

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
       
  randomSeed(1);



 
}


function draw() {
  background(colors[0]);
 
  
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

   drawCircles();
   image(chimneys, 0, 882);


   //addition section

   //labels
   fill(colors[1])
   drawText("Food", 42.8, 170, 321, width, height, 29);
   drawText("Commute", 42.8, 425, 321, width, height, 29);
   drawText("Shopping", 42.8, 719, 321, width, height, 29);
   drawText("Recreation", 42.8, 1019, 321, width, height, 29);
   drawText("Home", 42.8, 1340, 321, width, height, 29);
   drawText("Travel", 42.8, 1644, 321, width, height, 29);


   //numbers

   let foodNum=0.0;
   if (fooddata==0 || fooddata==1 || fooddata==2 || fooddata==3){
    let r=fooddata;
    for (let c = 0; c < table.getColumnCount(); c++) {
        //print(table.getString(r, c));
        foodNum=table.getNum(r, 3);
        // document.getElementById("food-value").innerHTML = foodval;
      }
   
}
   drawText(convertStr(foodNum), 120, 134, 477, width, height, 29);
   drawText("+", 120, 324.4, 477, width, height, 29);


   let commuteNum=0.0;
   if (commutedata==0 || commutedata==1 || commutedata==2 || commutedata==3){
    let r=commutedata;
    for (let c = 0; c < table.getColumnCount(); c++) {
        //print(table.getString(r, c));
        commuteNum=table.getNum(r, 3);
        // document.getElementById("commute-value").innerHTML = commuteval;
      }
    }
   drawText(convertStr(commuteNum), 120, 427, 477, width, height, 29);

   let shoppingNum=0.0;
   if (shoppingdata==0 || shoppingdata==1 || shoppingdata==2 || shoppingdata==3){
    let r=shoppingdata;
    for (let c = 0; c < table.getColumnCount(); c++) {
        //print(table.getString(r, c));
        shoppingNum=table.getNum(r, 3);
        // document.getElementById("shopping-value").innerHTML = shoppingval;
      }
    }
  
   drawText(convertStr(shoppingNum), 120, 721, 477, width, height, 29);

   let recreationNum=1.3;
   drawText(convertStr(recreationNum), 120, 1024, 477, width, height, 29);

   let homeNum=3.5;
   drawText(convertStr(homeNum), 120, 1313, 477, width, height, 29);

   let travelNum=2.3;
   drawText(convertStr(travelNum), 120, 1617, 477, width, height, 29);

   // plus signs

   drawText("+", 120, 324.4, 477, width, height, 29);
   drawText("+", 120, 617, 477, width, height, 29);
   drawText("+", 120, 917, 477, width, height, 29);
   drawText("+", 120, 1206, 477, width, height, 29);
   drawText("+", 120, 1511, 477, width, height, 29);
   

   //end of addition section

   //result section
   drawText("Your \nCarbon \nFootprint", 74.8, 721, 646.8, 300, height, 66);
   drawTextSF("=", 130, 1049, 790, 300, height, 66);

   let sum=foodNum+commuteNum+shoppingNum+recreationNum+homeNum+travelNum;
   let resultNum=sum.toFixed(1);
   drawTextSF(convertStr(resultNum), 251, 1143, 780.5, width, height, 29);

   drawText("Tonnes of\nCO2 / year", 44, 1562, 628.5, 300, height, 40);

   image(takeASeat, 1562, 723);

   drawText("See How You Compare", 22, 1166, 859, 300, height, 40);

   image(seeHowYouCompare, 1166, 874);

   drawText("Source: https://whatismycarbonfootprint.com/sg", 10.46, 727, 1042, 300, height, 40);


  

   //end of result section

   

  if (mouseIsPressed === true){
    // image(ref, 0, 0);
    lock=30;
  }
  
}

// function keyPressed(){
//   grabCurrent=500;
//   resetAnimation=0;
// }




function drawCircles(){
  push();
  fill(colors[2]);
  stroke(colors[3]);

  let rise=0;
  // let time=frameCount%300;

  if (keyIsPressed=== true) lock=keyCode;
  if (lock== 32){
    grabCurrent=0;
  }

  if (grabCurrent<-1000) grabCurrent=500;
  if (grabCurrent==0) lock=32;
 

 
  rise=grabCurrent;
  
  let seed=0;
  randomSeed(seed);
  for (let i=0; i<10; i++){
    ellipse(random(750)+sin(random(10)+frameCount*0.01)*random(100), random(0, 3000)+1200-(frameCount%900)*random(3, 5), random(20, 100));
  }
  seed++;
  

  
  ellipse(429, rise+717+sin((frameCount)*0.05)*20, 258);
  ellipse(347, rise+840+sin((frameCount+100)*0.07)*15, 178);
  ellipse(286, rise+768+sin((frameCount-180)*0.1)*10, 154);
  ellipse(286, rise+922+cos((frameCount*2)*0.1), 94);
  ellipse(190, rise+840+sin((frameCount+20)*0.02)*30, 193);
  //text(frameCount, 429, rise+717+sin((frameCount)*0.05)*20);

  //toes
  ellipse(529, rise+543+sin((frameCount)*0.01)*10, 94);
  ellipse(598, rise+711+cos((frameCount)*0.01)*20, 64);
  ellipse(588, rise+809+sin((frameCount)*0.03)*18, 58);
  ellipse(568, rise+879+cos((frameCount)*0.03)*15, 43);
  ellipse(531, rise+924+sin((frameCount)*0.03)*22, 37);


  
  

  pop();

  grabCurrent-=5;

}

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
    }
    print(foodval, commuteval, shoppingval);


    //checkFoodValues(flagFood, checkFood, checkIndexFood, foodval, fooddata);


    flagFood=0;
    checkFood[checkIndexFood]=foodval;
    checkIndexFood++;
    if (checkIndexFood>5){
      if (checkFood[0]==checkFood[1] && checkFood[0]==checkFood[2] && checkFood[0]==checkFood[3] && checkFood[0]==checkFood[4]){
        flagFood=1;
        fooddata=5;
      }
      else{
        flagFood=0;

        if (checkFood[0]!=5)
          fooddata=checkFood[0];
        else if (checkFood[1]!=5)
          fooddata=checkFood[1];
      }

      checkIndexFood=0;
    }

  flagCommute=0;
    checkCommute[checkIndexCommute]=commuteval;
    checkIndexCommute++;
    if (checkIndexCommute>5){
      if (checkCommute[0]==checkCommute[1] && checkCommute[0]==checkCommute[2] && checkCommute[0]==checkCommute[3] && checkCommute[0]==checkCommute[4]){
        flagCommute=1;
        commutedata=5;
      }
      else{
        flagCommute=0;

        if (checkCommute[0]!=5)
          commutedata=checkCommute[0];
        else if (checkCommute[1]!=5)
          commutedata=checkCommute[1];
      }

      checkIndexCommute=0;
    }



flagShopping=0;
    checkShopping[checkIndexShopping]=shoppingval;
    checkIndexShopping++;
    if (checkIndexShopping>5){
      if (checkShopping[0]==checkShopping[1] && checkShopping[0]==checkShopping[2] && checkShopping[0]==checkShopping[3] && checkShopping[0]==checkShopping[4]){
        flagShopping=1;
        shoppingdata=5;
      }
      else{
        flagShopping=0;

        if (checkShopping[0]!=5)
          shoppingdata=checkShopping[0];
        else if (checkShopping[1]!=5)
          shoppingdata=checkShopping[1];
      }

      checkIndexShopping=0;
    }



   }
  }
   
   
  //  function serialEvent() {
  //   //  inData = Number(serial.read());
  //   //  //console.log(Number(serial.read()));
  //   	  		// read a byte from the serial port:
            
  //   			inByte = serial.read();
  //         //print(inByte);
  //   			// store it in a global variable:
  //               //print(inByte)
  //   			//inData = inByte;
  //         let flag=0;

  //               check[checkIndex]=inByte;
  //               checkIndex++;
  //               //print(checkIndex)

  //               if (checkIndex>=5){

  //                 //print(check[0], check[1], check[2], check[3], check[4])

  //                 if (check[0]==check[1] && check[0]==check[2] && check[0]==check[3] && check[0]==check[4]){
  //                   flag=1;
  //                   inData=5;

  //                 } 
  //                else{

  //                 flag=0;
  //                 if (check[0]!=5)
  //                     inData=check[0]
  //                   else if (check[1]!=5)
  //                     inData=check[1];
  //                }
                 
                  
  //                  //print(flag, inData)
  //                 checkIndex=0;
  //               }

  //               // if (checkIndex>3){
  //               //     let tempa, tempb, tempc;
  //               //     tempa=check[0];
  //               //     tempb=check[1];
  //               //     tempc=check[2];
                   

  //               //     if (tempa==tempb && tempb==tempc){
  //               //         flag=0;
  //               //         inData=5;
  //               //     }

  //               //     else {
  //               //         flag=1;
                    
  //               //         if (tempa!=-1)
  //               //             inData=tempa;
  //               //         else 
  //               //             inData=tempb;


  //               //      }
                        


  //               //     checkIndex=0;
  //               // }

  //              // print("FLAG", flag, "BYTE", inByte);
             
  //  }
   
   function serialError(err) {
     print('Something went wrong with the serial port. ' + err);
   }
   
   function portClose() {
     print('The serial port closed.');
   }
  

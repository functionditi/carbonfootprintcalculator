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

function preload() {
  theFont = loadFont('assets/fonts/HelveticaNeue.ttf');
  theFontSF = loadFont('assets/fonts/SF-Pro.ttf');
  ref = loadImage('assets/images/reference.jpg');
  crest1 = loadImage('assets/images/math-logo.png');
  crest2 = loadImage('assets/images/science-logo.png');
  takeASeat = loadImage('assets/images/takeaseat.png');
  seeHowYouCompare = loadImage('assets/images/comparison.png');
}


function setup() {

  createCanvas(1920, 1080);
  textAlign(LEFT);

 
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

   let foodNum=3.0;
   drawText(convertStr(foodNum), 120, 134, 477, width, height, 29);
   drawText("+", 120, 324.4, 477, width, height, 29);

   let commuteNum=2.2;
   drawText(convertStr(commuteNum), 120, 427, 477, width, height, 29);
   
   let shoppingNum=0.4;
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

   let resultNum=foodNum+commuteNum+shoppingNum+recreationNum+homeNum+travelNum;
   drawTextSF(convertStr(resultNum), 251, 1143, 780.5, width, height, 29);

   drawText("Tonnes of\nCO2 / year", 44, 1562, 628.5, 300, height, 40);

   image(takeASeat, 1562, 723);

   drawText("See How You Compare", 22, 1166, 859, 300, height, 40);

   image(seeHowYouCompare, 1166, 874);

   drawText("Source: https://whatismycarbonfootprint.com/sg", 10.46, 727, 1042, 300, height, 40);


  

   //end of result section



  if (mouseIsPressed === true){
    image(ref, 0, 0);
  }
  
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


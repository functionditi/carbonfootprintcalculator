let table;
let foodval=0, commval=0, shopval=0, recval=0, homeval=0, travval=0;
let totval;

var serial;   // variable to hold an instance of the serialport library
var portName = '/dev/tty.usbmodem141201';    // fill in your serial port name here
var inData;   // variable to hold the input data from Arduino

let check=[];
let checkIndex=0;
let flag=0;

function preload() {
    table = loadTable("carbonestimator.csv", "csv", "header");
}

function setup() {
    //count the columns
    // createCanvas(windowWidth, windowHeight);
    // background(0);
    // print(table.getRowCount() + ' total rows in table');
    // print(table.getColumnCount() + ' total columns in table');
  
    // print(table.getColumn('name'));
    //["Goat", "Leopard", "Zebra"]
  
    //cycle through the table
    for (let r = 0; r < table.getRowCount(); r++)
      for (let c = 0; c < table.getColumnCount(); c++) {
        print(table.getString(r, c));
      }

    //set up communication port
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
   
  }

  function draw(){

    
    //print(inData);

    if (inData==0){
        let r=inData;
        for (let c = 0; c < table.getColumnCount(); c++) {
            //print(table.getString(r, c));
            foodval=table.getNum(r, 3);
            document.getElementById("food-value").innerHTML = foodval;
          }
       
    }
    else if (inData==1){
        let r=inData;
        for (let c = 0; c < table.getColumnCount(); c++) {
            //print(table.getString(r, c));
            foodval=table.getNum(r, 3);
            document.getElementById("food-value").innerHTML = foodval;
          }
       
    }
    else if (inData==2){
        let r=inData;
        for (let c = 0; c < table.getColumnCount(); c++) {
            //print(table.getString(r, c));
            foodval=table.getNum(r, 3);
            document.getElementById("food-value").innerHTML = foodval;
          }
       
    }
    else if (inData==3){
        let r=inData;
        for (let c = 0; c < table.getColumnCount(); c++) {
            //print(table.getString(r, c));
            foodval=table.getNum(r, 3);
            document.getElementById("food-value").innerHTML = foodval;
          }
       
    }
    else if (inData==5){
        document.getElementById("food-value").innerHTML =0;
    }
    serialEvent();
    
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
    //  inData = Number(serial.read());
    //  //console.log(Number(serial.read()));
    	  		// read a byte from the serial port:
    			var inByte = serial.read();
    			// store it in a global variable:
                //print(inByte)
    			//inData = inByte;

                check[checkIndex]=inByte;
                checkIndex++;

                if (checkIndex>3){
                    let tempa, tempb, tempc;
                    tempa=check[0];
                    tempb=check[1];
                    tempc=check[2];


                    if (tempa==tempb && tempb==tempc){
                        flag=0;
                        inData=5;
                    }

                    else {
                        flag=1;
                        if (tempa!=-1)
                            inData=tempa;
                        else 
                            inData=tempb;


                    }
                        


                    checkIndex=0;
                }

                //print("FLAG", flag);
                print("DATA", inData);

                // if (frameCount%100==0){
                //     let temp;
                //     inData=temp;
                //     print("im doing somthing")
                // }
   }
   
   function serialError(err) {
     print('Something went wrong with the serial port. ' + err);
   }
   
   function portClose() {
     print('The serial port closed.');
   }



   function keyPressed(){
    let r=keyCode-65;
   
    if (keyCode>=65 && keyCode<69){
        for (let c = 0; c < table.getColumnCount(); c++) {
            print(table.getString(r, c));
            foodval=table.getNum(r, 3);
            document.getElementById("food-value").innerHTML = foodval;
          }
       
    }
    if (keyCode>=69 && keyCode<73){
        for (let c = 0; c < table.getColumnCount(); c++) {
            print(table.getString(r, c));
            commval=table.getNum(r, 3);
            document.getElementById("commute-value").innerHTML = commval;
          }
       
    }
    if (keyCode>=73 && keyCode<77){
        for (let c = 0; c < table.getColumnCount(); c++) {
            print(table.getString(r, c));
            shopval=table.getNum(r, 3);
            document.getElementById("shopping-value").innerHTML = shopval;
          }
       
    }

    if (keyCode>=77 && keyCode<81){
        for (let c = 0; c < table.getColumnCount(); c++) {
            print(table.getString(r, c));
            recval=table.getNum(r, 3);
            document.getElementById("recreational-value").innerHTML = recval;
          }
       
    }

    if (keyCode>=81 && keyCode<85){
        for (let c = 0; c < table.getColumnCount(); c++) {
            print(table.getString(r, c));
            homeval=table.getNum(r, 3);
            document.getElementById("home-value").innerHTML = homeval;
          }
       
    }

    if (keyCode>=85 && keyCode<89){
        for (let c = 0; c < table.getColumnCount(); c++) {
            print(table.getString(r, c));
            travval=table.getNum(r, 3);
            document.getElementById("travel-value").innerHTML = travval;
          }
       
    }
 totval=foodval+commval+shopval+recval+homeval+travval;
 document.getElementById("total-value").innerHTML = totval;

    
  }
   
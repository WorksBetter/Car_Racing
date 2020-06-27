const GROUNDSPEED_DECAY_MULT = 0.94;

const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function carClass() {
    this.carX = 75;
    this.carY = 75;

    this.keyHeld_Gas  =  false;  
    this.keyHeld_Reverse  =  false;  
    this.keyHeld_TurnLeft  =  false;  
    this.keyHeld_TurnRight  =  false;

    this.setupControls = function(forwardKey, backKey, leftKey, rightKey) { 
        this.controlKeyForGas  =  forwardKey;    
        this.controlKeyForReverse  =  backKey;    
        this.controlKeyForTurnLeft  =  leftKey;    
        this.controlKeyForTurnRight  =  rightKey;
    }

    this.carInit  =   function(whichGraphic, whichName)  {        
        this.myBitmap  =  whichGraphic;    
        this.myName  =  whichName;    
        this.carReset();
    }

    this.carReset  =   function()  {  
        this.carSpeed  =  0;    
        this.carAng  =  -0.5 * Math.PI;  

        if (this.homeX  ==  undefined)  {      
            for (var  i = 0;  i < trackGrid.length;  i++)  {        
                if ( trackGrid[i]  ==  TRACK_PLAYER)  {          
                    var  tileRow  =  Math.floor(i / TRACK_COLS);          
                    var  tileCol  =  i % TRACK_COLS;          
                    this.homeX  =  tileCol  *  TRACK_W  +  0.5 * TRACK_W;          
                    this.homeY  =  tileRow  *  TRACK_H  +  0.5 * TRACK_H;          
                    trackGrid[i]  =  TRACK_ROAD;          
                    break;  // found  it,  so  no  need  to  keep  searching          
                }  //	end  of  if       
            }  //	end  of  for     
        }  //	end  of  if  car  position  not  saved  yet     
        this.carX  =  this.homeX;    
        this.carY  =  this.homeY;  
    }

    this.carMove = function() {
        var  nextX  =  this.carX  +  Math.cos(this.carAng)  *  this.carSpeed; 
        var  nextY  =  this.carY  +  Math.sin(this.carAng)  *  this.carSpeed; 
        var  drivingIntoTileType  =  getTrackAtPixelCoord(nextX, nextY);

        if (drivingIntoTileType  ==  TRACK_ROAD ) {
            this.carX  =  nextX;
            this.carY  =  nextY;
        } else if ( drivingIntoTileType  ==  TRACK_GOAL) {
            alert(this.myName + " Won!");  

            p1.keyHeld_Gas  =  false;  
            p1.keyHeld_Reverse  =  false;  
            p1.keyHeld_TurnLeft  =  false;  
            p1.keyHeld_TurnRight  =  false;

            p2.keyHeld_Gas  =  false;  
            p2.keyHeld_Reverse  =  false;  
            p2.keyHeld_TurnLeft  =  false;  
            p2.keyHeld_TurnRight  =  false;

            p1.carReset();
            p2.carReset();  
        } else {
            this.carSpeed = -0.5 * this.carSpeed;
        }
        if (this.keyHeld_Gas) {
            this.carSpeed += DRIVE_POWER;
        } else if (this.keyHeld_Reverse) {
            this.carSpeed -= REVERSE_POWER;
        } else if (this.keyHeld_TurnLeft && Math.abs(this.carSpeed) >= MIN_TURN_SPEED) {
            this.carAng += -TURN_RATE * Math.PI;
        } else if (this.keyHeld_TurnRight && Math.abs(this.carSpeed) >= MIN_TURN_SPEED) {
            this.carAng += TURN_RATE * Math.PI;
        }

        this.carSpeed *= GROUNDSPEED_DECAY_MULT;
    }

    this.carDraw = function() {
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAng);
    }
}
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

var trackCounter = 0;

var trackGrid = [ 4,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  4,         4,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,         1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,         1,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1,         1,  0,  0,  0,  1,  1,  1,  4,  4,  4,  4,  1,  1,  1,  1,  1,  1,  0,  0,  1,         1,  0,  0,  1,  1,  0,  0,  1,  4,  4,  1,  1,  0,  0,  0,  1,  1,  0,  0,  1,         1,  0,  0,  1,  0,  0,  0,  0,  1,  4,  1,  0,  0,  0,  0,  0,  1,  0,  0,  1,         1,  0,  0,  1,  0,  0,  0,  0,  0,  1,  1,  0,  0,  0,  0,  0,  1,  0,  0,  1,         1,  2,  2,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  5,  0,  0,  1,  0,  0,  1,         1,  0,  0,  1,  0,  0,  5,  0,  0,  0,  5,  0,  0,  1,  0,  0,  1,  0,  0,  1,         1,  1,  1,  1,  0,  0,  1,  1,  0,  0,  0,  0,  0,  1,  0,  0,  5,  0,  0,  1,         1,  1,  5,  1,  0,  0,  1,  1,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,         0,  3,  0,  0,  0,  0,  1,  4,  1,  1,  0,  0,  1,  1,  0,  0,  0,  0,  0,  1,         0,  3,  0,  0,  0,  0,  1,  4,  4,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1,  1,         1,  1,  5,  1,  1,  1,  1,  4,  4,  4,  4,  4,  4,  1,  1,  1,  1,  1,  1,  1];
const  TRACK_ROAD  =  0;  
const  TRACK_WALL  =  1;  
const  TRACK_PLAYER  =  2;
const  TRACK_GOAL  =  3;  
const  TRACK_TREE  =  4;  
const  TRACK_FLAG  =  5;

function  drawTracks()  {    
    var  trackIndex  =  0;    
    var  trackLeftEdgeX  =  0;    
    var  trackTopEdgeY  =  0;        
    for (var  eachRow = 0;  eachRow < TRACK_ROWS;  eachRow++)  {  //	deal  with  one  row  at  a  time           
        trackLeftEdgeX  =  0;  //	resetting  horizontal  draw  position  for  tiles  to  left  edge             
        for (var  eachCol = 0;  eachCol < TRACK_COLS;  eachCol++)  {  //	left  to  right  in  each  row              
            var  trackTypeHere  =  trackGrid[trackIndex];  //	getting  the  track  code  here         
            canvasContext.drawImage(trackPics[trackTypeHere],  trackLeftEdgeX,  trackTopEdgeY);                
            trackIndex++;  //	increment  which  index  we 're	 going  to  next  check  in  the  track         
            trackLeftEdgeX  +=  TRACK_W;  // jump  horizontal  draw  to  next  tile  over  by  tile  width               
        }  //	end  of  for  eachCol             
        trackTopEdgeY  +=  TRACK_H;  //	jump  horizontal  draw  down  by  one  tile  height           
    }  //	end  of  for  eachRow   
}  //	end  of  drawTracks()

function checkForAndremoveTrackAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TRACK_W;
    var tileRow = pixelY / TRACK_H;

    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    if (tileRow < 0 || tileRow >= TRACK_ROWS ||
        tileCol < 0 || tileCol >= TRACK_COLS) {
        return;
    }
    var trackIndex = trackTileToIndex(tileCol, tileRow);
    if (trackGrid[trackIndex] == 1) {
        trackGrid[trackIndex] = 0;
        trackCounter--;
        return true;
    } else {
        return false;
    }
}

function trackTileToIndex(tileCol, tileRow) {
    return (tileCol + TRACK_COLS * tileRow);
}

function getTrackAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TRACK_W;
    var tileRow = pixelY / TRACK_H;

    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    if (tileRow < 0 || tileRow >= TRACK_ROWS ||
        tileCol < 0 || tileCol >= TRACK_COLS) {
        return TRACK_WALL;
    }

    var trackIndex = trackTileToIndex(tileCol, tileRow);

    return  trackGrid[trackIndex];
}

function isWallAtTileCoord(trackTileCol, trackTileRow) {
    var trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
    return (trackGrid[trackIndex] == TRACK_WALL);
}
var canvas;
var canvasContext;

var p1 = new carClass();
var p2 = new carClass();

var showingWinScreen = false;

window.onload = function() {

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');

    this.p2.carInit(car2Pic, "Blue Car");
    this.p1.carInit(carPic, "Red Car");

    initInput();

    p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
    p2.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D);

    loadImages();
}

function loadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
    canvasContext.font = "30px Verdana";
    p1.carReset();
    p2.carReset();
}

function moveEverything() {
    p1.carMove();
    p2.carMove();
}

function drawEverything() {

    if (showingWinScreen) {

        canvasContext.fillStyle = 'hotpink';
        canvasContext.fillText("Well Done!", 285, 200);
        canvasContext.fillStyle = 'purple';
        canvasContext.fillText("Click to Continue", 285, 450);
        return;
    }

    drawTracks();

    p1.carDraw();
    p2.carDraw();
}
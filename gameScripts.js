var score=0;
var isMute = false;
//var kingAudio = new Audio('King.mp3'), knockAudio = new Audio('Knock.mp3'), matchAudio = new Audio('match.mp3');

var canvas;
var ctx;
var width;
var height;

var ballDir=1;
var userDir=0;
var compDir=0;
var gameSpeed=2;

var userLoc, compLoc, ballXLoc, ballYLoc;

var gameLoop

function newGame()
{
	canvas = document.getElementById("myCanvas");
	canvas.width=screen.availWidth*.98;
	canvas.height=screen.availHeight*.899;
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	userLoc = height*.45-10;
	compLoc = height*.5-10;
	ballXLoc = width*.06-10;
	ballYLoc = height*.5-10;
    gameOver = false;
    drawBoard();
    // fillBoard();
    // makePiecesDraggable();
    // makeMouseUpDetectable();
    // lastPlayer="null";
    // locationCount=1;
    // isMute = false;
    // multPossible = false;
//	gameLoop= setInterval(move,5);
	
}
function toggleFullScreen() 
{
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) 
	{
		if (canvas.requestFullscreen) 
		{
			canvas.requestFullscreen();
		} 
		else if (canvas.mozRequestFullScreen) 
		{
			canvas.mozRequestFullScreen();
		} 
		else if (canvas.webkitRequestFullscreen) 
		{
			canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} 

}
function drawBoard()
{
    ctx.fillStyle = "#D3D3D3";
    ctx.fillRect(0,0,width,height);
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,height*.95,width,15);
	ctx.fillRect(0,height*.05,width,15);
    // ctx.strokeStyle = "#98999A";
    // for(var i=100;i<=800;i+=100)
    // {
        // ctx.moveTo(0,i);
        // ctx.lineTo(800,i);
      // //  ctx.stroke();
    // }
	// ctx.stroke();
	drawUser();
	drawBall();
	drawComp();
}

function drawUser()
{
	ctx.fillStyle = "#000000";
	userLoc=userLoc+gameSpeed*userDir;
	if(userLoc>height*.95-175)
	{
		userLoc=height*.95-175;
	}
	else if(userLoc<height*.05)
	{
		userLoc=height*.05;
	}
	ctx.fillRect((width*.96)-10,userLoc,50,175);
}

function drawComp()
{
	ctx.fillStyle = "#000000";
	ctx.fillRect((width*.02),compLoc,50,175);
}

function drawBall()
{
	ctx.fillStyle = "#000000";
	if((ballYLoc-userLoc<=175&&userLoc-ballYLoc<=25&&Math.abs(ballXLoc-(width*.96-10))<3)||(ballYLoc-compLoc<=175&&compLoc-ballYLoc<=25&&Math.abs(ballXLoc-(width*.02+50))<3))
	{
		ballDir*=-1;
	}
	ballXLoc=ballXLoc + gameSpeed*ballDir;
	ctx.fillRect(ballXLoc,ballYLoc,25,25);
	if(ballXLoc>width||ballXLoc<-10)
	{
		newGame();
	}
}
function move()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBoard();
	// userDir=0;
	// compDir=0;
	// gameSpeed=5;
	//requestAnimationFrame(move);
	
}
function mute()
{
    var holder = document.getElementById("soundHolder");
    if(isMute)
    {
       holder.style.backgroundPosition = "0px 0px";
    }
    else
    {
       holder.style.backgroundPosition = "60px 0px";
    }
    isMute = !isMute;
    playSound("match");
}

function playSound(soundType)
{
    if(!isMute)
    {
        if(soundType == "match")
        {
            matchAudio.play();
        }
        else if(soundType == 'Knock')
        {
           knockAudio.play(); 
        }
        else if(soundType == "King")
        {
            kingAudio.play(); 
        }
    }
}
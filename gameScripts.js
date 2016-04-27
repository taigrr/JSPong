var score=0;
var difficulty=1;
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

var userSpeed=0;
var compSpeed=0;
var ballSpeed=0;
var userTimerCount=0;
var compTimerCount=0;

var userLoc, compLoc, ballXLoc, ballYLoc;

var gameLoop;

function newGame()
{
	ballDir=1;
	userDir=0;
	compDir=0;
	gameSpeed=2;
	userSpeed=0;
	compSpeed=0;
	ballSpeed=0;
	userTimerCount=0;
	compTimerCount=0;
	canvas = document.getElementById("myCanvas");
	canvas.width=screen.availWidth*.98;
	canvas.height=screen.availHeight*.899;
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	userLoc = height*.45-10;
	compLoc = height*.5-10;
	ballXLoc = width*.45-10;
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
	compLoc=compLoc+gameSpeed*difficulty/3*compDir;
	if(compLoc>height*.95-175)
	{
		compLoc=height*.95-175;
	}
	else if(compLoc<height*.05)
	{
		compLoc=height*.05;
	}
	ctx.fillRect((width*.02),compLoc,50,175);
}

function drawBall()
{
	if(userTimerCount>0.3)
	{
		userSpeed=0;
	}
	if(compTimerCount>0.3)
	{
		compSpeed=0;
	}
	ctx.fillStyle = "#000000";
	if((ballYLoc-userLoc<=175&&userLoc-ballYLoc<=25&&Math.abs(ballXLoc-(width*.96-10))<3))
	{
		ballDir*=-1;
		ballSpeed+=userSpeed;
		if(ballSpeed*userSpeed>=0)
		{
			// ballSpeed*=-1;
		}
		console.log(ballSpeed);
		console.log(ballYLoc+ballSpeed);
	}
	else if((ballYLoc-compLoc<=175&&compLoc-ballYLoc<=25&&Math.abs(ballXLoc-(width*.02+50))<3))
	{
		ballDir*=-1;
		ballSpeed+=compSpeed;
		console.log(ballSpeed);
	}
	
	if(Math.abs(ballYLoc-height*.05)<25||Math.abs(ballYLoc-height*.95)<25)
	{
		ballSpeed*=-1;
	}
	
	ballXLoc=ballXLoc + gameSpeed*ballDir;
	ballYLoc+=ballSpeed;
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
	if(ballDir==-1)
	{
		moveAI();
	}
	else 
	{
		compDir=0;
	}
}
function moveAI()
{
	if((ballYLoc>compLoc+175/2)&&(compLoc<height*.95-175))
	{
		compDir=1;
	}
	else if((ballYLoc<compLoc+175/2)&&(compLoc>height*.05-175))
	{
		compDir=-1;
	}
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
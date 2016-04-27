addShortcut(function(){
   toggleFullScreen();   
},[key.F]);
addShortcut(function(){
    userDir=-1;
	if(userSpeed<0)
	{
		userSpeed=0;
	}
	userTimerCount=0;
	userSpeed-=.25;
},[key.UP]);
addRemovalShortcut(function(){
    userDir=0;
	userTimerCount+=0.01;
},[key.UP]);
addRemovalShortcut(function(){
    userDir=0;    
},[key.DOWN]);
addShortcut(function(){
    userDir=1;
	if(userSpeed>0)
	{
		userSpeed=0;
	}
	userTimerCount=0;
	userSpeed+=.25;    
},[key.DOWN]);


//keep in mind that alert() blocks the keyup event, so if you have problems, include the following in your code:
//to release all keys:

// addShortcut(function(){
    // alert("You pressed the keys Control, Y, and Enter.");
    // releaseAllKeys();
// },[key.CTRL,key.Y,key.ENTER]);
// //This may not be desireable, as the user might still have keys pressed on the keyboard, and this would require the user to let up all keys.
// //It might be better to only release one key, but check out how only releasing select keys might be problematic:
// addShortcut(function(){
    // alert("You pressed the keys 1, 2, and 3.");
	
    // releaseKeys([key.ONE,key.TWO]);
// //   keyStrokes[key.THREE] = false;
// },[key.ONE,key.TWO,key.THREE]);
// //alternatively, usee releaseKey() to release only one key

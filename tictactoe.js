/*
*/
var squares = document.querySelectorAll(".square");
for ( var i = 0; i  < squares.length; i++) {
	squares[i].addEventListener("click", displayMark);	
	/* 
	*/
}  
function displayMark(){
	if (this.innerHTML !=="X" && this.innerHTML !=="O")
	/*
	The function displayMark displays the innerHTML and puts X's and O's on the borad. 
	*/
	
	{
		this.innerHTML = mark;
		rounds++;
	}
	
	roundTracker();
}
var rounds = 0; 
var mark = "X"; 
function roundTracker(){
/* this function roundTracker tracks what round you are on. the switch statment switches between the x or o and displays it on the borad when clicked. 
*/
	switch (rounds % 2) {
		case 0: mark ="X"; break;
		case 1: mark ="O"; break;
		/*
		
		*/
	}
}
function restBoard(){
	for	(var i = 0; i <squares.length; i++) {
		squares[i].innerHTML = "";
	} /* This function resets the borad to 0  and clears the board
	*/
	
	rounds = 0;
	mark ="X";
}
document.getElementById("restButton").addEventListener("click", restBoard); 


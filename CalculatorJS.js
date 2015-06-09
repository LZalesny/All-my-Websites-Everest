var keys = document.querySelectorAll("div.button");
for(var i = 0; i < keys.length; i++){
  keys[i].addEventListener("click", mathify);
}

var output = document.getElementById("display");

var theArray = [];

function oppFinder(screen){
    theArray = screen.split(' ');
    return;
}

function addinator(arr){
    
    switch(arr[1]){
        case "+" : answer = parseFloat(arr[0]) + parseFloat(arr[2]);
            break;
        case "-": answer = parseFloat(arr[0]) - parseFloat (arr[2]); 
            break;
        case "*": answer = parseFloat(arr[0]) * parseFloat (arr[2]);
            break;
        case "/": answer = parseFloat(arr[0]) / parseFloat (arr[2]);
            break;
        case "^": 
            answer = Math.pow(parseFloat(arr[0]), parseFloat(arr[2]));
            break;
        case "root": 
            answer = Math.pow(parseFloat(arr[2]), 1/parseFloat(arr[0]));
            break;
        default: 
            output.innerHTML = "Alex is a dumbAss";
    }
}   

var answer = [];
    
function mathify(){
	if(this.classList.contains("opp")){
		output.insertAdjacentHTML('beforeend', this.innerHTML);
	}
	else if(this.innerHTML === "="){
         oppFinder(output.innerHTML);
        addinator(theArray);
        output.innerHTML =  answer;
	}
	else if(this.innerHTML === "Clear"){
        output.innerHTML = '';
	}
	else{
	output.insertAdjacentHTML('beforeend', this.innerHTML);
	var btnVal = output.innerHTML;
    }       
}        

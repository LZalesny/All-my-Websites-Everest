var keys = document.querySelectorAll("div.button");
for(var i = 0; i < keys.length; i++){
  keys[i].addEventListener("click", mathify);
  
}

function math(){
    case
    case
    case
}


var output = document.getElementById("display");

function mathify(){
	if(this.classList.contains("opp")){
		output.insertAdjacentHTML('beforeend', this.innerHTML);
	}
	else if(this.innerHTML === "="){

	}
	else if(this.innerHTML === "Clear"){
        output.innerHTML = '';
	}
	else{
	output.insertAdjacentHTML('beforeend', this.innerHTML);
	var btnVal = output.innerHTML;
var keyOne = document.getElementById("one");
keyOne.addEventListener("click", mathify);


var output = document.getElementById("display");

function mathify(){
	if(this.classList.contains("opp")){
		output.insertAdjacentHTML('beforeend', this.innerHTML);
	}
	else if(this.innerHTML === "="){

	}
	else if(this.innerHTML === "Clear"){

	}
	else{
	output.insertAdjacentHTML('beforeend', this.innerHTML);
	var btnVal = output.innerHTML;

}
}
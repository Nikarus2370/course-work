let num1;
let num2;
let numTries;

function startGame() { 
	num1 = "NaN";
	num2 = "NaN";
	numTries = 0;
	var myText = document.getElementById("myText");
	var myButton = document.getElementById("myButton");
	myText.innerHTML = "Enter the first number";
	myButton.innerHTML = "Enter";
	myButton.setAttribute("onClick", "javascript: enterFirstNum();");
	var myInput = document.createElement("INPUT");
    myInput.setAttribute("type", "text");
	myInput.setAttribute("id" , "myInput");
	myInput.setAttribute("class", "myInput");
    myInput.setAttribute("value", "");
    document.body.insertBefore(myInput, myButton);
}

function enterFirstNum() {
	var myText = document.getElementById("myText");
	var myButton = document.getElementById("myButton");
	var myInput = document.getElementById("myInput");
	
	num1 = myInput.value;
	
	if (isNaN(parseInt(num1))){
		myInput.value = "Enter a real number";
	}
	else{
		myButton.setAttribute("onClick", "javascript: enterSecondNum();");
		myText.innerHTML = "Enter second number";
		myInput.value = "";
	}
	
}

function enterSecondNum() {
	var myText = document.getElementById("myText");
	var myButton = document.getElementById("myButton");
	var myInput = document.getElementById("myInput");
	
	numTries++;
	num2 = myInput.value;
	if (isNaN(parseInt(num2))){
		myInput.value = "Enter a real number";
	}
	else{
		myButton.setAttribute("onClick", "javascript: enterSecondNum();");
		myText.innerHTML = "Enter second number";
		myInput.value = "";
		myButton.setAttribute("onClick", "javascript: tryAgain();");
		checkWin();
	}
}

function tryAgain() {
	var myText = document.getElementById("myText");
	var myButton = document.getElementById("myButton");
	var myInput = document.getElementById("myInput");
	
	
	numTries++;
	num2 = myInput.value;
	if (isNaN(parseInt(num2))){
		myInput.value = "Enter a real number";
	}
	else{
		myButton.setAttribute("onClick", "javascript: enterSecondNum();");
		myText.innerHTML = "Enter second number";
		myButton.setAttribute("onClick", "javascript: tryAgain();");
		checkWin();
	}
}

function checkWin() {
	var myText = document.getElementById("myText");
	var myButton = document.getElementById("myButton");
	var myInput = document.getElementById("myInput");
	var myBody = document.getElementById("myBody");
	
	if (parseInt(num1) > parseInt(num2)) {
	myText.innerHTML = "Your guess was low. Enter another number";
	myInput.value = "";
	}
	else if (parseInt(num1) < parseInt(num2)) {
	myText.innerHTML = "Your guess was high. Enter another number";
	myInput.value = "";
	}
	else {
		myText.innerHTML = "Both numbers are the same. Congratulations, you win. It took you " + numTries + " tries.";
		myButton.setAttribute("onClick", "javascript: startGame();");
		myButton.innerHTML = "Play again?";
		myBody.removeChild(myInput);
	}
}
"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";
	var num1;
	var num2;
	var numTries;
	
	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		$('#myButton').on('click', startGame);
	};
	
	function startGame() { 
		num1 = "NaN";
		num2 = "NaN";
		numTries = 0;
		$('#myText').text("Enter the first number");
		$('#myButton').text("Enter");
		$('#myButton').off('click', startGame);
		$('#myButton').on('click', enterFirstNum);
		var myInput = document.createElement("INPUT");
		myInput.setAttribute("type", "text");
		myInput.setAttribute("id" , "myInput");
		myInput.setAttribute("class", "myInput");
		myInput.setAttribute("value", "");
		document.getElementById('main').insertBefore(myInput, myButton);
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
			$('#myButton').off('click', enterFirstNum);
			$('#myButton').on('click', enterSecondNum);
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
			$('#myButton').off('click', enterSecondNum);
			$('#myButton').on('click', tryAgain);
			myText.innerHTML = "Enter second number";
			myInput.value = "";
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
			myText.innerHTML = "Enter second number";
			checkWin();
		}
	}

	function checkWin() {
		var myText = document.getElementById("myText");
		var myButton = document.getElementById("myButton");
		var myInput = document.getElementById("myInput");
		var myMain = document.getElementById("main");
		
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
			$('#myButton').off('click', tryAgain);
			$('#myButton').on('click', startGame);
			myButton.innerHTML = "Play again?";
			myMain.removeChild(myInput);
		}
	}
	
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});

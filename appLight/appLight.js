function myFunction() {
  var mySwitch = document.getElementById("mySwitch");
  var myText = document.getElementById("myText");
  var myBody = document.body;
  var switchMargin = mySwitch.style.marginLeft;
  //alert(switchMargin);
  
  if (switchMargin == "25px" || !switchMargin ) {
      mySwitch.style.marginLeft = "225px";
	  myText.style.color = "black";
      myText.innerHTML = "Switch is now on";
	  document.body.style.backgroundColor = "white";
	  
  }
  else if (switchMargin == "225px") {
      mySwitch.style.marginLeft = "25px";
	  myText.style.color = "white";
      myText.innerHTML = "Switch is now off";
	  document.body.style.backgroundColor = "black";
  }
  
}
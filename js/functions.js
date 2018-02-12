/*

Functions and code declared in this file are for user controlled aspects of VTT.

*/

// Final Output String
var str;

// Verification Code gen
var verif;
var redCheck;

// Switches
var spacesOn = true;
var mouse_is_down = false;
var current_i = 0;    

// Elements
var boxFrame = document.getElementById("boxframe");
var wrapperElement = document.getElementById("wrapper");
var boxInputsTextAreas = document.getElementsByTagName('TEXTAREA');
var boxInputsText = document.getElementsByClassName("inputText");
var boxInputsNumeric = document.getElementsByClassName("inputNumeric");
var boxInputsCheckbox = document.getElementsByClassName("inputCheckbox");

// Buttons
var copyButton = document.querySelector("#copy-button");
var spacesButton = document.querySelector("#space-button");
var resetButton = document.querySelector("#reset-button");


// Time-delay Reset Button
resetButton.onmousedown = function(){
    mouse_is_down = true;
    
    setTimeout(
        (function(index){
            return function(){
                if(mouse_is_down && current_i === index){
                    //do thing when hold

			document.getElementById("template-form").reset();

			resetButton.innerText = "Reset!";
			resetButton.className = "button-slow";
			setTimeout(function(){
				document.getElementById("reset-button").style.color = "#3b5166"
				setTimeout(function(){
					resetButton.className = "button-fast"
					resetButton.innerText = "Hold to Reset";
					resetButton.style.color = "#FFFFFF";
				}, 700);
			}, 500);
                    
                };
            };
        })(++current_i), 1000); // time you want to hold before fire action
};

resetButton.onmouseup = function(){
    mouse_is_down = false;
    current_i++;
    
};


//Toggle linebreaks button
spacesButton.onclick = function(){
	if (spacesOn == true) {
		spacesButton.title = "Turn spacers on"
		spacesButton.style.backgroundImage = "url('./img/spaces-white-off.png')";
		spacesOn = false;
	} else {
		spacesButton.title = "Turn spacers off"
		spacesButton.style.backgroundImage = "url('./img/spaces-white-on.png')";
		spacesOn = true;
	};
};

//Debug Menu "fill lines with test"
function fillBlanks() {
	var i;
	for (i = 0; i < boxInputsText.length; i++) {
		boxInputsText[i].value = (boxInputsText[i].tagName == 'TEXTAREA') ? "Test Line 1\r\nTest Line 2\r\nTest Line 3" : "Test Line";
	};

	for (i = 0; i < boxInputsNumeric.length; i++) {
		boxInputsNumeric[i].value = "101";
	};

	document.getElementById("carrier").value = "None"

};

// Check if box contains pound sign and add if not
function checkCurrencyInd(stringForChecking) {

	if (stringForChecking != "") {
		return (stringForChecking.indexOf("£") == -1) ? "£" + stringForChecking : stringForChecking;
	} else {
		return stringForChecking;
	};

};

// Code for adding box contents to STR for output.
function processFlow() {

// Convert checkboxes to English readable output

boxInputsCheckbox[0].value = (boxInputsCheckbox[0].checked == true) ? "Yes" : "No";
boxInputsCheckbox[1].value = (boxInputsCheckbox[1].checked == true) ? "Yes" : "No";

if (boxInputsText[1].value == "Please select") {

	alert("Please select underwriter first!");

} else {

// String Start and how cover details obtained
str = boxInputsText[0].label.innerHTML + boxInputsText[0].value + (spacesOn == true ? "\r\n\r\n" : "\r\n")
verif = boxInputsText[0].value.charAt(0) + boxInputsText[0].value.charAt(1)

// Underwriter
str += boxInputsText[1].label.innerHTML + boxInputsText[1].value + "\r\n" 
verif += boxInputsText[1].value.charAt(0) + boxInputsText[1].value.charAt(1)

// Scheme
str += boxInputsText[2].label.innerHTML + boxInputsText[2].value + (spacesOn == true ? "\r\n\r\n" : "\r\n") 
verif += boxInputsText[2].value.charAt(0) + boxInputsText[2].value.charAt(1)

// Inception or Renewal Date
str += boxInputsText[3].label.innerHTML + boxInputsText[3].value + "\r\n"

// Joint Policy Holders
str += boxInputsTextAreas[0].label.innerHTML + boxInputsTextAreas[0].value.replace(/\n\r?/g, "\r\n") + (spacesOn == true ? "\r\n\r\n" : "\r\n")

// Buildings SI
str += boxInputsNumeric[0].label.innerHTML + checkCurrencyInd(boxInputsNumeric[0].value) + " - "
verif += checkCurrencyInd(boxInputsNumeric[0].value).charAt(1)

// Buildings AD
str += boxInputsCheckbox[0].label.innerHTML + boxInputsCheckbox[0].value + "\r\n"

// Contents SI
str += boxInputsNumeric[1].label.innerHTML + checkCurrencyInd(boxInputsNumeric[1].value) + " - "
verif += checkCurrencyInd(boxInputsNumeric[1].value).charAt(1)


// Contents AD
str += boxInputsCheckbox[1].label.innerHTML + boxInputsCheckbox[1].value + "\r\n"

// T&A Cover
str += boxInputsNumeric[2].label.innerHTML + checkCurrencyInd(boxInputsNumeric[2].value) + "\r\n"

// PP/PB SI
str += boxInputsNumeric[3].label.innerHTML + checkCurrencyInd(boxInputsNumeric[3].value) + "\r\n"

// Unspecified Cover SI
str += boxInputsNumeric[4].label.innerHTML + checkCurrencyInd(boxInputsNumeric[4].value) + "\r\n" 

// Specified Cover/Items
str += boxInputsTextAreas[1].label.innerHTML + boxInputsTextAreas[1].value.replace(/\n\r?/g, "\r\n") + (spacesOn == true ? "\r\n\r\n" : "\r\n")

// Standard Excess values
str += boxInputsText[6].label.innerHTML + boxInputsText[6].value + "\r\n" 

// Voluntary Excess values
str += boxInputsNumeric[5].label.innerHTML + checkCurrencyInd(boxInputsNumeric[5].value) + (spacesOn == true ? "\r\n\r\n" : "\r\n")

// Previous Claims
str += boxInputsTextAreas[2].label.innerHTML + boxInputsTextAreas[2].value.replace(/\n\r?/g, "\r\n") + "\r\n"

// Endorsements
str += boxInputsTextAreas[3].label.innerHTML + boxInputsTextAreas[3].value.replace(/\n\r?/g, "\r\n");

// Prize draw code - arguments are Min number, Max number, verification string to display as code
if (today >= ssnl2512GameStartDate && today <= ssnl2512EndDate ){ randomChanceGame(1,10,verif) };

clipboard.copy(str).then(
	function(){
		copyButton.innerText = "Copied!";
		copyButton.className = "button-slow";
		setTimeout(function(){
			copyButton.style.color = "#3b5166"
			setTimeout(function(){
				copyButton.className = "button-fast"
				copyButton.innerText = "Copy to Clipboard";
				copyButton.style.color = "#FFFFFF";
			}, 700);
		}, 500);
	},
	function(err){
		copyButton.innerText = "Failed :(";
		copyButton.className = "button-slow";
		setTimeout(function(){
			copyButton.style.color = "#3b5166"
			setTimeout(function(){
				copyButton.className = "button-fast"
				copyButton.innerText = "Copy to Clipboard";
				copyButton.style.color = "#FFFFFF";
			}, 700);
		}, 500);
	},
);


};

};

function doSlide() {

//	wrapperElement.style.transform = (wrapperElement.style.transform == "translate(-50%, -50%)") ? "translate(-1500px, -50%)" : "translate(-50%, -50%)";

	if (boxFrame.style.transform == "translate(0%, 0%)") {
		boxFrame.style.transform = "translate(-1500px, 0%)";
		document.body.style.animation = "BGSlideToPurple 1500ms ease forwards";
	} else {
		boxFrame.style.transform = "translate(0%, 0%)";
		document.body.style.animation = "BGSlideToBlue 1500ms ease forwards";
	};		

//	document.body.style.animation = (document.body.style.backgroundPosition == "0% 50%") ? "BGSlideToPurple 3s ease" : "BGSlideToBlue 3s ease" ;
//	document.body.style.animation = "BGSlideToPurple 3s ease";

};

function toggleFun() {

	var funbox = document.getElementById("funbox");

	if (funbox.style.animation == "") {
		funbox.style.animation = "funSpin 20s linear infinite";
	} else {
		funbox.style.animation = "";
	};

};

function randomChanceGame(min, max, verCode) {
	if (verCode.substring(0,6) != "TeNoTe") {	
		if (verCode == "BeNoTe11") {
			alert("Congrats, you're a winner! \r\n Show this code to Emma or Sarah for your prize: \r\n" + verCode);
		} else if (redCheck != verCode && verCode.length == 8) {
			redCheck = verCode
			if (Math.floor(Math.random()*(max-min+1)+min) == 1) {
				alert("Congrats, you're a winner! \r\n Show this code to Emma or Sarah for your prize: \r\n" + verCode);
			};
		};
	} else {
				alert("Debug mode popup");
	};
}

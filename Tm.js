
const textArea = document.querySelector(".up");
const originalText  = document.querySelector(".pp").innerHTML;
const theTimer  = document.querySelector("#timer");
var resetButton = document.querySelector("#btn1");
const textBorder = document.querySelector("#colo");
var count = 1;
var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var flag = 0;
var textLenght = originalText.length;
var min;
//Run timer function start here


function runTimer(){

		// if (timer[1] == 30) {
		// 	clearInterval(interval);
		// }
	let currentTime = checkTime(timer[0]) + ":" + checkTime(timer[1]) + ":" + checkTime(timer[2]);
	theTimer.innerHTML = currentTime;
	timer[3]++;

	timer[0] = Math.floor((timer[3]/100)/60);
	timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
	timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
	min = timer[0] + (timer[1]/60);
}

//check timer function here start

function checkTime(a){
		if (a < 10) { 
			a = '0' + a;
		}
		return a;
	}

//showTimer function

function showTimer(){
	let textEnterLength = textArea.value.length;
	if(textEnterLength === 0 && !timerRunning){
		timerRunning = true;
	interval =	setInterval(runTimer, 10);
	}
}

//string macthing function start here

function spellCheck(){
	let textEnter = textArea.value;

	let originalTextMatch = originalText.substring(0,textEnter.length);

	// Count word here

	
	// console.log(textEnter);
	// console.log(originalText);

		if(textEnter == originalText){
	// 		console.log(textEnter);
	// console.log(originalText);
		var g1 = funScore();
		 
		let score = g1/min;
		score = Math.floor(score);
		document.querySelector("#score").innerHTML = score + "wpm";
		document.querySelector("#accuracy").innerHTML = Math.floor((((textLenght - flag)/textLenght)*100)) + "%";
			clearInterval(interval);
			textBorder.style.borderColor = "black";

		}else{
			if (textEnter == originalTextMatch) {

				textBorder.style.borderColor = "green";
			}
			else{
				textBorder.style.borderColor = "red";
				flag++;
			}
		}


}

//function score start here


function funScore(){
	let textEnter = textArea.value;
	for(let i = 0; i < textEnter.length; i++){
		
		if (textEnter[i] == " ") {
			count++;
			console.log(count);
		}
	}
	return count;
}

//resetbutton start here

function reset(){
	console.log('hekk');

	clearInterval(interval);
	interval = null;
	timer = [0,0,0,0];
	timerRunning = false;

	textArea.value = "";
	document.querySelector("#score").innerHTML = "00 wpm";
	document.querySelector("#accuracy").innerHTML = "00 %";
	theTimer.innerHTML = "00:00:00";
	textBorder.style.borderColor = "yellow";

}

//All event listener start here

textArea.addEventListener("keypress",showTimer , false);
textArea.addEventListener("keyup" , spellCheck , false);
resetButton.addEventListener("click", reset, false);

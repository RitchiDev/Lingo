var inColumn = 1;
var inRow = 1;
var Music = new Audio("Music/Music.mp3");
var guess = [];
var box = document.getElementById("box");
var antwoord = words[Math.floor(Math.random()*words.length)];
var answer = 0;
var correctLetters = [antwoord.charAt(0), "", "", "", ""];
var isTyping = false;
console.log(antwoord);

function start(){
	for(var row = 1; row <= 5;  row++){
		var divRow = document.createElement("div");
		divRow.id = ("r" + row);
		box.appendChild(divRow);

		for(var column = 1; column <= 5;  column++){
			var divColumn = document.createElement("div");	
			divColumn.id = ("c" + row + '.' + column);
			divRow.appendChild(divColumn);

			var FirstP = document.createElement("p");
			divColumn.appendChild(FirstP);
		}
	}
	addCorrectLetters();
	isTyping = true;
}

start();

function restart(){
	location.reload();
}

function poof(){
/*als je op de start button drukt zorgt ervoor dat de muziek afspeelt
 en dat je kan typen in de vakjes checkt ook of je naar de volgende colomn kan*/
console.log("Music on");
Music.loop = true;
Music.play();
Music.volume = 1;



	button.style.backgroundColor = "red";
		document.onkeypress = function keylog(event){
			var key = String.fromCharCode(event.keyCode);
			if (key.match(/[a-z]/i) && inColumn <= 5 && isTyping == true) {
				var keyLetter = document.getElementById("c" + inRow + '.' + inColumn++).firstChild;
				keyLetter.innerHTML = key.toUpperCase();
				keyLetter.style.opacity = "1.0";

				guess.push(key)
				console.log(guess)
					if(inColumn > 5){
						setTimeout(function(){
						check();
						guess = [];
						inColumn = 1;
						inRow++;
						if(inRow > 5){
							isTyping= false;
							correctLetters = null;
							setTimeout(function(){
							location.reload();
							}, 500);

						}
						addCorrectLetters();
					
				}, 500);
			}
		}
	}
}

function check(){
    /*kijkt naar de letters die je invoert en kijkt of het gelijk is aan het antwoord 
    het word vervangen met een * als het goed is hierdoor hoef je het maar een keer 
    te laten bekijken*/
	var split = antwoord.split("");
	
	for (var i = 0; i < guess.length; i++){
		if (guess[i] == split[i]) {
			correctLetters[i] = split[i];
			var columns = document.getElementById("c" + inRow + "." +(i+1));
			columns.style.backgroundColor = "green";
			guess[i] = "";
			split[i] = "*";
		}
	}
	if (checkAllValues(split, "*") == true){
		isTyping = false;
		correctLetters  = null;
		setTimeout(function(){
			alert("Gefeliciteerd! je hebt gewonnen.");
			location.reload();
		}, 500);
	}
	for(var i =0; i< guess.length; i++){
		for(j = 0; j < 5 ;j++){
			if(guess[i] == split[j]){
				var columns = document.getElementById("c" + inRow + "." +(i+1));
				columns.style.backgroundColor = "yellow";
				columns.style.borderRadius = "100px";
				guess[i] = ""
				split[j] = "*"
			}
		}
	}
}

function addCorrectLetters(){
	/* zet de letter die goed is in de volgende rij maar is een beetje doorzichtig*/
	if (correctLetters != null){
		for (var i = 0; i < 5; i++){
			var column = document.getElementById("c" + inRow + "." + (i+1)).firstChild;
			column.style.opacity = "0.5";
			column.innerHTML = correctLetters[i].toUpperCase();
		}
	}
}

function checkAllValues(myArray, symbol){
	for (var i = 0; i < 5; i++){
		if (myArray[i] != symbol){
			return false;
		}
	}
	return true;
}
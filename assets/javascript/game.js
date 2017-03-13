    alert("For optimal viewing, please play in full screen");

    var wins = 0;
    var losses = 0;
    var audioLoser = new Audio("assets/audio/loserclip.mp3");
    var audioWin = new Audio("assets/audio/winclip.mp3");
    var audioWrong = new Audio("assets/audio/punch.mp3");
    var audioCorrect = new Audio("assets/audio/ohyeah.mp3");
    var noLetter = new Audio("assets/audio/wrong.mp3");
    begin("");

// This starts off the game, and happens every time a new word is displayed
 	  function begin (gameStart) {
      
    var options = ["THE WINTER SOLDIER", "THOR", "CAPTAIN AMERICA", "GUARDIANS OF THE GALAXY", "DOCTOR STRANGE", "TONY STARK", "BRUCE BANNER", "LOKI", "PEGGY CARTER", "THANOS", "NICK FURY", "GROOT", "SUPERMAN", "DRAX THE DESTROYER", "ULTRON", "BLACK WIDOW", "STORM", "SCARLET WITCH", "JEAN GREY", "ELEKTRA", "ROGUE", "MAGNETO", "DORMAMMU", "GREEN GOBLIN", "HUMAN TORCH", "INVISIBLE WOMAN", "GHOST RIDER", "LUKE CAGE", "SILVER SURFER", "CYCLOPS", "WOLVERINE", "DEADPOOL", "CAPTAIN MARVEL", "HAWKEYE", "DAREDEVIL", "HOWARD THE DUCK", "BLADE", "PHIL COULSON", "RONAN THE ACCUSER", "APOCALYPSE", "INCREDIBLE HULK" ];

    var secretWord = options[Math.floor(Math.random() * options.length)];
    var l = secretWord.length;
    var blankWord = [];
    var blankWordStr = "";
    var lettersGuessed = [];
    var guesses = 12;
    var win = 0;
    var gameOver = 0;
	
    // This function controls the user's guesses inside of the game
    document.onkeyup = function(start) {

    	document.getElementById("outcome").innerHTML = "";
    	document.getElementById("outcomeAgain").innerHTML = "";
    	document.getElementById("userWins").src="";

    // This lets me know what word and how many letters it has. Will be deleted later.
    // alert("The secret word is " + secretWord + ". It has " + l + " letters in it.");
    

// This loop creates the blank tiles (_) for the secretWord
for (var i = 0; i < l; i++) {

	if (secretWord.charAt(i) !== " ") {
		blankWord.push(" _ ");
	}
	else {
		blankWord.push(" \xa0\xa0\xa0\ ");
		win = (win + 1);
	 }
	}
	
	// This converts the array into a string and replaces all , with a ""
	var blankWordString = blankWord.toString();
	var blankWordOnScreen = blankWordString.replace(/,/g , " ");

	// This will show the _ on screen so thr user knows how many letters are in the word
	document.getElementById("blankWordOnScreen").innerHTML = blankWordOnScreen;
    var lettersGuessed = "";


// This part is when the user presses a key.
document.onkeyup = function(event) {

	if (gameOver === 0) {

  		var userGuess = event.key;
  		userGuess = userGuess.toUpperCase();

  	// This checks to make sure the user hasn't already guessed a letter.
    var inString = lettersGuessed.indexOf(userGuess);
    var alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var inAlphabet = alphabetStr.indexOf(userGuess);

        // This checks if the guess is in the secret word and makes sure the user enters a valid letter.
        if (inString < 0 && inAlphabet > -1) {

    	   lettersGuessed = (lettersGuessed + userGuess + " , ");

      		// This is verifying the user has enough guesses remaining to continue the game.
      		// Guesses start at 12.
      		if (guesses > 1) {
      			
      			// This section will verify if the user guessed any correct letters and replace them
                // in the blank word.  Running the for loop, b/c the same letter may happen in more than 1 place.
      			for (j = 0; j < l; j++) {
      				
      				// This runs the if/else loop so I can add letters and _'s to the new array.
    		  		if (userGuess === secretWord.charAt(j)) {

    		  			document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
    		  			 
    		  			     // l is # of letters, k is new variable for counting.
    		  			     // This will add _'s and letters to the array.
    		  			 	if (userGuess === secretWord.charAt(j)) {
    		  			 		blankWord[j] = userGuess;
    		  			 		win = (win + 1);
    		  			 	}

                            else {}
    		  			 	
    		  			 	// This changes the array into a string and removes all ,
    		  			 	var blankWordString = blankWord.toString();
    						var blankWordOnScreen = blankWordString.replace(/,/g , " ");

    					// This writes to the HTML the word with _ and letters guessed correctly in the word
    		  			document.getElementById("blankWordOnScreen").innerHTML = blankWordOnScreen;
                        
                        // This plays the correct guess sound if the word isn't completely guessed.
                        // If it is completely guessed, another sound will play.
                        if (secretWord.length !== win) { audioCorrect.play(); }
                        else {}
    		  		}

                    // This writes on the HTML the letter they guessed (since it wasn't in the secret word)
    		  		else { document.getElementById("lettersGuessed").innerHTML = lettersGuessed; }	

    	  		}

    	  		// If the user guesses all letters, then the userWins function is run.
    	  		if (secretWord.length === win) {
    	  			userWins();
    	  			begin("yes"); }

            // If the user guesses a correct letter, then no guesses are used.
        	if (secretWord.includes(userGuess)) { }

        	else { guesses--;
                   audioWrong.play(); }
    	  		
    	  		document.getElementById("guesses").innerHTML = guesses;
    	  	}

    	  	// If the user is out of guesses, the game will end
    	  	else {   userLosses(); 

    	  		 }

    	}


	// If the user does not enter a letter, this sound will play
	else { noLetter.play(); }

    }

}

}

// This function runs when the user does not correctly guess the secret word and all guessed have
// been used.  The game is reset for another word if the user wants to play again.
function userLosses() {

    guesses--;
    losses++;
    audioLoser.play();
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guesses").innerHTML = guesses;
    document.getElementById("outcome").innerHTML = ("Better luck next time. The secret word was " + secretWord);
    document.getElementById("outcomeAgain").innerHTML = "Press any key to try again";
    document.getElementById("lettersGuessed").innerHTML = " ";
    document.getElementById("userWins").src="assets/images/epicfail.jpg";
    guesses = 12;
    document.getElementById("guesses").innerHTML = guesses;
    begin("yes");
}

// This function runs if the user guesses the secret word. Variables are reset for the next word,
// and a picture shows of the correctly guessed character.
function userWins() {

    wins++;
    audioWin.play();
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("outcome").innerHTML = "WINNER, WINNER, CHICKEN DINNER!!!";
    document.getElementById("outcomeAgain").innerHTML = "Press any key to play agian";
    gameOver = 1;
    document.getElementById("lettersGuessed").innerHTML = " ";
    guesses = 12;
    document.getElementById("guesses").innerHTML = guesses;
    
    if (secretWord === "THE WINTER SOLDIER") 
    	{ document.getElementById("userWins").src="assets/images/TheWinterSoldier.png"; }
    else if (secretWord === "THOR")
    	{ document.getElementById("userWins").src="assets/images/Thor.jpg"; }
    else if (secretWord === "CAPTAIN AMERICA")
    	{ document.getElementById("userWins").src="assets/images/CaptainAmerica.jpg"; }
    else if (secretWord === "GUARDIANS OF THE GALAXY")
    	{ document.getElementById("userWins").src="assets/images/GuardiansoftheGalaxy.jpg";
    	  document.getElementById("userWins").style.height = "200px";}
    else if (secretWord === "DOCTOR STRANGE")
    	{ document.getElementById("userWins").src="assets/images/DrStrange.jpeg"; }
    else if (secretWord === "TONY STARK")
    	{ document.getElementById("userWins").src="assets/images/TonyStark.jpg"; }
    else if (secretWord === "BRUCE BANNER")
    	{ document.getElementById("userWins").src="assets/images/BruceBanner.jpg"; }
    else if (secretWord === "LOKI")
    	{ document.getElementById("userWins").src="assets/images/Loki.jpg"; }
    else if (secretWord === "PEGGY CARTER")
    	{ document.getElementById("userWins").src="assets/images/PeggyCarter.jpg"; }
    else if (secretWord === "THANOS")
    	{ document.getElementById("userWins").src="assets/images/Thanos.jpg"; }
    else if (secretWord === "NICK FURY")
    	{ document.getElementById("userWins").src="assets/images/NickFury.jpg"; }
    else if (secretWord === "GROOT")
    	{ document.getElementById("userWins").src="assets/images/Groot.jpg"; }
    else if (secretWord === "SUPERMAN")
    	{ document.getElementById("userWins").src="assets/images/Superman.jpg"; }
    else if (secretWord === "DRAX THE DESTROYER")
    	{ document.getElementById("userWins").src="assets/images/DraxtheDestroyer.jpg"; }
    else if (secretWord === "ULTRON")
    	{ document.getElementById("userWins").src="assets/images/Ultron.jpg"; }
    else if (secretWord === "BLACK WIDOW")
    	{ document.getElementById("userWins").src="assets/images/BlackWidow.jpg"; }
    else if (secretWord === "STORM")
    	{ document.getElementById("userWins").src="assets/images/Storm.jpg"; }
    else if (secretWord === "SCARLET WITCH")
    	{ document.getElementById("userWins").src="assets/images/ScarletWitch.jpg"; }
    else if (secretWord === "JEAN GREY")
    	{ document.getElementById("userWins").src="assets/images/JeanGrey.jpg"; }
    else if (secretWord === "ELEKTRA")
    	{ document.getElementById("userWins").src="assets/images/Elektra.jpg"; }
    else if (secretWord === "MAGNETO")
    	{ document.getElementById("userWins").src="assets/images/Magneto.jpeg"; }
    else if (secretWord === "DORMAMMU")
    	{ document.getElementById("userWins").src="assets/images/Dormammu.jpeg"; }
    else if (secretWord === "GREEN GOBLIN")
    	{ document.getElementById("userWins").src="assets/images/GreenGoblin.jpg"; }
    else if (secretWord === "HUMAN TORCH")
    	{ document.getElementById("userWins").src="assets/images/HumanTorch.jpg"; }
    else if (secretWord === "INVISIBLE WOMAN")
    	{ document.getElementById("userWins").src="assets/images/InvisibleWoman.jpg"; }
    else if (secretWord === "GHOST RIDER")
    	{ document.getElementById("userWins").src="assets/images/GhostRider.jpg"; }
    else if (secretWord === "LUKE CAGE")
    	{ document.getElementById("userWins").src="assets/images/LukeCage.jpg"; }
    else if (secretWord === "SILVER SURFER")
    	{ document.getElementById("userWins").src="assets/images/SilverSurfer.jpg"; }
    else if (secretWord === "CYCLOPS")
    	{ document.getElementById("userWins").src="assets/images/Cyclops.jpg"; }
    else if (secretWord === "WOLVERINE")
    	{ document.getElementById("userWins").src="assets/images/Wolverine.jpg"; }
    else if (secretWord === "DEADPOOL")
    	{ document.getElementById("userWins").src="assets/images/Deadpool.jpg"; }
    else if (secretWord === "CAPTAIN MARVEL")
    	{ document.getElementById("userWins").src="assets/images/CaptainMarvel.jpg";
    	  document.getElementById("userWins").style.width = "450px";
    	  document.getElementById("userWins").style.height = "225px"; }
    else if (secretWord === "HAWKEYE")
    	{ document.getElementById("userWins").src="assets/images/Hawkeye.jpg"; }
    else if (secretWord === "DAREDEVIL")
    	{ document.getElementById("userWins").src="assets/images/Daredevil.jpg"; }
    else if (secretWord === "HOWARD THE DUCK")
    	{ document.getElementById("userWins").src="assets/images/HowardtheDuck.jpg"; }
    else if (secretWord === "BLADE")
    	{ document.getElementById("userWins").src="assets/images/Blade.jpg"; }
    else if (secretWord === "PHIL COULSON")
    	{ document.getElementById("userWins").src="assets/images/PhilCoulson.jpg"; }
    else if (secretWord === "RONAN THE ACCUSER")
    	{ document.getElementById("userWins").src="assets/images/RonantheAccuser.jpg"; }
    else if (secretWord === "APOCALYPSE")
    	{ document.getElementById("userWins").src="assets/images/Apocalypse.jpg"; }
    else if (secretWord === "INCREDIBLE HULK")
        { document.getElementById("userWins").src="assets/images/hulk.jpg"; }
    else { document.getElementById("userWins").src=""; }

     }

}

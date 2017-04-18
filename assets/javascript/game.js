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
      
    var options = [ "THE WINTER SOLDIER", "THOR", "CAPTAIN AMERICA", "GUARDIANS OF THE GALAXY",
    "DOCTOR STRANGE", "TONY STARK", "BRUCE BANNER", "LOKI", "PEGGY CARTER", "THANOS",
    "NICK FURY", "GROOT", "SUPERMAN", "DRAX THE DESTROYER", "ULTRON", "BLACK WIDOW",
    "STORM", "SCARLET WITCH", "JEAN GREY", "ELEKTRA", "ROGUE", "MAGNETO", "DORMAMMU",
    "GREEN GOBLIN", "HUMAN TORCH", "INVISIBLE WOMAN", "GHOST RIDER", "LUKE CAGE",
    "SILVER SURFER", "CYCLOPS", "WOLVERINE", "DEADPOOL", "CAPTAIN MARVEL", "HAWKEYE",
    "DAREDEVIL", "HOWARD THE DUCK", "BLADE", "PHIL COULSON", "RONAN THE ACCUSER", "APOCALYPSE",
    "INCREDIBLE HULK", "GAMORA", "BABY GROOT", "ROCKET", "YONDU UDONTA", "KARL MORDO", "KAECILIUS" ];

    var secretWord = options[Math.floor(Math.random() * options.length)];
    var l = secretWord.length;
    var blankWord = [];
    var blankWordStr = "";
    var lettersGuessed = [];
    var guesses = 10;
    var win = 0;
    var gameOver = 0;

// This function controls the user's guesses inside of the game
document.onkeyup = function(start) {
document.getElementById("outcome").innerHTML = "";
document.getElementById("outcomeAgain").innerHTML = "";
document.getElementById("userWins").src="";

    // This loop creates the blank tiles (_) for the secretWord
    for (var i = 0; i < l; i++) {

    	if (secretWord.charAt(i) !== " ") {
    		blankWord.push(" _ ");
    	} else {
    		blankWord.push(" \xa0\xa0\xa0\ ");
    		win = (win + 1); }
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
                                if (secretWord.length !== win) { audioCorrect.play();
                                } else {}
            		  		}

                            // This writes on the HTML the letter they guessed (since it wasn't in the secret word)
            		  		else { document.getElementById("lettersGuessed").innerHTML = lettersGuessed; }	

            	  		}

            	  		// If the user guesses all letters, then the userWins function is run.
            	  		if (secretWord.length === win) {
            	  			userWins();
            	  			begin("yes"); }

                        // If the user guesses a correct letter, then no guesses are used.
                    	if (secretWord.includes(userGuess)) {

                        } else { guesses--;
                               audioWrong.play();
                        }
            	  	    document.getElementById("guesses").innerHTML = guesses;
                    }

            	  	// If the user is out of guesses, the game will end
            	  	else {   userLosses(); 
                    }

            	}

        	// If the user does not enter a letter, this sound will play
        	else { noLetter.play();
            }
        
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

// This shows the picture if the user guesses the correct secret word
var word = { "THE WINTER SOLDIER": "assets/images/TheWinterSoldier.png",
    "THOR": "assets/images/Thor.jpg", "CAPTAIN AMERICA": "assets/images/CaptainAmerica.jpg",
    "GUARDIANS OF THE GALAXY": "assets/images/GuardiansoftheGalaxy.jpg",
    "DOCTOR STRANGE": "assets/images/DrStrange.jpeg", "TONY STARK": "assets/images/TonyStark.jpg",
    "BRUCE BANNER": "assets/images/BruceBanner.jpg", "LOKI": "assets/images/Loki.jpg",
    "PEGGY CARTER": "assets/images/PeggyCarter.jpg", "THANOS": "assets/images/Thanos.jpg",
    "NICK FURY": "assets/images/NickFury.jpg", "GROOT": "assets/images/Groot.jpg",
    "SUPERMAN": "assets/images/Superman.jpg", "DRAX THE DESTROYER": "assets/images/DraxtheDestroyer.jpg",
    "ULTRON": "assets/images/Ultron.jpg", "BLACK WIDOW": "assets/images/BlackWidow.jpg",
    "STORM": "assets/images/Storm.jpg", "SCARLET WITCH": "assets/images/ScarletWitch.jpg",
    "JEAN GREY": "assets/images/JeanGrey.jpg", "ELEKTRA": "assets/images/Elektra.jpg",
    "ROGUE": "assets/images/Rogue.jpg", "MAGNETO": "assets/images/Magneto.jpeg",
    "DORMAMMU": "assets/images/Dormammu.jpeg", "GREEN GOBLIN": "assets/images/GreenGoblin.jpg",
    "HUMAN TORCH": "assets/images/HumanTorch.jpg", "INVISIBLE WOMAN": "assets/images/InvisibleWoman.jpg",
    "GHOST RIDER": "assets/images/GhostRider.jpg", "LUKE CAGE": "assets/images/LukeCage.jpg",
    "SILVER SURFER": "assets/images/SilverSurfer.jpg", "CYCLOPS": "assets/images/Cyclops.jpg",
    "WOLVERINE": "assets/images/Wolverine.jpg", "DEADPOOL": "assets/images/Deadpool.jpg",
    "CAPTAIN MARVEL": "assets/images/CaptainMarvel.jpg", "HAWKEYE": "assets/images/Hawkeye.jpg",
    "DAREDEVIL": "assets/images/Daredevil.jpg", "HOWARD THE DUCK": "assets/images/HowardtheDuck.jpg",
    "BLADE": "assets/images/Blade.jpg", "PHIL COULSON": "assets/images/PhilCoulson.jpg",
    "RONAN THE ACCUSER": "assets/images/RonantheAccuser.jpg", "APOCALYPSE": "assets/images/Apocalypse.jpg",
    "INCREDIBLE HULK": "assets/images/hulk.jpg", "GAMORA": "assets/images/Gamora.jpg",
    "BABY GROOT": "assets/images/baby_groot.jpg", "ROCKET": "assets/images/rocket.jpg",
    "YONDU UDONTA": "assets/images/yondu_udonta.png", "KARL MORDO": "assets/images/karl_mordo.jpg",
    "KAECILIUS": "assets/images/kaecilius.jpg" };

    document.getElementById("userWins").src = word[secretWord];

     }

}

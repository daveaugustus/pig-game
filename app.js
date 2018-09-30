//Global variables declaration 

let score, roundScore, activePlayer, isGameOn;
let lastRoll;

// call of initializeVariable() function to initialise the game at the starting stage of the game

initializeVariable();


/*
An event listener is given to Roll dice button, rolling a dice works when the isGameOn function is true then it generates dice random no from 0-6
then it checks if the dice value is non 1. if dice value is non 1, one can keep rolling or hold score if 1 the entire round score becomes 0 and 
controll goes to the next player.
*/

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(isGameOn){
        let dice  = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if(dice === 6 && lastRoll === 6){
            score[activePlayer] = 0
            document.querySelector('#score-'+activePlayer).textContent = score[activePlayer];
            nextPlayer();

        }else if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            nextPlayer();
        }
        lastRoll = dice;
    }

});

/*

if a player clicks hold button the even listener will be called which will hold the current score and pass the controll to the next player if isGameOn
variable is true. It will also check if the score is >== the winning score, is so it will display the winner and set the variable isGameOn to false
else game will continue...

*/
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(isGameOn){
        // Add current score to Global score
    score[activePlayer] += roundScore;


    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    

    // Check who won the game
    if(score[activePlayer] >= 100){
        document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        isGameOn = false;
    }
    else{
        //Next Player
        nextPlayer();
    }
    }
    
});


/*
nextplayer function does nothing but it gives the controll to the next player if one comes or tow consecutive sixes come. the ternary operator in the
function checks if activePlayer is 0 then activePlayer will be 1 else the activePlayer will remain zero because there are only two players active player
will toggle between 0 and 1

*/

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}


/*
clicking new game leads to resetting all the functions and variables to the initial state
for that we there is an event listener in the following code which calls the initializeVariable() fucntion
after click of the button.
*/

document.querySelector('.btn-new').addEventListener('click', initializeVariable);

/*
function initializeVariable initializes all the variables and display documents to 
it's initial state. 
*/
function initializeVariable(){
    score           = [0,0];
    roundScore      = 0;
    activePlayer    = 0;
    isGameOn        = true;

    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}
let name;

document.getElementById("userNameButton").addEventListener("click", deleteFirstStage);

function deleteFirstStage(){
    
    name = document.getElementById("userNameText").value;
    const div = document.getElementById("containerUser");
    div.remove();
    unhideGameStage();    
}

function unhideGameStage(){
    console.log(name);
    const div = document.getElementById("game");
    div.style.display = 'flex';
    document.getElementById("name").innerHTML = name;



document.getElementById("startGame").addEventListener("click", new Round(name).startGame);

}




//--------------OBJECT CONSTRUCTORS-------------

//PLAYER COSNTRUCTOR
function Player(name){
    this.name = name;
    this.prize = 0;
    this.cards = [];

    this.sumCards = function(){
        //Code for sum the values of cards in array cards
        let sum = 0;
        this.cards.forEach(element => {
            //Getting the player's hand sum
            sum += element.value;
        })
        return sum;
        

    }
    this.addCard = function(card){
        //Code for add a new card to the array of cards
        this.cards.push(card);
    }
    this.addPrize = function(prize){
        //Code for add the prize of the round
        this.prize += prize;
    }

}


//CARD CONSTRUCTOR
function Card(){
    //Declare attributes with let to encapsulate variables
    this.name;
    this.suit;
    this.value;
    //once you define the name call the function setValue to set the value
    
    
    this.setValue = function(){
        //Allows to get input from user

        //Validates regex (if is a letter)
        if (/^[A-Za-z]+$/.test(this.name)){
            switch(this.name){
                case 'J':
                case 'Q':
                case 'K':
                    value = 10;
                    break;
                default: //If you get an Ace
                    //Ask to the user what does he want to do
                    let aceChoice = prompt('Ingrese 1 si desea que su A = 1, o 2 si desea que A = 11')
                    switch(Number(aceChoice)){
                        case 1:
                            value = 1;
                            break;
                        default:
                            value = 11;
                            break;
                    
                    }
            }
            
        }else{value = Number(name)}
        
    }
    
    
}

//ROUND CONSTRUCTOR
function Round(name){
    let player = new Player(name);
    let cardNames = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let suits = ['♣', '♦', '♥', '♠'];
    let prize = 1000;

    //Starting game - button new game
    this.startGame = function(){
        newCard();
        newCard();

        document.getElementById("cardOne").innerHTML = player.cards[0].name;
        document.getElementById("suitOne").innerHTML = player.cards[0].suit;
        document.getElementById("cardTwo").innerHTML = " / " + player.cards[1].name;
        document.getElementById("suitTwo").innerHTML = player.cards[1].suit;

        document.getElementById("newCardButton")
        
        //Check if he wins
    }

    //Giving a new card to the player
    let newCard = function(){
        //Instanciates a new card each time the function is called
        let card = new Card();
        
        //Giving the properties to the card
        card.name = getRandomItem(cardNames);
        card.suit = getRandomItem(suits);
        card.setValue();
        //Validating the card is not repeated
        if (!sameCard(card.name, card.suite)){
             //If is not the same card adds to the hand of player
            player.addCard(card);
        }else{
            //If cards is repeated the function is called again to generate a new card (Recursion)
            newCard()}      
    }

    //Used to get random items from arrays cardName and suits
    let getRandomItem = function(item){
        return item[Math.floor(Math.random()*item.length)]
    }

    
    //Validating if a card already exists in the hand of player
    let sameCard = function(drawCardName, drawCardSuit){
        let isSameCard = false;
        //Validates if array is empty
        if (player.cards.length !== 0){
            //Search over cards looking if the card already exists
            player.cards.forEach(userCard => {
                if(userCard.name === drawCardName && userCard.suit === drawCardSuit){
                    isSameCard = true;
                }
                    
        })};
        return isSameCard;   
    }



    let playAgain = function() {
        console.log('Okay '+player.name+ '. Juguemos de nuevo');
        //Clean array of cards
        player.cards = [];
        //First round user receives 2 cards
        firstRound();
        //Ask for another round
        anotherRound();
    }


    

    

    let anotherRound = function(){
        //This variable receives the boolean isInGame from checkIsInGame function
        let controlVariable = checkIsInGame();
        //If the value isInGame from checkIsInGame function is true then the player hasn't won and hasn't lose and ask for another card
        if(controlVariable){     
            //Giving new card       
            newCard();
            //Showing cards in hand
            console.log('\nEstas son sus cartas: ')
                player.cards.forEach(card => { 
                console.log(card.name+card.suit);  
            })
            //Check again if the player is in game 
            anotherRound();
        }

        //If the value isInGame from checkIsInGame function is false then we ask to the player if he wants to play again
        if (!controlVariable){
            //Read input from user
            let readlineSync = require('readline-sync');
            let newGame = readlineSync.question('¿Quieres jugar otra vez? (Y/N): ');

            switch(newGame.toLowerCase()){
                case 'y':
                    playAgain();
                    break;
                default:
                    console.log('-------------------------\n')
                    console.log('Nos veremos en otra ocasión, hasta luego!');
                    console.log('Tu premio acumulado es: '+player.prize);
                    break;
            }
        }      
    }

    
    let checkIsInGame = function(){
        //Sum of card values of player hand
        let sum = player.sumCards();
        //Control variable to detect if the player is still playing(boolean)
        let isInGame;

        //If the sum is below 18 then the player can chose between still playing or stop
        if (sum<18){
            switch(anotherCard.toLowerCase()){
                //If answer Y then we return true in control variable isInGame (The player is still playing)
                case 'y':
                    isInGame = true;
                    break;
                //Another case (Answer is N) the player decides to stop the game, control variable isInGame returns false
                default:
                    isInGame = false;
                    break;
            }
        }

        //If the sum is between 18 and 21 the player wins the game and add the prize to the bag prize and the control variable returns false
        if (sum === 21){
            isInGame = false;
            //Adding prize

            //Agregar mensaje en html si gana


            player.addPrize(prize);
            }
        
        //If sum is over 21 the player lose, and the control variable isInGame returns false
        if (sum>21){
             //isInGame returns false because the game is finished because the player lost
            isInGame = false;}

            //mensaje html

            //falta mostrar la sum html

        return isInGame;
    }

    

    
}

//App execution

//Start game
//round.startGame();














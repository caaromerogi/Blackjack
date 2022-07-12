//--------------OBJECT CONSTRUCTORS-------------

const { read } = require('fs');

//Player
function Player(name){
    this.name = name;
    this.prize = 0;
    this.cards = [];

    this.sumCards = function(){
        //Code for sum the values of cards in array cards
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


//Card
function Card(){
    //Declare attributes with let to encapsulate variables
    let name;
    let suit;
    let value;
    //once you define the name call the function setValue to set the value
    
    let setValue = function(){
        if (/^[A-Za-z]+$/.name){ //regex validation
            if(name === "J" || name === "Q" || name === "K"){
                value = 10;
            }
            
            
        }
    }
    

    //Getter a nd Setter for card name property
    Object.defineProperty(this, 'name',{
        get: function(){
            return name;    
        },
        set: function(value){
            //Validates is a String
            if(String(value)){
                name = value; 
                //call setValue function to modify de card value   
            }
                
        }
    });

    //Getter and Setter for card suite property
    Object.defineProperty(this, 'suit', {
        get: function(){
            return suit;    
        },
        set: function(value){
            //Validates is a String
            if(String(value)){
                suit = value; 
            }
        }
    })
    
}

//Round
function Round(){
    let player = new Player();
    let cardNames = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let suits = ['♣', '♦', '♥', '♠'];
    this.prize;

    
    this.startGame = function(){
        let readlineSync = require('readline-sync');

        console.log("Bienvenido a Blackjack");
        let userName = readlineSync.question('Por favor, ingresa tu nombre: ');
        player.name = userName;
        console.log('Comencemos '+ player.name);

        //First round user receives 2 cards
        firstRound();
    }

    let firstRound = function(){
        newCard();
        newCard();
        console.log('Estas son sus cartas: ')
        player.cards.forEach(element => { 
            console.log(element.name+element.suit);  
        })
    }

    let newCard = function(){
        let card = new Card();
        card.name = getRandomItem(cardNames);
        card.suit = getRandomItem(suits);

        //Validates the card is not repeated
        if (!sameCard(card.name, card.suite))
            //If doesn't the same card adds to the hand of player
            player.addCard(card);
    }

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

    

}

//Test
const round = new Round();

round.startGame();










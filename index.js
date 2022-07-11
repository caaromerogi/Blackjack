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
                suit === value; 
            }
        }
    })
    
}

//Round
function Round(){
    let card = new Card();
    let player = new Player();
    this.prize;

    
    this.startGame = function(){
        let readlineSync = require('readline-sync');

        console.log("Bienvenido a Blackjack");
        let userName = readlineSync.question('Por favor, ingresa tu nombre: ');
        player.name = userName;
        console.log('Comencemos '+ player.name);

        //First round user receives 2 cards
        firstRound();
        player.cards.forEach(element => {
            console.log(element.name+element.suit);  
        })

        
        
    }

    let firstRound = function(){
        dealing();
        dealing();
    }

    //Dealing a card
    let dealing = function(){
        //Returning a random cart from the array
        let cardNames = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        let suits = ['♣', '♦', '♥', '♠'];
        let cardName = cardNames[Math.floor(Math.random()*cardNames.length)];
        let suit = suits[Math.floor(Math.random()*suits.length)];

        //Assigning generated properties to card object
        card.name = cardName;
        card.suit = suit;

        //If card is in the hand the dealing function executes again
        if(validatingCard(card))
            dealing;

        //If card is not in the hand player gets the card
        player.addCard(card);


    }

    //Validating if a card already exists in the hand of player
    let validatingCard = function(cardName, cardSuit){
        let isSameCard = false;
        //Validates if array is empty
        if (!player.cards.length){
            //Search over cards looking if the card already exists
            player.cards.forEach(userCard => {
                if(userCard.name === cardName && userCard.suit === cardSuit)
                    isSameCard = true;
        })};
        return isSameCard;
        
    }

    

}

//Test
const round = new Round();
round.startGame();





//--------------OBJECT CONSTRUCTORS-------------

const { read } = require('fs');
const { platform } = require('os');

//Player
function Player(name){
    this.name = name;
    this.prize = 0;
    this.cards = [];

    this.sumCards = function(){
        //Code for sum the values of cards in array cards
        let sum = 0;
        this.cards.forEach(element => { 
            console.log(element.value);
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


//Card
function Card(){
    //Declare attributes with let to encapsulate variables
    let name;
    let suit;
    let value;
    //once you define the name call the function setValue to set the value
    
    
    this.setValue = function(){
        //Allows to get input from user
        let readlineSync = require('readline-sync');

        //Validates regex (if is a letter)
        if (/^[A-Za-z]+$/.test(name)){
            switch(name){
                case 'J':
                case 'Q':
                case 'K':
                    value = 10;
                    break;
                default: //If you get an Ace
                    //Ask to the user what does he want to do
                    let aceChoice = readlineSync.question('\n El repartidor te dio un As \n Elija 1 o 2 entre las siguientes opciones \n 1. A = 1 \n 2. A = 11 \n')
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
    

    //Getter and Setter for card name property
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

    //Getter value property
    Object.defineProperty(this, 'value', {
        get: function(){
            return value;
        }
    })
    
}

//Round
function Round(){
    let player = new Player();
    let cardNames = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let suits = ['♣', '♦', '♥', '♠'];
    this.prize;

    //Starting game
    this.startGame = function(){
        let readlineSync = require('readline-sync');

        console.log("Bienvenido a Blackjack");
        let userName = readlineSync.question('Por favor, ingresa tu nombre: ');
        player.name = userName;
        console.log('Comencemos '+ player.name);

        //First round user receives 2 cards
        firstRound();
        //Check if win
        checkWin();

    }

    //Starting the first round giving 2 cards to the user
    let firstRound = function(){
        newCard();
        newCard();
        console.log('Estas son sus cartas: ')
        player.cards.forEach(element => { 
            console.log(element.name+element.suit+element.value);  
        })
    }

    let anotherRound = function(){
        let readlineSync = require('readline-sync');
        let anotherCard = readlineSync.question('¿Desea otra carta? (Y/N): ');
        switch(anotherCard){
            case 'Y':
                newCard();
                checkWin();
                break;
            case 'N':
                //finish game    

        }
    }

    let checkWin = function(){
        let sum = player.sumCards();
        if (sum<18){
            //¿Desea continuar?}
            //If he says no, Finish game
        }
        if (sum>=18 && sum<= 21){
            console.log("You win!!")}
        if (sum>21){
            "You lose :("}
        }
        

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
        }else{newCard()}
         
            
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

    

}

//Test
const round = new Round();

round.startGame();










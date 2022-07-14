let name;
let round = new Round();
document.getElementById("userNameButton").addEventListener("click", deleteFirstStage);
document.getElementById("startGame").addEventListener("click", round.startGame);
document.getElementById("drawCardButton").addEventListener("click", round.anotherRound);

function deleteFirstStage() {

    name = document.getElementById("userNameText").value;
    const div = document.getElementById("containerUser");
    div.remove();
    unhideGameStage();
}

function unhideGameStage() {
    const div = document.getElementById("game");
    div.style.display = 'flex';
    document.getElementById("name").innerHTML = "let's start "+ name;
}



//--------------OBJECT CONSTRUCTORS-------------

//PLAYER COSNTRUCTOR
function Player() {
    this.name;
    this.prize = 0;
    this.cards = [];

    this.sumCards = function () {
        //Code for sum the values of cards in array cards
        let sum = 0;
        this.cards.forEach(card => {
            //Getting the player's hand sum
            sum += card.value;
        })
        return sum;


    }
    this.addCard = function (card) {
        //Code for add a new card to the array of cards
        this.cards.push(card);
    }
    this.addPrize = function (prize) {
        //Code for add the prize of the round
        this.prize += prize;
    }

}


//CARD CONSTRUCTOR
function Card() {
    //Declare attributes with let to encapsulate variables
    let name;
    this.suit;
    let value;
    //once you define the name call the function setValue to set the value


    this.setValue = function () {
        //Allows to get input from user
        //Validates regex (if is a letter)
        if (/^[A-Za-z]+$/.test(name)) {
            switch (name) {
                case 'J':
                case 'Q':
                case 'K':
                    value = 10;
                    
                    break;
                default: //If you get an Ace
                    //Ask to the user what does he want to do
                    aceCase();
                    break;
            }

        } else {value = Number(name)}

        function aceCase() {
            let aceChoice = prompt('Ingrese 1 si desea que su A = 1, o 2 si desea que A = 11')
            switch (Number(aceChoice)) {
                case 1:
                    value = 1;
                    break;
                case 2:
                    value = 11;
                    break;
                default:
                    aceCase();
            }
        }

    }

    //Getter and Setter for card name property
    Object.defineProperty(this, 'name', {
        get: function () {
            return name;
        },
        set: function (param) {
            //Validates is a String
            if (String(param)) {
                name = param;  
            }

        }
    });

    //Getter and Setter for card name property
    Object.defineProperty(this, 'value', {
        get: function () {
            return value;
        }
    });


}

//ROUND CONSTRUCTOR
function Round() {
    let player = new Player();
    let cardNames = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let suits = ['♣', '♦', '♥', '♠'];
    let prize = 1000;

    //Starting game - button new game
    this.startGame = function () {
        player.name = name;
        player.cards = [];

        //NOTA IMPORTANTE: REMOVER DIVS QUERYSELECTORALL (.ID SPAN)

        newCard();
        newCard();
        checkIsInGame();

        document.getElementById("cardOne").innerHTML = player.cards[0].name;
        document.getElementById("suitOne").innerHTML = player.cards[0].suit;
        document.getElementById("cardTwo").innerHTML = " / " + player.cards[1].name;
        document.getElementById("suitTwo").innerHTML = player.cards[1].suit;

        document.getElementById("sum").innerHTML = player.sumCards();
        document.getElementById("drawCardButton").disabled = false;


        //Check if he wins
    }

    //Giving a new card to the player
    let newCard = function () {
        //Instanciates a new card each time the function is called
        let card = new Card();

        //Giving the properties to the card
        card.name = getRandomItem(cardNames);
        card.suit = getRandomItem(suits);
        card.setValue();
        //Validating the card is not repeated
        if (!sameCard(card.name, card.suite)) {
            //If is not the same card adds to the hand of player
            player.addCard(card);
        } else {
            //If cards is repeated the function is called again to generate a new card (Recursion)
            newCard()
        }

        return card;
    }

    //Used to get random items from arrays cardName and suits
    let getRandomItem = function (item) {
        return item[Math.floor(Math.random() * item.length)]
    }


    //Validating if a card already exists in the hand of player
    let sameCard = function (drawCardName, drawCardSuit) {
        let isSameCard = false;
        //Validates if array is empty
        if (player.cards.length !== 0) {
            //Search over cards looking if the card already exists
            player.cards.forEach(userCard => {
                if (userCard.name === drawCardName && userCard.suit === drawCardSuit) {
                    isSameCard = true;
                }

            })
        };
        return isSameCard;
    }
    



    let playAgain = function () {
        console.log('Okay ' + player.name + '. Juguemos de nuevo');
        //Clean array of cards
        player.cards = [];
        //First round user receives 2 cards
        firstRound();
        //Ask for another round
        anotherRound();
    }


    this.anotherRound = function () {
        //This variable receives the boolean isInGame from checkIsInGame function
        let controlVariable = checkIsInGame();
        //If the value isInGame from checkIsInGame function is true then the player hasn't won and hasn't lose and ask for another card
        if (controlVariable) {
            //Giving new card       
            let card = newCard();
            //Showing cards in hand
            let spanCards = document.createElement('span');
            spanCards.innerHTML = " / " + card.name+card.suit;
            let divCards = document.getElementById('cards');
            divCards.appendChild(spanCards);
            document.getElementById("sum").innerHTML = player.sumCards();
            //Check again if the player is in game 
            checkIsInGame();
        }

        
    }


    let checkIsInGame = function () {
        //Sum of card values of player hand
        let sum = player.sumCards();
        //Control variable to detect if the player is still playing(boolean)
        let isInGame;

        //Still playing
        if (sum < 21) {
            isInGame = true;
            document.getElementById("sum").innerHTML = player.sumCards();
        }

        //Stop playing
        if (sum === 21) {
            isInGame = false;
            document.getElementById("sum").innerHTML = player.sumCards();
            document.getElementById("name").innerHTML = ":D Has ganado, ¡te reto a hacerlo de nuevo!"
            document.getElementById("drawCardButton").disabled = true;
            //Adding prize
            player.addPrize(prize);
            
        }

        //Stop playing
        if (sum > 21) {
            isInGame = false;
            document.getElementById("sum").innerHTML = player.sumCards();
            document.getElementById("name").innerHTML = "D: Has perdido, ¡puedes intentarlo nuevamente!"
            document.getElementById("drawCardButton").disabled = true;
        }


        return isInGame;
    }

}














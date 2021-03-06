# Blackjack

## Starting 🚀
The Blackjack Game was developed using Javascript and using the node module "readline-sync" to get user input.

## Description
The game was created using OOP approach with Javascript. The app has three "classes", those are Player, Card and Round. Player "class" has the name, the hand, the player's bag prize and methods to calculate stuff related with assign prize, get sum value of cards and push a new card in the hand. Card "class" has the name, value and suit of card, getters and setters to set the name, suit and value and method to assign **value for ACE card** (You can see an example at the of this README). Finally, the class Round contains all related with the execution logic like start new game, play again, deal a card, validate if a card already exists in the hand of user, validate if player win, lose or want another card and exit etc.
Class Card apply the encapsulation principle using "let" to declare private attributes because needs some additional validations to get and set values and Class Person doesn't apply this because overcomplicate the code unnecessarily.

You win the game if you reach a score between 18 and 21, and you receive a prize of 1000 points, those will be accumulated in your prize bag.

Enjoy the game.

## Running code
1. Clone or download the repository in your local machine
2. You need to have node.js installed in your machine
3. Open the file with VSCode or your code editor
4. Execute in the terminal the next line:

```
node index.js
```

## If you get an error with readline-sync package...

1. Execute the next line to install readline-sync node package
```
npm install readline-sync
```

## How it works?
#### Start asking to the user for a name
![image](https://user-images.githubusercontent.com/98110015/178550724-8f0c9f79-ffa8-4d20-b353-2f6d26e59262.png)

#### Once you insert your name, you receive two cards, their sum and if is below 18 the program ask if you want another card
![image](https://user-images.githubusercontent.com/98110015/178551040-fb0c9159-1a3c-4361-accf-a7ef4d50ad1a.png)

#### If you receive another and the total sum is below 18, the program will continue asking you if want another until win or lose
![image](https://user-images.githubusercontent.com/98110015/178551221-479ec59a-00a0-4763-907e-e1f354826d6d.png)

#### In case you win, you will receive a prize and it will be added to your prize bag
![image](https://user-images.githubusercontent.com/98110015/178551364-652f423d-5c77-4ce9-8260-0cc30eba5c7c.png)

#### If you decide to play again, you receive two cards again and continue the game until you win or lose
![image](https://user-images.githubusercontent.com/98110015/178551615-20d57171-eaeb-4c75-8a5b-6180ed12ced3.png)

#### As you can see in the nex image, the prize is accumulative
![image](https://user-images.githubusercontent.com/98110015/178551794-558f4808-cacf-4afd-99e7-64d2dd1326f0.png)

#### In case you lose, you receive a different message and the accumulated prize that you have in that moment
![image](https://user-images.githubusercontent.com/98110015/178552115-e933e822-fc33-4e48-83c8-745a7fba41bb.png)

#### If you dom't want to play anymore the program shows the final prize and a goodbye message
![image](https://user-images.githubusercontent.com/98110015/178552273-5a0d4376-a845-4018-acd2-45de40f12ff3.png)

## ACE CASE
#### If you get an ACE you can decide the value choosing option 1 or 2
![image](https://user-images.githubusercontent.com/98110015/178552573-00aef8d8-370f-442f-8471-9eda5602c60d.png)

#### As you can see here
![image](https://user-images.githubusercontent.com/98110015/178552771-7c724372-c8d8-4c6d-b2c0-9c1b8f75e12d.png)



var prompt = require('sync-prompt').prompt;

// generate the deck with 52 cards
var generateCards=function()
{
//create the suit and faces to represent the cards 
var suit=["♠","♣","♥","♦"];
var face= ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];


	//create an empty array 
	var deck=[];

		// loop through the face and suit array
		for(var j=0; j< face.length; j++){
		for(var i=0;i<suit.length;i++){
		deck.push({ 'suit': suit[i], 'face': face[j]});
			}
		}
		return deck;
};
//create a method that would shuffle the deck
var shuffle=function(cards)
{
	var cardDeck=[];
	
	for(var i=0; i<cards.length;i++)
	{
		var randomCards= Math.floor((Math.random())*(i+1));
	   
		var emptyArray= cards[i];
		cardDeck[i]=cardDeck[randomCards];
		cardDeck[randomCards]=emptyArray;	
	}
	return cardDeck;
};
//create  a method that would calculate the user's hand
var calculateHand=function(cards)
{
// a counter that would keep track of the total of the hand
var total =0; 

for(var i=0; i<cards.length; i++)
{
	//if it is not a face card it is a number card 
	//if so translate the string to a numeric value
	if (cards[i].face !== "A" && cards[i].face !== "K" 
		&& cards[i].face !== "Q" && cards[i].face !== "J") 
		{total += parseInt(cards[i].face);}
		
		//then it is a face card and add 10 to the total
		else{total+= 10;}

		//if it is a Ace add 11 to the total
		if(cards[i].face==="A"){total+=11;}
}
// if the total is greater than 21
if(total>21)
{
	//loop through the deck of cards 
	for(var j=0; j<=cards.length-1; j++)
	{if(cards[j].face === "A")
		//continually subtract 10
		{total -= 10;}
	}
}
 return total;
}
// check to see whose the winner
//cannot go over 21
var determineWinner= function(playerTotal,computerTotal){
	
   	if(playerTotal<= 21 && computerTotal > 21){console.log("Player Wins");}
	if(computerTotal<=21 && playerTotal > 21){console.log("Computer Wins");}
	if(playerTotal>21 && computerTotal>21){console.log("Both busted");}
	if(playerTotal === computerTotal){console.log("There's a tie");}

};
// put the game together

// print the user's hand 
var userHand =function(card)
{
	var string = "";

	for(var i=0; i <= card.length-1; i++)
	{string = string + card[i].suit + " " + card[i].face;}

	console.log("Your hand is: " + string + "... for a total of " + calculateHand(card)) ;
	
}
// create an array for the player and computer
var playerCards=[];
var compCards=[];

//create a method that prints out the final stats
var printStats=function(compCards,playerCards){

var autreString = "";
var string = "";

for(var i=0; i <= compCards.length-1; i++)
{

	autreString = autreString + compCards[i].suit + " " + compCards[i].face;
}
for(var j=0; j<= playerCards.length-1; j++)
	{
		 string = string + playerCards[j].suit + " " + playerCards[j].face;
	}

console.log(" ");	
console.log("Your hand: " + string+ " ("+calculateHand(playerCards)+") "+","
	+ "Computer hand: " + autreString+ " ("+calculateHand(compCards)+")");
}
//creare var for the loop
var x=0;
var deal=function()
{
while(x<2){playerCards.push(generated.pop());
	      compCards.push(generated.pop());
	      x++;}
};
//generate the cards so you can have the deck
var generated=generateCards();
generated=shuffle(generated);
deal();

while(generated.length>=26)
{
	//print hand
	userHand(playerCards);

	var cardPrompt= prompt("Would you like to (h)it or (s)tand? ");
	if(cardPrompt.toLowerCase()==="h")
	{
		//distribute another card because they selected hit
		playerCards.push(generated.pop());
		// if the user hand goes over 21 stop the game
		if(calculateHand(playerCards)>21){
			userHand(playerCards); console.log("You went over 21");
			break;}
	}
	if(cardPrompt.toLowerCase()==="s"){
		if(calculateHand(playerCards)>21)
		{
			userHand(compCards); console.log("You went over 21");
			break;
		}
		//the computer will contiue to hit as long 
		// as value is less than 17
		while(calculateHand(compCards)<17){
			//distribute another card
			compCards.push(generated.pop());
			if(calculateHand(compCards)>17){break;}
		}
		break;}
};
//print the final output 
printStats(compCards,playerCards);
determineWinner(calculateHand(playerCards), calculateHand(compCards));
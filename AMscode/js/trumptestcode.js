/**
 * Created by Am on 10/25/14.
 */

/*
 * My objective is to create a method/function within a object constructor and set it to a property of the object.
 * For Instance: What if I wanted to create names for the purpose of presenting to the screen 'King of Hearts', etc,
 * and I want to implement logic for getting the file name< if(value===14) card name = Ace
 * For the purpose of this game, the code does not need to be concerned with picture cards, as I can simply
 * align them with images for the sake of the UI, though for the sake of code readability or future needs
 * creating a string name may be useful.

 * Attempt One:
 * QUESTION: When you console log the new card, why is fname: "NaN.png"?
 var nsc;
 var card =function(value, suit){
 this.value= value;
 this.suit= suit;
 var fname = function(){
 return this.value + this.suit +".png";
 }

 this.fname = fname;
 };

 nsc = new card(1,"h");
 console.log(nsc);

 * Attempt Two:
 * QUESTION: Why does this work?
 var nsc;
 var card =function(value, suit){
 var self = this;
 this.value= value;
 this.suit= suit;
 this.filename;

 this.fname = function(){
 return self.value + self.suit +".png";
 }

 this.filename = this.fname();
 };

 nsc = new card(1,"h");
 console.log(nsc);


 * Attempt Three:
 * QUESTION: Is this effectively the same thing as attempt 1?

 var nsc;
 var card =function(value, suit){
 this.value= value;
 this.suit= suit;
 this.filename;

 function fname(){
 return this.value + this.suit +".png";
 }

 this.filename = fname();
 };

 nsc = new card(1,"h");
 console.log(nsc);

 */









/* Why Doesn't this work?

var Card = function( value, suit ) {
    this.value = value;
    this.suit = suit;
    this.fileName = value + suit + ".png";
};



var Deck = function(){
    this.cards=[];

    this.newDeck = function(){
        // start at 2, so that Ace = 14, King =13, etc..
        for(i=2; i<15; i++){
            cards[i] = new Card (i, "h");
            cards[i+13] = new Card (i, "c");
            cards[i+26] = new Card (i, "d");
            cards[i+39] = new Card (i, "s");
        }
        console.log(cards);
    };

    this.shuffleDeck = function(){
        var n= Math.floor( 400* Math.random()+ 500);

        for (i=1; i<n; i++){
            card1= Math.floor(52*Math.random()+1);
            card2= Math.floor(52*Math.random()+1);
            temp= cards[card2];
            cards[card2]=deck[card1];
            deck[card1]=temp;
        }
        console.log(cards);
    };


};

var gameDeck = Deck.newDeck();
var shuffleDeck = Deck.shuffleDeck();

*/



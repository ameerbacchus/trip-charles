/**
 * Trump
 * @author: Am Bacchus <ameer.bacchus@gmail.com>
 */


/**
 * Card object
 */

var Card = function( value, suit ) {
    this.value = value;
    this.suit = suit;
    this.fileName = suit + value + ".png";
    this.id = value + suit;
};

/**
 * Deck object
 */

var Deck = function(){
    var self = this;
    this.cards=[];
    this.hand1=[];
    this.hand2=[];
    this.hand3=[];
    this.hand4=[];

    this.initDeck = function(){

        for(i=0; i<13; i++){
           self.cards[i] = new Card (i+2, "hearts");
           self.cards[i+13] = new Card (i+2, "clubs");
           self.cards[i+26] = new Card (i+2, "diamonds");
           self.cards[i+39] = new Card (i+2, "spades");
        }

    };

    this.shuffleDeck = function(){
        var n= Math.floor( 400* Math.random()+ 500);
        var card1;
        var card2;
        var temp;

        for (i=0; i<n; i++){
            card1= Math.floor(52*Math.random());
            card2= Math.floor(52*Math.random());
            temp= self.cards[card2];
            self.cards[card2]= self.cards[card1];
            self.cards[card1]=temp;
        }

    };

    this.deal = function(){
       var c = self.cards;
       self.hand1= c.splice(1,13);
       self.hand2= c.splice(1,13);
       self.hand3= c.splice(1,13);
       self.hand4= c.splice(1,13);
    };

    /* TODO: Develop more efficient way to sort array
     * This current system wastes memory, find a better way.
     * AMSNOTE: I originally created an array containing the 4 suit arrays
     * Which way is better?
      * */
    this.sortHand =function(hand){
        var sortedHand =[];
        var cardsHearts=[];
        var cardsSpades=[];
        var cardsClubs =[];
        var cardsDiamonds=[];

        /* Separate the hand into 4 suit arrays */
        for(i = 0; i < hand.length; i++){

            if( hand[i].suit === "hearts" ){
               cardsHearts.push(hand[i]);
            } else if( hand[i].suit === "spades" ){
                cardsSpades.push(hand[i]);
            } else if( hand[i].suit === "diamonds" ){
                cardsDiamonds.push(hand[i]);
            } else if( hand[i].suit === "clubs" ){
                cardsClubs.push(hand[i]);
            }

        }

        /* Sort each suit array */
        cardsHearts.sort(function(a,b){
            return b.value - a.value;
        });
        cardsSpades.sort(function(a,b){
            return b.value - a.value;
        });
        cardsDiamonds.sort(function(a,b){
            return b.value - a.value;
        });
        cardsClubs.sort(function(a,b){
            return b.value - a.value;
        });

        /* Put the cards from the separate arrays into a single sorted array */
        for(i=0; i< cardsHearts.length; i++){
            sortedHand.push(cardsHearts[i]);
        }
        for(i=0; i< cardsSpades.length; i++){
            sortedHand.push(cardsSpades[i]);
        }
        for(i=0; i< cardsDiamonds.length; i++){
            sortedHand.push(cardsDiamonds[i]);
        }
        for(i=0; i < cardsClubs.length; i++){
            sortedHand.push(cardsClubs[i]);
        }

        console.log(sortedHand);

        return sortedHand;
    };

};


/**
 * Init Deck and Deal
 * NOTE: Organize and move elsewhere
 */

var freshDeck = new Deck();
freshDeck.initDeck();
freshDeck.shuffleDeck();
freshDeck.deal();


/**
 * trumpGame
 * Note: Actual game play? Rounds? Everything?
 */

var trumpGame = function(){
    var self = this;
    this.trump = "";

    this.setTrump = function(suit){
        trump =suit;
        console.log("Trump is equal to "+ trump);
    }

};



var startGame = new trumpGame();


/**
 * Trump
 * @author: Am Bacchus <ameer.bacchus@gmail.com>
 */


/**
 * Card object
 */

/*var allCards = {

    'AH': {}
};

allCards['AH']*/

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
       self.hand1= c.splice(0,13);
       self.hand2= c.splice(0,13);
       self.hand3= c.splice(0,13);
       self.hand4= c.splice(0,13);
    };

    /* TODO: Develop more efficient way to sort array
     * This current system wastes memory, find a better way.
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

        return sortedHand;
    };

};

/**
 * Player Object
 * PLACE THIS IN CONSTRUCTOR
 */

var User = function(deck){
    var self = this;
    this.userHand = deck.hand1;

    /*
     this.showFive = function(){
     for(i=0; i <5; i++){

     $('#first-five-cards').append('<div class="card">  <div class="card"><img class="card-image" src="img/cardpack1/' +
     self.userHand[i].fileName + '"/>');
     }
     };
     */

    this.showUserHand = function(){
        var hand = freshDeck.sortHand(self.userHand);
        self.userHand = hand;

        for(i=0; i < self.userHand.length; i++ ){
            $('#card-space').append('<div id="'+ self.userHand[i].id +'" class="card playable"' +
                '><img value="'+ self.userHand[i].value +'" alt="'+ self.userHand[i].suit +'" class="card-image" src="img/cardpack1/' +
                self.userHand[i].fileName + '"/></div></div>');
        }
    };

    /* TODO: find more efficient way to get card from web, should be able to attach to HTML element data */
    this.playCard = function(card, value, suit){

        var fileName = suit + value + ".png";
        var id =  "#"+ value + suit;
        var foundCardMatch = false;
        var c = 0;
        var cardIndex = null;

        /* TODO: legalPlayCheck */

        /* Remove card from hand, and play on the board*/
        $(card).hide();
        $('#board').append('<div id="south-card" class="board-card"><img class="card-image" src="img/cardpack1/'+ fileName +'"/></div>');

        /* Remove card from actual array */
        while(!foundCardMatch){
            if(self.userHand[c].fileName === fileName){
                cardIndex = c;
                console.log("the card is at index " + cardIndex);
                // ?compareCard.push(self.userHand[c]);
                self.userHand.splice(c,1);
                foundCardMatch = true;
            }
            c++;
        }

    }
};

/**
 * Player Object Constructor
 */
var Player = function( hand, position, isUser ){
    var self = this;
    this.hand = hand;
    this.isUser = isUser;
    this.partner = "";
    this.position = position;
    this.firstFive = [];

    this.setFirstFive = function(){
        console.log("this works");
        for(i=0; i <5; i++){
            self.firstFive.push(self.hand[i]);
        }
        console.log(self.firstFive);
    };

    switch( this.position ){
        case "south":
            this.partner="north";
            break;
        case "north":
            this.partner="south";
            break;
        case "east":
            this.partner="west";
        case "west":
            this.partner="east";
            break;
    }


    if(!this.isUser){
        console.log("Player is a computer");
        self.hand = freshDeck.sortHand(self.hand);
    } else {
        this.setFirstFive();
    }


    console.log(this.hand);

};


/**
 * allPlayers Object
 * create players , set lead player, set teams.
 */



/**
 * trumpGame Object
 */

var TrumpGame = function(deck){
    var self = this;
    this.trump = "spades";
    this.deck = deck;
    this.playerBooks = 0;
    this.opponentsBook = 0;
    this.gameOver = false;
    this.winner = null;

    /* */
    this.deck.initDeck();
    this.deck.shuffleDeck();
    this.deck.deal();

/* IMPORTANT   */
    this.setTrump = function(suit){
/*        trump =suit;
        console.log("Trump is equal to "+ trump);*/
        $('.trump-title').append(self.trump);
    }




};

/* Init Deck */
var freshDeck = new Deck();
/* Init Game */
var startGame = new TrumpGame(freshDeck);
/* Init Human Player */
var humanPlayer = new User(freshDeck);

var southPlayer = new Player(freshDeck.hand1, "south", true);
var westPlayer = new Player(freshDeck.hand2, "west", false);
var northPlayer = new Player(freshDeck.hand3, "north", false);
var eastPlayer = new Player(freshDeck.hand4, "east", false);

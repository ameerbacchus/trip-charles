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
        self.hand1= c.splice(0,13);
        self.hand2= c.splice(0,13);
        self.hand3= c.splice(0,13);
        self.hand4= c.splice(0,13);
    };

};

/**
 * Player Object
 */
var Player = function(deck, hand, position, isHuman){
    var self= this;
    this.playerHand =[];
//    this.playerHandArray=[];
    this.handClubs =[];
    this.handHearts=[];
    this.handSpades=[];
    this.handDiamonds=[];
    this.isHuman = isHuman;
    this.position = position;
    this.team ="";
//    this.isMyTurn= false;
    this.myTurnNumber = 0;
    this.firstFive =[];

    /* set team */
    switch( this.position ){
        case "south":
            this.team="user";
            break;
        case "north":
            this.team="user";
            break;
        case "east":
            this.team="opponent";
            break;
        case "west":
            this.team="opponent";
            break;
    }

    /* set first five*/
    for(i=0; i <5; i++){
        self.firstFive.push(hand[i]);
    }

    /* Player methods */
    this.sortHand =function(hand){

        /* Separate the hand into 4 suit arrays */
        for(i = 0; i < hand.length; i++){

            if( hand[i].suit === "hearts" ){
                self.handHearts.push(hand[i]);
            } else if( hand[i].suit === "spades" ){
                self.handSpades.push(hand[i]);
            } else if( hand[i].suit === "diamonds" ){
                self.handDiamonds.push(hand[i]);
            } else if( hand[i].suit === "clubs" ){
                self.handClubs.push(hand[i]);
            }

        }

        /* Sort each suit array */
        self.handHearts.sort(function(a,b){
            return b.value - a.value;
        });
        self.handSpades.sort(function(a,b){
            return b.value - a.value;
        });
        self.handDiamonds.sort(function(a,b){
            return b.value - a.value;
        });
        self.handClubs.sort(function(a,b){
            return b.value - a.value;
        });

        /* Put the cards from the separate arrays into a single sorted array */
//        for(i=0; i< self.handHearts.length; i++){
//            self.playerHand.push(self.handHearts[i]);
//        }
//        for(i=0; i< self.handSpades.length; i++){
//            self.playerHand.push(self.handSpades[i]);
//        }
//        for(i=0; i< self.handDiamonds.length; i++){
//            self.playerHand.push(self.handDiamonds[i]);
//        }
//        for(i=0; i < self.handClubs.length; i++){
//            self.playerHand.push(self.handClubs[i]);
//        }

        self.playerHand = [self.handHearts,self.handClubs, self.handDiamonds, self.handSpades];
    };

    this.showFive = function(){
        for(i=0; i <5; i++){

            $('#first-five-cards').append('<div class="card">  <div class="card"><img class="card-image" src="img/cardpack1/' +
                self.firstFive[i].fileName + '"/>');
        }
    };

    this.setMyTurnNumber = function(number){
       self.myTurnNumber = number;
    };


    /* Player init */
    this.sortHand(hand);

    console.log(this.position + ' player initiated');

};

/**
 * allPlayers Object
 */
var allPlayers = function(deck){
    var self= this;
    this.playerTurn = "";

    this.southPlayer = new Player(deck, deck.hand1, "south", true);
    this.westPlayer = new Player(deck, deck.hand2, "west", false);
    this.northPlayer = new Player(deck, deck.hand3, "north", false);
    this.eastPlayer = new Player(deck, deck.hand4, "east",false);

    this.playersArray = [this.southPlayer, this.westPlayer, this.northPlayer, this.eastPlayer];

    this.showUserHand = function(player){

        var c = player.playerHand;
        var x = player.position;

        for(i=0; i< c.length; i++){
           for(j=0; j < c[i].length; j++){
               $('#'+ x +'-player-hand').append('<div id="'+ c[i][j].id +'" class="card playable"' +
                '><img value="'+ c[i][j].value +'" alt="'+ c[i][j].suit +'" class="card-image" src="img/cardpack1/' +
                 c[i][j].fileName + '"/></div></div>');
           }
        }

    };

    this.AIplayCard = function(player){
        console.log("AIplayCard fired");
        console.log("*********************************");
        console.log("The player sent into this AI player is "+ player.position);
        console.log(player);

        var self = this;
        this.player = player;
        this.playerHand = player.playerHand;
        this.amtClubs = this.player.handClubs.length;
        this.amtHearts = this.player.handHearts.length;
        this.amtSpades = this.player.handSpades.length;
        this.amtDiamonds = this.player.handDiamonds.length;
        this.suitArray = null;
        this.suitInPlay = "";


        //Check to see if you have the suit on board and set to SuitArray
        this.checkSuit= function(suit){
            switch(suit){
                case "clubs":
                    if(self.amtClubs > 0){
                        self.suitArray = player.handClubs;
                        self.suitInPlay = "clubs";
                        console.log("I have the suit that is on board and I set it to suitInPlay");
                    }
                    break;
                case "hearts":
                    if(self.amtHearts > 0){
                        self.suitArray = player.handHearts;
                        self.suitInPlay = "hearts";
                        console.log("I have the suit that is on board and I set it to suitInPlay");
                    }
                    break;
                case "spades":
                    if(self.amtSpades > 0){
                        self.suitArray = player.handSpades;
                        self.suitInPlay = "spades";
                        console.log("I have the suit that is on board and I set it to suitInPlay");
                    }
                    break;
                case "diamonds":
                    if(self.amtDiamonds > 0){
                        self.suitArray = player.handDiamonds;
                        self.suitInPlay = "diamonds";
                        console.log("I have the suit that is on board and I set it to suitInPlay");
                    }
                    break;
                default:
                    self.suitArray = null;
            }

        };

        this.pickACard = function(){
            console.log("AI is picking a card there should be a suitArray set by checkSuit");
            console.log("--------------------------------------------------");
            var x = self.suitArray.length;
            var r =  Math.floor(x*Math.random());

            self.playCard(self.suitArray[r]);
            self.suitArray.splice(r,1);

        };

        this.pickRandomSuit = function(){
            var r =  Math.floor(4*Math.random());
            var suit = null;

            switch(r){
                case 1:
                   suit = "clubs";
                   break;
                case 2:
                   suit = "hearts";
                   break;
                case 3:
                    suit = "diamonds";
                    break;
                case 4:
                    suit = "spades";
                    break;
                default:
                    break;
            }

            self.checkSuit(suit);

            if(!self.suitArray){
                self.pickRandomSuit();
            }

        };

        this.playCard = function(card){
            this.cardID = "#"+card.id;
            var position = self.player.position +"-card";

            $(this.cardID).addClass('card-image-overlay');
            $('#board').append('<div id="'+ position +'" class="board-card"><img class="card-image" src="img/cardpack1/'+ card.fileName +'"/></div>');


            Trump.Rounds.compareCardsPlayed(card, self.player);

        };

        //if there is a value for suitOnBoard.
        console.log("check to see if there is a suitOnBoard");
        if(Trump.Rounds.suitOnBoard){
            console.log("there is a suit on board and it is = "+ Trump.Rounds.suitOnBoard);
            this.checkSuit(Trump.Rounds.suitOnBoard);
            //Play suit on board or walk aside
            if(self.suitInPlay === Trump.Rounds.suitOnBoard){
                this.pickACard();
            } else {
                this.pickRandomSuit();
                this.pickACard();
            }

        } else {

            console.log("there isn't a suit on board, so I'm the first player probably.");
            //there is no suit on board, player is first to play.
            this.pickRandomSuit();
            this.pickACard();

        }


        self.setNextPlayerTurn(player);
        console.log("--------------------------------");
        console.log("AI Completed");
        console.log("--------------------------------");
    };

    //TODO: build in check to ensure user is making a legal play.
    this.userPlayCard = function(card, value, suit){
        var fileName = suit + value + ".png";
        var id =  "#"+ value + suit;
        var foundCardMatch = false;
        var c= self.southPlayer.playerHand;
        this.playedCard ="";
        console.log("User play entered check to see if it's my turn");
        console.log(self.southPlayer);
        console.log("it's this players turn "+ self.playerTurn);//keep this around

        if(self.playerTurn){
            console.log("This should only fire, if there is a playerTurn");
        }else{
            console.log("it's no one's turn at the moment, so it should probably be my turn.");
            self.playerTurn = self.southPlayer;
            self.southPlayer.myTurnNumber = 1;
            console.log("I successfully set myTurnNumber to "+ self.southPlayer.myTurnNumber )
        }

        if (self.southPlayer === self.playerTurn){// why not just check to see playerTurn in the players object?
            console.log("User play has been initiated because it's my turn");
            /* TODO: legalPlayCheck */
            $(card).hide();
            $('#board').append('<div id="south-card" class="board-card"><img class="card-image" src="img/cardpack1/'+ fileName +'"/></div>');


            console.log("I'm looking for a match within the card array for the card played");
            /* Remove card from actual array */
            for(i=0; i < c.length; i++){
                for(j=0; j < c[i].length; j++){
                    if(c[i][j].fileName === fileName){
                        console.log("I found a match");
                        self.playedCard= c[i][j];
                        console.log(self.playedCard);
                        console.log("The array used to be like below");
                        console.log(c);
                        c[i].splice(j,1);
                        console.log("Now it's like this");
                        console.log(c);
                        foundCardMatch = true;
                        break;
                    }
                }
                if(foundCardMatch){
                    console.log("I exited the inner for loop of the card removal to go through the other suits, but don't need to");
                    break;}

                console.log("I exited the inner for loop of the card removal to go through the other suits");
            }


            console.log("userPlayCard is firing compareCardsPlayed");
            Trump.Rounds.compareCardsPlayed(this.playedCard, self.southPlayer);
            Trump.Rounds.setCardsPlayed();

            console.log("I'm going to go ahead and set the next Player");
            self.setNextPlayerTurn(self.southPlayer);

        } else {
            alert("AYE Don't poke poke the screen, it's not you turn");
        }

        console.log("userPlayCard ending");

    };

    this.playNext= function(player){
        console.log("playNext fired");
        console.log("*********************************");
        console.log("ok I'm the player sent into the the function ="+ player.position);
        console.log(player);
        console.log("and it's this players turn right? playerTurn below");
        console.log(self.playerTurn);

        console.log("Ok, let's check to see if the next player is human or not");
        if(!player.isHuman){
            console.log("This is a computer ready to play.");
            setTimeout(function(){
                self.AIplayCard(player);
            },1000);
        } else {
            console.log("ideally, this function playNext should end before a user plays.")
        }

        console.log("*********************************");
        console.log("playNext is ending");
    };

    this.setNextPlayerTurn= function(player){

        this.turnNumber = player.myTurnNumber;
        this.nextTurnNumber = this.turnNumber + 1;


        $('#opponent-right').removeClass('player-turn-indicator');
        $('#partner').removeClass('player-turn-indicator');
        $('#opponent-left').removeClass('player-turn-indicator');

        //debuggging
        console.log("setNextPlayerTurn fired");
        console.log("*******************************");
        console.log("I am the "+ player.position +" player");
        console.log(player);
        console.log("This is my turn number " + this.turnNumber);
        console.log("this is the next turn number " + this.nextTurnNumber);
        console.log("The next line should match the player above.");
        console.log(self.playerTurn);

        console.log("Ok, let's set a turn if there as long as turn number hasn't exceed 4");
        if(this.turnNumber < 4){

            console.log("turnNumber is less than 5");

            switch(player.position){
                case "south":
                   //debugging
                   console.log("The current player is south, so east should be next");
                   console.log(self.playerTurn.position);

                    self.playerTurn = self.eastPlayer;
                    self.eastPlayer.setMyTurnNumber(this.nextTurnNumber);

                    //debugging
                    console.log("East is now next, proof below");
                    console.log(self.playerTurn.position);
                    console.log(self.playerTurn);


                   break;

                case "east":
                    console.log("The current player is east, so North should be next");
                    console.log(self.playerTurn.position);
                    $('#opponent-right').addClass('player-turn-indicator');
                    self.playerTurn = self.northPlayer;
                    self.northPlayer.setMyTurnNumber(this.nextTurnNumber);


                    //debugging
                    console.log("North is now next, proof below");
                    console.log(self.playerTurn.position);
                    console.log(self.playerTurn);

                    break;

                case "north":
                    //debugging
                    console.log("The current player is North, so West should be next");
                    console.log(self.playerTurn.position);
                    $('#partner').addClass('player-turn-indicator');
                    self.playerTurn = self.westPlayer;
                    self.westPlayer.setMyTurnNumber(this.nextTurnNumber);


                    //debugging
                    console.log("West is now next, proof below");
                    console.log(self.playerTurn.position);
                    console.log(self.playerTurn);

                    break;

                case "west":
                    //debugging
                    console.log("The current player is West, so South should be next");
                    console.log(self.playerTurn.position);
                    $('#opponent-left').addClass('player-turn-indicator');
                    self.playerTurn= self.southPlayer;
                    self.southPlayer.setMyTurnNumber(this.nextTurnNumber);


                    //debugging
                    console.log("South is now next, proof below");
                    console.log(self.playerTurn.position);
                    console.log(self.playerTurn);
                    break;
            }

            self.playNext(self.playerTurn);//Don't run this right now.
            console.log("The switch has been executed, and the playerTurn has been reset");
            console.log(self.playerTurn);
            console.log("Now, let's actually let someone else play. trigger playNext");

            console.log("*******************************");
        }
        // if round is Over
        if(this.nextTurnNumber === 5){
            console.log("Guess what? the last player has played, and now I can end this round.");
            setTimeout(function(){
                Trump.Rounds.resetRound();
            },1000);
        }


        console.log("setNextPlayerTurn is ending");
        console.log("The player who is last set to the end, may be causing a problem");
        console.log("The text here should probably only fire if all players have played");
        console.log("I am the "+ player.position +" player that was sent into the function");
        console.log("I am the "+ self.playerTurn.position +" player who is now set to playerTurn");
        console.log(self.playerTurn);
        console.log(this.nextTurnNumber);
        console.log("*******************************");
    };



};



/**
 * playRounds Object
 */
var playRounds = function(players){
   var self = this;
   this.players = players;
   this.suitOnBoard = "";
   this.cardsPlayed = 0;
   this.winningPlayer = players.southPlayer;
   this.tempWinningCard = "";
   this.tempWinningPlayer = "";

   console.log("Rounds ready to be played");
//   players.setFirstPlayer(this.winningPlayer);

   this.setSuitOnBoard = function(suit){
        console.log(suit+ " is on board");
        self.suitOnBoard = suit;
   };

   this.setCardsPlayed = function(){
       self.cardsPlayed++;
       console.log("setCardsPlayed initiated and added to = "+ self.cardsPlayed);
   };

   this.resetTurns = function(){
        for (i=0; i < self.players.playersArray.length; i++){
            self.players.playersArray[i].myTurnNumber = 0;
        }
    };

   this.resetRound = function(){
       console.log("round is being reset");
       self.winningPlayer = self.tempWinningPlayer;
       self.suitOnBoard = "";
       self.tempWinningCard ="";
       self.tempWinningPlayer ="";
       self.players.playerTurn = self.winningPlayer;

       self.resetTurns();

       self.winningPlayer.myTurnNumber = 1;

       Trump.setPlayerBooks(self.winningPlayer);
       $('#board').empty();

       setTimeout(function(){
           self.players.playNext(self.winningPlayer);
       },1000);

   };

   this.compareCardsPlayed= function( card, player){
       console.log("compareCardsPlayed fired");
       console.log("**********************************");
       console.log("I'm this player " + player.position);
       console.log(player);
       console.log("This is the card I played " + card.id);
       console.log(card);


       console.log("Ok, did I play Trump?");
       // card was trump
       if(card.suit === Trump.trump){
           console.log("Yes bitches, I'm playing trump. I am the trump master.");


           if(!self.suitOnBoard){

               console.log("I played trump, and there's no suit on board. so I'll set the suit.");
               self.tempWinningCard = card;
               self.tempWinningPlayer = player;
               self.suitOnBoard = card.suit;

           } else if (card.value >  self.tempWinningCard.value){

               console.log("I played trump, and my card beat the highest card on board.");
               self.tempWinningCard = card;
               self.tempWinningPlayer = player;

           } else if( card.value < self.tempWinningCard.value){

               console.log("I played trump, but it was lower than the highest card on board.");

           }

        // no cards played yet
       } else if(!self.suitOnBoard){

           console.log("Nope I didn't play trump, it looks like I'm first to play");
           console.log("So my card suit should be set to suitOnBoard");
           console.log("Suit on board = "+ self.suitOnBoard);

           self.tempWinningCard = card;
           self.tempWinningPlayer = player;
           self.setSuitOnBoard(card.suit);

       // card matches suitOnBoard
       } else if(card.suit === self.suitOnBoard) {

           console.log("Nope I didn't play trump, and there's already a suitOnBoard");
           console.log("So my card suit should be set to suitOnBoard");
           console.log("Suit on board = "+ self.suitOnBoard);

           if(self.tempWinningCard.suit === Trump.trump){
              console.log("MUDDA-SKUNT, some one played trump, I lost.");
           } else if(card.value > self.tempWinningCard.value){
               self.tempWinningCard = card;
               self.tempWinningPlayer = player;
               console.log("I just beat someone else's card");
           } else {
               console.log("fuck, I lost");
           }

       // walked aside
       }  else if(card.suit != self.suitOnBoard){

           console.log("I played a card that doesn't match the suit that's on board");
           console.log("The Suit on board = "+ self.suitOnBoard);
           console.log("And my card suit was = "+ card.suit);
           console.log("I should lose this round, unless my partner won the round.");

       // find edge case
       } else {

           console.log("this is an edge case the programmer did not thought of. something is either wrong, or hes stupid")

       }

       console.log("compareCards is ending heres some results of who was set to tempwinner and tempcard");
       console.log(self.tempWinningPlayer);
       console.log(self.tempWinningCard);

       console.log("**********************************");
       console.log("compareCardsPlayed ending, resume your normally scheduled function");
   };

    /*
    *
    * IF you cant get everything fixed. May have to restructure.
    *
    * */

/*   this.playNext= function(player, card, value, suit){
     console.log("playNext fired");
     console.log("*********************************");
     console.log("ok I'm the player sent into the the function ="+ player.position);
     console.log(player);
     console.log("and it's this players turn right? playerTurn below");
     console.log(self.playerTurn);

     console.log("Ok, let's check to see if the next player is human or not");
     if(!player.isHuman){
     console.log("This is a computer ready to play.");
     //            setTimeout(function(){
     //                self.AIplayCard(player);
     //            },1000);
     } else {
         console.log("you're the user so play your card");
         self.players.userPlayCard(player, card, value, suit);
     }

     console.log("*********************************");
     console.log("playNext is ending");
     };*/

    console.log("*********************************");
};




/**
 * trumpGame Object
 */

var TrumpGame = function(){
    var self = this;
    this.trump = "spades";
    this.deck = new Deck;
    this.playerBooks = 0;
    this.opponentsBooks = 0;
    this.gameOver = false;
    this.winner = null;

    /* */
    console.log("trump started");
    console.log("Trump is equal to "+ self.trump);//remove if setTrump is active.

    this.deck.initDeck();
    console.log("deck initialized");

    this.deck.shuffleDeck();
    console.log("deck shuffled");

    this.deck.deal();
    console.log("deck dealed");

    this.Players = new allPlayers(this.deck);
    console.log("players have been built");

    this.Rounds = new playRounds(this.Players);

    /* IMPORTANT   */
    this.setTrump = function(suit){
        self.trump = "";
        console.log("Trump is equal to "+ self.trump);
        $('.trump-title').append(self.trump);
    };

    this.setPlayerBooks= function(winner){
        if(winner.team ==="user"){
            self.playerBooks++;
            console.log("you just got a book");
            alert("Mat sats : Arrite we win won chap!");
            $('#my-books').replaceWith('<span id="my-books">'+ self.playerBooks +'</span>');

            if(self.playerBooks === 7){
                alert("Mat says: YES BUDDDY! We win, we win");
                self.gameOver = true;
            }


        }else if (winner.team==="opponent"){
            self.opponentsBooks++;
            alert("Mat says: what happen chap? We lose this round");
            console.log("you just lost a book");
            $('#opponents-books').replaceWith('<span id="opponents-books">'+ self.opponentsBooks +'</span>');

            if(self.opponentsBooks === 7){
                alert("Mat says: Yuh Rass, yuh make we lose");
                self.gameOver = true;
            }

        }
    };





};


/* init Trump */
var Trump = new TrumpGame;



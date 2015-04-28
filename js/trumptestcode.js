/**
 * Trump
 * @author: Am Bacchus <ameer.bacchus@gmail.com>
 *
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

        self.playerHand = [self.handHearts,self.handClubs, self.handDiamonds, self.handSpades];
    };

    /* show five cards to user to pick trump from */
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
        console.log("AIplayCard fired / " + player.position + " is playing");
        console.log("*********************************");

        var self = this;

        this.player = player;
        this.playerHand = player.playerHand;
        this.amtClubs = this.player.handClubs.length;
        this.amtHearts = this.player.handHearts.length;
        this.amtSpades = this.player.handSpades.length;
        this.amtDiamonds = this.player.handDiamonds.length;
//        this.amtTrump ="";
        this.suitArray = null;
        this.suitInPlay = "";


/*        switch(Trump.trump){
            case "clubs":
                this.amtTrump = this.amtClubs;
                break;

        }*/

//        // Show all the cards in the suit that needs to be played, should be indexed from high to low.
//        this.evalSuit = function (){
//
//            console.log(Trump.Rounds.tempWinningCard);
//            console.log(Trump.Rounds.tempWinningPlayer);
//        };

        // Check to see if you have cards in the suit on board and set to SuitArray
        this.checkSuit= function(suit){
            switch(suit){
                case "clubs":
                    if(self.amtClubs > 0){
                        self.suitArray = player.handClubs;
                        self.suitInPlay = "clubs";
                    }
                    break;
                case "hearts":
                    if(self.amtHearts > 0){
                        self.suitArray = player.handHearts;
                        self.suitInPlay = "hearts";
                    }
                    break;
                case "spades":
                    if(self.amtSpades > 0){
                        self.suitArray = player.handSpades;
                        self.suitInPlay = "spades";
                    }
                    break;
                case "diamonds":
                    if(self.amtDiamonds > 0){
                        self.suitArray = player.handDiamonds;
                        self.suitInPlay = "diamonds";
                    }
                    break;
                default:
                    self.suitArray = null;
            }

        };

        //pick a low card after suitInPlay is set, and remove from hand
        this.pickLowCard = function(){
            var x = self.suitArray.length;
            var r =  x-1;
            self.playCard(self.suitArray[r]);
            self.suitArray.splice(r,1);
        }

        //pick a high card after suitInPlay is set, and remove from hand
        this.pickHighCard = function(){
            var x = self.suitArray.length;
            var r =  0;
            self.playCard(self.suitArray[r]);
            self.suitArray.splice(r,1);
        }

        //pick a random card after suitInPlay is set, and remove from hand
        this.pickRandomCard = function(){
            var x = self.suitArray.length;
            var r =  Math.floor(x*Math.random());
            self.playCard(self.suitArray[r]);
            self.suitArray.splice(r,1);
        }


        //Choose between low or high
        this.SmartPickCard = function(){

             if(Trump.Rounds.tempWinningPlayer.team == self.player.team){
                 console.log("my team is winning so I'll play low");
                 self.pickLowCard();
             } else if(self.suitArray[0].value > Trump.Rounds.tempWinningCard.value){
                 console.log("my team is losing so I'll play high");
                 self.pickHighCard();
             } else{
                 console.log("can't beat that");
                 self.pickLowCard();
             }

        };


        /*
         * Pick random suit should be modified, pick random, non trump suit
         * Pick trump
         * cases to pick cards should be.
         * play lowest card in suit on board
         * play highest card in suit on board if you can beat the current card
         * has the suit on board been cut?
         * */



        //pick a random suit to play when no suit is on board, or suit is out of cards
        this.pickRandomSuit = function(){
            var r =  Math.floor(4*Math.random()+1);
            var suit = "";

           // TODO: more logic to be implemented to make the AI smarter
            /*NOTE: the logic in checkSuit and pickRandomSuit is slightly redundant.
            * this redundancy is necessary to avoid repeatedly picking a random number to check
            * a suit that the player DOES NOT have cards to play
            */
            switch(r){
                case 1:
                    if(self.amtClubs>0){
                      suit = "clubs";
                    } else if (self.amtSpades > 0){
                        suit = "spades";
                    } else if (self.amtDiamonds > 0){
                        suit = "diamonds";
                    } else if (self.amtHearts > 0){
                        suit = "hearts";
                    }

                   break;
                case 2:

                    if(self.amtHearts>0){
                        suit = "hearts";
                    }  else if (self.amtClubs > 0){
                        suit = "clubs";
                    } else if (self.amtDiamonds > 0){
                        suit = "diamonds";
                    } else if (self.amtSpades > 0){
                        suit = "spades";
                    }

                    break;
                case 3:
                    if(self.amtDiamonds>0){
                        suit = "diamonds";
                    } else if (self.amtClubs > 0){
                        suit = "clubs";
                    } else if (self.amtSpades > 0){
                        suit = "spades";
                    } else if (self.amtHearts > 0){
                        suit = "hearts";
                    }
                case 4:
                    if (self.amtSpades>0){
                        suit = "spades";
                    } else if (self.amtClubs > 0){
                        suit = "clubs";
                    } else if (self.amtDiamonds > 0){
                        suit = "diamonds";
                    } else if (self.amtHearts > 0){
                        suit = "hearts";
                    }
                    break;
                default:
                    break;
            }

            self.checkSuit(suit);

        };

        //show the card on the screen and compare to see who's card is leading
        this.playCard = function(card){
            this.cardID = "#"+card.id;
            var position = self.player.position +"-card";

//            $(this.cardID).addClass('card-image-overlay');
            $('#board').append('<div id="'+ position +'" class="board-card"><img class="card-image" src="img/cardpack1/'+ card.fileName +'"/></div>');

            Trump.Rounds.compareCardsPlayed(card, self.player);

        };

        // MAIN AI LOGIC / Choose a smart card to play based on other cards on the board
        if(Trump.Rounds.suitOnBoard){
            console.log("there is a suit on board and it is = "+ Trump.Rounds.suitOnBoard);
            this.checkSuit(Trump.Rounds.suitOnBoard);
            console.log("Suit in play is equal to = "+ this.suitInPlay);

            //I have cards in the suit on board and no one has cut
            if(this.suitInPlay === Trump.Rounds.suitOnBoard && !Trump.Rounds.suitWasCut){
                console.log("I have the suit, and no one has cut, I should play High or Low based on my partner");
                this.SmartPickCard();
            }
            // I have the suit on board, but someone has cut
            else if (this.suitInPlay === Trump.Rounds.suitOnBoard && Trump.Rounds.suitWasCut) {
                console.log("Someone cut, I have the suit on board, I need to play my lowest card");
                this.pickLowCard();
            }
            // I don't have the suit on board, and no one has cut yet
            else if(this.suitInPlay != Trump.Rounds.suitOnBoard && !Trump.Rounds.suitWasCut){
                console.log("I don't have the suit, and no one cut yet");

                if(Trump.Rounds.tempWinningPlayer.team != this.player.team){
                    this.checkSuit(Trump.trump);
                    console.log("I don't have the suit on board and my team isn't winning");
                    if(this.suitInPlay == Trump.trump){
                        console.log("I have trump, so I'm going to play a low trump");
                        this.pickLowCard();
                    }
                    else{
                        console.log("I don't have the suit on board, nor trump");
                        this.pickRandomSuit();
                        this.pickLowCard();
                    }
                } else{
                    console.log("My Teammate is winning so I'll just walk aside. ");
                    this.pickRandomSuit();
                    this.pickLowCard();
                }
            }
            // I don't have the suit on board, and someone else has cut
            else if(this.suitInPlay != Trump.Rounds.suitOnBoard && Trump.Rounds.suitWasCut){
                 this.checkSuit(Trump.trump);
                console.log(" I dont have the suit on board, and someone else has cut ");
                 if(this.suitInPlay === Trump.trump && this.suitArray[0].value > Trump.Rounds.tempWinningCard.value ){
                     console.log("I can beat the cutters trump card");
                     this.pickHighCard();
                 } else{
                     console.log("I can't beat the cutters trump card");
                     this.pickRandomSuit();
                     this.pickLowCard();
                 }
            } else {
                console.log("unanticipated use case");
                this.pickRandomSuit();
                this.pickRandomCard();
            }

        } else {

            //there is no suit on board, player is first to play.
            console.log("I'm the first to play, so I'm going to play randomly")
            this.pickRandomSuit();
            this.pickRandomCard();

        }


        self.setNextPlayerTurn(player);

        console.log("AI Completed");
        console.log("--------------------------------");
    };

    //TODO: build in check to ensure user is making a legal play.
    this.userPlayCard = function(card, value, suit){

        console.log("userPlayCardfired");
        var self = this;
        var fileName = suit + value + ".png";
        var id =  "#"+ value + suit;
        var foundCardMatch = false;
        var c= self.southPlayer.playerHand;

        this.amtClubs = self.southPlayer.handClubs.length;
        this.amtHearts = self.southPlayer.handHearts.length;
        this.amtSpades = self.southPlayer.handSpades.length;
        this.amtDiamonds = self.southPlayer.handDiamonds.length;

        this.legalCheck = true;
        this.playedCard ="";

        /* this function probably doesn't need to be used outside this scope */
        this.setLegalCheck = function(){
            if(suit != Trump.Rounds.suitOnBoard){

                switch(Trump.Rounds.suitOnBoard){
                    case "clubs":
                        if(self.amtClubs === 0){
                            self.legalCheck = true;
                        } else{
                            self.legalCheck = false;
                        }
                        break;

                    case "hearts":
                        if(self.amtHearts === 0){
                            self.legalCheck = true;
                        } else{
                            self.legalCheck = false;
                        }
                        break;

                    case "spades":
                        if(self.amtSpades === 0){
                            self.legalCheck = true;
                        } else{
                            self.legalCheck = false;
                        }
                        break;

                    case "diamonds":
                        if(self.amtDiamonds === 0){
                            self.legalCheck = true;
                        } else{
                            self.legalCheck = false;
                        }
                        break;
                    default:
                        self.legalCheck = true;
                }

            }
        };


        /* if user isn't first to play, check to see if it's a legal play*/
        if(Trump.Rounds.suitOnBoard){
           this.setLegalCheck();
        }


        /* ensure the playerTurn has been set - NOTE: probably not a critical condition as other code should handle this */
        if(!self.playerTurn){
            console.log("it's no one's turn at the moment, so it should probably be my turn.");
            self.playerTurn = self.southPlayer;
            self.southPlayer.myTurnNumber = 1;
        }


        if (self.southPlayer === self.playerTurn){// why not just check to see playerTurn in the players object? precaution?

            /* TODO: legalPlayCheck */

            if(!this.legalCheck){
                alert("Hey don't try to cheat! If you have cards in the suit that is currently on board, you have to play them!");
            } else {
                $(card).hide();
                $('#board').append('<div id="south-card" class="board-card"><img class="card-image" src="img/cardpack1/'+ fileName +'"/></div>');

                /* Remove card from actual array */
                for(i=0; i < c.length; i++){
                    for(j=0; j < c[i].length; j++){
                        if(c[i][j].fileName === fileName){
                            self.playedCard= c[i][j];
                            c[i].splice(j,1);
                            foundCardMatch = true;
                            break;
                        }
                    }
                    if(foundCardMatch){
                        break;
                    }
                }

                Trump.Rounds.compareCardsPlayed(this.playedCard, self.southPlayer);//compare card to other cards on board
                Trump.Rounds.setCardsPlayed();//increment the amount of cards played in current round
                self.setNextPlayerTurn(self.southPlayer);//counter clockwise to east player

            }


        } else {
            alert("AYE Don't poke-poke the screen, it's not you turn");
        }

        console.log("userPlayCard ending");

    };

    this.playNext= function(player){
        console.log("playNext fired");

        self.setPlayerIndicator(player);
        
        if(!player.isHuman){

            setTimeout(function(){
               self.AIplayCard(player);
            },800);
        } else {
            // TODO: alert user that it's their turn
            // maybe black out the users card when it's not their turn, and then
            // on the users turn make the cards that are playable visible.?
        }

        console.log("playNext is ending");
    };

    this.setPlayerIndicator = function(player){
        var position = player.position;
        var id = "#"+ position +"-player";
      // .player-turn-indicator

        $("#north-player").removeClass('player-turn-indicator');
        $("#west-player").removeClass('player-turn-indicator');
        $("#east-player").removeClass('player-turn-indicator');

        if( position != "south"){
            $(id).addClass('player-turn-indicator');
        }

    };

    this.setNextPlayerTurn= function(player){

        console.log("setNextPlayerTurn fired");


        this.turnNumber = player.myTurnNumber;
        this.nextTurnNumber = this.turnNumber + 1;


        if(this.turnNumber < 4){

            switch(player.position){
                case "south":
                    self.playerTurn = self.eastPlayer;
                    self.eastPlayer.setMyTurnNumber(this.nextTurnNumber);
                    break;

                case "east":
                    self.playerTurn = self.northPlayer;
                    self.northPlayer.setMyTurnNumber(this.nextTurnNumber);
                    break;

                case "north":
                    self.playerTurn = self.westPlayer;
                    self.westPlayer.setMyTurnNumber(this.nextTurnNumber);
                    break;

                case "west":
                    self.playerTurn= self.southPlayer;
                    self.southPlayer.setMyTurnNumber(this.nextTurnNumber);
                    break;
            }

            self.playNext(self.playerTurn);
        }

        // if round is Over
        if(this.nextTurnNumber === 5){
            setTimeout(function(){
                Trump.Rounds.resetRound();
            },500);
        }

    };


};



/**
 * playRounds Object
 */
var playRounds = function(players){
   var self = this;
   this.players = players;
   this.suitOnBoard = "";
   this.suitWasCut = false;
   this.cardsPlayed = 0;
   this.winningPlayer = players.southPlayer;
   this.tempWinningCard = "";
   this.tempWinningPlayer = "";


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
       self.suitWasCut = false;
       self.cardsPlayed = 0;
       self.resetTurns();

       self.winningPlayer.myTurnNumber = 1;

       Trump.setPlayerBooks(self.winningPlayer);

//       self.players.playNext(self.winningPlayer);
       if(!Trump.gameOver){
           setTimeout(function(){
               self.players.playNext(self.winningPlayer);
           },2000);
       }else{
           Trump.endGame();
       }

   };

   this.compareCardsPlayed= function( card, player){
       console.log("compareCardsPlayed fired");


       // card was trump
       if(card.suit === Trump.trump){
           if(!self.suitOnBoard){
               //trump was played, no suit on board
               self.tempWinningCard = card;
               self.tempWinningPlayer = player;
               self.suitOnBoard = card.suit;

           } else if (self.tempWinningCard.suit != Trump.trump){
               // suit is on board, no other trump was played
               self.tempWinningCard = card;
               self.tempWinningPlayer = player;
               if(self.suitOnBoard != Trump.trump){self.suitWasCut = true;}

           } else if( card.value > self.tempWinningCard.value){
               // if trump was already played, compare cards
               self.tempWinningCard = card;
               self.tempWinningPlayer = player;
           } else {
               console.log("I lost to someone else's trump")
           }

       } else if(!self.suitOnBoard){
           /* no cards played yet  */
           self.tempWinningCard = card;
           self.tempWinningPlayer = player;
           self.setSuitOnBoard(card.suit);

       } else if(card.suit === self.suitOnBoard) {
           /* card matches suitOnBoard */

           if(self.tempWinningCard.suit === Trump.trump){
              console.log("some one played trump, I lost.");
           } else if(card.value > self.tempWinningCard.value){
               self.tempWinningCard = card;
               self.tempWinningPlayer = player;
               console.log("I just beat someone else's card");
           } else {
               console.log("Played the card on board, but lost");
           }


       // walked aside
       }  else if(card.suit != self.suitOnBoard){

           console.log("Player walked aside");

       // find edge case
       } else {
           alert("error: edge case scenario.")
           console.log("this is an edge case the programmer did not thought of. something is either wrong, or hes stupid")

       }

       console.log("compareCardsPlayed ending, resume your normally scheduled function");
   };

};

/**
 * trumpGame Object
 */

var TrumpGame = function(){
    var self = this;
    this.trump = "";
    this.deck = new Deck;
    this.playerBooks = 0;
    this.opponentsBooks = 0;
    this.gameOver = false;
    this.winner = null;

    /* */
    console.log("trump started");

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
        self.trump = suit;
        console.log("Trump is equal to "+ self.trump);
        $('.trump-title').append(self.trump);
    };

    this.setPlayerBooks= function(winner){
        if(winner.team ==="user"){
            self.playerBooks++;
            console.log("you just got a book");
//            alert("Mat sats : Arrite we win won chap!");


            setTimeout(function(){
                $('.board-card').fadeOut("slow");
                $('#my-books').replaceWith('<span id="my-books">'+ self.playerBooks +'</span>');
            },1000);


            if(self.playerBooks === 7){
                $('#game-result').replaceWith('<h1 id="game-result">Yesss Buddy! You won!</h1>');
                self.gameOver = true;
            }


        }else if (winner.team==="opponent"){
            self.opponentsBooks++;
            console.log("you just lost a book");
//            alert("Mat says: what happen chap? We lose this round");

            setTimeout(function(){
                $('.board-card').fadeOut("slow");
                $('#opponents-books').replaceWith('<span id="opponents-books">'+ self.opponentsBooks +'</span>');
            },1000);


            if(self.opponentsBooks === 7){
                $('#game-result').replaceWith('<h1 id="game-result">Awww shucks! You lost!</h1>');
                self.gameOver = true;
            }

        }
    };


    this.endGame= function(){
       setTimeout(function(){
           $('.card-space').empty();
           $('#overlay').fadeIn();
           $('#trump-gameover').show();
       },1200);

    };


};

/* init Trump */
var Trump = new TrumpGame;
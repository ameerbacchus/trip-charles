/**
 * Trump
 * @author: Am Bacchus <ameer.bacchus@gmail.com>
 *
 */

/**
 * Constants
 */
var CLUBS = 'clubs';
var SPADES = 'spades';
var HEARTS = 'hearts';
var DIAMONDS = 'diamonds';

/**
 * Card object
 */
var Card = function(value, suit) {
    this.value = value;
    this.suit = suit;
    this.fileName = suit + value + ".png";
    this.id = value + suit;
};

/**
 * Deck object
 */
var Deck = function() {
    this.cards = [];
    this.hand1 = [];
    this.hand2 = [];
    this.hand3 = [];
    this.hand4 = [];

    this.initDeck = function() {
        for ( var i = 0; i < 13; i++) {
            this.cards[i] = new Card(i + 2, HEARTS);
            this.cards[i + 13] = new Card(i + 2, CLUBS);
            this.cards[i + 26] = new Card(i + 2, DIAMONDS);
            this.cards[i + 39] = new Card(i + 2, SPADES);
        }
    };

    this.shuffleDeck = function() {
        var n = Math.floor(400 * Math.random() + 500);
        var card1;
        var card2;
        var temp;

        for ( var i = 0; i < n; i++) {
            card1 = Math.floor(52 * Math.random());
            card2 = Math.floor(52 * Math.random());
            temp = this.cards[card2];
            this.cards[card2] = this.cards[card1];
            this.cards[card1] = temp;
        }
    };

    this.deal = function() {
        var c = this.cards;
        this.hand1 = c.splice(0, 13);
        this.hand2 = c.splice(0, 13);
        this.hand3 = c.splice(0, 13);
        this.hand4 = c.splice(0, 13);
    };
};

/**
 * Player Object
 */
var Player = function(deck, hand, position, isHuman) {
    this.playerHand = [];
    this.handClubs = [];
    this.handHearts = [];
    this.handSpades = [];
    this.handDiamonds = [];
    this.isHuman = isHuman;
    this.position = position;
    this.team = '';
    this.myTurnNumber = 0;
    this.firstFive = [];

    /* set team */
    switch (this.position) {
        case "south":
            this.team = "user";
            break;
        case "north":
            this.team = "user";
            break;
        case "east":
            this.team = "opponent";
            break;
        case "west":
            this.team = "opponent";
            break;
    }

    /* set first five */
    for ( var i = 0; i < 5; i++) {
        this.firstFive.push(hand[i]);
    }

    this.sortHand = function(hand) {

        function ucfirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        /* Separate the hand into 4 suit arrays */
        for ( var i = 0; i < hand.length; i++) {
            var card = hand[i];

            // this assigns suitHand to one of the following: this.handHearts,
            // this.handSpades, this.handDiamonds, this.handClubs
            var handSuit = this['hand' + ucfirst(card.suit)];

            handSuit.push(card);
        }

        /* Sort each suit array */
        function sortHand(a, b) {
            return b.value - a.value;
        }
        this.handHearts.sort(sortHand);
        this.handSpades.sort(sortHand);
        this.handDiamonds.sort(sortHand);
        this.handClubs.sort(sortHand);

        this.playerHand = [this.handHearts, this.handClubs, this.handDiamonds, this.handSpades];
    };

    /* show five cards to user to pick trump from */
    this.showFive = function() {
        var $firstFive = $('#first-five-cards');
        $firstFive.empty();

        for ( var i = 0; i < 5; i++) {
            $firstFive.append('<div class="card">' + '    <img class="card-image" src="img/cardpack1/'
                + this.firstFive[i].fileName + '"/>' + '</div>');
        }
    };

    this.setMyTurnNumber = function(number) {
        this.myTurnNumber = number;
    };

    /* Player init */
    this.sortHand(hand);
};

/**
 * allPlayers Object
 */
var allPlayers = function(deck) {
    this.playerTurn = '';

    this.southPlayer = new Player(deck, deck.hand1, "south", true);
    this.westPlayer = new Player(deck, deck.hand2, "west", false);
    this.northPlayer = new Player(deck, deck.hand3, "north", false);
    this.eastPlayer = new Player(deck, deck.hand4, "east", false);

    this.playersArray = [this.southPlayer, this.westPlayer, this.northPlayer, this.eastPlayer];

    this.showUserHand = function(player) {
        var c = player.playerHand;
        var x = player.position;

        for ( var i = 0; i < c.length; i++) {
            for ( var j = 0; j < c[i].length; j++) {
                var card = c[i][j];
                $('#' + x + '-player-hand').append(
                    '<div id="' + card.id + '" class="card playable">' + '    <img value="' + card.value
                        + '" alt="' + card.suit + '" class="card-image" src="img/cardpack1/' + card.fileName
                        + '" />' + '</div>');
            }
        }
    };

    this.AIplayCard = function(player) {
        this.playerHand = player.playerHand;

        var amts = {
            clubs: player.handClubs.length,
            hearts: player.handHearts.length,
            spades: player.handSpades.length,
            diamonds: player.handDiamonds.length
        };
        var suitArray = null;
        var suitInPlay = '';

        // Check to see if you have cards in the suit on board and set to
        // SuitArray
        var checkSuit = function(suit) {
            switch (suit) {
                case CLUBS:
                    if (amts.clubs > 0) {
                        suitArray = player.handClubs;
                        suitInPlay = CLUBS;
                    }
                    break;

                case HEARTS:
                    if (amts.hearts > 0) {
                        suitArray = player.handHearts;
                        suitInPlay = HEARTS;
                    }
                    break;

                case SPADES:
                    if (amts.spades > 0) {
                        suitArray = player.handSpades;
                        suitInPlay = SPADES;
                    }
                    break;

                case DIAMONDS:
                    if (amts.diamonds > 0) {
                        suitArray = player.handDiamonds;
                        suitInPlay = DIAMONDS;
                    }
                    break;

                default:
                    console.log('I SHOULD NOT BE HERE');
                    suitArray = null;
                    break;
            }
        };

        // pick a low card after suitInPlay is set, and remove from hand
        var pickLowCard = function() {
            var x = suitArray.length;
            var r = x - 1;
            playCard(suitArray[r]);
            suitArray.splice(r, 1);
        };

        // pick a high card after suitInPlay is set, and remove from hand
        var pickHighCard = function() {
            var r = 0;
            playCard(suitArray[r]);
            suitArray.splice(r, 1);
        };

        // pick a random card after suitInPlay is set, and remove from hand
        var pickRandomCard = function() {
            var x = suitArray.length;
            var r = Math.floor(x * Math.random());
            playCard(suitArray[r]);
            suitArray.splice(r, 1);
        };

        // Choose between low or high
        var SmartPickCard = function() {
            if (Trump.Rounds.tempWinningPlayer.team == player.team) {
                pickLowCard();
            } else if (suitArray[0].value > Trump.Rounds.tempWinningCard.value) {
                pickHighCard();
            } else {
                pickLowCard();
            }
        };

        /*
         * Pick random suit should be modified, pick random, non trump suit Pick trump cases to pick cards should be.
         * play lowest card in suit on board play highest card in suit on board if you can beat the current card has the
         * suit on board been cut?
         */

        // pick a random suit to play when no suit is on board, or suit is out of cards
        var pickRandomSuit = function() {
            var r = Math.floor(4 * Math.random() + 1);
            var suit = "";

            // @todo: more logic to be implemented to make the AI smarter
            /*
             * NOTE: the logic in checkSuit and pickRandomSuit is slightly redundant. this redundancy is necessary to
             * avoid repeatedly picking a random number to check a suit that the player DOES NOT have cards to play
             */
            switch (r) {
                case 1:
                    if (amts.clubs > 0) {
                        suit = CLUBS;
                    } else if (amts.spades > 0) {
                        suit = SPADES;
                    } else if (amts.diamonds > 0) {
                        suit = DIAMONDS;
                    } else if (amts.hearts > 0) {
                        suit = HEARTS;
                    }

                    break;

                case 2:
                    if (amts.hearts > 0) {
                        suit = HEARTS;
                    } else if (amts.clubs > 0) {
                        suit = CLUBS;
                    } else if (amts.diamonds > 0) {
                        suit = DIAMONDS;
                    } else if (amts.spades > 0) {
                        suit = SPADES;
                    }

                    break;

                case 3:
                    if (amts.diamonds > 0) {
                        suit = DIAMONDS;
                    } else if (amts.clubs > 0) {
                        suit = CLUBS;
                    } else if (amts.spades > 0) {
                        suit = SPADES;
                    } else if (amts.hearts > 0) {
                        suit = HEARTS;
                    }

                // @todo -- why is there not a break here?

                case 4:
                    if (amts.spades > 0) {
                        suit = SPADES;
                    } else if (amts.clubs > 0) {
                        suit = CLUBS;
                    } else if (amts.diamonds > 0) {
                        suit = DIAMONDS;
                    } else if (amts.hearts > 0) {
                        suit = HEARTS;
                    }

                    break;

                default:
                    break;
            }

            checkSuit(suit);
        };

        // show the card on the screen and compare to see who's card is leading
        var playCard = function(card) {
            this.cardID = "#" + card.id;
            var position = player.position + "-card";

            // $(this.cardID).addClass('card-image-overlay');
            $('#board').append(
                '<div id="' + position + '" class="board-card"><img class="card-image" src="img/cardpack1/'
                    + card.fileName + '"/></div>');

            Trump.Rounds.compareCardsPlayed(card, player);
        };

        // MAIN AI LOGIC / Choose a smart card to play based on other cards on
        // the board
        if (Trump.Rounds.suitOnBoard) {
            checkSuit(Trump.Rounds.suitOnBoard);

            // I have cards in the suit on board and no one has cut
            if (suitInPlay === Trump.Rounds.suitOnBoard && !Trump.Rounds.suitWasCut) {
                SmartPickCard();

                // I have the suit on board, but someone has cut
            } else if (suitInPlay === Trump.Rounds.suitOnBoard && Trump.Rounds.suitWasCut) {
                pickLowCard();

                // I don't have the suit on board, and no one has cut yet
            } else if (suitInPlay != Trump.Rounds.suitOnBoard && !Trump.Rounds.suitWasCut) {
                if (Trump.Rounds.tempWinningPlayer.team != player.team) {
                    checkSuit(Trump.trump);
                    if (suitInPlay == Trump.trump) {
                        pickLowCard();
                    } else {
                        pickRandomSuit();
                        pickLowCard();
                    }
                } else {
                    pickRandomSuit();
                    pickLowCard();
                }

                // I don't have the suit on board, and someone else has cut
            } else if (suitInPlay != Trump.Rounds.suitOnBoard && Trump.Rounds.suitWasCut) {
                checkSuit(Trump.trump);
                if (suitInPlay === Trump.trump && suitArray[0].value > Trump.Rounds.tempWinningCard.value) {
                    pickHighCard();
                } else {
                    pickRandomSuit();
                    pickLowCard();
                }
            } else {
                pickRandomSuit();
                pickRandomCard();
            }

        } else {
            // there is no suit on board, player is first to play.
            pickRandomSuit();
            pickRandomCard();
        }

        this.setNextPlayerTurn(player);
    };

    // @todo: build in check to ensure user is making a legal play.
    this.userPlayCard = function(card, value, suit) {
        var fileName = suit + value + ".png";
        // var id = "#"+ value + suit;
        var foundCardMatch = false;
        var c = this.southPlayer.playerHand;

        var amts = {
            clubs: this.southPlayer.handClubs.length,
            hearts: this.southPlayer.handHearts.length,
            spades: this.southPlayer.handSpades.length,
            diamonds: this.southPlayer.handDiamonds.length
        };

        var legalCheck = true;
        var playedCard = '';

        /* this function probably doesn't need to be used outside this scope */
        var setLegalCheck = function() {
            if (suit != Trump.Rounds.suitOnBoard) {

                switch (Trump.Rounds.suitOnBoard) {
                    case CLUBS:
                        if (amts.clubs === 0) {
                            legalCheck = true;
                        } else {
                            legalCheck = false;
                        }
                        break;

                    case HEARTS:
                        if (amts.hearts === 0) {
                            legalCheck = true;
                        } else {
                            legalCheck = false;
                        }
                        break;

                    case SPADES:
                        if (amts.spades === 0) {
                            legalCheck = true;
                        } else {
                            legalCheck = false;
                        }
                        break;

                    case DIAMONDS:
                        if (amts.diamonds === 0) {
                            legalCheck = true;
                        } else {
                            legalCheck = false;
                        }
                        break;
                    default:
                        legalCheck = true;
                }

            }
        };

        /* if user isn't first to play, check to see if it's a legal play */
        if (Trump.Rounds.suitOnBoard) {
            setLegalCheck();
        }

        /*
         * ensure the playerTurn has been set - NOTE: probably not a critical condition as other code should handle this
         */
        if (!this.playerTurn) {
            this.playerTurn = this.southPlayer;
            this.southPlayer.myTurnNumber = 1;
        }

        if (this.southPlayer === this.playerTurn) {// why not just check to see
            // playerTurn in the players
            // object? precaution?

            /* @todo: legalPlayCheck */

            if (!legalCheck) {
                alert("Hey don't try to cheat! If you have cards in the suit that is currently on board, you have to play them!");

            } else {
                $(card).addClass('played');

                $('#board').append(
                    '<div id="south-card" class="board-card"><img class="card-image" src="img/cardpack1/'
                        + fileName + '"/></div>');

                /* Remove card from actual array */
                for ( var i = 0; i < c.length; i++) {
                    for ( var j = 0; j < c[i].length; j++) {
                        if (c[i][j].fileName === fileName) {
                            playedCard = c[i][j];
                            c[i].splice(j, 1);
                            foundCardMatch = true;
                            break;
                        }
                    }

                    if (foundCardMatch) {
                        break;
                    }
                }

                Trump.Rounds.compareCardsPlayed(playedCard, this.southPlayer);// compare card to other cards on
                // board
                Trump.Rounds.setCardsPlayed();// increment the amount of cards
                // played in current round
                this.setNextPlayerTurn(this.southPlayer);// counter clockwise
                // to east player

            }

        } else {
            alert("AYE Don't poke-poke the screen, it's not you turn");
        }
    };

    this.playNext = function(player) {
        this.setPlayerIndicator(player);

        if (!player.isHuman) {
            var self = this;
            setTimeout(function() {
                self.AIplayCard(player);
            }, 800);
        } else {
            // @todo: alert user that it's their turn
            // maybe black out the users card when it's not their turn, and then
            // on the users turn make the cards that are playable visible.?
        }
    };

    this.setPlayerIndicator = function(player) {
        var position = player.position;
        var id = "#" + position + "-player";

        $("#north-player").removeClass('player-turn-indicator');
        $("#west-player").removeClass('player-turn-indicator');
        $("#east-player").removeClass('player-turn-indicator');

        if (position != "south") {
            $(id).addClass('player-turn-indicator');
        }
    };

    this.setNextPlayerTurn = function(player) {
        this.turnNumber = player.myTurnNumber;
        this.nextTurnNumber = this.turnNumber + 1;

        if (this.turnNumber < 4) {
            switch (player.position) {
                case "south":
                    this.playerTurn = this.eastPlayer;
                    this.eastPlayer.setMyTurnNumber(this.nextTurnNumber);
                    break;

                case "east":
                    this.playerTurn = this.northPlayer;
                    this.northPlayer.setMyTurnNumber(this.nextTurnNumber);
                    break;

                case "north":
                    this.playerTurn = this.westPlayer;
                    this.westPlayer.setMyTurnNumber(this.nextTurnNumber);
                    break;

                case "west":
                    this.playerTurn = this.southPlayer;
                    this.southPlayer.setMyTurnNumber(this.nextTurnNumber);
                    break;
            }

            this.playNext(this.playerTurn);
        }

        // if round is Over
        if (this.nextTurnNumber === 5) {
            setTimeout(function() {
                Trump.Rounds.resetRound();
            }, 500);
        }

    };

};

/**
 * playRounds Object
 */
var playRounds = function(players) {
    this.players = players;
    this.suitOnBoard = "";
    this.suitWasCut = false;
    this.cardsPlayed = 0;
    this.winningPlayer = players.southPlayer;
    this.tempWinningCard = '';
    this.tempWinningPlayer = '';

    this.setSuitOnBoard = function(suit) {
        this.suitOnBoard = suit;
    };

    this.setCardsPlayed = function() {
        this.cardsPlayed++;
    };

    this.resetTurns = function() {
        for ( var i = 0; i < this.players.playersArray.length; i++) {
            this.players.playersArray[i].myTurnNumber = 0;
        }
    };

    this.resetRound = function() {
        this.winningPlayer = this.tempWinningPlayer;
        this.suitOnBoard = "";
        this.tempWinningCard = "";
        this.tempWinningPlayer = "";
        this.players.playerTurn = this.winningPlayer;
        this.suitWasCut = false;
        this.cardsPlayed = 0;
        this.resetTurns();

        this.winningPlayer.myTurnNumber = 1;

        Trump.setPlayerBooks(this.winningPlayer);

        if (!Trump.gameOver) {
            var self = this;
            setTimeout(function() {
                self.players.playNext(self.winningPlayer);
            }, 2000);
        } else {
            Trump.endGame();
        }
    };

    this.compareCardsPlayed = function(card, player) {
        // card was trump
        if (card.suit === Trump.trump) {
            if (!this.suitOnBoard) {
                // trump was played, no suit on board
                this.tempWinningCard = card;
                this.tempWinningPlayer = player;
                this.suitOnBoard = card.suit;

            } else if (this.tempWinningCard.suit != Trump.trump) {
                // suit is on board, no other trump was played
                this.tempWinningCard = card;
                this.tempWinningPlayer = player;
                if (this.suitOnBoard != Trump.trump) {
                    this.suitWasCut = true;
                }

            } else if (card.value > this.tempWinningCard.value) {
                // if trump was already played, compare cards
                this.tempWinningCard = card;
                this.tempWinningPlayer = player;
            } else {
                // console.log("I lost to someone else's trump");
            }

        } else if (!this.suitOnBoard) {
            /* no cards played yet */
            this.tempWinningCard = card;
            this.tempWinningPlayer = player;
            this.setSuitOnBoard(card.suit);

        } else if (card.suit === this.suitOnBoard) {
            /* card matches suitOnBoard */

            if (this.tempWinningCard.suit === Trump.trump) {
                // @todo ?

            } else if (card.value > this.tempWinningCard.value) {
                this.tempWinningCard = card;
                this.tempWinningPlayer = player;
            } else {
                // console.log("Played the card on board, but lost");
            }

            // walked aside
        } else if (card.suit != this.suitOnBoard) {

            // find edge case
        } else {
            alert("error: edge case scenario.");
        }
    };

};

/**
 * TrumpGame Object
 */
var TrumpGame = function() {
    this.trump = "";
    this.deck = new Deck;
    this.playerBooks = 0;
    this.opponentsBooks = 0;
    this.gameOver = false;
    this.winner = null;

    this.deck.initDeck();
    this.deck.shuffleDeck();
    this.deck.deal();

    this.Players = new allPlayers(this.deck);
    this.Rounds = new playRounds(this.Players);

    /* IMPORTANT */
    this.setTrump = function(suit) {
        this.trump = suit;
        $('.trump-suit').text(this.trump);
    };

    this.setPlayerBooks = function(winner) {
        if (winner.team === "user") {
            this.playerBooks++;

            var self = this;
            setTimeout(function() {
                $('.board-card').fadeOut();
                $('#my-books').text(self.playerBooks);
            }, 1000);

            if (this.playerBooks === 7) {
                $('#game-result').text('Yesss Buddy! You won!');
                this.gameOver = true;
            }

        } else if (winner.team === "opponent") {
            this.opponentsBooks++;

            var self = this;
            setTimeout(function() {
                $('.board-card').fadeOut();
                $('#opponents-books').text(self.opponentsBooks);
            }, 1000);

            if (this.opponentsBooks === 7) {
                $('#game-result').text('Awww shucks! You lost!');
                this.gameOver = true;
            }

        }
    };

    this.endGame = function() {
        setTimeout(function() {
            $('.card-space').empty();
            $('#overlay').fadeIn();
            $('#trump-gameover').show();
        }, 1200);
    };

};

/* init Trump */
var Trump = new TrumpGame;

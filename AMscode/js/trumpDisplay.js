/**
 * Created by Am on 12/10/14.
 */
/**
 * Display
 */

var player = function(deck){
    var self = this;
    this.userHand = deck.hand1;

    this.showFive = function(){
        for(i=0; i <5; i++){

            $('#first-five-cards').append('<div class="card">  <div class="card"><img class="card-image" src="img/cardpack1/' +
                self.userHand[i].fileName + '"/>');
        }
    };

    this.showUserHand = function(){
        var hand = freshDeck.sortHand(self.userHand);
        self.userHand = hand;

        for(i=0; i < self.userHand.length; i++ ){
                $('#card-space').append('<div class="card playable"' +
                    '><div class="test"></div><img value="'+ self.userHand[i].value +'" alt="'+ self.userHand[i].suit +'" class="card-image" src="img/cardpack1/' +
                    self.userHand[i].fileName + '"/></div></div>');
        }
    };

    this.playCard = function(value, suit){
        /* TODO: legalPlayCheck */

//        Remove card from hand array, and play on the board


        console.log(value+suit);
    }
};



var playerTest = new player(freshDeck);

$(document).ready(function(){

    playerTest.showFive();

    $(".trump-select-box").click(function(evt){
        var $element =$(evt.target);
        var suit = $element.attr("id");

        startGame.setTrump(suit);

       $('#overlay').hide();
//        showUserHand(freshDeck);
          playerTest.showUserHand();
    });



});


$("#card-space").on('click','.playable', function(evt){
    var $element = $(evt.target);
    var value = $element.attr("value");
    var suit = $element.attr("alt");
    playerTest.playCard(value, suit);
});





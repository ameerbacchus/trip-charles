/**
 * Created by Am on 12/10/14.
 */
/**
 * JQUERY , Event Listeners
 */


$(document).ready(function(){


/* IMPORTANT   */
/*
    playerTest.showFive();

    $(".trump-select-box").click(function(evt){
        var $element =$(evt.target);
        var suit = $element.attr("id");

        startGame.setTrump(suit);

       $('#overlay').hide();
          playerTest.showUserHand();
    });
*/

    humanPlayer.showUserHand();
    startGame.setTrump();
});

/* TODO: figure out why this accesses the img.image-card, vs div.card playable ? */
$("#card-space").on('click','.card.playable', function(evt){
    var $element = $(evt.target);
    var value = $element.attr("value");
    var suit = $element.attr("alt");

    humanPlayer.playCard(this, value, suit);

});





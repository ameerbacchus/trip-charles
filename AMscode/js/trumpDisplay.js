/**
 * Created by Am on 12/10/14.
 */
/**
 * JQUERY , Event Listeners
 */


$(document).ready(function(){

/* IMPORTANT
 * Code below commented out for development purposes. It's annoying
 * to have to pick trump every time you reload. Trump at this time is set in advance.
 * */
//    Trump.Players.southPlayer.showFive();
//
//    $(".trump-select-box").click(function(evt){
//        var $element =$(evt.target);
//        var suit = $element.attr("id");
//
//        Trump.setTrump(suit);
//
//       $('#overlay').hide();
//
//        Trump.Players.showUserHand();
//    });


    /*
    * Use line below for building without trump selector
    * */
//    Trump.Players.showUserHand();
    Trump.Players.showUserHand(Trump.Players.southPlayer);
    Trump.Players.showUserHand(Trump.Players.eastPlayer);
    Trump.Players.showUserHand(Trump.Players.northPlayer);
    Trump.Players.showUserHand(Trump.Players.westPlayer);



/*
* IGNORE.
* WHY DOES THIS LISTENER WORK WHEN I HAVE BOTH ON and TRIGGER handlers?
 */
//    $(window).on('deathStroke', function(){
//        console.log('I get how to use event listeners, and will some day rule the world');
//    });
//    $(window).trigger('deathStroke', function(){
//        console.log('I get how to use event listeners, and will some day rule');
//    });


});

/* TODO: figure out why this accesses the img.image-card, vs div.card playable ? */
$("#south-player-hand").on('click','.playable', function(evt){
    var $element = $(evt.target);
    var value = $element.attr("value");
    var suit = $element.attr("alt");

//    Trump.Players.userPlayCard(this, value, suit);
    Trump.Players.userPlayCard(this, value, suit);
});




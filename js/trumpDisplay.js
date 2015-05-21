/**
 * Created by Am on 12/10/14.
 */
/**
 * JQUERY , Event Listeners
 */

$(document).ready(function() {
    if ($.browser.mobile) {
        $(document.body).addClass('mobile');
    }

    var $elements = {
        overlay: $('#overlay'),
        trumpPicker: $('#trump-picker'),
        gameOver: $('#trump-gameover'),
        myBooks: $('#my-books'),
        opponentsBooks: $('#opponents-books')
    };

    /*
     * IMPORTANT Code below commented out for development purposes. It's annoying to have to pick trump every time you
     * reload. Trump at this time is set in advance.
     */

    $elements.overlay.css({'height':($(document).height())});

    Trump.Players.southPlayer.showFive();


    $('.trump-select-box').click(function(evt) {
        var $element = $(evt.target);
        var suit = $element.attr('id');

        Trump.setTrump(suit);

        $elements.trumpPicker.hide();
        $elements.overlay.hide();

        Trump.Players.showUserHand(Trump.Players.southPlayer);

        /* show AI cards for debugging */
        // Trump.Players.showUserHand(Trump.Players.eastPlayer);
        // Trump.Players.showUserHand(Trump.Players.northPlayer);
        // Trump.Players.showUserHand(Trump.Players.westPlayer);
    });

    /* Use line below for building without trump selector */
    // Trump.Players.showUserHand(Trump.Players.southPlayer);
    // Trump.Players.showUserHand(Trump.Players.eastPlayer);
    // Trump.Players.showUserHand(Trump.Players.northPlayer);
    // Trump.Players.showUserHand(Trump.Players.westPlayer);

    $('#south-player-hand').on('click', '.playable:not(.played)', function(evt) {
        var $this = $(this),
            $element = $this.find('img.card-image'),
            value = $element.attr('value'),
            suit = $element.attr('alt');

        Trump.Players.userPlayCard(this, value, suit);
    });

    $('#reset-game').on('click', function(evt) {
        evt.preventDefault();

        $elements.myBooks.text(0);
        $elements.opponentsBooks.text(0);

        Trump = new TrumpGame;
        Trump.Players.southPlayer.showFive();

        $elements.gameOver.fadeOut(400, function() {
            $elements.trumpPicker.fadeIn();
        });
    });
});
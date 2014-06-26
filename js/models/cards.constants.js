/**
 * Card constants
 * @author: David Shaw <david.mi.shaw@gmail.com>
 */
(function($) {
	
	var PlayingCards = window.PlayingCards = window.PlayingCards || {};
	PlayingCards.constants = {
		SUITS: {
			SPADES: 'spades',
			CLUBS: 'clubs',
			HEARTS: 'hearts',
			DIAMONDS: 'diamonds'
		},
		VALUES: {
			'2': 2,
			'3': 3,
			'4': 4,
			'5': 5,
			'6': 6,
			'7': 7,
			'8': 8,
			'9': 9,
			'10': 10,
			'J': 11,
			'Q': 12,
			'K': 13,
			'A': 14
		}
	};
	
})(jQuery);
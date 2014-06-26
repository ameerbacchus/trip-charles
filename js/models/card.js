/**
 * Trump
 * @author: David Shaw <david.mi.shaw@gmail.com>
 */
(function($) {
	
	var PlayingCards = window.PlayingCards = window.PlayingCards || {};
	
	
	/**
	 * Single Card object
	 *
	 * @param string value
	 * @param string suit
	 */
	var Card = function(value, suit) {
		this.value = value;
		this.suit = suit;
		this.rank = PlayingCards.constants.VALUES[value];
	};
	
	
	/**
	 * Return a value + suit identifier for this card
	 *
	 * @return string
	 */
	Card.prototype.getIdentifier = function() {
		return this.value + '_' + this.suit;
	};
	
	PlayingCards.Card = Card;
	
})(jQuery);
/**
 * Trump
 * @author: David Shaw <david.mi.shaw@gmail.com>
 */
(function($) {
	
	window.trump = window.trump || {};
	
	var EVENT_NAMESPACE = '.trump';
	
	var Trump = function() {
		this.deck = new PlayingCards.Deck();
		this.players = [];
		//this.positions = [1, 2, 3, 4];
		this.teams = [];
		this.trumpSuit = '';
	};
	
	/**
	 * 
	 */
	Trump.prototype.init = function() {
		this.players = [
			new trump.Player('David', true),
			new trump.Player('Ameer', false),
			new trump.Player('Desh', false),
			new trump.Player('Faheem', false)
		];
		
		//this.deck.shuffle();
		//this.dealCallingRound();
	};
	
	/**
	 * Set the trump suit
	 * @param string suit
	 */
	Trump.prototype.setTrump = function(suit) {
		this.trumpSuit = suit;
	};
	
	
	/**
	 * Deal a round of cards
	 *
	 * @param int cardCount
	 */
	Trump.prototype.dealRound = function(cardCount) {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCards(this.deck.dealCards(cardCount));
		}
	};
	
	/**
	 * Shuffles the deck
	 */
	Trump.prototype.shuffleDeck = function() {
		this.deck.shuffle();
	};
	
	window.trump.Trump = Trump;
	
})(jQuery);
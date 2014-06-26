/**
 * Trump
 * @author: David Shaw <david.mi.shaw@gmail.com>
 */
(function($) {
	
	var PlayingCards = window.PlayingCards = window.PlayingCards || {};
	
	
	/**
	 * Playing Card Deck
	 */
	var Deck = function() {
		this.cards = [];
		this.init();
	};
	
	
	/**
	 * Initialize the deck
	 */
	Deck.prototype.init = function() {
		var self = this,
			Suits = PlayingCards.constants.SUITS,
			Values = PlayingCards.constants.VALUES,
			newCard;
			
		$.each(Suits, function(suitKey, suit) {
			$.each(Values, function(valueKey, value) {
				newCard = new PlayingCards.Card(valueKey, suitKey);
				self.cards.push(newCard);
			});
		});
	};
	
	
	/**
	 * Shuffle the deck
	 */
	Deck.prototype.shuffle = function() {
		var shuffle = function(o) {
			for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){};
			return o;
		};
		
		shuffle(this.cards);
	};
	
	/**
	 * Returns an array of cards from the top of the deck
	 * 
	 * @param int cardCount
	 * @return array
	 */
	Deck.prototype.dealCards = function(cardCount) {
		var cardsToDeal = [];
		if (this.cards.length >= cardCount) {
			for (var i = 0; i < cardCount; i++) {
				cardsToDeal.push(this.cards.pop());
			}
		} else {
			// TODO -- error scenario
			alert('cardCount: ' + cardCount + '\nthis.cards.length: ' + this.cards.length);
		}
		
		
		console.log(cardsToDeal);
		return cardsToDeal;
	};
	
	PlayingCards.Deck = Deck;
	
})(jQuery);
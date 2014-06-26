/**
 * Trump
 * @author: David Shaw <david.mi.shaw@gmail.com>
 */
(function($) {
	
	/**
	 * Player object
	 
	 * @param string name
	 * @param int teamNumber
	 * @param boolean isDealer
	 */
	var Player = function(name, teamNumber, isDealer) {
		this._name = name;
		this.teamNumber = teamNumber;
		this._isDealer = isDealer;
		this.cards = [];
	};
	
	/**
	 * Sets the player name
	 * @param string name
	 */
	Player.prototype.setName = function(name) {
		this._name = name;
	};
	
	/**
	 * Sets the dealer flag
	 * @param boolean isDealer
	 */
	Player.prototype.setIsDealer = function(isDealer) {
		this._isDealer = isDealer;
	};
	
	window.trump = window.trump || {};
	trump.Player = trump.Player || Player;
	
})(jQuery);
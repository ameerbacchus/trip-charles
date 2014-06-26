/**
 * 
 * @author: David Shaw <david.mi.shaw@gmail.com>
 */
(function($) {
	
	$(document).ready(function() {

		var EVENT_NAMESPACE = '.trump';

		var game = new trump.Trump(),
			//$trumpSelectorFormWrapper = $('#trumpSelectorWrapper'),
			$trumpSelectorForm = $('form.trumpSelector');
		
		window.game = game;
		console.log(game);
		
		$trumpSelectorForm.dialog({
			width: 430,
			height: 450,
			title: 'Select Trump',
			autoOpen: false,
			resizable: false,
			draggable: false,
			modal: true,
			show: 'fade',
			hide: 'fade',
			close: function() {
				$('input[type=radio]', $trumpSelectorForm).removeProp('checked');
			}
		});
		
		/*
		 * Event fired after the deck is first initialized
		 */
		$(document).bind('deckInitialized' + EVENT_NAMESPACE, function(evt) {
			game.shuffleDeck();
			$(document).trigger('deckShuffled' + EVENT_NAMESPACE);
		});
		
		/*
		 * Event fired after the check is shuffled
		 */
		$(document).bind('deckShuffled' + EVENT_NAMESPACE, function(evt) {
			game.dealRound(5);
			$(document).trigger('dealCallingRoundComplete' + EVENT_NAMESPACE);
		});
		
		/*
		 * Event fired after the initial "calling round" is dealt
		 */
		$(document).bind('dealCallingRoundComplete' + EVENT_NAMESPACE, function(evt) {
			$trumpSelectorForm.dialog('open');
		});
		
		/*
		 * The trump selection event
		 */
		$trumpSelectorForm.bind('submit' + EVENT_NAMESPACE, function(evt) {
			evt.preventDefault();
			
			var $form = $(this),
				dataArray = $form.serializeArray(),
				dataObj = {};
			
			for (var i = 0; i < dataArray.length; i++) {
				var tempDataObj = dataArray[i];
				dataObj[tempDataObj.name] = tempDataObj.value;
			}
			
			if (dataObj.trumpToBe) {
				game.setTrump(dataObj.trumpToBe);
				$trumpSelectorForm.dialog('close');
				$(document).trigger('trumpSelected' + EVENT_NAMESPACE);

			} else {
				// TODO -- nothing is selected; add error messaging/warning
				alert('pick something');
			}
		});
		
		/*
		 * The handler for once trump has been selected
		 */
		$(document).bind('trumpSelected' + EVENT_NAMESPACE, function(evt) {
			game.dealRound(4);
			$(document).trigger('secondRoundDealt' + EVENT_NAMESPACE);
		});
		
		/*
		 * The handler for after the second round is dealt
		 */
		$(document).bind('secondRoundDealt' + EVENT_NAMESPACE, function(evt) {
			game.dealRound(4);
			$(document).trigger('thirdRoundDealt' + EVENT_NAMESPACE);
		});
		
		$(document).bind('thirdRoundDealt' + EVENT_NAMESPACE, function(evt) {
			// TODO
			alert('ready to play');
		});
		
		game.init();
		$(document).trigger('deckInitialized' + EVENT_NAMESPACE);
	});
})(jQuery);
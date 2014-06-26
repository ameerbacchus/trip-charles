<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Trump</title>
<link rel="stylesheet" type="text/css" href="css/ui-darkness/jquery-ui-1.8.20.custom.css" />
<link rel="stylesheet" type="text/css" href="css/main.css" />

<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.20.custom.min.js"></script>
<script type="text/javascript" src="js/game.js"></script>
<script type="text/javascript" src="js/models/cards.constants.js"></script>
<script type="text/javascript" src="js/models/card.js"></script>
<script type="text/javascript" src="js/models/deck.js"></script>
<script type="text/javascript" src="js/models/player.js"></script>
<script type="text/javascript" src="js/models/trump.js"></script>

</head>

<body>

<div id="trump">
	<div id="trumpSelectorWrapper">
		<form class="trumpSelector" name="trumpSelector" method="" action="#">
			<div>
				<input type="radio" name="trumpToBe" id="trumpSelector_trumpToBe_spades" value="spades" />
				<label for="trumpSelector_trumpToBe_spades">Spades</label>
			</div>
			<div>
				<input type="radio" name="trumpToBe" id="trumpSelector_trumpToBe_hearts" value="hearts" />
				<label for="trumpSelector_trumpToBe_hearts">Hearts</label>
			</div>
			<div>
				<input type="radio" name="trumpToBe" id="trumpSelector_trumpToBe_clubs" value="clubs" />
				<label for="trumpSelector_trumpToBe_clubs">Clubs</label>
			</div>
			<div>
				<input type="radio" name="trumpToBe" id="trumpSelector_trumpToBe_diamonds" value="diamonds" />
				<label for="trumpSelector_trumpToBe_diamonds">Diamonds</label>
			</div>
			<div>
				<button id="trumpSelector_trumpToBe_select">I've made my decision</button>
			</div>
		</form>
	</div>
	
</div>

</body>
</html>

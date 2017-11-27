function HighLow()
{
	var deckId;
	var remainingCards;
	var score = 100;
	var bet;
	var cardA;
	var cardB;
	var result = "null";
	
	this.start = function()
	{
		$("#main").append("<button id='gameStart'>Start Game</button>");
		$("#gameStart").click(function() {
			Game();
		});
	};
	
	function Game()
	{
		$("#gameStart").remove();
		$.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", {
			t: new Date().getTime()
		})
		.done(function(data) {returnDeck(data); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
	}
	
	function returnDeck(data)
	{
		deckId = data.deck_id;
		remainingCards = data.remaining;
		freshStart();
	}
	
	function freshStart()
	{
		bet = 5;
		score -= bet;
		$("#buttons").append("<button id='high'>Higher?</button>");
		$("#buttons").append("<button id='low'>Lower?</button>");
		$("#high").click(function() {
			test(true);
		});
		$("#low").click(function() {
			test(false);
		});
		drawACard();
		drawBCard();
	}
	
	function TieGame()
	{
		$("#buttons").show();
	}
	
	function test(val)
	{
		if(val)
		{
			if(cardA > cardB)
			{
				result = "win";
			}
			else if(card A < cardB)
			{
				result = "lose";
			}
			else
			{
				result = "tie";
			}
		}
		else
		{
			if(cardA < cardB)
			{
				result = "win";
			}
			else if(card A > cardB)
			{
				result = "lose";
			}
			else
			{
				result = "tie";
			}
		}
		$("#buttons").hide();
		$("#result").text(result).show();
		
	}
	
	function drawACard()
	{
		$.get("https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", {
			t: new Date().getTime()
		})
		.done(function(data) {displayACard(data); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
		remainingCards--;
		if (remainingCards == 0)
		{
			shuffle();
		}
	}
	
	function displayACard(data)
	{
		$("#cards").append("<img id='cardA'></img>");
		$("#cardA").attr("src", data.cards[0].image);
		var temp = data.cards[0].code[0];
		switch (temp)
		{
			case 'A':
				cardA = 14;
				break;
			case 'K':
				cardA = 13;
				break;
			case 'Q':
				cardA = 12;
				break;
			case 'J':
				cardA = 11;
				break;
			case '0':
				cardA = 10;
				break;
			case '9':
				cardA = 9;
				break;
			case '8':
				cardA = 8;
				break;
			case '7':
				cardA = 7;
				break;
			case '6':
				cardA = 6;
				break;
			case '5':
				cardA = 5;
				break;
			case '4':
				cardA = 4;
				break;
			case '3':
				cardA = 3;
				break;
			case '2':
				cardA = 2;
				break;
			default:
				console.log("error, how did we get here???");
				break;
		}
	}
	
	function drawBCard()
	{
		$.get("https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", {
			t: new Date().getTime()
		})
		.done(function(data) {displayBCard(data); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
		remainingCards--;
		if (remainingCards == 0)
		{
			shuffle();
		}
	}
	
	function displayBCard(data)
	{
		$("#cards").append("<img id='cardB'></img>");
		$("#cardB").attr("src", data.cards[0].image);
		var temp = data.cards[0].code[0];
		switch (temp)
		{
			case 'A':
				cardB = 14;
				break;
			case 'K':
				cardB = 13;
				break;
			case 'Q':
				cardB = 12;
				break;
			case 'J':
				cardB = 11;
				break;
			case '0':
				cardB = 10;
				break;
			case '9':
				cardB = 9;
				break;
			case '8':
				cardB = 8;
				break;
			case '7':
				cardB = 7;
				break;
			case '6':
				cardB = 6;
				break;
			case '5':
				cardB = 5;
				break;
			case '4':
				cardB = 4;
				break;
			case '3':
				cardB = 3;
				break;
			case '2':
				cardB = 2;
				break;
		}
	}
	
	function shuffle()
	{
		$.get("https://deckofcardsapi.com/api/deck/" + deckId + "/shuffle/", {
			t: new Date().getTime()
		})
		.done(function(data) {displayShuffled(data); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
	}
	function displayShuffled(data)
	{
		remainingCards = data.remaining;
	}
}

$(function() {
	window.app = new Game();
	window.app.start();
});
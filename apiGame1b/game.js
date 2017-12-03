function Game()
{
	var bet = 0;
	var score = 100;
	var deckId;
	var remainingCards;
	var cardA;
	var cardAVal;
	var cardANumber;
	var cardASuit;
	var cardB;
	var cardBVal;
	var cardBNumber;
	var cardBSuit;
	var deck = [];
	var state = "START";
	
	this.boot = function()
	{
		$("#startButton").append("<button id='gameStart'>Start Game</button>");
		$("#gameStart").click(function() {
			Start();
		});
	};
	
	function Start()
	{
		$("#startButton").remove("#gameStart");
		$("#score").text("Score: " + score);
		$.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", {
			t: new Date().getTime()
		})
		.done(function(data) {GetDeck(data); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
		$("#startButton").remove();
	}
	
	function Shuffle()
	{
		$.get("https://deckofcardsapi.com/api/deck/" + deckId + "/shuffle/", {
			t: new Date().getTime()
		})
		.done(function(cards) {GetDeck(cards); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
	}
	
	function GetDeck(data)
	{
		deckId = data.deck_id;
		remainingCards = data.remaining;
		$("#gameStart").empty();
		$.get("https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=52", {
			t: new Date().getTime()
		})
		.done(function(cards) {PopulateDeckArray(cards); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
	}
	
	function PopulateDeckArray(cards)
	{
		for(var i = 0; i < 52; i++)
		{
			deck.push(cards.cards[i].code);
		}
		FirstHand();
	}
	
	function FirstHand()
	{
		
		$("#continueButtons").empty();
		$("#result").text("");
		$("#result2").text("");
		bet = 5;
		score = score - bet;
		if (score < 0)
		{
			Refresh();
		}
		$("#score").text("Score: " + score);
		bet = 8;
		cardA = deck.pop();
		cardAVal = CardVal(cardA);
		cardANumber = CardNumber(cardA);
		cardASuit = CardSuit(cardA);
		$("#cards").append("<img id='cardA'></img>");
		$("#cardA").attr("src", "https://deckofcardsapi.com/static/img/" + cardA + ".png");
		remainingCards--;
		cardB = deck.pop();
		cardBVal = CardVal(cardB);
		cardBNumber = CardNumber(cardB);
		cardBSuit = CardSuit(cardB);
		$("#cards").append("<img id='cardB'></img>");
		$("#cardB").attr("src", "/images/CardBack.png");
		remainingCards--;
		$("#highLowButtons").append("<button id='high'>HIGHER</button>")
		$("#high").click(function() {
			Test(1);
		});
		$("#highLowButtons").append("<button id='low'>LOWER</button>")
		$("#low").click(function() {
			Test(0);
		});
	}
	
	function Refresh()
	{
		$("#main").empty();
		$("#main").text("It appears you ran out of points. But never fear, all you have to do to reset your score is to refresh the page.");
	}
	
	function PlayAgain()
	{
		$("#continueButtons").append("<button id='playAgain'>Play Again?</button>");
		$("#playAgain").click(function() {
			Shuffle();
		});
	}
	
	function PushGame()
	{
		$("#continueButtons").append("<button id='continue'>Continue</button>");
		$("#continue").click(function() {
			Continue(bet);
		});
	}
	
	function ContinueGame()
	{
		$("#continueButtons").append("<button id='continue'>Continue?</button>");
		$("#continue").click(function() {
			Continue(bet * 2);
		});
		$("#continueButtons").append("<button id='end'>End</button>");
		$("#end").click(function() {
			$("#continueButtons").empty();
			$("#cards").empty();
			$("#result").text("");
			$("#result2").text("");
			End();
		});
	}
	
	function Continue(num)
	{
		$("#result").text("");
		$("#result2").text("");
		$("#continueButtons").empty();
		bet = num;
		cardA = cardB;
		cardAVal = cardBVal;
		cardANumber = CardNumber(cardA);
		cardASuit = CardSuit(cardA);
		$("#cards").append("<img id='cardA'></img>");
		$("#cardA").attr("src", "https://deckofcardsapi.com/static/img/" + cardA + ".png");
		remainingCards--;
		cardB = deck.pop();
		cardBVal = CardVal(cardB);
		cardBNumber = CardNumber(cardB);
		cardBSuit = CardSuit(cardB);
		$("#cards").append("<img id='cardB'></img>");
		$("#cardB").attr("src", "/images/CardBack.png");
		remainingCards--;
		$("#highLowButtons").append("<button id='high'>HIGHER</button>")
		$("#high").click(function() {
			Test(1);
		});
		$("#highLowButtons").append("<button id='low'>LOWER</button>")
		$("#low").click(function() {
			Test(0);
		});
	}
	
	function End()
	{
		score += bet;
		$("#score").text("Score: " + score);
		PlayAgain();
	}
	
	function Test(val)
	{
		$("#cardB").attr("src", "https://deckofcardsapi.com/static/img/" + cardB + ".png");
		if (val && cardAVal > cardBVal)
		{
			$("#result").text(cardANumber + " of " + cardASuit + " is higher than " + cardBNumber + " of " + cardBSuit + ", You win.");
			$("#result2").text("Current wager is " + bet + ". Continuing, the new wager will be " + (bet * 2));
			state = "WIN";
		}
		else if (!val && cardBVal > cardAVal)
		{
			$("#result").text(cardANumber + " of " + cardASuit + " is lower than " + cardBNumber + " of " + cardBSuit + ", You win.");
			$("#result2").text("Current wager is " + bet + ". Continuing, the new wager will be " + (bet * 2));
			state = "WIN";
		}
		else if (val && cardAVal < cardBVal)
		{
			$("#result").text(cardANumber + " of " + cardASuit + " is lower than " + cardBNumber + " of " + cardBSuit + ", You lose. Play again?");
			state = "LOSE";
		}
		else if (!val && cardBVal < cardAVal)
		{
			$("#result").text(cardANumber + " of " + cardASuit + " is higher than " + cardBNumber + " of " + cardBSuit + ", You lose. Play again?");
			state = "LOSE";
		}
		else
		{
			$("#result").text(cardANumber + " of " + cardASuit + " is equal to " + cardBNumber + " of " + cardBSuit + ", Push");
			state = "PUSH";
		}
		$("#highLowButtons").empty();
		switch(state)
		{
			case "WIN":
				ContinueGame();
				break;
			case "LOSE":
				PlayAgain();
				break;
			case "PUSH":
				PushGame();
				break;
		}
	}
	
	function CardVal(card)
	{
		var temp = card[0];
		switch(temp)
		{
			case 'A':
				return 14;
			case 'K':
				return 13;
			case 'Q':
				return 12;
			case 'J':
				return 11;
			case '0':
				return 10;
			default:
				return parseInt(temp);
		}
	}
	
	function CardNumber(card)
	{
		var temp = card[0];
		switch(temp)
		{
			case 'A':
				return "Ace";
			case 'K':
				return "King";
			case 'Q':
				return "Queen";
			case 'J':
				return "Jack";
			case '0':
				return "Ten";
			case '9':
				return "Nine";
			case '8':
				return "Eight";
			case '7':
				return "Seven";
			case '6':
				return "Six";
			case '5':
				return "Five";
			case '4':
				return "Four";
			case '3':
				return "Three";
			case '2':
				return "Two";
		}
	}
	
	function CardSuit(card)
	{
		var temp = card[1];
		switch(temp)
		{
			case "C":
				return "Clubs";
			case "H":
				return "Hearts";
			case "D":
				return "Diamonds";
			case "S":
				return "Spades";
		}
	}
	
	function showError(error)
	{
		$("#result").text("An error has occurred in an API call..");
		$("#restul2").text(error);
	}
}

$(function() {
	window.app = new Game();
	window.app.boot();
	$("#Footer").text("Ready");
});
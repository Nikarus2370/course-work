function WeatherWidget($widget)
{
	this.update = function()
	{
		$(".results", $widget).hide();
		$(".loading", $widget).show();
		var loc = $("#latitude").val() + "," + $("#longitude").val();
		getCityName(loc);
		getWeatherReport(loc);
	}
	
	function getWeatherReport(loc)
	{
		
		$.get("https://api.weather.gov/points/" + loc + "/forecast", {
			t: new Date().getTime()
		})
		.done(function(data) {populateWeather(data); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
	} 
	
	function getCityName(loc) 
	{
		$.get("https://api.weather.gov/points/" + loc, {
			t: new Date().getTime()
		})
		.done(function(data) {populateCity(data); })
		.fail(function(jqXHR, textStatus, errorThrown) {
			showError(errorThrown);
		});
	}
	
	function populateCity(data)
	{
		$(".location", $widget)
			.text(data.properties.relativeLocation.properties.city);
	}
	
	function populateWeather(data)
	{
		var observation = data.properties.periods[0];
		
		$(".results header img", $widget)
			.attr("src", observation.icon);		
			
		$(".conditions>span").each(function(i, e) 
		{
			var $span = $(this);
			var field = $span.data("field");
			$(this).text(observation[field]);
		});
		
		$(".loading", $widget).fadeOut(function ()
		{
			$(".results", $widget).fadeIn();
		});
	}
}
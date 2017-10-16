"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#new-task-name").keypress(function(e){
			if (e.which == 13)
			{
				addTask();
				return false;
			}
		});
		
		function addTask(){
			var taskName = $("#new-task-name").val();
			if (taskName) 
			{
				addTaskElement(taskName)
				$("#new-task-name").val("").focus();
			}
		}
		
		function addTaskElement(taskName){
			var $task = $("<li></li>");
			$task.text(taskName);
			$("#task-list").append($task);
		}
		
		$("#app>header").append(version);
		setStatus("ready");
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});

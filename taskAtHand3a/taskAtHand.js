"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v2.0";
	var appStorage = new AppStorage("taskAtHand");

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
		$("#theme").change(onChangeTheme);
		$("#app>header").append(version);
		loadTaskList();
		setStatus("ready");
	};
	
	function addTaskElement(taskName){
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		$task.click(function() { onSelectTask($task);});
		$("#task-list").append($task);
		saveTaskList();
		
		$("button.delete", $task).click(function() {
			removeTask($task);
			saveTaskList();
		});
				 
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
			saveTaskList();
		});
		
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
			saveTaskList();
		});
		
		$("span.task-name", $task).click(function(){
			onEditTaskName($(this));
			saveTaskList();
		});
		
		$("input.task-name", $task).change(function(){
			onChangeTaskName($(this));
			saveTaskList();
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
			saveTaskList();
		});
		$("button.toggle-details", $task).click(function() {
			toggleDetails($task);
		});
	}
		
	function toggleDetails($task) 
	{
		$(".details", $task).slideToggle();
		$("button.toggle-details", $task).toggleClass("expanded");
	}	
	
	function addTask(){
		var taskName = $("#new-task-name").val();
		if (taskName) 
		{
			addTaskElement(taskName)
			$("#new-task-name").val("").focus();
		}
		saveTaskList();
	}
	
	function removeTask($task){
		$task.remove();
		saveTaskList();
	}
	
	function moveTask($task, moveUp)
	{
		if (moveUp)
		{
			$task.insertBefore($task.prev());
		}
		else
		{
			$task.insertAfter($task.next());
		}
		saveTaskList();
	}
	
	function onEditTaskName($span) 
	{
		$span.hide()
		.siblings("input.task-name")
		.val($span.text())
		.show()
		.focus();
	}
	
	function onChangeTaskName($input) 
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val())
		{
			$span.text($input.val());
		}
		$span.show();
	}		
	
	function saveTaskList()
	{
		var tasks = [];
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text())
		});
		appStorage.setValue("taskList", tasks);
	}
	
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		if (tasks)
		{
			for (var i in tasks)
			{
				addTaskElement(tasks[i]);
			}
		}
	}
	
	function onSelectTask($task)
	{
		if($task)
		{
			$task.siblings(".selected").removeClass("selected");
			$task.addClass("selected");
		}
	}
	
	function onChangeTheme() {
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		appStorage.setValue("theme", theme);
	}
	
	function setTheme(theme){
		$("#theme-style").attr("Href","Themes/" + theme + ".css");
	}
	function loadTheme()
	{
		var theme = appStorage.getValue("theme");
		if (theme) 
		{
			steTheme(theme);
			$("#theme>option[value=" + theme + "]").attr("selected","selected");
		}
	}
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

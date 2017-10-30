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
		
		$("#app>header").append(version);
		loadTaskList();
		setStatus("ready");
	};
	
	function addTaskElement(taskName){
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		
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

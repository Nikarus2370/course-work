"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v2.0";
	var appStorage = new AppStorage("taskAtHand");
	var undoStack = [];
	var redoStack = [];
	var loaded = false;
	var temp;
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
		loaded = true;
		$("#undo").click(function() {
			console.log("undo");
			temp = undoStack.pop();
			//redoStack.push(temp);
			temp();
		});
		$("#redo").click(function() {	
			console.log("redo, to be completed");
		/*	temp = redoStack.pop();
			undoStack.push(temp);
			temp();*/
		});
		$("#debug").click(function() {
		console.log(undoStack);
		console.log(redoStack);
		});
	};
	
	function addTaskElement(taskName){
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);		
		$("#task-list").append($task);
		
		
		$("button.delete", $task).click(function() {
			undoStack.push(replaceTask.bind(this, $task, $task.next(), $task.prev()));
			removeTask($task);
		});
				 
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
			undoStack.push(moveTask.bind(this, $task, false));
		});
		
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
			undoStack.push(moveTask.bind(this, $task, true));
		});
		
		$("span.task-name", $task).click(function(){
			undoStack.push(undoTextChange.bind(this, $task, taskName));
			onEditTaskName($(this));
		});
		
		$("input.task-name", $task).change(function(){
			onChangeTaskName($(this));			
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
		if (loaded)
		{
			undoStack.push(removeTask.bind(this, $task));
		}
		saveTaskList();
	}
	
	function replaceTask(task, taskNext, taskPrev){
		var $task = task;
		$("span.task-name", $task).text(task.find("span.task-name").text());		
		
		
		
		$("button.delete", $task).click(function() {
			undoStack.push(replaceTask.bind(this, $task, $task.next(), $task.prev()));
			removeTask($task);
		});
				 
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
			undoStack.push(moveTask.bind(this, $task, false));
		});
		
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
			undoStack.push(moveTask.bind(this, $task, true));
		});
		
		$("span.task-name", $task).click(function(){
			undoStack.push(undoTextChange.bind(this, $task, $task.find("span.task-name").text()));
			onEditTaskName($(this));
		});
		
		$("input.task-name", $task).change(function(){
			onChangeTaskName($(this));			
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
		if (taskNext.length == 1)
		{
			task.insertBefore(taskNext);
		}
		else if (taskPrev.length == 1)
		{
			task.insertAfter(taskPrev);
		}
		else
		{
			$("#task-list").append($task);
		}
		saveTaskList();
	}
	
	function undoTextChange($task, inputString)
	{
		console.log($task.find("span.task-name").text());
		$task.find("span.task-name").text(inputString);
		saveTaskList();
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
		saveTaskList();
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

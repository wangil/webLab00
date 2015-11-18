'use strict';
var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;
var cnt = 0;

document.observe('dom:loaded', function(){
	$("start").onclick = stopToStart;
	$("stop").onclick = stopGame;
});

function stopToStart(){
	$("state").update("Ready");
	reset();
    stopGame();
    startToSetTarget();
}

function stopGame(){
	$("state").update("Stop");
	$("answer").update("0/0");
	reset();
}

function startToSetTarget(){
	for(var i=0;i<3;i++){
		var ran = Math.floor(Math.random()*10);
		while(ran == 9 || targetBlocks.indexOf(ran)!=-1){
			ran = Math.floor(Math.random()*10);
		}
		targetBlocks[i] = ran;
	}
	for(var i=0;i<3;i++){
		console.log(targetBlocks[i]);
	}
	setTimeout(setTargetToShow,interval);
}

function setTargetToShow(){
	$("state").update("Memorize!");
	var block = $$(".block");
	for(var i=0;i<targetBlocks.length;i++){
		block[targetBlocks[i]].addClassName("target");
	}
	setTimeout(showToSelect,interval);
}

function showToSelect(){
	$("state").update("Select!");
	var block = $$(".block");
	for(var i=0;i<targetBlocks.length;i++){
		block[targetBlocks[i]].removeClassName("target");
	}
	for (var i in $$('.block')) {
		$$('.block')[i].onclick = function (){
			selectedBlocks.push(this.readAttribute('data-index'));
		}
	}
	for(var i=0;i<selectedBlocks.length;i++){
		block[selectedBlocks[i]].addClassName("selected");
	}
	setTimeout(selectToResult,interval);
}

function selectToResult(){
	$("state").update("Checking");
	var block = $$(".block");
	for(var i=0;i<selectedBlocks.length;i++){
		block[selectedBlocks[i]].removeClassName("selected");
	}
}
function reset(){
	targetBlocks = [];
	selectedBlocks = [];
	timer = 0;
}

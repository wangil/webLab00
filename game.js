'use strict';
var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;

document.observe('dom:loaded', function(){
	$("start").onclick = stopToStart;
	$("stop").onclick = stopGame;
});

function stopToStart(){
	$("state").update("Ready");
	$("answer").update("0/0");
	timer = 0;
	reset();
    startToSetTarget();
}

function stopGame(){
	$("state").update("Stop");
	$("answer").update("0/0");
	reset();
	timer = 1;
}

function startToSetTarget(){
	reset();
	if(timer != 1){
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
}

function setTargetToShow(){
	if(timer != 1){
		$("state").update("Memorize!");
		var block = $$(".block");
		for(var i=0;i<numberOfTarget;i++){
			block[targetBlocks[i]].addClassName("target");
		}
		
		setTimeout(showToSelect,interval);
	}
}

function showToSelect(){
	if(timer != 1){
		$("state").update("Select!");
		var block = $$(".block");
		for(var i=0;i<numberOfTarget;i++){
			block[targetBlocks[i]].removeClassName("target");
		}
		for (var i in $$('.block')) {
			$$('.block')[i].onclick = function (){
				selectedBlocks.push(this.readAttribute('data-index'));
				if(selectedBlocks.slice(0,-1).indexOf(selectedBlocks[selectedBlocks.length-1])!=-1){
					console.log("pop");
					selectedBlocks.pop();
				}
				else if(selectedBlocks.length<numberOfTarget+1){
					this.addClassName("selected");
					console.log(this.readAttribute('data-index'));
				}
				
			}
		}
		setTimeout(selectToResult,interval);
	}
}

function selectToResult(){
	if(timer != 1){
		$("state").update("Checking");
		var block = $$(".block");
		var ans =0;
		for(var i=0;i<numberOfTarget;i++){
			block[selectedBlocks[i]].removeClassName("selected");
			var a = parseInt(selectedBlocks[i]);
			if(targetBlocks.indexOf(a) != -1){
				ans += 1;
			}
		}
		var data = document.getElementById("answer").innerHTML;
		data = data.split("/");
		data[0] = parseInt(data[0]) + ans;
		data[1] = parseInt(data[1]) + numberOfTarget;
		$("answer").update(data[0]+"/"+data[1]);
		
		setTimeout(startToSetTarget,interval);
	}
}
function reset(){
	targetBlocks = [];
	selectedBlocks = [];
	var block = $$(".block");
	for(var i=0;i<numberOfBlocks;i++){
		if(block[i].hasClassName("target")){
			block[i].removeClassName("target");
		}
	}
}

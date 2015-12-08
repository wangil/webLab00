"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
	var labs = $$("#labs > img");
	for(var i=0;i<labs.length;i++){
		new Draggable(labs[i],{revert:true});
		Droppables.add("selectpad",{onDrop:labSelect});
	}
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	 var pads = $$("#selectpad > img");
	 if(pads.length<3 && drag.parentNode.getAttribute("id") == "labs" && drop.id == "selectpad"){
		 console.log("1");
		 var img = document.createElement("img");
		 img.src = drag.getAttribute("src");
		 img.alt = drag.getAttribute("alt");
		 
		 var li = document.createElement("Li");
		 var text = drag.getAttribute("alt");
		 var li_text = document.createTextNode(text);
		 li.appendChild(li_text);
		 
		 drag.parentNode.removeChild(drag);
		 var pad = document.getElementById("selectpad");
		 pad.appendChild(img);
		 
		 setTimeout(function(){
			var ol = document.getElementById("selection");
			ol.appendChild(li);
			li.pulsate({
				duration:1.0,
				pulses:2
			});
		 },500);
		 
		 new Draggable(img,{revert:true});
		 Droppables.add("labs",{onDrop:labSelect});
	 }
	 else if(drag.parentNode.getAttribute("id")=="selectpad" && drop.id == "labs"){
		 console.log(drop.id);
		 console.log("2");
		 var img = document.createElement("img");
		 img.src = drag.getAttribute("src");
		 img.alt = drag.getAttribute("alt");
		 
		 var lis = $$("#selection > li");
		 for(var j=0;j<lis.length;j++){
			 if(drag.getAttribute("alt")==lis[j].firstChild.nodeValue){
				 break;
			 }
		 }
		 
		 var ol = document.getElementById("selection");
		 ol.removeChild(ol.childNodes[j]);
		 drag.parentNode.removeChild(drag);
		 var lab = document.getElementById("labs");
		 lab.appendChild(img);
		 
		 new Draggable(img,{revert:true});
		 // Droppables.add("selectpad",{onDrop:labSelect});
	 }
}

document.observe("dom:loaded", function() {
    $("b_xml").observe("click", function(){
    	//construct a Prototype Ajax.request object
		var cell = document.getElementById("songs");
 
		while ( cell.hasChildNodes() )
		{
			 cell.removeChild( cell.firstChild );       
		}
		new Ajax.Request("songs_xml.php", {
			method: "GET",
			parameters: { top: $F('top')},
			onSuccess: showSongs_XML,
			onFailure: ajaxFailed,
			onException: ajaxFailed
		});
    });
	
    $("b_json").observe("click", function(){
        //construct a Prototype Ajax.request object
		var cell = document.getElementById("songs");
 
		while ( cell.hasChildNodes() )
		{
			 cell.removeChild( cell.firstChild );       
		}
		new Ajax.Request("songs_json.php", {
			method: "GET",
			parameters: { top: $F('top')},
			onSuccess: showSongs_JSON,
			onFailure: ajaxFailed,
			onException: ajaxFailed
		});
    });
});

function showSongs_XML(ajax) {
	//alert(ajax.responseText);
	var songs = ajax.responseXML.getElementsByTagName("song");
	for (var i = 0; i < $F('top'); i++) {
		//var rank = songs[i].getAttribute("rank");
		var title = songs[i].getElementsByTagName("title")[0].firstChild.nodeValue;
		var artist = songs[i].getElementsByTagName("artist")[0].firstChild.nodeValue;
		var genre = songs[i].getElementsByTagName("genre")[0].firstChild.nodeValue;
		var time = songs[i].getElementsByTagName("time")[0].firstChild.nodeValue;
		
		var li = document.createElement("Li");
		var text = title + "-" + artist + " [" + genre + "] (" + time + ")";
		var li_text = document.createTextNode(text);
		li.appendChild(li_text);
		document.getElementById("songs").appendChild(li);
	}
}

function showSongs_JSON(ajax){
	//alert(ajax.responseText);
	var json_data = JSON.parse(ajax.responseText);
	var len = json_data.songs.length;
	console.log(len);
	for(var i=0;i<len;i++){
		var title = json_data.songs[i].title;
		var artist = json_data.songs[i].artist;
		var genre = json_data.songs[i].genre;
		var time = json_data.songs[i].time;
		
		var li = document.createElement("Li");
		var text = title + "-" + artist + " [" + genre + "] (" + time + ")";
		var li_text = document.createTextNode(text);
		li.appendChild(li_text);
		document.getElementById("songs").appendChild(li);
	}
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}

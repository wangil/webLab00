<?php
//$SONGS_FILE = "songs.txt";
$SONGS_FILE = "songs_shuffled.txt";
if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "GET") {
	header("HTTP/1.1 400 Invalid Request");
	die("ERROR 400: Invalid request - This service accepts only GET requests.");
}

$top = "";

if (isset($_REQUEST["top"])) {
	$top = preg_replace("/[^0-9]*/", "", $_REQUEST["top"]);
}
if (!file_exists($SONGS_FILE)) {
	header("HTTP/1.1 500 Server Error");
	die("ERROR 500: Server error - Unable to read input file: $SONGS_FILE");
}

header("Content-type: application/json");

print "{\n  \"songs\": [\n";

// write a code to : 
// 1. read the "songs.txt" (or "songs_shuffled.txt" for extra mark!)
// 2. search all the songs that are under the given top rank 
// 3. generate the result in JSON data format 

// $lines = file($SONGS_FILE);
// for ($i = 0; $i < count($lines); $i++) {
	// list($title, $artist, $rank, $genre, $time) = explode("|", trim($lines[$i]));
	// if ($rank == $top) {
		// print "\t{\"rank\":\"$rank\",\"title\":\"$title\",\"artist\":\"$artist\",\"genre\":\"$genre\",\"time\":\"$time\"}\n";
	// }
	// else if ($rank < $top) {
		// print "\t{\"rank\":\"$rank\",\"title\":\"$title\",\"artist\":\"$artist\",\"genre\":\"$genre\",\"time\":\"$time\"},\n";
	// }
// }
$chk_rank = 1;
$lines = file($SONGS_FILE);
$while_chk = 0;
while($while_chk < $top){
	for($i=0;$i<count($lines);$i++){
		list($title, $artist, $rank, $genre, $time) = explode("|", trim($lines[$i]));
		if($while_chk == $top-1){
			if ($rank == $chk_rank) {
				print "\t{\"rank\":\"$rank\",\"title\":\"$title\",\"artist\":\"$artist\",\"genre\":\"$genre\",\"time\":\"$time\"}\n";
			}
		}
		else if ($rank == $chk_rank) {
			print "\t{\"rank\":\"$rank\",\"title\":\"$title\",\"artist\":\"$artist\",\"genre\":\"$genre\",\"time\":\"$time\"},\n";
		}
	}
	$while_chk += 1;
	$chk_rank += 1;
}

print "  ]\n}\n";

?>

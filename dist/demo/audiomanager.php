<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Audio Manager demo</title>
</head>

<body>
<h3>Play Controls</h3>
<a href="#" onClick="audiomanager.play(); return false;">Play</a> | <a href="#" onClick="audiomanager.pause(); return false;">Pause</a>

<h3>Volume Control</h3>

<input type="range" name="volume" min="1" max="100" onChange="audiomanager.setVolume(this.value)">

<h3>Playlist</h3>

<ul>
	<li><a href="#" onClick="audiomanager.playSound(blue); return false;">Eiffel65 - Blue</a></li>
	<li><a href="#" onClick="audiomanager.playSound(roma); return false;">Dean Martin - On an evening in Roma</a></li>
    <li><a href="#" onClick="audiomanager.playSound(violin); return false;">Amira Saleh2 - when the violin talks (Soundcloud)</a></li>
</ul>


<script src="../js/audiomanager.min.js"></script>
<script>
var audiomanager = new AudioManager;

audiomanager.setSCKey('29e520b21e2ce8431d8a2b0f88e84a8b');

var blue = audiomanager.createSound('http://localhost/audiomanager/dist/mp3/eiffel65-blue.mp3','Eiffel 65 - Blue')

var roma = audiomanager.createSound('http://localhost/audiomanager/dist/mp3/dean-martin-on-an-evening-in-roma.mp3','Dean Martin - On an Evening in Roma');

var violin = audiomanager.createSound('https://soundcloud.com/amirra-salleh/when-the-violin-speaks','Amira Saleh2 - when the violin talks');

//audiomanager.play();

audiomanager.byteFrequencyData = function(data)
{
	//console.log(data);
}

</script>

</body>
</html>
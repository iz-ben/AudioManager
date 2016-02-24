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


<script src="../js/audiomanager.min.js"></script>
<script>
var audiomanager = AudioManager;

audiomanager.createSound('http://localhost/audiomanager/dist/mp3/eiffel65-blue.mp3','Test');

//audiomanager.play();

</script>

</body>
</html>
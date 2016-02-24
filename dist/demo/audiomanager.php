<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Audio Manager demo</title>
</head>

<body>

<script src="../js/audiomanager.min.js"></script>
<script>
var audiomanager = AudioManager;

audiomanager.createSound('http://localhost/audiomanager/dist/mp3/eiffel65-blue.mp3','Test');

audiomanager.play();

</script>

</body>
</html>
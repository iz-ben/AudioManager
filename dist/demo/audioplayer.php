<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Audio Player demo</title>
<link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="../css/audioplayer.min.css" rel="stylesheet" type="text/css">
<style>
body
{
	padding:100px 40px;
}
</style>
</head>

<body>

<div class="audioplayer">
	<div class="controls play-controls">
    	<div class="control-holder">
        	<div class="control-button">
            	<i class="fa fa-play"></i>
            </div>
        </div><!-- .control-holder -->
    </div><!-- .controls -->
    <div class="seekbar">
    	<div class="states-holder"></div><!-- .states-holder -->
        <div class="indicator"></div><!-- .indicator -->
    </div><!-- .seekbar -->
    <div class="volume-control controls">
    	<div class="volume-toggle">
        	<div class="control-button">
            	<i class="fa fa-volume-up"></i>
            </div><!-- .volume-icon -->
        </div><!-- .controls -->
        <div class="volume-popup"></div><!-- .volume-popup -->
    </div><!-- .controls -->
</div><!-- .audioplayer-->
</body>
</html>
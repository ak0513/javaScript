window.addEventListener('DOMContentLoaded', function() {
	var player = document.getElementById("video"),
		btnPlay = document.getElementById("btn-play"),
		btnPause = document.getElementById("btn-pause");
		btnMute = document.getElementById("btn-mute");
		btnUnmute = document.getElementById("btn-unmute");
	
	btnPlay.addEventListener("click",function(){
		playVideo(player);
	});
	btnPause.addEventListener("click",function(){
		pauseVideo(player);
	});
	btnMute.addEventListener("click",function(){
		disableMute(player);
	});
	btnUnmute.addEventListener("click",function(){
		enableMute(player);
	});

	video.onplaying = function() { 
		console.log('playing')
	}
});


function playVideo(ele) {
	ele.play();
}
function pauseVideo(ele) {
	ele.pause();
}
function enableMute(ele) {
	ele.muted = true;
}

function disableMute(ele) {
	ele.muted = false;
}
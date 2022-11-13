window.addEventListener('DOMContentLoaded', function() {
	var video = document.querySelector('.video-wrap'),
		player = document.getElementById("video"),
		btnPlay = document.getElementById("btn-play"),
		btnPause = document.getElementById("btn-pause");
		btnMute = document.getElementById("btn-mute");
		btnUnmute = document.getElementById("btn-unmute");
	
	btnPlay.addEventListener("click",function(){
		playVideo(player);
		video.classList.add('playing');
	});
	btnPause.addEventListener("click",function(){
		pauseVideo(player);
		video.classList.remove('playing');
	});
	btnMute.addEventListener("click",function(){
		enableMute(player);
		video.classList.add('mute');
	});
	btnUnmute.addEventListener("click",function(){
		disableMute(player);
		video.classList.remove('mute');
	});

	player.onplaying = function() { 
		video.classList.add('playing');
	}

	player.onpause = function() { 
		video.classList.remove('playing');
	}

	console.log(player)
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
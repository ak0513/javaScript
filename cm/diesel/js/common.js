window.addEventListener('DOMContentLoaded', function() {
	var video = document.querySelector('.video-wrap'),
		player = document.getElementById("video"),
		videoTxt = document.querySelector(".video-txt"),
		btnPlay = document.getElementById("btn-play"),
		btnPause = document.getElementById("btn-pause"),
		btnMute = document.getElementById("btn-mute"),
		btnUnmute = document.getElementById("btn-unmute");
	
	btnPlay.addEventListener("click",function() {
		playVideo(player);
		video.classList.add('playing');
		videoTxt.style.display = 'none';
	});
	btnPause.addEventListener("click",function() {
		pauseVideo(player);
		video.classList.remove('playing');
		video.classList.remove('touch');
	});
	btnMute.addEventListener("click",function() {
		enableMute(player);
		video.classList.add('mute');
		video.classList.remove('touch');
	});
	btnUnmute.addEventListener("click",function() {
		disableMute(player);
		video.classList.remove('mute');
		video.classList.remove('touch');
	});

	player.onplaying = function() { 
		video.classList.add('playing');
	}

	player.onpause = function() { 
		video.classList.remove('playing');
	}
	
	/* player.addEventListener('touchstart', function() {
		if(video.classList.contains('touch')) {
			console.log('clear')
			clearTimeout(timer);
		}
		if(video.classList.contains('playing')) {
			video.classList.add('touch');
			var timer = setTimeout(function() {
				video.classList.remove('touch');
				console.log('2초')
			},2000);
		}

	}) */

	player.addEventListener('touchstart', function() {
		clearTimeout(timer);
		var timer = setTimeout(function() {
			video.classList.remove('touch');
		},2000);
		if(video.classList.contains('touch')) {
			clearTimeout(timer);
		}
		if(video.classList.contains('playing')) {
			video.classList.add('touch');
		}
	})
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
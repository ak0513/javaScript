document.addEventListener('DOMContentLoaded', function() {
	setAttrRandomNum('link[rel="stylesheet"]', 'href');
	setAttrRandomNum('script[src]', 'src');


})
document.addEventListener('DOMContentLoaded', function() {
	var body = document.querySelector('body');
	var ua = navigator.userAgent.toLowerCase();
	
	// 모바일 체크
	var userAgent = {
		BlackBerry: function () {return ua.match(/blackberry/i) === null ? false : true;},
		Android: function () {return ua.match(/android/i) === null ? false : true;},
		iOS: function () {return ua.match(/iphone|ipad|ipod/i) === null ? false : true;},
		iPhone: function () {return ua.match(/iphone/i) === null ? false : true;},
		iPad: function () {return ua.match(/ipad/i) === null ? false : true;},
		Windows: function () {return ua.match(/windows/i) === null ? false : true;},
		edge: function () {return ua.match(/edge|edg/i) === null ? false : true;},
		opera: function () {return ua.match(/opr/i) === null ? false : true;},
		chrome: function () {return ua.match(/chrome/i) === null ? false : true;},
		msie: function () {return ua.match(/trident/i) === null ? false : true;},
		firefox: function () {return ua.match(/firefox/i) === null ? false : true;},
		safari: function () {return ua.match(/safari/i) === null ? false : true;},
		any: function () {return (userAgent.Android() || userAgent.BlackBerry() || userAgent.iOS() || userAgent.Opera() || userAgent.Windows())},
		isMobile: function () {return ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) === null ? false : true;},
	}
	
	var deviceInfo = {
		os: null,
		device: null,
		browser : null,
		mobile : userAgent.isMobile(),
	}
})






// deviceInfo 세팅
function setDeviceInfo() {
	// OS 체크
	var osName = (function() {
		switch(true) {
			case userAgent.iOS() : return deviceInfo.os = 'os_ios';
			case userAgent.Android() : return deviceInfo.os = 'os_android';
			case userAgent.BlackBerry() : return deviceInfo.os = 'os_blackBerry';
			case userAgent.Windows() : return deviceInfo.os = 'os_windows';
			default : return  deviceInfo.os = 'other-os';
		}
	})();

	// 디바이스 체크
	var deviceName = (function() {
		switch(true) {
			case userAgent.iPhone() : return deviceInfo.device = 'iphone';
			case userAgent.iPad() : return deviceInfo.device = 'ipad';
			default : return deviceInfo.device = 'other-device';
		}
	})();

	// 브라우저 체크
	var browserName = (function() {
		switch(true) {
			case userAgent.edge() : return deviceInfo.browser = "edge";
			case userAgent.opera() && !!window.opr: return deviceInfo.browser = "opera"
			case userAgent.chrome() && !!window.chrome: return deviceInfo.browser = "chrome";
			case userAgent.msie() : return deviceInfo.browser = "msie"
			case userAgent.firefox() : return deviceInfo.browser = "firefox";
			case userAgent.safari() : return deviceInfo.browser = "safari";
			default : return deviceInfo.browser = 'other-browser';
		}
	})();
}

// body에 device별 클래스 추가
function setBodyClass() {
	// pc mobile 체크
	var setPlatform = deviceInfo.mobile ? 'mobile' : 'pc';
	var bodyClass = setPlatform + ' ' + deviceInfo.os + ' ' + deviceInfo.browser + ' ' + deviceInfo.device;
	body.setAttribute('class', bodyClass)
}

setDeviceInfo(); // deviceInfo 세팅
setBodyClass(); // body에 device별 클래스 추가
// class 삭제
function removeClass(ele, className) {
	for(var i = 0; i < ele.length; i++) {
		ele[i].classList.remove(className)
	}
}

// 형제요소 찾기
function siblings(ele) {
	if(typeof(ele) === 'string') {
		ele = document.querySelector(ele)
	}
	var siblings = [...ele.parentNode.children].filter((child) =>
		child !== ele
	)
	return siblings
}

// 랜덤숫자 얻기
function getRandomNum() {
	return new Date().setDate(new Date().getDate())
}

// attr에 랜덤함수
function setAttrRandomNum(ele, attr) {
	var ele = document.querySelectorAll(ele);
	for(var i =0; i < ele.length; i++) {
		var eleAttr = ele[i].getAttribute(attr)
		eleAttr = eleAttr + '?' + getRandomNum();
		ele[i].setAttribute(attr, eleAttr)
	}
}

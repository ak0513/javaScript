document.addEventListener('DOMContentLoaded', function() {
	setAttrRandomNum('link[rel="stylesheet"]', 'href');
	setAttrRandomNum('script[src]', 'src');

	setDeviceInfo();
	setBodyClass();
})

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

var $eleFocusTags = 'input:not([tabindex]), button:not([tabindex]), a:not([tabindex]), select:not([tabindex]), textarea:not([tabindex])';var $eleTabindex = '[tabindex="0"]';
var eleTabindexM = '[tabindex="-1"]';
// 포커스 비활성화(접근성)
function accessDisable($eleDisable, module) {
	$eleDisable.attr({'aria-hidden':'true'}).addClass('is-disable-'+module+'-ariaHidden');
	$eleDisable.find(this.$eleTabindexM).addClass('is-disable-'+module+'-fixed');
	$eleDisable.find(this.$eleFocusTags).attr({'tabindex':'-1'}).addClass('is-disable-'+module+'-tags');
	$eleDisable.find(this.$eleTabindex).attr({'tabindex':'-1'}).addClass('is-disable-'+module+'-tabindex');
}

// 포커스 활성화(접근성)
function accessEnable($eleEnable, module){
	$eleEnable.attr({'aria-hidden':'false'}).removeClass('is-disable-'+module+'-ariaHidden');
	$eleEnable.find('.is-disable-'+module+'-tags').removeClass('is-disable-'+module+'-tags').removeAttr('tabindex');
	$eleEnable.find('.is-disable-'+module+'-tabindex').removeClass('is-disable-'+module+'-tabindex').attr({'tabindex':'0'});
	$eleEnable.find('.is-disable-'+module+'-fixed').removeClass('is-disable-'+module+'-fixed');
}

// body에 device별 클래스 추가
function setBodyClass() {
	// pc mobile 체크
	var setPlatform = deviceInfo.mobile ? 'mobile' : 'pc';
	var bodyClass = setPlatform + ' ' + deviceInfo.os + ' ' + deviceInfo.browser + ' ' + deviceInfo.device;
	document.querySelector('body').setAttribute('class', bodyClass)
}


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

// attr 세팅
function setAttr(ele, attr, value) {
	var ele = document.querySelectorAll(ele);
	ele.forEach(function(ele) {
		ele.setAttribute(attr, value)
	})
}

// url파라미터 값 구하기
function getUrlParam(param) {
	var urlParams = new URL(location.href).searchParams;
	var name = urlParams.get(param);
	return name;
}
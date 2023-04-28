document.addEventListener('DOMContentLoaded', function() {
	ui.setAttrRandomNum(document.querySelectorAll('link[rel="stylesheet"]'), 'href');
	ui.setAttrRandomNum(document.querySelectorAll('script[src]'), 'src');

	ui.setHighlight(); // hlight.js
	ui.setDeviceInfo(); // deviceInfo 세팅
	ui.setBodyClass(); // body에 device별 클래스 추가
})


var ui = (function() {
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
	
	// body에 device별 클래스 추가
	var setBodyClass = function() {
		// pc mobile 체크
		var setPlatform = deviceInfo.mobile ? 'mobile' : 'pc';
		var bodyClass = setPlatform + ' ' + deviceInfo.os + ' ' + deviceInfo.browser + ' ' + deviceInfo.device;
		document.querySelector('body').setAttribute('class', bodyClass)
	}
	
	// deviceInfo 세팅
	var setDeviceInfo = function() {
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

	// 포커스 비활성화(접근성)
	var accessDisable = function(eleDisable, module) {
		if(eleDisable.length > 0) {
			eleDisable = Array.from(eleDisable);
			eleDisable.forEach(function(item) {
				accessDisableFn(item)
			})
		} else {
			accessDisableFn(eleDisable)
		}

		function accessDisableFn(ele) {
			var itemFocusTags = ele.querySelectorAll('input:not([tabindex]), button:not([tabindex]), a:not([tabindex]), select:not([tabindex]), textarea:not([tabindex])');
			var itemTabindex = ele.querySelectorAll('[tabindex="0"]');
			var itemTabindexM = ele.querySelectorAll('[tabindex="-1"]');
			if(!ele.hasAttribute('aria-hidden')) {
				ele.setAttribute('aria-hidden','true');
				ele.classList.add('is-disable-' + module + '-aria-hidden');
			} else {
				ele.classList.add('is-disable-' + module + '-aria-fixed');
			}
			
			itemFocusTags.forEach(function(item) {
				item.setAttribute('tabindex', -1);
				item.classList.add('is-disable-' + module + '-tags');
			})
			itemTabindex.forEach(function(item) {
				item.setAttribute('tabindex', -1);
				item.classList.add('is-disable-' + module + '-tabindex');
			})
			itemTabindexM.forEach(function(item) {
				item.classList.add('is-disable-' + module + '-fixed');
			})
		}
	}

	// 포커스 활성화(접근성)
	var accessEnable = function(eleEnable, module) {
		if(eleEnable.length > 0) {
			eleEnable = Array.from(eleEnable);
			eleEnable.forEach(function(item) {
				accessEnableFn(item)
			})
		} else {
			accessEnableFn(eleEnable)
		}

		function accessEnableFn(ele) {
			if(ele.classList.contains('is-disable-' + module + '-aria-hidden')) {
				ele.removeAttribute('aria-hidden');
				ele.classList.remove('is-disable-' + module + '-aria-hidden');
			} else {
				ele.classList.remove('is-disable-' + module + '-aria-fixed');
			}

			var itemFocusTags = ele.querySelectorAll('.is-disable-' + module + '-tags');
			var itemTabindex = ele.querySelectorAll('.is-disable-' + module + '-tabindex');
			var itemTabindexM = ele.querySelectorAll('.is-disable-' + module + '-fixed');

			itemFocusTags.forEach(function(item) {
				item.removeAttribute('tabindex');
				item.classList.remove('is-disable-' + module + '-tags');
			})
			itemTabindex.forEach(function(item) {
				item.setAttribute('tabindex', 0);
				item.classList.remove('is-disable-' + module + '-tabindex');
			})
			itemTabindexM.forEach(function(item) {
				item.classList.remove('is-disable-' + module + '-fixed');
			})
		};
	}
	
	// 형제요소 찾기
	var siblings = function(ele) {
		if(typeof(ele) === 'string') {
			ele = document.querySelector(ele)
		}
		var siblings = [...ele.parentNode.children].filter((child) =>
			child !== ele
		)
		return siblings
	}

	// 이전 요소 찾기
	var prevAll = function(ele) {
		var result = [];
		while (ele = ele.previousElementSibling)
			result.push(ele);
		return result.reverse();
	}

	// 다음 요소 찾기
	var nextAll = function(ele) {
		var result = [];
		while (ele = ele.nextElementSibling)
			result.push(ele);
		return result;
	}

	// 가장 가까운 부모 찾기
	var closest = function(ele, selector) {
		var matchesSelector = ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector;
		while (ele) {
			if (matchesSelector.call(ele, selector)) {
				return ele;
			} else {
				ele = ele.parentElement;
			}
		}
		return null;
	}

	// class 삭제
	var removeClass = function(ele, className) {
		for(var i = 0; i < ele.length; i++) {
			ele[i].classList.remove(className)
		}
	}

	// 난수 생성
	var getRandomNum = function() {
		return new Date().setDate(new Date().getDate())
	}

	// attr 난수 적용
	var setAttrRandomNum = function(ele, attr) {
		for(var i =0; i < ele.length; i++) {
			var eleAttr = ele[i].getAttribute(attr)
			eleAttr = eleAttr + '?' + getRandomNum();
			ele[i].setAttribute(attr, eleAttr)
		}
	}

	// attr 세팅
	var setAttr = function(ele, attr, value) {
		ele.forEach(function(ele) {
			ele.setAttribute(attr, value)
		})
	}

	// url파라미터 값 구하기
	var getUrlParam = function(param) {
		var urlParams = new URL(location.href).searchParams;
		var name = urlParams.get(param);
		return name;
	}

	// hlight.js
	var setHighlight = function() {
		var highlightEle = document.querySelectorAll('.highlight');
		highlightEle.forEach(function(item) {
			if(item.classList.contains('html')) {
				var ele = item.firstElementChild
				var eleHtml = ele.parentElement.innerHTML;
				eleHtml = eleHtml.replaceAll('<', '&lt;');
				eleHtml = eleHtml.replaceAll('>', '&gt;');
				eleHtml = eleHtml.trim();
				item.innerHTML = '<pre><code>' + eleHtml + '</code></pre>';
			} else if(item.classList.contains('js')) {
				var eleHtml = item.innerHTML
				eleHtml = eleHtml.trim();
				item.innerHTML = '<div class="highlight js"><pre><code>' + eleHtml + '</code></pre></div>'
			} else if(item.classList.contains('css')) {
				var eleHtml = item.innerHTML
				eleHtml = eleHtml.trim();
				item.innerHTML = '<div class="highlight css"><pre><code>' + eleHtml + '</code></pre></div>'
			}
		})
		hljs.initHighlightingOnLoad();
	}

	return {
		setDeviceInfo: setDeviceInfo, // deviceInfo 세팅
		setBodyClass: setBodyClass, // body에 device별 클래스 추가
		accessDisable: accessDisable,
		accessEnable: accessEnable,
		siblings: siblings,
		prevAll: prevAll,
		nextAll: nextAll,
		closest: closest,
		removeClass: removeClass, // class 삭제
		getRandomNum: getRandomNum, // 난수 생성
		setAttrRandomNum: setAttrRandomNum, // attr 난수 적용
		setAttr: setAttr, // attr 세팅
		getUrlParam: getUrlParam, // url파라미터 값 구하기
		setHighlight: setHighlight // hlight.js
	};
})();
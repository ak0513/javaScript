document.addEventListener('DOMContentLoaded', function() {
	ui.setAttrRandomNum(document.querySelectorAll('link[rel="stylesheet"]'), 'href');
	ui.setAttrRandomNum(document.querySelectorAll('script[src]'), 'src');

	ui.setDeviceInfo(); // deviceInfo 세팅
	ui.setBodyClass();  // body에 device별 클래스 추가
	ui.tab()            // 탭
	ui.accordion()      // 아코디언
	ui.popup()          // 팝업

	// 꾸미기 용도
	ui.setHighlight();  // hlight.js
	ui.menuHtml();      // menuHtml
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
		version : null,
		mobile : userAgent.isMobile(),
	}
	
	// body에 device별 클래스 추가
	var setBodyClass = function() {
		// pc mobile 체크
		var setPlatform = deviceInfo.mobile ? 'mobile' : 'pc';
		var bodyClass = setPlatform + ' ' + deviceInfo.os + ' ' + deviceInfo.browser + ' ver' + deviceInfo.version + ' ' + deviceInfo.device;
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

		// 버전 체크
		var VersionName = (function() {
			switch(true) {
				case userAgent.edge() : return deviceInfo.version = getVersion('edge');
				case userAgent.opera() && !!window.opr: return deviceInfo.version = getVersion('opera');
				case userAgent.chrome() && !!window.chrome: return deviceInfo.version = getVersion('chrome');
				case userAgent.msie() : return deviceInfo.version = getVersion('msie');
				case userAgent.firefox() : return deviceInfo.version = getVersion('firefox');
				case userAgent.safari() : return deviceInfo.version = getVersion('safari');
				default : return deviceInfo.browser = 'other-browser';
			}
		})();
	}

	// 버전 구하기
	var getVersion = function(agent) {
		var version = null;
		if(agent === 'edge') {
			var matches = ua.match(/edg\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
		} else if(agent === 'opera') {
			var matches = ua.match(/opera\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
		} else if(agent === 'chrome') {
			var matches = ua.match(/chrome\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
		} else if(agent === 'msie') {
			var matches = ua.match(/msie\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
		} else if(agent === 'firefox') {
			var matches = ua.match(/firefox\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
		} else if(agent === 'safari') {
			var matches = ua.match(/version\/([0-9]+\.[0-9]+)/);
			console.log('safari', matches)
		}
		if (matches) {
			version = matches[1].split('.')[0];
		}
		return version;
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

	// 포커스 비활성화(접근성)
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

	// attr 삭제
	var removeAttr = function(ele, attr) {
		ele.forEach(function(ele) {
			ele.removeAttribute(attr)
		})
	}

	// url파라미터 값 구하기
	var getUrlParam = function(param) {
		var urlParams = new URL(location.href).searchParams;
		var name = urlParams.get(param);
		return name;
	}

	// slideDown
    var showCollapse = function(ele, speed) {
        ele.classList.remove('collapse');
        ele.classList.add('collapsing');
        ele.style.height = ele.scrollHeight + 'px';
        setTimeout(function() {
            ele.classList.remove('collapsing');
            ele.classList.add('collapse', 'show');
            ele.removeAttribute('style', 'height');
        }, speed)
    }

    // slideUp
    var hideCollapse = function(ele, speed) {
        ele.style.height = ele.scrollHeight + 'px';
        setTimeout(function() {
            ele.removeAttribute('style', 'height');
        })
        ele.classList.remove('collapse', 'show');
        ele.classList.add('collapsing');
        setTimeout(function() {
            ele.classList.remove('collapsing');
            ele.classList.add('collapse');
        }, speed)
    }


	// 탭
	var tab = function() {
		var tabBtns = document.querySelectorAll('.tab-btn');
		tabBtns.forEach(function(tabBtnsEle) {
			tabBtnsEle.addEventListener('click', function() {
				if(tabBtnsEle.parentElement.classList.contains('current')) {
					return;
				}
				var tab = tabBtnsEle.closest('.tab');
				var tabBtn = tab.querySelectorAll('.tab-btn');
				var tabItem = tab.querySelectorAll('.tab-item');
				var tabPannel = tab.querySelectorAll('.tab-panel');
				var controls = this.getAttribute('aria-controls');
				// 초기화
				ui.removeClass(tabItem, 'current');
				ui.removeClass(tabPannel, 'current');
				ui.setAttr(tabBtn, 'aria-selected', 'false')
				// 세팅
				this.parentElement.classList.add('current');
				this.setAttribute('aria-selected', true)
				tab.querySelector('#' + controls).classList.add('current');
			});
		})
	}


	// 아코디언
    var accordion = function() {
        var accordionBtns = document.querySelectorAll('.accordion-button');
        accordionBtns.forEach(function(accBtnsEle) {
            accBtnsEle.addEventListener('click', function(e) {
                accordionToggle(e.target)
            })
        })

        function accordionToggle(target) {
            var self = target;
            var accordion =  ui.closest(self, '.accordion'); // 클릭 요소의 부모 .accordion
            var accBtn = accordion.querySelectorAll('.accordion-button'); // 클릭 요소 부모의 모든 버튼
            var accItem = ui.closest(self, '.accordion-item'); // 클릭 요소의 .accordion-item
            var accCollapseSiblings = ui.siblings(accItem); // 클릭 요소의 형제 .accordion-item
            var accCollapse = accordion.querySelector('#' + self.getAttribute('aria-controls')); // 클릭 요소의 .accordion-collapse
            // 닫혀 있는 아코디언 클릭 하는 경우
            if(self.classList.contains('collapsed')) {
                // 클릭 요소의 accordion-collapse show
                showCollapse(accCollapse, 350);
                // 클릭 요소의 형제 accordion-collapse hide
                accCollapseSiblings.forEach(function(accCollapseSiblingsEle) {
                    if(accCollapseSiblingsEle.querySelector('.accordion-collapse').classList.contains('show')) {
                        hideCollapse(accCollapseSiblingsEle.querySelector('.accordion-collapse'), 350);
                    }
                });
                // 클릭 요소의 형제 accordion-header hide
                accBtn.forEach(function(accBtnEle) {
                    hideHeader(accBtnEle);
                })
                // 클릭 요소의 accordion-header show
                showHeader(self);
            } else { // 열려 있는 아코디언 클릭하는 경우
                // 클릭 요소의 accordion-collapse hide
                hideCollapse(accCollapse, 350);
                // 클릭 요소의 accordion-header hide
                hideHeader(self);
            }
        }

        function hideHeader(target) {
            target.classList.add('collapsed');
            target.setAttribute('aria-expanded', false);
        }

        function showHeader(target) {
            target.classList.remove('collapsed');
            target.setAttribute('aria-expanded', true);
        }
    }

	// 팝업
	var popup = function() {
		var popWrap = document.querySelectorAll('.modal')
		var btnPopOpen = document.querySelectorAll('[data-modal-open');
		var btnPopClose = document.querySelectorAll('[data-modal-close');


		popWrap.forEach(function(ele) {
			ele.setAttribute('aria-modal', 'true');
			ele.setAttribute('role', 'dialog');
			ele.setAttribute('tabindex', 0);
			document.querySelector('#' + ele.getAttribute('aria-labelledby'));
			ele.addEventListener('keydown', function(e) {
				if(e.keyCode === 27) {
					popClose(ele);
				}
			});
		})
	
		btnPopOpen.forEach(function(ele, i) {
			ele.setAttribute('aria-haspopup', 'dialog');
			btnPopOpens(i);
		})
		
		btnPopClose.forEach(function(ele, i) {
			btnPopCloses(ele, i); 
		})

		function btnPopOpens(i) {
			btnPopOpen[i].addEventListener('click', popOpen);
		}

		function btnPopCloses(ele, i) {
			btnPopClose[i].addEventListener('click', function() {
				popClose(ele);
			});
		}

		function popOpen(e) {
			ele = e.target;
			var controls = ele.dataset.modalOpen;
			var target = document.querySelector(controls);
			setTimeout(function() {target.focus()},1);
			target.classList.add('visible');
			setTimeout(function() {target.classList.add('active')},100);
			target.setAttribute('aria-modal', 'true');
			// 포커스 회귀하기 위해 클래스 추가
			ele.classList.add(controls.slice(1));
			// 접근성 소스
			accessDisable(prevAll(target), 'modal');
		}

		function popClose(ele) {
			var target = ele.closest('.modal')
			var openedBtn = document.querySelector('[data-modal-open].'+ target.getAttribute('id'));
			target.classList.remove('active')
			setTimeout(function() {target.classList.remove('visible')},100);
			// 포커스 회귀
			openedBtn.focus();
			openedBtn.classList.remove(target.getAttribute('id'));
			// 접근성 소스
			accessEnable(prevAll(target), 'modal');
		}
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
				item.innerHTML = '<div class="hljs-header">Html</div><pre><code>' + eleHtml + '</code></pre>';
			} else if(item.classList.contains('js')) {
				var eleHtml = item.innerHTML
				eleHtml = eleHtml.trim();
				item.innerHTML = '<div class="hljs-header">JavaScript</div><pre><code class="hljs language-javascript">' + eleHtml + '</code></pre>';
			} else if(item.classList.contains('css')) {
				var eleHtml = item.innerHTML
				eleHtml = eleHtml.trim();
				item.innerHTML = '<div class="hljs-header">Css</div><div class="highlight css"><pre><code>' + eleHtml + '</code></pre></div>';
			}
		})
		hljs.initHighlightingOnLoad();
	}

	var menuHtml = function() {
		var elm = document.querySelectorAll('.h-tit2');
		var menu = document.querySelector('#menu .menu-group');
		elm.forEach(function(ele) {
			var id = ele.getAttribute('id');
			console.log(id)
			var htmlEle = [];
			if(id !== null) {
				htmlEle.push('<li class="menu-item"><a href="#' + id +'" class="menu-link">' + id + '</a></li>')
				menu.innerHTML = menu.innerHTML + htmlEle.join('');
			}
		})
	}

	return {
		deviceInfo: deviceInfo,             // deviceInfo 정보
		setDeviceInfo: setDeviceInfo,       // deviceInfo 세팅
		setBodyClass: setBodyClass,         // body에 device별 클래스 추가
		accessDisable: accessDisable,       // 포커스 비활성화(접근성)
		accessEnable: accessEnable,         // 포커스 활성화(접근성)
		siblings: siblings,                 // 형제요소 찾기
		prevAll: prevAll,                   // 이전 요소 찾기
		nextAll: nextAll,                   // 다음 요소 찾기
		closest: closest,                   // 가장 가까운 부모 찾기
		removeClass: removeClass,           // class 삭제
		getRandomNum: getRandomNum,         // 난수 생성
		setAttrRandomNum: setAttrRandomNum, // attr 난수 적용
		setAttr: setAttr,                   // attr 세팅
		removeAttr: removeAttr,             // attr 삭제
		getUrlParam: getUrlParam,           // url파라미터 값 구하기

		tab: tab,                           // 탭
		accordion: accordion,               // 아코디언
		popup: popup,                       // 팝업

		// 꾸미기 용도
		setHighlight: setHighlight,         // hlight.js
		menuHtml: menuHtml                  // menuHtml
	};
})();
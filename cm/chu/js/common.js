document.addEventListener('DOMContentLoaded', function() {
	setAttrRandomNum(document.querySelectorAll('link[rel="stylesheet"]'), 'href');
	setAttrRandomNum(document.querySelectorAll('script[src]'), 'src');

	var eleFocusTags = 'input:not([tabindex]), button:not([tabindex]), a:not([tabindex]), select:not([tabindex]), textarea:not([tabindex])';
	var eleTabindex = '[tabindex="0"]';
	var eleTabindexM = '[tabindex="-1"]';
	// 포커스 비활성화(접근성)
	function accessDisable(eleDisable, module) {
		eleDisable.forEach(function(ele) {
			var eleTabindexMChild = ele.querySelectorAll(eleTabindexM);
			var eleFocusTagsChild = ele.querySelectorAll(eleFocusTags);
			var eleTabindexChild = ele.querySelectorAll(eleTabindex);
			ele.setAttribute('aria-hidden', true);
			ele.classList.add('is-disable-'+module+'-ariaHidden');
			eleTabindexMChild.forEach(function(ele) {
				ele.classList.add('is-disable-'+module+'-fixed')
			});
			eleFocusTagsChild.forEach(function(ele) {
				ele.setAttribute('tabindex', '-1');
				ele.classList.add('is-disable-'+module+'-tags')
			});
			eleTabindexChild.forEach(function(ele) {
				ele.setAttribute('tabindex', '-1');
				ele.classList.add('is-disable-'+module+'-tabindex')
			});
		});
	}

	// 포커스 활성화(접근성)
	function accessEnable(eleEnable, module){
		eleEnable.forEach(function(ele) {
			
			var eleTabindexMChild = ele.querySelectorAll('.is-disable-'+module+'-fixed');
			var eleFocusTagsChild = ele.querySelectorAll('.is-disable-'+module+'-tags');
			var eleTabindexChild = ele.querySelectorAll('.is-disable-'+module+'-tabindex');
			ele.setAttribute('aria-hidden', false);
			ele.classList.remove('is-disable-'+module+'-ariaHidden');
			eleTabindexMChild.forEach(function(ele) {
				ele.classList.remove('is-disable-'+module+'-fixed')
			});
			eleFocusTagsChild.forEach(function(ele) {
				ele.removeAttribute('tabindex');
				ele.classList.remove('is-disable-'+module+'-tags')
			});
			eleTabindexChild.forEach(function(ele) {
				ele.setAttribute('tabindex', '0');
				ele.classList.remove('is-disable-'+module+'-tabindex')
			});
		});
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
		for(var i =0; i < ele.length; i++) {
			var eleAttr = ele[i].getAttribute(attr)
			eleAttr = eleAttr + '?' + getRandomNum();
			ele[i].setAttribute(attr, eleAttr)
		}
	}

	// attr 세팅
	function setAttr(ele, attr, value) {
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

	// 가장 가까운 부모 찾기
	function closest(ele, selector) {
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

	var sideMenuLink = document.querySelectorAll('.menu-link.has-sub');
	var sideMenuItem = document.querySelectorAll('.menu-item');
	var sideMenuDepth2 = document.querySelectorAll('.menu-depth2');
	sideMenuLink.forEach(function(ele) {
		ele.setAttribute('aria-expanded', false);
		ele.addEventListener('click', showMenuDepth2)
	});
	
	// sidemenu
	function showMenuDepth2(e) {
		var ele = e.target;
		var eleParents = closest(ele, '.menu-item');
		var eleDepth2 = ele.nextElementSibling;
		// aria-expanded 세팅
		sideMenuLink.forEach(function(ele) {
			ele.setAttribute('aria-expanded', false);
		});
		ele.setAttribute('aria-expanded', true);

		// on 삭제
		removeClass(sideMenuItem, 'on');
		// on 추가
		eleParents.classList.add('on');

		// this 슬라이드
		if(eleDepth2.classList.contains('show')) {
			hideCollapse(eleDepth2);
		} else {
			showCollapse(eleDepth2);
		}
		
		//sideMenuDepth2 슬라이드
		sideMenuDepth2.forEach(function(ele) {
			if(ele.classList.contains('show')) {
				hideCollapse(ele);
			}
		});

		// collapse show
		function showCollapse(ele) {
			// eleDepth2 높이 설정
			var eleDepth2Height = getEleHeight(eleDepth2);
			ele.classList.remove('collapse');
			ele.classList.add('collapsing');
			setTimeout(function() {
				ele.style.height = eleDepth2Height + 'px';
			});
			setTimeout(function() {
				ele.classList.remove('collapsing');
				ele.classList.add('collapse' ,'show');
			},350);
		}

		// collapse hide
		function hideCollapse(ele) {
			ele.classList.remove('collapse' ,'show');
			ele.classList.add('collapsing');
			ele.style.height = '';
			setTimeout(function() {
				ele.classList.remove('collapsing');
				ele.classList.add('collapse');
			},350);
		}
	}

	// 높이 구하기
	function getEleHeight(ele) {
		var eleClone = ele.cloneNode(true);
		document.body.append(eleClone);
		var eleCloneHeight = eleClone.clientHeight;
		eleClone.remove();
		return eleCloneHeight
	}
})
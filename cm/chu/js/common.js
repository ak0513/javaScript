document.addEventListener('DOMContentLoaded', function() {
	setAttrRandomNum(document.querySelectorAll('link[rel="stylesheet"]'), 'href');
	setAttrRandomNum(document.querySelectorAll('script[src]'), 'src');

	var sideMenuLink = document.querySelectorAll('.menu-link');
	var sideMenuItem = document.querySelectorAll('.menu-item');
	var sideMenuDepth2 = document.querySelectorAll('.menu-depth2');
	var sideMenuDepth2Link = document.querySelectorAll('.menu-depth2-link');
	sideMenuLink.forEach(function(ele) {
		ele.setAttribute('aria-expanded', false);
		ele.addEventListener('click', showMenuDepth2)
	});
	
	// sidemenu
	function showMenuDepth2(e) {
		e.preventDefault();
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
			removeClass(sideMenuItem, 'on');
			hideCollapse(eleDepth2);
		} else {
			showCollapse(eleDepth2);
		}

		document.querySelector('.menu-logo-btn').addEventListener('click', function() {
			hideCollapse(eleDepth2);
			removeClass(sideMenuItem, 'on');
		});
		
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

	// 슬라이드 이동
	document.querySelector('.menu-logo-btn').addEventListener('click', function(e) {
		document.querySelector('[data-ds-jump="0"]').click();
		popClose('#sideMenu');
		removeClass(sideMenuLink, 'on');
		removeClass(sideMenuDepth2Link, 'on');
	})

	document.querySelector('#team').addEventListener('click', function(e) {
		document.querySelector('[data-ds-jump="2"]').click();
		openSide('#team.menu-depth2-link');
		popClose('#sideMenu');
	})

	document.querySelector('#tass').addEventListener('click', function(e) {
		document.querySelector('[data-ds-jump="3"]').click();
		openSide('#tass.menu-depth2-link');
		popClose('#sideMenu');
	})

	document.querySelector('#roadMap').addEventListener('click', function(e) {
		document.querySelector('[data-ds-jump="4"]').click();
		openSide('#roadMap');
		popClose('#sideMenu');
	})

	document.querySelector('#story').addEventListener('click', function(e) {
		document.querySelector('[data-ds-jump="5"]').click();
		openSide('#story');
		popClose('#sideMenu');
	});

	// 서브페이지에서 메인 이동시
	var slideNum = getUrlParam('slide');
	switch (slideNum) {
		case '2' : 
			openSide('#team.menu-depth2-link');
			setTimeout(() => {
				document.querySelector('[data-ds-jump="2"]').click();
				document.querySelector('.menu-item.item1 .menu-link').click();
			}, 100);
			break;
		case '3' : 
			openSide('#tass.menu-depth2-link');
			setTimeout(() => {
				document.querySelector('[data-ds-jump="3"]').click();
				document.querySelector('.menu-item.item1 .menu-link').click();
			}, 100);
			break;
		case '4' : 
			setTimeout(() => {
				openSide('#roadMap');
				document.querySelector('[data-ds-jump="4"]').click();
		}, 100);
			break;
		case '5' : 
			setTimeout(() => {
				openSide('#story');
				document.querySelector('[data-ds-jump="5"]').click();
		}, 100);
			break;
	}

	function openSide(ele) {
		removeClass(sideMenuLink, 'on');
		removeClass(sideMenuDepth2Link, 'on');
		document.querySelector(ele).classList.add('on');
	}
})
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


// 팝업
function popOpen(ele, btn) {
	var tar = document.querySelector(ele);
	tar.setAttribute('tabindex', 0);
	setTimeout(function() {
		tar.focus();
	},10)
	tar.classList.add('pop-open');
	btn.setAttribute('data-pop', tar.getAttribute('id'));
	console.log(siblings(tar))
	accessDisable(siblings(tar), 'nav');
}

function popClose(ele) {
	var tar = document.querySelector(ele);
	var btns = document.querySelectorAll('[data-pop]');
	tar.removeAttribute('tabindex');
	tar.classList.remove('pop-open');
	accessEnable(siblings(tar), 'nav');
	btns.forEach(function(ele) {
		if(ele.dataset.pop === tar.getAttribute('id')) {
			setTimeout(function() {
				ele.focus();
				ele.removeAttribute('data-pop');
			},10)
		}
	})
}


document.addEventListener('DOMContentLoaded', function() {
    setHighlight()
})

// 불러올 컨텐츠가 들어있는 URL
var headerUrl = './header.html';
var asideUrl = './aside.html';

function loadData(url, targetElementId, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                targetElement.innerHTML = data;
                if (callback && typeof callback === 'function') {
                    callback(); // 콜백 함수 호출
					menuHtml() // 현재페이지 목차 노출
                }
            } else {
                console.error(`Target element with ID '${targetElementId}' not found.`);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

loadData(headerUrl, 'header');
loadData(asideUrl, 'aside', callback);

// callback 예시
function callback() {
	document.getElementById('callback').classList.add('callback')
	// ui.menuHtml()
}


// hlight.js
function setHighlight() {
    var highlightEle = document.querySelectorAll('.highlight');
    highlightEle.forEach(function(item) {
        if(item.classList.contains('html')) {
            var ele = item.firstElementChild
            var eleHtml = ele.parentElement.innerHTML;
            eleHtml = eleHtml.replaceAll('<', '&lt;');
            eleHtml = eleHtml.replaceAll('>', '&gt;');
            eleHtml = eleHtml.trim();
            item.innerHTML = '<div class="hljs-header">HTML</div><pre><code>' + eleHtml + '</code></pre>';
        } else if(item.classList.contains('js')) {
            var eleHtml = item.innerHTML
            eleHtml = eleHtml.trim();
            item.innerHTML = '<div class="hljs-header">JAVASCRIPT</div><pre><code>' + eleHtml + '</code></pre>';
        } else if(item.classList.contains('css')) {
            var eleHtml = item.innerHTML
            eleHtml = eleHtml.trim();
            item.innerHTML = '<div class="hljs-header">CSS</div><pre><code>' + eleHtml + '</code></pre>';
        }
    })
    hljs.initHighlightingOnLoad();
}


function menuHtml() {
    var elm = document.querySelectorAll('.h-tit2');
    var menu = document.querySelector('#menu');
    elm.forEach(function(item) {
        var id = item.getAttribute('id');
        // console.log(id)
        var htmlEle = [];
        if(id !== null) {
            htmlEle.push('<li class="aside-menu-item"><a href="#' + id +'" class="aside-menu-link">' + id + '</a></li>')
            menu.innerHTML = menu.innerHTML + htmlEle.join('');
        }

        // 해시태그 클릭 시 스크롤 이동 및 해시태그 추가
        function scrollToHashTag(hashTag) {
            var targetElement = document.getElementById(hashTag);
            if (targetElement) {
                var targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: targetOffset - 80, behavior: 'smooth' });
            }
            history.pushState(null, null, "#" + hashTag);
        }

        // 해시태그 링크 클릭 시 이벤트 처리
        var hashLinks = document.querySelectorAll('#menu .aside-menu-link');
        for (var i = 0; i < hashLinks.length; i++) {
            hashLinks[i].addEventListener("click", function(event) {
                event.preventDefault(); // 링크 클릭 동작 취소
                var hashTag = this.getAttribute("href").substr(1);
                scrollToHashTag(hashTag);
            });
        }
    })

}
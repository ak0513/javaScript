window.addEventListener('DOMContentLoaded', function() {
    // 모바일 gnb 메뉴 열기
    var wrap =  document.getElementById('wrap');
    var txt =  document.querySelector('#btn-open-mobile-nav .txt');
    document.querySelector('#btn-open-mobile-nav').addEventListener('click', function() {
        if(wrap.classList.contains('on')) {
            wrap.classList.remove('on');
            txt.innerHTML = 'MENU';
        } else {
            wrap.classList.add('on');
            txt.innerHTML = 'CLOSE';
        }
    });

    // pc gnb 서브 노출
    var header = document.querySelector('#header');
    var nav = document.querySelector('#nav');
    var navItem = document.querySelectorAll('.nav-item');
    var navLink = document.querySelectorAll('.nav-link');
    navLink.forEach(function(item) {
        item.addEventListener('mouseenter', function(e) {
            navItem.forEach(function(item) {
                item.classList.remove('on');
                item.classList.add('active');
                setTimeout(function() {
                    item.classList.remove('active');
                },200)
            })
            // item.parentElement.classList.add('on');
            item.parentElement.classList.add('active');
            setTimeout(function() {
                item.parentElement.classList.remove('active');
                item.parentElement.classList.add('on');
            },200);
        })
    });
    header.addEventListener('mouseleave', function() {
        navItem.forEach(function(item) {
            item.classList.remove('on');
            item.classList.add('active');
            setTimeout(function() {
                item.classList.remove('active');
            },200)
        })
    })

    // mo gnb 서브 노출
    var navMobileItem = document.querySelectorAll('.nav-mobile-item');
    var navMobileLink = document.querySelectorAll('.nav-mobile-link.has-dep2');
    navMobileLink.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var self = e.target;
            if(self.parentElement.classList.contains('on')) {
                self.parentElement.classList.remove('on');
            } else {
                self.parentElement.classList.add('on');
            }
        })
    });

    // 서브 페이지에 sub 클래스 추가
    var docSlider = document.querySelector('.docSlider');
    document.querySelector('html').classList.add('sub');
    if(!!docSlider) {
        document.querySelector('html').classList.remove('sub');
    }

    // 서브페이지 상단으로 가기
    document.querySelector('#footer .go1').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 스크롤시
    var nowScrollTop = window.scrollY;
    window.addEventListener('scroll', function() {
        if(window.scrollY > 0) {
            header.classList.add('scrolled')
        } else {
            header.classList.remove('scrolled')
        }
    });

    cheHeight();
})

// 모션
window.addEventListener('mousemove', function(e) {
    var tar = document.querySelectorAll('.motion');
    var Ytransform = (window.innerHeight / 2 - e.clientX) * 0.02;
    var Xtransform = (window.innerWidth / 2 - e.clientY) * 0.02;
    tar.forEach(function(item) {
        item.style.transform = "translate(" + Ytransform + "px," + Xtransform + "px)"
    });
});

window.addEventListener('resize', function(e) {
    cheHeight();
});

// 높이 900이하인 경우
function cheHeight() {
    if(window.innerHeight < 900 && window.innerWidth > 980) {
        document.querySelector('body').classList.add('type2');
    } else {
        document.querySelector('body').classList.remove('type2');
    }
}

window.addEventListener('DOMContentLoaded', function() {
    // 모바일 gnb 메뉴 열기
    var wrap =  document.getElementById('wrap');
    document.querySelector('#btn-open-mobile-nav').addEventListener('click', function() {
        if(wrap.classList.contains('on')) {
            wrap.classList.remove('on');
        } else {
            wrap.classList.add('on');
        }
    });

    // pc gnb 서브 노출
    var nav = document.querySelector('#nav');
    var navItem = document.querySelectorAll('.nav-item');
    var navLink = document.querySelectorAll('.nav-link');
    navLink.forEach(function(item) {
        item.addEventListener('mouseenter', function(e) {
            navItem.forEach(function(item) {
                item.classList.remove('on');
            })
            item.parentElement.classList.add('on');
        })
    });
    nav.addEventListener('mouseleave', function() {
        navItem.forEach(function(item) {
            item.classList.remove('on');
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
                self.parentElement.classList.remove('on')
            } else {
                self.parentElement.classList.add('on');
            }
        })
    });
})

window.addEventListener('mousemove', function() {
    var tar = document.querySelectorAll('.motion img');
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    var mouseXpos = event.clientX;
    var mouseYpos = event.clientY;
    var Ytransform = (winW / 2 - mouseXpos) * 0.01;
    var Xtransform = (winH / 2 - mouseYpos) * 0.01;
    tar.forEach(function(item) {
        setTimeout(function() {
            item.style.transform = "translate(" + Ytransform + "px," + Xtransform + "px)"
        },200)
    });
});
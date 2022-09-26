window.addEventListener('DOMContentLoaded', function() {
    var wrap =  document.getElementById('wrap');
    // gnb 메뉴 열기
    document.querySelector('#btn-open-mobile-nav').addEventListener('click', function() {
        if(wrap.classList.contains('on')) {
            wrap.classList.remove('on');
        } else {
            wrap.classList.add('on');
        }
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
        item.style.transform = "translate(" + Ytransform + "px," + Xtransform + "px)"
    });
});
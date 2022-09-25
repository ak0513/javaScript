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
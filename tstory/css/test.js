document.addEventListener('DOMContentLoaded', function() {
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
})

/* 샘플 버튼 제어 */
var btnSample = document.querySelectorAll('.sample-btn button');
btnSample.forEach(function(item) {
    item.addEventListener('click', function() {
        var itemSiblings = ui.siblings(item);
        itemSiblings.forEach(function(item) {
            item.classList.remove('on')
        })
        item.classList.add('on');
    })
})
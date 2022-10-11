window.addEventListener('DOMContentLoaded', function() {
    var navItem = document.querySelectorAll('.nav-item');
    var navLink = document.querySelectorAll('.nav-link.has-sub');
    navLink.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            item.parentElement.classList.toggle('on')
        })
    });
});
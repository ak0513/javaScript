var path = '';
var url = document.location.href;
if(url.indexOf('component') > -1) {
    path = '.'
}
document.write('<li' + 'nk rel="stylesheet" href="' + path + './css/common.css">\n'
+ '<li' + 'nk rel="stylesheet" href="' + path + './css/style.css">\n'
+ '<li' + 'nk rel="stylesheet" href="' + path + './css/highlight/atom-one-dark.min.css">\n'
+ '<li' + 'nk rel="stylesheet" href="' + path + './css/highlight.css">\n'
+ '<scr' + 'ipt src="' + '' + path + './js/common.js"><\/scr' + 'ipt>\n'
+ '<scr' + 'ipt src="' + '' + path + './js/highlight.min.js"><\/scr' + 'ipt>\n');
function removeClass(ele, className) {
	for(var i = 0; i < ele.length; i++) {
		ele[i].classList.remove(className)
	}
}

function siblings(ele) {
	var siblings = [...document.querySelector(ele).parentNode.children].filter((child) =>
		child !== document.querySelector(ele)
	)
	return siblings
}
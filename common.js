var ui = {
    // 형제 요소 찾기
    siblings: function(ele) {
		return [...document.querySelector(ele).parentNode.children].filter((child) =>
			child !== document.querySelector(ele)
		)
	},
    randomNum2: new Date().setDate(new Date().getDate())
}
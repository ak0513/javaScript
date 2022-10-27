$(function(){
	countdown();
	footer_select_AC();

	// 모바일 메뉴
	$('.mobile-menu-link.has-sub').click(function(e) {
		e.preventDefault();
		$('.mobile-menu-item').removeClass('on')
		$('.mobile-menu-depth2').slideUp();
		$('.mobile-menu-link.has-sub').attr('aria-expanded', false);
		
		$(this).attr('aria-expanded', true);
		$(this).next().slideToggle();
		$(this).parent().addClass('on')
	})

	$('.btn-mobile-menu-open').click(function() {
		$('#mobile-menu').addClass('on').attr('tabindex', 0).focus();
	})
	$('.btn-mobile-closed').click(function() {
		$('#mobile-menu').removeClass('on').removeAttr('tabindex');
		$('.btn-mobile-menu-open').focus();
	})

	// 달력
	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년'
	});
	$( "#datepicker1" ).datepicker({
		changeMonth: true,
		changeYear: true
	});
	$( "#datepicker2" ).datepicker({
		changeMonth: true,
		changeYear: true
	});
});

// 팝업 열기
function pop(tar) {
	$(tar).addClass('on').attr('tabindex', 0).focus();
}

// 팝업 닫기
function popClose(tar, focus) {
	$(tar).removeClass('on').removeAttr('tabindex')
	$(focus).focus();
}

// 숫자 카운터
function countdown(){
    var obj = $('[data-skin="count"]');

    function _set(str){
        var count= str.text();//value
        var speeds = 2000;//2초간 진행

        if(count == "" || count == undefined) count = 0;
        count = count.replace(",","");
    
        $({ val : 0 }).animate({ val : count }, {
            duration: speeds,
            step: function() {
                var num = commas(Math.floor(this.val));
                str.text(num);
            },
            complete: function() {
                var num = commas(Math.floor(this.val));
                str.text(num);
            }
        });
        function commas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
    }

    for(var i=0; i<obj.length; i++){
        _set(obj.eq(i));
    }
}

// 푸터 셀렉트 박스
function footer_select_AC(){
	var obj = $('.footer [data-js="select"]'); 
		obj.btn = obj.find(">a");
	obj.each(function() {
		var t = $(this);
			t.btn = t.find(">a"); 
			t.ul = t.find(">ul"); 
			t.ul.li = t.ul.find(">li"); 
		
		$("<em class='hidden'>열기</em>").appendTo(t.btn);
			
		t.btn.on("click",function() {
			if(t.ul.is(":animated")) return false;
			
			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			if($(this).hasClass("on")){
				$(this).find(">em").text("닫기");
			} else {
				$(this).find(">em").text("열기");
			}
			return false;
		});
		
		t.on("mouseleave",function() {
			$(this).find(">a").removeAttr("class");
			$(this).find(">ul").slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});
		
		t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});
	});
}
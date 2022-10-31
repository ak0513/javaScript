$(function(){
	countdown();
	footer_select_AC();

	// GNB
	var $gnb = $('#gnb');
	var $gnbLink = $('.gnb-link');
	var $gnbDepth2Link = $('.gnb-depth2-link');
	$gnbLink.on('mouseenter', function() {
		$gnbLink.removeClass('on');
		$gnb.addClass('gnb-open');
		$(this).addClass('on');
	});

	$gnbDepth2Link.on('mouseenter', function() {
		$gnbLink.removeClass('on');
		$(this).closest('.gnb-depth2-group').prev().addClass('on')
	})

	$gnb.on('mouseleave', function() {
		$gnb.removeClass('gnb-open');
		$gnbLink.removeClass('on');
	})

	

	// 모바일 메뉴
	$('.mobile-menu-link.has-sub').click(function(e) {
		e.preventDefault();
		if(!$(this).parent().hasClass('on')) {
			$('.mobile-menu-item').removeClass('on');
			$('.mobile-menu-depth2').slideUp();
			$('.mobile-menu-link.has-sub').attr('aria-expanded', false);
		
			$(this).attr('aria-expanded', true);
			$(this).next().slideDown();
			$(this).parent().addClass('on');
		} else {
			$(this).attr('aria-expanded', false);
			$(this).next().slideUp();
			$(this).parent().removeClass('on');
		}
	})
	

	$('.btn-mobile-menu-open').click(function() {
		$('#mobile-menu').addClass('on').attr('tabindex', 0).focus();
		accessDisable($('#mobile-menu').siblings(), 'modal')
	})
	$('.btn-mobile-closed').click(function() {
		closeMobileMenu();
	})

	function closeMobileMenu() {
		$('#mobile-menu').removeClass('on').removeAttr('tabindex');
		$('.btn-mobile-menu-open').focus();
		accessEnable($('#mobile-menu').siblings(), 'modal');
	}

	$('.mobile-menu-dim').click(function() {
		closeMobileMenu();
	})

	$('.mobile-menu-login').click(function() {
		accessEnable($('#popLogin'), 'modal');
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

	// 입찰정보 sort
	var $bidDetailSortBtn = $('.bid-detail-sort-btn > button');
	$bidDetailSortBtn.on('click',function() {
		$bidDetailSortBtn.removeClass('on');
		$(this).addClass('on');
	})
});

// 팝업 열기
function pop(tar) {
	$(tar).addClass('on').attr('tabindex', 0).focus();
	accessDisable($(tar).siblings(), 'modal');
	
}

// 팝업 닫기
function popClose(tar, focus) {
	$(tar).removeClass('on').removeAttr('tabindex')
	$(focus).focus();
	accessEnable($(tar).siblings(), 'modal');
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
	var obj = $('#footer [data-js="select"]'); 
		obj.btn = obj.find(">a");
	obj.each(function() {
		var t = $(this);
			t.btn = t.find(">a"); 
			t.ul = t.find(">ul"); 
			t.ul.li = t.ul.find(">li"); 
		
		$("<em class='a11y'>열기</em>").appendTo(t.btn);
			
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
			$(this).find(">a").removeClass("on");
			$(this).find(">ul").slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});
		
		t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeClass("on");
			$(this).parent().parent().slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});
	});
}

var $eleFocusTags = 'input:not([tabindex]), button:not([tabindex]), a:not([tabindex]), select:not([tabindex]), textarea:not([tabindex])';var $eleTabindex = '[tabindex="0"]';
var eleTabindexM = '[tabindex="-1"]';

// 포커스 비활성화(접근성)
function accessDisable($eleDisable, module) {
	$eleDisable.attr({'aria-hidden':'true'}).addClass('is-disable-'+module+'-ariaHidden');
	$eleDisable.find(this.$eleTabindexM).addClass('is-disable-'+module+'-fixed');
	$eleDisable.find(this.$eleFocusTags).attr({'tabindex':'-1'}).addClass('is-disable-'+module+'-tags');
	$eleDisable.find(this.$eleTabindex).attr({'tabindex':'-1'}).addClass('is-disable-'+module+'-tabindex');
}

// 포커스 활성화(접근성)
function accessEnable($eleEnable, module){
	$eleEnable.attr({'aria-hidden':'false'}).removeClass('is-disable-'+module+'-ariaHidden');
	$eleEnable.find('.is-disable-'+module+'-tags').removeClass('is-disable-'+module+'-tags').removeAttr('tabindex');
	$eleEnable.find('.is-disable-'+module+'-tabindex').removeClass('is-disable-'+module+'-tabindex').attr({'tabindex':'0'});
	$eleEnable.find('.is-disable-'+module+'-fixed').removeClass('is-disable-'+module+'-fixed');
}
_ua = (function(){
	return {
		ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
		ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
		ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
		ltIE9:document.uniqueID && typeof window.matchMedia == "undefined"
	}
})();

// ヘッダーの要素設定
function setupHeader(shop){

    var shopList = ['omiya','kitasenju','ikebukuro','yurakucho','shinjuku','est','tachikawa','yokohama','machida','ogikubo','fujisawa','kawagoe','shibuya','shinagawa','luminewing'];
    var nameList = ['ルミネ大宮','ルミネ北千住','ルミネ池袋','ルミネ有楽町','ルミネ新宿','ルミネエスト','ルミネ立川','ルミネ横浜','ルミネ町田','ルミネ荻窪','ルミネ藤沢','ルミネ川越','ルミネマン渋谷','ルミネ ザ・キッチン品川','大船ルミネウィング'];

    for (var i = 0; i < shopList.length; i++) {
        if(shopList[i] == shop){
            $('#shopName').append('<h2><a href="/'+shop+'/" class="transition">'+nameList[i]+'</a></h2>');
            $('#lang_en a').attr('href', $('#lang_en a').attr('href') + '?shop=' + shop);
            $('#lang_zhs a').attr('href', $('#lang_zhs a').attr('href') + '?shop=' + shop);
            $('#lang_zht a').attr('href', $('#lang_zht a').attr('href') + '?shop=' + shop);
            $('#lang_ko a').attr('href', $('#lang_ko a').attr('href') + '?shop=' + shop);
        }
    };

}
// luminewing フッター設定
function setupLuminewingFooter(){

    $('#corpInfo a').attr({'href': '/luminewing/company/', 'target': '_self'});
    $('.luminewingNav').css('display', 'inline-block');

}

(function($){

    // URLクエリ取得
    $.fn.getUrlVars = function(){
        var new_url = window.location.href.replace(/#.*$/,"");
        var vars = [], hash;
        var hashes = new_url.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

	// ロールオーバー
	$.fn.rollOver = function(options){

		var settings = $.extend({
			alpha : 0.7
		}, options);

		$(this)
		.hover(function(){
			$(this).stop().animate({'opacity':settings.alpha}, 'fast');
		},function(){
			$(this).stop().animate({'opacity':1}, 'fast');
		});

		return this;

	}
    $.fn.rollOverImg = function(options){

        var settings = $.extend({
            hName : '_on' // ロールオーバー時の接尾語
        }, options);

        $(this).each(function(i){
            var src = $(this).attr('src');
            var hSrc = src.replace(/^(.+)(\.[a-z]+)$/, '$1'+ settings.hName +'$2');
            var img = new Image();img.src = hSrc; // ロールオーバー画像をプリロード
            
            $(img).css({'position':'absolute','top': '0px','left': '0px','opacity':0});
            var parent = $(this).parent();
            $(parent).css({'display':'block','position':'relative'});
            $(parent).append($(img));

            $(parent).hover(function(){
                $(img).stop().animate({'opacity':1}, 'fast');
            },function(){
                $(img).stop().animate({'opacity':0}, 'fast');
            });
        });

        return this;
    }

	// プルダウンメニュー
	$.fn.pullDownMenu = function(){

		var options;
		$(this)
     .hover(
        function(){
           $(this).find('dt').find('a').addClass('hover');
           options = $(this).find('dd');
           $(options).show().stop().animate({'opacity':1}, 300);
       },
       function(){
           $(this).find('dt').find('a').removeClass('hover');

           $(options).stop().animate({'opacity':0}, 300, function(){
              $(this).hide();
          });
       }
       );
     return this;

 }
    // アコーディオン
    $.fn.slideAccordion = function(options){

    var settings = $.extend({
        speed : 'normal',
        bar: '.bar',
        contents: '.barCont'
    }, options);

    $(settings.contents, this).hide();

    // (一部分)アコーディオンアンカー
    if (location.hash=="#lstyle") {
            var n = window.location.href.slice(window.location.href.indexOf('?') + 4);
            var p = $("#lstyle").offset().top;
            $('html,body').animate({ scrollTop: p }, 'slow');
        $("#lstyle .barCont").show();
        $("#lstyle .bar").addClass('active');
        $("#lstyle .bar").click(function(){
            // $(this).next().slideToggle();
        });
    }

    $(function(){
        $(".btnLstyle").click(function(){
        $("#lstyle .barCont").show();
        $("#lstyle .bar").addClass('active');
        });
    });


    $(settings.bar, this).each(function(){
        $(this).css({'cursor': 'pointer'})
        .click(function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(this).next().slideUp(settings.speed);
            }else{
                $(this).removeClass('hover').addClass('active');
                $(this).next().slideDown(settings.speed);
            }
        })
    });

    return this;
}



	// スムーススクロール
	$.fn.scrollToAnc = function(options){

		var settings = $.extend({
			speed : 'normal',
			easing : 'swing'
		}, options);

		this.click(function(){
			$('html, body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, settings.speed, settings.easing); return false;
		});

		return this;
	}

	// ボトムスクリーン
    $.fn.btmVisual = function(options){

        var settings = $.extend({
            target : $('#btmSlideItem')
            ,t : 5000
        }, options);

        var current = 1;
        var initN = $('li', settings.target).size();

        if(initN > 3){
            // 要素を前後に追加
            var items1 = $('li', settings.target).clone(true);
            var items2 = $('li', settings.target).clone(true);
            settings.target.prepend($(items1));
            settings.target.append($(items2));

            // 幅を設定
            var containerW = 0, itemW = 0, itemSize = 0, initX = 0;
            itemSize = $('li', settings.target).size();
            itemW = $('li', settings.target).outerWidth();
            containerW = itemW * itemSize;
            // initX = $(this).width()/2 - containerW/2 + itemW/2;
            initX = -itemW*initN;

            // 最初の位置
            $(settings.target).css({
                top: '0px',
                left: initX,
                width: containerW + 'px'
            });
            // 自動スライド用タイマー
            var loopTimer;
            var active = false;

            // ナビ
            $('#btmSlideL').show().on('click', onClickPrev);
            $('#btmSlideR').show().on('click', onClickNext);

        }
        $('a', settings.target).rollOver({alpha: 0.6});

        function start(){
            clearTimeout(loopTimer);
            loopTimer = setTimeout(onClickNext, settings.t);
        }
        function next(){

            $(settings.target).stop(true, true).animate({
                left: '-=' + itemW
            }, 500, 'easeOutCubic', function(){
                ++current;
                if(current > initN){
                    $(this).css({left: initX});
                    current = 1;
                }
                active = false;
                // start();
            });

        }
        function prev(){

            $(settings.target).stop(true, true).animate({
                left: '+=' + itemW
            }, 500, 'easeOutCubic', function(){
                --current;
                if(current < 1){
                    $(this).css({left: initX - itemW * (initN - 1)});
                    current = initN;
                }
                active = false;
                // start();
            });

        }
        function onClickNext(){
            if(!active){
                active = true;
                clearTimeout(loopTimer);
                next();
            }
        }
        function onClickPrev(){
            if(!active){
                active = true;
                clearTimeout(loopTimer);
                prev();
            }
        }
        if(initN > 3){
            // start();
        }

        return this;
    }

})(jQuery);

$(function(){

	if(_ua.ltIE6){
		$("html").addClass("ie6");
	}else if(_ua.ltIE7){
		$("html").addClass("ie7");
	}else if(_ua.ltIE8){
		$("html").addClass("ie8");
	}else if(_ua.ltIE9){
		$("html").addClass("ie9");
	}

	// ロールオーバー
	$('.onOver').rollOver({alpha: 0.6});
    $('.onOverImg').rollOverImg({hName: '_on'});

	// 店舗メニュー
	$('.shopNav dl').pullDownMenu();

	// ページトップ
	$('#pagetop a').scrollToAnc({'easing':'easeInOutQuad'});
	$(window).scroll(function () {
		
		var winTop = $(window).scrollTop();
		if(winTop >= 300) {
			$('#pagetop').show().stop().animate({'opacity':1, 'bottom':'0px'}, 300);
		}else {
			$('#pagetop').stop().animate({'opacity':0, 'bottom':'-20px'}, 300, function(){
				$(this).hide();
			});
		}

	});

    // スムーススクロール
    $('a.smooth').scrollToAnc({'easing':'easeInOutQuad'});

});
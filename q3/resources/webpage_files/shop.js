// サイドナビのアクティブ設定
function setupSideNav(label){
  $('.sideNav li').each(function(){
    if($(this).hasClass(label)){
      $(this).addClass('active');
    }
  });
}
;(function($){

  $.fn.shopVisual = function(options){

    var settings = $.extend({
      target : $('#slideItem')
      ,t : 5000
    }, options);

    var current = 1;
    var initN = $('li', settings.target).size();

    if(initN > 1){
            // 要素を前後に追加
            var items1 = $('li', settings.target).clone(true);
            var items2 = $('li', settings.target).clone(true);
            settings.target.prepend($(items1));
            settings.target.append($(items2));
            $('a', settings.target).rollOver({alpha: 0.6});
            
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

            // point
            $("#visual").append($('<div id="slidePoint" class="clearfix"><ul class="clearfix"></ul></div>'));
            $('#slidePoint').show();

            for (var i = 0; i < initN; i++) {
              var li = $('<li></li>');
              if(current == i + 1){
                li.addClass('active');
              }
              li.appendTo($('#slidePoint ul'));
            };
            $('#slidePoint ul li').on('click', function(){
              select( $(this).index() + 1 );
            });
          }

          function start(){
            clearTimeout(loopTimer);
            loopTimer = setTimeout(onClickNext, settings.t);
          }
          function next(){

            $('#slidePoint ul li').removeClass('active');
            var nextN = current + 1;
            if(nextN > initN){
              nextN = 1;
            }
            $('#slidePoint ul li').eq(nextN - 1).addClass('active');

            $(settings.target).stop(true, true).animate({
              left: '-=' + itemW
            }, 500, 'easeOutCubic', function(){
              ++current;
              if(current > initN){
                $(this).css({left: initX});
                current = 1;
              }
              active = false;
              start();
            });

          }
          function select(n){

            if(current != n && !active){

              active = true;
              clearTimeout(loopTimer);
              $('#slidePoint ul li').removeClass('active');
              $('#slidePoint ul li').eq(n - 1).addClass('active');

              var diff = current - n;
              $(settings.target).stop(true, true).animate({
                left: '+=' + itemW * diff
              }, 500, 'easeOutCubic', function(){
                current = n;
                if(current < 1){
                  $(this).css({left: initX - itemW * (initN - 1)});
                  current = initN;
                }else if(current > initN){
                  $(this).css({left: initX});
                  current = 1;
                }
                active = false;
                start();
              });

            }

          }
          function onClickNext(){
            if(!active){
              active = true;
              clearTimeout(loopTimer);
              next();
            }
          }
          if(initN > 1){
            start();
          }

          return this;
        }

    // コンテンツスクリーン
    $.fn.loadCS = function(options){

      var settings = $.extend({
        xmlURL : 'cs/main.xml'
      }, options);

      $.ajax({
        url: settings.xmlURL
        ,type: "GET"
        ,dataType: "xml"
        ,cache: false
      }).done(function(xml){

        $('#visual').prepend($('<ul id="slideItem"></ul>'));
        var main = $("#slideItem");

        var len = $(xml).find('content').length;

        $(xml).find('content').each(function(i){

          var linkURL =  $(this).find('link').text();
          // var logURL =  $(this).find('log').text();
          // var logTtl = $(this).find('title').text();
          var srcURL = $(this).find('img_sp').text();
          var linkTarget = (linkURL.substring(0, 4) == 'http')? '_blank': '_self';

          var html = '<li>';
          html += (linkURL != '')? '<a href="'+linkURL+'" target ="'+linkTarget+'">' : '';
          html += '<img src="'+srcURL+'">';
          html += (linkURL != '')? '</a>' : '';
          html += '</li>';
          main.append(html);

          if(i == len -1){
            $('#visual').shopVisual();
          }

        });

      }).fail(function(){

      });

      return this;
    }

    // 館ニュース
    /*
    ** 館ID => 大宮:1,北千住:2,池袋:3,有楽町:16,新宿:4,ルミネエスト:5,立川:6,横浜:7,町田:8,荻窪:9,藤沢:10,川越:11,ルミネマン渋谷:12,品川:13,大船ルミネウィング:15
    */
    $.fn.loadYakataNews = function(options){

      var settings = $.extend({
        xmlURL : '/xml/cms_yakata.xml'
        ,yakataID : '1'
      }, options);

      var self = $(this);

      $.ajax({
        url: settings.xmlURL
        ,type: "GET"
        ,dataType: "xml"
        ,cache: false
      }).done(function(xml){

        var topics = $(xml).find('yakata_topics');
        var main = $('.topicsBody', self);
        var readMore = $('<div class="readMoreLink"><a href="topics/" class="transition">READ MORE</a></div>');
        var domain = '';
       if(document.domain != 'www.lumine.ne.jp'){
         domain = 'http://www.lumine.ne.jp';
       }

            // 3件まで
            var count = 0;
            var total = 3;
            $(topics).each(function(i){

              var yakata_id = $(this).find('yakata_id').text();

              if(settings.yakataID == yakata_id){

                $('#yakata').show();

                if(count < total){

                  var pcUrl = $(this).find('pc_url').text();

						      //PCリンクURL入力があったら
                  if(pcUrl.match(/^http:\/\/([\/a-z\.]+)/gim)){

                   var linkURL = pcUrl
                   var linkTarget = '_blank'

                 }else{

                   var linkURL = 'topics/topics_details.php?article_no=' + $(this).find('id').text();
                   var linkTarget = '_self'

                 }

                 var srcURL = ($(this).find('yakata_img').text() != '')? domain + '/pict/' + $(this).find('yakata_img').text() : domain + '/common/img/noimage.gif';
                 var date = $(this).find('opentime').text();
                 var title = $(this).find('title').text();
                 var new_icon = $(this).find('new_icon').text();

                 var dateObj = new Date(date);
                 var mm = dateObj.getMonth() + 1;
                 var dateTxt = dateObj.getFullYear() + '.' + mm + '.' + dateObj.getDate();
                 var html = '<a href="'+linkURL+'" target ="'+linkTarget+'" class="topics transition clearfix'+((count==0)?' fc':'')+'"><div class="topicsImg"><img src="'+srcURL+'" alt=""></div><div class="topicsInfo"><div class="topicsLabel"><span class="date">'+dateTxt+'</span>';

                 if(new_icon == '1'){
                  html += '<span class="newIcon"><img src="/common/img/new_icon.jpg" alt="NEW"></span>';
                }

                html +=  '</div>'+title+'</div></a>';

                var tmp = $(html);
                main.append(tmp);

              }else if(count == total){
                main.append(readMore);
              }
              count++;
            }

          });

          }).fail(function(){

          });

          return this;
        }
        $.fn.loadYakataList = function(options){

          var settings = $.extend({
            xmlURL : '/xml/cms_yakata.xml'
            ,yakataID : '1'
          }, options);

          var self = $(this);

          $.ajax({
            url: settings.xmlURL
            ,type: "GET"
            ,dataType: "xml"
            ,cache: false
          }).done(function(xml){

            var topics = $(xml).find('yakata_topics');
            var main = $(self);
            var domain = '';
           if(document.domain != 'www.lumine.ne.jp'){
             domain = 'http://www.lumine.ne.jp';
           }

           var count = 0;

           $(topics).each(function(i){

            var yakata_id = $(this).find('yakata_id').text();

            if(settings.yakataID == yakata_id){

              var linkURL = 'topics_details.php?article_no=' + $(this).find('id').text();
              var srcURL = ($(this).find('yakata_img').text() != '')? domain + '/pict/' + $(this).find('yakata_img').text() : domain + '/common/img/noimage.gif';
              var date = $(this).find('opentime').text();
              var title = $(this).find('title').text();
              var new_icon = $(this).find('new_icon').text();

              var dateObj = new Date(date);
              var mm = dateObj.getMonth() + 1;
              var dateTxt = dateObj.getFullYear() + '.' + mm + '.' + dateObj.getDate();

              var html = '<a href="'+linkURL+'" class="topics transition clearfix'+((count==0)?' fc':'')+'"><div class="topicsImg"><img src="'+srcURL+'" alt=""></div><div class="topicsInfo"><div class="topicsLabel"><span class="date">'+dateTxt+'</span>';

              if(new_icon == '1'){
                html += '<span class="newIcon"><img src="/common/img/new_icon.jpg" alt="NEW"></span>';
              }

              html += '</div>'+title+'</div></a>';
              var tmp = $(html);
              main.append(tmp);
              count++;
            }

          });

         }).fail(function(){

         });

         return this;
       }

    // ショップニュース
    $.fn.loadShopNews = function(options){

      var settings = $.extend({
        xmlURL : '/xml/cms_shop.xml'
        ,yakataID : '1'
      }, options);

      var self = $(this);

      $.ajax({
        url: settings.xmlURL
        ,type: "GET"
        ,dataType: "xml"
        ,cache: false
      }).done(function(xml){

        var topics = $(xml).find('shopinfo');
        var main = $('.topicsBody', self);
        var readMore = $('<div class="readMoreLink"><a href="news/" class="transition">READ MORE</a></div>');
        var domain = '';
       if(document.domain != 'www.lumine.ne.jp'){
         domain = 'http://www.lumine.ne.jp';
       }

       // 3件まで
       var count = 0;
       var total = 3;
       $(topics).each(function(i){

        var yakata_id = $(this).find('yakata_id').text();

        if(settings.yakataID == yakata_id){

          $('#shop').show();

          if(count < total){
            var linkURL = 'news/news_details.php?id=' + $(this).find('id').text();
            var srcURL = ($(this).find('shop_info').find('image').text() != '')? domain + '/pict/' + $(this).find('shop_info').find('image').text() : domain + '/common/img/noimage.gif';
            var date = $(this).find('print_date').text();
            var title = $(this).find('title').eq(0).text();
            //var title = $(this).find('shop_info').find('title').text();
            var new_icon = $(this).find('new_icon').text();

            var dateObj = new Date(date);
            var mm = dateObj.getMonth() + 1;
            var dateTxt = dateObj.getFullYear() + '.' + mm + '.' + dateObj.getDate();

            var html = '<a href="'+linkURL+'" class="topics transition clearfix'+((count==0)?' fc':'')+'"><div class="topicsImg"><img src="'+srcURL+'" alt=""></div><div class="topicsInfo"><div class="topicsLabel"><span class="date">'+dateTxt+'</span>';

            if(new_icon == '1'){
              html += '<span class="newIcon"><img src="/common/img/new_icon.jpg" alt="NEW"></span>';
            }

            html += '</div>'+title+'</div></a>';

            var tmp = $(html);
            main.append(tmp);

          }else if(count == total){
            main.append(readMore);
          }
          count++;
        }

      });


     }).fail(function(){

     });

     return this;
   }
   $.fn.loadShopList = function(options){

    var settings = $.extend({
      xmlURL : '/xml/cms_shop.xml'
      ,yakataID : '1'
    }, options);

    var self = $(this);

    $.ajax({
      url: settings.xmlURL
      ,type: "GET"
      ,dataType: "xml"
      ,cache: false
    }).done(function(xml){

      var topics = $(xml).find('shopinfo');
      var main = $(self);
      var domain = '';
     if(document.domain != 'www.lumine.ne.jp'){
       domain = 'http://www.lumine.ne.jp';
     }

     var count = 0;

     $(topics).each(function(i){

      var yakata_id = $(this).find('yakata_id').text();

      if(settings.yakataID == yakata_id){

        var linkURL = 'news_details.php?id=' + $(this).find('id').text();
        var srcURL = ($(this).find('shop_info').find('image').text() != '')? domain + '/pict/' + $(this).find('shop_info').find('image').text() : domain + '/common/img/noimage.gif';
        var date = $(this).find('print_date').text();
        var title = $(this).find('title').eq(0).text();
        // var title = $(this).find('title').text();
        //var title = $(this).find('topic').find('title').text();
        //var title = $(this).find('shop_info').find('title').text();
        var new_icon = $(this).find('new_icon').text();

        var dateObj = new Date(date);
        var mm = dateObj.getMonth() + 1;
        var dateTxt = dateObj.getFullYear() + '.' + mm + '.' + dateObj.getDate();
        var html = '<a href="'+linkURL+'" class="topics transition clearfix'+((count==0)?' fc':'')+'"><div class="topicsImg"><img src="'+srcURL+'" alt=""></div><div class="topicsInfo"><div class="topicsLabel"><span class="date">'+dateTxt+'</span>';

        if(new_icon == '1'){
          html += '<span class="newIcon"><img src="/common/img/new_icon.jpg" alt="NEW"></span>';
        }

        html += '</div>'+title+'</div></a>';

        var tmp = $(html);
        main.append(tmp);

        count++;

      }

    });


   }).fail(function(){

   });

   return this;
 }

    // ショップニュース詳細　ギャラリー
    $.fn.shopNewsImg = function(){

      var list = $('.mainImg li', this).clone();
      $('.thumb', this).append(list);
      var initNo = 0;
      var current = initNo;

      var main = $(".mainImg li", this);
      var thumb = $(".thumb li", this);

        // main
        main.each(function(){

          var img = $('img', this);
          img.on('load',function(){
            var w = $(this).width();
            if(w < 580){
              img.css('margin-left', ( 580 - w ) / 2 + 'px');
            }
          });

        });
        addNo = function(n){

          if(current != n){
                // reset
                thumb.removeClass('active');
                main.hide();

                // set index
                thumb.eq(n).addClass('active');
                main.eq(n).stop().fadeIn("fast");

                current = n;
              }

            }

        // thumb
        thumb.each( function(i){

          var img = $('img', this);
          img.on('load',function(){
            var w = $(this).width();
            if(w < 130){
              img.css('margin-left', ( 130 - w ) / 2 + 'px');
            }
          });

          $(this)
          .click(function(){
            addNo(thumb.index(this));
          });

          if(i == initNo){
            thumb.eq(i).addClass('active');
            main.eq(i).stop().fadeIn("fast");
          }

        });

        return this;
      }

    })(jQuery);


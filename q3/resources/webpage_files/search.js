var searchObj = {

    /*
    ** mansionID => ルミネ全館:00,大宮店:99,北千住店:03,池袋店:15,有楽町店:97,新宿店:98,ルミネエスト新宿店:13,立川店:06,横浜店:07,町田店:08,荻窪店:09,藤沢店:10,川越店:11,ルミネマン渋谷店:14,大船ルミネウィング:16
    */

	mansionID : '00'
	,shopList : ['','omiya','kitasenju','ikebukuro','yurakucho','shinjuku','est','tachikawa','yokohama','machida','ogikubo','fujisawa','kawagoe','luminewing']
	,cat : [
		{
			'0':'00001', '1':'00002', '2':'00003', '3':'00006', '4':'00007', '5':'00008', '6':'00009', '7':'00010', '8':'00011', '9':'00012', '10':'00018', '11':'00004', '12':'00005', '13':'00030', '14':'00031', 
			'15':'00059', '16':'00060', '17':'00013', '18':'00014', '19':'00015', '20':'00016', '21':'00017', '22':'00037', '23':'00038', '24':'00039', '25':'00040', '26':'00041', '27':'00042', '28':'00043',
			'29':'00044', '30':'00045', '31':'00046', '32':'00047', '33':'00048', '34':'00049', '35':'00050', '36':'00051', '37':'00052', '38':'00053', '39':'00054', '40':'00055', '41':'00056', '42':'00058',
			'43':'00057', '44':'00035', '45':'00036', '46':'00021', '47':'00019', '48':'00020', '49':'00032', '50':'00033', '51':'00022', '52':'00023', '53':'00024', '54':'00025', '55':'00026', '56':'00027', '57':'00028', '58':'00029',
			'61':'00061', '62':'00062', '63':'00063', '64':'00064', '65':'00065', '66':'00066', '67':'00067', '68':'00068', '69':'00069', '70':'00070', '71':'00034'
		},
		{'0':'00001', '1':'00002', '2':'00003', '3':'00006', '4':'00007', '5':'00008', '6':'00009', '7':'00010', '8':'00011', '9':'00012'},
		{'17':'00013', '18':'00014', '19':'00015', '20':'00016', '21':'00017'},
		{'46':'00021'},
		{'10':'00018'},
		{'11':'00004', '12':'00005'},
		{'13':'00030', '14':'00031'},
		{'15':'00059', '16':'00060'},
		{'22':'00037', '23':'00038', '24':'00039', '25':'00040', '26':'00041', '27':'00042', '28':'00043'},
		{'29':'00044', '30':'00045', '31':'00046', '32':'00047', '33':'00048', '34':'00049', '35':'00050', '36':'00051', '37':'00052', '38':'00053', '39':'00054', '40':'00055', '41':'00056', '42':'00058'},
		{'43':'00057'},
		{'44':'00035', '45':'00036'},
		{'47':'00019', '48':'00020'},
		{'49':'00032', '50':'00033'},
		{'51':'00022', '52':'00023', '53':'00024', '54':'00025', '55':'00026', '56':'00027', '57':'00028', '58':'00029'},
		{'61':'00061', '62':'00062', '63':'00063', '64':'00064', '65':'00065', '66':'00066', '67':'00067', '68':'00068', '69':'00069', '70':'00070', '71':'00034'}
	]

	,setMansionID : function(id){
		$('select[name="mansion_id"]').val(id);
		searchObj.checkMansionID();
	}
	,checkMansionID : function(){
		var id = $('select[name="mansion_id"]').val();
		searchObj.mansionID = id;

		if(id == '00'){
			$('#searchFloorLink').addClass('unable');
		}else{
			$('#searchFloorLink').removeClass('unable');
		}
	}
	,clickSearchDetail : function(){
		var link = $('#searchDetailLink').attr('href');
		location.href = link + '?mansion_id=' + searchObj.mansionID;
		return false;
	}
	,clickSearchWord : function(){
		var t = $('#searchWord').val();
		var link = '/gloabal_search/search/search_result.php?mode=c' + '&mansion_id=' + searchObj.mansionID;
		if(t != ''){
			if(!_ua.ltIE9){
				location.href = link + '&shop_name=' + t;
			}else{
				if(t != 'ショップ名を入力'){
					location.href = link + '&shop_name=' + t;
				}
			}
		}
		return false;
	}
	,clickSearchIndex : function(){
		var link = $('#searchIndexLink').attr('href');
		location.href = link + '?mansion_id=' + searchObj.mansionID + '#index_search';
		return false;
	}
	,clickSearchCat : function(){
		var catNum = $('select[name="cat_type"]').val();
		var link = '/gloabal_search/search/search_result.php?mode=b&mansion_id=' + searchObj.mansionID + '&cat_type='+ catNum;
		var linkOption = '';
		for(var i in searchObj.cat[catNum]){
			linkOption += '&search['+ i +']=' + searchObj.cat[catNum][i];
		}
		location.href = link + linkOption;

		return false;
	}
	,clickSearchFloor : function(){
		if(searchObj.mansionID != '00'){
			var n = $('select[name="mansion_id"]').prop("selectedIndex");
			var link = '/' + searchObj.shopList[n] + '/map/';
			location.href = link;
		}
		return false;
	}

}

$(function(){

	// 館選択時
	$('select[name="mansion_id"]').on('change', searchObj.checkMansionID);
	searchObj.checkMansionID();

	// 詳細検索
	$('#searchDetailLink').on('click', searchObj.clickSearchDetail);

	// フリーワードで探す
	$('#searchWordLink').on('click', searchObj.clickSearchWord);
	$('#searchWord').on('keypress', function(e){
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {

			searchObj.clickSearchWord();
			return false;
			
		}
	});

	// 50音順から選択
	$('#searchIndexLink').on('click', searchObj.clickSearchIndex);

	// カテゴリーで探す
	$('#searchCatLink').on('click', searchObj.clickSearchCat);

	// フロアから探す
	$('#searchFloorLink').on('click', searchObj.clickSearchFloor);

	// プレースホルダー
	if(_ua.ltIE9) {

		var searchBox = $('#searchWord');
		var txt = searchBox.attr('placeholder');
		searchBox.val(txt).css('color', '#999');

		searchBox
		.focus(function() {
			if($(this).val() == txt) {
				$(this).val('');
				$(this).css('color', '#000');
			}
		}).blur(function() {
			if($(this).val() == '') {
				$(this).val(txt).css('color', '#999');
			}
		});
	}
	
});
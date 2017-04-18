
(function(){	

	var reg = /\?api=([^#&]+)/;
	
	var id = location.href.match(reg)[1].split('-');
	
	var s = '';
	
	var data = ApiData[id[0]]; 
	
	//左侧菜单
	for(var i = 0 ; i < data.items.length; i ++){		
		s += '<li><a href="/doc/apiList.html?api='+[id[0],i].join('-')+'">' + data.items[i].name + '</a></li>';	
	}
	
	$('.api-list-menu').html(s);
	
	var data2 = data.items[id[1]];
	
	$('.api-list-title').html(data.name + ' / ' + data2.name);
	
	var s = '<table class="doc-table"><tr><th>api</th><th>api说明</th><tr>';
	var path = '/doc/data/api/'
	for(var i = 0 ; i < data2.api.length; i ++){
		var d = data2.api[i];
		var apiFile = path + d.file + '.html';
		s += '<tr><td><a target="_blank" href="/doc/apiDetail.html?file='+apiFile+'">' + d.name + '</a></td><td>'+d.intro+'</td></tr>';	
	}
	s+='</table>';
	
	$('#content').append(s);
	
	$('.api-list-menu a').eq(id[1]).addClass('active');
	
})();







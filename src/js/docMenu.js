(function leftMenuHandle(){
		var leftMenuData = require('src/js/docData');;
		var linkUrl = '/doc/index.html?docid=';
		
		var e = $('<div class="doc-left-menu"></div>').appendTo($('.doc-left'));	
		var s = '';
		for(var i = 0 ; i < leftMenuData.length; i ++){				
			
			if(leftMenuData[i].items){//有二级
				var menuClick = 'menu_' + [i].join('');
				s += '<div class="doc-lm-menu1 doc-lm-havechild" menuClick="'+menuClick+'">'+leftMenuData[i].name + '<span class="menu-icon">&gt;</span></div>';
				s += '<div class="doc-menu-hide" id="'+menuClick+'">'						
				for(var m = 0 ; m < leftMenuData[i].items.length; m ++){					
					if(leftMenuData[i].items[m].items){ //有三级	
						var menu2 = leftMenuData[i].items[m];
						if(menu2.items){
							var menuClick = 'menu_' + [i,m].join('');
							s += '<div class="doc-lm-menu2 doc-lm-havechild" menuClick="'+menuClick+'">'+menu2.name + '<span class="menu-icon">&gt;</span></div>';
							s += '<div class="doc-menu-hide" id="'+menuClick+'">'						
							for(var n = 0 ; n < menu2.items.length; n ++){
								//三级
								var menu3 = menu2.items[n];									
								s += '<a class="doc-lm-menu3" href="' + linkUrl + menu3.file +'&m='+[i,m,n].join('-')+'">'+menu3.name + '</a>';								
							}
							s += '</div>';
						}
					}else{						
						s += '<div class="doc-lm-menu2"><a href="' + linkUrl + leftMenuData[i].items[m].file+'&m='+ [i,m].join('-')+'">'+leftMenuData[i].items[m].name + '</a></div>';							
					}
				}
				s += '</div>';
			}else{
				s += '<div class="doc-lm-menu1"><a href="' + linkUrl +leftMenuData[i].file +'&m='+[i].join('-')+'">'+leftMenuData[i].name + '</a></div>';		
				
			}
		};	
		
		e.html(s);
		
		e.find('[menuClick]').each(function(i,ele){	
			$(ele).on('click',function(){
				var id = ($(this).attr('menuClick'));
				if($('#'+id).css('display') === 'none'){
					$('#'+id).css('display','block');	
				}else{
					$('#'+id).css('display','none');	
				}
			})
		
		});
		
		
		//菜单选中
		var reg = /\&m=([^#&]+)/;
		if(location.href.match(reg)){
			var key = location.href.match(reg)[1].split('-');
		
			e.find('[menuClick="menu_'+key[0]+'"]').click();
			
			if(key[1]){
				e.find('[menuClick="menu_'+key[0]+key[1]+'"]').click();
			}
			if(key[2]){		
				$('#menu_'+key[0]+key[1]).children().eq(key[2]).addClass('doc-lm-active')
			}	
		};
		
		
		$(document).on('scroll',function(){
			if($(document).scrollTop() > 60){
				$('.doc-left-menu').css('position','fixed')
				$('.doc-left-menu').css('top','0')
				
			}else{				
				$('.doc-left-menu').css('position','')
			}
			
		})
		
	})()
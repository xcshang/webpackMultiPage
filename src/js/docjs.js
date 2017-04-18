


function versionTime(){
	return '?v=' + new Date().getTime();	
};

function writeDoc(o){
	this.box = $('#content');
	var reg = /\?docid=([^#&]+)/;	
	if(!location.href.match(reg)){return}
	var url = location.href.match(reg)[1];	
	
	url = '/data/doc/' + url + '.html';
	
	
	
	//return;
	this.url = url;
	this.init();
};

writeDoc.prototype = {
		
	init : function(){
		this.getData();	
		this.menuHandle();		
		this.formatHandle();	
	},
	
	getData : function(){
		var that = this;
		$.ajax({				
			url: that.url + versionTime(),
			type:"get",			
			timeout:1000,	
			async:false,
			error:function(){},					
			success:function(msg){
				$('#loading').hide();		
				try{	
					that.box.html(msg);	
						
				}catch(e){						
								
				};					
			}
		});	
	},
	
	menuHandle : function(){		
		var e = $('<div class="doc-menu"></div>').appendTo($('.quick-menu'));
		var s = '<div class="doc-menu-nei">';
		$('.doc-title').each(function(i,ele){
				$(ele).attr('id','docItem-'+i);
				s += '<a href="#docItem-'+i+'">' + $(ele).html() + '</a>';			
			}
		);
		s += '</div>'	
		e.html(s);	
			
		$(document).on('scroll',function(){
			if($(document).scrollTop() > 300){
				$('.doc-menu').css('position','fixed')
				$('.doc-menu').css('top','0')
				
			}else{				
				$('.doc-menu').css('position','')
				$('.doc-menu').css('top','250px')
			}
			
		})
		
	},
	
	menuHandleProduct : function(){		
		var e = $('<div class="doc-menu"></div>').appendTo($('.doc-banner'));
		var s = '<div class="doc-menu-nei">';
		$('.doc-title').each(function(i,ele){
				$(ele).attr('id','docItem-'+i);
				s += '<a href="#docItem-'+i+'">' + $(ele).html() + '</a>';			
			}
		);
		s += '</div>'	
		e.html(s);	
			
		$(document).on('scroll',function(){
			if($(document).scrollTop() > 300){
				$('.doc-menu').css('position','fixed')
				$('.doc-menu').css('top','0')
				
			}else{				
				$('.doc-menu').css('position','')
				$('.doc-menu').css('top','250px')
			}
			
		})
		
	},

	formatHandle : function(){
		var that = this;
		$('.doc-tab').each(function(i,e){			
			that.tabHandle(e);			
		});
	},
	
	tabHandle : function(e){
		var contents = $(e).find('[tab-title]');
		
		var menus = $('<ul class="doc-tab-menu"></ul>').insertBefore(contents.eq(0));
		var s = '';
		contents.each(function(i,e){
			s += '<li>' + $(e).attr('tab-title') + '</li>';			
		});
		
		menus.html(s);
		
		var menus = menus.find('li');
		menus.eq(0).attr('class','active');
		contents.eq(0).show();
		
		menus.each(function(i,ele){
			ele.onclick = function(){
				$(e).find('[tab-title]').hide();
				menus.attr('class','');
				contents.eq(i).show();
				menus.eq(i).attr('class','active');
			}		
		});
		
	}	
		
};

module.exports = writeDoc;
/**
 * 左侧导航条相关js类
 * 
 * @author 庄召
 */
var Index_NavPage = new function() {

	var currSelNavEleByRilghtClick =null;
	
	//移动导航元素使用
	var nvaPageEleMove = false;
	var nvaPageEleMoveStart = false;
	var startNavPageEle=null;
	
	
	//基础函数----start
	
	// 获取所有导航元素，范放在这儿是防止查询条件变化
	function getAllNavPageEle(){
		return $('#leftMainDiv').children();
	}
	
	
	//基础函数----end
	
	//导航元素的右击菜单
	function showRMenu_NavPageBody (event) {
		
		event.stopPropagation();
		var menu = document.getElementById('navEleRmenu');
		try {			

			var rightedge = event.clientX;
			var bottomedge = event.clientY;
			menu.style.left = rightedge + "px";
			menu.style.top = bottomedge + "px";

			$('#navEleRmenu').css('visibility','visible');
		} catch (e) {
			alert(e);
		}

	}
	
	//隐藏所有右击弹出菜单
	function hideAllRMenu(){
		try {
			$('#menu').css('visibility','hidden');
			$('#navEleRmenu').css('visibility','hidden');
		} catch (e) {
			alert(e);
		}
		
		
	}
	
	//导航元素初始函数
	function initNavPageEle(uuid){
		var templateNavPage = $('#'+uuid);
		templateNavPage.bind('contextmenu',Index_NavPage.navPageRClick);
		templateNavPage.bind('click',Index_NavPage.navPageEleClick);
		templateNavPage.bind('mousedown',Index_NavPage.navPageElemousedown);
		
		templateNavPage.bind('mouseup',Index_NavPage.navPageElemouseup);
		
		
	    $('#leftMainDiv').bind("mousemove",Index_NavPage.navPageElemousemove);
		$('#leftMainDiv').bind("mouseup",Index_NavPage.leftMainDivmouseUp);
		
		templateNavPage.children().bind('click',Index_NavPage.navPageEleChildClick);
		templateNavPage.children().bind('contextmenu',Index_NavPage.navPageChildRClick);
		
		setCuurSel(templateNavPage);
	}
	

	//兄弟姐妹节点设置为未选中
	function  siblingsSetNoSel(currNavPageEle){
		//其它控件设置为未选中
		$(currNavPageEle).siblings().removeClass();
		$(currNavPageEle).siblings().addClass('navPage');
		
	}
	
	//设置当前选中
	function  setCuurSel(currNavPageEle){
		
			siblingsSetNoSel(currNavPageEle);
			//本空间添加选中
			if($(currNavPageEle).attr('className')!='navPageSel'){
				$(currNavPageEle).removeClass();
				$(currNavPageEle).addClass('navPageSel');
			}
		
	}
	

	 //所有页面导航元素设置为未选中
	function  setAllNavPageEleNoSel(){
		
		//其它控件设置为未选中
		$('#leftMainDiv').children().removeClass();
		$('#leftMainDiv').children().addClass('navPage');
		
	}
	
	function  createNavPageEleSeq(){
	       return  getAllNavPageEle().length+1;
	}
	
	function setNavPageEleSeqByDel(currSeq){
	       getAllNavPageEle().each(function() {
					var tempSeq = $(this).attr("seq");
					
					if(tempSeq>currSeq){
						$(this).attr("seq",tempSeq-1);
						$(this).children(".navPageLeft").html(tempSeq-1);
					}
				});
	}
	
	// 根据实际的物理顺序重新编码顺序号
	function  refreshNavPageEleSeqByWL(){
		
		  var seq =1;
		  getAllNavPageEle().each(function() {
		  		$(this).attr("seq",seq);
				$(this).children(".navPageLeft").html(seq);
				seq =seq+1;
		  });
		
	}
	
	
	function setNavPageEleMoveFalse(){
		nvaPageEleMove = false;
		nvaPageEleMoveStart =false;
		startNavPageEle = null;
		$('#leftMainDiv').css("cursor","");
	}
	return {

		//左边的右键菜单
		showLeftRMenu : function() {
			
			setAllNavPageEleNoSel();
			
			Index_NavPage.hideNavEleRmenu();
			var menu = document.getElementById('menu');
			try {

				var evt = window.event || arguments[0];
				evt.stopPropagation();

				var rightedge = evt.clientX;
				var bottomedge = evt.clientY;
				menu.style.left = rightedge + "px";
				menu.style.top = bottomedge + "px";

				$('#menu').css('visibility','visible');
			} catch (e) {
				alert(e);
			}

		},
		hideLeftRMenu : function() {
			$('#menu').css('visibility','hidden');

		},
		hideNavEleRmenu : function() {
			$('#navEleRmenu').css('visibility','hidden');

		},
		hideAllRMenu : function() {
			hideAllRMenu();

		},
		
		// 导航元素右击
		navPageRClick:function(){
			Index_NavPage.hideLeftRMenu();
			
			var e = window.event || arguments[0];
			e.stopPropagation();
			
			var currNavPageEle = e.srcElement ? e.srcElement : e.target;
		    setCuurSel(currNavPageEle);
			
		    currSelNavEleByRilghtClick = currNavPageEle; 
		    
			showRMenu_NavPageBody(e);
		   
		
		},
			// 导航元素右击
		navPageChildRClick:function(){
			Index_NavPage.hideLeftRMenu();
			
			var e = window.event || arguments[0];
			e.stopPropagation();
			
			var currNavPageEle = e.srcElement ? e.srcElement : e.target;
			currNavPageEle = $(currNavPageEle).parent();
			
			//设置当前右键选中的元素
			currSelNavEleByRilghtClick = currNavPageEle;
		
		    setCuurSel(currNavPageEle);
			showRMenu_NavPageBody(e);
		
		},
		// 创建左边的导航页
		createNavPage:function(){
			hideAllRMenu();
			
			var uuid = Fhcp.uuid();
		    var seq = createNavPageEleSeq();
			
			//导航页的模板
			/*var templateNavPage = $('<div id ="'+uuid+'" seq ="'+seq+'" class="navPage"">' +
					'<div class="navPageLeft">'+seq+'</div>' +
					'<div class="navPageContent">'+uuid+'</div>' +
					'</div>');*/
					
		    //腾讯框架模板引擎技术
		    var data = {
              uuid: uuid,
              seq:seq
            };
            var html = template('tp_navPageEle', data);
            var templateNavPage =$(html);
   
			$('#leftMainDiv').append(templateNavPage); 
			setTimeout(  function(){initNavPageEle(uuid);}, 100);//延迟回调
		},
		
		delNavPageByRightClick:function(){

			hideAllRMenu();
				
			if(currSelNavEleByRilghtClick!=null){
				 var currSeq =  $(currSelNavEleByRilghtClick).attr('seq');
				 $(currSelNavEleByRilghtClick).remove();
				 
				 //重新编码顺序号
				 setNavPageEleSeqByDel(currSeq);
			}
		},
		
		leftMainDivClick:function(){
			hideAllRMenu();
			setAllNavPageEleNoSel();
		},
		
		navPageEleClick:function(){
		    Index_NavPage.hideNavEleRmenu();
				
			var e = window.event || arguments[0];
			e.stopPropagation();
			var currNavPageEle = e.srcElement ? e.srcElement : e.target;
			
			setCuurSel(currNavPageEle);

		},
	    navPageEleChildClick:function(){
		    Index_NavPage.hideNavEleRmenu();
				
			var e = window.event || arguments[0];
			e.stopPropagation();
			var currNavPageEle = e.srcElement ? e.srcElement : e.target;
			
			setCuurSel($(currNavPageEle).parent());

		},
		navPageElemousedown:function(){
			nvaPageEleMove = true;
			startNavPageEle =this;
		},
		
		navPageElemouseup:function(){
			
			var e = window.event || arguments[0];
			e.stopPropagation();	
			
			//满足移动条件
			if(startNavPageEle!=null && nvaPageEleMoveStart){
				//判断移动的位置和当前是否是一个
				if($(this).attr('id') != $(startNavPageEle).attr('id')){
					var seq = $(this).attr('seq');
					var startSeq =  $(startNavPageEle).attr('seq');
					if(seq > startSeq){
						 $(startNavPageEle).insertAfter($(this));
					}
				    if(seq < startSeq){
						 $(startNavPageEle).insertBefore($(this));
					}
				   refreshNavPageEleSeqByWL();
				}
			}
			setNavPageEleMoveFalse();
		},
		navPageElemousemove:function(){
			if(nvaPageEleMove==true && nvaPageEleMoveStart==false){
				nvaPageEleMoveStart =true;
				return;
			}
			if(nvaPageEleMoveStart==true){
				
				$('#leftMainDiv').css("cursor","move");
			}
		},
		
		leftMainDivmouseUp:function(){
			
			//满足移动条件
			if(startNavPageEle!=null){
				   $('#leftMainDiv').append($(startNavPageEle));
				    refreshNavPageEleSeqByWL();
			}
			
			setNavPageEleMoveFalse();
		}
		
		
		
		
	};
}();

//初始化
$(function() {
      $('#leftDiv').bind('contextmenu',Index_NavPage.showLeftRMenu);
      $('#leftMainDiv').bind('click',Index_NavPage.leftMainDivClick);
      $('#leftDiv').bind('click',Index_NavPage.leftMainDivClick);
      
  /* var data = {
       uuid: '1300'
   };
   var html = template('test', data);
   document.getElementById('centerDiv').innerHTML = html;*/
  });

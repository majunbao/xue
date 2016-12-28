var Index = new function() {

	   //公共变量
	
	 //創建輔助窗體，移動或改變大小的時候
	function createMoveShape() {
		if(Index.helpShapeEle==null){
			var helpShapeEle = $('<div  class="fhShapeMove""></div>');
		    $('#centerDiv').append(helpShapeEle);
		}
		Index.helpShapeEle = helpShapeEle;
		Index.helpShapeEle.css('z-index',1000);
		Index.helpShapeEle.hide();
	}

	   
	 // 主操作区移动事件
	 function mainAreaMouseMove(e){
        e.stopPropagation();
		//触发了移动改变窗体大小过程事件
		if(Index.isMoveChangeSizeIng==true && Index.helpShapeEle!=null){
		
			var x =  Index.pointAdjustX(e.pageX);
			var y =  Index.pointAdjustY(e.pageY);
	
			//this.movChangeSizeShape.html(this.movChangeSizeShape.html()+":"+y);
			
		    var eleId = Index.movChangeSizeCurrHelpId;	
		    try {
		    
		    	var width = Index.currShape.rootEle.width();
		    	var height = Index.currShape.rootEle.height();
				// 头部
				if (eleId == "helpTopCenterEle" || eleId == "helpTopLeftEle" ||eleId == "helpTopRightEle") {
					Index.helpShapeEle.css('top', y+"px");
					Index.helpShapeEle.height(height+ (Index.movChangeSizeSy - y));
				}
				if (eleId == "helpTopLeftEle") {
					Index.helpShapeEle.css('top', y+"px");
					Index.helpShapeEle.height(height+ (Index.movChangeSizeSy - y));
					
					Index.helpShapeEle.css('left', x+"px");
					Index.helpShapeEle.width(width+ (Index.movChangeSizeSx - x));
				}
				if (eleId == "helpTopRightEle") {
					Index.helpShapeEle.css('top', y+"px");
					Index.helpShapeEle.height(height+ (Index.movChangeSizeSy - y));
					Index.helpShapeEle.width(width+ (x-Index.movChangeSizeSx));
				}
				
				//底部
				if (eleId == "helpBottomLeftEle" ) {
					Index.helpShapeEle.height(height+ (y-Index.movChangeSizeSy));
					Index.helpShapeEle.css('left', x+"px");
					Index.helpShapeEle.width(width+ (Index.movChangeSizeSx - x));
				}
				if (eleId == "helpBottomCenterEle" ) {
					Index.helpShapeEle.height(height+ (y-Index.movChangeSizeSy));
				}
				if (eleId == "helpBottomRightEle" ) {
					Index.helpShapeEle.height(height+ (y-Index.movChangeSizeSy));
					Index.helpShapeEle.width(width+ (x-Index.movChangeSizeSx));
				}
				
				//中间
				if (eleId == "helpLeftEle" ) {
					Index.helpShapeEle.css('left', x+"px");
					Index.helpShapeEle.width(width+ (Index.movChangeSizeSx - x));
				}
				if (eleId == "helpRightEle" ) {
					
					Index.helpShapeEle.width(width+ (x-Index.movChangeSizeSx));
				}

			} catch (e) {
                alert("mainAreaMouseMove:"+e);
			}
		}
		try {
			// 移動位置
			if (Index.isMove) {
				// var e = window.event || arguments[0];
				var move_mouse_ex = e.pageX - Index.moveDiffX;
				var move_mouse_ey = e.pageY - Index.moveDiffY;

				Index.helpShapeEle.css('left', move_mouse_ex + "px");
				Index.helpShapeEle.css('top',  move_mouse_ey + "px");

			}
		} catch (e) {
			alert("移動改變位置:" + e);
		}
	}
	 // 主操作区弹起动事件
	function mainAreaMouseUp(e){
	    e.stopPropagation();
		shapeUpExc();

	}
	// 主操作区图形相关的弹起事件下的处理
	function shapeUpExc(){
		try {
			// 触发了移动改变窗体大小过程事件
			if (Index.isMoveChangeSizeIng) {
				Index.currShape.rootEle.css('top', Index.helpShapeEle
								.css('top'));

				Index.currShape.rootEle.css('left', Index.helpShapeEle
								.css('left'));
				Index.currShape.rootEle.height(Index.helpShapeEle
						.height());
				Index.currShape.rootEle.width(Index.helpShapeEle
						.width());

		

			}
			// 移動改變位置
			if (Index.isMove) {

				if (Index.helpShapeEle != null) {
					Index.currShape.rootEle.css('left', Index.helpShapeEle
									.css('left'));
					Index.currShape.rootEle.css('top', Index.helpShapeEle
									.css('top'));
					
				}

			}

		    Index.helpShapeEle.hide();
		    
		
			Index.redoState();
			Index.currShape.refreshStyle();
			Index.currShape.drawSHape();
		
		} catch (e) {
			alert("shapeExc异常:" + e);
		}
	}
	return {
		
		 currShape:null,//当前图形对象
		 
		 helpShapeEle :null,
		 //移动改变大小----------start
         isMoveChangeSize:false,//移动改变窗体大小,准备阶段
		 isMoveChangeSizeIng:false,//移动改变窗体大小，可以移动
		 movChangeSizeSx:null,//移动改变大小的时候，开始的x
		 movChangeSizeSy:null,//移动改变大小的时候，开始的y
		 movChangeSizeCurrHelpId:null,
		 //移动改变大小----------end
		
		 // 移动位置变量 -----------------start
		 isMove : false,
		 move_mouse_sx : null,
		 move_mouse_sy : null,
		 moveDiffX : null,// 点击的鼠标在图形元素相对左上角偏移的位置
		 moveDiffY : null,
	
		 // 移动位置变量 -----------------end
		
		 
         init : function() {
			try {
				createMoveShape();
				$('#centerDiv')
						.mousemove(function() {
									var e = window.event || arguments[0];
									e.stopPropagation();
									mainAreaMouseMove(e);
								});
				$('#centerDiv').mouseup(function() {
							var e = window.event || arguments[0];
							e.stopPropagation();
							mainAreaMouseUp(e);
						});

			} catch (e) {
				alert("init异常:"+e);
			}
		},
	    //坐标位置调整
	   pointAdjustX:function(val){
	   	   var x = val - $('#leftDiv').width() ;
	   	   return x;
	   },
	   pointAdjustY:function(val){
	   	   var y = val - $('#headDiv').height() ;
	   	   return y;
	   },
	   redoState:function(){
		this.isMoveChangeSize =false;
		this.isMoveChangeSizeIng =false;
		this.isMove =false;
		this.helpShapeEle.hide();
		$('#centerDiv').css('cursor','default'); 
	   },
	   shapeUpExc:function(){
	   	 shapeUpExc();
	   },
	   setMoveShape:function(){
	   	 this.helpShapeEle.width(this.currShape.width());
		 this.helpShapeEle.height(this.currShape.height());
		 this.helpShapeEle.css('left', this.currShape.x());
		 this.helpShapeEle.css('top', this.currShape.y());
		 this.helpShapeEle.show();
	   }
	
	};
}();


// 初始化
$(function() {
	
	 try{
	 	Index.init();
	 	
       /*var shapeDemo = new fhShape(new Object());
       shapeDemo.init();
      
       shapeDemo.refresh();*/
	 	var obj = new Object();
	 	obj.shapType=FhcpConst.shape_triangle;
	 	var shapeDemo =  New(fhShape,[obj]);
        shapeDemo.init();
        //shapeDemo.setStyle();
       
	 }catch(e){
	 	alert(e);
	 }
            	
  
  });
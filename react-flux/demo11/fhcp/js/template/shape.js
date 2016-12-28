
//基礎類只在圖形類庫中使用
var fhShape_base = new function() {

	return {

		//坐标位置调整
		pointAdjustX : function(val) {
			var x = val - $('#leftDiv').width();
			return x;
		},
		pointAdjustY : function(val) {
			var y = val - $('#headDiv').height();
			return y;
		},
		addEventHelp : function(sourceEle, self) {
			sourceEle.mousedown(function() {
						var e = window.event || arguments[0];
						e.stopPropagation();
						self.helpMousedown(e);
					});
			sourceEle.mouseover(function() {
						var e = window.event || arguments[0];
						e.stopPropagation();
						self.helpMouseover(e);
					});
			sourceEle.mouseout(function() {
						var e = window.event || arguments[0];
						e.stopPropagation();
						self.helpMouseout(e);
					});
		}

	};
}();

/**
 * 图形对象
 * create zhuangzhao 20161220
 */
var fhShape = {

	//類的數據區域，所有dom元素採用jquery對象，結尾ele
	Create : function(inObj) {

		this.shapType = inObj.shapType;//形状类型

		//所有dom对象都是jquery对象
		this.rootEle = null;//jquery对象
		this.help_width = 10;

		this.shapeCanvasEle;
		// 8个点---start
		this.helpTopCenterEle; //头部中间的小窗体
		this.helpBottomCenterEle;//底部中间的小窗体
		this.helpTopLeftEle;
		this.helpTopRightEle;
		this.helpLeftEle;
		this.helpRightEle;
		this.helpBottomCenterEle;
		this.helpBottomRightEle;
		// 8个点---end

	},
	init : function() {
		var data = {

			id : "1"
		};
		var html = template('shapeEle', data);
		this.rootEle = $(html);
		//this.rootEle = $('<div  class="fhShape"">你好</div>');
		$('#centerDiv').append(this.rootEle);

		var self = this;

		try {
			this.setStyle();
			this.rootEle.click(function() {
						self.onclick();
					});
			this.rootEle.mousedown(function() {
						var e = window.event || arguments[0];
						e.stopPropagation();
						self.shapeMouseDown(e);
					});
			this.rootEle.mouseup(function() {
						var e = window.event || arguments[0];
						e.stopPropagation();
						self.shapeMouseUp(e);
					});
		} catch (e) {
			alert(e);
		}

		try {
			fhShape_base.addEventHelp(this.helpTopLeftEle, self);
			fhShape_base.addEventHelp(this.helpTopCenterEle, self);
			fhShape_base.addEventHelp(this.helpTopRightEle, self);
			fhShape_base.addEventHelp(this.helpLeftEle, self);
			fhShape_base.addEventHelp(this.helpRightEle, self);
			fhShape_base.addEventHelp(this.helpBottomLeftEle, self);
			fhShape_base.addEventHelp(this.helpBottomCenterEle, self);
			fhShape_base.addEventHelp(this.helpBottomRightEle, self);
		} catch (e) {
			alert("helpTopCenterEle:" + e);
		}

		this.drawSHape();
	},
	drawSHape : function() {
		try {
			//bind(this) 把当前对象指定到函数中
			setTimeout(this.drawSHapeBody.bind(this), 50);
		} catch (e) {
			alert(e);
		}
		
		//this.drawSHapeBody();
		
		
	},
	drawSHapeBody : function() {
		try {
			if (this.shapeCanvasEle != null) {
				//this.shapeCanvasEle.remove();
			}
			//this.shapeCanvasEle = $('<canvas id="shapeCanvasEle" class="shapeCanvas" ></canvas>');
			this.shapeCanvasEle  =this.rootEle.children('#shapeCanvasEle');
			//this.rootEle.append(this.shapeCanvasEle);
			
			this.shapeCanvasEle.width(this.rootEle.width());
			this.shapeCanvasEle.height(this.rootEle.height());

			if (this.shapType == FhcpConst.shape_quadrangle) {
				var cxt = this.shapeCanvasEle.get(0).getContext("2d");
                cxt.beginPath();
				cxt.fillStyle = "#FF0000";
				cxt.fillRect(0, 0, this.shapeCanvasEle.width(), this.shapeCanvasEle.height());
				cxt.closePath();
			} else if (this.shapType == FhcpConst.shape_triangle) {// 三角

				var centerX =(this.rootEle.width()/2);
				var centerY =0;
				
				var leftX =0;
				var lefty =this.rootEle.height();
				
				var rightX =this.rootEle.width();
				var rightY =this.rootEle.height();
				
				var cxt = this.shapeCanvasEle.get(0).getContext("2d");
				
				cxt.moveTo(centerX, centerY);
				cxt.lineTo(leftX, lefty);
				cxt.moveTo(leftX, lefty);
				cxt.lineTo(rightX, rightY);
				cxt.moveTo(rightX, rightY);
				cxt.lineTo(centerX, centerY);
				
				cxt.stroke();
				
			} else if (this.shapType == FhcpConst.shape_circular) {// 圆

				var cxt = this.shapeCanvasEle.get(0).getContext("2d");
				cxt.fillStyle = "#FF0000";
				cxt.beginPath();
				cxt.arc(70, 18, 15, 0, Math.PI * 2, true);
				cxt.closePath();
				cxt.fill();

			}
		} catch (e) {
			alert(e);
		}
	},
	width : function() {
		return this.rootEle.width();
	},
	height : function() {
		return this.rootEle.height();
	},
	x : function() {
		return this.rootEle.css('left');
	},
	y : function() {
		return this.rootEle.css('top');
	},
	showHelp : function() {
		this.helpTopCenterEle.show();
		this.helpBottomCenterEle.show();
		this.helpTopLeftEle.show();
		this.helpTopRightEle.show();
		this.helpLeftEle.show();
		this.helpRightEle.show();
		this.helpBottomLeftEle.show();
		this.helpBottomRightEle.show();
	},
	hideHelp : function() {
		this.helpTopCenterEle.hide();
		this.helpBottomCenterEle.hide();
		this.helpTopLeftEle.hide();
		this.helpTopRightEle.hide();
		this.helpLeftEle.hide();
		this.helpRightEle.hide();
		this.helpBottomLeftEle.hide();
		this.helpBottomRightEle.hide();
	},
	onclick : function() {
		this.showHelp();
	},
	//移动帮助窗体按下
	helpMousedown : function(e) {
		try {
			var targetEle = e.srcElement ? e.srcElement : e.target;
			var eleId = $(targetEle).attr('id');

			Index.currShape = this;

			if (Index.isMoveChangeSize) {
				Index.isMoveChangeSizeIng = true;
			}
			if (Index.isMoveChangeSizeIng) {
				$('#centerDiv').css('cursor', 'crosshair');

				Index.movChangeSizeCurrHelpId = eleId;
				try {
					Index.setMoveShape();

				} catch (e) {
					alert("createMoveShape异常:" + e);
				}

				Index.movChangeSizeSx = Index.pointAdjustX(e.pageX);
				Index.movChangeSizeSy = Index.pointAdjustY(e.pageY);

			}
		} catch (e) {
			alert("helpMousedown异常:" + e);
		}

	},
	helpMouseover : function(e) {
		var targetEle = e.srcElement ? e.srcElement : e.target;
		var eleId = $(targetEle).attr('id');

		// 中间
		if (eleId == "helpTopCenterEle" || eleId == "helpBottomCenterEle") {
			$('#centerDiv').css('cursor', 'n-resize');
		}

		if (eleId == "helpTopLeftEle" || eleId == "helpBottomRightEle") {
			$('#centerDiv').css('cursor', 'nw-resize');
		}

		if (eleId == "helpTopRightEle" || eleId == "helpBottomLeftEle") {
			$('#centerDiv').css('cursor', 'ne-resize');
		}

		if (eleId == "helpLeftEle" || eleId == "helpRightEle") {
			$('#centerDiv').css('cursor', 'e-resize');
		}

		Index.isMoveChangeSize = true;
	},
	helpMouseout : function(e) {

		var targetEle = e.srcElement ? e.srcElement : e.target;
		var eleId = $(targetEle).attr('id');

		if (Index.isMoveChangeSizeIng == false) {
			Index.redoState();
		}

	},
	// 當前圖形元素點擊
	shapeMouseDown : function(e) {
		try {

			this.showHelp();
	        Index.currShape = this;
	        
			Index.move_mouse_sx = e.pageX;
			Index.move_mouse_sy = e.pageY;
			var offset = this.rootEle.offset();

			Index.moveDiffX = Index.move_mouse_sx - offset.left
					+ $('#leftDiv').width();
			Index.moveDiffY = Index.move_mouse_sy - offset.top
					+ $('#headDiv').height();

			Index.setMoveShape();

			Index.isMove = true;
		} catch (e) {
			alert("shapeMouseDown异常:" + e);
		}
	},
	shapeMouseUp : function(e) {
          Index.shapeUpExc();
	},

	setStyle : function() {
		try {

			// 8个点对象
			this.helpTopCenterEle = this.rootEle.children("#helpTopCenterEle");
			this.helpBottomCenterEle = this.rootEle
					.children("#helpBottomCenterEle");
			this.helpTopLeftEle = this.rootEle.children("#helpTopLeftEle");
			this.helpTopRightEle = this.rootEle.children("#helpTopRightEle");
			this.helpLeftEle = this.rootEle.children("#helpLeftEle");
			this.helpRightEle = this.rootEle.children("#helpRightEle");
			this.helpBottomLeftEle = this.rootEle
					.children("#helpBottomLeftEle");
			this.helpBottomRightEle = this.rootEle
					.children("#helpBottomRightEle");

			this.setStyleBody();
			this.hideHelp();
		} catch (e) {
			alert("setStyle异常:" + e);
		}
	},
	setStyleBody : function() {
		var width = this.width();
		var center_top_x = width / 2 - this.help_width / 2;
		var height = this.height();

		this.helpTopLeftEle.css('left', -this.help_width / 2);
		this.helpTopLeftEle.css('top', -this.help_width / 2);
		this.helpTopCenterEle.css('left', center_top_x);
		this.helpTopCenterEle.css('top', -this.help_width / 2);
		this.helpTopRightEle.css('left', width - this.help_width / 2);
		this.helpTopRightEle.css('top', -this.help_width / 2);

		this.helpBottomLeftEle.css('left', -this.help_width / 2);
		this.helpBottomLeftEle.css('top', height - this.help_width / 2);
		this.helpBottomCenterEle.css('left', center_top_x);
		this.helpBottomCenterEle.css('top', height - this.help_width / 2);
		this.helpBottomRightEle.css('left', width - this.help_width / 2);
		this.helpBottomRightEle.css('top', height - this.help_width / 2);

		this.helpLeftEle.css('left', -this.help_width / 2);
		this.helpLeftEle.css('top', height / 2);

		this.helpRightEle.css('left', width - this.help_width / 2);
		this.helpRightEle.css('top', height / 2);

	},
	//调整大小，位置后等重新调整样式
	refreshStyle : function() {

		this.setStyleBody();

	}
};

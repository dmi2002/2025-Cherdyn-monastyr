// Garden Gnome Software - Skin
// Pano2VR 6.1.11/18043
// Filename: Monastyr SOUND.ggsk
// Generated 2025-11-17T16:53:59

function pano2vrSkin(player,base) {
	player.addVariable('ht_anivar1', 2, true);
	player.addVariable('vis_auto_hide_controller', 2, true);
	player.addVariable('opt_thumbnail_menu_tooltip', 2, true);
	player.addVariable('vis_thumbnail_menu', 2, false);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._minipano=document.createElement('div');
		els=me._minipano__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		hs ='';
		hs+='height : 95px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 127px;';
		hs+="";
		els.setAttribute('style',hs);
		me._minipano.ggScrollByX = function(diffX) {
			if(!me._minipano.ggHorScrollVisible || diffX == 0 || me._minipano.ggHPercentVisible >= 1.0) return;
			me._minipano.ggScrollPosX = (me._minipano__horScrollFg.offsetLeft + diffX);
			me._minipano.ggScrollPosX = Math.max(me._minipano.ggScrollPosX, 0);
			me._minipano.ggScrollPosX = Math.min(me._minipano.ggScrollPosX, me._minipano__horScrollBg.offsetWidth - me._minipano__horScrollFg.offsetWidth);
			me._minipano__horScrollFg.style.left = me._minipano.ggScrollPosX + 'px';
			let percentScrolled = me._minipano.ggScrollPosX / (me._minipano__horScrollBg.offsetWidth - me._minipano__horScrollFg.offsetWidth);
			me._minipano__content.style.left = -(Math.round((me._minipano.ggContentWidth * (1.0 - me._minipano.ggHPercentVisible)) * percentScrolled)) + me._minipano.ggContentLeftOffset + 'px';
			me._minipano.ggScrollPosXPercent = (me._minipano__horScrollFg.offsetLeft / me._minipano__horScrollBg.offsetWidth);
		}
		me._minipano.ggScrollByXSmooth = function(diffX) {
			if(!me._minipano.ggHorScrollVisible || diffX == 0 || me._minipano.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._minipano.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._minipano.ggScrollPosX >= me._minipano__horScrollBg.offsetWidth - me._minipano__horScrollFg.offsetWidth)) {
					me._minipano.ggScrollPosX = Math.min(me._minipano.ggScrollPosX, me._minipano__horScrollBg.offsetWidth - me._minipano__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._minipano.ggScrollPosX <= 0)) {
					me._minipano.ggScrollPosX = Math.max(me._minipano.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._minipano__horScrollFg.style.left = me._minipano.ggScrollPosX + 'px';
			let percentScrolled = me._minipano.ggScrollPosX / (me._minipano__horScrollBg.offsetWidth - me._minipano__horScrollFg.offsetWidth);
			me._minipano__content.style.left = -(Math.round((me._minipano.ggContentWidth * (1.0 - me._minipano.ggHPercentVisible)) * percentScrolled)) + me._minipano.ggContentLeftOffset + 'px';
			me._minipano.ggScrollPosXPercent = (me._minipano__horScrollFg.offsetLeft / me._minipano__horScrollBg.offsetWidth);
			}, 10);
		}
		me._minipano.ggScrollByY = function(diffY) {
			if(!me._minipano.ggVertScrollVisible || diffY == 0 || me._minipano.ggVPercentVisible >= 1.0) return;
			me._minipano.ggScrollPosY = (me._minipano__vertScrollFg.offsetTop + diffY);
			me._minipano.ggScrollPosY = Math.max(me._minipano.ggScrollPosY, 0);
			me._minipano.ggScrollPosY = Math.min(me._minipano.ggScrollPosY, me._minipano__vertScrollBg.offsetHeight - me._minipano__vertScrollFg.offsetHeight);
			me._minipano__vertScrollFg.style.top = me._minipano.ggScrollPosY + 'px';
			let percentScrolled = me._minipano.ggScrollPosY / (me._minipano__vertScrollBg.offsetHeight - me._minipano__vertScrollFg.offsetHeight);
			me._minipano__content.style.top = -(Math.round((me._minipano.ggContentHeight * (1.0 - me._minipano.ggVPercentVisible)) * percentScrolled)) + me._minipano.ggContentTopOffset + 'px';
			me._minipano.ggScrollPosYPercent = (me._minipano__vertScrollFg.offsetTop / me._minipano__vertScrollBg.offsetHeight);
		}
		me._minipano.ggScrollByYSmooth = function(diffY) {
			if(!me._minipano.ggVertScrollVisible || diffY == 0 || me._minipano.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._minipano.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._minipano.ggScrollPosY >= me._minipano__vertScrollBg.offsetHeight - me._minipano__vertScrollFg.offsetHeight)) {
					me._minipano.ggScrollPosY = Math.min(me._minipano.ggScrollPosY, me._minipano__vertScrollBg.offsetHeight - me._minipano__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._minipano.ggScrollPosY <= 0)) {
					me._minipano.ggScrollPosY = Math.max(me._minipano.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._minipano__vertScrollFg.style.top = me._minipano.ggScrollPosY + 'px';
			let percentScrolled = me._minipano.ggScrollPosY / (me._minipano__vertScrollBg.offsetHeight - me._minipano__vertScrollFg.offsetHeight);
			me._minipano__content.style.top = -(Math.round((me._minipano.ggContentHeight * (1.0 - me._minipano.ggVPercentVisible)) * percentScrolled)) + me._minipano.ggContentTopOffset + 'px';
			me._minipano.ggScrollPosYPercent = (me._minipano__vertScrollFg.offsetTop / me._minipano__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._minipano.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._minipano.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._minipano.ggHPercentVisible);
					me._minipano.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._minipano.clientWidth - (me._minipano.ggVertScrollVisible ? 5 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._minipano.clientWidth - (me._minipano.ggVertScrollVisible ? 5 : 0))) * me._minipano.ggHPercentVisible);
					me._minipano.ggScrollByXSmooth(diffX);
				}
			}
			if (me._minipano.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._minipano.ggVPercentVisible);
					me._minipano.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._minipano.clientHeight - (me._minipano.ggHorScrollVisible ? 5 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._minipano.clientHeight - (me._minipano.ggHorScrollVisible ? 5 : 0))) * me._minipano.ggVPercentVisible);
					me._minipano.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._minipano.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._minipano.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._minipano__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._minipano.ggDragInertiaX *= 0.65;
					me._minipano.ggDragInertiaY *= 0.65;
					me._minipano.ggScrollByX(me._minipano.ggDragInertiaX);
					me._minipano.ggScrollByY(me._minipano.ggDragInertiaY);
					if (Math.abs(me._minipano.ggDragInertiaX) < 1.0 && Math.abs(me._minipano.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._minipano__content.ontouchend = null;
				me._minipano__content.ontouchmove = null;
				me._minipano__content.onpointerup = null;
				me._minipano__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._minipano__content.onpointerup = me._minipano__content.ontouchend;
		}
			me._minipano__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = ((t ? t[0].clientX : e.clientX) - me._minipano.ggDragLastX) * me._minipano.ggHPercentVisible;
				var diffY = ((t ? t[0].clientY : e.clientY) - me._minipano.ggDragLastY) * me._minipano.ggVPercentVisible;
				me._minipano.ggDragInertiaX = -diffX;
				me._minipano.ggDragInertiaY = -diffY;
				me._minipano.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._minipano.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._minipano.ggScrollByX(-diffX);
				me._minipano.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._minipano__content.onpointermove = me._minipano__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elHorScrollBg = me._minipano__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 900px; height: 5px; background-color: rgba(145,113,62,0.901961); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._minipano__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 900px; height: 5px; background-color: rgba(192,192,192,1); pointer-events: auto;');
		me._minipano.ggScrollPosX = 0;
		me._minipano.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._minipano.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._minipano.ggDragInertiaX *= 0.65;
					me._minipano.ggScrollByX(me._minipano.ggDragInertiaX);
					if (Math.abs(me._minipano.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._minipano.ggDragLastX;
				me._minipano.ggDragInertiaX = diffX;
				me._minipano.ggDragLastX = e.clientX;
				me._minipano.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._minipano.ggDragLastX = t ? t[0].clientX : e.clientX;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._minipano.ggDragInertiaX *= 0.65;
					me._minipano.ggScrollByX(me._minipano.ggDragInertiaX);
					if (Math.abs(me._minipano.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._minipano.ggDragLastX;
				me._minipano.ggDragInertiaX = diffX;
				me._minipano.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._minipano.ggScrollByX(diffX);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elHorScrollFg.onpointerdown = elHorScrollFg.ontouchstart;
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._minipano.ggScrollWidth;
			if (e.offsetX < me._minipano.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._minipano.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._minipano__horScrollBg.getBoundingClientRect();
			var diffX = me._minipano.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._minipano.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._minipano.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._minipano.ggScrollByXSmooth(30 * me._minipano.ggHPercentVisible * wheelDelta);
		});
		elCornerBg = me._minipano__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 5px; height: 5px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="minipano";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='background : rgba(145,113,62,0.901961);';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 100%';
		me._minipano.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._minipano.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				this.ggContentWidth = 0;
				this.ggContentHeight = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContentWidth = contentWidth;
				this.ggContentHeight = contentHeight;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				this.ggContent.style.left = -(Math.round(me._minipano.ggScrollPosX / me._minipano.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				var containerHeight = this.clientHeight;
				if (this.ggHorScrollVisible) containerHeight -= 5;
				if (contentHeight < containerHeight) {
					this.ggContent.style.bottom = (this.ggHorScrollVisible ? 5 : 0) + 'px';
					this.ggContent.style.top = '';
					this.ggContent.style.marginBottom = '0px';
				}
				else {
					this.ggContent.style.top = this.ggContentTopOffset + 'px';
					this.ggContent.style.marginTop = '0px';
				}
				me._minipano__horScrollBg.style.visibility = 'inherit';
				me._minipano__horScrollFg.style.visibility = 'inherit';
				me._minipano.ggHorScrollVisible = true;
				if(me._minipano.ggHorScrollVisible) {
					me._minipano.ggAvailableHeight = me._minipano.clientHeight - 5;
					if (me._minipano.ggVertScrollVisible) {
						me._minipano.ggAvailableWidth = me._minipano.clientWidth - 5;
						me._minipano.ggAvailableWidthWithScale = me._minipano.getBoundingClientRect().width - me._minipano__horScrollBg.getBoundingClientRect().height;
					} else {
						me._minipano.ggAvailableWidth = me._minipano.clientWidth;
						me._minipano.ggAvailableWidthWithScale = me._minipano.getBoundingClientRect().width;
					}
					me._minipano__horScrollBg.style.width = me._minipano.ggAvailableWidth + 'px';
					me._minipano.ggHPercentVisible = contentWidth != 0 ? me._minipano.ggAvailableWidthWithScale / contentWidth : 0.0;
					if (me._minipano.ggHPercentVisible > 1.0) me._minipano.ggHPercentVisible = 1.0;
					me._minipano.ggScrollWidth = Math.round(me._minipano__horScrollBg.offsetWidth * me._minipano.ggHPercentVisible);
					me._minipano__horScrollFg.style.width = me._minipano.ggScrollWidth + 'px';
					me._minipano.ggScrollPosX = me._minipano.ggScrollPosXPercent * me._minipano.ggAvailableWidth;
					me._minipano.ggScrollPosX = Math.min(me._minipano.ggScrollPosX, me._minipano__horScrollBg.offsetWidth - me._minipano__horScrollFg.offsetWidth);
					me._minipano__horScrollFg.style.left = me._minipano.ggScrollPosX + 'px';
					if (me._minipano.ggHPercentVisible < 1.0) {
						let percentScrolled = me._minipano.ggScrollPosX / (me._minipano__horScrollBg.offsetWidth - me._minipano__horScrollFg.offsetWidth);
						me._minipano__content.style.left = -(Math.round((me._minipano.ggContentWidth * (1.0 - me._minipano.ggHPercentVisible)) * percentScrolled)) + this.ggContentLeftOffset + 'px';
					}
				} else {
					me._minipano.ggAvailableHeight = me._minipano.clientHeight;
					me._minipano.ggScrollPosX = 0;
					me._minipano.ggScrollPosXPercent = 0.0;
					me._minipano__content.style.left = this.ggContentLeftOffset + 'px';
				}
				if(horScrollWasVisible != me._minipano.ggHorScrollVisible || vertScrollWasVisible != me._minipano.ggVertScrollVisible) {
					me.updateSize(me._minipano);
					me._minipano.ggUpdatePosition();
				}
			}
		}
		el=me._thumbnail_cloner=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 120;
		el.ggHeight = 90;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._node_text_wight && me._thumbnail_cloner.ggInstances[i]._node_text_wight.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._node_text_wight.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_active = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checker && me._thumbnail_cloner.ggInstances[i]._checker.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checker.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkervisited && me._thumbnail_cloner.ggInstances[i]._checkervisited.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkervisited.logicBlock_visible();
					}
				}
			}
		}
		el.ggAutoPosition = function(init) {
			var currXPos = 0;
			var numElements = me._thumbnail_cloner.ggInstances.length;
			var currElement = 0;
			for (var i=0; i<me._thumbnail_cloner.ggNumCols; i++) {
				var colMaxWidth = 0;
				for (var j=0; j<me._thumbnail_cloner.ggNumRows; j++) {
					if (numElements>currElement) {
						if (!init) {
							if (me._thumbnail_cloner.childNodes[currElement].clientWidth < me._thumbnail_cloner.childNodes[currElement].scrollWidth && currElement < (numElements - 1)) {
								me._thumbnail_cloner.childNodes[currElement].style.transition = 'left ' + 1 + 's, width ' + 1 + 's';
							} else {
								me._thumbnail_cloner.childNodes[currElement].style.transition = 'left ' + 1 + 's';
							}
						}
						me._thumbnail_cloner.childNodes[currElement].style.overflow = 'hidden';
						me._thumbnail_cloner.childNodes[currElement].style['left'] = currXPos + 'px';
						me._thumbnail_cloner.childNodes[currElement].style['width'] ='0px';
						colMaxWidth = Math.max(colMaxWidth, me._thumbnail_cloner.childNodes[currElement].scrollWidth);
						me._thumbnail_cloner.childNodes[currElement].style['width'] = colMaxWidth + 'px';
					}
					currElement++;
				}
				currXPos += colMaxWidth;
			}
			setTimeout(function() {
				var p = me._thumbnail_cloner.parentElement;
				while (p != null && p !== me.divSkin) {
					if (p.ggType && p.ggType == 'scrollarea') {
						if (p.ggUpdatePosition) {
							p.ggUpdatePosition();
						}
					}
					p = p.parentElement;
				}
			}, 1000);
		}
		el.ggUpdate = function(filter) {
			if(me._thumbnail_cloner.ggUpdating == true) return;
			me._thumbnail_cloner.ggUpdating = true;
			var el=me._thumbnail_cloner;
			var curNumRows = 0;
			curNumRows = el.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumRows == curNumRows) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._thumbnail_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumCols = 1;
				el.ggNumRows = curNumRows;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._thumbnail_cloner.ggHeight) + 'px';
				parameter.left=(column * me._thumbnail_cloner.ggWidth) + 'px';
				parameter.width=me._thumbnail_cloner.ggWidth + 'px';
				parameter.height=me._thumbnail_cloner.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_thumbnail_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				inst.__div.style['width'] = '0px';
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				row++;
				if (row >= el.ggNumRows) {
					row = 0;
					column++;
					el.ggNumCols++;
				}
				}
			}
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_active();
			me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes();
			me._thumbnail_cloner.ggAutoPosition(true);
			me._thumbnail_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._thumbnail_cloner.parentNode.classList.contains('ggskin_subelement') && me._thumbnail_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._thumbnail_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggId="Thumbnail Cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._thumbnail_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._thumbnail_cloner.childNodes.length; i++) {
				var child=me._thumbnail_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._thumbnail_cloner.ggUpdatePosition=function (useTransition) {
				me._thumbnail_cloner.ggUpdate();
		}
		me._thumbnail_cloner.ggNodeChange=function () {
			me._thumbnail_cloner.ggUpdateConditionNodeChange();
		}
		me._minipano__content.appendChild(me._thumbnail_cloner);
		me.divSkin.appendChild(me._minipano);
		el=me._controller_pc=document.createElement('div');
		el.ggId="controller_pc";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100%;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		me._controller_pc.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controller_pc.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._controller_pc.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._controller_pc.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._controller_pc.style[domTransition]='' + cssPrefix + 'transform 0s, opacity 0s';
				if (me._controller_pc.ggCurrentLogicStateScaling == 0) {
					me._controller_pc.ggParameter.sx = 0.9;
					me._controller_pc.ggParameter.sy = 0.9;
					me._controller_pc.style[domTransform]=parameterToTransform(me._controller_pc.ggParameter);
				}
				else {
					me._controller_pc.ggParameter.sx = 1;
					me._controller_pc.ggParameter.sy = 1;
					me._controller_pc.style[domTransform]=parameterToTransform(me._controller_pc.ggParameter);
				}
			}
		}
		me._controller_pc.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._controller_pc.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._controller_pc.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._controller_pc.style[domTransition]='' + cssPrefix + 'transform 0s, opacity 0s';
				if (me._controller_pc.ggCurrentLogicStateVisible == 0) {
					me._controller_pc.style.visibility="hidden";
					me._controller_pc.ggVisible=false;
				}
				else {
					me._controller_pc.style.visibility=(Number(me._controller_pc.style.opacity)>0||!me._controller_pc.style.opacity)?'inherit':'hidden';
					me._controller_pc.ggVisible=true;
				}
			}
		}
		me._controller_pc.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._controller_pc.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._controller_pc.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._controller_pc.style[domTransition]='' + cssPrefix + 'transform 0s, opacity 0s';
				if (me._controller_pc.ggCurrentLogicStateAlpha == 0) {
					me._controller_pc.style.visibility=me._controller_pc.ggVisible?'inherit':'hidden';
					me._controller_pc.style.opacity=0.9;
				}
				else {
					me._controller_pc.style.visibility=me._controller_pc.ggVisible?'inherit':'hidden';
					me._controller_pc.style.opacity=1;
				}
			}
		}
		me._controller_pc.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._rectangle_30=document.createElement('div');
		el.ggId="Rectangle 3";
		el.ggDy=-43;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 15px;';
		hs+='border-radius : 15px;';
		hs+='background : rgba(145,113,62,0.901961);';
		hs+='border : 1px solid #644d2a;';
		hs+='cursor : default;';
		hs+='height : 367px;';
		hs+='opacity : 0.50002;';
		hs+='position : absolute;';
		hs+='right : 3px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._rectangle_30.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rectangle_30.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['rectangle_30'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectangle_30.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectangle_30.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectangle_30.style[domTransition]='opacity 1000ms ease 0ms';
				if (me._rectangle_30.ggCurrentLogicStateAlpha == 0) {
					me._rectangle_30.style.visibility=me._rectangle_30.ggVisible?'inherit':'hidden';
					me._rectangle_30.style.opacity=1;
				}
				else {
					me._rectangle_30.style.visibility=me._rectangle_30.ggVisible?'inherit':'hidden';
					me._rectangle_30.style.opacity=0.50002;
				}
			}
		}
		me._rectangle_30.onmouseover=function (e) {
			me.elementMouseOver['rectangle_30']=true;
			me._rectangle_30.logicBlock_alpha();
		}
		me._rectangle_30.onmouseout=function (e) {
			me.elementMouseOver['rectangle_30']=false;
			me._rectangle_30.logicBlock_alpha();
		}
		me._rectangle_30.ontouchend=function (e) {
			me.elementMouseOver['rectangle_30']=false;
			me._rectangle_30.logicBlock_alpha();
		}
		me._rectangle_30.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._hiidemenu0=document.createElement('div');
		els=me._hiidemenu0__img=document.createElement('img');
		els.className='ggskin ggskin_hiidemenu0';
		hs=basePath + 'images/hiidemenu0.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hiidemenu";
		el.ggDx=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 5px;';
		hs+='cursor : pointer;';
		hs+='height : 43px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 43px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hiidemenu0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._hiidemenu0.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['hiidemenu0'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hiidemenu0.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hiidemenu0.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hiidemenu0.style[domTransition]='opacity 0s';
				if (me._hiidemenu0.ggCurrentLogicStateAlpha == 0) {
					me._hiidemenu0.style.visibility=me._hiidemenu0.ggVisible?'inherit':'hidden';
					me._hiidemenu0.style.opacity=1;
				}
				else {
					me._hiidemenu0.style.visibility=me._hiidemenu0.ggVisible?'inherit':'hidden';
					me._hiidemenu0.style.opacity=0.60003;
				}
			}
		}
		me._hiidemenu0.onclick=function (e) {
			var flag=me._minipano.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._minipano.style[domTransition]='none';
			} else {
				me._minipano.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._minipano.style.opacity='1';
				me._minipano.style.visibility=me._minipano.ggVisible?'inherit':'hidden';
			} else {
				me._minipano.style.opacity='0';
				me._minipano.style.visibility='hidden';
			}
			me._minipano.ggOpacitiyActive=!flag;
		}
		me._hiidemenu0.onmouseover=function (e) {
			me.__13.ggVisible = !me.__13.ggVisible;
			var flag=me.__13.ggVisible;
			me.__13.style[domTransition]='none';
			me.__13.style.visibility=((flag)&&(Number(me.__13.style.opacity)>0||!me.__13.style.opacity))?'inherit':'hidden';
			me.elementMouseOver['hiidemenu0']=true;
			me._hiidemenu0.logicBlock_alpha();
		}
		me._hiidemenu0.onmouseout=function (e) {
			me.__13.style[domTransition]='none';
			me.__13.style.visibility='hidden';
			me.__13.ggVisible=false;
			me.elementMouseOver['hiidemenu0']=false;
			me._hiidemenu0.logicBlock_alpha();
		}
		me._hiidemenu0.ontouchend=function (e) {
			me.elementMouseOver['hiidemenu0']=false;
			me._hiidemenu0.logicBlock_alpha();
		}
		me._hiidemenu0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_30.appendChild(me._hiidemenu0);
		el=me._rotate=document.createElement('div');
		els=me._rotate__img=document.createElement('img');
		els.className='ggskin ggskin_rotate';
		hs=basePath + 'images/rotate.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="rotate";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 49px;';
		hs+='cursor : pointer;';
		hs+='height : 42px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 42px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rotate.logicBlock_angle = function() {
			var newLogicStateAngle;
			if (
				((me.elementMouseOver['rotate'] == true))
			)
			{
				newLogicStateAngle = 0;
			}
			else {
				newLogicStateAngle = -1;
			}
			if (me._rotate.ggCurrentLogicStateAngle != newLogicStateAngle) {
				me._rotate.ggCurrentLogicStateAngle = newLogicStateAngle;
				me._rotate.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 0s';
				if (me._rotate.ggCurrentLogicStateAngle == 0) {
					me._rotate.ggParameter.a = 90;
					me._rotate.style[domTransform]=parameterToTransform(me._rotate.ggParameter);
				}
				else {
					me._rotate.ggParameter.a = 0;
					me._rotate.style[domTransform]=parameterToTransform(me._rotate.ggParameter);
				}
			}
		}
		me._rotate.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['rotate'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rotate.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rotate.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rotate.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 0s';
				if (me._rotate.ggCurrentLogicStateAlpha == 0) {
					me._rotate.style.visibility=me._rotate.ggVisible?'inherit':'hidden';
					me._rotate.style.opacity=1;
				}
				else {
					me._rotate.style.visibility=me._rotate.ggVisible?'inherit':'hidden';
					me._rotate.style.opacity=0.60003;
				}
			}
		}
		me._rotate.onclick=function (e) {
			player.toggleAutorotate();
		}
		me._rotate.onmouseover=function (e) {
			me.__12.ggVisible = !me.__12.ggVisible;
			var flag=me.__12.ggVisible;
			me.__12.style[domTransition]='none';
			me.__12.style.visibility=((flag)&&(Number(me.__12.style.opacity)>0||!me.__12.style.opacity))?'inherit':'hidden';
			me.elementMouseOver['rotate']=true;
			me._rotate.logicBlock_angle();
			me._rotate.logicBlock_alpha();
		}
		me._rotate.onmouseout=function (e) {
			me.__12.style[domTransition]='none';
			me.__12.style.visibility='hidden';
			me.__12.ggVisible=false;
			me.elementMouseOver['rotate']=false;
			me._rotate.logicBlock_angle();
			me._rotate.logicBlock_alpha();
		}
		me._rotate.ontouchend=function (e) {
			me.elementMouseOver['rotate']=false;
			me._rotate.logicBlock_angle();
			me._rotate.logicBlock_alpha();
		}
		me._rotate.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_30.appendChild(me._rotate);
		el=me._zoom_out=document.createElement('div');
		els=me._zoom_out__img=document.createElement('img');
		els.className='ggskin ggskin_zoom_out';
		hs=basePath + 'images/zoom_out.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="zoom_out";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 93px;';
		hs+='cursor : pointer;';
		hs+='height : 43px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 43px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoom_out.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoom_out.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['zoom_out'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._zoom_out.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._zoom_out.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._zoom_out.style[domTransition]='opacity 0s';
				if (me._zoom_out.ggCurrentLogicStateAlpha == 0) {
					me._zoom_out.style.visibility=me._zoom_out.ggVisible?'inherit':'hidden';
					me._zoom_out.style.opacity=1;
				}
				else {
					me._zoom_out.style.visibility=me._zoom_out.ggVisible?'inherit':'hidden';
					me._zoom_out.style.opacity=0.60003;
				}
			}
		}
		me._zoom_out.onmouseover=function (e) {
			me.__11.ggVisible = !me.__11.ggVisible;
			var flag=me.__11.ggVisible;
			me.__11.style[domTransition]='none';
			me.__11.style.visibility=((flag)&&(Number(me.__11.style.opacity)>0||!me.__11.style.opacity))?'inherit':'hidden';
			me.elementMouseOver['zoom_out']=true;
			me._zoom_out.logicBlock_alpha();
		}
		me._zoom_out.onmouseout=function (e) {
			me.__11.style[domTransition]='none';
			me.__11.style.visibility='hidden';
			me.__11.ggVisible=false;
			me.elementMouseDown['zoom_out']=false;
			me.elementMouseOver['zoom_out']=false;
			me._zoom_out.logicBlock_alpha();
		}
		me._zoom_out.onmousedown=function (e) {
			me.elementMouseDown['zoom_out']=true;
		}
		me._zoom_out.onmouseup=function (e) {
			me.elementMouseDown['zoom_out']=false;
		}
		me._zoom_out.ontouchend=function (e) {
			me.elementMouseDown['zoom_out']=false;
			me.elementMouseOver['zoom_out']=false;
			me._zoom_out.logicBlock_alpha();
		}
		me._zoom_out.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_30.appendChild(me._zoom_out);
		el=me._zoom_in=document.createElement('div');
		els=me._zoom_in__img=document.createElement('img');
		els.className='ggskin ggskin_zoom_in';
		hs=basePath + 'images/zoom_in.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="zoom_in";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 138px;';
		hs+='cursor : pointer;';
		hs+='height : 42px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 42px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoom_in.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoom_in.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['zoom_in'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._zoom_in.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._zoom_in.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._zoom_in.style[domTransition]='opacity 0s';
				if (me._zoom_in.ggCurrentLogicStateAlpha == 0) {
					me._zoom_in.style.visibility=me._zoom_in.ggVisible?'inherit':'hidden';
					me._zoom_in.style.opacity=1;
				}
				else {
					me._zoom_in.style.visibility=me._zoom_in.ggVisible?'inherit':'hidden';
					me._zoom_in.style.opacity=0.60003;
				}
			}
		}
		me._zoom_in.onmouseover=function (e) {
			me.__10.ggVisible = !me.__10.ggVisible;
			var flag=me.__10.ggVisible;
			me.__10.style[domTransition]='none';
			me.__10.style.visibility=((flag)&&(Number(me.__10.style.opacity)>0||!me.__10.style.opacity))?'inherit':'hidden';
			me.elementMouseOver['zoom_in']=true;
			me._zoom_in.logicBlock_alpha();
		}
		me._zoom_in.onmouseout=function (e) {
			me.__10.style[domTransition]='none';
			me.__10.style.visibility='hidden';
			me.__10.ggVisible=false;
			me.elementMouseDown['zoom_in']=false;
			me.elementMouseOver['zoom_in']=false;
			me._zoom_in.logicBlock_alpha();
		}
		me._zoom_in.onmousedown=function (e) {
			me.elementMouseDown['zoom_in']=true;
		}
		me._zoom_in.onmouseup=function (e) {
			me.elementMouseDown['zoom_in']=false;
		}
		me._zoom_in.ontouchend=function (e) {
			me.elementMouseDown['zoom_in']=false;
			me.elementMouseOver['zoom_in']=false;
			me._zoom_in.logicBlock_alpha();
		}
		me._zoom_in.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_30.appendChild(me._zoom_in);
		el=me._full_windows0=document.createElement('div');
		els=me._full_windows0__img=document.createElement('img');
		els.className='ggskin ggskin_full_windows0';
		hs=basePath + 'images/full_windows0.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="full_windows";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 180px;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._full_windows0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._full_windows0.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['full_windows0'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._full_windows0.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._full_windows0.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._full_windows0.style[domTransition]='opacity 0s';
				if (me._full_windows0.ggCurrentLogicStateAlpha == 0) {
					me._full_windows0.style.visibility=me._full_windows0.ggVisible?'inherit':'hidden';
					me._full_windows0.style.opacity=1;
				}
				else {
					me._full_windows0.style.visibility=me._full_windows0.ggVisible?'inherit':'hidden';
					me._full_windows0.style.opacity=0.60003;
				}
			}
		}
		me._full_windows0.onclick=function (e) {
			player.toggleFullscreen();
		}
		me._full_windows0.onmouseover=function (e) {
			me._fullmon_.ggVisible = !me._fullmon_.ggVisible;
			var flag=me._fullmon_.ggVisible;
			me._fullmon_.style[domTransition]='none';
			me._fullmon_.style.visibility=((flag)&&(Number(me._fullmon_.style.opacity)>0||!me._fullmon_.style.opacity))?'inherit':'hidden';
			me.elementMouseOver['full_windows0']=true;
			me._full_windows0.logicBlock_alpha();
		}
		me._full_windows0.onmouseout=function (e) {
			me._fullmon_.style[domTransition]='none';
			me._fullmon_.style.visibility='hidden';
			me._fullmon_.ggVisible=false;
			me.elementMouseOver['full_windows0']=false;
			me._full_windows0.logicBlock_alpha();
		}
		me._full_windows0.ontouchend=function (e) {
			me.elementMouseOver['full_windows0']=false;
			me._full_windows0.logicBlock_alpha();
		}
		me._full_windows0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_30.appendChild(me._full_windows0);
		el=me.__14=document.createElement('div');
		els=me.__14__img=document.createElement('img');
		els.className='ggskin ggskin__14';
		hs=basePath + 'images/_14.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="\u0442\u0440\u0435\u0431\u044b";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 272px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__14.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__14.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['_14'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me.__14.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me.__14.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me.__14.style[domTransition]='opacity 0s';
				if (me.__14.ggCurrentLogicStateAlpha == 0) {
					me.__14.style.visibility=me.__14.ggVisible?'inherit':'hidden';
					me.__14.style.opacity=1;
				}
				else {
					me.__14.style.visibility=me.__14.ggVisible?'inherit':'hidden';
					me.__14.style.opacity=0.60003;
				}
			}
		}
		me.__14.onclick=function (e) {
			player.openUrl("https:\/\/cherdinmonastir.ru\/treby","_blank");
		}
		me.__14.onmouseover=function (e) {
			me.__7.ggVisible = !me.__7.ggVisible;
			var flag=me.__7.ggVisible;
			me.__7.style[domTransition]='none';
			me.__7.style.visibility=((flag)&&(Number(me.__7.style.opacity)>0||!me.__7.style.opacity))?'inherit':'hidden';
			me.elementMouseOver['_14']=true;
			me.__14.logicBlock_alpha();
		}
		me.__14.onmouseout=function (e) {
			me.__7.style[domTransition]='none';
			me.__7.style.visibility='hidden';
			me.__7.ggVisible=false;
			me.elementMouseOver['_14']=false;
			me.__14.logicBlock_alpha();
		}
		me.__14.ontouchend=function (e) {
			me.elementMouseOver['_14']=false;
			me.__14.logicBlock_alpha();
		}
		me.__14.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_30.appendChild(me.__14);
		el=me._exit0=document.createElement('div');
		els=me._exit0__img=document.createElement('img');
		els.className='ggskin ggskin_exit0';
		hs=basePath + 'images/exit0.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="exit";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 318px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._exit0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._exit0.logicBlock_angle = function() {
			var newLogicStateAngle;
			if (
				((me.elementMouseOver['exit0'] == true))
			)
			{
				newLogicStateAngle = 0;
			}
			else {
				newLogicStateAngle = -1;
			}
			if (me._exit0.ggCurrentLogicStateAngle != newLogicStateAngle) {
				me._exit0.ggCurrentLogicStateAngle = newLogicStateAngle;
				me._exit0.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 0s';
				if (me._exit0.ggCurrentLogicStateAngle == 0) {
					me._exit0.ggParameter.a = 90;
					me._exit0.style[domTransform]=parameterToTransform(me._exit0.ggParameter);
				}
				else {
					me._exit0.ggParameter.a = 0;
					me._exit0.style[domTransform]=parameterToTransform(me._exit0.ggParameter);
				}
			}
		}
		me._exit0.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['exit0'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._exit0.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._exit0.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._exit0.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 0s';
				if (me._exit0.ggCurrentLogicStateAlpha == 0) {
					me._exit0.style.visibility=me._exit0.ggVisible?'inherit':'hidden';
					me._exit0.style.opacity=1;
				}
				else {
					me._exit0.style.visibility=me._exit0.ggVisible?'inherit':'hidden';
					me._exit0.style.opacity=0.60003;
				}
			}
		}
		me._exit0.onclick=function (e) {
			player.openUrl("https:\/\/cherdinmonastir.ru\/","_self");
		}
		me._exit0.onmouseover=function (e) {
			me.__6.ggVisible = !me.__6.ggVisible;
			var flag=me.__6.ggVisible;
			me.__6.style[domTransition]='none';
			me.__6.style.visibility=((flag)&&(Number(me.__6.style.opacity)>0||!me.__6.style.opacity))?'inherit':'hidden';
			me.elementMouseOver['exit0']=true;
			me._exit0.logicBlock_angle();
			me._exit0.logicBlock_alpha();
		}
		me._exit0.onmouseout=function (e) {
			me.__6.style[domTransition]='none';
			me.__6.style.visibility='hidden';
			me.__6.ggVisible=false;
			me.elementMouseOver['exit0']=false;
			me._exit0.logicBlock_angle();
			me._exit0.logicBlock_alpha();
		}
		me._exit0.ontouchend=function (e) {
			me.elementMouseOver['exit0']=false;
			me._exit0.logicBlock_angle();
			me._exit0.logicBlock_alpha();
		}
		me._exit0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_30.appendChild(me._exit0);
		el=me._button_mute0=document.createElement('div');
		el.ggId="button_mute";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 225px;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_mute0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_mute0.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._button_mute0.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._button_mute0.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._button_mute0.style[domTransition]='';
				if (me._button_mute0.ggCurrentLogicStateVisible == 0) {
					me._button_mute0.style.visibility="hidden";
					me._button_mute0.ggVisible=false;
				}
				else {
					me._button_mute0.style.visibility=(Number(me._button_mute0.style.opacity)>0||!me._button_mute0.style.opacity)?'inherit':'hidden';
					me._button_mute0.ggVisible=true;
				}
			}
		}
		me._button_mute0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._unmute0=document.createElement('div');
		els=me._unmute0__img=document.createElement('img');
		els.className='ggskin ggskin_unmute0';
		hs=basePath + 'images/unmute0.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="unmute";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._unmute0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._unmute0.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['unmute0'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._unmute0.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._unmute0.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._unmute0.style[domTransition]='opacity 0s';
				if (me._unmute0.ggCurrentLogicStateAlpha == 0) {
					me._unmute0.style.visibility=me._unmute0.ggVisible?'inherit':'hidden';
					me._unmute0.style.opacity=1;
				}
				else {
					me._unmute0.style.visibility=me._unmute0.ggVisible?'inherit':'hidden';
					me._unmute0.style.opacity=0.60003;
				}
			}
		}
		me._unmute0.onclick=function (e) {
			player.setVolume("_main",1);
			me._unmute0.style[domTransition]='none';
			me._unmute0.style.visibility='hidden';
			me._unmute0.ggVisible=false;
			me._mute0.style[domTransition]='none';
			me._mute0.style.visibility=(Number(me._mute0.style.opacity)>0||!me._mute0.style.opacity)?'inherit':'hidden';
			me._mute0.ggVisible=true;
		}
		me._unmute0.onmouseover=function (e) {
			me.__8.ggVisible = !me.__8.ggVisible;
			var flag=me.__8.ggVisible;
			me.__8.style[domTransition]='none';
			me.__8.style.visibility=((flag)&&(Number(me.__8.style.opacity)>0||!me.__8.style.opacity))?'inherit':'hidden';
			me.elementMouseOver['unmute0']=true;
			me._unmute0.logicBlock_alpha();
		}
		me._unmute0.onmouseout=function (e) {
			me.__8.style[domTransition]='none';
			me.__8.style.visibility='hidden';
			me.__8.ggVisible=false;
			me.elementMouseOver['unmute0']=false;
			me._unmute0.logicBlock_alpha();
		}
		me._unmute0.ontouchend=function (e) {
			me.elementMouseOver['unmute0']=false;
			me._unmute0.logicBlock_alpha();
		}
		me._unmute0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._button_mute0.appendChild(me._unmute0);
		el=me._mute0=document.createElement('div');
		els=me._mute0__img=document.createElement('img');
		els.className='ggskin ggskin_mute0';
		hs=basePath + 'images/mute0.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="mute";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mute0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mute0.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['mute0'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._mute0.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._mute0.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._mute0.style[domTransition]='opacity 0s';
				if (me._mute0.ggCurrentLogicStateAlpha == 0) {
					me._mute0.style.visibility=me._mute0.ggVisible?'inherit':'hidden';
					me._mute0.style.opacity=1;
				}
				else {
					me._mute0.style.visibility=me._mute0.ggVisible?'inherit':'hidden';
					me._mute0.style.opacity=0.60003;
				}
			}
		}
		me._mute0.onclick=function (e) {
			player.setVolume("_main",0);
			me._mute0.style[domTransition]='none';
			me._mute0.style.visibility='hidden';
			me._mute0.ggVisible=false;
			me._unmute0.style[domTransition]='none';
			me._unmute0.style.visibility=(Number(me._unmute0.style.opacity)>0||!me._unmute0.style.opacity)?'inherit':'hidden';
			me._unmute0.ggVisible=true;
		}
		me._mute0.onmouseover=function (e) {
			me.__9.style[domTransition]='none';
			me.__9.style.visibility=(Number(me.__9.style.opacity)>0||!me.__9.style.opacity)?'inherit':'hidden';
			me.__9.ggVisible=true;
			me.elementMouseOver['mute0']=true;
			me._mute0.logicBlock_alpha();
		}
		me._mute0.onmouseout=function (e) {
			me.__9.style[domTransition]='none';
			me.__9.style.visibility='hidden';
			me.__9.ggVisible=false;
			me.elementMouseOver['mute0']=false;
			me._mute0.logicBlock_alpha();
		}
		me._mute0.ontouchend=function (e) {
			me.elementMouseOver['mute0']=false;
			me._mute0.logicBlock_alpha();
		}
		me._mute0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._button_mute0.appendChild(me._mute0);
		me._rectangle_30.appendChild(me._button_mute0);
		me._controller_pc.appendChild(me._rectangle_30);
		me.divSkin.appendChild(me._controller_pc);
		el=me.__13=document.createElement('div');
		els=me.__13__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u043d\u0438\u0436\u043d\u044f\u044f \u043f\u0430\u043d\u0435\u043b\u044c \u043f\u043a";
		el.ggDy=116;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 66px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 155px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041d\u0418\u0416\u041d\u042f\u042f \u041f\u0410\u041d\u0415\u041b\u042c";
		el.appendChild(els);
		me.__13.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__13.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__13);
		el=me.__12=document.createElement('div');
		els=me.__12__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0430\u0432\u0442\u043e\u0432\u0440\u0430\u0449\u0435\u043d\u0438\u0435 \u043f\u043a";
		el.ggDy=73;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 66px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0410\u0412\u0422\u041e\u0412\u0420\u0410\u0429\u0415\u041d\u0418\u0415";
		el.appendChild(els);
		me.__12.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__12.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__12);
		el=me.__11=document.createElement('div');
		els=me.__11__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0443\u043c\u0435\u043d\u044c\u0448\u0438\u0442\u044c \u043f\u043a";
		el.ggDy=27;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 67px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 110px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0423\u041c\u0415\u041d\u042c\u0428\u0418\u0422\u042c";
		el.appendChild(els);
		me.__11.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__11.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__11);
		el=me.__10=document.createElement('div');
		els=me.__10__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0443\u0432\u0435\u043b\u0438\u0447\u0438\u0442\u044c \u043f\u043a";
		el.ggDy=-16;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 67px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 110px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0423\u0412\u0415\u041b\u0418\u0427\u0418\u0422\u042c";
		el.appendChild(els);
		me.__10.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__10);
		el=me._fullmon_=document.createElement('div');
		els=me._fullmon___text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Fullmon \u043f\u043a";
		el.ggDy=-62;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 67px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 135px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041f\u041e\u041b\u041d\u042b\u0419 \u042d\u041a\u0420\u0410\u041d";
		el.appendChild(els);
		me._fullmon_.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._fullmon_.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._fullmon_);
		el=me.__9=document.createElement('div');
		els=me.__9__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0432\u044b\u043a\u043b \u0437\u0432\u0443\u043a \u043f\u043a";
		el.ggDy=-107;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 67px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0412\u042b\u041a\u041b \u0417\u0412\u0423\u041a";
		el.appendChild(els);
		me.__9.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__9.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__9);
		el=me.__8=document.createElement('div');
		els=me.__8__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0432\u043a\u043b \u0437\u0432\u0443\u043a \u043f\u043a";
		el.ggDy=-107;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 67px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0412\u041a\u041b \u0417\u0412\u0423\u041a";
		el.appendChild(els);
		me.__8.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__8.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__8);
		el=me.__7=document.createElement('div');
		els=me.__7__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u043f\u043e\u0434\u0430\u0442\u044c \u0442\u0440\u0435\u0431\u044b \u043f\u043a";
		el.ggDy=-152;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 67px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 135px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041f\u041e\u0414\u0410\u0422\u042c \u0422\u0420\u0415\u0411\u042b";
		el.appendChild(els);
		me.__7.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__7.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__7);
		el=me.__6=document.createElement('div');
		els=me.__6__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0432\u044b\u0445\u043e\u0434 \u043f\u043a";
		el.ggDy=-198;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 67px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 70px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0412\u042b\u0425\u041e\u0414";
		el.appendChild(els);
		me.__6.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__6.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__6);
		el=me._controller_mobile=document.createElement('div');
		el.ggId="controller_mobile";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100%;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		me._controller_mobile.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controller_mobile.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._controller_mobile.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._controller_mobile.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._controller_mobile.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._controller_mobile.ggCurrentLogicStateScaling == 0) {
					me._controller_mobile.ggParameter.sx = 0.9;
					me._controller_mobile.ggParameter.sy = 0.9;
					me._controller_mobile.style[domTransform]=parameterToTransform(me._controller_mobile.ggParameter);
				}
				else {
					me._controller_mobile.ggParameter.sx = 1;
					me._controller_mobile.ggParameter.sy = 1;
					me._controller_mobile.style[domTransform]=parameterToTransform(me._controller_mobile.ggParameter);
				}
			}
		}
		me._controller_mobile.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._controller_mobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._controller_mobile.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._controller_mobile.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._controller_mobile.ggCurrentLogicStateVisible == 0) {
					me._controller_mobile.style.visibility=(Number(me._controller_mobile.style.opacity)>0||!me._controller_mobile.style.opacity)?'inherit':'hidden';
					me._controller_mobile.ggVisible=true;
				}
				else {
					me._controller_mobile.style.visibility="hidden";
					me._controller_mobile.ggVisible=false;
				}
			}
		}
		me._controller_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._rectangle_3=document.createElement('div');
		el.ggId="Rectangle 3";
		el.ggDy=-36;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 12px;';
		hs+='border-radius : 12px;';
		hs+='background : rgba(145,113,62,0.901961);';
		hs+='border : 0px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 295px;';
		hs+='opacity : 0.49999;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._rectangle_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rectangle_3.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._rectangle_3.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._rectangle_3.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._rectangle_3.style[domTransition]='opacity 0s';
				if (me._rectangle_3.ggCurrentLogicStateVisible == 0) {
					me._rectangle_3.style.visibility=(Number(me._rectangle_3.style.opacity)>0||!me._rectangle_3.style.opacity)?'inherit':'hidden';
					me._rectangle_3.ggVisible=true;
				}
				else {
					me._rectangle_3.style.visibility="hidden";
					me._rectangle_3.ggVisible=false;
				}
			}
		}
		me._rectangle_3.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['rectangle_3'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectangle_3.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectangle_3.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectangle_3.style[domTransition]='opacity 0s';
				if (me._rectangle_3.ggCurrentLogicStateAlpha == 0) {
					me._rectangle_3.style.visibility=me._rectangle_3.ggVisible?'inherit':'hidden';
					me._rectangle_3.style.opacity=1;
				}
				else {
					me._rectangle_3.style.visibility=me._rectangle_3.ggVisible?'inherit':'hidden';
					me._rectangle_3.style.opacity=0.49999;
				}
			}
		}
		me._rectangle_3.onmouseover=function (e) {
			me.elementMouseOver['rectangle_3']=true;
			me._rectangle_3.logicBlock_alpha();
		}
		me._rectangle_3.onmouseout=function (e) {
			me.elementMouseOver['rectangle_3']=false;
			me._rectangle_3.logicBlock_alpha();
		}
		me._rectangle_3.ontouchend=function (e) {
			me.elementMouseOver['rectangle_3']=false;
			me._rectangle_3.logicBlock_alpha();
		}
		me._rectangle_3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._hiidemenu=document.createElement('div');
		els=me._hiidemenu__img=document.createElement('img');
		els.className='ggskin ggskin_hiidemenu';
		hs=basePath + 'images/hiidemenu.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hiidemenu";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 8px;';
		hs+='cursor : pointer;';
		hs+='height : 43px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 43px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hiidemenu.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._hiidemenu.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hiidemenu.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hiidemenu.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hiidemenu.style[domTransition]='opacity 0s';
				if (me._hiidemenu.ggCurrentLogicStateVisible == 0) {
					me._hiidemenu.style.visibility=(Number(me._hiidemenu.style.opacity)>0||!me._hiidemenu.style.opacity)?'inherit':'hidden';
					me._hiidemenu.ggVisible=true;
				}
				else {
					me._hiidemenu.style.visibility="hidden";
					me._hiidemenu.ggVisible=false;
				}
			}
		}
		me._hiidemenu.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['hiidemenu'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hiidemenu.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hiidemenu.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hiidemenu.style[domTransition]='opacity 0s';
				if (me._hiidemenu.ggCurrentLogicStateAlpha == 0) {
					me._hiidemenu.style.visibility=me._hiidemenu.ggVisible?'inherit':'hidden';
					me._hiidemenu.style.opacity=1;
				}
				else {
					me._hiidemenu.style.visibility=me._hiidemenu.ggVisible?'inherit':'hidden';
					me._hiidemenu.style.opacity=0.60003;
				}
			}
		}
		me._hiidemenu.onclick=function (e) {
			var flag=me._minipano.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._minipano.style[domTransition]='none';
			} else {
				me._minipano.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._minipano.style.opacity='1';
				me._minipano.style.visibility=me._minipano.ggVisible?'inherit':'hidden';
			} else {
				me._minipano.style.opacity='0';
				me._minipano.style.visibility='hidden';
			}
			me._minipano.ggOpacitiyActive=!flag;
		}
		me._hiidemenu.onmouseover=function (e) {
			me.__4.style[domTransition]='none';
			me.__4.style.visibility=(Number(me.__4.style.opacity)>0||!me.__4.style.opacity)?'inherit':'hidden';
			me.__4.ggVisible=true;
			me.elementMouseOver['hiidemenu']=true;
			me._hiidemenu.logicBlock_alpha();
		}
		me._hiidemenu.onmouseout=function (e) {
			me.__4.style[domTransition]='none';
			me.__4.style.visibility='hidden';
			me.__4.ggVisible=false;
			me.elementMouseOver['hiidemenu']=false;
			me._hiidemenu.logicBlock_alpha();
		}
		me._hiidemenu.ontouchend=function (e) {
			me.elementMouseOver['hiidemenu']=false;
			me._hiidemenu.logicBlock_alpha();
		}
		me._hiidemenu.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_3.appendChild(me._hiidemenu);
		el=me._giro=document.createElement('div');
		els=me._giro__img=document.createElement('img');
		els.className='ggskin ggskin_giro';
		hs=basePath + 'images/giro.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="giro";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:25,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 50px;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._giro.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._giro.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._giro.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._giro.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._giro.style[domTransition]='opacity 0s';
				if (me._giro.ggCurrentLogicStateVisible == 0) {
					me._giro.style.visibility=(Number(me._giro.style.opacity)>0||!me._giro.style.opacity)?'inherit':'hidden';
					me._giro.ggVisible=true;
				}
				else {
					me._giro.style.visibility="hidden";
					me._giro.ggVisible=false;
				}
			}
		}
		me._giro.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['giro'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._giro.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._giro.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._giro.style[domTransition]='opacity 0s';
				if (me._giro.ggCurrentLogicStateAlpha == 0) {
					me._giro.style.visibility=me._giro.ggVisible?'inherit':'hidden';
					me._giro.style.opacity=1;
				}
				else {
					me._giro.style.visibility=me._giro.ggVisible?'inherit':'hidden';
					me._giro.style.opacity=0.60003;
				}
			}
		}
		me._giro.onclick=function (e) {
			player.setUseGyro(!(player.getUseGyro()));
			var flag=me._giro.ggAngleActive;
			if (player.transitionsDisabled) {
				me._giro.style[domTransition]='none';
			} else {
				me._giro.style[domTransition]='all 2000ms ease-out 0ms';
			}
			if (flag) {
				me._giro.ggParameter.a=25;
				me._giro.style[domTransform]=parameterToTransform(me._giro.ggParameter);
			} else {
				me._giro.ggParameter.a="-25.0000";
				me._giro.style[domTransform]=parameterToTransform(me._giro.ggParameter);
			}
			me._giro.ggAngleActive=!flag;
		}
		me._giro.onmouseover=function (e) {
			me.__3.style[domTransition]='none';
			me.__3.style.visibility=(Number(me.__3.style.opacity)>0||!me.__3.style.opacity)?'inherit':'hidden';
			me.__3.ggVisible=true;
			me.elementMouseOver['giro']=true;
			me._giro.logicBlock_alpha();
		}
		me._giro.onmouseout=function (e) {
			me.__3.style[domTransition]='none';
			me.__3.style.visibility='hidden';
			me.__3.ggVisible=false;
			me.elementMouseOver['giro']=false;
			me._giro.logicBlock_alpha();
		}
		me._giro.ontouchend=function (e) {
			me.elementMouseOver['giro']=false;
			me._giro.logicBlock_alpha();
		}
		me._giro.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_3.appendChild(me._giro);
		el=me._full_windows=document.createElement('div');
		els=me._full_windows__img=document.createElement('img');
		els.className='ggskin ggskin_full_windows';
		hs=basePath + 'images/full_windows.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="full_windows";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 101px;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._full_windows.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._full_windows.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._full_windows.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._full_windows.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._full_windows.style[domTransition]='opacity 0s';
				if (me._full_windows.ggCurrentLogicStateVisible == 0) {
					me._full_windows.style.visibility=(Number(me._full_windows.style.opacity)>0||!me._full_windows.style.opacity)?'inherit':'hidden';
					me._full_windows.ggVisible=true;
				}
				else {
					me._full_windows.style.visibility="hidden";
					me._full_windows.ggVisible=false;
				}
			}
		}
		me._full_windows.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['full_windows'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._full_windows.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._full_windows.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._full_windows.style[domTransition]='opacity 0s';
				if (me._full_windows.ggCurrentLogicStateAlpha == 0) {
					me._full_windows.style.visibility=me._full_windows.ggVisible?'inherit':'hidden';
					me._full_windows.style.opacity=1;
				}
				else {
					me._full_windows.style.visibility=me._full_windows.ggVisible?'inherit':'hidden';
					me._full_windows.style.opacity=0.60003;
				}
			}
		}
		me._full_windows.onclick=function (e) {
			player.toggleFullscreen();
		}
		me._full_windows.onmouseover=function (e) {
			me.elementMouseOver['full_windows']=true;
			me._full_windows.logicBlock_alpha();
		}
		me._full_windows.onmouseout=function (e) {
			me.elementMouseOver['full_windows']=false;
			me._full_windows.logicBlock_alpha();
		}
		me._full_windows.ontouchend=function (e) {
			me.elementMouseOver['full_windows']=false;
			me._full_windows.logicBlock_alpha();
		}
		me._full_windows.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_3.appendChild(me._full_windows);
		el=me.__5=document.createElement('div');
		els=me.__5__img=document.createElement('img');
		els.className='ggskin ggskin__5';
		hs=basePath + 'images/_5.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="\u0442\u0440\u0435\u0431\u044b";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 194px;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__5.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me.__5.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me.__5.ggCurrentLogicStateVisible = newLogicStateVisible;
				me.__5.style[domTransition]='opacity 0s';
				if (me.__5.ggCurrentLogicStateVisible == 0) {
					me.__5.style.visibility=(Number(me.__5.style.opacity)>0||!me.__5.style.opacity)?'inherit':'hidden';
					me.__5.ggVisible=true;
				}
				else {
					me.__5.style.visibility="hidden";
					me.__5.ggVisible=false;
				}
			}
		}
		me.__5.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['_5'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me.__5.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me.__5.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me.__5.style[domTransition]='opacity 0s';
				if (me.__5.ggCurrentLogicStateAlpha == 0) {
					me.__5.style.visibility=me.__5.ggVisible?'inherit':'hidden';
					me.__5.style.opacity=1;
				}
				else {
					me.__5.style.visibility=me.__5.ggVisible?'inherit':'hidden';
					me.__5.style.opacity=0.60003;
				}
			}
		}
		me.__5.onclick=function (e) {
			player.openUrl("https:\/\/cherdinmonastir.ru\/treby","_blank");
		}
		me.__5.onmouseover=function (e) {
			me.__0.style[domTransition]='none';
			me.__0.style.visibility=(Number(me.__0.style.opacity)>0||!me.__0.style.opacity)?'inherit':'hidden';
			me.__0.ggVisible=true;
			me.elementMouseOver['_5']=true;
			me.__5.logicBlock_alpha();
		}
		me.__5.onmouseout=function (e) {
			me.__0.style[domTransition]='none';
			me.__0.style.visibility='hidden';
			me.__0.ggVisible=false;
			me.elementMouseOver['_5']=false;
			me.__5.logicBlock_alpha();
		}
		me.__5.ontouchend=function (e) {
			me.elementMouseOver['_5']=false;
			me.__5.logicBlock_alpha();
		}
		me.__5.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_3.appendChild(me.__5);
		el=me._exit=document.createElement('div');
		els=me._exit__img=document.createElement('img');
		els.className='ggskin ggskin_exit';
		hs=basePath + 'images/exit.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('alt','\u0412\u042b\u0425\u041e\u0414');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="exit";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 241px;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60003;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._exit.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._exit.logicBlock_angle = function() {
			var newLogicStateAngle;
			if (
				((me.elementMouseOver['exit'] == true))
			)
			{
				newLogicStateAngle = 0;
			}
			else {
				newLogicStateAngle = -1;
			}
			if (me._exit.ggCurrentLogicStateAngle != newLogicStateAngle) {
				me._exit.ggCurrentLogicStateAngle = newLogicStateAngle;
				me._exit.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms';
				if (me._exit.ggCurrentLogicStateAngle == 0) {
					me._exit.ggParameter.a = 90;
					me._exit.style[domTransform]=parameterToTransform(me._exit.ggParameter);
				}
				else {
					me._exit.ggParameter.a = 0;
					me._exit.style[domTransform]=parameterToTransform(me._exit.ggParameter);
				}
			}
		}
		me._exit.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._exit.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._exit.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._exit.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms';
				if (me._exit.ggCurrentLogicStateVisible == 0) {
					me._exit.style.visibility=(Number(me._exit.style.opacity)>0||!me._exit.style.opacity)?'inherit':'hidden';
					me._exit.ggVisible=true;
				}
				else {
					me._exit.style.visibility="hidden";
					me._exit.ggVisible=false;
				}
			}
		}
		me._exit.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['exit'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._exit.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._exit.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._exit.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms';
				if (me._exit.ggCurrentLogicStateAlpha == 0) {
					me._exit.style.visibility=me._exit.ggVisible?'inherit':'hidden';
					me._exit.style.opacity=1;
				}
				else {
					me._exit.style.visibility=me._exit.ggVisible?'inherit':'hidden';
					me._exit.style.opacity=0.60003;
				}
			}
		}
		me._exit.onclick=function (e) {
			player.openUrl("https:\/\/cherdinmonastir.ru\/","_self");
		}
		me._exit.onmouseover=function (e) {
			me.__.style[domTransition]='none';
			me.__.style.visibility=(Number(me.__.style.opacity)>0||!me.__.style.opacity)?'inherit':'hidden';
			me.__.ggVisible=true;
			me.elementMouseOver['exit']=true;
			me._exit.logicBlock_angle();
			me._exit.logicBlock_alpha();
		}
		me._exit.onmouseout=function (e) {
			me.__.style[domTransition]='none';
			me.__.style.visibility='hidden';
			me.__.ggVisible=false;
			me.elementMouseOver['exit']=false;
			me._exit.logicBlock_angle();
			me._exit.logicBlock_alpha();
		}
		me._exit.ontouchend=function (e) {
			me.elementMouseOver['exit']=false;
			me._exit.logicBlock_angle();
			me._exit.logicBlock_alpha();
		}
		me._exit.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._rectangle_3.appendChild(me._exit);
		el=me._button_mute=document.createElement('div');
		el.ggId="button_mute";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 148px;';
		hs+='height : 44px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 44px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_mute.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_mute.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._button_mute.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._button_mute.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._button_mute.style[domTransition]='';
				if (me._button_mute.ggCurrentLogicStateVisible == 0) {
					me._button_mute.style.visibility=(Number(me._button_mute.style.opacity)>0||!me._button_mute.style.opacity)?'inherit':'hidden';
					me._button_mute.ggVisible=true;
				}
				else {
					me._button_mute.style.visibility="hidden";
					me._button_mute.ggVisible=false;
				}
			}
		}
		me._button_mute.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._unmute=document.createElement('div');
		els=me._unmute__img=document.createElement('img');
		els.className='ggskin ggskin_unmute';
		hs=basePath + 'images/unmute.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="unmute";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.59999;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._unmute.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._unmute.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['unmute'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._unmute.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._unmute.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._unmute.style[domTransition]='opacity 1000ms ease 0ms';
				if (me._unmute.ggCurrentLogicStateAlpha == 0) {
					me._unmute.style.visibility=me._unmute.ggVisible?'inherit':'hidden';
					me._unmute.style.opacity=1;
				}
				else {
					me._unmute.style.visibility=me._unmute.ggVisible?'inherit':'hidden';
					me._unmute.style.opacity=0.59999;
				}
			}
		}
		me._unmute.onclick=function (e) {
			player.setVolume("_main",1);
			me._unmute.style[domTransition]='none';
			me._unmute.style.visibility='hidden';
			me._unmute.ggVisible=false;
			me._mute.style[domTransition]='none';
			me._mute.style.visibility=(Number(me._mute.style.opacity)>0||!me._mute.style.opacity)?'inherit':'hidden';
			me._mute.ggVisible=true;
		}
		me._unmute.onmouseover=function (e) {
			me.__1.style[domTransition]='none';
			me.__1.style.visibility=(Number(me.__1.style.opacity)>0||!me.__1.style.opacity)?'inherit':'hidden';
			me.__1.ggVisible=true;
			me.elementMouseOver['unmute']=true;
			me._unmute.logicBlock_alpha();
		}
		me._unmute.onmouseout=function (e) {
			me.__1.style[domTransition]='none';
			me.__1.style.visibility='hidden';
			me.__1.ggVisible=false;
			me.elementMouseOver['unmute']=false;
			me._unmute.logicBlock_alpha();
		}
		me._unmute.ontouchend=function (e) {
			me.elementMouseOver['unmute']=false;
			me._unmute.logicBlock_alpha();
		}
		me._unmute.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._button_mute.appendChild(me._unmute);
		el=me._mute=document.createElement('div');
		els=me._mute__img=document.createElement('img');
		els.className='ggskin ggskin_mute';
		hs=basePath + 'images/mute.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="mute";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.59999;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mute.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mute.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['mute'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._mute.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._mute.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._mute.style[domTransition]='opacity 1000ms ease 0ms';
				if (me._mute.ggCurrentLogicStateAlpha == 0) {
					me._mute.style.visibility=me._mute.ggVisible?'inherit':'hidden';
					me._mute.style.opacity=1;
				}
				else {
					me._mute.style.visibility=me._mute.ggVisible?'inherit':'hidden';
					me._mute.style.opacity=0.59999;
				}
			}
		}
		me._mute.onclick=function (e) {
			player.setVolume("_main",0);
			me._mute.style[domTransition]='none';
			me._mute.style.visibility='hidden';
			me._mute.ggVisible=false;
			me._unmute.style[domTransition]='none';
			me._unmute.style.visibility=(Number(me._unmute.style.opacity)>0||!me._unmute.style.opacity)?'inherit':'hidden';
			me._unmute.ggVisible=true;
		}
		me._mute.onmouseover=function (e) {
			me.__2.style[domTransition]='none';
			me.__2.style.visibility=(Number(me.__2.style.opacity)>0||!me.__2.style.opacity)?'inherit':'hidden';
			me.__2.ggVisible=true;
			me.elementMouseOver['mute']=true;
			me._mute.logicBlock_alpha();
		}
		me._mute.onmouseout=function (e) {
			me.__2.style[domTransition]='none';
			me.__2.style.visibility='hidden';
			me.__2.ggVisible=false;
			me.elementMouseOver['mute']=false;
			me._mute.logicBlock_alpha();
		}
		me._mute.ontouchend=function (e) {
			me.elementMouseOver['mute']=false;
			me._mute.logicBlock_alpha();
		}
		me._mute.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._button_mute.appendChild(me._mute);
		me._rectangle_3.appendChild(me._button_mute);
		me._controller_mobile.appendChild(me._rectangle_3);
		me.divSkin.appendChild(me._controller_mobile);
		el=me.__4=document.createElement('div');
		els=me.__4__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u043d\u0438\u0436\u043d\u044f\u044f \u043f\u0430\u043d\u0435\u043b\u044c \u043c\u043e\u0431";
		el.ggDy=85;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 85px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 155px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041d\u0418\u0416\u041d\u042f\u042f \u041f\u0410\u041d\u0415\u041b\u042c";
		el.appendChild(els);
		me.__4.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__4.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__4);
		el=me.__3=document.createElement('div');
		els=me.__3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0433\u0438\u0440\u043e\u0441\u043a\u043e\u043f \u043c\u043e\u0431";
		el.ggDy=39;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 84px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 135px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0412\u041a\u041b \u0413\u0418\u0420\u041e\u0421\u041a\u041e\u041f";
		el.appendChild(els);
		me.__3.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__3);
		el=me.__2=document.createElement('div');
		els=me.__2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0432\u044b\u043a\u043b \u0437\u0432\u0443\u043a \u043c\u043e\u0431";
		el.ggDy=-59;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 85px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0412\u042b\u041a\u041b \u0417\u0412\u0423\u041a";
		el.appendChild(els);
		me.__2.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__2);
		el=me.__1=document.createElement('div');
		els=me.__1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0432\u043a\u043b \u0437\u0432\u0443\u043a \u043c\u043e\u0431";
		el.ggDy=-59;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 85px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0412\u041a\u041b \u0417\u0412\u0423\u041a";
		el.appendChild(els);
		me.__1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__1);
		el=me.__0=document.createElement('div');
		els=me.__0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u043f\u043e\u0434\u0430\u0442\u044c \u0442\u0440\u0435\u0431\u044b \u043c\u043e\u0431";
		el.ggDy=-105;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 82px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 135px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 4px 8px 4px 8px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041f\u041e\u0414\u0410\u0422\u042c \u0422\u0420\u0415\u0411\u042b";
		el.appendChild(els);
		me.__0.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__0);
		el=me.__=document.createElement('div');
		els=me.____text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="\u0432\u044b\u0445\u043e\u0434 \u043c\u043e\u0431\u0438\u043b";
		el.ggDy=-151;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1.2,sy:1.2 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 27px;';
		hs+='position : absolute;';
		hs+='right : 85px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 70px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='border: 0px solid rgba(0,0,0,0);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 7px;';
		hs+=cssPrefix + 'border-radius: 7px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 6px 7px 6px 7px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0412\u042b\u0425\u041e\u0414";
		el.appendChild(els);
		me.__.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__.onmouseover=function (e) {
			var flag=me.__.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me.__.style[domTransition]='none';
			} else {
				me.__.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__.style.opacity='1';
				me.__.style.visibility=me.__.ggVisible?'inherit':'hidden';
			} else {
				me.__.style.opacity='1';
				me.__.style.visibility=me.__.ggVisible?'inherit':'hidden';
			}
			me.__.ggOpacitiyActive=!flag;
		}
		me.__.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me.__);
		el=me._timer_1=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=1000;
		el.ggId="Timer 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 346px;';
		hs+='position : absolute;';
		hs+='top : 464px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_1.ggIsActive=function() {
			return (me._timer_1.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._timer_1.ggTimestamp) / me._timer_1.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_1.ggActivate=function () {
			player.setVariableValue('ht_anivar1', true);
		}
		me._timer_1.ggDeactivate=function () {
			player.setVariableValue('ht_anivar1', false);
		}
		me._timer_1.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_1);
		el=me._tooltipw=document.createElement('div');
		els=me._tooltipw__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltipw";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : -60px;';
		hs+='visibility : hidden;';
		hs+='width : 160px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 164px;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='background: rgba(145,113,62,0.901961);';
		hs+='border: 2px solid #644d2a;';
		hs+='border: 2px solid rgba(100,77,42,0.901961);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tooltipw.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._tooltipw.onmouseover=function (e) {
			me._tooltipw.ggText="<b>"+player.hotspot.title+"<\/b>";
			me._tooltipw.ggTextDiv.innerHTML=me._tooltipw.ggText;
			if (me._tooltipw.ggUpdateText) {
				me._tooltipw.ggUpdateText=function() {
					var hs="<b>"+player.hotspot.title+"<\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltipw.ggUpdatePosition) {
				me._tooltipw.ggUpdatePosition();
			}
			me._tooltipw.ggTextDiv.scrollTop = 0;
		}
		me._tooltipw.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._tooltipw);
		el=me._textud=document.createElement('div');
		els=me._textud__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="TextUD";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 50px;';
		hs+='opacity : 0.80001;';
		hs+='position : absolute;';
		hs+='right : 20px;';
		hs+='top : 20px;';
		hs+='visibility : inherit;';
		hs+='width : 250px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='background: rgba(145,113,62,0.901961);';
		hs+='border: 1px solid #644d2a;';
		hs+='border: 1px solid rgba(100,77,42,0.901961);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 7px 10px 7px 10px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._textud.ggUpdateText=function() {
			var hs="<span style=\"font-size: 14px;\">"+me.ggUserdata.title+"<\/span>";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._textud.ggUpdateText();
		player.addListener('changenode', function() {
			me._textud.ggUpdateText();
		});
		el.appendChild(els);
		me._textud.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._textud.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._textud.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._textud.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._textud.style[domTransition]='';
				if (me._textud.ggCurrentLogicStateVisible == 0) {
					me._textud.style.visibility="hidden";
					me._textud.ggVisible=false;
				}
				else {
					me._textud.style.visibility=(Number(me._textud.style.opacity)>0||!me._textud.style.opacity)?'inherit':'hidden';
					me._textud.ggVisible=true;
				}
			}
		}
		me._textud.ggActivate=function () {
			me._textud.style[domTransition]='none';
			me._textud.style.visibility=(Number(me._textud.style.opacity)>0||!me._textud.style.opacity)?'inherit':'hidden';
			me._textud.ggVisible=true;
		}
		me._textud.ggUpdatePosition=function (useTransition) {
		}
		me._textud.ggNodeChange=function () {
			if (me._textud.ggLastIsActive!=me._textud.ggIsActive()) {
				me._textud.ggLastIsActive=me._textud.ggIsActive();
				if (me._textud.ggIsActive()) {
					if (me._textud.ggActivate) me._textud.ggActivate();
				} else {
					if (me._textud.ggDeactivate) me._textud.ggDeactivate();
				}
			}
		}
		me.divSkin.appendChild(me._textud);
		el=me._textudmobile=document.createElement('div');
		els=me._textudmobile__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="TextUDmobile";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.80001;';
		hs+='position : absolute;';
		hs+='top : 20px;';
		hs+='visibility : hidden;';
		hs+='width : 250px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='background: rgba(145,113,62,0.901961);';
		hs+='border: 1px solid #644d2a;';
		hs+='border: 1px solid rgba(100,77,42,0.901961);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 8px;';
		hs+=cssPrefix + 'border-radius: 8px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 9px 10px 9px 10px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._textudmobile.ggUpdateText=function() {
			var hs="<span style=\"font-size: 12px;\">"+me.ggUserdata.title+"<\/span>";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._textudmobile.ggUpdateText();
		player.addListener('changenode', function() {
			me._textudmobile.ggUpdateText();
		});
		el.appendChild(els);
		me._textudmobile.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._textudmobile.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._textudmobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._textudmobile.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._textudmobile.style[domTransition]='';
				if (me._textudmobile.ggCurrentLogicStateVisible == 0) {
					me._textudmobile.style.visibility=(Number(me._textudmobile.style.opacity)>0||!me._textudmobile.style.opacity)?'inherit':'hidden';
					me._textudmobile.ggVisible=true;
				}
				else {
					me._textudmobile.style.visibility="hidden";
					me._textudmobile.ggVisible=false;
				}
			}
		}
		me._textudmobile.ggActivate=function () {
			me._textudmobile.style[domTransition]='none';
			me._textudmobile.style.visibility=(Number(me._textudmobile.style.opacity)>0||!me._textudmobile.style.opacity)?'inherit':'hidden';
			me._textudmobile.ggVisible=true;
		}
		me._textudmobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((252-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._textudmobile.ggNodeChange=function () {
			if (me._textudmobile.ggLastIsActive!=me._textudmobile.ggIsActive()) {
				me._textudmobile.ggLastIsActive=me._textudmobile.ggIsActive();
				if (me._textudmobile.ggIsActive()) {
					if (me._textudmobile.ggActivate) me._textudmobile.ggActivate();
				} else {
					if (me._textudmobile.ggDeactivate) me._textudmobile.ggDeactivate();
				}
			}
		}
		me.divSkin.appendChild(me._textudmobile);
		el=me._logo=document.createElement('div');
		els=me._logo__img=document.createElement('img');
		els.className='ggskin ggskin_logo';
		hs=basePath + 'images/logo.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="LOGO";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.5,sy:0.5 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 105px;';
		hs+='left : 15px;';
		hs+='opacity : 0.59999;';
		hs+='position : absolute;';
		hs+='top : 15px;';
		hs+='visibility : inherit;';
		hs+='width : 600px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._logo.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._logo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._logo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._logo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._logo.style[domTransition]='';
				if (me._logo.ggCurrentLogicStateVisible == 0) {
					me._logo.style.visibility="hidden";
					me._logo.ggVisible=false;
				}
				else {
					me._logo.style.visibility=(Number(me._logo.style.opacity)>0||!me._logo.style.opacity)?'inherit':'hidden';
					me._logo.ggVisible=true;
				}
			}
		}
		me._logo.onclick=function (e) {
			player.openUrl("https:\/\/cherdinmonastir.ru\/o-monastyre","_blank");
		}
		me._logo.onmouseover=function (e) {
			if (player.transitionsDisabled) {
				me._logo.style[domTransition]='none';
			} else {
				me._logo.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me._logo.style.opacity='1';
			me._logo.style.visibility=me._logo.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._logo.style[domTransition]='none';
			} else {
				me._logo.style[domTransition]='all 2000ms ease-out 0ms';
			}
			me._logo.ggParameter.sx=1;me._logo.ggParameter.sy=1;
			me._logo.style[domTransform]=parameterToTransform(me._logo.ggParameter);
		}
		me._logo.onmouseout=function (e) {
			if (player.transitionsDisabled) {
				me._logo.style[domTransition]='none';
			} else {
				me._logo.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me._logo.style.opacity='0.6';
			me._logo.style.visibility=me._logo.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._logo.style[domTransition]='none';
			} else {
				me._logo.style[domTransition]='all 2000ms ease-out 0ms';
			}
			me._logo.ggParameter.sx=0.6;me._logo.ggParameter.sy=0.6;
			me._logo.style[domTransform]=parameterToTransform(me._logo.ggParameter);
		}
		me._logo.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._logo);
		el=me._container_1=document.createElement('div');
		el.ggId="Container 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.ggNodeChange=function () {
			history.replaceState({}, player.userdata.title, location.href.replace(location.hash,"") + '#' + player.getCurrentNode());
		}
		me.divSkin.appendChild(me._container_1);
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			me._thumbnail_cloner.ggUpdate();
		});
		player.addListener('imagesready', function() {
			me._minipano.ggUpdatePosition();
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
		me._tooltipw.onmouseover();
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_up_changenode = function(){
		if(hotspotTemplates['up']) {
			var i;
			for(i = 0; i < hotspotTemplates['up'].length; i++) {
				if (hotspotTemplates['up'][i]._rectangle_10 && hotspotTemplates['up'][i]._rectangle_10.logicBlock_alpha) {
					hotspotTemplates['up'][i]._rectangle_10.logicBlock_alpha();
				}
				if (hotspotTemplates['up'][i]._rectangle_10 && hotspotTemplates['up'][i]._rectangle_10.logicBlock_scaling) {
					hotspotTemplates['up'][i]._rectangle_10.logicBlock_scaling();
				}
				if (hotspotTemplates['up'][i]._rectangle_10 && hotspotTemplates['up'][i]._rectangle_10.logicBlock_bordercolor) {
					hotspotTemplates['up'][i]._rectangle_10.logicBlock_bordercolor();
				}
				if (hotspotTemplates['up'][i]._rectangle_20 && hotspotTemplates['up'][i]._rectangle_20.logicBlock_alpha) {
					hotspotTemplates['up'][i]._rectangle_20.logicBlock_alpha();
				}
				if (hotspotTemplates['up'][i]._rectangle_20 && hotspotTemplates['up'][i]._rectangle_20.logicBlock_scaling) {
					hotspotTemplates['up'][i]._rectangle_20.logicBlock_scaling();
				}
				if (hotspotTemplates['up'][i]._rectangle_20 && hotspotTemplates['up'][i]._rectangle_20.logicBlock_bordercolor) {
					hotspotTemplates['up'][i]._rectangle_20.logicBlock_bordercolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_up_varchanged_ht_anivar1 = function(){
		if(hotspotTemplates['up']) {
			var i;
			for(i = 0; i < hotspotTemplates['up'].length; i++) {
				if (hotspotTemplates['up'][i]._rectangle_10 && hotspotTemplates['up'][i]._rectangle_10.logicBlock_alpha) {
					hotspotTemplates['up'][i]._rectangle_10.logicBlock_alpha();
				}
				if (hotspotTemplates['up'][i]._rectangle_10 && hotspotTemplates['up'][i]._rectangle_10.logicBlock_scaling) {
					hotspotTemplates['up'][i]._rectangle_10.logicBlock_scaling();
				}
				if (hotspotTemplates['up'][i]._rectangle_10 && hotspotTemplates['up'][i]._rectangle_10.logicBlock_bordercolor) {
					hotspotTemplates['up'][i]._rectangle_10.logicBlock_bordercolor();
				}
				if (hotspotTemplates['up'][i]._rectangle_20 && hotspotTemplates['up'][i]._rectangle_20.logicBlock_alpha) {
					hotspotTemplates['up'][i]._rectangle_20.logicBlock_alpha();
				}
				if (hotspotTemplates['up'][i]._rectangle_20 && hotspotTemplates['up'][i]._rectangle_20.logicBlock_scaling) {
					hotspotTemplates['up'][i]._rectangle_20.logicBlock_scaling();
				}
				if (hotspotTemplates['up'][i]._rectangle_20 && hotspotTemplates['up'][i]._rectangle_20.logicBlock_bordercolor) {
					hotspotTemplates['up'][i]._rectangle_20.logicBlock_bordercolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_up_air_changenode = function(){
		if(hotspotTemplates['up_air']) {
			var i;
			for(i = 0; i < hotspotTemplates['up_air'].length; i++) {
				if (hotspotTemplates['up_air'][i]._rectangle_1 && hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_alpha) {
					hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_alpha();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_1 && hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_scaling) {
					hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_scaling();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_1 && hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_bordercolor) {
					hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_bordercolor();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_2 && hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_alpha) {
					hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_alpha();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_2 && hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_scaling) {
					hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_scaling();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_2 && hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_bordercolor) {
					hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_bordercolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_up_air_varchanged_ht_anivar1 = function(){
		if(hotspotTemplates['up_air']) {
			var i;
			for(i = 0; i < hotspotTemplates['up_air'].length; i++) {
				if (hotspotTemplates['up_air'][i]._rectangle_1 && hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_alpha) {
					hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_alpha();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_1 && hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_scaling) {
					hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_scaling();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_1 && hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_bordercolor) {
					hotspotTemplates['up_air'][i]._rectangle_1.logicBlock_bordercolor();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_2 && hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_alpha) {
					hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_alpha();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_2 && hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_scaling) {
					hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_scaling();
				}
				if (hotspotTemplates['up_air'][i]._rectangle_2 && hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_bordercolor) {
					hotspotTemplates['up_air'][i]._rectangle_2.logicBlock_bordercolor();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		if (me.elementMouseDown['zoom_out']) {
			player.changeFovLog(1,true);
		}
		if (me.elementMouseDown['zoom_in']) {
			player.changeFovLog(-1,true);
		}
		if (me._timer_1.ggLastIsActive!=me._timer_1.ggIsActive()) {
			me._timer_1.ggLastIsActive=me._timer_1.ggIsActive();
			if (me._timer_1.ggLastIsActive) {
				player.setVariableValue('ht_anivar1', true);
			} else {
				player.setVariableValue('ht_anivar1', false);
			}
		}
		var hs='';
		if (me._tooltipw.ggParameter) {
			hs+=parameterToTransform(me._tooltipw.ggParameter) + ' ';
		}
		hs+='translate(' + (1 * player.mouse.x + 0) + 'px,0px) ';
		hs+='translate(0px,' + (1 * player.mouse.y + 0) + 'px) ';
		me._tooltipw.style[domTransform]=hs;
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_up(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._up=document.createElement('div');
		el.ggId="up";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._up.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._up.onclick=function (e) {
				player.playSound("legkiy-perehod-s-audio-na-titryi-39287","1");
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._up.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._up.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._up.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._up.ggUpdatePosition=function (useTransition) {
		}
		el=me._upanicircle0=document.createElement('div');
		el.ggId="upanicircle";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 90px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._upanicircle0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._upanicircle0.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin._tooltipw.style[domTransition]='none';
			skin._tooltipw.style.visibility='hidden';
			skin._tooltipw.ggVisible=false;
		}
		me._upanicircle0.onmouseover=function (e) {
			player.stopAutorotate();
			skin._tooltipw.style[domTransition]='none';
			skin._tooltipw.style.visibility=(Number(skin._tooltipw.style.opacity)>0||!skin._tooltipw.style.opacity)?'inherit':'hidden';
			skin._tooltipw.ggVisible=true;
		}
		me._upanicircle0.onmouseout=function (e) {
			player.startAutorotate("0.02","4");
			skin._tooltipw.style[domTransition]='none';
			skin._tooltipw.style.visibility='hidden';
			skin._tooltipw.ggVisible=false;
		}
		me._upanicircle0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._rectangle_10=document.createElement('div');
		el.ggId="Rectangle 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.4,sy:0.4 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 3px solid #ffffff;';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 90px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._rectangle_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._rectangle_10.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._rectangle_10.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._rectangle_10.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._rectangle_10.style[domTransition]='' + cssPrefix + 'transform 2000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_10.ggCurrentLogicStateScaling == 0) {
					me._rectangle_10.ggParameter.sx = 0.1;
					me._rectangle_10.ggParameter.sy = 0.1;
					me._rectangle_10.style[domTransform]=parameterToTransform(me._rectangle_10.ggParameter);
				}
				else {
					me._rectangle_10.ggParameter.sx = 0.4;
					me._rectangle_10.ggParameter.sy = 0.4;
					me._rectangle_10.style[domTransform]=parameterToTransform(me._rectangle_10.ggParameter);
				}
			}
		}
		me._rectangle_10.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectangle_10.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectangle_10.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectangle_10.style[domTransition]='' + cssPrefix + 'transform 2000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_10.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._rectangle_10.style.opacity == 0.0) { me._rectangle_10.style.visibility="hidden"; } }, 1005);
					me._rectangle_10.style.opacity=0;
				}
				else {
					me._rectangle_10.style.visibility=me._rectangle_10.ggVisible?'inherit':'hidden';
					me._rectangle_10.style.opacity=1;
				}
			}
		}
		me._rectangle_10.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._rectangle_10.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._rectangle_10.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._rectangle_10.style[domTransition]='' + cssPrefix + 'transform 2000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_10.ggCurrentLogicStateBorderColor == 0) {
					me._rectangle_10.style.borderColor="rgba(71,54,29,1)";
				}
				else {
					me._rectangle_10.style.borderColor="rgba(255,255,255,1)";
				}
			}
		}
		me._rectangle_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._upanicircle0.appendChild(me._rectangle_10);
		el=me._rectangle_20=document.createElement('div');
		el.ggId="Rectangle 2";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.6,sy:0.6 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 4px solid #644d2a;';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60001;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 90px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._rectangle_20.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._rectangle_20.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._rectangle_20.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._rectangle_20.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._rectangle_20.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_20.ggCurrentLogicStateScaling == 0) {
					me._rectangle_20.ggParameter.sx = 0.1;
					me._rectangle_20.ggParameter.sy = 0.1;
					me._rectangle_20.style[domTransform]=parameterToTransform(me._rectangle_20.ggParameter);
				}
				else {
					me._rectangle_20.ggParameter.sx = 0.6;
					me._rectangle_20.ggParameter.sy = 0.6;
					me._rectangle_20.style[domTransform]=parameterToTransform(me._rectangle_20.ggParameter);
				}
			}
		}
		me._rectangle_20.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectangle_20.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectangle_20.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectangle_20.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_20.ggCurrentLogicStateAlpha == 0) {
					me._rectangle_20.style.visibility=me._rectangle_20.ggVisible?'inherit':'hidden';
					me._rectangle_20.style.opacity=1;
				}
				else {
					me._rectangle_20.style.visibility=me._rectangle_20.ggVisible?'inherit':'hidden';
					me._rectangle_20.style.opacity=0.60001;
				}
			}
		}
		me._rectangle_20.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._rectangle_20.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._rectangle_20.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._rectangle_20.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_20.ggCurrentLogicStateBorderColor == 0) {
					me._rectangle_20.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._rectangle_20.style.borderColor="rgba(100,77,42,1)";
				}
			}
		}
		me._rectangle_20.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._upanicircle0.appendChild(me._rectangle_20);
		me._up.appendChild(me._upanicircle0);
		me.__div = me._up;
	};
	function SkinHotspotClass_up_air(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._up_air=document.createElement('div');
		el.ggId="up_air";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._up_air.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._up_air.onclick=function (e) {
				player.playSound("legkiy-perehod-s-audio-na-titryi-39287","1");
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._up_air.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._up_air.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._up_air.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._up_air.ggUpdatePosition=function (useTransition) {
		}
		el=me._upanicircle=document.createElement('div');
		el.ggId="upanicircle";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 90px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._upanicircle.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._upanicircle.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin._tooltipw.style[domTransition]='none';
			skin._tooltipw.style.visibility='hidden';
			skin._tooltipw.ggVisible=false;
		}
		me._upanicircle.onmouseover=function (e) {
			player.stopAutorotate();
			skin._tooltipw.style[domTransition]='none';
			skin._tooltipw.style.visibility=(Number(skin._tooltipw.style.opacity)>0||!skin._tooltipw.style.opacity)?'inherit':'hidden';
			skin._tooltipw.ggVisible=true;
		}
		me._upanicircle.onmouseout=function (e) {
			player.startAutorotate("0.02","4");
			skin._tooltipw.style[domTransition]='none';
			skin._tooltipw.style.visibility='hidden';
			skin._tooltipw.ggVisible=false;
		}
		me._upanicircle.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image_1';
		hs=basePath + 'images/image_1.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._upanicircle.appendChild(me._image_1);
		el=me._rectangle_1=document.createElement('div');
		el.ggId="Rectangle 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.4,sy:0.4 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 3px solid #ffffff;';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 90px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._rectangle_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._rectangle_1.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._rectangle_1.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._rectangle_1.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._rectangle_1.style[domTransition]='' + cssPrefix + 'transform 2000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_1.ggCurrentLogicStateScaling == 0) {
					me._rectangle_1.ggParameter.sx = 0.1;
					me._rectangle_1.ggParameter.sy = 0.1;
					me._rectangle_1.style[domTransform]=parameterToTransform(me._rectangle_1.ggParameter);
				}
				else {
					me._rectangle_1.ggParameter.sx = 0.4;
					me._rectangle_1.ggParameter.sy = 0.4;
					me._rectangle_1.style[domTransform]=parameterToTransform(me._rectangle_1.ggParameter);
				}
			}
		}
		me._rectangle_1.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectangle_1.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectangle_1.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectangle_1.style[domTransition]='' + cssPrefix + 'transform 2000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_1.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._rectangle_1.style.opacity == 0.0) { me._rectangle_1.style.visibility="hidden"; } }, 1005);
					me._rectangle_1.style.opacity=0;
				}
				else {
					me._rectangle_1.style.visibility=me._rectangle_1.ggVisible?'inherit':'hidden';
					me._rectangle_1.style.opacity=1;
				}
			}
		}
		me._rectangle_1.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._rectangle_1.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._rectangle_1.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._rectangle_1.style[domTransition]='' + cssPrefix + 'transform 2000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_1.ggCurrentLogicStateBorderColor == 0) {
					me._rectangle_1.style.borderColor="rgba(71,54,29,1)";
				}
				else {
					me._rectangle_1.style.borderColor="rgba(255,255,255,1)";
				}
			}
		}
		me._rectangle_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._upanicircle.appendChild(me._rectangle_1);
		el=me._rectangle_2=document.createElement('div');
		el.ggId="Rectangle 2";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.6,sy:0.6 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 4px solid #644d2a;';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.60001;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 90px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._rectangle_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._rectangle_2.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._rectangle_2.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._rectangle_2.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._rectangle_2.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_2.ggCurrentLogicStateScaling == 0) {
					me._rectangle_2.ggParameter.sx = 0.1;
					me._rectangle_2.ggParameter.sy = 0.1;
					me._rectangle_2.style[domTransform]=parameterToTransform(me._rectangle_2.ggParameter);
				}
				else {
					me._rectangle_2.ggParameter.sx = 0.6;
					me._rectangle_2.ggParameter.sy = 0.6;
					me._rectangle_2.style[domTransform]=parameterToTransform(me._rectangle_2.ggParameter);
				}
			}
		}
		me._rectangle_2.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectangle_2.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectangle_2.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectangle_2.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_2.ggCurrentLogicStateAlpha == 0) {
					me._rectangle_2.style.visibility=me._rectangle_2.ggVisible?'inherit':'hidden';
					me._rectangle_2.style.opacity=1;
				}
				else {
					me._rectangle_2.style.visibility=me._rectangle_2.ggVisible?'inherit':'hidden';
					me._rectangle_2.style.opacity=0.60001;
				}
			}
		}
		me._rectangle_2.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((player.getVariableValue('ht_anivar1') == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._rectangle_2.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._rectangle_2.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._rectangle_2.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms, opacity 1000ms ease 0ms, border-color 1000ms ease 0ms';
				if (me._rectangle_2.ggCurrentLogicStateBorderColor == 0) {
					me._rectangle_2.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._rectangle_2.style.borderColor="rgba(100,77,42,1)";
				}
			}
		}
		me._rectangle_2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._upanicircle.appendChild(me._rectangle_2);
		me._up_air.appendChild(me._upanicircle);
		me.__div = me._up_air;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='up') {
			hotspot.skinid = 'up';
			hsinst = new SkinHotspotClass_up(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_up_changenode();;
			me.callChildLogicBlocksHotspot_up_varchanged_ht_anivar1();;
		} else
		{
			hotspot.skinid = 'up_air';
			hsinst = new SkinHotspotClass_up_air(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_up_air_changenode();;
			me.callChildLogicBlocksHotspot_up_air_varchanged_ht_anivar1();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['up']) {
			var i;
			for(i = 0; i < hotspotTemplates['up'].length; i++) {
				hotspotTemplates['up'][i] = null;
			}
		}
		if(hotspotTemplates['up_air']) {
			var i;
			for(i = 0; i < hotspotTemplates['up_air'].length; i++) {
				hotspotTemplates['up_air'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinCloner_thumbnail_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 120px; height: 90px; visibility: inherit; overflow: hidden;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._thumbnail_nodeimage=document.createElement('div');
		els=me._thumbnail_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/thumbnail_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Thumbnail NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 98.8889%;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 99%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._thumbnail_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_nodeimage.onclick=function (e) {
			player.openNext("{"+me.ggNodeId+"}",player.hotspot.target);
		}
		me._thumbnail_nodeimage.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_nodeimage']=true;
			me._node_text_wight.logicBlock_visible();
		}
		me._thumbnail_nodeimage.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_nodeimage']=false;
			me._node_text_wight.logicBlock_visible();
		}
		me._thumbnail_nodeimage.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_nodeimage']=false;
			me._node_text_wight.logicBlock_visible();
		}
		me._thumbnail_nodeimage.ggUpdatePosition=function (useTransition) {
		}
		el=me._checkervisited=document.createElement('div');
		els=me._checkervisited__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHk9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGlkPSJMYXllcl8xIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMT'+
			'k5OS94bGluayIgeD0iMHB4Ij4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojZmZmZmZmO30mI3hkOwoJLnN0MXtmaWxsOiM3M2YzOTM7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXog'+
			'TS0xMzIuOCwzODEuN2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIvPgogIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy'+
			'0yLjQsMGwtMTIuNSwxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIvPgogPC9nPgo8L3N2Zz4K';
		me._checkervisited__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkervisited";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 3px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkervisited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._checkervisited.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkervisited.ggElementNodeId()) == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkervisited.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkervisited.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkervisited.style[domTransition]='';
				if (me._checkervisited.ggCurrentLogicStateVisible == 0) {
					me._checkervisited.style.visibility=(Number(me._checkervisited.style.opacity)>0||!me._checkervisited.style.opacity)?'inherit':'hidden';
					me._checkervisited.ggVisible=true;
				}
				else {
					me._checkervisited.style.visibility="hidden";
					me._checkervisited.ggVisible=false;
				}
			}
		}
		me._checkervisited.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_nodeimage.appendChild(me._checkervisited);
		el=me._checker=document.createElement('div');
		els=me._checker__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHk9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiIGlkPSJMYXllcl8xIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMT'+
			'k5OS94bGluayIgeD0iMHB4Ij4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojZmZmZmZmO30mI3hkOwoJLnN0MXtmaWxsOiMwMDAwMDA7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXog'+
			'TS0xMzIuOCwzODEuN2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIvPgogIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy'+
			'0yLjQsMGwtMTIuNSwxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIvPgogPC9nPgo8L3N2Zz4K';
		me._checker__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checker";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 3px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checker.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._checker.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._checker.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checker.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checker.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checker.style[domTransition]='';
				if (me._checker.ggCurrentLogicStateVisible == 0) {
					me._checker.style.visibility=(Number(me._checker.style.opacity)>0||!me._checker.style.opacity)?'inherit':'hidden';
					me._checker.ggVisible=true;
				}
				else {
					me._checker.style.visibility="hidden";
					me._checker.ggVisible=false;
				}
			}
		}
		me._checker.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_nodeimage.appendChild(me._checker);
		el=me._node_text_wight=document.createElement('div');
		els=me._node_text_wight__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node Text wight";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 35px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 120px;';
		hs+='height: auto;';
		hs+='background: #91713e;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 10px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 5px 3px 5px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<b>"+me.ggUserdata.title+"<\/b>";
		el.appendChild(els);
		me._node_text_wight.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_text_wight.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['thumbnail_nodeimage'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_text_wight.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_text_wight.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_text_wight.style[domTransition]='';
				if (me._node_text_wight.ggCurrentLogicStateVisible == 0) {
					me._node_text_wight.style.visibility=(Number(me._node_text_wight.style.opacity)>0||!me._node_text_wight.style.opacity)?'inherit':'hidden';
					me._node_text_wight.ggVisible=true;
				}
				else {
					me._node_text_wight.style.visibility="hidden";
					me._node_text_wight.ggVisible=false;
				}
			}
		}
		me._node_text_wight.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._thumbnail_nodeimage.appendChild(me._node_text_wight);
		el=me._thumbnail_active=document.createElement('div');
		el.ggId="Thumbnail Active";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 4px solid #91713e;';
		hs+='cursor : pointer;';
		hs+='height : 88px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._thumbnail_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_active.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['thumbnail_active'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._thumbnail_active.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._thumbnail_active.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._thumbnail_active.style[domTransition]='border-color 0s';
				if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 0) {
					me._thumbnail_active.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._thumbnail_active.style.borderColor="rgba(145,113,62,1)";
				}
			}
		}
		me._thumbnail_active.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_active']=true;
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_nodeimage.appendChild(me._thumbnail_active);
		me.__div.appendChild(me._thumbnail_nodeimage);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._controller_pc.logicBlock_scaling();
	me._controller_pc.logicBlock_visible();
	me._controller_pc.logicBlock_alpha();
	me._button_mute0.logicBlock_visible();
	me._controller_mobile.logicBlock_scaling();
	me._controller_mobile.logicBlock_visible();
	me._rectangle_3.logicBlock_visible();
	me._hiidemenu.logicBlock_visible();
	me._giro.logicBlock_visible();
	me._full_windows.logicBlock_visible();
	me.__5.logicBlock_visible();
	me._exit.logicBlock_visible();
	me._button_mute.logicBlock_visible();
	me._textud.logicBlock_visible();
	me._textudmobile.logicBlock_visible();
	me._logo.logicBlock_visible();
	player.addListener('configloaded', function(args) { me._controller_pc.logicBlock_scaling();me._controller_pc.logicBlock_visible();me._controller_pc.logicBlock_alpha();me._button_mute0.logicBlock_visible();me._controller_mobile.logicBlock_scaling();me._controller_mobile.logicBlock_visible();me._rectangle_3.logicBlock_visible();me._hiidemenu.logicBlock_visible();me._giro.logicBlock_visible();me._full_windows.logicBlock_visible();me.__5.logicBlock_visible();me._exit.logicBlock_visible();me._button_mute.logicBlock_visible();me._textud.logicBlock_visible();me._textudmobile.logicBlock_visible();me._logo.logicBlock_visible(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_active(); });
	player.addListener('changevisitednodes', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_up_changenode();me.callChildLogicBlocksHotspot_up_air_changenode(); });
	player.addListener('varchanged_ht_anivar1', function(args) { me.callChildLogicBlocksHotspot_up_varchanged_ht_anivar1();me.callChildLogicBlocksHotspot_up_air_varchanged_ht_anivar1(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};
// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ GetPearl 0.0.1 - GetPearlJS JavaScript Library                     │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2005-2016 seoseunghyun (http://seoseunghyun.com)       │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the CC () license.                                  │ \\
// └────────────────────────────────────────────────────────────────────┘ \\
/*\
 |	Variable & Function Rule.
 |	_* : Parameter Variable or Function
 |	*_ : Temp Variable or Function (count of underbar is mean Depth)
 |	GETPEARL = Static object
 |	GP = Selector
\*/
(function(){
	
	// 전역 GETPEARL 객체
	var GETPEARL = function(id){
		var this_ = this;
		this.id = id;
		this.coreUrl = 'http://seunghyun.net/brand/getpearl/core.php';
		this.content = {};
		
		this.constructor();
		
		
		// 셀렉터 정의 ( 셀렉터 타입 , 셀렉터 )
		GP = function( _type , _selector )
		{
			
			var return_ = null;
			for(var i in this_.content)
			{
				for(var j in this_.content[i])
				{
					var gpObj_ = this_.content[i][j];
					
					// 셀렉터가 id일 경우
					if( _type == 'id' && gpObj_.attr('id') == _selector )
					{
						return_ = gpObj_;
					}
					
					// 셀렉터가 group일 경우
					if( _type == 'group' && gpObj_.attr('group') == _selector )
					{
						if( return_ == null ) { return_ = []; }
						return_.push( gpObj_ );
					}
					
				}
			}
			
			return return_;
			
		}
		
		var gpScript_ = document.createElement('script');
//		var gpAjax = {key:null,var:null,group:null}
		var gpAjaxBefore_ = "";
		this.ajaxFlag = true;
		
		gpScript_.src = this_.coreUrl;
		gpScript_.type = "text/javascript";
		document.head.appendChild(gpScript_);
		
		setInterval(function(){
			if(this_.ajaxFlag)
			{
			
			gpScript_ = document.createElement('script');
			
			gpScript_.src = this_.coreUrl + "?";
			gpScript_.type = "text/javascript";
			document.head.appendChild(gpScript_);
//			console.log(gpAjax)
//			console.log(gpAjax.key)

			if(gpAjax.key != gpAjaxBefore_){
				gpAjaxBefore_ = gpAjax.key;
				for(var i in GP('group',gpAjax.group))
				{
					GP('group',gpAjax.group)[i].attr('data',gpAjax.var);
				}
			}

			gpAjaxKeyBefore_ = gpAjax.key;
			document.head.removeChild(gpScript_);
			}
			
		}, 1000)
	
		
	}
	
	GETPEARL.prototype = {
		
		// 생성자
		constructor : function(){
			// Document div 수집
			var docDivs_ = document.getElementsByTagName('div');
			
			for(var i = 0; i < docDivs_.length; i++)
			{
				var docDivsId_ = docDivs_[i].getAttribute('gp-group');
				
				if(this.content[docDivsId_] === undefined)
				{
					this.content[docDivsId_] = [];
				}
				
				this.gpAttrInit( docDivs_[i] );
				
				var gpObj_ = {
					type : 'div',
					obj : docDivs_[i]
				}
				
				this.eventBinder( gpObj_ );
				this.syncMudule( gpObj_ );
				
				this.content[docDivsId_].push( gpObj_ );
				
				
				 
			}
			
			// Document span 수집
			var docSpans_ = document.getElementsByTagName('span');
			
			for(var i = 0; i < docSpans_.length; i++)
			{
				var docSpansId_ = docSpans_[i].getAttribute('gp-group');
				
				if(this.content[docSpansId_] === undefined)
				{
					this.content[docSpansId_] = [];
				}
				
				this.gpAttrInit( docSpans_[i] );
				
				var gpObj_ = {
					type : 'span',
					obj : docSpans_[i]
				}
				
				this.eventBinder( gpObj_ );
				this.syncMudule( gpObj_ );
				
				this.content[docSpansId_].push( gpObj_ );
				
				
				 
			}
			
			// Document input 수집
			var docInputs_ = document.getElementsByTagName('input');
			
			for(var i = 0; i < docInputs_.length; i++)
			{
				var docInputsId_ = docInputs_[i].getAttribute('gp-group');
				
				if(this.content[docInputsId_] === undefined)
				{
					this.content[docInputsId_] = [];
				}
				
				this.gpAttrInit( docInputs_[i] );
				
				var gpObj_ = {
					type : 'input',
					obj : docInputs_[i]
				}
				
				this.eventBinder( gpObj_ );
				this.syncMudule( gpObj_ );

				this.content[docInputsId_].push( gpObj_ );
				
			}
			
		},
		
		// 객체에 gp속성을 부여할 때 초기화 한다.
		gpAttrInit : function( _obj )
		{
			
			var initVars_ = {
				id : '',
				async : 'server', // or client
				'async-realtime' : 'true'
			}
			
			if( _obj.getAttribute('gp-async') == null ) {
				_obj.setAttribute('gp-async', initVars_.async);
			}
			if( _obj.getAttribute('gp-id') == null ) {
				_obj.setAttribute('gp-id', initVars_.id);
			}
			if( _obj.getAttribute('gp-async-realtime') == null ) {
				_obj.setAttribute('gp-async-realtime', initVars_['async-realtime']);
			}
		},
		
		evalAjax : function( data , group ){
			var gpScript_ = document.createElement('script');			
			var this_ = this;
			gpScript_.src = this.coreUrl+"?var="+data+"&group="+group;
			gpScript_.type = "text/javascript";
			document.head.appendChild(gpScript_);
			this.ajaxFlag = false;
			
			setTimeout(function(){
				this_.ajaxFlag = true;
			}, 2000)
		},
		
		// 이벤트 부여를 위한 이벤트 바인더 ( gp객체 )
		eventBinder : function( _gpObj )
		{
			var easingFunc_ = function( easing_ ){
				switch(easing_)
				{
					case 'linear' :
						return 'cubic-bezier(0.250, 0.250, 0.750, 0.750)';
					break;
					
					case 'easeInQuad' :
						return 'cubic-bezier(0.550, 0.085, 0.680, 0.530)';
					break;
					
					case 'easeOutQuad' :
						return 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
					break;
					
					case 'easeInOutQuad' :
						return 'cubic-bezier(0.455, 0.030, 0.515, 0.955)';
					break;
					
					case 'easeInCubic' :
						return 'cubic-bezier(0.550, 0.055, 0.675, 0.190)';
					break;
					
					case 'easeOutCubic' :
						return 'cubic-bezier(0.215, 0.610, 0.355, 1.000)';
					break;
					
					case 'easeInExpo' :
						return 'cubic-bezier(0.950, 0.050, 0.795, 0.035)';
					break;
					
					case 'easeOutExpo' :
						return 'cubic-bezier(0.190, 1.000, 0.220, 1.000)';
					break;
					
					case 'easeInSine' :
						return 'cubic-bezier(0.470, 0.000, 0.745, 0.715)';
					break;
					
					case 'easeOutSine' :
						return 'cubic-bezier(0.390, 0.575, 0.565, 1.000)';
					break;
					
					case 'easeInOutSine' :
						return 'cubic-bezier(0.445, 0.050, 0.550, 0.950)';
					break;
					
					case 'easeInQuart' :
						return 'cubic-bezier(0.895, 0.030, 0.685, 0.220)';
					break;
					
					case 'easeOutQuart' :
						return 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';
					break;
					
					case 'easeInOutQuart' :
						return 'cubic-bezier(0.770, 0.000, 0.175, 1.000)';
					break;
					
					case 'easeInOutQuart' :
						return 'cubic-bezier(0.770, 0.000, 0.175, 1.000)';
					break;
					
					case 'easeOutBack' :
						return 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
					break;
					
					default:
						return 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
					break;
				}
			}
			_gpObj.move = function( type , transform , time , easing ){
				var tmpStyle = '<style>[gp-'+type+'="'+_gpObj.attr(type)+'"] {transform-style: preserve-3d; -webkit-transition:'+time+' '+easingFunc_(easing)+'; -webkit-transform: '+transform+';}</style>';
					
					setTimeout(function(){
						document.head.innerHTML += tmpStyle;						
					}, 1000)

					
			}
			_gpObj.attr = function( _attrKey , _attrValue )
			{
				
				var return_;

				switch( _attrKey )
				{
					case 'id': 
						if( _attrValue ){
							_gpObj.obj.setAttribute('gp-id', _attrValue )
						}
						
						return_ = _gpObj.obj.getAttribute('gp-id');
					break;
					
					case 'group':
						if( _attrValue ){
							_gpObj.obj.setAttribute('gp-group', _attrValue )
						}
						return_ = _gpObj.obj.getAttribute('gp-group');
					break;
					
					case 'async':
						if( _attrValue ){
							_gpObj.obj.setAttribute('gp-async', _attrValue )
						}
						return_ = _gpObj.obj.getAttribute('gp-async');
					break;
					
					case 'async-realtime':
						if( _attrValue ){
							_gpObj.obj.setAttribute('gp-async-realtime', _attrValue )
						}
						return_ = _gpObj.obj.getAttribute('gp-async-realtime');
					break;
					
					case 'bgColor':
						_gpObj.obj.style.backgroundColor = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'txtColor':
						_gpObj.obj.style.color = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'left':
						_gpObj.obj.style.left = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'right':
						_gpObj.obj.style.right = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'bottom':
						_gpObj.obj.style.bottom = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'top':
						_gpObj.obj.style.top = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'width':
						_gpObj.obj.style.width = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'height':
						_gpObj.obj.style.height = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'position':
						_gpObj.obj.style.position = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'margin-top':
						_gpObj.obj.style.marginTop = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'margin-right':
						_gpObj.obj.style.marginRight = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'margin-bottom':
						_gpObj.obj.style.marginBottom = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'margin-left':
						_gpObj.obj.style.marginLeft = _attrValue;
						return_ = _gpObj;
					break;
					
					case 'type':
						return_ = _gpObj.type;
					break;
					
					case 'data' :
					
						switch( _gpObj.type )
						{
							case 'div':
								if( _attrValue ){
									_gpObj.obj.innerHTML = _attrValue;
								}
								return_ = _gpObj.obj.innerHTML;
							break;
							
							case 'span':
								if( _attrValue ){
									_gpObj.obj.innerHTML = _attrValue;
								}
								return_ = _gpObj.obj.innerHTML;
							break;
							
							case 'input':
								if( _attrValue ){
									_gpObj.obj.value = _attrValue;
								}
								return_ = _gpObj.obj.value;
							break;
						}
						
					break;
				}
				
				return return_;
			}
		},
		
		// 동기화를 위한 모듈러 ( gp객체 )
		syncMudule : function( _gpObj )
		{
			var this_ = this;
			switch( _gpObj.type )
			{
				case 'div' :
					_gpObj.obj
				break;
				
				case 'span' :
					_gpObj.obj
				break;
				
				case 'input' :
					_gpObj.obj.addEventListener('keydown', function(){
						
						if(_gpObj.attr('async') == 'server'){
							var gpGroups_ = GP( 'group' , _gpObj.attr('group') );
							for( var i in gpGroups_ )
							{
								if( _gpObj != gpGroups_[i] ){
									gpGroups_[i].attr( 'data' , _gpObj.attr('data') );
								}
							}
						}
						
						if(_gpObj.attr('async-realtime') == 'true'){ 
							this_.evalAjax( _gpObj.attr('data') , _gpObj.attr('group') )
						}
						
						
					})
				break;
			}
		}
	}
	var ab = new GETPEARL(); 
	
	for(var i in GP('group', 'ssh2'))
	{
		console.log(GP('group', 'ssh2')[i].attr('id'))
	}
	
	
	
	
})();
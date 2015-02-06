;(function($){
	
	'use strict';
	
	var Tip = function(options){
		
		var settings = $.extend({
			component   : "tooltip",
			trigger		: "mouseover", //focus
			selector    : ".",
			tip_class   : 'tip-wrapper',
			tip_wrapper : "<div class='dc_tip_wrap'></div>",
			background  : "#000",
			color	    : "#fff"
		}, options);
		
		Tip.process($(this), settings);
		return this;

	};
	
	Tip.about = {
		component: "Decorator Tool Tip",
		version  : "1.0",
		author   : "Alan Museljic",
		website  : "http://www.uloga.net",
		licence	 : "MIT",
		copyright: "codable.org"
	};
	
	
	Tip.process = function(elem, settings){
			
			elem.each(function(e){
				
				var $this   =	$(this),
				data        =	$this.attr("title"),
				template    =	'<div class="'+settings.tip_class+'">' +
							    '<span class="tip-arrow"></span>'+
						        '<div class="tip-inner">'+data+'</div>'+
								'</div>';
							
				$this.wrap(settings.tip_wrapper).append();
				
				if(settings.trigger === "hover" || settings.trigger === "mouseover"){
				
					$this.on("mouseover", function(e){
						
						if(data !== undefined && data !== "")
						$this.parent().append(template);
						Tip.style($this, settings);
						e.preventDefault();

					});

					$this.on("mouseout", function(e){
						
						$this.parent()
							 .find(settings.selector+settings.tip_class)
							 .remove();
						e.preventDefault();
						
					});
				}
				else if(settings.trigger === "focus"){
					$this.on("focus", function(e){
						
						if(data !== undefined && data !== "")
						$this.parent().append(template);
						Tip.style($this, settings);
						e.preventDefault();

					});

					$this.on("focusout", function(e){
						
						$this.parent()
							 .find(settings.selector+settings.tip_class)
							 .remove();
						e.preventDefault();
						
					});
				}
				
			});
			
	};
	
	Tip.style = function($this, settings){
		
				var tip, css_opt, tip_w, tip_h, elem_w, elem_h, arrow, offset_t, offset_l,
					d_attr   = $this.attr("data-placement"),
					position = ( typeof d_attr !== typeof undefined && d_attr !== false) 
								? d_attr : "top",
									
					tip		 = $this.parent().find(settings.selector+settings.tip_class),
					tip_w    = tip.outerWidth(),
					tip_h    = tip.outerHeight(),
					elem_w   = $this.outerWidth(),
					elem_h   = $this.outerHeight(),
					arrow    = tip.find(".tip-arrow"),
					offset_t = Math.abs($this.parent().offset().top - $this.offset().top),
					offset_l = Math.abs($this.parent().offset().left - $this.offset().left);
					
					switch (position) {
						case 'bottom':
							css_opt = {
								background: settings.background,
								color: settings.color,
								top: elem_h + 6 + offset_t, 
								left: elem_w / 2 - tip_w / 2 + offset_l
							}
							$(arrow).css({
								borderBottomColor: settings.background
							});
							break
						case 'top':
							css_opt = {
								background: settings.background,
								color: settings.color,
								top:  offset_t - (tip_h + 6), 
								left: elem_w / 2 - tip_w / 2 + offset_l
							}
							$(arrow).css({
								borderTopColor: settings.background
							});
							break
						case 'left':
							css_opt = {
								background: settings.background,
								color: settings.color,
								top: (elem_h / 2) - (tip_h / 2) + offset_t, 
								left: - (tip_w + 6) + offset_l
							}
							$(arrow).css({
								borderLeftColor: settings.background
							});
							break
						case 'right':
							css_opt = {
								background: settings.background,
								color: settings.color,
								top:   (elem_h / 2) - (tip_h / 2) + offset_t,
								left:  (elem_w + 6) + offset_l
							}
							$(arrow).css({
								borderRightColor: settings.background
							});
							break
					}
					
					$(tip).addClass(position);
					$(tip).css(css_opt);
					$this.removeAttr("title");
	};
	
	
	$.fn.dcTip  = Tip;
	
})(jQuery);
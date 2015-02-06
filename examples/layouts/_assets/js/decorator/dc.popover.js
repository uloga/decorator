;(function($){
	
	'use strict';
	
	var Popover = function(options){
		
		var settings = $.extend({
			component  : "popover",
			trigger    : "click", //mouseover//hover
			selector   : ".",
			wrapper    : "pop-wrap",
			inner      : "pop-inner",
			content	   : "pop-content",
			open	   : "pop-open",
			title      : "title",
			data       : "data-content",
			ajax       : false
		}, options);
		
		Popover.process($(this), settings);
        return this;
    };
	
	Popover.about = {
		component: "Decorator PopOvers",
		version  : "1.0",
		author   : "Alan Museljic",
		website  : "http://www.uloga.net",
		licence	 : "MIT",
		copyright: "codable.org"
	};
	
	Popover.process = function(elem, settings){
		
		
		elem.each(function(){
			
			var $this  = $(this);
			
			Popover.build($this, settings);
			Popover.populate($this, settings);
			
		});
	
	};
	
	Popover.trigger = function($this, settings){
		
		var parent = $this.parent(),
			inner  = parent.find(settings.selector+settings.inner),
			open   = inner.hasClass(settings.open);
		
			//console.log($this); //testing duplication instance
			
		if(settings.trigger === "click"){
			
			$this.on(settings.trigger, function(e) {
				
				Popover.act($this, open, parent, settings);
					
				e.preventDefault();
			});
				
		}
		
		if(settings.trigger === "hover" || settings.trigger === "mouseover"){
			
			$this.on("mouseover", function(e){
				
				Popover.act($this, open, parent, settings);
					
				e.preventDefault();
			});
			
			$this.on("mouseout", function(e){
				Popover.close(parent, settings);
				e.preventDefault();
			});
		}
		
		if(settings.trigger === "popinfo"){
			
			parent.on("mouseenter", function(e){
				
				Popover.act($this, open, parent, settings);
				
				e.preventDefault();
			});
			
			parent.on("mouseleave", function(e){
				Popover.close(parent, settings);
				e.preventDefault();
			});
			
		}
	};
	
	Popover.act = function($this, open, parent, settings){
		
		if (open) {
					
			Popover.close(parent, settings);
					
		}else {
					
			Popover.style($this, settings);
					
			if(settings.ajax === true){
				Popover.ajax($this, settings);
			}
					
			Popover.open($this, settings);
				
		}
			
	};
	
	Popover.populate = function($this, settings){
		
		var arrows = $this.parent().find(".pop-arrow").length,
			inner  = $this.parent().find(settings.selector+settings.inner),
			placement = ($this.attr("data-placement")) 
						? $this.attr("data-placement")
						: "top",
			arrow = '<div class="pop-arrow">'+
					'<span class="front">'+
					'</span><span class="back"></span>'+
					'</div>';
				
		if(arrows <= 0 || settings.ajax === true){
			
			$(inner).append(arrow);
			$(inner).addClass(placement);
			Popover.trigger($this, settings);
			
		}else{
			
			$this.click(function(e){
				e.preventDefault();
			});
			
		}
		
	};
	
	Popover.build = function($this, settings){
		
		var parent   = $this.parent(),
			wrapped  = parent.hasClass(settings.wrapper); //bool..
		    
		var title    = ($this.attr(settings.title)) 
						? '<h1 class="pop-title">'+$this.attr(settings.title)+'</h1>' 
						: '',
							
			content  = ($this.attr(settings.data))
						? '<div class="'+settings.content+'">'+$this.attr(settings.data)+'</div>'
						: ($this.attr("href")) 
						? '<div class="'+settings.content+'"></div>'
						: "null",
			
			popover  = '<div class="'+settings.wrapper+'"></div>';
			
			
		//clean up selectors...	
		if(!wrapped && content){
			
			var re    = /(^element:)([a-zA-Z0-8]+)/,
				cnt   = $this.attr(settings.data),
				found = (settings.ajax === false) ? cnt.match(re): null;
			
			if(found !== null ){
				var cls = (found[2]) ? found[2] : "",
					sel = $this.next(settings.selector+cls),
					dta = sel.html();
				
				content = (dta) ? '<div class="'+settings.content+'">'+dta+'</div>'
								: '';
								
				sel.remove();
				
			}else if(content === "null"){ 
				
			  
				//Beta: Simple ajax error info, will be departed 
				
				content  = '<div class="'+settings.content+'">'+
						   'Error:Click F12 For More Info'+
						   '</div>';
					   
			    var info =  'You must specify a path when using ajax requests'+
							' eg: href="your-path" or data-content="your-path"';
						
				console.log(info);  
				
			}
			
			var	inner = '<div class="'+settings.inner+'"><div class="pop-padder">'+
						 title+
					     content+
					    '</div></div>';
					
			$this.wrap(popover);
			$this.parent().append(inner);
			$this.removeAttr("title");
			
		}
		
	};
	
	
	Popover.remove = function(parent, settings){
		
		$(settings.selector+settings.open).removeClass(settings.open);
			
	};
	
	Popover.mouse = function(settings){
		
		$(document).mouseup(function(e) {
			
			$(settings.selector+settings.open)
					  .removeClass(settings.open);
				 
			e.preventDefault();
			
		});
		
		$(settings.selector+settings.inner)
				  .mouseup(function(){ return false; });
		
	};
	
	Popover.close = function(parent, settings){
		
		Popover.remove(parent, settings);
		Popover.mouse(settings);
		
	};
	
	Popover.open =  function($this, settings){
		
		var pop = $this.parent().find(settings.selector+settings.inner),
			parent = $this.parent();
		
		Popover.close(parent, settings);
		
		$this.click(function(){return false;});
		
		if(settings.ajax !== true){
			pop.addClass(settings.open);
		}
		
	};
	
	Popover.ajax = function($this, settings){
		
		var inner = $this.parent()
						 .find(settings.selector+settings.content),
			pop   = $this.parent().find(settings.selector+settings.inner),				 
			path  = ($this.attr(settings.data))
					? $this.attr(settings.data)
					: ($this.attr("href")) 
					? $this.attr("href")
					: "null";
		
		
		if(settings.ajax === false || path === "null"){
			
			return false;
			
		}else{
			
			$.ajax({
				type: "GET",
				url: path,
				success: function(data) {
					$(inner).html(data);
					pop.addClass(settings.open);
				}
			});
		}
		
	};
	
	Popover.style = function($this, settings){
		
		var position, css_opt, offset_t, offset_l,
			elem_w, elem_h, pop_w, pop_h,
			
			pop     = $this.parent().find(settings.selector+settings.inner),
			d_attr  = $this.attr("data-placement"),
					  position =( typeof d_attr !== typeof undefined && d_attr !== false) 
								 ? d_attr : "top";
								
		pop_w    = pop.outerWidth(),
		pop_h    = pop.outerHeight(),
		elem_w   = $this.outerWidth(),
		elem_h   = $this.outerHeight(),
		offset_t = Math.abs($this.parent().offset().top - $this.offset().top),
		offset_l = Math.abs($this.parent().offset().left - $this.offset().left);
		
		switch (position) {
			
				case 'bottom':
					css_opt = {
						top:  elem_h + offset_t,  
						left: elem_w / 2 - pop_w / 2 + offset_l
					};
					break
				case 'top':
					css_opt = {
						top:  offset_t - pop_h , 
						left: elem_w / 2 - pop_w / 2 + offset_l
					};
					break
				case 'left':
					css_opt = {
						top:  - (pop_h / 2) + (elem_h / 2) + offset_t,
						left: - pop_w + offset_l
					};
					break
				case 'right':
					css_opt = {
						top:   (elem_h / 2) - (pop_h / 2) + offset_t,
						left:   elem_w + offset_l 
					};
					break
					
		}
		
		$(pop).css(css_opt);
	};
	
	$.fn.dcPopover  = Popover;
	
})(jQuery);
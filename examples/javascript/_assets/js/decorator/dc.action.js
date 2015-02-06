;(function($){
	
	'use strict';
	
	var Action = function(options){
		
		var settings = $.extend({
			component  : "action",
			trigger    : "click", //mouseover
			action     : "action",
			dropDown   : "drop-action",
			dropOpen   : "drop-open",
			dropWrap   : "drop-wrap", //hover state
			active     : "action-on",
			selector   : ".",
			open_span  : "-",
			closed_span: "+"
			
		}, options);
		
		Action.process($(this), settings);
		return this;

	};
	
	Action.about = {
		component: "Decorator Actions",
		version  : "1.0",
		author   : "Alan Museljic",
		website  : "http://www.uloga.net",
		licence	 : "MIT",
		copyright: "codable.org"
	};
	
	Action .process = function(elem, settings){
		
		
		if(settings.trigger === "hover" || settings.trigger === "mouseover" ){
			
			Action.style(elem, settings);
			
			elem.each(function(e){
				
				var $this = $(this),
					parent = $this.parent();
				
				parent.on("mouseenter", function(e) {

					Action.act($this, settings);

					e.preventDefault();
				});

				parent.on("mouseleave", function(e) {

					Action.close(settings);

					e.preventDefault();

				});
				
			});
			
		}else{
			elem.on("click", function(e) {

				var $this = $(this);

				Action.act($this, settings);

				e.preventDefault();
			});
		}
		
	};
	
	Action.act = function($this, settings){
		
		var parent = $this.parent(),
			drop   = parent.find(settings.selector+settings.dropDown),
			open   = drop.hasClass(settings.dropOpen);
		
		if (open) {
			Action.close(settings);
		} else {
			Action.open($this, drop, settings);
		}
			
		$this.click(function(){return false;});
	};
	
	Action.open = function($this, drop, settings){
		
		var	span   = $this.find("span");
		
		Action.close(settings);
		
		$this.addClass(settings.active);
		drop.addClass(settings.dropOpen);
		span.text(settings.open_span);
		$this.parent()
			.find(settings.selector+settings.dropWrap)
			.css("display", "block");
		
	};
	
	Action.remove = function(settings){
		
		$(settings.selector+settings.active)
				  .removeClass(settings.active);
			 
		$(settings.selector+settings.dropDown)
				  .removeClass(settings.dropOpen);
			 
		$(settings.selector+settings.action)
				  .find("span").text(settings.closed_span);
			  
		$(settings.selector+settings.dropWrap)
			      .css("display", "none");
	};
	
	Action.mouse = function(settings){
		
		$(document).mouseup(function(e) {
			$(settings.selector+settings.active)
					  .removeClass(settings.active);
			$(settings.selector+settings.dropDown)
					  .removeClass(settings.dropOpen);
			$(settings.selector+settings.action)
					  .find("span").text(settings.closed_span);
				 
			e.preventDefault();
		});
		
		$(settings.selector+settings.action)
				  .mouseup(function(){return false;});
			  
		$(settings.selector+settings.dropDown)
				  .mouseup(function(){return false;});
			  
	};
	
	Action.close = function(settings){
		
		Action.mouse(settings);
		Action.remove(settings);
		
	};
	
	Action.style = function(elem, settings){
		
		var parent  = elem.parent(),
			dropper = parent.find(settings.selector+settings.dropDown),
			wrapper = "<div class='"+settings.dropWrap+"'></div>",
			elem_h  = $(elem).outerHeight();
		
		dropper.wrapAll(wrapper);
		dropper.css({display: "block",position: "relative"});
		$(settings.selector+settings.dropWrap).css("top", elem_h);
		
	};
	
	$.fn.dcAction  = Action;
	
})(jQuery);
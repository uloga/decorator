;(function($){
	
	'use strict';
	
	var Tab = function(options){
		
		var settings = $.extend({
			component  : "tab",
			trigger    : "click", //mouseover
			actions    : ".tab-actions",
			active	   : ".active",
			panel	   : ".panel",
			current    : ".panel-current",
			effect     : {type: "fadeIn", speed: 1000},
			ajax_panel : ".ajax-panel",
			wrapper    : ".panel-wrapper",
			ajax	   : false
		}, options);
		
		Tab.process($(this), settings);
		return this;

	};
	
	Tab.about = {
		component: "Decorator Tab",
		version  : "1.0",
		author   : "Alan Museljic",
		website  : "http://www.uloga.net",
		licence	 : "MIT",
		copyright: "codable.org"
	};
	
	Tab.process = function(elem, settings){
		
		var tab, selector, ap;
		tab = elem.find(settings.actions + " li a");
		tab.first().addClass(Tab.sts(settings.active));
		
		Tab.wrap(elem, settings);
		
		if(settings.ajax === true){
			ap = elem.find(settings.ajax_panel);
			ap.load(tab.first().attr("href"));
		}
		
		tab.on(settings.trigger, function(e){
			
			var $this = $(this);
			selector = $this.attr("id");
			
			elem.find(settings.active)
				.removeClass(Tab.sts(settings.active));
			
			$this.addClass(Tab.sts(settings.active));
			
			if (settings.ajax === true) { 
				
				Tab.ajax($this, elem, selector, settings);
				
			}else{
				
				Tab.next(elem, selector, settings);
			}
			
			
			e.preventDefault();
		});
		
		elem.click(function(){return false;});
	};
	
	Tab.next = function(elem, selector, settings){
		
		if(Tab.hasKeys(settings)){
			Tab.animate(elem, selector, settings);
		}
		
		elem.find(settings.current)
			.removeClass(Tab.sts(settings.current));
		
		elem.find("."+selector)
			.addClass(Tab.sts(settings.current));
	};
	
	Tab.ajax = function($this, elem, selector, settings){
		
		var path = $this.attr("href"),
			ajax_panel = elem.find(settings.ajax_panel);
		
		$.ajax({
			type: "GET",
			url: path,
			success: function(data) {
				ajax_panel.html(data)
						  .css({ opacity: 0 })
						  .fadeTo("normal",1);
			}
		});
		
	};
	
	/* selector to string */
	Tab.sts = function(cls){
		return cls.replace(".", "");
	};
	
	Tab.hasKeys = function(settings){
		
		if(Object.keys(settings.effect).length !== 0 
		    && settings.effect.type !== false){
			return true;
		}else{
			return false;
		}
		
	};
	
	Tab.wrap = function(elem, settings){
		
		if(Tab.hasKeys(settings)){
			var panel     = elem.find(settings.panel);
			panel.wrapAll("<div class='"+Tab.sts(settings.wrapper)+"'></div>");
		}
		
	};
	
	/* @todo: clean up the animate function */
	Tab.animate = function(elem, selector, settings){
		
		var current    = elem.find(settings.current),
			next       = elem.find("."+selector),
			panel      = elem.find(settings.panel),
			panel_w    = panel.width(),
			panel_h    = next.height(),
			panel_y    = panel_h * 1.5,
			current_y  = current.height() * 1.5,
			wrapper    = elem.find(settings.wrapper);
			
			wrapper.stop().animate({
				height: panel_h
			});	
			
			if(settings.effect.type !== "fadeIn"){
				panel.addClass("sliding-panels");
			}
				
		if(settings.effect.type === "fadeIn"){
			current.hide();
			next.fadeIn(settings.effect.speed);
		}
		
		if(settings.effect.type === "slideUp"){
			panel.css("top", panel_y + "px");
			current.css("top", "0px");
			current.stop().animate({
				top: -current_y + "px"
			}, settings.effect.speed);
			
			next.stop().animate({
				top: 0
			}, settings.effect.speed);
		}
		
		if(settings.effect.type === "slideDown"){
			panel.css("bottom", panel_y + "px");
			current.css("bottom", "0px");
			current.stop().animate({
				bottom: -current_y + "px"
			}, settings.effect.speed);
			
			next.stop().animate({
				bottom: 0
			}, settings.effect.speed);
		}
		
		if(settings.effect.type === "slideLeft"){
			panel.css("left", panel_w + "px");
			current.css("left", "0px");
			current.stop().animate({
				left: -panel_w + "px"
			}, settings.effect.speed);
			
			next.stop().animate({
				left: 0
			}, settings.effect.speed);
		}
		
		if(settings.effect.type === "slideRight"){
			panel.css("right", panel_w + "px");
			current.css("right", "0px");
			current.stop().animate({
				right: -panel_w + "px"
			}, settings.effect.speed);
			
			next.stop().animate({
				right: 0
			}, settings.effect.speed);
		}
		
	};
	
	
	$.fn.dcTab  = Tab;
	
	
})(jQuery);
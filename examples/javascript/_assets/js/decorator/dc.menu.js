;(function($){
	
	'use strict';
	
	var Menu = function(options){
		
		var settings = $.extend({
			component  : "responsive",
			icon_open  : "",
			icon_close : "",
			type       : "top",
			overflow   : false
			
		}, options);
		
		Menu.process($(this), settings);
		return this;

	};
	
	Menu.about = {
		component: "Decorator Responsive Menu",
		version  : "1.0",
		author   : "Alan Museljic",
		website  : "http://www.uloga.net",
		licence	 : "MIT",
		copyright: "codable.org"
	};
	
	Menu.process = function(elem, settings){
		
		Menu.wrapper(elem, settings);
		
	};
	
	Menu.wrapper = function(navbar, settings){
		
		var wrap, clean,
			old    = $(navbar).html(),
			search = $(navbar).find('form').remove(),
			brand  = (settings.brand) ? $(navbar).find("."+settings.brand).remove() 
									  :	$(navbar).find('.brand').remove(),
			inner  = $(navbar).html(),
			action = (settings.icon_open !=="") 
					? '<a href="#" class="responsive-action res-open">'+settings.icon_open+'</a>'
					: '<a href="#" class="responsive-action res-open">+</a>',
			max_h  = (settings.overflow === true) ? "responsive-open" : "_stoner";
		    
		if(brand.length > 0){
			wrap = "<div class='the-brand'>" + brand[0].outerHTML + action + "</div>\n";
		}else{
			wrap = "<div class='the-brand'>" + action + "</div>\n"
		}
		if(search.length > 0){
			wrap += "<div class='responsive-menu "+max_h+"'>\n" + search[0].outerHTML;
		}else{
			wrap += "<div class='responsive-menu "+max_h+"'>\n";
		}
		
		wrap +=  inner + "</div>";
		
		if(window.innerWidth <= 768){
			navbar.html(wrap);
			Menu.trigger(navbar, settings);
		}else{
			navbar.html(old);
		}
		
		$(window).resize(function(e, ww){
			
			if (window.innerWidth <= 768) {
				navbar.html(wrap);
				Menu.trigger(navbar, settings);
			}else{
				navbar.html(old);
			}
		});
	};
	
	
	Menu.template = function(navbar, settings){
		
	};
	
	Menu.trigger = function(navbar, settings){
		
		var trg	 = navbar.find('.responsive-action'),
			menu = navbar.find('.responsive-menu');
		
			$(trg).on("click", function(e){
				var $this = $(this),
					open  = $this.hasClass('res-open');
					
			if (open) {
				$this.addClass('res-close');
				$this.removeClass('res-open');
				$(menu).stop().slideDown(150);
				
				if(settings.icon_close !==""){
					$this.html(settings.icon_close);
				}else{
					$this.text('x');
				}
				
			} else {
				$this.addClass('res-open');
				$this.removeClass('res-close');
				$(menu).stop().slideUp(150);
				if(settings.icon_open !== ""){
					$this.html(settings.icon_open);
				}else{
					$this.text('+');
				}
			}
				e.preventDefault();
			
			});
	};
	
	$.fn.dcMenu  = Menu;
	
})(jQuery);
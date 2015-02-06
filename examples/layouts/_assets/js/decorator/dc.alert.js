;(function($){
	
	'use strict';
	
	var Alert = function(options){
		
		var settings = $.extend({
			component  : "alert",
			type	   : "success", //info, warning, danger	
			selector   : ".",
			alert      : "alert",
			close      : "alert-close",
			msg        : "",
			prepend    : "",
			append     : "",
			efx        : "",
			speed      : 300,
			template   : ""
		}, options);
		
		Alert.process($(this), settings);
		
		return this;

	};
	
	Alert.about = {
		component: "Decorator Alert",
		version  : "1.0",
		author   : "Alan Museljic",
		website  : "http://www.uloga.net",
		licence	 : "MIT",
		copyright: "codable.org"
	};
	
	Alert.process = function(elem, settings){
	
	
		elem.on("click", function(e){

				var $this = $(this);

				Alert.open($this, settings);

				e.preventDefault();
				
				Alert.close(settings);
		});
		
	};
	
	Alert.close = function(settings){
		
		$(settings.selector+settings.close).on("click", function(e){
			
			var $this = $(this).parent();
		
			if(settings.efx === "fadeOut"){

				$this.fadeOut(settings.speed);

			}else if(settings.efx === "slideUp"){

				$this.slideUp(settings.speed);

			}else{

				$this.remove();

			}
			e.preventDefault();
		});
		
	};
	
	Alert.open = function($this, settings){
		
		$(settings.selector+settings.alert).remove();
		Alert.style($this, settings);
		
	};
	
	Alert.template = function(settings, elem){
		
		var data     = (settings.msg) 
						? settings.msg 
						: elem.attr("data-content");
					
		var template = '<div class="'+settings.alert+ " " +
						settings.alert+"-"+settings.type + '">' + 
					    data+
					   '<a class="'+settings.close+'"href="#">X</a>'+
					   '</div>';
		return template;
		
	};
	
	Alert.style = function(elem, settings){
		
		var template = (settings.template) 
						? settings.template 
						: Alert.template(settings, elem),
			width;
		
		if(settings.append){
			
			$(settings.selector+settings.append).append(template);
			width = $(settings.selector+settings.append).width() - 30;
			
		}else if(settings.prepend){
			
			$(settings.selector+settings.prepend).prepend(template);
			width = $(settings.selector+settings.prepend).width() - 30;
			
		}else{
			
			$("body").prepend(template);
			
		}
		
		$(settings.selector+settings.alert).width(width);
		
	};
	
	$.fn.dcAlert  = Alert;
	
})(jQuery);
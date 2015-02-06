;(function($){
	
	'use strict';
	
	var Modal = function(options){
		
		var settings = $.extend({
			component  : "modal",
			selector   : ".",
			background : "modal-background",
			wrapper    : "modal-wrapper",
			inner      : "modal-inner",
			header     : "modal-header",
			title      : "modal-title",
			content    : "modal-content",
			footer     : "modal-footer",
			open       : "modal-open",
			close      : "modal-close",
			type       : "",
			style      : {},
			effect     : "",
			hide	   : "",
			ajax       : false,
			scroll     : window.innerWidth - $('body').width()
		}, options);
		
		Modal.process($(this), settings);
		return this;

	};
	
	Modal.about = {
		component: "Decorator Modal",
		version  : "1.0",
		author   : "Alan Museljic",
		website  : "http://www.uloga.net",
		licence	 : "MIT",
		copyright: "codable.org"
	};
	
	Modal.process = function(elem, settings){
		
		elem.each(function() {
			
			var $this = $(this),
				modals = $this.attr("data-target");
				
			$(settings.selector+modals).hide();
			
			$this.on("click", function(e) {
				
				Modal.act($this, settings);
				
				e.preventDefault();
				
			});
		});
		
	};
	
	Modal.act  = function($this, settings){
		
		var bgrd = $(settings.selector+settings.background),
			open = bgrd.hasClass(settings.open);
			
		if(open){
			
			Modal.close(settings);
			
		}else{
			
			Modal.close(settings);
			Modal.open($this, settings);
			
		}
		
		Modal.close(settings);
		
	};
	
	Modal.open = function($this, settings){
		
		Modal.template($this, settings);
		Modal.style(settings);
		
	};
	
	Modal.close = function(settings){
		
		var inner = settings.selector+settings.inner,
			href  = $(inner).find('a');
		
		if(href){
			href.on('click', function(){
					var loc = $(this).attr("href")
					if(loc !== "#"){
						window.location.href = loc;
					}
					
			});
		}
		
		$(settings.selector+settings.inner)
					.click(function(e){ 
				
				    e.preventDefault();
					e.stopPropagation();
				
		});
		
		
		$(settings.selector+settings.wrapper)
			.click(function(e){
			Modal.effect(settings);
			setTimeout(function(){ 
				$(settings.selector+settings.wrapper).remove();
				$('body').css("padding-right", 0);
				$('body').removeClass('modal-active');
				$('.ytfw').remove();
			}, 300);
			e.preventDefault();
		});
		
		$(settings.selector+settings.close)
			.click(function(e){
			Modal.effect(settings);
			setTimeout(function(){ 
				$(settings.selector+settings.wrapper).remove();
				$('body').css("padding-right", 0);
				$('body').removeClass('modal-active');
				$('.ytfw').remove();
			}, 300);
			
			e.preventDefault();
		});
		
	};
	
	Modal.effect = function(settings){
		
		var modal = $(settings.selector+settings.inner),
			up    = $(modal).hasClass("modal-in-up"),
			down  = $(modal).hasClass("modal-in-down"),
			left  = $(modal).hasClass("modal-in-left"),
			right = $(modal).hasClass("modal-in-right"),
			dc_w  = $(window).width(),
			dc_h  = $(window).height();
		$(settings.selector+settings.background).fadeOut();
		$(modal).fadeOut(100);
		if(up){
			if(settings.hide === 'reverse'){
				$(modal).stop().animate({top: - dc_h}, 300);
			}else{
				$(modal).stop().animate({bottom: - dc_h}, 300);
			}
		}
		if(down){
			if(settings.hide === 'reverse'){
				$(modal).stop().animate({bottom: - dc_h}, 300);
			}else{
				$(modal).stop().animate({top: - dc_h}, 300);
			}
		}
		if(left){
			if(settings.hide === 'reverse'){
				$(modal).stop().animate({right: - dc_w}, 300);
			}else{
				$(modal).stop().animate({left: - dc_w}, 300);
			}
		}
		if(right){
			if(settings.hide === 'reverse'){
				$(modal).stop().animate({left: - dc_w}, 300);
			}else{
				$(modal).stop().animate({right: - dc_w}, 300);
			}
		}
		
	};
	
	//Todo: clean up the template in next release...
	Modal.template = function($this, settings){
		
		var title     = $this.attr("title"),
			
			get_modal = ($this.attr("data-target")) 
						? $this.attr("data-target") : "",
			modal_cls = ($this.attr("data-modal-class")) 
						? $this.attr("data-modal-class") : "stoner_",
			youtube   = ($this.attr("data-youtube")) 
						? $this.attr("data-youtube") : "stoner_",
			
			ytId      = ($this.attr("data-youtube")) 
						? Modal.ytId(youtube) : null,
			
			modal     = $(settings.selector+get_modal),
			content_ex= modal.find(settings.selector+settings.content),
			header_ex = modal.find(settings.selector+settings.header),
			footer_ex = modal.find(settings.selector+settings.footer),
			title_ex  = modal.find(settings.selector+settings.title),
			content, header, footer, new_title, template;
		
		if(title && title_ex.length < 1){
			new_title = '<h2 class="'+settings.title+'">' + title + '</h2>';
		}else{
			new_title = "";
		}	
		if(title && header_ex.length < 1){
			header  =	'<div class="'+settings.header+'">'+
							new_title+
						'</div>';
		}else if(header_ex.length > 0){
			header  =	'<div class="'+settings.header+'">'+
							new_title+
							$(header_ex).html() +
						'</div>';
		}else{
			header = "";
		}
		
		if(footer_ex.length > 0){
			footer =	'<div class="'+settings.footer+'">'+
							$(footer_ex).html() +
						'</div>';
		}else{
			footer = "";
		}
		
		if(content_ex.length > 0){
			
			content = $(content_ex).html();
			
		}else if(content_ex.length < 1 && youtube !== 'stoner_'){
				
			content   =  Modal.ytImg(ytId);
				
		}else{
			
			$(footer_ex).hide();
			$(header_ex).hide();
			content = $(modal).html();
		}
		
		
		if(settings.ajax === true){
			
			content  = Modal.ajax($this, settings);
			
			template =  '<div class="clearfix '+settings.wrapper+
						' ' + settings.open+ ' ' + modal_cls +'">'+
						'<div class="'+settings.background+'"></div>' +
			            '<div class="'+settings.inner+'">' +
								content +
						'<span class="modal-x '+settings.close+'">X</span>' +
						'</div>' +
						'</div>';
		}else{
		
			template =  '<div class="clearfix '+settings.wrapper+
						' ' + settings.open+ ' ' + modal_cls +'">'+
						'<div class="'+settings.background+'"></div>' +
			            '<div class="'+settings.inner+'">' +
								header +
						'<div class="'+settings.content+'">'+
								content +
						'</div>' +
						        footer +
						'<span class="modal-x '+settings.close+'">X</span>' +
						'</div>' +
						'</div>';
		}
		
		$('body').prepend(template);
		var modal_h =   settings.style.height,
			scroll	=	$(settings.selector+settings.content).height() + 
						$(settings.selector+settings.header).height() + 
						$(settings.selector+settings.footer).height();
		
		if(modal_h < scroll){
			$(settings.selector+settings.inner).addClass("modal-overflow");
		}
		if(settings.type === "youtube" || youtube !== 'stoner_'){
			$(settings.selector+settings.wrapper).addClass('modal-video');
		}
		
		Modal.scroll(settings);
		
		$('.yttrigger').click(function(){
			$(this).remove();
			$(".modal-video").find(settings.selector+settings.content)
					         .append(Modal.ytFrame(ytId));
		});
		
	};
	
	Modal.ytId = function(youtube){
		
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
				match = youtube.match(regExp),
				ytid, img, frame;
			
			if (match && match[7].length === 11) {
				ytid = match[7];
			}else{
				console.log('not a valid youtube url');
			}
			return ytid;
	}
	
	Modal.ytImg = function(ytId){
		return  '<a href="#" class="yttrigger">'+
				'<img  src="http://img.youtube.com/vi/'+
					ytId+
				'/maxresdefault.jpg" alt="YouTube" />'+
				'<span class="ytplay"><i></i></span>' +
				'</a>';
	};
	
	Modal.ytFrame = function(ytId){
		return	'<div class="ytfw"><iframe width="560" height="315" '+ 
				'src="http://www.youtube.com/embed/'+ytId+'?autoplay=1"' 
				+' frameborder="0" allowfullscreen></iframe></div>';
	};
	
	Modal.style = function(settings){
		
		var modal   = $(settings.selector+settings.inner);
		
		switch (settings.effect) {
			
				case 'down':
					$(modal).addClass("modal-in-down");
					break
				case 'up':
					$(modal).addClass("modal-in-up");
					break
				case 'left':
					$(modal).addClass("modal-in-left");
					break
				case 'right':
					$(modal).addClass("modal-in-right");
					break
				case 'fadeIn':
					$(modal).addClass("modal-in-fade");
					break
				default:
					$(modal).addClass("modal-in-down");
					break
		} 
		
		$(modal).css(settings.style);
		
	};
	
	Modal.ajax = function($this, settings){
		
		var path = $this.attr('data-content'),
			cnt  = $(settings.selector+$this.attr('data-target'));
		
		var res = $.ajax({
			url: path,
			async: false
		});
		return res.responseText;
	};
	
	Modal.scroll = function(settings){
		
		var modal = $(settings.selector+settings.wrapper)[0].scrollHeight;
		$('body').addClass('modal-active');
		$('body').css("padding-right", settings.scroll);
		$(settings.selector+settings.background).height(modal);
		
	};
	
	$.fn.dcModal  = Modal;
	
})(jQuery);
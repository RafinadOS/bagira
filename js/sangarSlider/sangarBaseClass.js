var sangarBaseClass;
(function(f){sangarBaseClass=function(a,d){function g(a,b){return{x:b.x*a.a+b.y*a.c+0,y:b.x*a.b+b.y*a.d+0}}a.initFirstRun=function(){a.isFirstRun=!0;a.delayFirstRun=1E3;a.css3support();var c={};c["-"+a.vendorPrefix+"-transition-property"]="all";c["-"+a.vendorPrefix+"-transition"]=a.delayFirstRun+"ms cubic-bezier(0, 1, 0.5, 1)";c.height=d.height;a.$el.css(c);a.$sangarWrapper.css({height:d.height});a.setLoading(a.$sangarWrapper,"show")};a.runSlideshow=function(){a.setupSizeAndCalculateHeightWidth();a.setupSizeAndCalculateHeightWidth();
setTimeout(function(){a.unlock();a.resetSlider()},a.delayFirstRun)};a.getImgHeight=function(c,b,e){d.continousSliding&&(b%=e/3);e=a.imgWidth[b];b=a.imgHeight[b];return c=Math.round(b-(e-c)/e*b*100/100)};a.getImgWidth=function(c,b,e){d.continousSliding&&(b%=e/3);e=a.imgWidth[b];b=a.imgHeight[b];return c=Math.round(e-(b-c)/b*e*100/100)};a.calculateHeightWidth=function(c){a.sangarWidth=a.$el.innerWidth();a.sangarHeight=d.height-(d.width-a.sangarWidth)/d.width*d.height*100/100;a.sangarHeight<=d.minHeight?
a.sangarHeight=d.minHeight:a.sangarHeight>=d.maxHeight&&0<d.maxHeight&&(a.sangarHeight=d.maxHeight);if(d.fullHeight){c=f(window).height();var b=a.$el.position();a.sangarHeight=c-b.top}d.forceSize&&(a.sangarWidth=d.width,a.sangarHeight=d.height);a.sangarWidth=Math.round(a.sangarWidth);a.sangarHeight=Math.round(a.sangarHeight)};a.setupSize=function(c){c=c?a.sangarHeight:d.height;var b=d.fullWidth?"100%":d.width,e=c;"100%"!=b&&(b=Math.round(b),b+="px");e=Math.round(e);c=Math.round(c);a.$el.css({height:e+
"px","max-width":b});a.$sangarWrapper.css({height:e+"px",width:a.sangarWidth+"px"});a.$sangar.css({height:c+"px","max-width":b})};a.setupSizeAndCalculateHeightWidth=function(c){a.calculateHeightWidth();a.setupSize(!0);a.calculateHeightWidth();a.originalSangarWidth=a.sangarWidth;"content-vertical"==d.pagination&&(a.sangarWidth-=d.paginationContentWidth);d.carousel&&(a.sangarWidth=a.sangarWidth*d.carouselWidth/100)};a.css3support=function(){var c=document.createElement("div"),b=["perspectiveProperty",
"WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in b)if("undefined"!==typeof c.style[b[e]])return a.vendorPrefix=b[e].replace("Perspective","").toLowerCase(),d.jsOnly?!1:!0;return!1};a.doLoading=function(){a.$el.show();a.setLoading(a.$sangarWrapper,"show");a.$slideWrapper.hide();a.$sangar.css({"background-image":"","z-index":"99"});clearTimeout(a.loadingTimer);a.loadingTimer=setTimeout(function(){a.setLoading(a.$sangarWrapper,"fadeOut");a.$slideWrapper.css({display:"block"});
a.$sangar.css({"background-image":"none","z-index":"0"})},300)};a.setLoading=function(c,b){var e,h={display:"block",position:"absolute",width:"100%",height:"100%",background:d.background,"z-index":"99",top:"0px",left:"0px"},f=c.children(".sangar-slider-loading").length;switch(b){case "show":f||c.append('<div class="sangar-slider-loading"><div><span id="span_1"></span><span id="span_2"></span><span id="span_3"></span></div></div>');e=c.children(".sangar-slider-loading");"block"!=e.css("display")&&
(a.beforeLoading(),d.disableLoading||e.css(h));break;case "fadeOut":f&&(a.afterLoading(),e=c.children(".sangar-slider-loading"),e.fadeOut(400,function(){setTimeout(function(){e.remove()},400)}))}};a.setCurrentSlide=function(c){a.isRunning=!0;a.$currentSlide&&(a.$prevSlide=a.$currentSlide);if(d.continousSliding){var b=".swi2nd";"next"==a.slideDirection&&0==a.activeSlide?b=".swi3rd":"prev"==a.slideDirection&&a.activeSlide==a.numberSlides-1&&(b=".swi1st");c&&(b=".swi2nd",a.$prevSlide&&a.$prevSlide.parent().hasClass("swi2nd")&&
0==a.$prevSlide.attr("index")&&(a.$prevSlide=!1));c=a.$slideWrapper.children(".slideWrapperInside").children();a.$currentSlide=a.$slideWrapper.children(".slideWrapperInside"+b).children().eq(a.activeSlide)}else c&&a.$prevSlide&&0==a.$prevSlide.attr("index")&&(a.$prevSlide=!1),c=a.$slideWrapper.children(),a.$currentSlide=a.$slideWrapper.children().eq(a.activeSlide);c.removeClass("active-slide");a.$currentSlide.addClass("active-slide")};a.setActiveExternalPagination=function(){var c=d.paginationExternalClass;
""!=c&&f("."+c).length&&(f("."+c).removeClass("active"),f("."+c).eq(a.activeSlide).addClass("active"))};a.randomString=function(a){var b="";"undefined"==typeof a&&(a=10);for(var e=0;e<a;e++)b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return b};a.getTranslatePosition=function(a){a=window.getComputedStyle(a).getPropertyValue("transform");var b=g(a,{x:0,y:1}),e=g(a,{x:1,y:0}),b=180/Math.PI*Math.atan2(b.y,b.x)-90,e=180/Math.PI*Math.atan2(e.y,
e.x),d=a.match(/^matrix3d\((.+)\)$/);if(d)a=parseFloat(d[1].split(", ")[13]);else{var f=(d=a.match(/^matrix\((.+)\)$/))?parseFloat(d[1].split(", ")[4]):0,d=d?parseFloat(d[1].split(", ")[5]):0;a={translateX:f,translateY:d,scaleX:Math.sqrt(a.a*a.a+a.b*a.b),scaleY:Math.sqrt(a.c*a.c+a.d*a.d),skewX:b,skewY:e,rotation:b}}return a}}})(jQuery);
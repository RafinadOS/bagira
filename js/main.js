$(document).ready(function(){
	$('#show-category h3').click(function(){
		$('#show-category').toggleClass('shw-menu')
	})

	$('.tabs_block li a').click(function(e){
		$('.tabs_block li a').removeClass('active-tab')
		$(this).addClass('active-tab')
		$('#redcart-block-1').removeClass('shw')
		$('#redcart-block-2').removeClass('shw')
		$('#redcart-block-3').removeClass('shw')
		$('#redcart-block-4').removeClass('shw')
		var z = $(this).attr('href')
		$(z).addClass('shw')
		return false
	})

	$('#filter_price').click(function(e) {
		$(this).toggleClass('filter_active')
		return false		
	})
	
	$('#filter_name').click(function(e) {
		$(this).toggleClass('filter_active')
		return false		
	})

	var sangar = $('.sangar-example').sangarSlider({
	    	timer :  false, // true or false to have the timer
	    	pagination : 'content-horizontal', // bullet, content, none
	    	paginationContent : ["images/thumb/thumb-slide-1.jpg", "images/thumb/thumb-slide-2.jpg", "images/thumb/thumb-slide-3.jpg", "images/thumb/thumb-slide-4.jpg", "images/thumb/thumb-slide-5.jpg", "images/thumb/thumb-slide-6.jpg", "images/thumb/thumb-slide-7.jpg", "images/thumb/thumb-slide-8.jpg"], // can be text, image, or something			        
	    	paginationContentType : 'image', // text, image
	    	paginationContentWidth : 116, // pagination content width in pixel
	    	paginationImageHeight : 80, // pagination image height
	    	width : 970, // slideshow width
     		height : 540, // slideshow height
	    	themeClass : 'default-big',
	    	fullWidth : false, // slider will scale to the container size
     		fullHeight : false, // slideshow height will resize to browser height
	})

	var sangar = $('.sangar-example-cart').sangarSlider({
	    	timer :  false, // true or false to have the timer
	    	pagination : 'content-horizontal', // bullet, content, none
	    	paginationContent : ["images/thumb/thumb-slide-1.jpg", "images/thumb/thumb-slide-2.jpg", "images/thumb/thumb-slide-3.jpg", "images/thumb/thumb-slide-4.jpg", "images/thumb/thumb-slide-5.jpg", "images/thumb/thumb-slide-6.jpg"], // can be text, image, or something			        
	    	paginationContentType : 'image', // text, image
	    	paginationContentWidth : 116, // pagination content width in pixel
	    	paginationImageHeight : 80, // pagination image height
	    	width : 720, // slideshow width
     		height : 540, // slideshow height
	    	themeClass : 'default-big',
	    	fullWidth : false, // slider will scale to the container size
     		fullHeight : false, // slideshow height will resize to browser height
	})

	var sangar = $('.sangar-example-cart-2').sangarSlider({
	    	timer :  false, // true or false to have the timer
	    	pagination : 'content-horizontal', // bullet, content, none
	    	paginationContent : ["images/thumb/thumb-slide-1.jpg", "images/thumb/thumb-slide-2.jpg", "images/thumb/thumb-slide-3.jpg", "images/thumb/thumb-slide-4.jpg", "images/thumb/thumb-slide-5.jpg", "images/thumb/thumb-slide-6.jpg"], // can be text, image, or something			        
	    	paginationContentType : 'image', // text, image
	    	paginationContentWidth : 116, // pagination content width in pixel
	    	paginationImageHeight : 80, // pagination image height
	    	width : 720, // slideshow width
     		height : 540, // slideshow height
	    	themeClass : 'default-big',
	    	fullWidth : false, // slider will scale to the container size
     		fullHeight : false, // slideshow height will resize to browser height
	})

	var sangar = $('.sangar-example-cart-3').sangarSlider({
	    	timer :  false, // true or false to have the timer
	    	pagination : 'content-horizontal', // bullet, content, none
	    	paginationContent : ["images/thumb/thumb-slide-1.jpg", "images/thumb/thumb-slide-2.jpg", "images/thumb/thumb-slide-3.jpg", "images/thumb/thumb-slide-4.jpg", "images/thumb/thumb-slide-5.jpg", "images/thumb/thumb-slide-6.jpg"], // can be text, image, or something			        
	    	paginationContentType : 'image', // text, image
	    	paginationContentWidth : 116, // pagination content width in pixel
	    	paginationImageHeight : 80, // pagination image height
	    	width : 720, // slideshow width
     		height : 540, // slideshow height
	    	themeClass : 'default-big',
	    	fullWidth : false, // slider will scale to the container size
     		fullHeight : false, // slideshow height will resize to browser height
	})

	var sangar = $('.sangar-example-cart-4').sangarSlider({
	    	timer :  false, // true or false to have the timer
	    	pagination : 'content-horizontal', // bullet, content, none
	    	paginationContent : ["images/thumb/thumb-slide-1.jpg", "images/thumb/thumb-slide-2.jpg", "images/thumb/thumb-slide-3.jpg", "images/thumb/thumb-slide-4.jpg", "images/thumb/thumb-slide-5.jpg", "images/thumb/thumb-slide-6.jpg"], // can be text, image, or something			        
	    	paginationContentType : 'image', // text, image
	    	paginationContentWidth : 116, // pagination content width in pixel
	    	paginationImageHeight : 80, // pagination image height
	    	width : 720, // slideshow width
     		height : 540, // slideshow height
	    	themeClass : 'default-big',
	    	fullWidth : false, // slider will scale to the container size
     		fullHeight : false, // slideshow height will resize to browser height
	})

	$("#owl-demo").owlCarousel({ 
	    autoPlay: 99999999, //Set AutoPlay to 3 seconds
	    items : 3,
	    navigation : true,
	    itemsDesktop : [1199,3],
	    itemsDesktopSmall : [979,3]
	});
	$("#owl-demo-2").owlCarousel({
	    autoPlay: 24000, //Set AutoPlay to 3 seconds
	    items : 4,
	    navigation : true,
	    itemsDesktop : [1199,3],
	    itemsDesktopSmall : [979,3]
	})
	$("#owl-demo-3").owlCarousel({
	    autoPlay: 3000, //Set AutoPlay to 3 seconds
	    items : 3,
	    itemsDesktop : [1199,3],
	    itemsDesktopSmall : [979,3]
	})
	$("#owl-demo-4").owlCarousel({
	    autoPlay: 3000, //Set AutoPlay to 3 seconds
	    items : 3,
	    itemsDesktop : [1199,3],
	    itemsDesktopSmall : [979,3]
	})

	$("#shp").click(function(e){
		$(".popup").toggleClass("popup-shw")
		$(".popup-wrap").toggleClass("popup-wrap-shw")
		$("body").toggleClass("ovf")
		return false
	})
	$(".popup-close").click(function(){
		$(".popup").toggleClass("popup-shw")
		$(".popup-wrap").toggleClass("popup-wrap-shw")
		$("body").toggleClass("ovf")
	})

});
new AnimOnScroll(document.getElementById("redgridloader"),{minDuration:.4,maxDuration:.7,viewportFactor:.2});
function isNumberKey(b){b=b.which?b.which:event.keyCode;return 31<b&&(48>b||57<b)?!1:!0}jQuery.validator.setDefaults({debug:!0,success:"valid"});
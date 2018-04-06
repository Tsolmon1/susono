(function($){ 

    $.fn.extend({
		
		addSimpleMarker: function(i, lat, lng, marker, linkUrl, thumb, title, beds, baths, cars, excerpt) {
			
			//// MAIN VARS
			var myGmap = this;
			
			//// ADDS THE SIMPLE MARKER
			myGmap.gmap3({
				
				marker: {
					
					latLng: [lat, lng],
					id: i,
					
					//// MARKER ICON		
					options: {
						
						icon: marker
						
					},
					
					//// EVENTS FOR THIS MARKER
					events: {
						
						//// ON CLICK
						click: function(marker, event, context) {
							
							//// REDIRECTS USER
							window.location = linkUrl;
							
						},
						
						//// WHEN USER HOVERS LET'S SHOW OUR OVERLAY
						mouseover: function(marker, event, context) {
							
							//// DISPLAY OUR CUSTOM MARKER OVERLAY
							jQuery('#marker_overlay_'+context.id).css({ left: '20px', opacity: 0, display: 'block' }).animate({ left: 0, opacity: 1 }, 150);
							
						},
						
						//// WHEN USER LEAVES WE HIDE IT
						mouseout: function(marker, event, context) {
							
							//// DISPLAY OUR CUSTOM MARKER OVERLAY
							jQuery('#marker_overlay_'+context.id).fadeOut(100);
							
						}
						
					}
					
				},
				
				//// ADDS OUR CUSTOM MARKER OVERLAY
				overlay: {
					
					latLng: [lat, lng],
					options: {
						
						content: '<div class="overlay-simple-marker" id="marker_overlay_'+i+'"><span class="arrow"></span><img src="'+thumb+'" alt="" title="" /><span class="title">'+title+'</span><span class="bedrooms">'+beds+'</span><span class="bathrooms">'+baths+'</span><span class="cars">'+cars+'</span><div class="clear"></div><p>'+excerpt+'</p></div>',
						offset: { y: -33, x: 18 }
						
					}
					
				}
				
			});
			
		},
		
		addFeaturedMarker: function(i, lat, lng, marker, linkUrl, thumb, current, data) {
			if(lat != "") {
				
			//// MAIN VARS
			//// ADDS OUR MAP STUFF
			myGmap.gmap3({
				
				//// ADDS MARKER
				marker: {
					
					latLng: [lat, lng],
					id: i,
					
					//// MARKER ICON
					options: {
						
						icon: marker
						
					},
					
					events: {
					
						//// WHEN WE MOUSE OVER
						mouseover: function(marker, event, context) {
							
							//// IF IT'S NO ALREADY CURRENT
							if(jQuery('#marker_overlay_featured_'+context.id).attr('class').indexOf('current') == -1) {
							
								/// LET'S FADE OUR CURRENT OUT AND THE HOVERED IN
								jQuery('.overlay-featured-marker-current').animate({ opacity: .65, left: '15px', top: '30px', width: '32px', height: '32px' }, { duration: 200, easing: 'easeOutBack', complete: function() { jQuery(this).removeClass('overlay-featured-marker-current'); } });
								jQuery('.overlay-featured-marker-current .arrow').animate({ left: '18px' }, { duration: 200, easing: 'easeOutBack' });
								
								jQuery('#marker_overlay_featured_'+i).animate({ opacity: 1, left: '0px', top: '0px', width: '42px', height: '42px' }, { duration: 200, easing: 'easeOutBack', complete: function() { jQuery(this).addClass('overlay-featured-marker-current'); } });
								jQuery('#marker_overlay_featured_'+i+' .arrow').animate({ left: '33px' }, { duration: 200, easing: 'easeOutBack' });
								
								//// PLAYS THE SLIDERS
								jQuery('#slider-map-featured ul').playProperty(context.id);
								
							}
							
						},
						
						click: function(marker, event, context) {
							
							//// REDIRECTS USER
							window.location = linkUrl;
							
						}
					
					}
					
				},
				
				//// ADDS OUR OVERLAY
				overlay: {
					
					latLng: [lat, lng],
					options: {
						
						//// OUR HTML AND OFFSET
						content: '<div class="overlay-featured-marker" id="marker_overlay_featured_'+i+'"><img src="'+thumb+'" width="20"/><span class="arrow"></span><span class="latlng">'+lat+','+lng+'</span></div>',
						offset: { y: -95, x: -27 }	
						
					},
					
					events: {
						
						click: function(marker, event, context) {
							
							//// REDIRECTS USER
							//window.location = linkUrl;
							var n=data.split("&");
							 var map = $(this).gmap3("get"),
                             infowindow = $(this).gmap3({get:{name:"infowindow"}});   
                        	//marker.setIcon(n[9]);
                        	//infowindow.open(map, marker);                                   
                            //infowindow.setContent("<b>" + n[0] + "</b><br/>" + n[1]+ "<br/>Angle:" + n[6]);
                            document.getElementById("id").value = n[10];
                            //getcoordinate(context.id);                                            
                            document.getElementById("location").value = n[8];
                            document.getElementById("strike").value = n[4];
                            document.getElementById("dip").value = n[5];
                            document.getElementById("angle").value = n[6];
                            document.getElementById("note").value = n[3];
                            document.getElementById("rockname").value = n[0];
                            document.getElementById("size").value = n[1];
                            document.getElementById("symbol").value = n[2];
                            //document.getElementById("file").value = document.getElementById("file").value;

                            document.getElementById("strike1").value = n[4];
                            document.getElementById("dip1").value = n[5];
                            document.getElementById("angle1").value = n[6];
                            document.getElementById("note1").value = n[3];
                            document.getElementById("rockname1").value = n[0];
                            document.getElementById("size1").value = n[1];
                            document.getElementById("symbol1").value = n[2];
							//alert(context.data);
						}
						
					},
				
					//// CALLBACK
					callback: function(results) {
						
						setTimeout(function() {
							
							var marker = jQuery('#marker_overlay_featured_'+i);
							var finalOpacity = .65;
							if(current == true) { 
								finalOpacity = 1; marker.addClass('overlay-featured-marker-current');
								marker.css({ opacity: .1, display: 'block', top: '-50px' }).animate({ top: '0', opacity: finalOpacity }, { duration: 600, easing: 'easeOutBounce' });
							}
							else {
								marker.css({ opacity: .1, display: 'block', top: '-80px' }).animate({ top: '30px', opacity: finalOpacity }, { duration: 600, easing: 'easeOutBounce' });
							}
							
							//// IF ITS CURRENT
							//// WHEN WE MOUSE OVER OUR OVERLAY
							jQuery('#marker_overlay_featured_'+i).hover(function() {
								
								//// IF IT'S NOT ALREADY CURRENT
								if(jQuery('#marker_overlay_featured_'+i).attr('class').indexOf('current') == -1) {
							
									/// LET'S FADE OUR CURRENT OUT AND THE HOVERED IN
									jQuery('.overlay-featured-marker-current').animate({ opacity: .65, left: '15px', top: '30px', width: '42px', height: '42px' }, { duration: 200, easing: 'easeInOutBack', complete: function() { jQuery(this).removeClass('overlay-featured-marker-current'); } });
									jQuery('.overlay-featured-marker-current .arrow').animate({ left: '18px' }, { duration: 200, easing: 'easeInOutBack' });
									
									jQuery('#marker_overlay_featured_'+i).animate({ opacity: 1, left: '0px', top: '0px', width: '72px', height: '72px' }, { duration: 200, easing: 'easeInOutBack', complete: function() { jQuery(this).addClass('overlay-featured-marker-current'); } });
									jQuery('#marker_overlay_featured_'+i+' .arrow').animate({ left: '33px' }, { duration: 200, easing: 'easeInOutBack' });
									
									//// PLAYS THE SLIDERS
									jQuery('#slider-map-featured ul').playProperty(i);
									
								}
								
							}, function() {
								
								
								
							});
							
						}, 700);
						
					}
					
				}
				
			});
			}
			
			//// ADDS AN EXTRA OVERLAY SO WHEN WE PAN OUR MAP IT SHOWS THE TARGET
			/*myGmap.gmap3({
				
				overlay: {
					
					latLng: [lat, lng],
					options: {
						
						content : '<div class="overlay-target" id="marker_overlay_target_'+i+'"></div>',
						offset: { y: -41, x: -28 }
						
					}
					
				}
				
			});*/
			
		},
		
		gmapZoomIn: function(mapObj) {
			
			//// vars
			var zoomCont = this;
			
			//// when user clicks it
			zoomCont.click(function() {
			
				//// LETS GET CURRENT ZOOM LEVEL AND INCREASE IT
				
				var zoomLevel = jQuery(mapObj).gmap3('get').getZoom();
				zoomLevel++;
				if(zoomLevel>20) { zoomLevel = 20; }
				
				//// SETS NEW ZOOM
				mapObj.gmap3({ map:{
					
					options: {
						
						zoom: zoomLevel
						
					}
					
				}});
				
			});
			
		},
		
		gmapZoomOut: function(mapObj) {
			
			//// vars
			var zoomCont = this;
			
			//// when user clicks it
			zoomCont.click(function() {
			
				//// LETS GET CURRENT ZOOM LEVEL AND INCREASE IT
				
				var zoomLevel = jQuery(mapObj).gmap3('get').getZoom();
				zoomLevel--;
				if(zoomLevel<=2) { zoomLevel = 2; }
				
				//// SETS NEW ZOOM
				mapObj.gmap3({ map:{
					
					options: {
						
						zoom: zoomLevel
						
					}
					
				}});
				
			});
			
		},
		
		sliderMapFeaturedInit: function() {
			
			//// vars
			var mainCont = this;
			var ulCont = this.children('ul');
			var currentCont = ulCont.children('li:first').addClass('current');
			var mapIndex = currentCont.attr('id').split('_');
			var mapIndex = mapIndex[2];
			var prevSlider = jQuery('#slider-map-featured-left');
			var nextSlider = jQuery('#slider-map-featured-right');
			
			//// CENTERS OUR CURRENT ITEM
			ulCont.centerSliderMapFeatured(0, function() {
				
				ulCont.children('li').fadeIn(300);
				
			});
			
			//// WHEN USER RESIZES MAKE SUR EWE STAY CENTERED
			jQuery(window).resize(function() {
				
				var currentItemIndex = ulCont.children('li.current').index();
				ulCont.centerSliderMapFeatured(currentItemIndex);
				
			});
			
			//// WHEN USER HOVERS OUR FEATURED SLIDER WE DISPLAY OUR ARROWS
			prevSlider.css({ display: 'block', opacity: 0 });
			nextSlider.css({ display: 'block', opacity: 0 });
			
			mainCont.hover(function() {
				
				prevSlider.stop().animate({ opacity: .6 }, 200);
				nextSlider.stop().animate({ opacity: .6 }, 200);
				
			},function() {
				
				prevSlider.stop().animate({ opacity: 0 }, 400);
				nextSlider.stop().animate({ opacity: 0 }, 400);
				
			});
			
			prevSlider.hover(function() { jQuery(this).stop().animate({ opacity: 1 }, 200); }, function() { jQuery(this).stop().animate({ opacity: .7 }, 200); });
			nextSlider.hover(function() { jQuery(this).stop().animate({ opacity: 1 }, 200); }, function() { jQuery(this).stop().animate({ opacity: .7 }, 200); });
			
			//// WHEN SUER CLICKS IT!
			nextSlider.click(function() {
				
				/// LETS GET THE SECOND ITEM AFTER CURRENT AND CENTER IT
				var nextItem = ulCont.children('li.current').next().next().attr('id').split('_');
				ulCont.playProperty(nextItem[2]);
				myGmap.shoeFeaturedOverlay(nextItem[2]);
				
			});
			
			//// WHEN SUER CLICKS IT!
			prevSlider.click(function() {
				
				/// LETS GET THE SECOND ITEM AFTER CURRENT AND CENTER IT
				var nextItem = ulCont.children('li.current').prev().prev().attr('id').split('_');
				ulCont.playProperty(nextItem[2]);
				myGmap.shoeFeaturedOverlay(nextItem[2]);
				
			});
			
			//// WHEN WE CLICK AN ITEM
			ulCont.children('li').click(function() {
				
				/// MAKES IT CURRENT
				var nextItem = jQuery(this).attr('id').split('_');
				ulCont.playProperty(nextItem[2]);
				
				//// SHOWS IT ON THE MAP
				myGmap.shoeFeaturedOverlay(nextItem[2]);
				
			});
			
		},
		
		centerSliderMapFeatured: function(centerIndex, callBack) {
			
			//// VARS
			var mainCont = this;
			var currentCont = mainCont.children('li:eq('+centerIndex+')');
			var windowWidth = jQuery(window).width();
			var liWidth = mainCont.children('li').outerWidth();
			var currentLeft = parseInt(mainCont.css('left'));
			var qtyBeforeLis = mainCont.children('li:lt('+centerIndex+')').length;
			
			//// CALCULATES THE LEFT BASED ON OUR WINDOW WIDTH AND NUMBER OF LIs
			var leftSpace = (windowWidth - 1000) / 2;
			var newLeft = (qtyBeforeLis*liWidth)-leftSpace;
			if(qtyBeforeLis === 0) { newLeft = leftSpace; mainCont.css({ left: newLeft+'px' }); }
			else { mainCont.css({ left: '-'+newLeft+'px' }); }
			
			//// LET'S CALCULATE HOW MANY ITEMS WE NEED TO PUT IN FRON OF IT TO FILL PAGE
			//// THEN WE APPEND THE LAS ITEMS TO THE FRONT
			var countLeft = Math.ceil(leftSpace / liWidth);
			
			//// IF IT'S THE FIRST TIME LET'S ADD AN EXTRA ONE
			if(qtyBeforeLis === 0) { countLeft++; }
			
			//// MAKES SURE WE ALSO DONT ALREADY HAVE THIS LI'S BEFORE
			if(countLeft > centerIndex) {
				for(var i = 1; i<= countLeft; i++) {
					
					//// LETS PREPEND IT
					mainCont.children('li:last').prependTo(mainCont);
					var currentLeft = parseInt(mainCont.css('left'));
					
					//// FIXES LEFT
					var newLeft = currentLeft - liWidth;
					mainCont.css({ left: newLeft+'px' });
					
				}
			}
			
			//// CALLBACK
			if(typeof callBack == 'function') { callBack.call(mainCont); }
			
		},
		
		playProperty: function(mapIndex) {
			
			//// vars
			var mainCont = this;
			var currentLi = mainCont.children('li.current');
			var nextLi = mainCont.children('#marker_featured_'+mapIndex);
			var realIndex = nextLi.index();
			var windowWidth = jQuery(window).width();
			var liWidth = mainCont.children('li').outerWidth();
			var currentLeft = parseInt(mainCont.css('left'));
			var indexDifference = realIndex-currentLi.index();
			
			//// LETS FIND OUT IF WE'rE PLAYING BACK OR FORWARD
			//// PLAYING FORWARD
			if(realIndex > currentLi.index()) {
				
				//// LET'S FIND OUT THE AMOUNT OF ITEMS WE NEED TO CLONE
				var availableSpace = (windowWidth - 1000) / 2;
				var countRight = Math.ceil(availableSpace / liWidth);
				var lengthAfer = mainCont.children('li:gt('+realIndex+')').length;
				if(lengthAfer === 0) { countRight++; }
				
				//// IF WE DONT HAVE ENOUGH LIS AFTER
				if(countRight >= lengthAfer) {
					
					//// LET'S CLONE STUFF
					for(var i = 1; i<= countRight; i++) {
					
						//// LETS PREPEND IT
						mainCont.children('li:first').appendTo(mainCont);
						var currentLeft = parseInt(mainCont.css('left'));
						
						//// FIXES LEFT
						var newLeft = currentLeft + liWidth;
						mainCont.css({ left: newLeft+'px' });
						
					}
					
				}
				
				//// NOW WE CALCULATE THE NEW LEFT BASED ON THE INDEX
				var currentLeft = parseInt(mainCont.css('left'));
				var realIndexNew = nextLi.index();
				var newLeft = availableSpace-(realIndexNew*liWidth);
				
				//// ANIMATES STUFF
				currentLi.removeClass('current').children('.property-info').slideUp();
				nextLi.addClass('current').children('.property-info').hide();
				mainCont.stop().animate({ left: newLeft+'px' }, { duration: 300, ease: 'easeInOutQuint', complete: function() {
					
					nextLi.children('.property-info').slideDown({ duration: 100, ease: 'easeInOutQuint' });
					
				}});
				
			}
			//// PLAYING BACK
			else {
				
				//// LET'S FIND OUT THE AMOUNT OF ITEMS WE NEED TO CLONE
				var availableSpace = (windowWidth - 1000) / 2;
				var countLeft = Math.ceil(availableSpace / liWidth);
				var lengthBefore = mainCont.children('li:lt('+realIndex+')').length;
				if(lengthBefore === 0) { countLeft++; }
				
				//// IF WE DONT HAVE ENOUGH LIS AFTER
				if(countLeft >= lengthBefore) {
					
					//// LET'S CLONE STUFF
					for(var i = 1; i<= countLeft; i++) {
					
						//// LETS PREPEND IT
						mainCont.children('li:last').prependTo(mainCont);
						var currentLeft = parseInt(mainCont.css('left'));
						
						//// FIXES LEFT
						var newLeft = currentLeft - liWidth;
						mainCont.css({ left: newLeft+'px' });
						
					}
					
				}
				
				//// NOW WE CALCULATE THE NEW LEFT BASED ON THE INDEX
				var currentLeft = parseInt(mainCont.css('left'));
				var realIndexNew = nextLi.index();
				var newLeft = availableSpace-(realIndexNew*liWidth);
				
				//// ANIMATES STUFF
				currentLi.removeClass('current').children('.property-info').slideUp();
				nextLi.addClass('current').children('.property-info').hide();
				mainCont.stop().animate({ left: newLeft+'px' }, { duration: 300, ease: 'easeInOutQuint', complete: function() {
					
					nextLi.children('.property-info').slideDown({ duration: 100, ease: 'easeInOutQuint' });
					
				}});
				
			}
			
		},
		
		shoeFeaturedOverlay: function(index) {
			
			//// VARS
			var myGmap = this;
			var thisOverlay = jQuery('#marker_overlay_featured_'+index);
			var latlng = thisOverlay.children('span.latlng').text().split(',');
			var thisTarget = jQuery('#marker_overlay_target_'+index)
			
			//// PANS OUR MAP TO OUR NEW LOCATION
			var myLatLng = new google.maps.LatLng(latlng[0],latlng[1])
			jQuery(myGmap).gmap3('get').panTo(myLatLng);
			
			//// ANIMATES OUR OVERLAY
			jQuery('.overlay-featured-marker-current').animate({ opacity: .65, left: '15px', top: '30px', width: '42px', height: '42px' }, { duration: 200, easing: 'easeInOutBack', complete: function() { jQuery(this).removeClass('overlay-featured-marker-current'); thisTarget.fadeIn(600, function() { thisTarget.delay(200).fadeOut(600); }); } });
			jQuery('.overlay-featured-marker-current .arrow').animate({ left: '18px' }, { duration: 200, easing: 'easeInOutBack' });
			
			jQuery('#marker_overlay_featured_'+index).animate({ opacity: 1, left: '0px', top: '0px', width: '72px', height: '72px' }, { duration: 200, easing: 'easeInOutBack', complete: function() { jQuery(this).addClass('overlay-featured-marker-current'); } });
			jQuery('#marker_overlay_featured_'+index+' .arrow').animate({ left: '33px' }, { duration: 200, easing: 'easeInOutBack' });
			
		},
		
		replaceSelect: function() {
			
			//// vars
			var selCont = this;
			
			//// WRAPS IT AROUND SELECT
			selCont.wrap('<div class="select-replace"></div>');
			var mainCont = selCont.parent();
			var selectedItem = selCont.children('option:selected');
			mainCont.append('<span>'+selectedItem.text()+'</span>');
			var mainContHeight = mainCont.height();
			
			//// MAKES IT OVERLAY THE CONTAINER
			selCont.css({ display: 'block', opacity: 0 });
			
			//// WHEN WE CHANGE SELECT
			selCont.change(function() {
				
				//// NEW SELECTED ITEM
				var selectedItem = selCont.children('option:selected');
				mainCont.children('span').text(selectedItem.text());
				
			});
			
		},
		
		replaceCheckbox: function() {
			
			//// vars
			var selCont = this;
			
			//// WRAPS IT AROUND SELECT
			selCont.wrap('<div class="checkbox-replace"></div>');
			var mainCont = selCont.parent();
			
			//// IF IT'S CHECKED
			if(selCont.is(':checked')) { mainCont.addClass('checkbox-replace-checked'); }
			
			//// MAKES IT OVERLAY THE CONTAINER
			selCont.css({ display: 'none' });
			
			//// WHEN WE CLICK THE MAIN CONTAINER
			mainCont.click(function() {
				
				//// IF IT'S CHECKED
				if(jQuery(this).attr('class').indexOf('checked') != -1) {
					
					//// UNCHECKS IT
					jQuery(this).removeClass('checkbox-replace-checked');
					selCont.removeAttr('checked');
					
				} else {
					
					//// UNCHECKS IT
					jQuery(this).addClass('checkbox-replace-checked');
					selCont.attr('checked', 'checked');
					
				}
				
			});
			
		},
		
		showSearchSection: function() {
			
			//// GETS VALUE OF SELECTED ITEM
			var selCont = this;
			var newSelVal = jQuery(this).children('option:selected').val();
			var newItemToShow = jQuery('#property-search-'+newSelVal);
			
			
			//// IF SELECTED VALUE IS HIDDEN
			if(newItemToShow.is(':visible')) {  } else { selCont.parent().parent().siblings('div').slideUp(200, function() {
				
				//// SHOWS THE OTHER
				newItemToShow.slideDown(200);
				
			}); }
			
		},
		
		rbChangeView: function() {
			
			//// MAIN VARS
			var aCont = this;
			var mainCont = jQuery('#properties');
			
			aCont.click(function(e) {
				
				//// MAKES SURE WE ARE NOT IN THE SELECTED VIEW
				if(jQuery(this).parent().attr('class').indexOf('current') == -1 && jQuery(this).parent().attr('class').indexOf('map') == -1) {
				
					var clickedView = jQuery(this).parent().attr('class');
					
					//// CHANGES VIEW
					mainCont.stop().animate({ opacity: 0 }, 200, function() {
						
						jQuery(this).attr('class', clickedView).stop().animate({ opacity: 1 }, 200);
						
					});
					
					jQuery(this).parent().siblings('.current').removeClass('current');
					jQuery(this).parent().addClass('current');
				
				}
				
				//// IF ITS NOT MAP
				if(jQuery(this).parent().attr('class').indexOf('map') == -1) {
				
					//// PREVENTS A CLICK
					e.preventDefault();
					return false;
					
				} else { return true; }
				
			})
			
		},
		
		filterSearchSection: function() {
			
			//// vars
			var mainCont = jQuery('#filter');
			var selCont = this;
			
			//// GETS THE CHOSEN TYPE
			var chosenType = selCont.children('option:selected');
			
			//// HIDES THE CURRENT ONE
			var showCont = mainCont.find('.filter-'+chosenType.val());
			
			//// IF IT'S HIDDEN
			if(!showCont.is(':visible')) {
				
				//// HIDE VISIBLE AND SHOWS THE NEW ONE
				mainCont.find('.filter').fadeOut(200, function() {
					
					
					
				});
				
				showCont.delay(200).fadeIn(200);
				
			}
			
		}
		
	});
	
})(jQuery);






/*! Backstretch - v2.0.3 - 2012-11-30
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2012 Scott Robbin; Licensed MIT */
(function(e,t,n){"use strict";e.fn.backstretch=function(r,s){return(r===n||r.length===0)&&e.error("No images were supplied for Backstretch"),e(t).scrollTop()===0&&t.scrollTo(0,0),this.each(function(){var t=e(this),n=t.data("backstretch");n&&(s=e.extend(n.options,s),n.destroy(!0)),n=new i(this,r,s),t.data("backstretch",n)})},e.backstretch=function(t,n){return e("body").backstretch(t,n).data("backstretch")},e.expr[":"].backstretch=function(t){return e(t).data("backstretch")!==n},e.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5e3,fade:0};var r={wrap:{left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},img:{position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxWidth:"none",zIndex:-999999}},i=function(n,i,o){this.options=e.extend({},e.fn.backstretch.defaults,o||{}),this.images=e.isArray(i)?i:[i],e.each(this.images,function(){e("<img />")[0].src=this}),this.isBody=n===document.body,this.$container=e(n),this.$wrap=e('<div class="backstretch"></div>').css(r.wrap).appendTo(this.$container),this.$root=this.isBody?s?e(t):e(document):this.$container;if(!this.isBody){var u=this.$container.css("position"),a=this.$container.css("zIndex");this.$container.css({position:u==="static"?"relative":u,zIndex:a==="auto"?0:a,background:"none"}),this.$wrap.css({zIndex:-999998})}this.$wrap.css({position:this.isBody&&s?"fixed":"absolute"}),this.index=0,this.show(this.index),e(t).on("resize.backstretch",e.proxy(this.resize,this)).on("orientationchange.backstretch",e.proxy(function(){this.isBody&&t.pageYOffset===0&&(t.scrollTo(0,1),this.resize())},this))};i.prototype={resize:function(){try{var e={left:0,top:0},n=this.isBody?this.$root.width():this.$root.innerWidth(),r=n,i=this.isBody?t.innerHeight?t.innerHeight:this.$root.height():this.$root.innerHeight(),s=r/this.$img.data("ratio"),o;s>=i?(o=(s-i)/2,this.options.centeredY&&(e.top="-"+o+"px")):(s=i,r=s*this.$img.data("ratio"),o=(r-n)/2,this.options.centeredX&&(e.left="-"+o+"px")),this.$wrap.css({width:n,height:i}).find("img:not(.deleteable)").css({width:r,height:s}).css(e)}catch(u){}return this},show:function(t){if(Math.abs(t)>this.images.length-1)return;this.index=t;var n=this,i=n.$wrap.find("img").addClass("deleteable"),s=e.Event("backstretch.show",{relatedTarget:n.$container[0]});return clearInterval(n.interval),n.$img=e("<img />").css(r.img).bind("load",function(t){var r=this.width||e(t.target).width(),o=this.height||e(t.target).height();e(this).data("ratio",r/o),e(this).fadeIn(n.options.speed||n.options.fade,function(){i.remove(),n.paused||n.cycle(),n.$container.trigger(s,n)}),n.resize()}).appendTo(n.$wrap),n.$img.attr("src",n.images[t]),n},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(this.index===0?this.images.length-1:this.index-1)},pause:function(){return this.paused=!0,this},resume:function(){return this.paused=!1,this.next(),this},cycle:function(){return this.images.length>1&&(clearInterval(this.interval),this.interval=setInterval(e.proxy(function(){this.paused||this.next()},this),this.options.duration)),this},destroy:function(n){e(t).off("resize.backstretch orientationchange.backstretch"),clearInterval(this.interval),n||this.$wrap.remove(),this.$container.removeData("backstretch")}};var s=function(){var e=navigator.userAgent,n=navigator.platform,r=e.match(/AppleWebKit\/([0-9]+)/),i=!!r&&r[1],s=e.match(/Fennec\/([0-9]+)/),o=!!s&&s[1],u=e.match(/Opera Mobi\/([0-9]+)/),a=!!u&&u[1],f=e.match(/MSIE ([0-9]+)/),l=!!f&&f[1];return!((n.indexOf("iPhone")>-1||n.indexOf("iPad")>-1||n.indexOf("iPod")>-1)&&i&&i<534||t.operamini&&{}.toString.call(t.operamini)==="[object OperaMini]"||u&&a<7458||e.indexOf("Android")>-1&&i&&i<533||o&&o<6||"palmGetResource"in t&&i&&i<534||e.indexOf("MeeGo")>-1&&e.indexOf("NokiaBrowser/8.5.0")>-1||l&&l<=6)}()})(jQuery,window);
/*!
 * Plugin do jQuery slideMosaic
 * Arrisco - Publicidade e Design, Lda
 * Copyright (c) Arrisco - Publicidade e Design, Lda
 * Version: 0.01 (21-10-2010)
 * Licenciado em MIT e GPL3.
 * Testado: jQuery v1.4.4 ou superior
 */


(function($){
	jQuery.fn.slidemosaic = function(settings){
		// Settings default
		
		var element = $(this);
		var img = new Image();
		var imageWidth;
		var imageHeight;
		var elementID = element.attr('id');
		
		settings = jQuery.extend({
                                            currentImage: '',
                                            lines:  1,
                                            columns: 6,
                                            containerTime: 200,
                                            mosaicTime: 200,
                                            slideLeft: 0,
                                            slideTop: 0
                                            },
                                            settings);

			
		
		

		var createDelegate = function(object, method){
		    return function(){
		        return method.apply(object, arguments);
		    };
		};

		var img_onload = function(){
			imageWidth = this.width;
			imageHeight = this.height;
			resizeContainer(imageWidth, imageHeight);
		};


		var imageDimensions = function(){
			img.onload = createDelegate(img, img_onload); //Para o Internet Explorer tem que se anexar este evento antes de indicar qual o src
			img.src = settings.currentImage;			  // Doutra forma não considera o onload da img
		};
		
		var resizeContainer = function(imageWidth, imageHeight){
			
			var columnWidth = parseInt(imageWidth / settings.columns);
			var columnHeight = parseInt(imageHeight / settings.lines);
			
			
			var containerWidth = columnWidth * settings.columns;
			var containerHeight = columnHeight * settings.lines;
			
			var numberOfElements = settings.columns * settings.lines;
			
			element.css('opacity', 1);
			$('.slideMosaicCells').remove();

                        if($('#'+elementID+'Overlay').length < 1){
                            element.append('<div id="'+elementID+'Overlay" class="slideMosaicOverlay"></div>');
                        }

                       
                         $('#'+elementID+'Overlay').css('width', containerWidth);
                         $('#'+elementID+'Overlay').css('height', containerHeight);



			element.animate({
                                        'width':  containerWidth,
                                        'height': containerHeight
                                }, settings.containerTime, function(){


                                        column = 0;
                                        j= 0;

                                        var allMosaics = new Array;

                                        for(i = 0; i< numberOfElements; i++){

                                                allMosaics[i] = i;



                                                if( i > 0 && i % settings.columns == 0){
                                                        column++;
                                                }

                                                if(j == settings.columns){
                                                        j= 0;
                                                }



                                                element.append("\n"+'<div id="'+elementID+'Celulas_'+i+'" class="slideMosaicCells" style="width: '+columnWidth+'px; height:'+columnHeight+'px">&nbsp;</div>'+"\n");
                                                positionLeft = (columnWidth * j) * -1;
                                                positionTop = (columnHeight * column) *-1 ;
                                                $('#'+elementID+'Celulas_'+i).css('background-image', 'url('+img.src+')');
                                                $('#'+elementID+'Celulas_'+i).css('background-position', positionLeft+'px '+positionTop+'px');

                                                $('#'+elementID+'Celulas_'+i).css('top', parseInt((positionTop + settings.slideTop) * -1)+'px');
                                                $('#'+elementID+'Celulas_'+i).css('left', parseInt((positionLeft + settings.slideLeft) * -1)+'px');


                                                j++;

                                        }

                                        theMosaics = allMosaics.shuffle();

                                        $('.slideMosaicCells').css('opacity', 0);
                                        showMosaics(theMosaics);



                                });
		};
		
		
		var showMosaics= function(theMosaics){
			
			arraySize = theMosaics.length;
			
			
			if(arraySize > 0){
				
				whichMosaic = theMosaics.pop();
				
				correctionLeft = parseInt($('.slideMosaicCells').eq(whichMosaic).css('left')) - parseInt(settings.slideLeft * -1);
				correctionTop  = parseInt($('.slideMosaicCells').eq(whichMosaic).css('top')) - parseInt(settings.slideTop * -1);
				
				$('.slideMosaicCells').eq(whichMosaic).animate({'opacity': 1, 'left': correctionLeft+'px', 'top': correctionTop+'px'}, settings.mosaicTime, function(){
					showMosaics(theMosaics);
				});
			
			}else{
							$('#'+elementID+'Overlay').animate({'opacity': '1'},1500);
                            $('#'+elementID+'Overlay').css('background-image', 'url('+settings.currentImage+')');
                            $('#'+elementID+'Overlay').animate({'opacity': '0.5'},1500);

                        }
			
								
			
			
		};
		
		
		var slidemosaic = function(){
			imageDimensions();
		};
		
		
		
		slidemosaic();
		
		
		
		
		
		
		
		// Return
		return jQuery;
	};
})(jQuery);

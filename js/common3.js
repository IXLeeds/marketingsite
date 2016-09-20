$(document).ready(function () {
    if( $('#slider_container').length ) {
        $('#slider_container').bxSlider({
            adaptiveHeight: true,
            pager: false
        });
    }
    if( $('#slider-about').length ) {
        $('#slider-about').bxSlider({
            adaptiveHeight: true,
            pager: true,
            captions: true,
            controls: false,
            pagerCustom: '.bx-pager'
        });
    }
    if( $('#slider-board').length ) {
        $('#slider-board').bxSlider({
            adaptiveHeight: true,
            pager: false,
            nextSelector: '.slider-board-next',
            prevSelector: '.slider-board-prev'
        });
    }

    
    if( $('.social-block').length ) {
        $('.social-block a').hover(function(){
            $('.social-block a').css('opacity','.5');
            $(this).css('opacity','1');
        }, function(){
            $('.social-block a').css('opacity','1');
        });
    }
    
    if( $('#graph-day').length ) {

        var data_day = [ [0, 2000], [3, 2110], [6, 1670], [10, 1700], [12, 2300], [15, 2190], [19, 1300], [24, 1500] ];
        
		$.plot("#graph-day", [{
			label: 'Actual traffic last 24 hours',
			data: data_day,
            color: '#91b6c9',
			lines: { show: true, fill: true, fillColor: '#9ecce4', lineWidth: '4' },
            points: { show: true, radius: 8, lineWidth: '4' }
		}], {
			yaxis: {
				show: false,
                max: 3000
			},
			xaxis: {
				show: false,
                max: 24
			},
            grid: { 
                backgroundColor: '#ffffff',
                borderWidth: 0,
                margin: 0
            }
		});
        $('#graph-day').append($('#graph-day-label'));

    }
    if( $('#graph-month').length ) {

        var data_month = [ [0, 2000], [2, 2110], [3, 1670], [5, 1700], [7, 2300], [9, 2190], [10, 1300], [12, 1500] ];
        
		$.plot("#graph-month", [{
			label: 'Actual traffic last month',
            data: data_month,
            color: '#91b6c9',
			lines: { show: true, fill: true, fillColor: '#9ecce4', lineWidth: '4' },
            points: { show: true, radius: 8, lineWidth: '4' },
            tickLength: {
                container: null
            }
		}], {
			yaxis: {
				show: false,
                max: 3000
			},
			xaxis: {
				show: false,
                max: 12
			},
            grid: { 
                backgroundColor: '#ffffff',
                borderWidth: 0
            },
            label: {
                size: 30,
                lineHeight: 13,
                style: "italic",
                weight: "bold",
                family: "sans-serif",
                variant: "small-caps",
                color: "#545454"                
            }
		});
        $('#graph-month').append($('#graph-month-label'));

    }
});

//$(window).load(function () {
//    $(window).scroll(function () {
//        if( $('.logo-block').length ) {
//            $( '.logo-block .logo-leeds' ).animate({
//                right: '-100%'
//            }, 2000, 'linear','');
//            $( '.logo-block .logo-i' ).animate({
//                left: '-100%'
//            }, 2000, 'linear','');
//            $( '.logo-block .logo-arrow-top' ).animate({
//                left: '-150px',
//                top: '-300px'
//            }, 2000, 'linear','');
//            $( '.logo-block .logo-arrow-bottom' ).animate({
//                top: '-300px'
//            }, 2000, 'linear','');
//            $( '.logo-block' ).animate({
//                marginBottom: '-289px'
//            }, 1000, 'linear',function(){
//                $( '.logo-block' ).hide();
//            });
//        }
//
//    });
//});
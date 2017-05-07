function resize(){
    var width = ( $('body').width() - 960 ) / 2 ;
    var height = ( $(window).height() - $('body').height() ) / 2 ;

    height = height > 0 ? height : 0 ;

    $(".page").css('margin', height + 'px ' + width + 'px') ;
}
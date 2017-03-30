<?php
namespace Home\Controller;
use Common\Controller\CommonController;
class BaseController extends CommonController {
    
    public function unit(){
    	if ( session('?tid') ) {
	    	$unit = M('Unit') ;

	    	$this -> ajaxReturn($unit -> select() ) ;
	    } else {
	    	$this -> ajaxReturn(null) ;
	    }
    }

    public function department(){
    	if ( session('?tid') ) {
    		$data[unitId] = I('request.unitId') ;
    		$department = M('Department') ;
    		$this -> ajaxReturn($department -> field('id,name') -> where($data) -> select() ) ;
    	} else {
    		$this -> ajaxReturn(null) ;
    	}
    }
}
<?php
namespace Login\Controller;
use Think\Controller ;
class VerifyController extends Controller {
    
    public function verify (){
    	$verify = new \Think\Verify();
    	$verify -> fontSize = 24 ;
    	$verify -> length = 4 ;
    	$verify -> useCurve = false ;
    	$verify -> codeSet = "0123456789" ;
    	$verify -> imageW = 200 ;
    	$verify -> imageH = 50 ;

    	$verify -> entry() ;
    }

    public function check (){

    	$verify = new \Think\Verify() ;

    	$code = I('post.code') ;

    	$this -> ajaxReturn ( $verify -> check($code,"") );
    }
}
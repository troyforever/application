<?php
namespace Common\Controller;
use Think\Controller;
class CommonController extends Controller {
    
    public function _initialize(){
    	if ( !session('?tid') ){
            $this -> redirect('/Login/Login/index') ;
        }
    }
}
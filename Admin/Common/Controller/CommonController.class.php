<?php
namespace Common\Controller;
use Think\Controller;
class CommonController extends Controller {
    
    public function _initialize(){
    	if ( !session('?admin') ){
            $this -> redirect('/Login/Login/index') ;
        }
    }
}
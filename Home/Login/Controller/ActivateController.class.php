<?php
namespace Login\Controller;
use Think\Controller ;
class ActivateController extends Controller {

	public function _initialize(){
		if ( session('register.tid') == null ){
			$this -> redirect ('/Login/Register') ;
		} else {
			$user = M('User') ;
			$user -> field('state') -> where("tid='%s'",session('register.tid')) -> find() ;
			if ( $user->state == '1'){
				session('register.tid',null);
				$this -> redirect('/Login/Login') ;
			}
		}
	}
    
    public function index(){

    	$user = M('user') ;
    	$user -> field('email') -> where("tid='%s'",session('register.tid')) -> find() ;
    	$this -> assign('email',$user->email) -> display('activate') ;
    }

    public function sendMail (){

    	$user = M('user') ;
    	$user -> field('email') -> where("tid='%s'",session('register.tid')) -> find() ;
    	$code = rand(1000,9999) ;
    	session('register.code',$code) ;
    	$this -> ajaxReturn(sendMail($user->email,'激活验证码','尊敬的教师，您好，您的激活验证码是：' . $code)) ;
    }

    public function activate(){

    	$tid = session('register.tid') ;

    	if ( $tid == null ){
    		$this -> ajaxReturn('1001') ;
    	} else {

    		$code = session('register.code') ;
    		$vefify = I('post.code') ;

    		if ( $code == $vefify ){

	    		$user = M('User') ;
	    		$data['state'] = 1 ;
	    		
	    		if ( $user -> where("tid='%s'",$tid) -> save($data) == 1 ){
	    			session('register.tid',null) ;
	    			session('register.code',null) ;
	    			$this -> ajaxReturn('1002') ;
	    		} else {
	    			$this -> ajaxReturn('1003') ;
	    		}

    		} else {
    			$this -> ajaxReturn('1004') ;
    		}
    	}
    }
}
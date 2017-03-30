<?php
namespace Login\Controller;
use Think\Controller ;
class RegisterController extends Controller {
    
    public function index(){
    	$this->display("register") ;
    }

    public function register(){

    	$data['tid'] = I("post.username") ;
    	$data['email'] = I('post.email') ;
    	$data['phone'] = I('post.phone') ;
    	$data['password'] = md5(I('post.pwd')) ;

    	$user = M('User') ;

    	if ( $user -> where("tid='%s'",$data['tid']) -> find() != null ){
    		$this -> ajaxReturn (1001) ; 
    	}
    	if ( $user -> where("phone='%s'",$data['phone']) -> find() != null ){
    		$this -> ajaxReturn (1002) ; 
    	}
    	if ( $user -> where("email='%s'",$data['email']) -> find() != null ){
    		$this -> ajaxReturn (1003) ; 
    	}
    	if ( $user -> data($data) -> add() == 1 ){
    		// session('register.tid',$data['tid']) ;
    		$this -> ajaxReturn( 1000 ) ;
    	}

    }
}
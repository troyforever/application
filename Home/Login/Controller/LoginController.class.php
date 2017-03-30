<?php
namespace Login\Controller;
use Think\Controller ;
class LoginController extends Controller {
    
    public function index(){
        if ( session('?tid') ){
    	  $this -> redirect('/Home/Index') ;
        } else {
             $this->display("login") ;
        }
    }

    public function login(){
    	$data['tid'] = I('post.username') ;
    	$data['password'] = md5(I('post.password')) ;

    	$user = M('User') ;

    	$user -> where("tid='%s'",$data['tid']) -> find() ;

    	if ( $user -> where("tid='%s'",$data['tid']) -> find() == null ){
    		$this -> ajaxReturn(1001) ;
    	} else{
    		if ( $data['password'] == $user->password ){
                session('tid',$data['tid']) ;
                $this -> ajaxReturn(1002) ;
                // if ( $user -> state == 1 ){
                //     session('tid',$data['tid']) ;
        		// 	$this -> ajaxReturn(1002) ;
                // } else {
                //     session('register.tid',$user -> tid) ;
                //     $this -> ajaxReturn(1004) ;
                // }
    		} else{
    			$this -> ajaxReturn(1003) ;
    		}
    	}

    }

    public function logout(){
        session('tid',null) ;
        $this -> redirect('/Login/Login') ;
    }
}
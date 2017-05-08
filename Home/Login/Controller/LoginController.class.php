<?php
namespace Login\Controller;
use Think\Controller ;
class LoginController extends Controller {
    
    public static $HOME_APP = 1 ;

    public function index(){
        if ( session('?tid') ){
    	  $this -> redirect('/') ;
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

                //判断是否超级管理员
                if ( C('RBAC_SUPERADMIN') == $data['tid'] ){
                    //超级管理员验证
                    session('tid',$data['tid']) ;
                    $this -> ajaxReturn(1002) ;
                } else {
                    //非超级管理员，验证是否有登录权限
                    //获取用户的权限
                    $accessList = \Org\Util\Rbac::saveAccess($data['tid'],false) ;
                    //判断是否有后台权限
                    if ( in_array(self::$HOME_APP,$accessList) ){
                        session('tid',$data['tid']) ;

                        $this -> ajaxReturn(1002) ;
                    } else {
                        $this -> ajaxReturn(1003) ;
                    }
                }
    		} else{
    			$this -> ajaxReturn(1004) ;
    		}
    	}

    }

    public function logout(){
        session('tid',null) ;
        $this -> redirect('/Login/Login') ;
    }
}
<?php
namespace Login\Controller;
use Think\Controller ;

class LoginController extends Controller {
    
    public function index(){
        if ( session('?admin') ){
    	  $this -> redirect(ROOT + '/admin.php') ;
        } else {
             $this->display("login") ;
        }
    }

    public function login(){

    	$data['tid'] = I('username') ;
    	$data['password'] = md5(I('password')) ;

    	$user = M('User') ;

    	$user -> where("tid='%s'",$data['tid']) -> find() ;

        //数据库无记录
    	if ( $user -> where("tid='%s'",$data['tid']) -> find() == null ){
    		$this -> ajaxReturn(1001) ;
    	} else{
            //用户名密码匹配
    		if ( $data['password'] == $user->password ){
                //判断是否超级管理员
                if ( C('RBAC_SUPERADMIN') == $data['tid'] ){
                    //超级管理员验证
                    session(C('ADMIN_AUTH_KEY'),true) ;
                    session('admin',$data['tid']) ;
                    session(C('USER_AUTH_KEY'),$data['tid']) ;
                    $this -> ajaxReturn(1002) ;
                } else {
                    //非超级管理员，验证是否有登录权限
                    $accessList = \Org\Util\Rbac::getAccessList($data['tid']) ;

                    //判断是否有后台权限
                    if ( in_array('ADMIN',array_keys($accessList)) ){
                        session('admin',$data['tid']) ;
                        session(C('USER_AUTH_KEY'),$data['tid']) ;
                        $this -> ajaxReturn(1002) ;
                    } else {
                        $this -> ajaxReturn(1003) ;
                    }
                }
    		} else{
                //用户名密码不匹配
    			$this -> ajaxReturn(1004) ;
    		}
    	}

    }

    public function logout(){
        session(C('ADMIN_AUTH_KEY'),null) ;
        session('admin',null) ;
        session(C('USER_AUTH_KEY'),null) ;
        $this -> redirect('/Login/Login') ;
    }
}
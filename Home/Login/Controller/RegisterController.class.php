<?php
namespace Login\Controller;
use Think\Controller ;
class RegisterController extends Controller {

	public static $TEACHER_ROLE = 4 ;

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
			$role_user['role_id'] = self::$TEACHER_ROLE ;
			$role_user['user_id'] = $data['tid'] ;
			M('RoleUser') -> add($role_user) ;
    		$this -> ajaxReturn( 1000 ) ;
    	}

    }
}
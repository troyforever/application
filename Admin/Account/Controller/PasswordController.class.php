<?php
namespace Account\Controller;
use Common\Controller\CommonController;
use Account\Model\BaseModel;

class PasswordController extends CommonController {
    
    public function index() {
    	$this -> display('password') ;
    }

    public function chpwdDo () {
    	$pwd = md5(I('post.pwd')) ;
    	$data['password'] = md5(I('post.newpwd')) ;

    	$user = M('User') ;

    	$user -> field('password') -> where("tid='%s'",session('tid')) -> find() ;

    	if ( $user -> password == $pwd ){
    		if ( $pwd == $data['password'] || $user -> where("tid='%s'",session('tid')) -> save($data) == 1 ){
    			$this -> ajaxReturn(1001) ;
    		} else {
    			$this -> ajaxReturn(1002) ;
    		}
    	} else {
    		$this -> ajaxReturn(1004) ;
    	}
     }
}
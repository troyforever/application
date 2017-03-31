<?php
namespace Home\Controller;
use Common\Controller\CommonController;
use Home\Model\BaseModel;
class AccountController extends CommonController {
    public function account(){
    	$user = M('User') ;
    	$data = $user -> where("tid='%s'",session('tid')) -> find() ;
    	$this -> assign($data) -> display() ;
    }

	public function accountDo(){
		$data['phone'] = I('post.phone') ;
		$data['email'] = I('post.email') ;

		$user = M('User') ;

		$this -> ajaxReturn($user -> where("tid='%s'",session('tid')) -> save($data) !== false ? true : false) ;
	}

    public function info() {

		$base = D('Base');
		$data = $base-> relation(true) -> where("userId='%s'",session('tid')) -> find() ;
		$this -> assign($data) -> display() ;
		
    }

	public function infoDo(){
		$data['name'] = I('post.name') ;
		$data['gender'] = I('post.gender') ;
		$data['birth'] = I('post.birth') ;
		$data['nation'] = I('post.nation') ;
		$data['outlook'] = I('post.outlook') ;
		$data['unitId'] = I('post.unit') ;
		$data['departmentId'] = I('post.department') ;
		
		$base = M('Base') ;

		$this -> ajaxReturn($base -> where("userId='%s'",session('tid')) -> save($data) !== false ? true : false ) ;
	}

    public function chpwd() {
    	$this -> display() ;
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
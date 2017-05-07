<?php
namespace Account\Controller;
use Common\Controller\CommonController;
use Account\Model\BaseModel;
class AccountController extends CommonController {
    public function index(){
    	$user = M('User') ;
    	$data = $user -> where("tid='%s'",session('tid')) -> find() ;
    	$this -> assign($data) -> display('account') ;
    }

	public function accountDo(){
		$data['phone'] = I('post.phone') ;
		$data['email'] = I('post.email') ;

		$user = M('User') ;

		$this -> ajaxReturn($user -> where("tid='%s'",session('tid')) -> save($data) !== false ? true : false) ;
	}
}
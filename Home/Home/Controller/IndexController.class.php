<?php
namespace Home\Controller;
use Common\Controller\CommonController;
class IndexController extends CommonController {
    public function index(){
        $base = M('Base') ;
        $this -> name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
        $this -> display('main') ;
    }
}
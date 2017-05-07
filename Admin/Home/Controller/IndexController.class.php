<?php
namespace Home\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class IndexController extends CommonController {
    public function index(){
        $this -> display('main') ;
    }

    public function test(){
        $node = M('Node') ;

        $modules = $node -> where('level=2') -> select() ;

        foreach ( $modules as $module){
            $module['node'] = $node -> where('pid='.$module['id']) -> select();
            $data[] = $module ;
        }
        dump($data) ;
    }
}
<?php
namespace Home\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class IndexController extends CommonController {
    public function index(){
        //根据权限显示导航菜单
        if ( session(C('ADMIN_AUTH_KEY') ) ){
            //超级管理员
            $admin = M('Node') -> where('id=2') -> find() ;

            $nodes[] = $admin ;

            $modules = M('Node') -> where('pid='.$admin['id']) -> select() ;

            foreach ( $modules as $module ){
                $nodes[] = $module ;

                $subs = M('node') -> where('pid='.$module['id']) -> select() ;

                foreach ( $subs as $sub ){
                    $nodes[] = $sub ;
                }
            }

        } else {
           //非超级管理员
           foreach ( session('_ACCESS_LIST') as $access ){
               $nodes[] = M('Node') -> where('id='.$access) -> find() ;
           }
        }

        $this -> assign('nodes',$nodes) -> display('main') ;
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
<?php 

namespace RBAC\Controller;
use Common\Controller\CommonController;

class NodeController extends CommonController{

    public function index(){

        $this -> display('node') ;
    }

    public function data(){

        $node = M('Node') ;

        $apps = $node -> order('sort') -> where('level=1') -> select(); 

        foreach ( $apps as $app ){
            $data[] = $app ;
            
            $modules = $node -> order('sort') -> where('pid='.$app['id']) -> select();

            foreach ( $modules as $module ){
                $data[] = $module ;

                $subs = $node -> order('sort') -> where('pid='.$module['id']) -> select();

                foreach ( $subs as $sub ){
                    $data[] = $sub ;
                }
            }
        }

        $this -> ajaxReturn($data) ;
    }

    public function getParent(){

        $pid = $_GET['pid'] ;

        if ( empty($pid) )
            $pid = 2;

        $node = M('Node') ;

        $this -> ajaxReturn($node -> order('sort') -> field('id,title') -> where('level='.$pid) -> select()) ;
    }

    public function add(){
        
        $data['name'] = I('add-name') ;
        $data['title'] = I('add-title') ;
        $data['sort'] = I('add-sort') ;
        $data['level'] = I('add-level') ;
        $data['status'] = 1;
        $data['pid'] = I('add-pid') ;
        $data['remark'] = I('add-remark') ;

        $node = M('Node') ;

        $this -> ajaxReturn($node -> add($data) !== false ? true : false ) ;
    }

    public function delete(){

        $node = M('Node') ;

        $this -> ajaxReturn ( $node -> delete(I('id')) == 1 ? true : false ) ;
    }

    public function edit(){

        $data['name'] = I('edit-name') ;
        $data['title'] = I('edit-title') ;
        $data['sort'] = I('edit-sort') ;
        $data['level'] = I('edit-level') ;
        $data['status'] = 1;
        $data['pid'] = I('edit-pid') ;
        $data['remark'] = I('edit-remark') ;

        $node = M('Node') ;

        $this -> ajaxReturn($node -> where('id='.I('edit-id')) -> save($data) == 1 ? true : false ) ;
    }
}

?>
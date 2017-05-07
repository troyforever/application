<?php 

namespace RBAC\Controller;
use Common\Controller\CommonController;

class RoleController extends CommonController{

    public function index(){

        $this -> display('role') ;
    }

    public function data(){

        $role = M('Role') ;

        $this -> ajaxReturn ( $role -> where('id != 1') -> select() ) ;
    }

    public function add(){
        
        $data['name'] = I('add-name') ;
        $data['status'] = 1 ;
        $data['remark'] = I('add-remark') ;

        $role = M('Role') ;

        $this -> ajaxReturn($role -> add($data) !== false ? true : false ) ;
    }

    public function getAll(){
        $this -> ajaxReturn(M('Role') -> where('id != 1') -> field('id,name') -> select() ) ;
    }

    public function delete(){

        $role = M('Role') ;

        M('Access') -> where('role_id='.I('id')) -> delete() ;

        M('RoleUser') -> where('role_id='.I('id')) -> delete() ;

        $this -> ajaxReturn ( $role -> delete(I('id')) == 1 ? true : false ) ;
    }

    public function getAccess(){

        $appstr = '' ;
        $modulestr = '' ;
        $substr = '' ;

        $apps = D('AccessView') -> where('role_id=%d and Node.level=1',I('id')) -> select() ;

        foreach ( $apps as $app ){

            $appstr .= $app['id'] . ',' ;

            $modules = D('AccessView') -> where('role_id=%d and Node.level=2 and Node.pid=%d',I('id'),$app['id']) -> select() ;

            foreach ( $modules as $module ){

                $modulestr .= $module['id'] . ',' ;

                $subs = D('AccessView') -> where('role_id=%d and Node.level=3 and Node.pid=%d',I('id'),$module['id']) -> select() ;

                foreach ( $subs as $sub ){
                    $substr .= $sub['id'] . ',' ;
                }
            }
        }

        $appstr = substr($appstr,0,-1) ;
        $modulestr = substr($modulestr,0,-1) ;
        $substr = substr($substr,0,-1) ;

        $apps = M('Node') -> where('level=1') -> select() ;

        foreach ( $apps as $app ){
            $data[] = $app ;

            $modules = M('Node') -> where('level=2 and pid='.$app['id']) -> select() ;

            foreach ( $modules as $module ){
                $data[] = $module ;

                $subs = M('Node') -> where('level=3 and pid='.$module['id']) -> select() ;

                foreach ( $subs as $sub ){
                    $data[] = $sub ;
                }
            }
        }

        foreach ( $data as $access ){
            if ( $access['level'] == 1 ){
                if ( in_array($access['id'],explode(',',$appstr)) ){
                    $access['access'] = true ;
                } else {
                    $access['access'] = false ;
                }
            } else if ( $access['level'] == 2 ){
                if ( in_array($access['id'],explode(',',$modulestr)) ){
                    $access['access'] = true ;
                } else {
                    $access['access'] = false ;
                }
            } else {
                if ( in_array($access['id'],explode(',',$substr)) ){
                    $access['access'] = true ;
                } else {
                    $access['access'] = false ;
                }
            }

            $result[] = $access ;
        }

        $this -> ajaxReturn($result) ;
    }

    public function edit(){

        $data['name'] = I('edit-name') ;
        $data['remark'] = I('edit-remark') ;

        $role = M('Role') ;

        $this -> ajaxReturn($role -> where('id='.I('edit-id')) -> save($data) == 1 ? true : false ) ;
    }

    public function setAccess(){
        $id = I('id') ;

        M('Access') -> where('role_id='.$id) -> delete() ;

        $nodes = explode(',',I('str')) ;

        foreach ( $nodes as $node ){
            $access['role_id'] = $id ;
            $access['node_id'] = $node ;

            M('Access') -> add($access) ;
        }

        $this -> ajaxReturn(true) ;
    }
}

?>
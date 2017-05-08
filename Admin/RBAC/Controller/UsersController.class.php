<?php 

namespace RBAC\Controller;
use Common\Controller\CommonController;

class UsersController extends CommonController{

    public function index(){

        $this -> display('users') ;
    }

    public function data(){

        $userRole = D('UserRoleView') ;

        $users = D('TeacherRelation') -> field('password',true) -> where("tid!='admin'") -> select () ;

        foreach($users as $user){
            $roles = D('UserRoleView') -> where("user_id='%s'",$user['tid']) -> select() ;
            if ( count($roles) <= 1 && $roles[0]['role_id'] == 4 ){

            } else {
                $user['roles'] = $roles ;
                $data[] = $user ;
            }
        }

        $this -> ajaxReturn($data) ;
    }

    public function data1(){

        $userRole = D('UserRoleView') ;

        $users = M('User') -> field('password',true) -> where("tid!='admin'") -> select () ;

        foreach($users as $user){
            $roles = D('UserRoleView') -> where("user_id='%s'",$user['tid']) -> select() ;
            if ( count($roles) <= 1 && $roles[0]['role_id'] == 4 ){

            } else {
                $user['roles'] = $roles ;
                $data[] = $user ;
            }
        }

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        
        $data['tid'] = I('add-tid') ;
        $data['email'] = I('add-email') ;
        $data['phone'] = I('add-phone') ;
        $data['password'] = I('add-password','','md5');

        $roles = explode(',',I('roles')) ;

        if ( M('User') -> where("tid='%s'",$data['tid']) -> find() ){
            $this -> ajaxReturn(1001) ;
        }

        if ( M('User') -> where("email='%s'",$data['email']) -> find() ){
            $this -> ajaxReturn(1002) ;
        }

        if ( M('User') -> where("phone='%s'",$data['phone']) -> find() ){
            $this -> ajaxReturn(1003) ;
        }

        foreach ( $roles as $role ){
            $role_user['role_id'] = $role ;
            $role_user['user_id'] = $data['tid'] ;

            M('RoleUser') -> add($role_user) ;
        }

        $this -> ajaxReturn(M('User') -> add($data) !== false ? true : false ) ;
    }

    public function delete(){

        $user = M('User') ;

        M('RoleUser') -> where('user_id='.I('id')) -> delete() ;

        $this -> ajaxReturn ( M('User') -> delete(I('id')) == 1 ? true : false ) ;
    }

    public function edit(){

        $user = M('User') -> where("tid='%s'",I('id')) -> find() ;

        $data['email'] = I('edit-email') ;
        $data['phone'] = I('edit-phone') ;

        if ( $user['email'] != $data['email'] && M('User') -> where("email='%s'",$data['email']) -> find() ){
            $this -> ajaxReturn(1001) ;
        }

        if ( $user['phone'] != $data['phone'] && M('User') -> where("phone='%s'",$data['phone']) -> find() ){
            $this -> ajaxReturn(1002) ;
        }

        $this -> ajaxReturn(M('User') -> where("tid='%s'",I('id')) -> save($data) !== false ? true : false ) ;
    }

    public function password(){

        $data['password'] = I('pwd-password','','md5') ;

        $this -> ajaxReturn(M('User') -> where("tid='%s'",I('id')) -> save($data) !== false ? true : false) ;
    }

    public function getRoles(){
        $this -> ajaxReturn(M('RoleUser') -> field('role_id') -> where("user_id='%s'",I('id')) -> select()) ;
    }

    public function role(){
        $roles = explode(',',I('role-roles')) ;

        M('RoleUser') -> where("user_id='%s'",I('id')) -> delete();

        foreach ( $roles as $role ){
            $role_user['role_id'] = $role ;
            $role_user['user_id'] = I('id') ;

            M('RoleUser') -> add($role_user) ;
        }

        $this -> ajaxReturn(true) ;
    }

    public function test(){
        $base = D('UserBaseView') ;

        dump ( $base -> fetchSql() -> select() ) ;
    }
}

?>
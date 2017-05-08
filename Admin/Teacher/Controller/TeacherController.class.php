<?php 

namespace Teacher\Controller;
use Common\Controller\CommonController;

class TeacherController extends CommonController{

    public static $TEACHER_ROLE = 4 ;

    public function index(){

        $this -> display('teacher') ;
    }

    public function data(){

        if ( !empty(I('tid')) )
            $search['tid'] = array('LIKE','%'.I('tid').'%') ;

        $users = D('TeacherRelation') -> relation(true) -> field('password',true) -> where($search) -> where("tid!='admin'") -> select () ;

        foreach ( $users as $index => $user ){
            if ( !empty(I('name')) ){
                if ( strpos($user['name'], I('name' ) ) === false ){
                    unset($users[$index]);
                }
            }

            if ( !empty(I('unit')) ){
                if( $user['unit_id'] != I('unit') ){
                    unset($users[$index]) ;
                }
            }
        }

        foreach($users as $user){
            $roles = D('UserRoleView') -> field('role_id,name') -> where("user_id='%s'",$user['tid']) -> select() ;

            $user['roles'] = $roles ;

            unset($data) ;

            foreach ( $roles as $role ){
                $data[] = $role['role_id'] ;
            }

            if ( in_array(self::$TEACHER_ROLE, $data) ){
                $teachers[] = $user ;
            }
        }

        $result['rows'] = $teachers ;
        $result['total'] = count($teachers) ;
        if ( $result['total'] == 0 ){
            $result['rows'] = array();
        }
        $this -> ajaxReturn($result) ;
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

        if ( !empty(I('tid')) )
            $search['tid'] = array('LIKE',I('tid')) ;
        if ( !empty(I('name')))
            $search['name'] = array('LIKE',I('name')) ;
        if ( !empty(I('unit')) )
            $search['unit_id'] = I('unit') ;

        $users = D('TeacherRelation') -> relation(true) -> field('password',true) -> where($search) -> where("tid!='admin'") -> select () ;

        $this -> ajaxReturn($users) ;
    }   
}

?>
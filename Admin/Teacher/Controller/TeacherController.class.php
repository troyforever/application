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

    public function exportAll(){

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

        for ( $i = 0 ; $i < count($result['rows']) ; $i ++ ){
            $result['rows'][$i]['unit_name'] = getUnitName($result['rows'][$i]['tid']) ;
        }

        import("Org.Util.PHPExcel");
        import("ORG.Util.PHPExcel.IOFactory");

        $file_name = '教师信息汇总 ' . date("Y-m-d") . '.xls' ;

        $path = './Uploads/' . CONTROLLER_NAME . '/File/' . $file_name ;

        $objPHPExcel = new \PHPExcel();

        // Set document properties
        $objPHPExcel->getProperties()->setCreator("Jiangsu University")
							 ->setLastModifiedBy("Jiangsu University")
							 ->setTitle("Jiangsu University")
							 ->setSubject("Jiangsu University")
							 ->setDescription("Jiangsu University")
							 ->setKeywords("office PHPExcel php")
							 ->setCategory("Teaching");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '工号')
                    ->setCellValue('B1', '姓名')
                    ->setCellValue('C1', '性别')
                    ->setCellValue('D1', '邮箱')
                    ->setCellValue('E1', '联系方式')
                    ->setCellValue('F1', '部门')
                    ->setCellValue('G1', '科室（系）')
                    ->setCellValue('H1', '注册时间') ;
        
        //垂直居中
        $objPHPExcel->getDefaultStyle()->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        // $objPHPExcel->getDefaultStyle()->getAlignment()->setVertical(\PHPExcel_Style_Alignment::VERTICAL_CENTER);

        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('A')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('B')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('C')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('D')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('E')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('F')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('G')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('H')->setWidth(30);

        //写数据进Excel
        for ( $i = 2 ; $i < count($result['rows']) + 2 ; $i ++ ){
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$i, $result['rows'][$i-2]['tid'])
                    ->setCellValue('B'.$i ,$result['rows'][$i-2]['name'])
                    ->setCellValue('C'.$i, $result['rows'][$i-2]['gender'] == 1 ? '男' : '女')
                    ->setCellValue('D'.$i, $result['rows'][$i-2]['email'])
                    ->setCellValue('E'.$i, $result['rows'][$i-2]['phone'])
                    ->setCellValue('F'.$i, $result['rows'][$i-2]['unit_name'])
                    ->setCellValue('G'.$i, $result['rows'][$i-2]['department_name'])
                    ->setCellValue('H'.$i, $result['rows'][$i-2]['add_time']);
        }
        // Rename worksheet
        $objPHPExcel->getActiveSheet()->setTitle('Sheet1');
        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save(zh_cn($path));

        $this -> ajaxReturn($file_name) ;
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

    public function getData(){
         if ( empty(I('tid')) ){
            $data['total'] = 0 ;
            $data['rows'] = array();
        } else {
            $data['rows'] = M(I('model')) -> where("tid='%s'",I('tid')) -> select() ;
            $data['total'] = M(I('model')) -> where("tid='%s'",I('tid')) -> count() ;
        }

        $this -> ajaxReturn( $data ) ;
    }

    public function getImprove(){
        if ( empty(I('tid')) ){
            $data['total'] = 0 ;
            $data['rows'] = array();
        } else {
            $data['rows'] = M('Improve') -> where("tid='%s'",I('tid')) -> select() ;
            $data['total'] = M('Improve') -> where("tid='%s'",I('tid')) -> count() ;
        }

        $this -> ajaxReturn( $data ) ;
    }

    public function getEducation(){
        if ( empty(I('tid')) ){
            $data['total'] = 0 ;
            $data['rows'] = array();
        } else {
            $data['rows'] = M('Education') -> where("tid='%s'",I('tid')) -> select() ;
            $data['total'] = M('Education') -> where("tid='%s'",I('tid')) -> count() ;
        }

        $this -> ajaxReturn( $data ) ;
    }

    public function getWork(){
        if ( empty(I('tid')) ){
            $data['total'] = 0 ;
            $data['rows'] = array();
        } else {
            $data['rows'] = M('Work') -> where("tid='%s'",I('tid')) -> select() ;
            $data['total'] = M('Work') -> where("tid='%s'",I('tid')) -> count() ;
        }

        $this -> ajaxReturn( $data ) ;
    }
}

?>
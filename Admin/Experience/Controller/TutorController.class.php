<?php 

namespace Experience\Controller;
use Common\Controller\CommonController;

class TutorController extends CommonController{

    public function index(){

        $this -> display('tutor') ;
    }

    public function data(){

        $sort = I('request.sort','add_time') ;
        $order = I('request.order','desc') ;

        $page = I('request.page',1) ;
        $rows = I('request.rows',5) ;

        $from = ($page-1) * $rows ;

        $tutor = M('Tutor') ;

        $data['rows'] = $tutor -> where("tid='%s'",session('tid')) -> limit($from,$rows) -> order($sort . " " . $order) -> select () ;

        $data['total'] = $tutor -> where("tid='%s'",session('tid')) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['tutor'] = I('post.add-tutor') ;
            $data['tutor_date'] = I('post.add-tutor_date') ;

            $data['tid'] = session('tid') ;

            if ( $_FILES['add-file_name']['name'] ){

                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                //文件上传
                $config = array(
                    'savePath' => './Tutor/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['tutor'] 
                );

                $upload = new \Think\Upload($config);

                $info = $upload -> upload();

                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $tutor = M('Tutor') ;

            $this -> ajaxReturn($tutor -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $tutor = M("Tutor") ;

            $data = $tutor -> where("id=" + I('post.id')) -> find() ;

            //删除原先文件
                $file_name = $data['file_name'] ;
                $file = iconv('utf-8', 'gbk', './Uploads/Tutor/'.$file_name);
                unlink($file);
            if ( $data != null && $data['tid'] == session('tid') ){
                $this -> ajaxReturn($tutor -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

        if ( session('?tid') ){
            $data['tutor'] = I('post.edit-tutor') ;
            $data['tutor_date'] = I('post.edit-tutor_date') ;

            $tutor = M('Tutor') ;

            if ( $_FILES['edit-file_name']['name'] ){

                    $base = M('Base') ;
                    $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                    $file_name = $tutor -> where('id='.I('request.edit-id')) -> getField('file_name') ;
                    
                    //删除原先文件
                    $file = iconv('utf-8', 'gbk', './Uploads/Tutor/'.$file_name);
                    unlink($file);
                    //文件上传
                    $config = array(
                        'savePath' => './Tutor/',
                        'autoSub' => false,
                        'replace' => true,
                        'saveName' => session('tid') . '-' . $name . '-' . $data['tutor']
                    );

                    $upload = new \Think\Upload($config);

                    $info = $upload -> upload();

                    $data['file_name'] = $info['edit-file_name']['savename'] ;
                }

            $result = $tutor -> where("id=" . I('request.edit-id') ) -> save($data) ;

            $this -> ajaxReturn($result !== false ? true : false) ;
        } else 
            $this -> ajaxReturn(false) ;
    }
}

?>
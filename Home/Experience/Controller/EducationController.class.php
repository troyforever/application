<?php 

namespace Experience\Controller;
use Common\Controller\CommonController;

class EducationController extends CommonController{

    public function index(){

        $this -> display('education') ;
    }

    public function data(){

        $sort = I('request.sort') != null ? I('request.sort') : 'graduation_time' ;
        $order = I('request.order') != null ? I('request.order') : 'desc' ;

        $education = M('Education') ;

        $data = $education -> where("tid='%s'",session('tid')) -> order($sort . " " . $order) -> select () ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['school'] = I('school') ;
            $data['major'] = I('major') ;
            $data['degree'] = I('degree') ;
            $data['graduation_time'] = I('post.graduation_time') ;
            $data['tid'] = session('tid') ;

            if ( $_FILES['file_name']['name'] ){

                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                //文件上传
                $config = array(
                    'savePath' => './Education/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['school'] . '-' . $data['major']
                );

                $upload = new \Think\Upload($config);

                $info = $upload -> upload();

                $data['file_name'] = $info['file_name']['savename'] ;
            }

            $education = M('Education') ;

            $this -> ajaxReturn($education -> add($data) !== false ? true : false) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){
        
        if ( session('?tid') && I('post.id') != null ){
            $education = M("Education") ;

            $data = $education -> where("id=" . I('post.id')) -> find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                //删除原先文件
                $file_name = $data['file_name'] ;
                $file = iconv('utf-8', 'gbk', './Uploads/Education/'.$file_name);
                unlink($file);

                $this -> ajaxReturn($education -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

        if ( session('?tid') ){
            $data['school'] = I('edit-school') ;
            $data['major'] = I('edit-major') ;
            $data['degree'] = I('edit-degree') ;
            $data['graduation_time'] = I('post.edit-graduation_time') ;
            $data['tid'] = session('tid') ;

            $education = M('Education') ;

            if ( $_FILES['edit-file_name']['name'] ){

                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                $file_name = $education -> where('id='.I('request.id')) -> getField('file_name') ;
                
                //删除原先文件
                $file = iconv('utf-8', 'gbk', './Uploads/Education/'.$file_name);
                unlink($file);
                //文件上传
                $config = array(
                    'savePath' => './Education/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['school'] . '-' . $data['major']
                );

                $upload = new \Think\Upload($config);

                $info = $upload -> upload();

                $data['file_name'] = $info['edit-file_name']['savename'] ;
            }

            $result = $education -> where("id=" . I('request.id') ) -> save($data) ;

            $this -> ajaxReturn($result !== false ? true : false) ;
        }
        $this -> ajaxReturn(false) ;
    }
}

?>
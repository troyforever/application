<?php 

namespace Experience\Controller;
use Common\Controller\CommonController;

class TitleController extends CommonController{

    public function index(){

        $this -> display('title') ;
    }

    public function data(){

        $sort = I('request.sort') != null ? I('request.sort') : 'from_time' ;
        $order = I('request.order') != null ? I('request.order') : 'asc' ;

        $title = M('Title') ;

        $data = $title -> where("tid='%s'",session('tid')) -> order($sort . " " . $order) -> select () ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['title'] = I('post.add-title') ;
            $data['title_time'] = I('post.add-title_time') ;
            $data['tid'] = session('tid') ;

            $title = M('Title') ;

            if ( $_FILES['add-file_name']['name'] ){

                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                //文件上传
                $config = array(
                    'savePath' => './Title/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['title']
                );

                $upload = new \Think\Upload($config);

                $info = $upload -> upload();

                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $this -> ajaxReturn($title -> add($data) !== false ? true : false) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $title = M("Title") ;

            $data = $title -> where("id=" + I('post.id')) -> find() ;

            //删除原先文件
                $file_name = $data['file_name'] ;
                $file = iconv('utf-8', 'gbk', './Uploads/Title/'.$file_name);
                unlink($file);
            if ( $data != null && $data['tid'] == session('tid') ){
                $this -> ajaxReturn($title -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

        $data['title'] = I('post.edit-title') ;
        $data['title_time'] = I('post.edit-title_time') ;

        $title = M('Title') ;

        if ( $_FILES['edit-file_name']['name'] ){

                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                $file_name = $title -> where('id='.I('request.edit-id')) -> getField('file_name') ;
                
                //删除原先文件
                $file = iconv('utf-8', 'gbk', './Uploads/Title/'.$file_name);
                unlink($file);
                //文件上传
                $config = array(
                    'savePath' => './Title/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['title']
                );

                $upload = new \Think\Upload($config);

                $info = $upload -> upload();

                $data['file_name'] = $info['edit-file_name']['savename'] ;
            }

        $result = $title -> where("id=" . I('request.edit-id') ) -> save($data) ;

        $this -> ajaxReturn($result !== false ? true : false) ;
    }
}

?>
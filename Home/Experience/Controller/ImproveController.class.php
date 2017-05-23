<?php 

namespace Experience\Controller;
use Common\Controller\CommonController;

class ImproveController extends CommonController{

    public function index(){

        $this -> display('improve') ;
    }

    public function data(){

        $sort = I('request.sort','add_time') ;
        $order = I('request.order','desc') ;

        $page = I('request.page',1) ;
        $rows = I('request.rows',5) ;

        $from = ($page-1) * $rows ;

        $improve = M('Improve') ;

        $data['rows'] = $improve -> where("tid='%s'",session('tid')) -> limit($from,$rows) -> order($sort . " " . $order) -> select () ;

        $data['total'] = $improve -> where("tid='%s'",session('tid')) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['topic'] = I('add-topic') ;
            $data['unit'] = I('add-unit') ;
            $data['location'] = I('add-location') ;
            $data['start_date'] = I('add-start_date') ;
            $data['end_date'] = I('add-end_date') ;
            $data['note'] = I('add-note') ;

            $data['tid'] = session('tid') ;

            if ( $_FILES['add-file_name']['name'] ){

                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                //文件上传
                $config = array(
                    'savePath' => './Improve/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic'] . '-' . $data['unit']
                );

                $upload = new \Think\Upload($config);

                $info = $upload -> upload();

                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $improve = M('improve') ;

            $this -> ajaxReturn($improve -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $improve = M("Improve") ;

            $data = $improve -> where("id=" + I('post.id')) -> find() ;

            //删除原先文件
                $file_name = $data['file_name'] ;
                $file = iconv('utf-8', 'gbk', './Uploads/Improve/'.$file_name);
                unlink($file);
            if ( $data != null && $data['tid'] == session('tid') ){
                $this -> ajaxReturn($improve -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

        if ( session('?tid') ){
            $data['topic'] = I('edit-topic') ;
            $data['unit'] = I('edit-unit') ;
            $data['location'] = I('edit-location') ;
            $data['start_date'] = I('edit-start_date') ;
            $data['end_date'] = I('edit-end_date') ;
            $data['note'] = I('edit-note') ;
            $improve = M('Improve') ;

            if ( $_FILES['edit-file_name']['name'] ){

                    $base = M('Base') ;
                    $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                    $file_name = $improve -> where('id='.I('request.edit-id')) -> getField('file_name') ;
                    
                    //删除原先文件
                    $file = iconv('utf-8', 'gbk', './Uploads/Improve/'.$file_name);
                    unlink($file);
                    //文件上传
                    $config = array(
                        'savePath' => './Improve/',
                        'autoSub' => false,
                        'replace' => true,
                        'saveName' => session('tid') . '-' . $name . '-' . $data['unit'] . '-' . $data['job']
                    );

                    $upload = new \Think\Upload($config);

                    $info = $upload -> upload();

                    $data['file_name'] = $info['edit-file_name']['savename'] ;
                }

            $result = $improve -> where("id=" . I('request.edit-id') ) -> save($data) ;

            $this -> ajaxReturn($result !== false ? true : false) ;
        } else 
            $this -> ajaxReturn(false) ;
    }
}

?>
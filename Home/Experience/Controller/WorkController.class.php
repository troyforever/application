<?php 

namespace Experience\Controller;
use Common\Controller\CommonController;

class WorkController extends CommonController{

    public function index(){

        $this -> display('work') ;
    }

    public function data(){

        $sort = I('request.sort','add_time') ;
        $order = I('request.order','desc') ;

        $page = I('request.page',1) ;
        $rows = I('request.rows',5) ;

        $from = ($page-1) * $rows ;

        $work = M('Work') ;

        $data['rows'] = $work -> where("tid='%s'",session('tid')) -> limit($from,$rows) -> order($sort . " " . $order) -> select () ;

        $data['total'] = $work -> where("tid='%s'",session('tid')) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['job'] = I('post.add-job') ;
            $data['unit'] = I('post.add-unit') ;
            $data['department'] = I('post.add-department') ;
            $data['section'] = I('post.add-section') ;

            $data['into_date'] = I('post.add-into_date') ;
            $data['exit_date'] = I('post.add-exit_date') ;

            $data['tid'] = session('tid') ;

            if ( $_FILES['add-file_name']['name'] ){

                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                //文件上传
                $config = array(
                    'savePath' => './Work/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['unit'] . '-' . $data['job']
                );

                $upload = new \Think\Upload($config);

                $info = $upload -> upload();

                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $work = M('Work') ;

            $this -> ajaxReturn($work -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $work = M("Work") ;

            $data = $work -> where("id=" + I('post.id')) -> find() ;

            //删除原先文件
                $file_name = $data['file_name'] ;
                $file = iconv('utf-8', 'gbk', './Uploads/Work/'.$file_name);
                unlink($file);
            if ( $data != null && $data['tid'] == session('tid') ){
                $this -> ajaxReturn($work -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

        if ( session('?tid') ){
            $data['job'] = I('post.edit-job') ;
            $data['unit'] = I('post.edit-unit') ;
            $data['department'] = I('post.edit-department') ;
            $data['section'] = I('post.edit-section') ;

            $data['into_date'] = I('post.edit-into_date') ;
            $data['exit_date'] = I('post.edit-exit_date') ;

            $work = M('Work') ;

            if ( $_FILES['edit-file_name']['name'] ){

                    $base = M('Base') ;
                    $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

                    $file_name = $work -> where('id='.I('request.edit-id')) -> getField('file_name') ;
                    
                    //删除原先文件
                    $file = iconv('utf-8', 'gbk', './Uploads/Work/'.$file_name);
                    unlink($file);
                    //文件上传
                    $config = array(
                        'savePath' => './Work/',
                        'autoSub' => false,
                        'replace' => true,
                        'saveName' => session('tid') . '-' . $name . '-' . $data['unit'] . '-' . $data['job']
                    );

                    $upload = new \Think\Upload($config);

                    $info = $upload -> upload();

                    $data['file_name'] = $info['edit-file_name']['savename'] ;
                }

            $result = $work -> where("id=" . I('request.edit-id') ) -> save($data) ;

            $this -> ajaxReturn($result !== false ? true : false) ;
        } else 
            $this -> ajaxReturn(false) ;
    }
}

?>
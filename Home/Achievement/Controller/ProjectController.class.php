<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;

class ProjectController extends CommonController{

    public function index(){
        if ( session('?tid') ){
            $base = M('Base') ;
            $name = $base -> where("userId='%s'",session('tid')) -> getField('name') ;
            $this -> assign('name',$name) -> display('project') ;
        }
    }

    public function data(){
        //排序
        $sort = I('request.sort','start_date') ;
        $order = I('request.order','desc') ;

        $page = I('request.page',1) ;
        $rows = I('request.rows',5) ;

        $from = ($page-1) * $rows ;

        $sorts = explode(',',$sort) ;
        $orders = explode(',',$order) ;

        $sortstr = '' ;

        for ( $i = 0 ; $i < count($sorts) ; $i ++ )
            $sortstr .= $sorts[$i] . " " . $orders[$i] . "," ;

        $sortstr = substr($sortstr,0,-1) ;

        //检索
        if ( I('request.id') != '' )
            $search['id'] = array('like','%' . I('request.id') . '%' );
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.start_date') != '' )
            $search['start_date'] = array('EGT',I('request.start_date'));
        
        $search['tid'] = session('tid') ;

        $project = M('project') ;

        $data['rows'] = $project  -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $project -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['id'] = I('add-id') ;
            $data['topic'] = I('add-topic') ;
            $data['author'] = I('add-author') ;
            $data['other_author'] = I('add-other_author') ;
            $data['category'] = I('add-category') ;
            $data['state'] = I('add-state') ;
            $data['project_sum'] = I('add-project_sum') ;
            $data['start_date'] = I('add-start_date') ;
            if ( ! empty(I('add-end_date')) )
                $data['end_date'] = I('add-end_date') ;

            $project = M('Project') ;

            if ( $_FILES['add-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //文件上传
                $config = array(
                    'savePath' => './Project/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();

                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $project -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $project = M("Project") ;
            $data['id'] = I('post.id') ;
            $data = $project -> where($data)->find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $file = iconv('utf-8', 'gbk', './Uploads/Project/'.$data['file_name']);
                unlink($file);
                $this -> ajaxReturn($project -> where("id='%s'",I('post.id')) -> delete( ) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

           if ( session('?tid') ){
            $data['tid'] = session('tid') ;
            $data['topic'] = I('edit-topic') ;
            $data['author'] = I('edit-author') ;
            $data['other_author'] = I('edit-other_author') ;
            $data['category'] = I('edit-category') ;
            $data['state'] = I('edit-state') ;
            $data['project_sum'] = I('edit-project_sum') ;
            $data['start_date'] = I('edit-start_date') ;
            if ( ! empty(I('edit-end_date')) )
                $data['end_date'] = I('edit-end_date') ;
            
            $project = M('Project') ;

            if ( $_FILES['edit-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //删除原先文件
                $file_name = $project -> where("id='" . $data['id'] . "'") -> getField('file_name') ;
                $file = iconv('utf-8', 'gbk', './Uploads/Project/'.$file_name);
                unlink($file);
                //文件上传
                $config = array(
                    'savePath' => './Project/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();
                

                $data['file_name'] = $info['edit-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $project -> where("id='" . I('edit-id') . "'") -> save($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }
}

?>
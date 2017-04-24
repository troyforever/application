<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;

class PatentController extends CommonController{

    public function index(){
        if ( session('?tid') ){
            $base = M('Base') ;
            $name = $base -> where("userId='%s'",session('tid')) -> getField('name') ;
            $this -> assign('name',$name) -> display('patent') ;
        }
    }

    public function data(){
        //排序
        $sort = I('request.sort','application_date') ;
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
        if ( I('request.application_id') != '' )
            $search['application_id'] = array('like','%' . I('request.application_id') . '%' );
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        
        $search['tid'] = session('tid') ;

        $patent = M('patent') ;

        $data['rows'] = $patent  -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $patent -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        if ( session('?tid') ) {
            $data['id'] = I('id') ;
            $patent = M('Patent') ;

            $this -> ajaxReturn($patent -> where($data) -> find()) ;
        }
    }

    public function add(){
        if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['topic'] = I('add-topic') ;
            $data['author'] = I('add-author') ;
            $data['category'] = I('add-category') ;
            $data['state']= I('add-state') ;

            $data['application_id'] = I('add-application_id') ;
            $data['application_date'] = I('add-application_date') ;
            if ( ! empty(I('add-auth_date')) )
                $data['auth_date'] = I('add-auth_date') ;

            $patent = M('Patent') ;

            if ( $_FILES['add-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //文件上传
                $config = array(
                    'savePath' => './Patent/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();
                
                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $patent -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $patent = M("Patent") ;
            $data['id'] = I('post.id') ;
            $data = $patent -> where($data)->find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $file = iconv('utf-8', 'gbk', './Uploads/Patent/'.$data['file_name']);
                unlink($file);
                $this -> ajaxReturn($patent -> where("id=".I('post.id')) -> delete( ) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

           if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['topic'] = I('edit-topic') ;
            $data['author'] = I('edit-author') ;
            $data['category'] = I('edit-category') ;
            $data['state']= I('edit-state') ;

            $data['application_id'] = I('edit-application_id') ;
            $data['application_date'] = I('edit-application_date') ;
            if ( ! empty(I('edit-auth_date')) )
                $data['auth_date'] = I('edit-auth_date') ;
            
            $patent = M('Patent') ;

            if ( $_FILES['edit-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //删除原先文件
                $file_name = $patent -> where("id='" . $data['id'] . "'") -> getField('file_name') ;
                $file = iconv('utf-8', 'gbk', './Uploads/Patent/'.$file_name);
                unlink($file);
                //文件上传
                $config = array(
                    'savePath' => './Patent/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();
                

                $data['file_name'] = $info['edit-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $patent -> where("id=" . I('edit-id')) -> save($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }
}

?>
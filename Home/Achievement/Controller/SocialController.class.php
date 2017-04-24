<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;

class SocialController extends CommonController{

    public function index(){
        if ( session('?tid') ){
            $base = M('Base') ;
            $name = $base -> where("userId='%s'",session('tid')) -> getField('name') ;
            $this -> assign('name',$name) -> display('social') ;
        }
    }

    public function data(){
        //排序
        $sort = I('request.sort','social_date') ;
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
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        
        $search['tid'] = session('tid') ;

        $social = M('social') ;

        $data['rows'] = $social  -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $social -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        if ( session('?tid') ) {
            $data['id'] = I('id') ;
            $social = M('Social') ;

            $this -> ajaxReturn($social -> where($data) -> find()) ;
        }
    }

    public function add(){
        if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['topic'] = I('add-topic') ;
            $data['location'] = I('add-location') ;
            $data['social_date']= I('add-social_date') ;

            $data['note'] = I('add-note') ;

            $social = M('Social') ;

            if ( $_FILES['add-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //文件上传
                $config = array(
                    'savePath' => './Social/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();
                
                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $social -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $social = M("Social") ;
            $data['id'] = I('post.id') ;
            $data = $social -> where($data)->find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $file = iconv('utf-8', 'gbk', './Uploads/Social/'.$data['file_name']);
                unlink($file);
                $this -> ajaxReturn($social -> where("id=".I('post.id')) -> delete( ) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

           if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['id'] = I('edit-id') ;
            $data['topic'] = I('edit-topic') ;
            $data['location'] = I('edit-location') ;
            $data['social_date']= I('edit-social_date') ;

            $data['note'] = I('edit-note') ;
            
            $social = M('Social') ;

            if ( $_FILES['edit-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //删除原先文件
                $file_name = $social -> where("id='" . $data['id'] . "'") -> getField('file_name') ;
                $file = iconv('utf-8', 'gbk', './Uploads/Social/'.$file_name);
                unlink($file);
                //文件上传
                $config = array(
                    'savePath' => './Social/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();
                

                $data['file_name'] = $info['edit-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $social -> where("id=" . I('edit-id')) -> save($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }
}

?>
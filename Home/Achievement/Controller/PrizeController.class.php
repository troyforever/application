<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;

class PrizeController extends CommonController{

    public function index(){
        if ( session('?tid') ){
            $base = M('Base') ;
            $name = $base -> where("userId='%s'",session('tid')) -> getField('name') ;
            $this -> assign('name',$name) -> display('prize') ;
        }
    }

    public function data(){
        //排序
        // $sort = I('request.sort','add_time') ;
        // $order = I('request.order','desc') ;

        $page = I('request.page',1) ;
        $rows = I('request.rows',5) ;

        $from = ($page-1) * $rows ;

        // $sorts = explode(',',$sort) ;
        // $orders = explode(',',$order) ;

        // $sortstr = '' ;

        // for ( $i = 0 ; $i < count($sorts) ; $i ++ )
        //     $sortstr .= $sorts[$i] . " " . $orders[$i] . "," ;

        // $sortstr = substr($sortstr,0,-1) ;

        //检索
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        
        $search['tid'] = session('tid') ;

        $prize = M('prize') ;

        $data['rows'] = $prize  -> where($search) -> limit($from,$rows) -> order('add_time desc') -> select () ;

        $data['total'] = $prize -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        if ( session('?tid') ) {
            $data['id'] = I('id') ;
            $prize = M('Prize') ;

            $this -> ajaxReturn($prize -> where($data) -> find()) ;
        }
    }

    public function add(){
        if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['topic'] = I('add-topic') ;

            $data['note'] = I('add-note') ;

            $prize = M('Prize') ;

            //上传获奖图片
            $base = M('Base') ;
            $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                
            $config = array(
                'savePath' => './Prize/Img/',
                'autoSub' => false,
                'replace' => true,
                'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
            );

            $upload = new \Think\Upload($config);
            $info = $upload->uploadOne($_FILES['add-prize_img']);

            $data['prize_img'] = $info['savename'] ;
            

            //附件上传
            if ( $_FILES['add-file_name']['name'] ){

                $upload -> savePath = './Prize/' ;

                $info = $upload -> uploadOne($_FILES['add-file_name']);

                $data['file_name'] = $info['savename'] ;
            }

            $this -> ajaxReturn( $prize -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $prize = M("Prize") ;
            $data['id'] = I('post.id') ;
            $data = $prize -> where($data)->find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $file = iconv('utf-8', 'gbk', './Uploads/Prize/'.$data['file_name']);
                unlink($file);
                $file = iconv('utf-8', 'gbk', './Uploads/Prize/Img/'.$data['prize_img']);
                unlink($file);
                $this -> ajaxReturn($prize -> where("id=".I('post.id')) -> delete( ) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

           if ( session('?tid') ){
            
            $prize = M('Prize') ;
            
            $data = $prize -> where('id='.I('edit-id'))->find() ;

            $data['tid'] = session('tid') ;

            $data['topic'] = I('edit-topic') ;

            $data['note'] = I('edit-note') ;
            
            $base = M('Base') ;
            $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;

            //上传获奖图片
            $config = array(
                'autoSub' => false,
                'replace' => true,
                'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
            );

            if ( $_FILES['edit-prize_img']['name'] ){

                $file = iconv('utf-8', 'gbk', './Uploads/Prize/Img/'.$data['prize_img']);
                unlink($file);

                $upload = new \Think\Upload($config);

                $upload -> savePath = './Prize/Img/' ;

                $info = $upload -> uploadOne($_FILES['edit-prize_img']);

                $data['prize_img'] = $info['savename'] ;

            }
            

            //附件上传
            if ( $_FILES['edit-file_name']['name'] ){

                $file = iconv('utf-8', 'gbk', './Uploads/Prize/'.$data['file_name']);
                unlink($file);

                $upload = new \Think\Upload($config);
                $upload -> savePath = './Prize/' ;

                $info = $upload -> uploadOne($_FILES['edit-file_name']);

                $data['file_name'] = $info['savename'] ;
            }

            $this -> ajaxReturn( $prize -> where("id=" . I('edit-id')) -> save($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }
}

?>
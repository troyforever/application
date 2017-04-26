<?php 

namespace Teach\Controller;
use Common\Controller\CommonController;
use Think\Upload;

class BookController extends CommonController{

    public function index(){
        if ( session('?tid') ){
            $base = M('Base') ;
            $name = $base -> where("userId='%s'",session('tid')) -> getField('name') ;
            $this -> assign('name',$name) -> display('book') ;
        }
    }

    public function data(){
        //排序
        $sort = I('request.sort','publication_date') ;
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
        if ( I('request.title') != '' )
            $search['title'] = array('like','%' . I('request.title') . '%' );
        if ( I('request.year') != '' )
            $search['publication_date'] = array('EQ',I('request.year'));

        $search['tid'] = session('tid') ;

        $book = M('Book') ;
        
        $data['rows'] = $book -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $book -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        if ( session('?tid') ){
            $book = M('Book') ;
            $this -> ajaxReturn($book -> where('id='.I('post.id')) -> find()) ;
        } 
        return NULL;
    }

    public function add(){
        if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['title'] = I('add-title') ;
            $data['author'] = I('add-author') ;
            $data['other_author'] = I('add-other_author') ;
            $data['publication'] = I('add-publication') ;
            $data['publication_date'] = I('add-publication_date') ;
            $data['price'] = I('add-price') ;

            $data['abstract'] = I('add-abstract') ;
            $data['aim_user'] = I('add-aim_user') ;
            $data['note'] = I('add-note') ;

            $book = M('Book') ;

            if ( $_FILES['add-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //文件上传
                $config = array(
                    'savePath' => './Book/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['title']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();

                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $book -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $book = M("Book") ;

            $data = $book -> where('id='.I('post.id'))->find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $file = iconv('utf-8', 'gbk', './Uploads/Book/'.$data['file_name']);
                unlink($file);
                $this -> ajaxReturn($book -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

            if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['title'] = I('edit-title') ;
            $data['author'] = I('edit-author') ;
            $data['other_author'] = I('edit-other_author') ;
            $data['publication'] = I('edit-publication') ;
            $data['publication_date'] = I('edit-publication_date') ;
            $data['price'] = I('edit-price') ;

            $data['abstract'] = I('edit-abstract') ;
            $data['aim_user'] = I('edit-aim_user') ;
            $data['note'] = I('edit-note') ;

            $book = M('Book') ;

            if ( $_FILES['edit-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //删除原先文件
                $file_name = $book -> where('id='.I('request.edit-id')) -> getField('file_name') ;
                $file = iconv('utf-8', 'gbk', './Uploads/Book/'.$file_name);
                unlink($file);
                //文件上传
                $config = array(
                    'savePath' => './Book/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['title']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();

                $data['file_name'] = $info['edit-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $book -> where('id='.I('post.edit-id')) -> save($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }
}

?>
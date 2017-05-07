<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;
use Think\Upload;

class PaperController extends CommonController{

    public function index(){
        if ( session('?tid') ){
            $base = M('Base') ;
            $name = $base -> where("userId='%s'",session('tid')) -> getField('name') ;
            $this -> assign('name',$name) -> display('paper') ;
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
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.from') != '' )
            $search['publication_date'] = array('EGT',I('request.from'));
        if ( I('request.to') != '' )
            $search['publication_date'] = array('ELT',I('request.to'));
        if ( I('request.to') != '' && I('request.from') != '')
            $search['publication_date'] = array('BETWEEN',array(I('request.from'),I('request.to'))) ;

        $search['tid'] = session('tid') ;

        $paper = M('Paper') ;
        
        $data['rows'] = $paper -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $paper -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        if ( session('?tid') ){
            $paper = M('Paper') ;
            $this -> ajaxReturn($paper -> where('id='.I('post.id')) -> find()) ;
        } 
        return NULL;
    }

    public function add(){
        if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['topic'] = I('add-topic') ;
            $data['first_author'] = I('add-first_author') ;
            $data['other_author'] = I('add-other_author') ;
            $data['publication'] = I('add-publication') ;
            $data['publication_date'] = I('add-publication_date') ;

            $data['final_index'] = I('add-final_index') ;
            $data['index_date'] = I('add-index_date') ;
            $data['sci_partition'] = I('add-sci_partition') ;
            $data['if_num'] = I('add-if_num') ;
            // $data['unit_id'] = I('add-unit') ;

            $data['abstract'] = I('add-abstract') ;
            $data['keywords'] = I('add-keywords') ;
            $data['note'] = I('add-note') ;

            $paper = M('Paper') ;

            if ( $_FILES['add-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //文件上传
                $config = array(
                    'savePath' => './Paper/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();

                $data['file_name'] = $info['add-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $paper -> add($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $paper = M("Paper") ;

            $data = $paper -> where('id='.I('post.id'))->find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $file = iconv('utf-8', 'gbk', './Uploads/Paper/'.$data['file_name']);
                unlink($file);
                $this -> ajaxReturn($paper -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

            if ( session('?tid') ){
            $data['tid'] = session('tid') ;

            $data['topic'] = I('edit-topic') ;
            $data['first_author'] = I('edit-first_author') ;
            $data['other_author'] = I('edit-other_author') ;
            $data['publication'] = I('edit-publication') ;
            $data['publication_date'] = I('edit-publication_date') ;

            $data['final_index'] = I('edit-final_index') ;
            $data['index_date'] = I('edit-index_date') ;
            $data['sci_partition'] = I('edit-sci_partition') ;
            $data['if_num'] = I('edit-if_num') ;
            // $data['unit_id'] = I('edit-unit') ;

            $data['abstract'] = I('edit-abstract') ;
            $data['keywords'] = I('edit-keywords') ;
            $data['note'] = I('edit-note') ;

            $paper = M('Paper') ;

            if ( $_FILES['edit-file_name']['name'] ){
                $base = M('Base') ;
                $name = $base -> where("userid='%s'",session('tid')) -> getField('name') ;
                //删除原先文件
                $file_name = $paper -> where('id='.I('request.edit-id')) -> getField('file_name') ;
                $file = iconv('utf-8', 'gbk', './Uploads/Paper/'.$file_name);
                unlink($file);
                //文件上传
                $config = array(
                    'savePath' => './Paper/',
                    'autoSub' => false,
                    'replace' => true,
                    'saveName' => session('tid') . '-' . $name . '-' . $data['topic']
                );
                $upload = new \Think\Upload($config);
                $info = $upload -> upload();

                $data['file_name'] = $info['edit-file_name']['savename'] ;
            }

            $this -> ajaxReturn( $paper -> where('id='.I('post.edit-id')) -> save($data) !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }
}

?>
<?php 

namespace Experience\Controller;
use Common\Controller\CommonController;

class TeachingController extends CommonController{

    public function index(){

        $this -> display('teaching') ;
    }

    public function data(){
        //排序
        $sort = I('request.sort') != null ? I('request.sort') : 'annual' ;
        $order = I('request.order') != null ? I('request.order') : 'asc' ;

        $page = I('request.page') == null ? 1 : I('request.page') ;
        $rows = I('request.rows') == null ? 5 : I('request.rows') ;

        $from = ($page-1) * $rows ;

        $sorts = explode(',',$sort) ;
        $orders = explode(',',$order) ;

        $sortstr = '' ;

        for ( $i = 0 ; $i < count($sorts) ; $i ++ )
            $sortstr .= $sorts[$i] . " " . $orders[$i] . "," ;

        $sortstr = substr($sortstr,0,-1) ;

        //检索
        if ( I('request.lesson') != '' )
            $search['lesson'] = array('like','%' . I('request.lesson') . '%' );
        if ( I('request.annual') != '' )
            $search['annual'] = array('like','%' . I('request.annual') . '%' );
        if ( I('request.classes') != '' )
            $search['classes'] = array('like','%' . I('request.classes') . '%' );
        
        $search['tid'] = session('tid') ;

        $teaching = M('Teaching') ;

        $data['rows'] = $teaching  -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $teaching -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['lesson'] = I('post.add-lesson') ;
            $data['credit'] = I('post.add-credit') ;
            $data['quality'] = I('post.add-quality') ;
            $data['annual'] = I('post.add-annual') ;
            $data['term'] = I('post.add-term') ;
            $data['classes'] = I('post.add-classes') ;
            $data['tid'] = session('tid') ;

            $teaching = M('Teaching') ;

            $this -> ajaxReturn($teaching -> add($data)) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $teaching = M("Teaching") ;

            $data = $teaching -> where("id=" + I('post.id')) -> find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $this -> ajaxReturn($teaching -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

            $data['lesson'] = I('post.edit-lesson') ;
            $data['credit'] = I('post.edit-credit') ;
            $data['quality'] = I('post.edit-quality') ;
            $data['annual'] = I('post.edit-annual') ;
            $data['term'] = I('post.edit-term') ;
            $data['classes'] = I('post.edit-classes') ;
            $data['tid'] = session('tid') ;

        $teaching = M('Teaching') ;

        $result = $teaching -> where("id=" . I('request.edit-id') ) -> save($data) ;

        $this -> ajaxReturn($result !== false ? true : false) ;
    }
}

?>
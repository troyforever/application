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
            $data['from_time'] = I('post.add-from') ;
            $data['to_time'] = I('post.add-to') ;
            $data['tid'] = session('tid') ;

            $title = M('Title') ;

            $this -> ajaxReturn($title -> add($data)) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $title = M("Title") ;

            $data = $title -> where("id=" + I('post.id')) -> find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $this -> ajaxReturn($title -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

        $data['title'] = I('post.edit-title') ;
        $data['from_time'] = I('post.edit-from') ;
        $data['to_time'] = I('post.edit-to') ;

        $title = M('Title') ;

        $result = $title -> where("id=" . I('request.id') ) -> save($data) ;

        $this -> ajaxReturn($result !== false ? true : false) ;
    }
}

?>
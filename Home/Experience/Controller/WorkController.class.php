<?php 

namespace Experience\Controller;
use Common\Controller\CommonController;

class WorkController extends CommonController{

    public function index(){

        $this -> display('work') ;
    }

    public function data(){

        $sort = I('request.sort') != null ? I('request.sort') : 'from_time' ;
        $order = I('request.order') != null ? I('request.order') : 'asc' ;

        $page = I('request.page') == null ? 1 : I('request.page') ;
        $rows = I('request.rows') == null ? 5 : I('request.rows') ;

        $from = ($page-1) * $rows ;

        $work = M('Work') ;

        $data['rows'] = $work -> where("tid='%s'",session('tid')) -> limit($from,$rows) -> order($sort . " " . $order) -> select () ;

        $data['total'] = $work -> where("tid='%s'",session('tid')) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['unit'] = I('post.add-unit') ;
            $data['job'] = I('post.add-job') ;
            $data['from_time'] = I('post.add-from') ;
            $data['to_time'] = I('post.add-to') ;
            $data['tid'] = session('tid') ;

            $work = M('Work') ;

            $this -> ajaxReturn($work -> add($data)) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $work = M("Work") ;

            $data = $work -> where("id=" + I('post.id')) -> find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $this -> ajaxReturn($work -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

        $data['unit'] = I('post.edit-unit') ;
        $data['job'] = I('post.edit-job') ;
        $data['from_time'] = I('post.edit-from') ;
        $data['to_time'] = I('post.edit-to') ;

        $work = M('Work') ;

        $result = $work -> where("id=" . I('request.id') ) -> save($data) ;

        $this -> ajaxReturn($result !== false ? true : false) ;
    }
}

?>
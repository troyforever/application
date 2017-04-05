<?php 

namespace Experience\Controller;
use Common\Controller\CommonController;

class EducationController extends CommonController{

    public function index(){

        $this -> display('education') ;
    }

    public function data(){

        $sort = I('request.sort') != null ? I('request.sort') : 'from_time' ;
        $order = I('request.order') != null ? I('request.order') : 'desc' ;

        $education = M('Education') ;

        $data = $education -> where("tid='%s'",session('tid')) -> order($sort . " " . $order) -> select () ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['school'] = I('post.school') ;
            $data['degree'] = I('post.degree') ;
            $data['from_time'] = I('post.from') ;
            $data['to_time'] = I('post.to') ;
            $data['tid'] = session('tid') ;

            $education = M('Education') ;

            $this -> ajaxReturn($education -> add($data)) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $education = M("Education") ;

            $data = $education -> where("id=" + I('post.id')) -> find() ;

            if ( $data != null && $data['tid'] == session('tid') ){
                $this -> ajaxReturn($education -> delete(I('post.id')) == 1 ? true : false ) ;
            }
        }

        $this -> ajaxReturn(false) ;
    }

    public function edit(){

        $data['school'] = I('post.edit-school') ;
        $data['degree'] = I('post.edit-degree') ;
        $data['from_time'] = I('post.edit-from') ;
        $data['to_time'] = I('post.edit-to') ;

        $education = M('Education') ;

        $result = $education -> where("id=" . I('request.id') ) -> save($data) ;

        $this -> ajaxReturn($result !== false ? true : false) ;
    }
}

?>
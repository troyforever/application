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

        $page = I('request.page',1) ;
        $rows = I('request.rows',5) ;

        $from = ($page-1) * $rows ;

        //检索
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['Base.unitId'] = I('unit') ;

        $prize = D('PrizeView') ;

        $data['rows'] = $prize  -> where($search) -> limit($from,$rows) -> order('add_time desc') -> select () ;

        $data['total'] = $prize -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        $data['id'] = I('id') ;
        $prize = D('PrizeView') ;

        $this -> ajaxReturn($prize -> where($data) -> find()) ;
    }

    

    public function test(){
        $unitId = I('unit') ;

        $prize = D('PrizeView') ;

        dump($prize -> where('Base.unitId='.$unitId) -> select()) ;
    }
}

?>
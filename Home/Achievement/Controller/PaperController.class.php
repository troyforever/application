<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;
use Think\Upload;

class PaperController extends CommonController{

    public function index(){

        $this -> display('paper') ;
    }

    public function data(){
        //排序
        $sort = I('request.sort') != null ? I('request.sort') : 'publish_date' ;
        $order = I('request.order') != null ? I('request.order') : 'desc' ;

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
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.author') != '' )
            $search['all_author'] = array('like','%' . I('request.author') . '%' );
        if ( I('request.from') != '' )
            $search['publish_date'] = array('EGT',I('request.from'));
        if ( I('request.to') != '' )
            $search['publish_date'] = array('ELT',I('request.to'));
        if ( I('request.to') != '' && I('request.from') != '')
            $search['publish_date'] = array('BETWEEN',array(I('request.from'),I('request.to'))) ;

        $search['tid'] = session('tid') ;

        $paper = M('Paper') ;

        $data['rows'] = $paper  -> field('id,topic,all_author,science_category,final_index,score,project_source,page_type,publish_date,file_name') -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $paper -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function add(){
        if ( session('?tid') ){
            $data['tid'] = session('tid') ;
            $data['topic'] = I('post.add-topic');
            I('post.add-abstract') != "" ? $data['abstract'] = I('post.add-abstract') : null ;
            I('post.add-keywords') != "" ? $data['keywords'] = I('post.add-keywords') : null ;
            $data['is_translation'] = I('post.add-is_translation');
            $data['publication'] = I('post.add-publication');
            $data['publish_date'] = I('post.add-publish_date');

            $data['first_author'] = I('post.add-first_author');
            $data['first_author_type'] = I('post.add-first_author_type');
            $data['correspondence_author'] = I('post.add-correspondence_author');
            I('post.add-other_author') != "" ? $data['other_author'] = I('post.add-other_author') : null ;
            $data['all_author'] = I('post.add-all_author');
            $data['enter_people'] = I('post.add-enter_people');
            $data['unit_id'] = I('post.add-unit');

            $data['paper_page'] = I('post.add-paper_page');
            $data['paper_type'] = I('post.add-paper_type');
            $data['prime_subject'] = I('post.add-prime_subject');
            $data['science_category'] = I('post.add-science_category');
            $data['project_source'] = I('post.add-project_source');

            $data['data_source'] = I('post.add-data_source');
            $data['paper_index'] = I('post.add-index_type');
            $data['index_type'] = I('post.add-index_type');
            I('post.add-sci_partition') != "" ? $data['sci_partition'] = I('post.add-sci_partition') : null;
            $data['final_index'] = I('post.add-final_index');
            $data['index_year'] = I('post.add-index_year');

            $data['audit_state'] = I('post.add-audit_state');
            $data['audit_date'] = I('post.add-audit_date');
            $data['audit_year'] = I('post.add-audit_year');
            $data['score'] = I('post.add-score');
            I('post.add-note') != "" ? $data['note'] = I('post.add-note') : null;
            //$data['filepath'] = I('post.add-filepath');

            $paper = M('Paper') ;

            $result = $paper -> add($data) ;

            if ( $result !== false ){

                $config = array(
                    // 'rootPath'=> '',
                    'savePath'   =>    './',
                    'autoSub'    =>    false,
                    'saveName'=> md5($result),
                    'exts'=>array('pdf'),
                );

                $upload = new \Think\Upload($config);

                $info = $upload -> upload() ;
                if ( $info ){
                    $paper -> where('id='.$result) -> setField('file_name',md5($result));
                }
            }

            $this -> ajaxReturn( $result !== false ? true : false ) ;
        }

        $this -> ajaxReturn(false) ;
    }

    public function delete(){

        if ( session('?tid') && I('post.id') != null ){
            $paper = M("Paper") ;

            $data = $paper -> where('id='.I('post.id'))->find() ;
            if ( $data != null && $data['tid'] == session('tid') ){
                if ( $data['file_name'] != NULL ){
                    $file = './Uploads/' . md5(I('post.id')) . '.pdf' ;
                   unlink($file);
                }
                $this -> ajaxReturn($paper -> delete(I('post.id')) == 1 ? true : false ) ;
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

        $paper = M('Paper') ;

        $result = $paper -> where("id=" . I('request.id') ) -> save($data) ;

        $this -> ajaxReturn($result !== false ? true : false) ;
    }
}

?>
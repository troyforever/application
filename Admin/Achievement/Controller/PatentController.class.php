<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;

class PatentController extends CommonController{

    public function index(){

        //压缩文件路径
        $filepath = "./Uploads/Patent/File/" ;

        //清除以前缓存
        delDirAndFile($filepath) ;

        $this -> display('patent') ;
    }

    public function data(){
        //排序
        $sort = I('request.sort','application_date') ;
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
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.application_id') != '' )
            $search['application_id'] = array('like','%' . I('request.application_id') . '%' );
        if ( I('request.auth_id') != '' )
            $search['auth_id'] = array('like','%' . I('request.auth_id') . '%' );

        $patent = D('PatentView') ;

        $data['rows'] = $patent  -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        for ( $i = 0 ; $i < count($data['rows']) ; $i ++ ){
            $data['rows'][$i]['unit_name'] = getUnitName($data['rows'][$i]['tid']) ;
        }

        $data['total'] = $patent -> where($search) -> count() ;

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        $data['id'] = I('id') ;
        $patent = M('Patent') ;

        $this -> ajaxReturn($patent -> where($data) -> find()) ;
    }

    public function exportAll(){

        //检索
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.application_id') != '' )
            $search['application_id'] = array('like','%' . I('request.application_id') . '%' );
        if ( I('request.auth_id') != '' )
            $search['auth_id'] = array('like','%' . I('request.auth_id') . '%' );

        $patent = D('PatentView');
        
        $rows = $patent -> where($search) -> select () ;

        if ( count($rows) == 0 )
            $this -> ajaxReturn(false) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        $file_name = '专利授权信息汇总 ' . date("Y-m-d") . '.xls' ;

        $this -> generate($rows,$file_name) ;

        $this -> ajaxReturn($file_name) ;
    }

    public function downloadAll (){

        //检索
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.application_id') != '' )
            $search['application_id'] = array('like','%' . I('request.application_id') . '%' );
        if ( I('request.auth_id') != '' )
            $search['auth_id'] = array('like','%' . I('request.auth_id') . '%' );

        $patent = D('PatentView');
        
        $rows = $patent -> where($search) -> select () ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        $xls_file = '专利授权信息汇总 ' . date("Y-m-d") . '.xls' ;

        $this -> generate($rows,$xls_file) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            if ( !empty($rows[$i]['file_name']) ){
                $files[] = zh('./Uploads/Patent/' . $rows[$i]['file_name']) ;
            }
        }

       if ( count($files) == 0 )
            $this -> ajaxReturn(false) ;
        
        //压缩文件路径
        $filepath = "./Uploads/Patent/File/" ;

        //压缩文件名
        $filename = $filepath . 'Patent' . date ( ' Y-m-d' ) . ".zip"; // 最终生成的文件名（含路径）

        $this -> ajaxReturn( zip($filename,$files,zh($filepath.$xls_file)) );
    }

    private function generate($rows,$file_name){
        import("Org.Util.PHPExcel");
        import("ORG.Util.PHPExcel.IOFactory");

        $path = './Uploads/' . CONTROLLER_NAME . '/File/' . $file_name ;

        $objPHPExcel = new \PHPExcel();

        // Set document properties
        $objPHPExcel->getProperties()->setCreator("Jiangsu University")
							 ->setLastModifiedBy("Jiangsu University")
							 ->setTitle("Jiangsu University")
							 ->setSubject("Jiangsu University")
							 ->setDescription("Jiangsu University")
							 ->setKeywords("office PHPExcel php")
							 ->setCategory("Patent");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '发明名称')
                    ->setCellValue('B1', '第一发明人')
                    ->setCellValue('C1', '其它发明人')
                    ->setCellValue('D1', '发明类型')
                    ->setCellValue('E1', '状态')
                    ->setCellValue('F1', '部门(系)')
                    ->setCellValue('G1', '申请号')
                    ->setCellValue('H1', '申请时间')
                    ->setCellValue('I1', '授权号')
                    ->setCellValue('J1', '授权时间')
                    ->setCellValue('K1', '附件') ;
        
        //垂直居中
        $objPHPExcel->getDefaultStyle()->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        // $objPHPExcel->getDefaultStyle()->getAlignment()->setVertical(\PHPExcel_Style_Alignment::VERTICAL_CENTER);

        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('A')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('B')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('C')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('D')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('E')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('F')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('G')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('H')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('I')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('J')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('K')->setWidth(30);
                    
        //写数据进Excel
        for ( $i = 2 ; $i < count($rows) + 2 ; $i ++ ){
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$i, $rows[$i-2]['topic'])
                    ->setCellValue('B'.$i ,$rows[$i-2]['author'])
                    ->setCellValue('C'.$i, $rows[$i-2]['other_author'])
                    ->setCellValue('D'.$i, $rows[$i-2]['category'])
                    ->setCellValue('E'.$i, $rows[$i-2]['state'])
                    ->setCellValue('F'.$i, $rows[$i-2]['unit_name'])
                    ->setCellValue('G'.$i, $rows[$i-2]['application_id'])
                    ->setCellValue('H'.$i, $rows[$i-2]['application_date'])
                    ->setCellValue('I'.$i, $rows[$i-2]['auth_id'])
                    ->setCellValue('J'.$i, $rows[$i-2]['auth_date'])
                    ->setCellValue('K'.$i, $rows[$i-2]['file_name']) ;
        }
        // Rename worksheet
        $objPHPExcel->getActiveSheet()->setTitle('Sheet1');
        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save(zh_cn($path));
    }

}

?>
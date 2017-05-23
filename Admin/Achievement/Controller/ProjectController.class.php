<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;

class ProjectController extends CommonController{

    public function index(){

        //压缩文件路径
        $filepath = "./Uploads/Project/File/" ;

        //清除以前缓存
        delDirAndFile($filepath) ;

        $this -> display('project') ;
    }

    public function data(){
        //排序
        $sort = I('request.sort','start_date') ;
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
        if ( I('request.id') != '' )
            $search['id'] = array('like','%' . I('request.id') . '%' );
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.start_date') != '' )
            $search['start_date'] = array('EGT',I('request.start_date'));

        $project = D('ProjectView') ;

        $data['rows'] = $project  -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $project -> where($search) -> count() ;

        for ( $i = 0 ; $i < count($data['rows']) ; $i ++ ){
            $data['rows'][$i]['unit_name'] = getUnitName($data['rows'][$i]['tid']) ;
        }
        
        $this -> ajaxReturn($data) ;
    }

    public function exportAll(){

        //检索
        if ( I('request.id') != '' )
            $search['id'] = array('like','%' . I('request.id') . '%' );
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.start_date') != '' )
            $search['start_date'] = array('EGT',I('request.start_date'));

        $project = D('ProjectView');
        
        $rows = $project -> where($search) -> select () ;

        if ( count($rows) == 0 )
            $this -> ajaxReturn(false) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        $file_name = '科研项目信息汇总 ' . date("Y-m-d") . '.xls' ;

        $this -> generate($rows,$file_name) ;

        $this -> ajaxReturn($file_name) ;
    }

    public function downloadAll (){

        //检索
        if ( I('request.id') != '' )
            $search['id'] = array('like','%' . I('request.id') . '%' );
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.start_date') != '' )
            $search['start_date'] = array('EGT',I('request.start_date'));

        $project = D('ProjectView');
        
        $rows = $project -> where($search) -> select () ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        $xls_file = '科研项目信息汇总 ' . date("Y-m-d") . '.xls' ;

        $this -> generate($rows,$xls_file) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            if ( !empty($rows[$i]['file_name']) ){
                $files[] = zh('./Uploads/Project/' . $rows[$i]['file_name']) ;
            }
        }

       if ( count($files) == 0 )
            $this -> ajaxReturn(false) ;
        
        //压缩文件路径
        $filepath = "./Uploads/Project/File/" ;

        //压缩文件名
        $filename = $filepath . 'Project' . date ( ' Y-m-d' ) . ".zip"; // 最终生成的文件名（含路径）

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
							 ->setCategory("Project");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '项目编号')
                    ->setCellValue('B1', '课题')
                    ->setCellValue('C1', '负责人')
                    ->setCellValue('D1', '参与人员')
                    ->setCellValue('E1', '部门(系)')
                    ->setCellValue('F1', '项目来源')
                    ->setCellValue('G1', '状态')
                    ->setCellValue('H1', '合同金额')
                    ->setCellValue('I1', '开始时间')
                    ->setCellValue('J1', '结束时间')
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
                    ->setCellValue('A'.$i, $rows[$i-2]['id'])
                    ->setCellValue('B'.$i ,$rows[$i-2]['topic'])
                    ->setCellValue('C'.$i, $rows[$i-2]['author'])
                    ->setCellValue('D'.$i, $rows[$i-2]['other_author'])
                    ->setCellValue('E'.$i, $rows[$i-2]['unit_name'])
                    ->setCellValue('F'.$i, $rows[$i-2]['category'])
                    ->setCellValue('G'.$i, $rows[$i-2]['state'])
                    ->setCellValue('H'.$i, $rows[$i-2]['project_sum'])
                    ->setCellValue('I'.$i, $rows[$i-2]['start_date'])
                    ->setCellValue('J'.$i, $rows[$i-2]['end_date'])
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
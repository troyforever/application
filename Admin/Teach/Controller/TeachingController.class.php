<?php 

namespace Teach\Controller;
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
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.annual') != '' )
            $search['annual'] = array('like','%' . I('request.annual') . '%' );
        if ( I('request.classes') != '' )
            $search['classes'] = array('like','%' . I('request.classes') . '%' );

        $teaching = D('TeachingView') ;

        $data['rows'] = $teaching  -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $teaching -> where($search) -> count() ;

        for ( $i = 0 ; $i < count($data['rows']) ; $i ++ ){
            $data['rows'][$i]['unit_name'] = getUnitName($data['rows'][$i]['tid']) ;
        }

        $this -> ajaxReturn($data) ;
    }

    public function exportSelect(){

        $selects = explode('-',I('selects')) ;

        $teaching = D('TeachingView') ;

        for ( $i = 0 ; $i < count($selects) ; $i ++ ){
            $item = $teaching -> where('Teaching.id='. $selects[$i]) -> find() ;
            $item['unit_name'] = getUnitName($item['tid']) ;

            $data[] = $item ;
        }

        import("Org.Util.PHPExcel");
        import("ORG.Util.PHPExcel.IOFactory");

        $file_name = '教学情况信息汇总 ' . date("Y-m-d") . '.xls' ;

        $path = './Uploads/' . CONTROLLER_NAME . '/File/' . $file_name ;

        $objPHPExcel = new \PHPExcel();

        // Set document properties
        $objPHPExcel->getProperties()->setCreator("Jiangsu University")
							 ->setLastModifiedBy("Jiangsu University")
							 ->setTitle("Jiangsu University")
							 ->setSubject("Jiangsu University")
							 ->setDescription("Jiangsu University")
							 ->setKeywords("office PHPExcel php")
							 ->setCategory("Teaching");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '课程')
                    ->setCellValue('B1', '授课教师')
                    ->setCellValue('C1', '部门（系）')
                    ->setCellValue('D1', '学分')
                    ->setCellValue('E1', '性质')
                    ->setCellValue('F1', '教学班级')
                    ->setCellValue('G1', '班级人数')
                    ->setCellValue('H1', '年度')
                    ->setCellValue('I1', '学期');
        
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
                    
        //写数据进Excel
        for ( $i = 2 ; $i < count($data) + 2 ; $i ++ ){
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$i, $data[$i-2]['lesson'])
                    ->setCellValue('B'.$i ,$data[$i-2]['name'])
                    ->setCellValue('C'.$i, $data[$i-2]['unit_name'])
                    ->setCellValue('D'.$i, $data[$i-2]['credit'])
                    ->setCellValue('E'.$i, $data[$i-2]['quality'])
                    ->setCellValue('F'.$i, $data[$i-2]['classes'])
                    ->setCellValue('G'.$i, $data[$i-2]['num'])
                    ->setCellValue('H'.$i, $data[$i-2]['annual'])
                    ->setCellValue('I'.$i, $data[$i-2]['term']);
        }
        // Rename worksheet
        $objPHPExcel->getActiveSheet()->setTitle('Sheet1');
        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save(zh_cn($path));

        $this -> ajaxReturn($file_name) ;
    }


    public function exportAll(){

        //检索
        if ( I('request.lesson') != '' )
            $search['lesson'] = array('like','%' . I('request.lesson') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.annual') != '' )
            $search['annual'] = array('like','%' . I('request.annual') . '%' );
        if ( I('request.classes') != '' )
            $search['classes'] = array('like','%' . I('request.classes') . '%' );

        $teaching = D('TeachingView');
        
        $rows = $teaching -> where($search) -> select () ;

        if ( count($rows) == 0 )
            $this -> ajaxReturn(false) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        import("Org.Util.PHPExcel");
        import("ORG.Util.PHPExcel.IOFactory");

        $file_name = '教学情况信息汇总 ' . date("Y-m-d") . '.xls' ;

        $path = './Uploads/' . CONTROLLER_NAME . '/File/' . $file_name ;

        $objPHPExcel = new \PHPExcel();

        // Set document properties
        $objPHPExcel->getProperties()->setCreator("Jiangsu University")
							 ->setLastModifiedBy("Jiangsu University")
							 ->setTitle("Jiangsu University")
							 ->setSubject("Jiangsu University")
							 ->setDescription("Jiangsu University")
							 ->setKeywords("office PHPExcel php")
							 ->setCategory("Teaching");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '课程')
                    ->setCellValue('B1', '授课教师')
                    ->setCellValue('C1', '部门（系）')
                    ->setCellValue('D1', '学分')
                    ->setCellValue('E1', '性质')
                    ->setCellValue('F1', '教学班级')
                    ->setCellValue('G1', '班级人数')
                    ->setCellValue('H1', '年度')
                    ->setCellValue('I1', '学期');
        
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
                    
        //写数据进Excel
        for ( $i = 2 ; $i < count($rows) + 2 ; $i ++ ){
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$i, $rows[$i-2]['lesson'])
                    ->setCellValue('B'.$i ,$rows[$i-2]['name'])
                    ->setCellValue('C'.$i, $rows[$i-2]['unit_name'])
                    ->setCellValue('D'.$i, $rows[$i-2]['credit'])
                    ->setCellValue('E'.$i, $rows[$i-2]['quality'])
                    ->setCellValue('F'.$i, $rows[$i-2]['classes'])
                    ->setCellValue('G'.$i, $rows[$i-2]['num'])
                    ->setCellValue('H'.$i, $rows[$i-2]['annual'])
                    ->setCellValue('I'.$i, $rows[$i-2]['term']);
        }
        // Rename worksheet
        $objPHPExcel->getActiveSheet()->setTitle('Sheet1');
        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save(zh_cn($path));

        $this -> ajaxReturn($file_name) ;
    }
}

?>
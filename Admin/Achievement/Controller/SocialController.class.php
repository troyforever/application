<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;

class SocialController extends CommonController{

    public function index(){
        if ( session('?tid') ){
            $base = M('Base') ;
            $name = $base -> where("userId='%s'",session('tid')) -> getField('name') ;
            $this -> assign('name',$name) -> display('social') ;
        }
    }

    public function data(){
        //排序
        $sort = I('request.sort','social_date') ;
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
            $search['unitId'] = I('request.unit');

        $social = D('SocialView') ;

        $data['rows'] = $social  -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $social -> where($search) -> count() ;

        for ( $i = 0 ; $i < count($data['rows']) ; $i ++ ){
            $data['rows'][$i]['unit_name'] = getUnitName($data['rows'][$i]['tid']) ;
        }

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        if ( session('?tid') ) {
            $data['id'] = I('id') ;
            $social = M('Social') ;

            $this -> ajaxReturn($social -> where($data) -> find()) ;
        }
    }

        public function exportSelect(){

        $selects = explode('-',I('selects')) ;

        $social = M('Social') ;

        for ( $i = 0 ; $i < count($selects) ; $i ++ ){
            $item = $social -> where('id='. $selects[$i]) -> find() ;
            $item['unit_name'] = getUnitName($item['tid']) ;

            $data[] = $item ;
        }

        import("Org.Util.PHPExcel");
        import("ORG.Util.PHPExcel.IOFactory");

        $file_name = '社会活动信息汇总 ' . date("Y-m-d") . '.xls' ;

        $path = './Uploads/' . CONTROLLER_NAME . '/File/' . $file_name ;

        $objPHPExcel = new \PHPExcel();

        // Set document properties
        $objPHPExcel->getProperties()->setCreator("Jiangsu University")
							 ->setLastModifiedBy("Jiangsu University")
							 ->setTitle("Jiangsu University")
							 ->setSubject("Jiangsu University")
							 ->setDescription("Jiangsu University")
							 ->setKeywords("office PHPExcel php")
							 ->setCategory("Social");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '活动主题')
                    ->setCellValue('B1', '举办单位')
                    ->setCellValue('C1', '活动地点')
                    ->setCellValue('D1', '举办时间')
                    ->setCellValue('E1', '备注')
                    ->setCellValue('F1', '附件') ;
        
        //垂直居中
        $objPHPExcel->getDefaultStyle()->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        // $objPHPExcel->getDefaultStyle()->getAlignment()->setVertical(\PHPExcel_Style_Alignment::VERTICAL_CENTER);

        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('A')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('B')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('C')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('D')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('E')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('F')->setWidth(30);
                    
        //写数据进Excel
        for ( $i = 2 ; $i < count($data) + 2 ; $i ++ ){
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$i, $data[$i-2]['topic'])
                    ->setCellValue('B'.$i ,$data[$i-2]['unit'])
                    ->setCellValue('C'.$i, $data[$i-2]['location'])
                    ->setCellValue('D'.$i, $data[$i-2]['social_date'])
                    ->setCellValue('E'.$i, $data[$i-2]['note'])
                    ->setCellValue('F'.$i, $data[$i-2]['file_name']) ;
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
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unitId'] = I('request.unit');

        $social = D('SocialView');
        
        $rows = $social -> where($search) -> select () ;

        if ( count($rows) == 0 )
            $this -> ajaxReturn(false) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        import("Org.Util.PHPExcel");
        import("ORG.Util.PHPExcel.IOFactory");

        $file_name = '社会活动信息汇总 ' . date("Y-m-d") . '.xls' ;

        $path = './Uploads/' . CONTROLLER_NAME . '/File/' . $file_name ;

        $objPHPExcel = new \PHPExcel();

        // Set document properties
        $objPHPExcel->getProperties()->setCreator("Jiangsu University")
							 ->setLastModifiedBy("Jiangsu University")
							 ->setTitle("Jiangsu University")
							 ->setSubject("Jiangsu University")
							 ->setDescription("Jiangsu University")
							 ->setKeywords("office PHPExcel php")
							 ->setCategory("Social");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '活动主题')
                    ->setCellValue('B1', '举办单位')
                    ->setCellValue('C1', '活动地点')
                    ->setCellValue('D1', '举办时间')
                    ->setCellValue('E1', '备注')
                    ->setCellValue('F1', '附件') ;
        
        //垂直居中
        $objPHPExcel->getDefaultStyle()->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        // $objPHPExcel->getDefaultStyle()->getAlignment()->setVertical(\PHPExcel_Style_Alignment::VERTICAL_CENTER);

        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('A')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('B')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('C')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('D')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('E')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('F')->setWidth(30);
                    
        //写数据进Excel
        for ( $i = 2 ; $i < count($rows) + 2 ; $i ++ ){
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$i, $rows[$i-2]['topic'])
                    ->setCellValue('B'.$i ,$rows[$i-2]['unit'])
                    ->setCellValue('C'.$i, $rows[$i-2]['location'])
                    ->setCellValue('D'.$i, $rows[$i-2]['social_date'])
                    ->setCellValue('E'.$i, $rows[$i-2]['note'])
                    ->setCellValue('F'.$i, $rows[$i-2]['file_name']) ;
        }
        // Rename worksheet
        $objPHPExcel->getActiveSheet()->setTitle('Sheet1');
        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save(zh_cn($path));

        $this -> ajaxReturn($file_name) ;
    }

    public function downloadSelect(){

        if ( empty(I('selects'))){
            $this -> ajaxReturn(false) ;
        }

        $selects = explode('-',I('selects')) ;     

        $social = M('Social') ;

        //带打包的附件集合
        for ( $i = 0 ; $i < count($selects) ; $i ++ ){
            $item = $social -> where('id='. $selects[$i]) -> getField('file_name') ;
            if ( !empty($item) )
            {
                $files[] = zh_cn('./Uploads/Social/' . $item ) ;
            }
        }

        if ( count($files) == 0 )
            $this -> ajaxReturn(false) ;
        
        //压缩文件路径
        $filepath = "./Uploads/Social/File/" ;

        //压缩文件名
        $filename = $filepath . 'Social' . date ( ' Y-m-d' ) . ".zip"; // 最终生成的文件名（含路径）

        //清除以前缓存
        delDirAndFile($filepath) ;

        $this -> ajaxReturn( zip($filename,$files) );
    }

    public function downloadAll (){

        //检索
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unitId'] = I('request.unit');
        

        $social = D('SocialView');
        
        $rows = $social -> where($search) -> field('file_name') -> select () ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            if ( !empty($rows[$i]['file_name']) ){
                $files[] = zh('./Uploads/Social/' . $rows[$i]['file_name']) ;
            }
        }

       if ( count($files) == 0 )
            $this -> ajaxReturn(false) ;
        
        //压缩文件路径
        $filepath = "./Uploads/Social/File/" ;

        //压缩文件名
        $filename = $filepath . 'Social' . date ( ' Y-m-d' ) . ".zip"; // 最终生成的文件名（含路径）

        //清除以前缓存
        delDirAndFile($filepath) ;

        $this -> ajaxReturn( zip($filename,$files) );
    }
}

?>
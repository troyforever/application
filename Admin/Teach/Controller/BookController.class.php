<?php 

namespace Teach\Controller;
use Common\Controller\CommonController;
use Think\Upload;

class BookController extends CommonController{

    public function index(){
        $this -> display('book') ;
    }

    public function data(){
        //排序
        $sort = I('request.sort','publication_date') ;
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
        if ( I('request.title') != '' )
            $search['title'] = array('like','%' . I('request.title') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');

        $book = D('BookView') ;
        
        $data['rows'] = $book -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $book -> where($search) -> count() ;

        for ( $i = 0 ; $i < count($data['rows']) ; $i ++ ){
            $data['rows'][$i]['unit_name'] = getUnitName($data['rows'][$i]['tid']) ;
        }

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        if ( session('?tid') ){
            $book = M('Book') ;
            $this -> ajaxReturn($book -> where('id='.I('post.id')) -> find()) ;
        } 
        return NULL;
    }

    public function exportSelect(){

        $selects = explode('-',I('selects')) ;

        $book = M('Book') ;

        for ( $i = 0 ; $i < count($selects) ; $i ++ ){
            $item = $book -> where('id='. $selects[$i]) -> find() ;
            $item['unit_name'] = getUnitName($item['tid']) ;

            $data[] = $item ;
        }

        import("Org.Util.PHPExcel");
        import("ORG.Util.PHPExcel.IOFactory");

        $file_name = '著作信息汇总 ' . date("Y-m-d") . '.xls' ;

        $path = './Uploads/' . CONTROLLER_NAME . '/File/' . $file_name ;

        $objPHPExcel = new \PHPExcel();

        // Set document properties
        $objPHPExcel->getProperties()->setCreator("Jiangsu University")
							 ->setLastModifiedBy("Jiangsu University")
							 ->setTitle("Jiangsu University")
							 ->setSubject("Jiangsu University")
							 ->setDescription("Jiangsu University")
							 ->setKeywords("office PHPExcel php")
							 ->setCategory("Book");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '著作名')
                    ->setCellValue('B1', '责任作者')
                    ->setCellValue('C1', '其它作者')
                    ->setCellValue('D1', '部门(系)')
                    ->setCellValue('E1', '出版单位')
                    ->setCellValue('F1', '出版时间')
                    ->setCellValue('G1', '定价')
                    ->setCellValue('H1', '摘要')
                    ->setCellValue('I1', '适用读者')
                    ->setCellValue('J1', '备注')
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
        for ( $i = 2 ; $i < count($data) + 2 ; $i ++ ){
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$i, $data[$i-2]['title'])
                    ->setCellValue('B'.$i, $data[$i-2]['author'])
                    ->setCellValue('C'.$i, $data[$i-2]['other_author'])
                    ->setCellValue('D'.$i, $data[$i-2]['unit_name'])
                    ->setCellValue('E'.$i, $data[$i-2]['publication'])
                    ->setCellValue('F'.$i, $data[$i-2]['publication_date'])
                    ->setCellValue('G'.$i, $data[$i-2]['price'])
                    ->setCellValue('H'.$i, $data[$i-2]['abstract'])
                    ->setCellValue('I'.$i, $data[$i-2]['aim_user'])
                    ->setCellValue('J'.$i, $data[$i-2]['note'])
                    ->setCellValue('K'.$i, $data[$i-2]['file_name']) ;
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
            $search['unit'] = I('request.unit');

        $book = D('BookView');
        
        $rows = $book -> where($search) -> select () ;

        if ( count($rows) == 0 )
            $this -> ajaxReturn(false) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        import("Org.Util.PHPExcel");
        import("ORG.Util.PHPExcel.IOFactory");

        $file_name = '著作信息汇总 ' . date("Y-m-d") . '.xls' ;

        $path = './Uploads/' . CONTROLLER_NAME . '/File/' . $file_name ;

        $objPHPExcel = new \PHPExcel();

        // Set document properties
        $objPHPExcel->getProperties()->setCreator("Jiangsu University")
							 ->setLastModifiedBy("Jiangsu University")
							 ->setTitle("Jiangsu University")
							 ->setSubject("Jiangsu University")
							 ->setDescription("Jiangsu University")
							 ->setKeywords("office PHPExcel php")
							 ->setCategory("Book");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '著作名')
                    ->setCellValue('B1', '责任作者')
                    ->setCellValue('C1', '其它作者')
                    ->setCellValue('D1', '部门(系)')
                    ->setCellValue('E1', '出版单位')
                    ->setCellValue('F1', '出版时间')
                    ->setCellValue('G1', '定价')
                    ->setCellValue('H1', '摘要')
                    ->setCellValue('I1', '适用读者')
                    ->setCellValue('J1', '备注')
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
                    ->setCellValue('A'.$i, $rows[$i-2]['title'])
                    ->setCellValue('B'.$i, $rows[$i-2]['author'])
                    ->setCellValue('C'.$i, $rows[$i-2]['other_author'])
                    ->setCellValue('D'.$i, $rows[$i-2]['unit_name'])
                    ->setCellValue('E'.$i, $rows[$i-2]['publication'])
                    ->setCellValue('F'.$i, $rows[$i-2]['publication_date'])
                    ->setCellValue('G'.$i, $rows[$i-2]['price'])
                    ->setCellValue('H'.$i, $rows[$i-2]['abstract'])
                    ->setCellValue('I'.$i, $rows[$i-2]['aim_user'])
                    ->setCellValue('J'.$i, $rows[$i-2]['note'])
                    ->setCellValue('K'.$i, $rows[$i-2]['file_name']) ;
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

        $book = M('Book') ;

        //带打包的附件集合
        for ( $i = 0 ; $i < count($selects) ; $i ++ ){
            $item = $book -> where('id='. $selects[$i]) -> getField('file_name') ;
            if ( !empty($item) )
            {
                $files[] = zh_cn('./Uploads/Book/' . $item ) ;
            }
        }

        if ( count($files) == 0 )
            $this -> ajaxReturn(false) ;
        
        //压缩文件路径
        $filepath = "./Uploads/Book/File/" ;

        //压缩文件名
        $filename = $filepath . 'Book' . date ( ' Y-m-d' ) . ".zip"; // 最终生成的文件名（含路径）

        //清除以前缓存
        delDirAndFile($filepath) ;

        $this -> ajaxReturn( zip($filename,$files) );
    }

    public function downloadAll (){

        //检索
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');

        $book = D('BookView');
        
        $rows = $book -> where($search) -> field('file_name') -> select () ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            if ( !empty($rows[$i]['file_name']) ){
                $files[] = zh('./Uploads/Book/' . $rows[$i]['file_name']) ;
            }
        }

       if ( count($files) == 0 )
            $this -> ajaxReturn(false) ;
        
        //压缩文件路径
        $filepath = "./Uploads/Book/File/" ;

        //压缩文件名
        $filename = $filepath . 'Book' . date ( ' Y-m-d' ) . ".zip"; // 最终生成的文件名（含路径）

        //清除以前缓存
        delDirAndFile($filepath) ;

        $this -> ajaxReturn( zip($filename,$files) );
    }
}

?>
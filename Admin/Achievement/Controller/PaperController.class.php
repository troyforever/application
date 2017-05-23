<?php 

namespace Achievement\Controller;
use Common\Controller\CommonController;
use Common\Model\BaseModel;
use Teach\Model\PaperViewModel;

use Think\Upload;

class PaperController extends CommonController{

    public function index(){

        //压缩文件路径
        $filepath = "./Uploads/Paper/File/" ;

        //清除以前缓存
        delDirAndFile($filepath) ;

        $this -> display('paper') ;
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
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.from') != '' )
            $search['publication_date'] = array('EGT',I('request.from'));
        if ( I('request.to') != '' )
            $search['publication_date'] = array('ELT',I('request.to'));
        if ( I('request.to') != '' && I('request.from') != '')
            $search['publication_date'] = array('BETWEEN',array(I('request.from'),I('request.to'))) ;

        $paper = D('PaperView');
        
        $data['rows'] = $paper -> where($search) -> limit($from,$rows) -> order($sortstr) -> select () ;

        $data['total'] = $paper -> where($search) -> limit($from,$rows) -> order($sortstr) -> count () ;

        for ( $i = 0 ; $i < count($data['rows']) ; $i ++ ){
            $data['rows'][$i]['unit_name'] = getUnitName($data['rows'][$i]['tid']) ;
        }

        $this -> ajaxReturn($data) ;
    }

    public function find(){
        $paper = M('Paper') ;
        $result = $paper -> where('id='.I('post.id')) -> find();
        $result['unit_name'] = getUnitName($result['tid']);
        $this -> ajaxReturn($result) ;
    }

    public function exportAll(){

        //检索
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.from') != '' )
            $search['publication_date'] = array('EGT',I('request.from'));
        if ( I('request.to') != '' )
            $search['publication_date'] = array('ELT',I('request.to'));
        if ( I('request.to') != '' && I('request.from') != '')
            $search['publication_date'] = array('BETWEEN',array(I('request.from'),I('request.to'))) ;

        $paper = D('PaperView');
        
        $rows = $paper -> where($search) -> select () ;

        if ( count($rows) == 0 )
            $this -> ajaxReturn(false) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        $file_name = '科研论文信息汇总 ' . date("Y-m-d") . '.xls' ;

        $this -> generate($rows,$file_name) ;

        $this -> ajaxReturn($file_name) ;
    }

    public function downloadAll (){

        //检索
        if ( I('request.topic') != '' )
            $search['topic'] = array('like','%' . I('request.topic') . '%' );
        if ( I('request.unit') != '' )
            $search['unit'] = I('request.unit');
        if ( I('request.from') != '' )
            $search['publication_date'] = array('EGT',I('request.from'));
        if ( I('request.to') != '' )
            $search['publication_date'] = array('ELT',I('request.to'));
        if ( I('request.to') != '' && I('request.from') != '')
            $search['publication_date'] = array('BETWEEN',array(I('request.from'),I('request.to'))) ;

        $paper = D('PaperView');
        
        $rows = $paper -> where($search) -> select () ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            $rows[$i]['unit_name'] = getUnitName($rows[$i]['tid']) ;
        }

        $xls_file = '科研论文信息汇总 ' . date("Y-m-d") . '.xls' ;

        $this -> generate($rows,$xls_file) ;

        for ( $i = 0 ; $i < count($rows) ; $i ++ ){
            if ( !empty($rows[$i]['file_name']) ){
                $files[] = zh('./Uploads/Paper/' . $rows[$i]['file_name']) ;
            }
        }

       if ( count($files) == 0 )
            $this -> ajaxReturn(false) ;
        
        //压缩文件路径
        $filepath = "./Uploads/Paper/File/" ;

        //压缩文件名
        $filename = $filepath . 'Paper' . date ( ' Y-m-d' ) . ".zip"; // 最终生成的文件名（含路径）

        $this -> ajaxReturn( zip($filename,$files,zh($filepath.$xls_file)) );
    }

    private function generate($data,$file_name){

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
							 ->setCategory("Paper");

        // Add some data
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A1', '题目')
                    ->setCellValue('B1', '摘要')
                    ->setCellValue('C1', '关键字')
                    ->setCellValue('D1', '第一作者')
                    ->setCellValue('E1', '其它作者')
                    ->setCellValue('F1', '部门(系)')
                    ->setCellValue('G1', '出版刊物')
                    ->setCellValue('H1', '出版时间')
                    ->setCellValue('I1', '收录')
                    ->setCellValue('J1', 'SCI分区')
                    ->setCellValue('K1', '收录时间')
                    ->setCellValue('L1', '影响因子')
                    ->setCellValue('M1', '备注')
                    ->setCellValue('N1', '附件') ;
        
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
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('L')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('M')->setWidth(30);
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension('N')->setWidth(30);
                    
        //写数据进Excel
        for ( $i = 2 ; $i < count($data) + 2 ; $i ++ ){
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$i, $data[$i-2]['topic'])
                    ->setCellValue('B'.$i ,$data[$i-2]['abstract'])
                    ->setCellValue('C'.$i, $data[$i-2]['keywords'])
                    ->setCellValue('D'.$i, $data[$i-2]['first_author'])
                    ->setCellValue('E'.$i, $data[$i-2]['other_author'])
                    ->setCellValue('F'.$i, $data[$i-2]['unit_name'])
                    ->setCellValue('G'.$i, $data[$i-2]['publication'])
                    ->setCellValue('H'.$i, $data[$i-2]['publication_date'])
                    ->setCellValue('I'.$i, $data[$i-2]['final_index'])
                    ->setCellValue('J'.$i, $data[$i-2]['sci_partition'])
                    ->setCellValue('K'.$i, $data[$i-2]['index_date'])
                    ->setCellValue('L'.$i, $data[$i-2]['if_num'])
                    ->setCellValue('M'.$i, $data[$i-2]['note'])
                    ->setCellValue('N'.$i, $data[$i-2]['file_name']) ;
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
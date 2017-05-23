<?php
    use Think\Model;

    function getUnitName($tid){
        $data['userId'] = $tid ;
        $result = D('BaseView') -> field('unit_name') -> where($data) -> select() ;
        return $result[0]['unit_name'] ;
    }

    function zh_cn($str){
        return iconv('utf-8', 'gbk', $str) ;
    }
    
    function zh($str){
        return iconv('utf-8', 'gbk', $str) ;
    }

    /** 
    +----------------------------------------------------------------------------------------- 
    * 删除目录及目录下所有文件或删除指定文件 
    +----------------------------------------------------------------------------------------- 
    * @param str $path   待删除目录路径 
    * @param int $delDir 是否删除目录，1或true删除目录，0或false则只删除文件保留目录（包含子目录） 
    +----------------------------------------------------------------------------------------- 
    * @return bool 返回删除状态 
    +----------------------------------------------------------------------------------------- 
    */  
    function delDirAndFile($path, $delDir = FALSE) {  
        if (is_array($path)) {  
            foreach ($path as $subPath)  
                delDirAndFile($subPath, $delDir);  
        }  
        if (is_dir($path)) {  
            $handle = opendir($path);  
            if ($handle) {  
                while (false !== ( $item = readdir($handle) )) {  
                    if ($item != "." && $item != "..")  
                        is_dir("$path/$item") ? delDirAndFile("$path/$item", $delDir) : unlink("$path/$item");  
                }  
                closedir($handle);  
                if ($delDir)  
                    return rmdir($path);  
            }  
        } else {  
            if (file_exists($path)) {  
                return unlink($path);  
            } else {  
                return FALSE;  
            }  
        }  
        clearstatcache();  
    } 

    function zip($filename,$files,$xls_file=null){
        $zip = new \ZipArchive (); // 使用本类，linux需开启zlib，windows需取消php_zip.dll前的注释

        if ( $zip->open ( $filename, \ZIPARCHIVE::OVERWRITE ) !== TRUE && $zip->open ( $filename, \ZIPARCHIVE::CREATE ) !== TRUE )
            exit ( '无法打开文件，或者文件创建失败' );

        foreach ( $files as $val ) {
            $zip->addFile ( $val, basename ( $val ) ); // 第二个参数是放在压缩包中的文件名称，如果文件可能会有重复，就需要注意一下
        }

        $zip -> addFile ( $xls_file, basename($xls_file) ) ;

        $basename = basename($zip->filename) ;
        $zip->close (); // 关闭

        return $basename ;
    }
?>
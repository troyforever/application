<?php
namespace Home\Model ;
use Think\Model\RelationModel ;

class BaseModel extends RelationModel{
    protected $_link = array(
        'Unit' => array(
            'mapping_type' => self::BELONGS_TO,
            'class_name' => 'Unit' ,
            'mapping_name' => 'unit' ,
            'foreign_key' => 'unitid' ,
        ),
        'Department' => array(
            'mapping_type' => self::BELONGS_TO,
            'class_name' => 'Department' ,
            'mapping_name' => 'department' ,
            'foreign_key' => 'departmentid' ,
        )
    ) ;
}
?>
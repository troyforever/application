<?php
    namespace Teacher\Model;
    use Think\Model\RelationModel ;

    class BaseRelationModel extends RelationModel{

        protected $tableName = 'base';

        protected $_link = array(
            'Unit' => array(
                'mapping_type' => self::BELONGS_TO,
                'class_name' => 'Unit',
                'foreign_key' => 'unitid',
                'mapping_fields' => 'id,name' ,
                'as_fields' => 'id:unit_id,name:unit_name' ,
            ) ,

            'Department' => array(
                'mapping_type' => self::BELONGS_TO,
                'class_name' => 'Department' ,
                'foreign_key' => 'departmentid' ,
                'mapping_fields' => 'id,name' ,
                'as_fields' => 'id:department_id,name:department_name' ,
            ) ,
        );
    }

?>
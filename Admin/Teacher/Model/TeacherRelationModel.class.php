<?php
    namespace Teacher\Model;
    use Think\Model\RelationModel ;

    class TeacherRelationModel extends RelationModel{

        protected $tableName = 'user';

        protected $_link = array(
            'BaseRelation' => array(
                'mapping_type' => self::HAS_ONE,
                'class_name' => 'BaseRelation',
                'mapping_name' => 'base' ,
                'foreign_key' => 'userId',
                'as_fields' => 'name,gender,unit_id,unit_name,department_id,department_name',
                'relation_deep' => array('Unit','Department'),
            ),
        );
    }
?>
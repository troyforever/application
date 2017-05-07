<?php
    namespace Common\Model;
    use Think\Model\ViewModel;

    class BaseViewModel extends ViewModel{

        public $viewFields = array(
            'Base' => array('*','_table'=>'ctmas_base'),
            'Unit'  => array('name'=>'unit_name','_on'=>'Base.unitId=Unit.id')
        );
        
    }
?>
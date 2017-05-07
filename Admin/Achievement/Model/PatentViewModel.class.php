<?php
    namespace Achievement\Model;
    use Think\Model\ViewModel;

    class PatentViewModel extends ViewModel{

        public $viewFields = array(
            'Patent' => array('*'),
            'Base'  => array('unitId' => 'unit', '_type' => 'LEFT', '_on' => 'Patent.tid=Base.userId')
        );
        
    }
?>
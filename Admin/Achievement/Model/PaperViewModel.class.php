<?php
    namespace Achievement\Model;
    use Think\Model\ViewModel;

    class PaperViewModel extends ViewModel{

        public $viewFields = array(
            'Paper' => array('*'),
            'Base'  => array('unitId' => 'unit', '_type' => 'LEFT', '_on' => 'Paper.tid=Base.userId')
        );
        
    }
?>
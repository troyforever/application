<?php
    namespace Achievement\Model;
    use Think\Model\ViewModel;

    class PrizeViewModel extends ViewModel{

        public $viewFields = array(
            'Prize' => array('*'),
            'Base'  => array('name','unitId', '_type' => 'LEFT', '_on' => 'Prize.tid=Base.userId')
        );
        
    }
?>
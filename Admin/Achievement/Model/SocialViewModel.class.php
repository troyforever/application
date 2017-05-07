<?php
    namespace Achievement\Model;
    use Think\Model\ViewModel;

    class SocialViewModel extends ViewModel{

        public $viewFields = array(
            'Social' => array('*'),
            'Base'  => array('unitId','name', '_type' => 'LEFT', '_on' => 'Social.tid=Base.userId')
        );
        
    }
?>
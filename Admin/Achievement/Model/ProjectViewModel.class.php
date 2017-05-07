<?php
    namespace Achievement\Model;
    use Think\Model\ViewModel;

    class ProjectViewModel extends ViewModel{

        public $viewFields = array(
            'Project' => array('*'),
            'Base'  => array('unitId' => 'unit', '_type' => 'LEFT', '_on' => 'Project.tid=Base.userId')
        );
        
    }
?>
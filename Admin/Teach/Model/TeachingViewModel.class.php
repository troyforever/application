<?php
    namespace Teach\Model;
    use Think\Model\ViewModel;

    class TeachingViewModel extends ViewModel{

        public $viewFields = array(
            'Teaching' => array('*'),
            'Base'  => array('unitId' => 'unit','name', '_type' => 'LEFT', '_on' => 'Teaching.tid=Base.userId')
        );
        
    }
?>
<?php
    namespace Teach\Model;
    use Think\Model\ViewModel;

    class ProjectViewModel extends ViewModel{

        public $viewFields = array(
            'TeachProject' => array('*','_table'=>'ctmas_teach_project'),
            'Base'  => array('unitId' => 'unit', '_type' => 'LEFT', '_on' => 'TeachProject.tid=Base.userId')
        );
        
    }
?>
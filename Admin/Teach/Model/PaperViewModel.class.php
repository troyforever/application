<?php
    namespace Teach\Model;
    use Think\Model\ViewModel;

    class PaperViewModel extends ViewModel{

        public $viewFields = array(
            'TeachPaper' => array('*','_table'=>'ctmas_teach_paper'),
            'Base'  => array('unitId' => 'unit', '_type' => 'LEFT', '_on' => 'TeachPaper.tid=Base.userId')
        );
        
    }
?>
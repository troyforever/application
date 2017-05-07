<?php
    namespace Teach\Model;
    use Think\Model\ViewModel;

    class BookViewModel extends ViewModel{

        public $viewFields = array(
            'Book' => array('*'),
            'Base'  => array('unitId' => 'unit', '_type' => 'LEFT', '_on' => 'Book.tid=Base.userId')
        );
        
    }
?>
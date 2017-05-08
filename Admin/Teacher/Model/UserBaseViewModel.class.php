<?php
    namespace Teacher\Model;
    use Think\Model\ViewModel ;

    class UserBaseViewModel extends ViewModel{

        public $viewFields = array(
            
            'User'=>array('*'), 

            // 'Base'=>array(
            //     '*', '_on'=>'User.tid=Base.userId'
            // ), 
        );
    }

?>
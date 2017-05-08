<?php
    namespace RBAC\Model;
    use Think\Model\ViewModel ;

    class UserBaseViewModel extends ViewModel{

        public $viewFields = array(
            
            'User'=>array('*'), 

            'Base'=>array(
                'id', '_on'=>'User.tid=Base.userId'
            ), 
        );
    }

?>
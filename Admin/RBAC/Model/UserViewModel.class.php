<?php
    namespace RBAC\Model;
    use Think\Model\ViewModel ;

    class UserViewModel extends ViewModel{

        public $viewFields = array(
            
            'User'=>array('*'), 

            'RoleUser'=>array(
                'role_id', '_on'=>'User.tid=RoleUser.user_id'
            ), 
        );
    }

?>
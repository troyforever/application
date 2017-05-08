<?php
    namespace Teacher\Model;
    use Think\Model\ViewModel ;

    class UserRoleViewModel extends ViewModel{

        public $viewFields = array(
            
            'RoleUser'=>array('*'), 

            'Role'=>array(
                'name', '_on'=>'RoleUser.role_id=Role.id'
            ), 
        );
    }

?>
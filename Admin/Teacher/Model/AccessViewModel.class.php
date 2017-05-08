<?php
    namespace Teacher\Model;
    use Think\Model\ViewModel ;

    class AccessViewModel extends ViewModel{

        public $viewFields = array(
            
            'Access'=>array('role_id'), 

            'Node'=>array(
                '*', '_on'=>'Access.node_id=Node.id'
            ), 
        );
    }

?>
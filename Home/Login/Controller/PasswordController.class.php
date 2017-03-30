<?php
namespace Login\Controller;
use Think\Controller ;
class PasswordController extends Controller {
    
    public function index(){
        $this -> display('fgtpwd') ;
    }

    public function checkMail(){

        $user = M('User') ;
        $email = I('post.email') ;

        if ( $user -> where("email='%s'",$email) -> find() != null )
            $this -> ajaxReturn(true) ;
        else
            $this -> ajaxReturn(false) ;
    }

    public function verify(){
        $code = I('post.code') ;
        $email = I('post.email') ;
        if ($code == session('fgtpwd.code') && $email == session('fgtpwd.email') ){
            $user = M('user') ;
            $user -> field('tid') -> where("email='%s'",session('fgtpwd.email')) -> find() ;
            session('fgtpwd.code',null) ;
            session('fgtpwd.email',null) ;
            session('fgtpwd.tid',$user->tid) ;
            session('fgtpwd.setpwd',true) ;
            $this -> ajaxReturn(true);
        }
        $this -> ajaxReturn(false) ;
    }

    public function sendMail (){
        $email = I('post.email') ;
        $code = rand(1000,9999) ;
        session('fgtpwd.code',$code) ;
        session('fgtpwd.email',$email) ;
        $this -> ajaxReturn(sendMail($email,'验证码','尊敬的教师，您好，您的验证码是：' . $code . ' ')) ;
    }

    public function setpwd(){
        if ( session('?fgtpwd.setpwd') && session('?fgtpwd.tid') ){
            $this -> assign('tid',session('fgtpwd.tid')) -> display() ;
        } else {
            $this -> redirect('/Login/Password') ;
        }
    }

    public function setpwdDo (){
        if ( session('?fgtpwd.tid') && session('?fgtpwd.setpwd') ){
			$user = M('User') ;

            $user -> field('password') -> where("tid='%s'",session('fgtpwd.tid')) -> find() ;

            if ( $user -> password == md5(I('post.pwd')) ){
                session('fgtpwd.setpwd',null) ;
                session('fgtpwd.tid',null) ;
                session('tid',null) ;
                $this -> ajaxReturn(true) ;
            }

			$user -> password = md5(I('post.pwd')) ;

			if ( $user -> where("tid='%s'",session('fgtpwd.tid')) -> save() == 1 ){
				session('fgtpwd.setpwd',null) ;
				session('fgtpwd.tid',null) ;
				session('tid',null) ;
                $this -> ajaxReturn (true) ;
			} else {
				$this -> ajaxReturn (false) ;
			}
		} else {
			$this -> ajaxReturn(false) ;
		}
    }
}
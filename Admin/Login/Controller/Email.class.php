<?php
namespace Login\Controller;

public class Email {
    public function sendMail(){
            date_default_timezone_set('Asia/Shanghai');//设定时区东八区
        require_once('class.phpmailer.php');
        include('class.smtp.php');
        $mail = new PHPMailer;

        $mail->SMTPDebug = 2;                               // Enable verbose debug output

        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.qq.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = '1269334064@qq.com';                 // SMTP username
        $mail->Password = 'Troy13145200';                           // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;  

        echo $mail->Host;                                  // TCP port to connect to

        $mail->setFrom('1269334064@qq.com', 'Mailer');
        // $mail->addAddress('714080794@qq.com', 'Joe User');     // Add a recipient
        $mail->addAddress('1269334064@qq.com');               // Name is optional
        $mail->addReplyTo('1269334064@qq.com', 'Information');
        // $mail->addCC('714034323@qq.com');
        // $mail->addBCC('714034323@qq.com');

        // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        $mail->isHTML(false);                                  // Set email format to HTML

        $mail->Subject = 'Here is the subject';
        $mail->Body    = $body;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            echo ucwords('Message has been sent');
        }
    }
}
?>
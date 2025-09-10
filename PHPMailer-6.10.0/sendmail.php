<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields (use defaults if missing)
    $name    = isset($_POST['name']) ? $_POST['name'] : "Website Visitor";
    $email   = isset($_POST['email']) ? $_POST['email'] : "no-reply@rmcardealing.com";
    $phone   = isset($_POST['phone']) ? $_POST['phone'] : "Not Provided";
    $message = isset($_POST['message']) ? $_POST['message'] : "Quick contact request from footer button. Please follow up.";

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'rmpartsandcardealing@gmail.com'; // your Gmail
        $mail->Password   = 'YOUR_APP_PASSWORD'; // 🔑 Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('rmpartsandcardealing@gmail.com', 'RM Car Dealing Website');
        $mail->addAddress('rmpartsandcardealing@gmail.com'); // receive in Gmail
        // Only add reply-to if real email provided (not footer quick contact)
        if ($email !== "no-reply@rmcardealing.com") {
            $mail->addReplyTo($email, $name);
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = "📩 New Inquiry from RM Website";
        $mail->Body    = "
            <h2>New Website Inquiry</h2>
            <p><b>Name:</b> $name</p>
            <p><b>Email:</b> $email</p>
            <p><b>Phone:</b> $phone</p>
            <p><b>Message:</b><br>$message</p>
        ";
        $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nMessage:\n$message";

        $mail->send();
        echo "<script>alert('✅ Your message has been sent successfully!'); window.location.href='index.html#contact';</script>";
    } catch (Exception $e) {
        echo "<script>alert('❌ Message could not be sent. Error: {$mail->ErrorInfo}'); window.history.back();</script>";
    }
}
?>

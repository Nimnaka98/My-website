<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$to = "nimnakakumaradasa1@gmail.com";
$subject = "Test Email";
$message = "This is a test email to verify PHP mail functionality.";
$headers = "From: nimnaka@nekfa.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Test email sent successfully.";
} else {
    echo "Failed to send test email.";
    error_log("Mail failed to send: " . error_get_last()['message']);
}
?>

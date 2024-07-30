<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Validate form fields
    if (empty($name) || empty($email) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Recipient email address
    $recipient = "nimnakakumaradasa1@gmail.com";
    $email_subject = "New contact from $name: $subject";

    // Ensure CRLF line endings in email content and headers
    $email_content = "Name: $name\r\n";
    $email_content .= "Email: $email\r\n\r\n";
    $email_content .= "Message:\r\n$message\r\n";

    $email_headers = "From: $name <$email>\r\n";

    // Attempt to send the email
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
        error_log("Mail failed to send: " . error_get_last()['message']);
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>

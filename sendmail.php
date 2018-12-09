<?php
// The message

$message = "Contact details : \n";
$message .= $_POST["name"];
$contactType=$_POST['ContactType'];
$email_to = "saikrishna.bhimavarapu@gmail.com,narenderraobalguri@gmail.com";
 $message .= "\n" . $_POST['email'] . "\n";
$message .= $_POST['mobile'] . "\n";

$email_subject = $_POST['ContactType'];

if( strcmp($contactType,"Enquiry") == 0){
   $email_to=$email_to . ',enquiry@decvinlabs.com';
} else{
  $email_to=$email_to .',feedback@decvinlabs.com';
}

if (!empty($_POST['product'])) {
   $message .= "\n";
$message .= "Product details: " . "\n";
$message .= $_POST['product'] . "\n";
$email_subject .=" for " . $_POST['product'];
}



$message .="\n". "Message:" . "\n";
$message .= $_POST['comments'] . "\n";
         $message .= "--End of message --";


    
    
// In case any of our lines are larger than 70 characters, we should use 
$message = wordwrap($message, 70, "\r\n");

// Send
mail($email_to, $email_subject, $message);

?>


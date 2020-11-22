function onSubmit(e) {
  // Leave the line below to create some access to Forms
  var aBlankFormVarNeccessary = FormApp.getActiveForm();
  
  var formQuestions = e.response.getItemResponses();
  
  const emailFromSubmitter = formQuestions[1].getResponse();
  const messageFromSubmitter = formQuestions[2].getResponse();
 
  const receiverEmail = getReceiver(emailFromSubmitter);
  
  
  var emailSubject = "[SHPE UCI] Letter from your Pen Pal 💌";

  var emailBody = 'Hi there '+receiverEmail+'!\n\nYour pen pal sent the following message:\n\n' + messageFromSubmitter + "\n\n"; 
  
  const emailSignature =  "Thank you for participating in the SHPE UCI Pen Pal Program.\n\n";
  emailBody += emailSignature;
  
  /*
    Notes on Email Quota: 
    
    Email recipients per day 	       100* / day 	
    Email read/write (excluding send) 	20,000 / day
  */
  
  MailApp.sendEmail(receiverEmail, emailSubject, emailBody);
 

}
function onSubmit(e) {
  // Leave the line below to create some access to Forms
  var aBlankFormVarNeccessary = FormApp.getActiveForm();
  
  var RespondentEmail = e.response.getRespondentEmail();
    
  var event = CalendarApp.getEventById("tpml36hb2duvtlkicdi2rn365o@google.com");
  

  // Get Meeting Details
  var meetingName = event.getTitle();
  var meetingDescription = event.getDescription();
  var meetingID = event.getId().split('@')[0];
  var eventID = Utilities.base64Encode(meetingID + ' ' + RespondentEmail);
  var meetingLink = 'https://www.google.com/calendar/render?action=VIEW&eid=' + eventID;
  var meetingTime = Utilities.formatDate(
    new Date(event.getStartTime()),
    Session.getScriptTimeZone(),
    'HHmm'
  );
  
  //Logger.log(event);
  //Logger.log(RespondentEmail);
  
  event.addGuest(RespondentEmail); 
  
  var emailSubject = "Event Reminder ⏰: " + meetingTime + " hrs. | " + meetingName;
  var emailBody = 'Hi there!\n\n'
          + 'You have successfully registered for: '+  meetingName + "\n\n"
          + 'Please responded ✅ or ❌ on your Google Calendar or using this invite link: ' + meetingLink + "\n\n"
          + 'Tech Committee is excited and hopes to see you on: '+ meetingTime 
          
  
  // If there's a meeting descrip, add to emailBody
  if (meetingDescription.length > 0) {
    emailBody = emailBody + '\n\nHere\'s the agenda:\n\n' + meetingDescription;
  }
  
  emailBody += '\n\nStay safe, Stay agile!\n\n';
  
  var emailSignature =  "Many thanks,\n"+
    "Josue Lopez\n\n"+
    "Tech Program Manager @ SHPE UCI\n"+
    "Software Engineering | University of Califor., Irvine\n"+
    "http://www.linkedin.com/in/josue-a-lopez";
  
  emailBody += emailSignature;
  
  MailApp.sendEmail(RespondentEmail, emailSubject, emailBody);
  
  /* 
    Credits to Email Format: https://script.gs/trigger-automated-meeting-invite-reminders-using-apps-script/  
  */
  
  /* 
  Notes on MailApp:  
  
    EmailApp & MailApp are different: https://developers.google.com/apps-script/reference/mail/mail-app
    Google has daily quota limits to send emails: https://developers.google.com/apps-script/guides/services/quotas#note1
    
    Email recipients per day 	            100* / day 	
    Email read/write (excluding send) 	20,000 / day
  */
}

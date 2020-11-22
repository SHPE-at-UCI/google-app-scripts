// getReceiver.gs 


// getReceiver(): Given an email, this function looks up the 
// corresponding Pen Pal buddy in the Pen Pal Database (A Google Sheet)

function getReceiver(inputEmail) {
  // Trim whitespaces both ends, and lowercase submitter email
  inputEmail = (inputEmail.trim()).toLowerCase();
  
  var penPalDatabaseId = PropertiesService.getScriptProperties().getProperty('penPalDatabaseId');
  var ss = SpreadsheetApp.openById(penPalDatabaseId);
  var sheet = ss.getSheets()[0];

  // This represents ALL the data
  var range = sheet.getDataRange();
  var values = range.getValues();
  
  const colOfEmailA = 1;
  const colOfEmailB = 3;
  
  var receiverEmail = "";
  
  //Loop through every retrieved row from the Source
  var activeRow = 0;
  for ( ; activeRow < values.length; activeRow++) {
    
    // Extract current emails are row & Trim strings & lowercase strings

    let currEmailA = (values[activeRow][colOfEmailA]).trim().toLowerCase(); 
    let currEmailB = (values[activeRow][colOfEmailB]).trim().toLowerCase();
    
    /* 
      Logger.log("Input email: '%s', CurrEmailA: '%s', CurrEmailB: '%s'", 
      inputEmail, currEmailA, currEmailB); 
    */

    //Logger.log("Bool: %s", (currEmailA == inputEmail).toString());
    
    if (inputEmail == currEmailA){
      receiverEmail = currEmailB;
      Logger.log("Receiver Email  is: '%s'", receiverEmail);
      return receiverEmail;
    }
    else if (inputEmail == currEmailB){
      receiverEmail = currEmailA;
      Logger.log("Receiver Email  is: '%s'", receiverEmail);
      return receiverEmail;
    }
    else{
      receiverEmail = "Not Found";
      //throw new Error('Input email '=%s' not found in database", emailA);
    }
  } 
  
  Logger.log("Input email '%s' not found, Attempt %s", inputEmail, activeRow);
  return receiverEmail.trim().toLowerCase();
}
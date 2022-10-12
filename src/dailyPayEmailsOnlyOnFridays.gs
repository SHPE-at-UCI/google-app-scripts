function getTodaysName(date = new Date(), locale = 'en-US') {
  return date.toLocaleDateString(locale, {weekday: 'long'});
}

function getDateString(date= new Date(), locale= 'en-US'){
  return date.toDateString(locale);
}

function getSpecificThreads(){
  var senders   = ' from:employee.support@dailypay.com';
  var subjects  = ' subject:"💰 Your DailyPay balance just went up!"';
  var labels    = ' label:"_archive"';
  var folders   = 'in:"archive"';
  var query     = labels+subjects+senders;
  console.log("using search str:'" + query+"'");

  var threads = GmailApp.search(query,0,10);  
  console.log(`Found ${threads.length} threads`);
  return threads;
}

function sendFridayEmail(threads) {
  const recipient = "josueal1@uci.edu";
  let subject = ``;
  var body = "^^";

  threads.forEach((t, index) => {
    console.log(index, t.getFirstMessageSubject());
    const todaysDate = getDateString();
    const threadsDate = t.getLastMessageDate().toDateString();

    if(threadsDate == todaysDate){
      const messages = t.getMessages()
      messages.forEach((m) => {
          let mBody = m.getPlainBody();
          let dailyBalanceMessage = mBody.substring(284, 312);
          console.log(`dailyBalanceMessage: ${dailyBalanceMessage}`);
          subject += dailyBalanceMessage;
      })
    }
    else {
      console.log(`threadId: ${t.getId()}, date is not today`);
    }

  })
  GmailApp.sendEmail(recipient, subject, body);
  console.log("GmailApp.sendEmail() ran successfully!");
}

function myFunction() {
  const dayToEmail = "Friday";
  today = getTodaysName();
  
  var threads = getSpecificThreads();

  if (today == dayToEmail){
    console.log(`Today IS ${dayToEmail}, so calling sendFridayEmail(threads)`);
    sendFridayEmail(threads);
  }
  else{
    console.log(`Today is not ${dayToEmail}, so must call cleanUpDailyPayEmails(threads)`);
    //TODO: cleanUpDailyPayEmails()
  }
}


function getDayName(date = new Date(), locale = 'en-US') {
  return date.toLocaleDateString(locale, {weekday: 'long'});
}

function getDateString(date= new Date(), locale= 'en-US'){
  return date.toDateString(locale);
}

function myFunction() {
  var senders   = ' from:employee.support@dailypay.com';
  var subjects  = ' subject:"💰 Your DailyPay balance just went up!"';
  var labels    = ' label:"_archive"';
  var folders   = ' in:"archive"';
  var query     = folders+senders+labels+subjects;

  var threads = GmailApp.search(query,0,10);  
  console.log(`Found ${threads.length} threads`);

  today = getDayName();
  const target = "Tuesday";

  if (today == target){
    console.log(`ITS ${target}!! :D `);

    const recipient = "josueal1@uci.edu";
    let subject = ``;
    var body = "^^";

    threads.forEach((t) => {
      console.log(t.getFirstMessageSubject(), t.getPermalink(), t.getLastMessageDate());

      const messages = t.getMessages()
      messages.forEach((m) => {
        let mBody = m.getPlainBody();
        
        let dailyBalanceMessage = mBody.substring(284, 312);
        console.log(`dailyBalanceMessage: ${dailyBalanceMessage}`);
        subject += dailyBalanceMessage;
      })

      
    })
    // GmailApp.sendEmail(recipient, subject, body);
  }
  else{
    console.log(`it is not ${target} :(`);
  }
}

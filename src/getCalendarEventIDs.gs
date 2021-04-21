function checkICalId() {
  var calendarId = 'youremail@uci.edu';
  var startTime = new Date('2021-03-01');
  var endTime = new Date('2021-03-03');
  var events = CalendarApp.getCalendarById(calendarId).getEvents(startTime, endTime);
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var eventTitle = event.getTitle();
    var eventICalId = event.getId();
    var eventTime = event.getStartTime();
    Logger.log('Title:  ' + eventTitle + '\n'+'Time:   '+ eventTime + '\n'+'iCalId: ' + eventICalId);
  }
}

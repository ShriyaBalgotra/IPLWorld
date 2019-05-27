'use strict';
var Alexa = require('alexa-sdk');
var Match=require('./match.js');
var handlers = {

'LaunchRequest': function(){
  this.response.speak("Welcome to I P L info portal , Here you can have information about matches. So for which date would you like to know the schedule. ").listen("for which date would you like to have information?? ");
  this.emit(':responseReady');

},
'IplMatchSchedules': function(){
 var userinfo = this.event.request.intent.slots.date.value;
  if(!userinfo){
      //this.response.speak("I am unable to get the date. Please say a valid date with clear utterance.").listen("Please say a date");
      this.emit("Unhandled");
  }else{
      if((userinfo >'2018-04-06' && userinfo<'2018-05-28') || (userinfo >'2019-04-06' && userinfo<'2019-05-28')){
     if(userinfo >'2019-04-06' && userinfo<'2019-05-28'){
         userinfo = userinfo.replace('2019','2018');
     }
     var match1 = Match[userinfo][0]['match'];
     var match2 = Match[userinfo][1]['match'];
     var time1 = Match[userinfo][0]['time'];
     var time2 = Match[userinfo][1]['time'];
     var stadium1 = Match[userinfo][0]['stadium'];
     var stadium2 = Match[userinfo][1]['stadium'];

     if(stadium1 && stadium2){
     this.response.speak("On " + userinfo + " at " + time1 + " There is a match: " + match1 + " at " + stadium1 + " and " + " at " + time2 + " There is a match: " + match2 + " at " + stadium2 + " !!!!!!!!!!!This is it for the day !!!!!!!!Would you like to have more info.").listen("Would you like to have more info. ");
     this.emit(":responseReady");
     }else if(stadium1 || stadium2){
        if(stadium1){
         this.response.speak("On " + userinfo + " at " + time1 + " There is a match: " + match1 + " at " + stadium1 + " !!!!!!!!!!No match is scheduled at 8 p m.  !!!!!!!!!!!This is it for the day !!!!!!!!Would you like to have more info.").listen("Would you like to have more info.");
         this.emit(':responseReady');
        }else{
         this.response.speak("On " + userinfo + " at " + time2 + " There is a match: " + match2 + " at " + stadium2 + " !!!!!!!!!!No match is scheduled at 4 p m.  !!!!!!!!!!!This is it for the day !!!!!!!!Would you like to have more info.").listen("Would you like to have more info. ");
         this.emit(':responseReady');
        }
     }else{
     this.response.speak("There is no match on this day. You can spend happy time with your family. Best is to Plan a trip. Would you like to have information for any other day. ").listen("Would you like to have information for any other day.");
     this.emit(':responseReady');
     }
    }
    else{
        this.response.speak("You Are out of I P L schedule. I P L matches are begining on 7 April and finals are  on 27 May. Would you like to try a date that is in schedule. ").listen("Would you like to try a date that is in schedule.");
        this.emit(':responseReady');
          }

  }
  },
'ConsentIntent': function(){
  var ans = this.event.request.intent.slots.ans.value;
  if(ans){
  if(ans === "yes"){
    this.response.speak("For which date would you like to have more info.").listen("For which date would you like to have more info.");
  }else{
    this.response.speak("Fine!!!!!! I think you are satisfied with the information.See you Soon");
  }
  this.emit(':responseReady');
}else{
 this.emit("Unhandled");   
}
      
  },
  
'Unhandled': function(){
    this.response.speak("I am unable to get what you said. If you want to know the schedule for any other date please say it with clear utterance, else say stop").listen();
    this.emit(":responseReady");
    
},
'AMAZON.HelpIntent': function(){
      this.response.speak("This I P L info skill  tells about matches scheduled  for a particular date. You can say !Alexa tell me about match on !and then !date !!or !!can directly give the date. To exit the skill you can say !stop. So Would you like to have info about i p l matches for any date?").listen("Would you like to have info about ipl matches for any date?");
      this.emit(":responseReady");
      
  },

 'AMAZON.StopIntent': function() {
      this.response.speak('see you soon.');
      this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
      this.response.speak('See you soon.');
      this.emit(':responseReady');
  }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

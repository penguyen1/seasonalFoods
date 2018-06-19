'use strict';
const Alexa = require('alexa-sdk'); // Alexa Skills Kit SDK for NodeJS


const handlers = {
  'LaunchRequest': function(){
    // triggered when user says "Alexa, open Seasonal Foods"
    this.emit(':ask', 'Welcome to Seasonal Foods')
  },
  'GetSeasonalFoodRequest': function(){
    // triggered when user says "Alexa, ask Seasonal Foods for a seasonal food"

    this.emit(':tell', 'Hello')
    // OR
    // this.response.speak('Hello')
    // this.emit(':responseReady')

    // this.emit(':ask', 'How may I help?', 'You can say something like...')
    // OR
    // this.response.speak('How may I help?').listen('You can say something like...')
    // this.emit(':responseReady')
  },
  'GetRandomFactRequest': function(){
    // triggered when user says "Alexa, ask Seasonal Foods for a fact"
  },
  'AMAZON.CancelIntent': function(){
    // triggered when user says "Cancel"
  },
  'AMAZON.HelpIntent': function(){
    // triggered when user says "Help"
  },
  'AMAZON.StopIntent': function(){
    // triggered when user says "Stop"
  }
};


exports.handler = function(event, context, callback){
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
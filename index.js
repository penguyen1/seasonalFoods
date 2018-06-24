// 'use strict';
const Alexa = require('alexa-sdk'); // Alexa Skills Kit SDK for NodeJS
const seasonalFoods = require('./data/seasonalFoodData.js');
const randomFacts = require('./data/randomFactData.js');

const handlers = {
  'LaunchRequest': function(){
    // triggered when user says "open seasonal food"
    let launchOutput = 'Hi, my skill is seasonal foods. What can I do for you?';
    let launchReprompt = 'You can say: give me a seasonal food in the summer, or suprise me with a food fact.';
    this.emit(':ask', launchOutput, launchReprompt)
  },
  'GetSeasonalFoodIntent': function(){
    // triggered when user says "give me a seasonal food in the [season]"
    let seasonSlot = resolveCanonical(this.event.request.intent.slots.season);
    let reprompt = 'Want me to repeat that?';
    this.emit(':ask', getSeasonalFood(seasonalFoods, seasonSlot), reprompt);
  },
  'GetRandomFactIntent': function(){
    // triggered when user says "give me a random food fact"
    let reprompt = 'Want me to repeat that?';
    this.emit(':ask', getFact(randomFacts), reprompt);
  },
  'AMAZON.CancelIntent': function(){
    // triggered when user says "Cancel"
    this.emit(':tell', 'Ok, it is canceled.');
  },
  'AMAZON.HelpIntent': function(){
    // triggered when user says "Help"
    let output = 'You can say: give me a seasonal food in the summer, or suprise me with a food fact. What can I do for you?';
    let reprompt = 'Sorry, I didn\'t hear that.';
    this.emit(':ask', output, reprompt);
  },
  'AMAZON.StopIntent': function(){
    // triggered when user says "Stop"
    this.emit(':tell', 'Goodbye, beautiful.');
  },
  'SessionEndedRequest': function(){
    // triggered to end session
    this.emit(':tell', 'Session has ended.');
  },
  'Unhandled': function(){
    let output = 'Sorry, that made no sense. Please try and ask again.';
    this.emit(':ask', output, output);
  }
};

exports.handler = function(event, context){
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// Helper Functions

// checks entity resolution part of request, returns slot value if synonyms exist
function resolveCanonical(slot){
  let canonical;
  try{
    canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
  } 
  catch(err){
    console.log(err.message);
    canonical = slot.value;
  };
  return canonical;
}

function getSeasonalFood(data, val){
  for(let i=0; i<data.length; i++){
    if(data[i]['season'] == val){
      return getFact(data[i].foods);
    }
  }
}

// TODO: avoid giving duplicate facts
function getFact(array){
  let i = 0;
  i = Math.floor(Math.random() * array.length);
  return array[i];
}
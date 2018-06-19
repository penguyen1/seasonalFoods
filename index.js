// Commands for testing:
  // Open seasonal food
  // give me a seasonal food in the summer
  // tell me what's in season for fall
  // what's in season during the summer

// 'use strict';
const Alexa = require('alexa-sdk'); // Alexa Skills Kit SDK for NodeJS

const launchOutput = 'Welcome to Seasonal Foods. What can I do for you?';
const launchReprompt = 'You can say: give me a seasonal food in the season you want, or give me an interesting food fact.';
var output = '';
var reprompt = '';

const seasonalFoodData = [
    {
        season: "SPRING",
        fact: "my name is spring",
        foods: [
          "blah blah blah Spring fact",
          "one, two, three, spring.",
          "ready, set, and... spring.",
        ]
    },
    {
        season: "SUMMER",
        fact: "my name is summer",
        foods: [
          "Strawberries are at their sweetest between April through June. A ripe strawberry will be fragrant and red through and through.",
          "Cucumbers are best between June and September. A ripe cucumber should be bright medium to dark green and firm.",
          "Tomatoes ripen at different times based on its variety. Nonetheless, they should all be firm, but have a little bit of give when you squeeze it.",
          "Bell pepper peak season runs from July through September. Their skins should be glossy, taut and unwrinkled, and their stems fresh and green.",
          "Cherry season begins in early May and ends in late August. Mature cherries are firm and juicy, but tender enough to bite into easily.",
          "Peaches are harvested from late June through August. A golden yellow color and medium-soft flesh when gently squeezed is a great indicator for ripeness.",
        ]
    },
    {
        season: "FALL",
        fact: "my name is fall",
        foods: [
          "blah blah blah Fall fact",
          "one, two, three, fall.",
          "ready, set, and... fall.",
        ]
    },
    {
        season: "WINTER",
        fact: "my name is winter",
        foods: [
          "blah blah blah winter fact",
          "one, two, three, winter.",
          "ready, set, and... winter.",
        ]
    }
];

const handlers = {
  'LaunchRequest': function(){
    // triggered when user says "Alexa, open Seasonal Foods"
    this.emit(':ask', launchOutput, launchReprompt)
  },
  'GetSeasonalFoodIntent': function(){
    // triggered when user says "Alexa, ask Seasonal Foods for a seasonal food in the [season]"
    var seasonSlot = resolveCanonical(this.event.request.intent.slots.season);
    console.log('Fetching seasonal food fact for season: ', seasonSlot);

    let output = 'Ok, getting seasonal food fact for the season: ' + seasonSlot;    
    this.emit(':tell', getSeasonalFood(seasonalFoodData, 'season', seasonSlot.toUpperCase()));
    // this.emit(':tell', getSeasonalFood(seasonalFoodData, seasonSlot.toUpperCase()).fact);
  },
  'GetRandomFactIntent': function(){
    // triggered when user says "Alexa, ask Seasonal Foods for a fact"
    this.emit(':tell', 'Ok, here is a random seasonal food fact.')
  },
  'AMAZON.CancelIntent': function(){
    // triggered when user says "Cancel"
    output = 'Ok, it is canceled.';
    this.emit(':tell', output);
  },
  'AMAZON.HelpIntent': function(){
    // triggered when user says "Help"
    output = 'You can say: give me a seasonal food in the season you want, or give me an interesting food fact. What can I do for you?';
    reprompt = 'Sorry, I didn\'t hear that.';
    this.emit(':ask', output, reprompt);
  },
  'AMAZON.StopIntent': function(){
    // triggered when user says "Stop"
    output = 'Bye, bye, butterfly!';
    this.emit(':tell', output);
  },
  'SessionEndedRequest': function(){
    // triggered to end session
    output = 'Session has been ended.';
    this.emit(':tell', output);
  },
  'Unhandled': function(){
    output = 'Sorry, that made no sense. Please try and ask again.';
    this.emit(':ask', output, output);
  }
};

exports.handler = function(event, context){
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// Helper Functions
function resolveCanonical(slot){
  //this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
  let canonical;
    try{
    canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
  }catch(err){
      console.log(err.message);
      canonical = slot.value;
  };
  return canonical;
};

function getSeasonalFood(data, propValue) {
  for (var i=0; i < data.length; i++) {
    if (data[i]['season'] == propValue) {
      // return getFact(data[i]['foods']);
      return data[i];
    }
  }
}

function getFact(array) {
    // the argument is an array [] of words or phrases
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
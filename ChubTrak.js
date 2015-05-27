console.log("Everyone says, 'Greetings'");

if(Meteor.isClient){ 
  console.log("The Client says, 'Hello'");
  
  
  //These are the helpers for the 'weighin' template.
  Template.weighin.helpers({
    
    'dailyLog': function(){
      return WeighIn.find({}, {sort:{date: -1}, limit:5});
    },
    
    
    'selectedClass': function(){
      var dataRowId = this._id;
      var selectedDataRow = Session.get('selectedDataRow');
      console.log(selectedDataRow);
      if(dataRowId == selectedDataRow){
      return "selected"
      }
      
    },
    
    
    'showTotalWeightChange': function(){
      
      //var getWeights = WeighIn.find({}, {fields: {'weight':1}}).fetch();
      
      var allWeights = [];
      var allWeights = WeighIn.find({}, {fields: {'weight':1}}).fetch();
      console.log(allWeights);
      var count = allWeights.length - 1;
      console.log(count);
      var totalLost = (allWeights[0].weight) - (allWeights[count].weight);
      a = totalLost.toFixed(2);
      console.log(totalLost);
      return a;
      
 
    }
    
  });
  
  
  
  //    EVENTS       /////////////////////////////////
  
  Template.weighin.events({
    
    'click .logdata': function(){
      var dataId = this._id;
      Session.set('selectedDataRow', dataId);
    },
    
    'click .remove': function(){
      var selectedRow = Session.get('selectedDataRow');
      WeighIn.remove(selectedRow);
    }
    
    
  });
  
  Template.addWeighInForm.events({
    
    'submit form': function(event){
      event.preventDefault();
      console.log("form submitted");
      console.log(event.type);
      
      
      var d = new Date();
      var theDay = d.getDate();
      var theMonth = d.getMonth();
      var theYear = d.getFullYear();
      var dateString = theMonth + "/" + theDay + "/" + theYear;
      console.log(dateString);
      
      var todaysWeightVar = event.target.todaysWeight.value;
      var todaysBodyFatVar = event.target.todaysBodyFat.value;
      console.log(todaysWeightVar);
      console.log(todaysBodyFatVar);
      console.log(dateString);
      
      WeighIn.insert({
        date: dateString,
        weight: todaysWeightVar,
        bodyfat: todaysBodyFatVar
      },this.dailyLog);
    }
    
  });



}


//Set up the MongoDB Collection

WeighIn = new Mongo.Collection('weighin');


if(Meteor.isServer){
  console.log('The server says, "Hiya!"');
}
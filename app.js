
//mongooose Tutorial.................................

const mongoose = require('mongoose');

//connect the mongoose to the database or database name......................

mongoose.connect("mongodb://localhost:27017/fruitsDb", {useNewUrlParser:true});
//.............................................................


//Addign Schema to out database..or what kind of data we are going to store........................

const fruitSchema = new mongoose.Schema({
  name : {
    type: String,
    required: [1 , "No name found please fill name field"]
  },
  rating:{
    type: Number,
    min: 1,
    max: 10
  },
  review:String
})
//................................................................................

//Addign model to the database or collection name........................
const Fruit = new mongoose.model("Fruit" , fruitSchema);
//......................................................................

//Addign data in database through mongoose.........................

const fruit = new Fruit({
  name:"Apple",
  rating:10,
  review:"The fruit is solid"
})

 fruit.save();

//....................................................................


 //Updating the document through mongoose...................

 Fruit.updateOne({_id : "6357b29ec4b414d61e638ca2"} , {name: "Pear"} , function(err){
   if(err) {
     console.log(err);

   } else {
     console.log("Successfully updated the doucment......");
   }
 })


//.......................................................................




//Deleting the items from the collectiion using mongoose..................
Fruit.deleteOne({_id : "6357b216195d43632641a8fd"} , function(err){
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully deleted item from collections");
  }
})

//............................................................................




//Establishing relation to another collecton..................................

const personSchema = new mongoose.Schema({
  name : String,
  age : Number,
  favouriteFruit: fruitSchema
});

const pineapple = new Fruit({
  name: "Pineapple" ,
  rating: 9,
  review:"It is good fruit"
})
pineapple.save();


const Person  = new mongoose.model("Person" , personSchema);

const person  =  new Person({
  name : "jiya" ,
  age : 12,
  favouriteFruit:pineapple
});

const person = new Person({
  name :"Hello" ,
  age: 45
})

const graps = new Fruit({
  name: "Graps" ,
  rating: 8,
  review: "The graps are sour!!!"
})
graps.save();


Person.updateOne({age:45} , {favouriteFruit: graps} , function(err){
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully updated favouriteFruit to Hello");
  }
})


person.save();

//......................................................................




//Deleting multiple items at once...........................
Person.deleteMany({age:37} , function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully deleted all John Doe");
  }
})


//.......................................................................



// Addign multiple fruits at once.............................


const kiwi = new Fruit({
  name: "Kiwi" ,
  rating: 10 ,
  review: "Sweet and healthy."
});

const banana = new Fruit({
  name : " Banana",
  rating: 8,
  review: "Releife the stress and make engergetic."
})

const orange =  new Fruit({
  name: "Orange",
  rating:5 ,
  review: "Quite sour and so high hahhahh ."
})

Fruit.insertMany([kiwi , banana , orange] , function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully added data in database !");
  }

})

//............................................................................




//Iterate the vlaue from our database.....or reading the whole database.................
Fruit.find(function(err , values){
  if(err){
    console.log(err);
  } else {
    mongoose.connection.close();

    values.forEach(function(item){
      console.log(item.name);
    })
  }
})

//...................................................................

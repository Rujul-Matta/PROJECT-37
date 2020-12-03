var dog,dogImg,dogImg1;
var database;
var foodS = 20;
var foodStock 
var lastfed;
var  milk;

var feedFood, addFood;
var fedTime, lastfed;
var foodOBJ;


var change, read;
var bedIMG, gardenIMG, washroomIMG;
var bg, num;
function preload(){
   dogImg=loadImage("images/dogImg.png");
   dogImg1=loadImage("images/dogImg1.png");
   back = loadImage('back.jpg')

   bedIMG = loadImage('images/Bed Room.png')
   gardenIMG = loadImage('images/Garden.png')
   washroomIMG = loadImage('images/Wash Room.png')
   livingIMG = loadImage('images/Living Room.png')
  }


function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  num  = Math.round(random(0,1))
  bg = back
  dog=createSprite(850,250);
  dog.addImage(dogImg);
  dog.scale=0.25;

  foodOBJ = new DogFood();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  

  read = database.ref('GameState');
  read.on("value", function(data){
    read = data.val();
  })
}

function draw() {
  background(bg);
  Pro();
  

  foodOBJ.getFoodStock();
  foodOBJ.updateFoodStock(foodS);
  foodOBJ.deductFood();
  foodOBJ.getFoodStock();
  
  drawSprites();
  
}
function Pro(){
  currentTime = hour();
  

  if (currentTime == (lastfed + 1) ) {
    if(num == 1){foodOBJ.garden();}
    else if(num == 0){foodOBJ.living();}
    updatePRO("playing");
  }
  else if(currentTime == (lastfed + 2)){
    foodOBJ.bedroom();
    updatePRO("sleeping")
  }
  else if (currentTime>(lastfed+2) && currentTime <= (lastfed + 4)){
    foodOBJ.washroom();
    updatePRO("bathing")
  }

  else{
    bg = back;
    updatePRO("hungry")
    foodOBJ.display();
    foodOBJ.button();
    write();
  }

}

function updatePRO(x){
  database.ref('/').update({
    GameState: x
  })
}
function write() {
  
  fill('blue');
  textSize(35);
  text("Food remaining : "+ foodS,650,50);

  fill(0);
  // text(mouseX + "," + mouseY, width/2, height/2)
  if(lastfed == 12 || lastfed == 0){
    text("Last Feed: 12 AM", 100,50);
  }
  else if(lastfed >= 12){
    text("Last Feed: "+ lastfed % 12  + " PM", 100,50);
  }
  else{
    text("Last Feed: "+ lastfed + " AM", 100,50);
  }
}

function readStock(data){
  foodS=data.val();
  foodOBJ.updateFoodStock(foodS);
}
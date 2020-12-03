class DogFood{
    constructor(){
        this.image = loadImage('images/Food Stock.png');
        this.foodStock = 0;
        this.feedFood = createButton('Feed Food')
        this.feedFood.position(500,475)
    
        this.addFood = createButton('Add Food')
        this.addFood.position(750,475)
        database = firebase.database();
    }

    getFoodStock(database){function feed() {lastfed = database.ref('lastfed');}}
    updateFoodStock(foodStock){this.foodStock = foodStock;}
    deductFood(){if(this.foodStock > 0){this.foodStock -= 1;}}
    getFoodStock(){return this.foodStock;}
    
    button(){

    
        
        this.addFood.mousePressed(function(){
            foodS++;
            foodStock++;
            database.ref('/').update({Food: foodS});
            dog.addImage(dogImg);
        })
    
        this.feedFood.mousePressed(function(){
            foodS--;
            foodStock--;
            if(foodS <= 0){
                foodS = 0;
                }
    
            dog.addImage(dogImg1);
            database.ref('/').update({Food: foodS})
            database.ref('/').update({lastfed: hour()})
             })
    }  
    
    display(){
        dog.visible = true;
        this.feedFood.show();
        this.addFood.show();
        var x = 50, y = 150;
        
        imageMode(CENTER);
        if(this.foodStock !== 0){
            for(var i = 0; i <= this.foodStock; i++){
                if(i % 10 === 0){
                   x = 75;
                   y += 50;
                }
                image(this.image, x, y, 100, 100);
                x += 25;
            }
        }
        lastfed = database.ref('lastfed');
        lastfed.on("value", function(data){lastfed = data.val();})


        
    }
   
    bedroom(){
        bg = bedIMG;
        dog.visible = false;

        this.feedFood.hide();
        this.addFood.hide();

        fill(0)
        textSize(35);
        text("!! Dog is Sleeping !!", width/2 - 200, 50)
    }
    garden(){
        bg = gardenIMG;
        dog.visible = false;
        
        this.feedFood.hide();
        this.addFood.hide();
    
        fill(0)
        textSize(35);
        text("!! Let's Play !!", width/2 - 200, 50)
    }
    washroom(){
        bg = washroomIMG;
        dog.visible = false;

        this.feedFood.hide();
        this.addFood.hide();

        fill(0)
        textSize(35);
        text("!! Bath time !!", width/2 - 200, 50)
    }
    living()
{
    bg = livingIMG;
    dog.visible = false;

    this.feedFood.hide();
    this.addFood.hide();

    fill(0);
    textSize(35);
    text("!! Dog is Happy !!", width/2 - 200, 50)
}
}
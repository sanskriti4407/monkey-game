
var monkey , monkey_running,monkeyImage
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground,iground
survivaltime=0;
hunger=1000;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 


  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
 
  ground=createSprite(0,290,1000,50);
  ground.velocityX=-4;
  
  iground=createSprite(0,295,400,5);
  iground.visible=false;
  
  monkey=createSprite(50,280,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.11111;
  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  
 // monkey.debug = true
  
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
background("lightgreen");
text("SURVIVAL TIME : "+ survivaltime, 420,50);
 text("HUNGER : "+ hunger,320,50);
  if(gameState===PLAY){
   if (keyDown("space")&& monkey.y>200) {
  monkey.velocityY = -17;
  } 
    monkey.velocityY = monkey.velocityY + 0.8
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    hunger=hunger-1;
  }
    if(hunger===0){
      
      gameState=END;
      
    }
  }
  monkey.collide(iground);
  

  
  survivaltime = survivaltime + Math.round(getFrameRate()/60);
  
 monkey.collide(iground);
      
 if(gameState===END){
   ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   survivaltime=0;
   text("TO PLAY PRESS 'R'",250,150);
   if(keyDown("r")){
     gameState=PLAY;
     obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
     hunger=1000;
   }
 }
  
  if (ground.x < 160) {
      ground.x = ground.width / 2;
    }
  food();
  stone();
  
  drawSprites();
}
function food(){
  if(frameCount%110===0){
   banana=createSprite(600,10,10,10);
    banana.y=Math.round(random(150,280));
    banana.addImage(bananaImage);
    banana.velocityX=-5;
    banana.lifetime=200;
    banana.scale=0.111;
    
    FoodGroup.add(banana);
  }
}
function stone(){
  if(frameCount%300===0){
    obstacle=createSprite(600,255,10,10);
   obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5;
    obstacle.lifetime=200;
    obstacle.scale=0.2;
    
    obstacleGroup.add(obstacle);
  }
}





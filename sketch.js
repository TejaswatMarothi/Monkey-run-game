var PLAY;
var END;
var gameState = PLAY;
var monkey , monkey_running, monkeyAudio;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background, backgroundimg;
var restart,restartimg;
var gameover,gameoverimg;

var survivaltime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundimg2 = loadImage("backgroundimg.jpg");
  restartimg = loadImage("restart.png");
  gameoverimg = loadImage("gameover.png");
  monkeyAudio = loadSound("monkey jump sound added-[AudioTrimmer.com].mp3");
 
}



function setup() {
  createCanvas(600, 300);
  
  backgroundimg = createSprite(450,100,0,0);
  backgroundimg.addImage(backgroundimg2);
  backgroundimg.velocityX=-3;
  backgroundimg.scale=1.6;
  
  monkey = createSprite(70,250,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.11;
  
  monkey.setCollider("circle",0,0,monkey.radius=290);
  monkey.debug = false;
  
  ground = createSprite(200,270,1100,10);
  ground.shapeColor = "green";
  ground.visible = false;
  

  restart = createSprite(300,200,20,20);
  restart.addImage(restartimg);
  restart.scale=0.3;
  restart.visible = false;
  
  gameover = createSprite(300,120,20,20);
  gameover.addImage(gameoverimg);
  gameover.scale=1.5;
  gameover.visible = false;
 
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
  background("white");
  
  monkey.collide(ground);
  
  if(gameState===PLAY){
  if(backgroundimg.x<130){
    backgroundimg.x=backgroundimg.width/2

  }
    
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
  }
    
    console.log(monkey.y) 
    if(keyDown("space") && monkey.y>=231){
      monkey.velocityY = -19;
      monkeyAudio.play; 
    }
    
    monkey.velocityY = monkey.velocityY + 1;
    
    backgroundimg.velocityX = -(4 + 3* score/5);
    
    if(obstacleGroup.isTouching(monkey)){
      backgroundimg.velocityX = 0;
      monkey.velocityY  = 0;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.depth = banana.depth+1;
    obstacle.setlifetimeEach = (-1);
    FoodGroup.setLifetimeEach(-1);
    survivalTime = 0;
    gameover.visible = true;  
    restart.visible = true;
  }
    
  spawnObstacles();
  spawnFood();
    
  }
  
  if(gameState === END) {

    if(mousePressedOver(restart)){
      reset();
    }
  
  }
  
  spawnFood();
  spawnObstacles();
    
    
  drawSprites();
  
  stroke("red");
  textSize(20);
  fill("red");
  text("Score: "+ score, 100,50);
}

 function spawnObstacles(){
    if(frameCount % 300 === 0){
      obstacle = createSprite(700,250,10,10);
      obstacle.velocityX = -(7 + score/2);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.15;
      
      
      obstacleGroup.add(obstacle);

    }
    
  }
 
  function spawnFood(){
    if(frameCount % 100 === 0){
      banana = createSprite(650,200,40,10);
      banana.velocityX = -6;
      banana.y = random(50,200);
      banana.addImage(bananaImage);
      banana.scale = 0.06;
      
      FoodGroup.add(banana);
    }
  }
 function reset(){
   gameState = PLAY;
   restart.visible = false;
   gameover.visible = false;
   obstacleGroup.destroyEach();
   FoodGroup.destroyEach();
   score =0;
   survivalTime = 0;

   
 }







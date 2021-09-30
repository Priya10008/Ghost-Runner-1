var tower , towerImg;
var door,doorImg,doorGroup;
var climber , climberImg,climberGroup;
var ghost, ghostImg;
var invisibleBlock,invisibleGroup;
var gameState = "play"; 
var ghostSound;

function preload(){

 //loading images
  towerImg = loadImage("tower.png");
 doorImg = loadImage("door.png");
 climberImg = loadImage("climber.png");
 ghostImg = loadImage("ghost-standing.png");
  
 //loading sound 
 ghostSound = loadSound("spooky.wav"); 
  
 //making groups 
 climberGroup = new Group();
 doorGroup = new Group();
 invisibleGroup = new Group();
}


function setup(){
createCanvas(600,600);
  
tower = createSprite(300,300) ; 
tower.addImage(towerImg);
tower.velocityY = 1;
  
 ghost = createSprite(200,200,50,50) 
 ghost.addImage(ghostImg);
 ghost.scale = 0.4;
  
  
}

function draw(){
  
  background(0);
  
if(gameState == "play"){
 
 ghostSound.loop(); 
  
 if(tower.y>400){
   tower.y = 300;
 }
  
if(keyDown("left_arrow")){
ghost.x = ghost.x - 3 
}
if(keyDown("right_arrow")){
ghost.x = ghost.x + 3 
}
if(keyDown("space")){
ghost.velocityY = -5; 
}
ghost.velocityY = ghost.velocityY+ 0.5; 
  
if(climberGroup.isTouching(ghost)){
  ghost.velocityY = 0;
}

if(invisibleGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy();
  gameState = "end";
  
}  
  
spawndoor();
  drawSprites()
  
}
if (gameState == "end"){
 background("brown");
 stroke("cyan");
 fill("yellow"); 
 textSize(30);
 text("Game Over",250,250)
}
}

function spawndoor(){
  if(frameCount%240 == 0 ){
  var door = createSprite(200,-50);
  var climber = createSprite(200,10);
  var invisibleBlock = createSprite(200,15); 
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
    
    
  door.addImage(doorImg);
  climber.addImage(climberImg);
    
  door.x = Math.round(random(120,400))
  climber.x = door.x
    
  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleBlock.velocityY = 1;  
    
  invisibleBlock.x = climber.x; 
    
  door.lifeTime = 600;
  climber.lifeTime = 600;
    
  doorGroup.add(door);  
  climberGroup.add(climber);
  invisibleGroup.add(invisibleBlock);  
    
  door.depth = ghost.depth; 
  ghost.depth = ghost.depth +1;  
  invisibleBlock.debug = false;
  invisibleBlock.visible = false;
  }
}


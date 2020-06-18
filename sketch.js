
const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies

var engine,world,player;
var bg;
var boy;
var boy_img;
var ground;
var virus,virus_img;

var obstacles,obstacles_img;

var message1,message1_img;

var life = 10;

//to load the images
function preload(){
  bg = loadImage("images/bggarden01.jpg");
  boy_img = loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png","images/boy5.png","images/boy6.png","images/boy7.png","images/boy8.png","images/boy9.png","images/boy10.png");
  virus_img = loadImage("images/virus.png");
  obstacles_img = loadAnimation("images/rw1.png","images/rw2.png","images/rw3.png","images/rw4.png","images/rw5.png","images/rw6.png","images/rw7.png","images/rw8.png","images/rw9.png");
  message1_img = loadImage("images/SocialDistancingred.png");
}

function setup() {
  createCanvas(1200,400);

  engine = Engine.create()
  world = engine.world;
  player = createSprite(100,300,50,50);
  player.addAnimation("player",boy_img)
  player.scale=0.4;
  player.debug = true;
  player.setCollider("circle",0,0,20,20)

  ground = createSprite(600,390,1200,20);
  ground.visible = false;

  virus = createSprite(30,300,30,30);
  virus.addImage("virus",virus_img);
  deltaX = 0;
  deltaY = 0;

  obstacles = createSprite(1200,300,40,40);
  obstacles.addAnimation("man1",obstacles_img);
  obstacles.scale = 0.9;
  obstacles.velocityX = -4;
  obstacles.debug = true;

  message1  = createSprite(1000,100,20,20);
  message1.addImage("m1",message1_img);
  message1.scale = 0.4;
  message1.visible = false;
}

function draw() {
  background(bg); 
  Engine.update(engine) 

  if(keyDown("space")){
    player.velocityY=-8;
}
  player.velocityY=player.velocityY+1;
  player.collide(ground);

  if(keyDown(RIGHT_ARROW)){
    player.velocityX=6;
  }
  else{
    player.velocityX=0;
  }
  
  if(keyCode === 32 && player.y>320){
    player.velocityY = -3;
    message1.visible=true;
  }
  player.velocityY = player.velocityY+0.5;

   if(obstacles.x<0){
     obstacles.x = 1200;
   }

//collision detection betweeen boy and obstacles
if(player.x-obstacles.x === player.width/2+obstacles.width/2){
  console.log("working")
 life = life-1;
  player.visible=false;
}

text ("LIFE"+life,50,100);





  drawSprites();
}


function follow(follower,followed,velocity){
   deltaX = followed.x-follower.x;
   deltaY = followed.y-follower.y;
var followerAngle = Math.atan(deltaY/deltaX);
 if(deltaX<0){
  followerAngle = followerAngle+Math.PI
 }
 follower.velocityX = velocity*cos(followerAngle)
 follower.velocityX = velocity*sin(followerAngle)
}

//function spawnObstacles(){
  //if(World.frameCount % 50 === 0){

  
  //}

//}




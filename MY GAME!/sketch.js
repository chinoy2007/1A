const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var shipGroup , bomb,air_bombGroup;
//var bombGroup=[];

function preload(){
air_bombImg = loadImage("air_bomb.png");
bombImg = loadImage("bomb.png");
explosionimg= loadImage("explosion_1.png");
oceanimg= loadImage("ocean.jpg");
planeimg=loadImage("plane.png");
ship1img = loadImage("ship1.png");
ship2img= loadImage("ship2.png");
ship3img = loadImage("ship3.png");

bg_music= loadSound("background_music.mp3");
}

var PLAY= 1;
var END= 0;
var gameState= PLAY;




function setup(){
createCanvas(1200,800);
frameRate(80);
engine = Engine.create();
world = engine.world;


ocean= createSprite(0,200,1200,800);
ocean.addImage(oceanimg);
ocean.scale=2.4;
ocean.velocityX=-1.5;

plane = createSprite(400,100);
 plane.addImage(planeimg);
 plane.scale=0.4;
//  bomb.x=plane.x;
//  bomb.y=plane.y;

 bomb= createSprite(plane.x,plane.y,20,20);
    bomb.addImage(bombImg);
    bomb.scale=0.1;
    // bomb.density
    // bomb= wholeScree

//  ship1= createSprite(1500,600,100,20);
//  ship1.addImage(ship1img);
//  ship1.scale=0.5;
//  ship1.velocityX=-3;
  
//  ship2= createSprite(1500,500,100,20);
//  ship2.addImage(ship2img);
//  ship2.scale=0.5;
//  ship2.velocityX=-3;
  
//  ship3img= createSprite(1500,700,100,20);
//  ship3.addImage(ship3img);
//  ship3.scale=1;
//  ship3.velocityX=-3;
  




shipGroup=createGroup();
air_bombGroup= createGroup();




//bomb= new Bomb(plane.position.x,plane.position.y,20,50)





}

function draw(){
    background("white");
    Engine.update(engine);
    
    if(ocean.x<20){
        ocean.x=1000;
    }
    
    console.log(gameState);
   
    if(gameState===PLAY){

        if(keyDown("A")){
            bomb.velocityY= 13;
        }

    bomb.x=plane.x;
    bomb.y=plane.y;


        planeMovement();
        airobstacles();
        obstacles();

        

   
    

    if(plane.y<50){
        plane.y=50;
    }

   
        // bg_music.play();
        // bg_music.setVolume(0.01);
      



    //bomb.show();

    
    


    }

   
    if(plane.isTouching(air_bombGroup) || plane.isTouching(shipGroup)){
        gameState=END;
    }


if(gameState===END){
 gameOver();
}
    
        //gamePlay();
    drawSprites();

}

function obstacles(){
    if(frameCount% 300===0){
       ship= createSprite(1500,600,100,20);
        ship.addImage(ship1img);
         ship.scale=0.7;
         ship.velocityX=-3;

         var rand= Math.round(random(1,3))

         switch (rand){
            case 1:ship.addImage(ship1img);
                    break;
            case 2:ship.addImage(ship2img);
                    break;
            case 3:ship.addImage(ship3img);
            
                    break;
         }
         shipGroup.add(ship);
         
         
    }
   }

   function airobstacles(){
    if(frameCount% 150===0){
        air_bomb= createSprite(1500,100,20,20);
        air_bomb.addImage(air_bombImg);
        air_bomb.velocityX=-5;
        air_bomb.scale=0.2;

        var rand1= Math.round(random(1,3))

            switch (rand1){
                case 1: air_bomb.y=150;
                      break;
                case 2: air_bomb.y=200;
                      break;
                case 3: air_bomb.y=140;
                      break;
                case 4: air_bomb.y=50;
                      break;
            
        }
       air_bomb.setCollider('circle',0,0,200);
       air_bomb.debug=true;

        air_bombGroup.add(air_bomb);
    }
   }

   function planeMovement(){
    if(keyDown("UP_ARROW")){
        plane.y= plane.y-5;
       
    }
    
     if(keyDown("DOWN_ARROW")){
         plane.y= plane.y+5;
         
    }

    if(keyDown("RIGHT_ARROW")){
        plane.x= plane.x+5;
        
   }

   if(keyDown("LEFT_ARROW")){
    plane.x= plane.x-5;
    
}
   }
  
//    function gamePlay(){
//     obstacles();
//     airobstacles();
//     planeMovement();
//     gameOver();

   

   // bg_music.play();
   // bg_music.setVolume(2);
   
   function gameOver(){
       //if(plane.isTouching(air_bombGroup) || plane.isTouching(shipGroup)){
            shipGroup.setVelocityXEach(0);
            air_bombGroup.setVelocityXEach(0);

        // shipGroup.destroyEach();
        // air_bombGroup.destroyEach();
           ocean.velocityX=0;
           //planeMovement() =false;
           
       }
    //}

   //obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
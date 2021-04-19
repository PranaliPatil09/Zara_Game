var gameState="Level1";
var score=0

function preload (){
backgroundImage = loadImage("bg.png");
playerImage = loadAnimation("images/frame_00_delay-0.05s.png","images/frame_01_delay-0.05s.png","images/frame_02_delay-0.05s.png","images/frame_03_delay-0.05s.png","images/frame_04_delay-0.05s.png"
,"images/frame_05_delay-0.05s.png","images/frame_06_delay-0.05s.png","images/frame_07_delay-0.05s.png","images/frame_08_delay-0.05s.png","images/frame_09_delay-0.05s.png",
"images/frame_10_delay-0.05s.png","images/frame_11_delay-0.05s.png","images/frame_12_delay-0.05s.png","images/frame_13_delay-0.05s.png","images/frame_14_delay-0.05s.png",
"images/frame_15_delay-0.05s.png","images/frame_16_delay-0.05s.png","images/frame_17_delay-0.05s.png","images/frame_18_delay-0.05s.png","images/frame_19_delay-0.05s.png",
"images/frame_20_delay-0.05s.png","images/frame_21_delay-0.05s.png","images/frame_22_delay-0.05s.png","images/frame_23_delay-0.05s.png","images/frame_24_delay-0.05s.png",
"images/frame_25_delay-0.05s.png","images/frame_26_delay-0.05s.png","images/frame_27_delay-0.05s.png","images/frame_28_delay-0.05s.png","images/frame_29_delay-0.05s.png",
"images/frame_30_delay-0.05s.png","images/frame_31_delay-0.05s.png","images/frame_32_delay-0.05s.png","images/frame_33_delay-0.05s.png","images/frame_34_delay-0.05s.png",
"images/frame_35_delay-0.05s.png","images/frame_36_delay-0.05s.png","images/frame_37_delay-0.05s.png","images/frame_38_delay-0.05s.png","images/frame_39_delay-0.05s.png",
"images/frame_40_delay-0.05s.png","images/frame_41_delay-0.05s.png","images/frame_42_delay-0.05s.png","images/frame_43_delay-0.05s.png","images/frame_44_delay-0.05s.png",
"images/frame_45_delay-0.05s.png","images/frame_46_delay-0.05s.png","images/frame_47_delay-0.05s.png");

Virusimage=loadImage("Virus.png");
Sweet1_Image=loadImage("candy.gif");
Sweet2_Image=loadImage("choc.png");
Sweet3_Image=loadImage("Donut.png")

}

function setup() {
  createCanvas(1500, 700);
  ground = createSprite(750,630,1500,20)
  ground.visible=false;

  player = createSprite(50,600,10,50)
  player.addAnimation("running",playerImage)
  player.scale = 0.4
  //player.debug=true;
  player.setCollider("circle",0,0,100)

  wall1=createSprite(300,300,300,30)
  wall1.shapeColor='#D0B774'
  wall4=createSprite(155,260,5,50)
  //wall4.shapeColor='#D0B774'
  wall4.visible=false;
  wall5=createSprite(445,260,5,50)
  //wall5.shapeColor='#D0B774'
  wall5.visible=false;

  Virus1=createSprite(300,260,1,1)
  Virus1.addImage(Virusimage);
  Virus1.velocityX=-4
  Virus1.scale=0.1
  //Virus1.debug=true
  Virus1.setCollider("rectangle",0,0,100,100)


  wall2=createSprite(700,300,300,30)
  wall2.shapeColor='#D0B774'
  wall2.velocityY=-4;



  wall3=createSprite(1200,300,300,30)
  wall3.shapeColor='#D0B774'
  wall6=createSprite(1055,260,5,50)
  //wall7.shapeColor='#D0B774'
  wall6.visible=false;
  wall7=createSprite(1345,260,5,50)
  wall7.shapeColor='#D0B774'
  wall7.visible=false;

  Virus2=createSprite(1200,260,1,1)
  Virus2.addImage(Virusimage);
  Virus2.velocityX=-4
  Virus2.scale=0.1
  //Virus2.debug=true
  Virus2.setCollider("rectangle",0,0,100,100)
  
  edges=createEdgeSprites()

  for(var i=180;i<500;i=i+80){
    Sweet1=createSprite(i,350,1,1)
    Sweet1.addImage(Sweet3_Image)
    Sweet1.scale=0.4
  }

  for(var i=300;i<1300;i=i+100){
    Sweet2=createSprite(i,100,1,1)
    Sweet2.addImage(Sweet1_Image)
    Sweet2.scale=0.2
  }

  for(var i=1100;i<1400;i=i+80){
    Sweet3=createSprite(i,350,1,1)
    Sweet3.addImage(Sweet2_Image)
    Sweet3.scale=0.4
  }


  Sweet1_G=new Group()
  Sweet1_G.add(Sweet1)
  VirusG= new Group();
}

function draw() {
  background(backgroundImage);
  fill ('black');

text(mouseX+","+mouseY,mouseX,mouseY);

if (keyDown('SPACE')){
player.velocityY = -8
}

player.velocityY = player.velocityY+0.5

if (keyDown(LEFT_ARROW)){
player.x = player.x-5

}

if (keyDown(RIGHT_ARROW)){
player.x = player.x+5

}

player.collide(ground);
player.collide(wall1);
player.collide(wall2);
player.collide(wall3);
Virus1.bounceOff(wall4);
Virus1.bounceOff(wall5);
Virus2.bounceOff(wall6);
Virus2.bounceOff(wall7);


wall2.bounceOff(edges[2]);
wall2.bounceOff(ground);



if (Sweet1.isTouching(player)) {
  score = score + 10;
  Sweet1.destroy();
}

if (Sweet2.isTouching(player)) {
  score = score + 10;
  Sweet2.destroy();
}

if (Sweet3.isTouching(player)) {
  score = score + 10;
  Sweet3.destroy();
}

virus()

if (Virus1.isTouching(player)|| Virus2.isTouching(player)|| VirusG.isTouching(player)) {
  Virus1.velocityX=0
  Virus2.velocityX=0
  VirusG.setVelocityXEach(0)
  textSize(50)
  text("GAMEOVER",700,300);
}

textSize(20);
stroke('black');
strokeWeight(3);
text("Score: "+score,1300,50)
drawSprites()
}

function virus(){
if (frameCount%120===0){
Virus = createSprite(1500,580,10,50)
Virus.addImage(Virusimage)
Virus.scale=0.1
Virus.velocityX = -3
VirusG.add(Virus)
//Virus.debug=true;
}
}
 

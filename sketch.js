
var ground, groundImage, level1GrdImg, gameOverbg;
var man1, man2, man3, man;
var manAnimation, manImg2;
var coin, coinImage, coinImage2;
var invisibleGround;
var coinCount = 0;
var coin2, coin2Group, coinGroup;
var gameLevel = "level0";
var levelTansition, levelTansitionImg, clickToContinue, clickToContinueImg;
var tiger, buffalo, tigerImg, buffaloImg, tigerGroup, buffaloGroup;
var animalCount = 0;
var bullet, bulletImg, bulletGroup;
var bgSound;

function preload() {

  groundImage = loadImage("images/ground2.jpg");
  level1GrdImg = loadImage("images/NatureBg.jpg");


  man1 = loadImage("images/man1.png");
  man2 = loadImage("images/man2.png");
  man3 = loadImage("images/man3.png");
  manAnimation = loadAnimation("images/man1.png", "images/man2.png");

  coinImage = loadImage("images/goldCoin.jpg");
  coinImage2 = loadImage("images/th.jpg");

  levelTansitionImg = loadImage("images/nextLevel.jpg");
  clickToContinueImg = loadImage("images/clickToContinue.PNG");

  tigerImg = loadImage("images/Tiger.jpg");
  buffaloImg = loadImage("images/Buffalo.jpg");

  bulletImg = loadImage("images/bullet.png");

  gameOverbg = loadImage("images/gameOver.jpg");
  //gameOverbg = loadImage("images/space.jpg");

  bgSound = loadSound("sounds/bgSound.mp3");
}





function setup() {
  createCanvas(800, 400);

  ground = createSprite(400, 390, 800, 10);
  ground.addImage(groundImage);
  ground.scale = 0.2;
  ground.velocityX = -1;

  invisibleGround = createSprite(400, 395, 1200, 05);
  invisibleGround.visible = false;

  man = createSprite(100, 300, 20, 50);
  man.addAnimation("walking", manAnimation);
  man.scale = 0.2;
  man.debug = true;
  man.setCollider("circle", 0, 80, 150);

  levelTansition = createSprite(300, 200);
  levelTansition.addImage(levelTansitionImg);
  levelTansition.visible = false;
  levelTansition.scale = 0.5;

  clickToContinue = createSprite(600, 200);
  clickToContinue.addImage(clickToContinueImg);
  clickToContinue.visible = false;
  clickToContinue.scale = 0.3;

  coinGroup = new Group();
  coin2Group = new Group();

  tigerGroup = new Group();
  buffaloGroup = new Group();

  bulletGroup = new Group();

  bgSound.loop();

}

function draw() {
  background("lightblue");

  strokeWeight(6);
  fill("red");

  if (gameLevel === "level0") {
    level0();
  }

  if (gameLevel === "level1") {
    level1();
  }
  if (gameLevel === "level2") {
    level2();
  }

  drawSprites();

  if (gameLevel === "level1") {
    text("Coins : " + coinCount, 600, 50);
  } else if (gameLevel === "level2") {
    man.visible = true;
    text("Hunt  Count : " + animalCount, 200, 50);
  } else if (gameLevel === "levelChange") {
    levelTansition.visible = true;
    clickToContinue.visible = true;
    man.visible = false;

    if (mousePressedOver(clickToContinue)) {
      levelTansition.visible = false;
      clickToContinue.visible = false;
      gameLevel = "level2";
      man.visible = true;
    }

  } else if (gameLevel === "end") {
    ground.visible = false;
    man.visible = false;

    background(gameOverbg);
  }
}


function level0() {
  if (ground.x < 0) {
    ground.x = 300;
  }

  textSize(30);
  fill("purple");

  push();
  translate(300, 150);
  rotate(radians(frameCount * 100));
  text("My Game", 0, 0);
  pop();


  clickToContinue.visible = true;
  man.visible = false;

  if (mousePressedOver(clickToContinue)) {
    clickToContinue.visible = false;
    gameLevel = "level1";
    man.visible = true;
  }
}


function level1() {
  if (ground.x < 0) {
    ground.x = 300;
  }

  if (keyDown("space")) {
    man.velocityY = -10;

  }

  if (keyDown("left")) {
    man.x = man.x - 5;

  }


  if (keyDown("right")) {
    man.x = man.x + 5;

  }


  man.velocityY = man.velocityY + 0.8;
  spawnCoins();

  if (coinGroup.isTouching(man)) {
    coinGroup.destroyEach();
    coinCount = coinCount + 1;
  }

  if (coin2Group.isTouching(man)) {
    coin2Group.destroyEach();
    coinCount = coinCount + 1;
  }


  if (coinCount >= 2) {
    gameLevel = "levelChange";
    coinCount = 0;
  }
  man.collide(invisibleGround);


}

function level2() {


  ground.addImage(level1GrdImg);
  ground.scale = 3;

  // man.addImage(manImg2);
  //man.scale = 0.2;

  if (ground.x < 0) {
    ground.x = 300;
  }

  if (keyDown("space")) {
    man.velocityY = -10;

  }

  if (keyDown("left")) {
    man.x = man.x - 5;

  }


  if (keyDown("right")) {
    man.x = man.x + 5;

  }

  if (keyDown("p")) {
    gunShoot();
  }

  man.velocityY = man.velocityY + 0.8;

  spawnAnimals();

  if (bulletGroup.isTouching(tigerGroup)) {
    //  console.log("bulletGroup.isTouching(tigerGroup)");
    tigerGroup.destroyEach();
    bulletGroup.destroyEach();
    animalCount = animalCount + 1;
  }

  if (bulletGroup.isTouching(buffaloGroup)) {
    //  console.log("bulletGroup.isTouching(buffaloGroup)");
    buffaloGroup.destroyEach();
    bulletGroup.destroyEach();
    animalCount = animalCount + 1;
  }



  if (animalCount >= 2) {
    gameLevel = "end";
  }
  man.collide(invisibleGround);

}


function spawnCoins() {
  if (frameCount % 250 === 0) {
    coin = createSprite(800, 200, 30, 30);
    coin.debug = true;
    coin.velocityX = -4;
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.y = Math.round(random(10, 200));
    coinGroup.add(coin);
  }

  if (frameCount % 300 === 0) {
    coin2 = createSprite(800, 200, 30, 30);
    coin2.debug = true;
    coin2.velocityX = -4;
    coin2.addImage(coinImage2);
    coin2.scale = 0.1;
    coin2.y = Math.round(random(10, 200));
    coin2Group.add(coin2);
  }
}

function spawnAnimals() {
  if (frameCount % 250 === 0) {
    tiger = createSprite(800, 380, 30, 30);
    tiger.debug = true;
    tiger.velocityX = -4;
    tiger.addImage(tigerImg);
    tiger.scale = 0.06;
    tiger.collide(invisibleGround);
    tigerGroup.add(tiger);
  }

  if (frameCount % 300 === 0) {
    buffalo = createSprite(800, 380, 30, 30);
    buffalo.debug = true;
    buffalo.velocityX = -4;
    buffalo.addImage(buffaloImg);
    buffalo.scale = 0.06;
    buffalo.collide(invisibleGround);
    buffaloGroup.add(buffalo);
  }
}

function gunShoot() {
  bullet = createSprite(200, 200, 5, 5);
  bullet.addImage(bulletImg);
  bullet.x = man.x;
  bullet.scale = 0.1;
  bullet.y = man.y;
  bullet.velocityX = 3;
  bullet.lifetime = 800;
  bulletGroup.add(bullet);

}

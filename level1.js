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
        gameLevel = gameLevel + 1;
  
        level1.visible = true;
        coinCount = 0;
      }
      man.collide(invisibleGround);
}
class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  start(){
    if(gameState === 0){
      player = new Player();
      player.getCount();
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200);
    car1.addImage("1",car1Img);

    car2=createSprite(300,200);
    car2.addImage("2",car2Img);

    car3=createSprite(500,200);
    car3.addImage("3",car3Img);

    car4=createSprite(700,200);
    car4.addImage("4",car4Img);

    cars=[car1,car2,car3,car4];
  }
  play(){
    form.hide();
    //textSize(30);
    //text("Game Start",120,100);
    Player.getPlayerInfo();
    player.getCarsAtEnd();

  if(allPlayers!==undefined){
    //var display_Position=130;
    background(rgb(198,135,103))
    image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
    var index=0;
    var x=175;
    var y=0;


    for(var plr in allPlayers){

      index=index+1;
      x=x+200;
      y=displayHeight-allPlayers[plr].distance;

      cars[index-1].x=x;
      cars[index-1].y=y;

      if(index===player.index){
        fill ("yellow");
        ellipse(x,y,60,60);

        cars[index-1].shapeColor="red";
        camera.position.x=displayWidth/2;
        camera.position.y=cars[index-1].y;
      }
      //text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_Position);

    }

  }
  if(keyIsDown(UP_ARROW)&&player.index!==null){
    player.distance+=10;
    player.update();
  }
  if(player.distance>=3600){
    gameState=2;
    player.rank=player.rank+1;
    Player.updateCarsAtEnd(player.rank);
  }

  drawSprites();
 }

end(){
  console.log("GameOver");
  console.log(player.rank);


}
  
}

/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/island.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/plane.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/label.ts" />

/// <reference path="../objects/falcon.ts" />
/// <reference path="../objects/miles.ts" />

module states {

    export class GamePlay {
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public ocean: objects.Ocean;


        public ringBullets: objects.RingBullet[] = [];

        public miles: objects.Miles;
        public falcon: objects.Falcon;
        

        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();




            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);




            //Create Bullets
            for (var bullets = 21; bullets >= 0; bullets--) {
                this.ringBullets[bullets] = new objects.RingBullet();
                this.game.addChild(this.ringBullets[bullets]);
            }

            //Miles
            this.miles = new objects.Miles();
            this.game.addChild(this.miles);

            //Falcon
            this.falcon = new objects.Falcon();
            this.game.addChild(this.falcon);

            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor


        // DISTANCE CHECKING METHOD
        public  distance(p1: createjs.Point, p2: createjs.Point): number {
        return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method


        /*
        // CHECK COLLISION METHOD
        public checkCollision(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                var planePosition: createjs.Point = new createjs.Point(this.plane.x, this.plane.y);
            var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
            var theDistance = this.distance(planePosition, objectPosition);
            if (theDistance < ((this.plane.height * 0.5) + (collider.height * 0.5))) {
                if (collider.isColliding != true) {
                    createjs.Sound.play(collider.sound);
                    if (collider.name == "cloud") {
                        this.scoreboard.lives--;
                    }
                    if (collider.name == "island") {
                        this.scoreboard.score += 100;
                    }
                }
                collider.isColliding = true;
            } else {
                collider.isColliding = false;
            }
        }
        }
         */
        
        // checkCollision Method

        public update() {

            this.ocean.update();

            this.scoreboard.update();

            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }












            this.miles.update();
            this.falcon.update();


            //Game Start
            if (gamePlay.falcon.currentFrame == 11 && !gamePlay.falcon.active) {
                gamePlay.falcon.active = true;
                milesState = "Idle";
                milesTimer = 60;
            }

            if (milesTimer > 0) {
                milesTimer--;
            }

            if (milesTimer == 0 && milesState == "Idle") {
                gamePlay.miles.gotoAndPlay("MilesPew");
                milesState = "Pew";               
                milesTimer = -1;
            }

            if (milesState == "Pew" && gamePlay.falcon.active) {
                milesState = "Pewing";
                pewDuration = 30;

                var shootCount = 0;

                for (var bullets = 21; bullets >= 0; bullets--) {
                    if (this.ringBullets[bullets].active == false) {
                        this.ringBullets[bullets].active = true;
                        this.ringBullets[bullets].spawn();

                        this.ringBullets[bullets].ySpeed =
                        (Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 3) + 0));

                        shootCount++;
                    }

                    //Only Shoot 1 Bullet
                    if (shootCount == 1) {
                        console.log("BREAK");
                        break;
                    }
                    console.log("shoot: " + shootCount);
                }
                
                milesState = "PewCD";
            }

            if (pewDuration > 0) {
                pewDuration--;
            }

            if (milesState == "PewCD" && pewDuration == 0) {
                gamePlay.miles.gotoAndPlay("MilesNeutral");
                milesState = "Idle";
                milesTimer = Math.floor((Math.random() * 70) + 40);
            }


            //console.log("> " + pewDuration);




            //Handle all of the 'click' related stuff
            stage.addEventListener("click", handleClick);

            function handleClick(event) {
                //console.log("Click Detected");

                //Start > Kick
                if (falconState == "Start") {
                    gamePlay.falcon.gotoAndPlay("FalconKick");
                    falconState = "Kick";

                    clickDelay = 5;
                }

                //Kick > Knee
                if (falconState == "Kick" && clickDelay == 0) {
                    gamePlay.falcon.gotoAndPlay("KickToKnee");
                    falconState = "Knee";

                    kneeDuration = 30;
                    clickDelay = 70;
                }
            }

            //CD on Knee && Knee > Kick
            if (kneeDuration > 0) {
                kneeDuration--;
            }
            if (kneeDuration == 0 && falconState == "Knee") {
                falconState = "Kick";
                gamePlay.falcon.gotoAndPlay("KneeToKick");
                kneeDuration = -1;
            }

            if (kneeDuration == -1 && clickDelay == 0) {
                //console.log("KNEE IS READY");
            }

            //Delay Clicks > Kill Spam
            if (clickDelay > 0) {
                clickDelay--;
            }
            




            //Collision Stuff
            /*
            var rect1 = { x: 5, y: 5, width: 50, height: 50 }
            var rect2 = { x: 20, y: 10, width: 10, height: 10 }

            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y) {
                // collision detected!
            }

            // filling in the values =>

            if (5 < 30 &&
                55 > 20 &&
                5 < 20 &&
                55 > 10) {
                // collision detected!
            }
            */

            

            
            for (var bullets = 21; bullets >= 0; bullets--) {
                this.ringBullets[bullets].update();

                //Falcon and Ring
                if (gamePlay.falcon.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW &&
                    gamePlay.falcon.hitX + gamePlay.falcon.hitW > this.ringBullets[bullets].hitX &&
                    gamePlay.falcon.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH &&
                    gamePlay.falcon.hitH + gamePlay.falcon.hitY > this.ringBullets[bullets].hitY &&
                    falconState == "Kick"
                    )
                {
                    console.log("GET HIT");
                    falconState = "Hit";
                    this.falcon.gotoAndPlay("FalconKnee1");
                    recoveryDelay = 20;
                }
            }
            
            if (recoveryDelay > 0) {
                recoveryDelay--;
            }
            if (recoveryDelay == 0) {
                recoveryDelay = -1;
                this.falcon.gotoAndPlay("FalconKick");
                falconState = "Kick";
            }




            stage.update(); // Refreshes our stage

    } // Update Method

    } // GamePlay Class


} // States Module
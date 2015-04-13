/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/island.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/plane.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/label.ts" />


/// <reference path="../objects/falcon.ts" />

module states {

    export class GamePlay {
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public island: objects.Island
        public clouds: objects.Cloud[] = [];
        public ocean: objects.Ocean;
        public edgeNeutral: objects.EdgeNeutral;
        public edgePew: objects.EdgePew;
        public edgeHit1: objects.EdgeHit1;
        public edgeHit2: objects.EdgeHit2;
        public ringBullet: objects.RingBullet;

        public falcon: objects.Falcon;

        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            

            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);

            //Island object
            this.island = new objects.Island();
            //this.game.addChild(this.island);

            this.edgeNeutral = new objects.EdgeNeutral();
            this.game.addChild(this.edgeNeutral);

            this.edgePew = new objects.EdgePew();
            this.game.addChild(this.edgePew);

            this.edgeHit1 = new objects.EdgeHit1();
            this.game.addChild(this.edgeHit1);

            this.edgeHit2 = new objects.EdgeHit2();
            this.game.addChild(this.edgeHit2);

            this.ringBullet = new objects.RingBullet();
            this.game.addChild(this.ringBullet);
            

            //Cloud object
            for (var cloud = 2; cloud >= 0; cloud--) {
                this.clouds[cloud] = new objects.Cloud();
                //this.game.addChild(this.clouds[cloud]);
            }


            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            //Falcon Object
            this.falcon = new objects.Falcon();
            this.game.addChild(this.falcon);


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
    } // checkCollision Method

        */

        public update() {

            

            this.ocean.update();

            this.island.update();

            this.edgeNeutral.update();
            this.edgePew.update();
            this.edgeHit1.update();
            this.edgeHit2.update();

            this.ringBullet.update();

            this.falcon.update();


            for (var cloud = 2; cloud >= 0; cloud--) {
                this.clouds[cloud].update();

                //this.checkCollision(this.clouds[cloud]);
            }

            //this.checkCollision(this.island);


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
            

            //The Cap'n is in motion
            if (gamePlay.falcon.currentFrame == 11) {
                gamePlay.falcon.active = true;
                gamePlay.ringBullet.active = true;
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
                console.log("KNEE IS READY");
            }

            //Delay Clicks > Kill Spam
            if (clickDelay > 0) {
                clickDelay--;
            }
            

            //console.log(clickDelay);
            //console.log(falconState);


            //Collision Test
            var distance = Math.sqrt(
                (this.falcon.x - this.ringBullet.x) * (this.falcon.x - this.ringBullet.x) +
                (this.falcon.y - this.ringBullet.y) * (this.falcon.y - this.ringBullet.y)
                );

            if (distance < 100 && this.falcon.currentFrame == 4) {
                console.log("Ring got Knee'd");
                this.ringBullet.y = 900;
            }
            if (distance < 50 && this.falcon.currentFrame != 4) {
                console.log("You Got Hit");
                falconState = "Hit";
                this.falcon.gotoAndPlay("falconKnee1");
                recoveryDelay = 20;
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
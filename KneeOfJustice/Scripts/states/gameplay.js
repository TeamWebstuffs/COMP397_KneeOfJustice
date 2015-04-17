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
var states;
(function (states) {
    var GamePlay = (function () {
        function GamePlay() {
            this.ringBullets = [];
            // Instantiate Game Container
            this.game = new createjs.Container();
            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);
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
        GamePlay.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }; //Distance Method
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
        GamePlay.prototype.update = function () {
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
            for (var bullets = 21; bullets >= 0; bullets--) {
                this.ringBullets[bullets].update();
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
                milesState = "Pew";
                gamePlay.miles.gotoAndPlay("MilesPew");
                milesTimer = -1;
            }
            console.log("MilesTimer: " + milesTimer);
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
            }
            //Delay Clicks > Kill Spam
            if (clickDelay > 0) {
                clickDelay--;
            }
            /*
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
                this.falcon.gotoAndPlay("FalconKnee1");
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
            */
            stage.update(); // Refreshes our stage
        }; // Update Method
        return GamePlay;
    })();
    states.GamePlay = GamePlay; // GamePlay Class
})(states || (states = {})); // States Module
//# sourceMappingURL=gameplay.js.map
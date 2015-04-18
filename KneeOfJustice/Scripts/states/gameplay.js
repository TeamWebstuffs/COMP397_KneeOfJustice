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
            this.miles.update();
            this.falcon.update();
            //Game Start
            if (gamePlay.falcon.currentFrame == 11 && !gamePlay.falcon.active) {
                gamePlay.falcon.active = true;
                //Start Miles lv1 AI Cycle
                milesState = "Idle";
                milesTimer = 60;
            }
            //M2Pew
            if (milesTimer > 0) {
                milesTimer--;
            }
            if (milesTimer == 0 && milesState == "Idle") {
                gamePlay.miles.gotoAndPlay("MilesPew");
                milesState = "Pew";
                milesTimer = -1;
            }
            //Pew Lv1
            if (milesState == "Pew" && level == 1) {
                milesState = "Pewing";
                pewDuration = 30;
                var shootCount = 0;
                for (var bullets = 21; bullets >= 0; bullets--) {
                    if (this.ringBullets[bullets].active == false) {
                        this.ringBullets[bullets].active = true;
                        this.ringBullets[bullets].ySpeed = (Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 3) + 0));
                        this.ringBullets[bullets].spawn();
                        shootCount++;
                    }
                    //Only Shoot 1 Bullet
                    if (shootCount == 1) {
                        break;
                    }
                }
                //Shooting Finished
                milesState = "PewCD";
            }
            //Pew Lv2
            if (milesState == "Pew" && level == 2) {
                milesState = "Pewing";
                switch (milesCombo) {
                    case 1:
                        pewDuration = 10;
                        break;
                    case 2:
                        pewDuration = 10;
                        break;
                    case 3:
                        pewDuration = 10;
                        break;
                    default:
                        break;
                }
                var shootCount = 0;
                for (var bullets = 21; bullets >= 0; bullets--) {
                    if (this.ringBullets[bullets].active == false) {
                        this.ringBullets[bullets].active = true;
                        if (milesCombo == 2) {
                            this.ringBullets[bullets].ySpeed = shootCount;
                        }
                        else {
                            this.ringBullets[bullets].ySpeed = -shootCount;
                        }
                        this.ringBullets[bullets].spawn();
                        shootCount++;
                    }
                    //
                    if (shootCount == 3) {
                        break;
                    }
                }
                //Shooting Finished
                if (milesCombo < 3) {
                    milesCombo++;
                }
                else if (milesCombo == 3) {
                    milesCombo = -1;
                }
                milesState = "PewCD";
            }
            //Return Miles back to Neutral
            if (pewDuration > 0) {
                pewDuration--;
            }
            if (milesState == "PewCD" && pewDuration == 0) {
                gamePlay.miles.gotoAndPlay("MilesNeutral");
                milesState = "Idle";
                if (level == 1) {
                    milesTimer = Math.floor((Math.random() * 70) + 40);
                }
                if (level == 2 && milesCombo <= 3) {
                    milesTimer = 40;
                }
                if (level == 2 && milesCombo == -1) {
                    milesTimer = 140;
                    milesCombo = 1;
                }
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
            //CD on Knee && Knee > Kick
            if (kneeDuration > 0) {
                kneeDuration--;
            }
            if (kneeDuration == 0 && falconState == "Knee") {
                falconState = "Kick";
                gamePlay.falcon.gotoAndPlay("KneeToKick");
                kneeDuration = -1;
            }
            //Blue Falcon
            if (kneeDuration == -1 && clickDelay == 0 && gamePlay.falcon.currentFrame == 11) {
                gamePlay.falcon.gotoAndPlay("FalconKneeReady");
            }
            //Delay Clicks > Kill Spam
            if (clickDelay > 0) {
                clickDelay--;
            }
            for (var bullets = 21; bullets >= 0; bullets--) {
                this.ringBullets[bullets].update();
                //Falcon Kick and Ring
                if (gamePlay.falcon.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW && gamePlay.falcon.hitX + gamePlay.falcon.hitW > this.ringBullets[bullets].hitX && gamePlay.falcon.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH && gamePlay.falcon.hitH + gamePlay.falcon.hitY > this.ringBullets[bullets].hitY && falconState == "Kick") {
                    falconState = "Hit";
                    this.falcon.gotoAndPlay("FalconKnee1");
                    recoveryDelay = 20;
                }
                //Falcon Knee and Ring
                if (gamePlay.falcon.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW && gamePlay.falcon.hitX + gamePlay.falcon.hitW > this.ringBullets[bullets].hitX && gamePlay.falcon.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH && gamePlay.falcon.hitH + gamePlay.falcon.hitY > this.ringBullets[bullets].hitY && falconState == "Knee") {
                    //Ring Reflected
                    this.ringBullets[bullets].reflect = true;
                }
                //Miles and Ring
                if (gamePlay.miles.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW && gamePlay.miles.hitX + gamePlay.miles.hitW > this.ringBullets[bullets].hitX && gamePlay.miles.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH && gamePlay.miles.hitH + gamePlay.miles.hitY > this.ringBullets[bullets].hitY && this.ringBullets[bullets].reflect && milesState != "Hit" && level == 1) {
                    //Miles got Ringed
                    milesState = "Hit";
                    gamePlay.miles.gotoAndPlay("Kneed1");
                    this.ringBullets[bullets].reflect = false;
                    this.ringBullets[bullets].active = false;
                    this.ringBullets[bullets].x = -100;
                }
            }
            //Falcon Recovery
            if (recoveryDelay > 0) {
                recoveryDelay--;
            }
            if (recoveryDelay == 0) {
                recoveryDelay = -1;
                this.falcon.gotoAndPlay("FalconKick");
                falconState = "Kick";
            }
            //Stage 2 Start
            if (milesState == "Hit" && gamePlay.miles.currentFrame == 6 && level == 1) {
                console.log("STAGE 2");
                level = 2;
                milesHp = 5;
                milesCombo = 1;
                milesState = "Idle";
                milesTimer = 30;
            }
            stage.update(); // Refreshes our stage
        }; // Update Method
        return GamePlay;
    })();
    states.GamePlay = GamePlay; // GamePlay Class
})(states || (states = {})); // States Module
//# sourceMappingURL=gameplay.js.map
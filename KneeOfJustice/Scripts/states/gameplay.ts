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
                        this.ringBullets[bullets].ySpeed =
                        (Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 3) + 0));
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
                        } else {
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
                } else if (milesCombo == 3) {
                    milesCombo = -1;
                }
                milesState = "PewCD";
            }

            //Pew Lv3
            if (milesState == "SPAZMODE" && meteoCD == 0 && level == 3) {
                var shootCount = 0;

                for (var bullets = 21; bullets >= 0; bullets--) {
                    if (this.ringBullets[bullets].active == false) {
                        this.ringBullets[bullets].active = true;
                        this.ringBullets[bullets].meteo = true;

                        this.ringBullets[bullets].meteoX =
                        (Math.floor((Math.random() * 10) + 5));

                        this.ringBullets[bullets].meteoY =
                        (Math.floor((Math.random() * 7) + 1));

                        this.ringBullets[bullets].x =
                        (Math.floor((Math.random() * 2000) + 1500));

                        this.ringBullets[bullets].y = -100;
                        shootCount++;
                    }
                    //Only Shoot 1 Bullet
                    if (shootCount == 1) {
                        break;
                    }
                }
                //Shooting Finished
                meteoCD = (Math.floor((Math.random() * 10) + 5));
            }
            if (meteoCD > 0) {
                meteoCD--;
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
            

            //Collision Stuff

            //Bullets
            for (var bullets = 21; bullets >= 0; bullets--) {
                this.ringBullets[bullets].update();

                //Falcon Kick and Ring
                if (gamePlay.falcon.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW &&
                    gamePlay.falcon.hitX + gamePlay.falcon.hitW > this.ringBullets[bullets].hitX &&
                    gamePlay.falcon.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH &&
                    gamePlay.falcon.hitH + gamePlay.falcon.hitY > this.ringBullets[bullets].hitY &&
                    falconState == "Kick" && gamePlay.falcon.active
                    )
                {
                    falconState = "Hit";
                    this.falcon.gotoAndPlay("FalconKnee1");
                    recoveryDelay = 20;
                    this.scoreboard.lives--;
                }

                //Falcon Knee and Ring
                if (gamePlay.falcon.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW &&
                    gamePlay.falcon.hitX + gamePlay.falcon.hitW > this.ringBullets[bullets].hitX &&
                    gamePlay.falcon.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH &&
                    gamePlay.falcon.hitH + gamePlay.falcon.hitY > this.ringBullets[bullets].hitY &&
                    falconState == "Knee"
                    ) {
                    //Ring Reflected
                    this.ringBullets[bullets].meteo = false;
                    this.ringBullets[bullets].reflect = true;
                    this.scoreboard.score += 100;
                }

                //Miles and Ring Lv1
                if (gamePlay.miles.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW &&
                    gamePlay.miles.hitX + gamePlay.miles.hitW > this.ringBullets[bullets].hitX &&
                    gamePlay.miles.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH &&
                    gamePlay.miles.hitH + gamePlay.miles.hitY > this.ringBullets[bullets].hitY &&
                    this.ringBullets[bullets].reflect && milesState != "Hit" && level == 1
                    ) {
                    //Miles got Ringed
                    milesState = "Hit";
                    gamePlay.miles.gotoAndPlay("Kneed1");
                    this.ringBullets[bullets].reflect = false;
                    this.ringBullets[bullets].active = false;
                    this.ringBullets[bullets].x = -100;
                }

                //Miles and Ring Lv2
                if (gamePlay.miles.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW &&
                    gamePlay.miles.hitX + gamePlay.miles.hitW > this.ringBullets[bullets].hitX &&
                    gamePlay.miles.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH &&
                    gamePlay.miles.hitH + gamePlay.miles.hitY > this.ringBullets[bullets].hitY &&
                    this.ringBullets[bullets].reflect && level == 2
                    ) {
                    //Miles got Ringed
                    this.ringBullets[bullets].reflect = false;
                    this.ringBullets[bullets].active = false;
                    this.ringBullets[bullets].x = -100;

                    milesHp--;
                    if (milesHp <= 0) {
                        milesState = "Hit";
                        gamePlay.miles.gotoAndPlay("Kneed1");
                    }
                }

                //Miles and Ring Lv3
                if (gamePlay.miles.hitX < this.ringBullets[bullets].hitX + this.ringBullets[bullets].hitW &&
                    gamePlay.miles.hitX + gamePlay.miles.hitW > this.ringBullets[bullets].hitX &&
                    gamePlay.miles.hitY < this.ringBullets[bullets].hitY + this.ringBullets[bullets].hitH &&
                    gamePlay.miles.hitH + gamePlay.miles.hitY > this.ringBullets[bullets].hitY &&
                    this.ringBullets[bullets].reflect && level == 3
                    ) {
                    //Miles got Ringed
                    this.ringBullets[bullets].reflect = false;
                    this.ringBullets[bullets].active = false;
                    this.ringBullets[bullets].x = -100;

                    milesHp--;
                    if (milesHp <= 0) {
                        milesState = "Hit";
                        gamePlay.miles.gotoAndPlay("Kneed1");
                    }
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

            //Stage 3 Start
            if (milesState == "Hit" && gamePlay.miles.currentFrame == 6 && level == 2) {
                console.log("STAGE 3");
                level = 3;
                milesHp = 10;
                milesCombo = 1;
                milesState = "SPAZMODE";
                gamePlay.miles.gotoAndPlay("MilesSpaz");
                milesTimer = 30;
            }

            //END
            if (milesState == "Hit" && gamePlay.miles.currentFrame == 6 && level == 3) {
                console.log("END");
                level = 4;
                milesState = "End";
                gamePlay.miles.gotoAndPlay("End");
                gamePlay.falcon.active = false;
            }


            stage.update(); // Refreshes our stage

    } // Update Method

    } // GamePlay Class


} // States Module
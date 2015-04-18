/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="constants.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/plane.ts" />
/// <reference path="objects/island.ts" />
/// <reference path="objects/cloud.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/ringbullet.ts" />
/// <reference path="objects/falcon.ts" />
/// <reference path="states/gameplay.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/menu.ts" />
// Global game Variables
var canvas;
var stage;
var assetLoader;
var stats = new Stats();
var currentScore = 0;
var highScore = 0;
//Falcon Stuff
var falconAtlas;
var falconState;
//Start
//Kick
//Knee
//Hit
var clickDelay = 0;
var kneeDuration = -1;
var recoveryDelay = -1;
var level = 0;
//Miles Stuff
var milesAtlas;
var milesState;
//Start
//Idle
//Pew
//Pewing
//PewCD
//PewPew
//PewPewing
//PewSpray
//RingForce
//Hit
//SPAZMODE
//End
var milesTimer = 0;
var milesCombo = 1;
var pewDuration = 0;
var milesHp = 0;
var meteoCD = 0;
// Game State Variables
var currentState;
var currentStateFunction;
var stateChanged = false;
var gamePlay;
var gameOver;
var menu;
var manifest = [
    { id: "cloud", src: "assets/images/cloud.png" },
    { id: "island", src: "assets/images/island.png" },
    { id: "ocean", src: "assets/images/Nebula2.fw.png" },
    { id: "ringBullet", src: "assets/images/ringBullet.fw.png" },
    { id: "platform", src: "assets/images/Platform.fw.png" },
    { id: "playButton", src: "assets/images/startbutton.png" },
    { id: "tryAgainButton", src: "assets/images/startbutton.png" },
    { id: "engine", src: "assets/audio/engine.ogg" },
    { id: "ken", src: "assets/audio/02 KEN STAGE.mp3" },
    { id: "after", src: "assets/audio/Afterknee.wav" },
    { id: "before", src: "assets/audio/Beforeknee.wav" },
    { id: "falcondeath", src: "assets/audio/falcondeath.wav" },
    { id: "fkick", src: "assets/audio/falconkick.wav" },
    { id: "fover", src: "assets/audio/falconover.wav" },
    { id: "laser", src: "assets/audio/laserbeam.mp3" },
    { id: "hit", src: "assets/audio/Mileshit.mp3" },
    { id: "start", src: "assets/images/kneeofjusticeandtext.png" },
    { id: "fail", src: "assets/images/gameoverscreen.png" },
    { id: "success", src: "assets/images/congratulations.png" },
    { id: "yay", src: "assets/audio/yay.ogg" },
    { id: "thunder", src: "assets/audio/thunder.ogg" }
];
var fAtlas = {
    "images": ["assets/images/FalconAtlas.png"],
    "frames": [
        [2, 2, 168, 138],
        [172, 2, 168, 138],
        [342, 2, 168, 138],
        [512, 2, 168, 138],
        [2, 142, 168, 138],
        [2, 282, 168, 138],
        [2, 422, 168, 138],
        [172, 142, 168, 138],
        [342, 142, 168, 138],
        [512, 142, 168, 138],
        [172, 282, 168, 138],
        [172, 422, 168, 138],
        [342, 282, 168, 138],
        [512, 282, 168, 138]
    ],
    "animations": {
        "FalconStand": [0],
        "FalconKnee2": [1],
        "FalconKnee3": [2],
        "FalconKnee4": [3],
        "FalconKnee5": [4],
        "FalconKick1": [5],
        "FalconKick2": [6],
        "FalconKick3": [7],
        "FalconKick4": [8],
        "FalconKick5": [9],
        "FalconKick6": [10],
        "FalconKick7": [11],
        "FalconKnee1": [12],
        "FalconKneeReady": [13],
        "FalconKick": {
            frames: [0, 5, 6, 7, 8, 9, 10, 11],
            next: "FalconKick7",
            speed: 0.75
        },
        "KickToKnee": {
            frames: [10, 9, 12, 1, 2, 3],
            next: "FalconKnee5",
            speed: 0.75
        },
        "KneeToKick": {
            frames: [3, 2, 9, 10],
            next: "FalconKick7",
            speed: 0.5
        }
    }
};
var mAtlas = {
    "images": ["assets/images/MilesAtlas.png"],
    "frames": [
        [2, 2, 658, 400],
        [2, 404, 658, 400],
        [2, 806, 658, 400],
        [662, 2, 658, 400],
        [1322, 2, 658, 400],
        [662, 404, 658, 400],
        [1322, 404, 658, 400],
        [662, 806, 658, 400],
        [1322, 806, 658, 400]
    ],
    "animations": {
        "MilesEnd1": [0],
        "MilesEnd2": [1],
        "MilesEnd3": [2],
        "MilesHit1": [3],
        "MilesHit2": [4],
        "MilesHit3": [5],
        "MilesNeutral": [6],
        "MilesPew": [7],
        "MilesRestart": [8],
        "Kneed1": {
            frames: [3, 4],
            speed: 0.075,
            next: "Kneed2"
        },
        "Kneed2": {
            frames: [5, 5, 8],
            speed: 0.025,
            next: "KneedToNeutral"
        },
        "KneedToNeutral": {
            frames: [8, 6, 6],
            speed: 0.025,
            next: "MilesNeutral"
        },
        "MilesSpaz": {
            frames: [7, 8, 1, 4],
            next: "MilesSpaz2",
            speed: 0.5
        },
        "MilesSpaz2": {
            frames: [5, 3, 2, 6, 1],
            next: "MilesSpaz",
            speed: 0.5
        },
        "End": {
            frames: [0, 1, 2],
            speed: 0.05,
            next: "MilesEnd3"
        }
    }
};
function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function
    assetLoader.loadManifest(manifest);
    falconAtlas = new createjs.SpriteSheet(fAtlas);
    milesAtlas = new createjs.SpriteSheet(mAtlas);
}
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();
    currentState = constants.MENU_STATE;
    changeState(currentState);
}
function setupStats() {
    stats.setMode(0);
    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '1550px';
    stats.domElement.style.top = '50px';
    document.body.appendChild(stats.domElement);
}
function gameLoop() {
    stats.begin();
    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }
    stats.end();
}
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            menu = new states.Menu();
            currentStateFunction = menu;
            break;
        case constants.PLAY_STATE:
            // instantiate game play screen
            gamePlay = new states.GamePlay();
            currentStateFunction = gamePlay;
            break;
        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
    }
}
//# sourceMappingURL=game.js.map
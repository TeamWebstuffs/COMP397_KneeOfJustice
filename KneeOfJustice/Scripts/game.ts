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

/// <reference path="objects/edgeneutral.ts" />
/// <reference path="objects/edgehit2.ts" />
/// <reference path="objects/edgehit1.ts" />
/// <reference path="objects/edgepew.ts" />
/// <reference path="objects/ringbullet.ts" />

/// <reference path="objects/falcon.ts" />

/// <reference path="states/gameplay.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/menu.ts" />


// Global game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;
var stats: Stats = new Stats();
var currentScore = 0;
var highScore = 0;

var speedX = 0.05;
var edgeState = 1;

var falconAtlas: createjs.SpriteSheet;
var falconState;

var clickDelay = 0;
var kneeDuration = -1;
var recoveryDelay = -1;

// Game State Variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;

var gamePlay: states.GamePlay;
var gameOver: states.GameOver;
var menu: states.Menu;

var manifest = [
    { id: "cloud", src: "assets/images/cloud.png" },
    { id: "island", src: "assets/images/island.png" },
    { id: "ocean", src: "assets/images/space.jpg" },
    { id: "knee", src: "assets/images/knee.fw.png" },
    { id: "edgeNeutral", src: "assets/images/edgeNeutral.fw.png" },
    { id: "edgePew", src: "assets/images/edgePew.fw.png" },
    { id: "edgeHit1", src: "assets/images/edgeHit1.fw.png" },
    { id: "edgeHit2", src: "assets/images/edgeHit2.fw.png" },
    { id: "ringBullet", src: "assets/images/ringBullet.fw.png" },
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
        [342, 282, 168, 138]
    ],
    "animations": {

        "falconStand": [0],
        "falconKnee2": [1],
        "falconKnee3": [2],
        "falconKnee4": [3],
        "falconKnee5": [4],
        "falconKick1": [5],
        "falconKick2": [6],
        "falconKick3": [7],
        "falconKick4": [8],
        "falconKick5": [9],
        "falconKick6": [10],
        "falconKick7": [11],
        "falconKnee1": [12],

        "FalconKick": {
            frames: [0, 5, 6, 7, 8, 9, 10, 11],
            next: "falconKick7",
            speed: 0.75
        },

        "KickToKnee": {
            frames: [10, 9, 12, 1, 2, 3],
            next: "falconKnee5",
            speed: 0.75
        },

        "KneeToKick": {
            frames: [3, 2, 9, 10],
            next: "falconKick7",
            speed: 0.5
        }
    }
}

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
        "MilesRestart": [8]
    }
}


function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function

    assetLoader.loadManifest(manifest);

    falconAtlas = new createjs.SpriteSheet(fAtlas);
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
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '440px';

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


function changeState(state: number): void {
    // Launch Various "screens"
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





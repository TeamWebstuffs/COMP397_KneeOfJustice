﻿
module objects {
    // PLANE CLASS
    export class EdgeHit2 extends createjs.Bitmap {
        public width: number;
        public height: number;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("edgeHit2"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            //Spawn Point
            this.x = 0;
            this.y = 0;
        }

        // PUBLIC METHODS
        public update() {
            if (edgeState === 3) {
                this.x = 1190;
                this.y = 116;
            } else {
                this.x = 1190;
                this.y = 900;
            }
        }

    }

}    
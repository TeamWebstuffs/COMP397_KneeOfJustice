
module objects {
    // PLANE CLASS
    export class EdgePew extends createjs.Bitmap {
        public width: number;
        public height: number;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("edgePew"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            //Spawn Point
            this.x = 1190;
            this.y = 116;
        }

        // PUBLIC METHODS
        public update() {
            if (edgeState === 1) {
                this.x = 1190;
                this.y = 116;
            } else {
                this.x = 1190;
                this.y = 900;
            }
        }

    }

}   

module objects {
    // PLANE CLASS
    export class Platform extends createjs.Bitmap {
        public width: number;
        public height: number;

        public start = false;
        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("platform"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            //Spawn Point
            this.x = 95;
            this.y = 310;

        }

        // PUBLIC METHODS
        public update() {
            if (this.start) {
                this.x -= 15;
            }

            if (this.x < -300) {
                this.start = false;
            }
        }

    }

}  

module objects {
    // PLANE CLASS
    export class RingBullet extends createjs.Bitmap {
        public width: number;
        public height: number;
        public active = true;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("ringBullet"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            //Spawn Point
            this.x = 1175;
            this.y = 265;
        }

        // PUBLIC METHODS
        public update() {
            if (this.active) {
                this.x -= 5;
            }
        }

        // Reset position of island to the top
        public reset() {
            this.x = 1175;
            this.y = 265;

        }

    }

}  
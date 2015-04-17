
module objects {
    // PLANE CLASS
    export class RingBullet extends createjs.Bitmap {
        public width: number;
        public height: number;

        public active = false;
        public ySpeed = 0;
        public state = "";

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("ringBullet"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            //Spawn Point
            this.x = 1006;
            this.y = 3000;
        }

        // PUBLIC METHODS
        public update() {
            if (this.active) {
                this.x -= 10;
                this.y += this.ySpeed;
            }

            if (this.x < -50) {
                this.active = false;
            }

        }

        // Reset position of island to the top
        public spawn() {
            createjs.Sound.play("laser", { loop: 0, volume: 0.5 });

            //Respawn
            this.x = 1006;
            this.y = 300;
        }

    }

}  
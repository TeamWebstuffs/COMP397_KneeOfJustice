
module objects {
    // PLANE CLASS
    export class RingBullet extends createjs.Bitmap {
        public width: number;
        public height: number;

        public active = false;
        public reflect = false;
        public meteo = false;
        public meteoX;
        public meteoY;
        public ySpeed = 0;
        public state = "";

        public hitX;
        public hitY;
        public hitW;
        public hitH;

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

            this.hitW = 55;
            this.hitH = 55;
        }

        // PUBLIC METHODS
        public update() {
            //Update Hitbox
            this.hitX = this.x - 27;
            this.hitY = this.y - 27;

            if (this.active && !this.reflect && !this.meteo) {
                this.x -= 10;
                this.y += this.ySpeed;
            }
            if (this.active && this.reflect && !this.meteo) {
                this.x += 10;
            }

            if (this.active && this.meteo) {
                this.x -= this.meteoX;
                this.y += this.meteoY;
            }

            if (this.x < -50 || this.y > 550) {
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
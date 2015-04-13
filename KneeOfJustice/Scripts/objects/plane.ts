
module objects {
    // PLANE CLASS
    export class Plane extends createjs.Sprite {
        public width: number;
        public height: number;

        // CONSTRUCTOR
        constructor() {
            super(falconAtlas, "falconStand");

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            //this.x = 100;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            createjs.Sound.play("ken", { loop: -1 });

            //Spawn Point
            this.x = 100;
            this.y = 200;
        }

        // PUBLIC METHODS
        public update() {
            //this.y = stage.mouseY;
            //this.x = stage.mouseX;

            if (this.y > stage.mouseY) {
                this.y -= 5;
            }
            if (this.y < stage.mouseY) {
                this.y += 5;
            }

            this.x += speedX;
            speedX += 0.025;



            //test

            

        }

    }

} 
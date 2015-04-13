
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
            createjs.Sound.play("engine", { loop: -1 });

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
            if (this.y < 100) {
                edgeState = 0;
            } else if (this.y > 100 && this.y < 200) {
                edgeState = 1;
            } else if (this.y > 200 && this.y < 300) {
                edgeState = 2;
            } else if (this.y > 300){
                edgeState = 3;
            }

            console.log("state is " + edgeState);

            

        }

    }

} 
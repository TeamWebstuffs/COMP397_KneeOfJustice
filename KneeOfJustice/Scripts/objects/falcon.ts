
module objects {
    // PLANE CLASS
    export class Falcon extends createjs.Sprite {
        public width: number;
        public height: number;
        public isColliding: boolean = false;
        public theme;

        // CONSTRUCTOR
        constructor() {
            super(falconAtlas, "falconStand");

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.theme = createjs.Sound.play("ken", { loop: -1 });

            //Spawn Point
            this.x = 100;
            this.y = 250;

            falconState = "Start";
        }

        // PUBLIC METHODS
        public update() {

            //
            if (this.y > stage.mouseY) {
                //this.y -= 5;
            }
            if (this.y < stage.mouseY) {
                //this.y += 5;
            }

            //this.x += speedX;
            //speedX += 0.025;



            //test
            if (this.y < 100) {
                edgeState = 0;
            } else if (this.y > 100 && this.y < 200) {
                edgeState = 1;
            } else if (this.y > 200 && this.y < 300) {
                edgeState = 2;
            } else if (this.y > 300) {
                edgeState = 3;
            }

            console.log("state is " + edgeState);



        }

    }

} 
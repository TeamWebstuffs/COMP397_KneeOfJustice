
module objects {
    // FALCON CLASS
    export class Falcon extends createjs.Sprite {
        public width: number;
        public height: number;
        public isColliding: boolean = false;
        public theme;
        public active: boolean = false;

        // CONSTRUCTOR
        constructor() {
            super(falconAtlas, "FalconStand");
            this.theme = createjs.Sound.play("ken", { loop: -1 });

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            //Spawn Point
            this.x = 100;
            this.y = 250;

            falconState = "Start";
        }

        // PUBLIC METHODS
        public update() {

            //
            if (this.active && this.y > stage.mouseY) {
                this.y -= 10;
            }
            if (this.active && this.y < stage.mouseY) {
                this.y += 10;
            }

        }

    }

} 
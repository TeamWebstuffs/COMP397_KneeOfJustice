
module objects {
    // MILES CLASS
    export class Miles extends createjs.Sprite {
        public width: number;
        public height: number;
        public isColliding: boolean = false;
        public hitX;
        public hitY;
        public hitW;
        public hitH;

        // CONSTRUCTOR
        constructor() {
            super(milesAtlas, "MilesNeutral");

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            //Spawn Point
            this.x = this.regX + 842;
            this.y = this.regY + 100;

            milesState = "Start";

            this.hitW = 250;
            this.hitH = 350;
        }

        // PUBLIC METHODS
        public update() {
            //Update Hitbox
            this.hitX = this.x - 125 + 91;
            this.hitY = this.y - 175 + 25;
        }

    }

} 
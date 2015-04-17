
module objects {
    // MILES CLASS
    export class Miles extends createjs.Sprite {
        public width: number;
        public height: number;
        public isColliding: boolean = false;

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
        }

        // PUBLIC METHODS
        public update() {

            //
        }

    }

} 
module objects {
    // CLOUD CLASS
    export class Cloud extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("cloud");
            this.sound = "thunder";
            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.y += this._dy;
            this.x += this._dx;

            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.y = 100   //-this.height;
            this.x = 640 + this.width;                       //Math.floor(Math.random() * 640);
            this._dy = 0;
            this._dx = -2;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            /*
            if (this.y >= (480 + this.height)) {
                this.reset();
            }
            */
            if (this.x < 0) {
                this.reset();
            }
        }

    }

}  
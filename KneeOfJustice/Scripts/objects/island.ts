module objects {
    // ISLAND CLASS
    export class Island extends objects.GameObject{

        // CONSTRUCTOR
        constructor() {
            super("island");
            this.sound = "yay";
            this._dy = 5;

            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.y += this._dy;

            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.y = -this.height;
            this.x = Math.floor(Math.random() * 640);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.y >= (480 + this.height)) {
                this.reset();
            }
        }

    }

} 
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // CLOUD CLASS
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        // CONSTRUCTOR
        function Cloud() {
            _super.call(this, "cloud");
            this.sound = "thunder";
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Cloud.prototype.update = function () {
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Cloud.prototype.reset = function () {
            this.y = 100; //-this.height;
            this.x = 640 + this.width; //Math.floor(Math.random() * 640);
            this._dy = 0;
            this._dx = -2;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Cloud.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            /*
            if (this.y >= (480 + this.height)) {
                this.reset();
            }
            */
            if (this.x < 0) {
                this.reset();
            }
        };
        return Cloud;
    })(objects.GameObject);
    objects.Cloud = Cloud;
})(objects || (objects = {}));
//# sourceMappingURL=cloud.js.map
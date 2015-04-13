var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var RingBullet = (function (_super) {
        __extends(RingBullet, _super);
        // CONSTRUCTOR
        function RingBullet() {
            _super.call(this, assetLoader.getResult("ringBullet"));
            this.active = true;

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            createjs.Sound.play("laser", { loop: 1 });

            //Spawn Point
            this.x = 1175;
            this.y = 265;
        }
        // PUBLIC METHODS
        RingBullet.prototype.update = function () {
            if (this.active) {
                this.x -= 5;
            }

            if (this.x < -100) {
                this.active = false;
            }
        };

        // Reset position of island to the top
        RingBullet.prototype.reset = function () {
            this.x = 1175;
            this.y = 265;
        };
        return RingBullet;
    })(createjs.Bitmap);
    objects.RingBullet = RingBullet;
})(objects || (objects = {}));
//# sourceMappingURL=ringbullet.js.map

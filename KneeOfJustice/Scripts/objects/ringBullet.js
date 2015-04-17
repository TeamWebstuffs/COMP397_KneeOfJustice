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
            this.active = false;
            this.ySpeed = 0;
            this.state = "";
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            //Spawn Point
            this.x = 1006;
            this.y = 3000;
            this.hitW = 55;
            this.hitH = 55;
        }
        // PUBLIC METHODS
        RingBullet.prototype.update = function () {
            //Update Hitbox
            this.hitX = this.x - 27;
            this.hitY = this.y - 27;
            if (this.active) {
                this.x -= 10;
                this.y += this.ySpeed;
            }
            if (this.x < -50) {
                this.active = false;
            }
        };
        // Reset position of island to the top
        RingBullet.prototype.spawn = function () {
            createjs.Sound.play("laser", { loop: 0, volume: 0.5 });
            //Respawn
            this.x = 1006;
            this.y = 300;
        };
        return RingBullet;
    })(createjs.Bitmap);
    objects.RingBullet = RingBullet;
})(objects || (objects = {}));
//# sourceMappingURL=ringbullet.js.map
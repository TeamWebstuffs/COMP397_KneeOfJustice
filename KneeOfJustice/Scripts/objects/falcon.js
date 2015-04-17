var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // FALCON CLASS
    var Falcon = (function (_super) {
        __extends(Falcon, _super);
        // CONSTRUCTOR
        function Falcon() {
            _super.call(this, falconAtlas, "FalconStand");
            this.isColliding = false;
            this.active = false;
            this.theme = createjs.Sound.play("ken", { loop: -1 });
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            //Spawn Point
            this.x = 100;
            this.y = 250;
            falconState = "Start";
            this.hitW = 125;
            this.hitH = 70;
        }
        // PUBLIC METHODS
        Falcon.prototype.update = function () {
            //Update Hitbox
            this.hitX = this.x - 62;
            this.hitY = this.y - 35;
            //
            if (this.active && this.y > stage.mouseY) {
                this.y -= 10;
            }
            if (this.active && this.y < stage.mouseY) {
                this.y += 10;
            }
        };
        return Falcon;
    })(createjs.Sprite);
    objects.Falcon = Falcon;
})(objects || (objects = {}));
//# sourceMappingURL=falcon.js.map
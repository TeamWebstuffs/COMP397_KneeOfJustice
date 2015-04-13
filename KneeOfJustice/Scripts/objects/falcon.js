var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var Falcon = (function (_super) {
        __extends(Falcon, _super);
        // CONSTRUCTOR
        function Falcon() {
            _super.call(this, falconAtlas, "falconStand");
            this.isColliding = false;
            this.active = false;
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
        Falcon.prototype.update = function () {
            //
            if (this.active && this.y > stage.mouseY) {
                this.y -= 5;
            }
            if (this.active && this.y < stage.mouseY) {
                this.y += 5;
            }
            //this.x += speedX;
            //speedX += 0.025;
            //test
            //console.log("state is " + edgeState);
        };
        return Falcon;
    })(createjs.Sprite);
    objects.Falcon = Falcon;
})(objects || (objects = {}));
//# sourceMappingURL=falcon.js.map
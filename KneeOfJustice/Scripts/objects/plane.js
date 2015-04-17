var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var Plane = (function (_super) {
        __extends(Plane, _super);
        // CONSTRUCTOR
        function Plane() {
            _super.call(this, falconAtlas, "falconStand");
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            //this.x = 100;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            createjs.Sound.play("ken", { loop: -1 });
            //Spawn Point
            this.x = 100;
            this.y = 200;
        }
        // PUBLIC METHODS
        Plane.prototype.update = function () {
            //this.y = stage.mouseY;
            //this.x = stage.mouseX;
            if (this.y > stage.mouseY) {
                this.y -= 5;
            }
            if (this.y < stage.mouseY) {
                this.y += 5;
            }
            this.x += speedX;
            speedX += 0.025;
            //test
        };
        return Plane;
    })(createjs.Sprite);
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map
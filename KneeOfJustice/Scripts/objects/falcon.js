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
            if (this.y > stage.mouseY) {
                //this.y -= 5;
            }
            if (this.y < stage.mouseY) {
                //this.y += 5;
            }

            //this.x += speedX;
            //speedX += 0.025;
            //test
            if (this.y < 100) {
                edgeState = 0;
            } else if (this.y > 100 && this.y < 200) {
                edgeState = 1;
            } else if (this.y > 200 && this.y < 300) {
                edgeState = 2;
            } else if (this.y > 300) {
                edgeState = 3;
            }

            console.log("state is " + edgeState);
        };
        return Falcon;
    })(createjs.Sprite);
    objects.Falcon = Falcon;
})(objects || (objects = {}));
//# sourceMappingURL=falcon.js.map

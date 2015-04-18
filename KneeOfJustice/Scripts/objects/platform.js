var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var Platform = (function (_super) {
        __extends(Platform, _super);
        // CONSTRUCTOR
        function Platform() {
            _super.call(this, assetLoader.getResult("platform"));
            this.start = false;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            //Spawn Point
            this.x = 95;
            this.y = 310;
        }
        // PUBLIC METHODS
        Platform.prototype.update = function () {
            if (this.start) {
                this.x -= 15;
            }
            if (this.x < -300) {
                this.start = false;
            }
        };
        return Platform;
    })(createjs.Bitmap);
    objects.Platform = Platform;
})(objects || (objects = {}));
//# sourceMappingURL=platform.js.map
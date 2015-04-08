var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var EdgePew = (function (_super) {
        __extends(EdgePew, _super);
        // CONSTRUCTOR
        function EdgePew() {
            _super.call(this, assetLoader.getResult("edgePew"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            //Spawn Point
            this.x = 1190;
            this.y = 116;
        }
        // PUBLIC METHODS
        EdgePew.prototype.update = function () {
            if (edgeState === 1) {
                this.x = 1190;
                this.y = 116;
            }
            else {
                this.x = 1190;
                this.y = 900;
            }
        };
        return EdgePew;
    })(createjs.Bitmap);
    objects.EdgePew = EdgePew;
})(objects || (objects = {}));
//# sourceMappingURL=edgepew.js.map
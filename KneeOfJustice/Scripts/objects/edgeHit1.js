var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var EdgeHit1 = (function (_super) {
        __extends(EdgeHit1, _super);
        // CONSTRUCTOR
        function EdgeHit1() {
            _super.call(this, assetLoader.getResult("edgeHit1"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            //Spawn Point
            this.x = 0;
            this.y = 0;
        }
        // PUBLIC METHODS
        EdgeHit1.prototype.update = function () {
            if (edgeState === 2) {
                this.x = 1190;
                this.y = 116;
            }
            else {
                this.x = 1190;
                this.y = 900;
            }
        };
        return EdgeHit1;
    })(createjs.Bitmap);
    objects.EdgeHit1 = EdgeHit1;
})(objects || (objects = {}));
//# sourceMappingURL=edgehit1.js.map
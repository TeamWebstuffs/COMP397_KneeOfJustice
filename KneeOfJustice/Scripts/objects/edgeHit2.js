var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var EdgeHit2 = (function (_super) {
        __extends(EdgeHit2, _super);
        // CONSTRUCTOR
        function EdgeHit2() {
            _super.call(this, assetLoader.getResult("edgeHit2"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            //Spawn Point
            this.x = 0;
            this.y = 0;
        }
        // PUBLIC METHODS
        EdgeHit2.prototype.update = function () {
            if (edgeState === 3) {
                this.x = 1190;
                this.y = 116;
            }
            else {
                this.x = 1190;
                this.y = 900;
            }
        };
        return EdgeHit2;
    })(createjs.Bitmap);
    objects.EdgeHit2 = EdgeHit2;
})(objects || (objects = {}));
//# sourceMappingURL=edgehit2.js.map
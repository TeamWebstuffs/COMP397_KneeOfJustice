var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var EdgeNeutral = (function (_super) {
        __extends(EdgeNeutral, _super);
        // CONSTRUCTOR
        function EdgeNeutral() {
            _super.call(this, assetLoader.getResult("edgeNeutral"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            //Spawn Point
            this.x = 1190;
            this.y = 116;
        }
        // PUBLIC METHODS
        EdgeNeutral.prototype.update = function () {
            if (edgeState === 0) {
                this.x = 1190;
                this.y = 116;
            }
            else {
                this.x = 1190;
                this.y = 900;
            }
        };
        return EdgeNeutral;
    })(createjs.Bitmap);
    objects.EdgeNeutral = EdgeNeutral;
})(objects || (objects = {}));
//# sourceMappingURL=edgeneutral.js.map
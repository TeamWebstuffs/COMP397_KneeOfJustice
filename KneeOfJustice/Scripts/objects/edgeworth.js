var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var Edgeworth = (function (_super) {
        __extends(Edgeworth, _super);
        // CONSTRUCTOR
        function Edgeworth() {
            _super.call(this, assetLoader.getResult("edgeNeutral"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            createjs.Sound.play("hit", { loop: 1 });
            //Spawn Point
            this.x = 1190;
            this.y = 116;
        }
        // PUBLIC METHODS
        Edgeworth.prototype.update = function () {
        };
        return Edgeworth;
    })(createjs.Bitmap);
    objects.Edgeworth = Edgeworth;
})(objects || (objects = {}));
//# sourceMappingURL=edgeworth.js.map
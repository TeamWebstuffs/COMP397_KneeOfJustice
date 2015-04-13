var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // OCEAN CLASS
    var Startscreen = (function (_super) {
        __extends(Startscreen, _super);
        // CONSTRUCTOR
        function Startscreen() {
            _super.call(this, assetLoader.getResult("start"));
            // PUBLIC INSTANCE VARIABLES
            this._dx = -5;
        }
        return Startscreen;
    })(createjs.Bitmap);
    objects.Startscreen = Startscreen;
})(objects || (objects = {}));
//# sourceMappingURL=startscreen.js.map

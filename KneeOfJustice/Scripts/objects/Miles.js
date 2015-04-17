var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // MILES CLASS
    var Miles = (function (_super) {
        __extends(Miles, _super);
        // CONSTRUCTOR
        function Miles() {
            _super.call(this, milesAtlas, "MilesNeutral");
            this.isColliding = false;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            //Spawn Point
            this.x = this.regX + 842;
            this.y = this.regY + 100;
            milesState = "Start";
        }
        // PUBLIC METHODS
        Miles.prototype.update = function () {
            //
        };
        return Miles;
    })(createjs.Sprite);
    objects.Miles = Miles;
})(objects || (objects = {}));
//# sourceMappingURL=miles.js.map
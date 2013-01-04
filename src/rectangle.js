var exports = rectangle;

var Rectangle = function(value) {
    if (arguments.length === 1 && Object.prototype.toString.call(arguments[0]) === '[object Array]' && arguments[0].length === 4) {
        this.x0 = arguments[0][0];
        this.y0 = arguments[0][1];
        this.x1 = arguments[0][2];
        this.y1 = arguments[0][3];
    }
    if (arguments.length === 2 && typeof arguments[0] === "string") {
        this[arguments[0]] = arguments[1];
    }
    if (arguments.length === 4) {
        this.x0 = arguments[0];
        this.y0 = arguments[1];
        this.x1 = arguments[2];
        this.y1 = arguments[3];
    }
};

Rectangle.prototype.toString = function() {
    return this.coords().join(',');
};

Rectangle.prototype.coords = function(value) {
    if (!arguments.length) return [this.x0, this.y0, this.x1, this.y1];
    if (!arguments.length === 1 && typeof arguments[0] === "string") return this[arguments[0]];
    if (arguments.length === 1 && Object.prototype.toString.call(arguments[0]) === '[object Array]' && arguments[0].length === 4) {
        this.x0 = arguments[0][0];
        this.y0 = arguments[0][1];
        this.x1 = arguments[0][2];
        this.y1 = arguments[0][3];
    }
    if (arguments.length === 2 && typeof arguments[0] === "string") {
        this[arguments[0]] = arguments[1];
    }
    if (arguments.length === 4) {
        this.x0 = arguments[0];
        this.y0 = arguments[1];
        this.x1 = arguments[2];
        this.y1 = arguments[3];
    }
};

Rectangle.prototype.overlap = function(otherRect) {
    return this.intersect(otherRect).area();
};

Rectangle.prototype.area = function() {
    return (this.x1 - this.x0) * (this.y1 - this.y0);
};

Rectangle.prototype.extent = function() {
    return [this.x0, this.y0, this.x1 - this.x0, this.y1 - this.y0]; //(x,y,width,height)
};

//?
Rectangle.prototype.grow = function(amt) {
    var a = amt * .5
    return Rectangle(this.x0 - a, this.y0 - a, this.x1 + a, this.y1 + a);
};

Rectangle.prototype.intersect = function(otherRect) {
    if (this.toString() === NullRect.toString() || otherRect.toString() === NullRect.toString()) {
        return NullRect;
    }

    var nx0 = max(this.x0, otherRect.x0),
        ny0 = max(this.y0, otherRect.y0),
        nx1 = min(this.x1, otherRect.x1),
        ny1 = min(this.y1, otherRect.y1),
        width = nx1 - nx0,
        height = ny1 - ny0;

    if (width <= 0 || height <= 0) return NullRect;

    return new Rectangle(nx0, ny0, nx1, ny1);

};

Rectangle.prototype.doesContainPoint = function(x,y) {
    return (x >= this.x0 && x <= this.x1 && y >= this.y0 && y <= this.y1);    
};

Rectangle.prototype.doesIntersect = function(otherRect) {
    return (this.intersect(otherRect).area() > 0);
};

Rectangle.prototype.doesContain = function(otherRect) {
    return this.doesContainPoint(otherRect.x0, otherRect.y0) && this.doesContainPoint(otherRect.x1, otherRect.y1);
};

Rectangle.prototype.union = function(otherRect) {
    if (this.toString() === NullRect.toString() || otherRect.toString() === NullRect.toString()) {
        return NullRect;
    }
    var nx0 = (this.x0 < otherRect.x0) ? this.x0 : otherRect.x0,
        ny0 = (this.y0 < otherRect.y0) ? this.y0 : otherRect.y0,
        nx1 = (this.x1 > otherRect.x1) ? this.x1 : otherRect.x1,
        ny1 = (this.y1 > otherRect.y1) ? this.y1 : otherRect.y1,
        width = nx1 - nx0,
        height = ny1 - ny0;
    return new Rectangle(nx0, ny0, nx1, ny1);
};

Rectangle.prototype.unionPoint = function(x,y) {
    return this.union(new Rectangle(x,y,x,y));
};

Rectangle.prototype.diagonalSquared = function() {
    if (this.toString() === NullRect.toString()) return 0;
    var width = this.x1 - this.x0,
        height = this.y1 - this.y0;
    return width * width + height * height;
};

Rectangle.prototype.diagonal = function() {
    return Math.sqrt(this.diagonalSquared());
};

rectangle.Rectangle = Rectangle;

var NullRect = new Rectangle(0,0,0,0);

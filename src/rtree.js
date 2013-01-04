var assert = require('assert');
var rectangle = require('./rectangle');
var exports = rtree;

var RTree = function() {
    this.count = 0;
    this.stats = { 
        "overflow_f" : 0,
        "avg_overflow_t_f" : 0.0,
        "longest_overflow" : 0.0,
        "longest_kmeans" : 0.0,
        "sum_kmeans_iter_f" : 0,
        "count_kmeans_iter_f" : 0,
        "avg_kmeans_iter_f" : 0.0
    };

    this.leaf_count = 0

    this.rectPool = [];
    this.nodePool = [];
    this.leafPool = [];

    this.cursor = new _NodeCusor(this, NullRect);

    var _ensurePool = function(index) {
        if (this.rectPool.length < (4*index)) {
            for (var i = 0; i < index; i++) {
                this.rectPool.push(0);
                this.rectPool.push(0);
                this.rectPool.push(0);
                this.rectPool.push(0);

                this.nodePool.push(0);
                this.nodePool.push(0);
            }
        } 
    };

    var _NodeCusor = function(root, index, rectangle, firstChild, nextSibling) {
        this.root = root;
        this.rpool = root.rectPool;
        this.npool = root.nodePool;
        this.index = index;
        this.rectangle = rectangle;
        this.firstChild = firstChild;
        this.nextSibling = nextSibling;

        var _become = function(index) {

        };

        var _balance = function() {

        };

        var _setChildren = function(childrenSet) {

        };

        var _insertChild = function(child) {

        };

    };

    _NodeCusor.create = function(cls, rooto, rect) {

    };

    _NodeCusor.createWithChildren = function(cls, rooto, leafObject, leafRectangle) {

    };

    _NodeCusor.createLeaf = function(cls, rooto, leafObject, leafRectangle) {

    };

    _NodeCusor.prototype.walk = function(predicate) {
        if (predicate(this, this.leafObject())) {
            yield this
            if (!this.isLeaf()) {
                for(var child in this.chilren()) {
                    for(var childWalk in c.walk(predicate)) {
                        yield childWalk; //? naming
                    }
                }
            }
        }
    };

    _NodeCusor.prototype.queryRect = function(rectangle) {
        // body...
    };

    _NodeCusor.prototype.queryPoint = function(x, y) {
        
    };

    _NodeCusor.prototype.lift = function() {
        // body...
    };

    _NodeCusor.prototype.isLeaf = function() {
        // body...
    };

    _NodeCusor.prototype.hasChildren = function() {
        
    };

    _NodeCusor.prototype.holdsLeaves = function() {
        // body...
    };

    _NodeCusor.prototype.getFirstChild = function() {
        // body...
    };

    _NodeCusor.prototype.leafObject = function() {
        // body...
    };

    _NodeCusor.prototype.nChildren = function() {
        // body...
    };

    _NodeCusor.prototype.insert = function(first_argument) {
        // body...
    };

    _NodeCusor.prototype.children = function() {
        // body...
    };


};

RTree.prototype.insert = function(other, otherRect) {
    this.cursor.insert(other, otherRect)
    assert.equals(true, this.cursor.index === 0)
    // body...
};

RTree.prototype.queryRect = function(rectangle) {
    for each(var x in this.cursor.queryRect(rectangle)) {
        yield x;
    } 
};

RTree.prototype.queryPoint = function(x, y) {
    for each(var temp in this.cursor.queryPoint(x, y)) {
        yield temp;
    } 
};

RTree.prototype.walk = function(pred) {
    return this.cursor.walk(pred);
};

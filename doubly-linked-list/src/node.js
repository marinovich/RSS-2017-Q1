"use strict";
class Node {
    constructor(data, prev, next) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

module.exports = Node;

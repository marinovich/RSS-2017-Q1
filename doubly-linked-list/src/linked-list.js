"use strict";
const Node = require('./node');

class LinkedList {
    constructor() 
	{
		this.length = 0;
		this._head = null;
		this._tail = null;
	}
    append(data) 
	{
		var node = new Node;
        node.data = data;
		if (this.length == 0) 
		{
			this._head = node;
			this._tail = node;
		}
		else
		{
			node.prev = this._tail;
			this._tail.next = node;
			this._tail = node;			
		}
		this.length++;
		return this;
	}
	
    head() {return this._head.data;}
	
    tail() {return this._tail.data;}

    at(index) {
		var node = new Node;
    var i=0;
    if (index<this.length){
    	node = this._head;
    	while (i<index) { 
    		node = node.next;
			i++;
    	}
		return node.data;
    }
    else document.writeln("Недостаточно элементов!"); 
	}

    insertAt(index, data) {
  	var node = new Node;
	node.data = data;
  	var fNode1 = new Node;
	var fNode2 = new Node;
    var i=0;
  	if (index<this.length){
    	fNode1 = this._head;
    	while (i<index) { 
			fNode2 = fNode1;
    		fNode1 = fNode1.next;
			i++;
    	}
     	node.prev = fNode1.prev;
		node.next = fNode1;
		fNode1.prev = node;
		fNode2.next = node;
		this.length++; 
    }
	if (index == 0 && this.length == 0)
		this.append(data);
	}

    isEmpty() {return (this.length==0)}

    clear() {
		if (this.length == 0){
			this._head = null;
			this._tail = null;
			}
		else{
			this._head.data = null;
			this._tail.data = null;
			}
		this.length = 0;
		return this;
		
	}

    deleteAt(index) {
		var Node1 = new Node;
		var Node2 = new Node;
		var i=0;
		if (index<this.length){
			if (index>0){
				Node2 = this._head;
				while (i<index) { 
					Node1 = Node2.prev;
					Node2 = Node2.next;
					i++;
				}
				Node1.next = Node2;
				Node2.prev = Node1;
				this.length--; 
			}
		}
		if (index < 1){
			this._head = this._head.next;
			this.length--; 
			}	
	return this;
	}
	

    reverse() {
		var i;
		var node = new Node;
		node = this._tail;
		for (i=0;i<this.length;i++){
			this.append(node.data);
			node = node.prev;
			i++;
		}
		for (i=0;i<this.length;i++)
			this.deleteAt(0);
		return this;
	}

    indexOf(data) {
		var i;
		for(i=0;i<this.length;i++){
			if (this._head.data == data)
				return i;
			this._head = this._head.next;
		}
		return -1;
	}
}

module.exports = LinkedList;

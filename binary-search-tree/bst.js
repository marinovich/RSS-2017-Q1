// WARNING: replace ... with your code
function Node(key, value) {
    this.key = key;
    this.value = value;

    //please don't rename left, right and root properties
    this._left = null;
    this._right = null;
}

function BinarySearchTree() {
    this._root = null;
}
BinarySearchTree.prototype.insert = function (key, value) {
	let node = new Node (key, value);
	if (this._root == null) this._root = node;
	else insert(this._root, node); 
	return this;
}
BinarySearchTree.prototype.root = function () { 
	return this._root.value;
}
BinarySearchTree.prototype.search = function (key) { 
	let arr = [];
	traverseAll(this._root, arr);
	for (let i = 0; i < arr.length-1; i++){
		if (arr[i].key === key) return arr[i].value;
	}
	return;
}
BinarySearchTree.prototype.verify = function () { 
	let arr = [];
	traverseKey(this._root, arr);
	for (let i = 0; i < arr.length-1; i++){
		if (arr[i]>arr[i+1]) return false;
	}
	return true;
}
BinarySearchTree.prototype.traverse = function (order) {
	let node = this._root; 
	let arr = [];
	traverseValue(this._root, arr);
	return (order) ? arr : arr.reverse();
}
BinarySearchTree.prototype.contains = function (value) { 
	let arr = this.traverse();
	return (arr.indexOf(value) == -1) ? false : true;
}
BinarySearchTree.prototype.delete = function (key) { 
	let currentNode = this._root;
	let parentNode = this._root;
	let newNode;
	isHaveLeftChild = false;
	while(currentNode.key != key) {
		parentNode = currentNode;
		if(key < currentNode.key) {
			isHaveLeftChild = true;
			currentNode = currentNode._left;
		}
		else {
			isHaveLeftChild = false;
			currentNode = currentNode._right;
		}
		if (!currentNode) return this;
		if(currentNode.left == null && currentNode._right == null) {
			if(currentNode == this._root) 
				this._root = null;
			else {
				if (isHaveLeftChild)
					parentNode._left = null; 
				else 
					parentNode._right = null;
			}
		}
		else {
			if(currentNode._right == null) {
				if(currentNode == this._root)
					this._root = currentNode._left;
				else {
					if(isHaveLeftChild)
						parentNode._left = currentNode._left;
					else
						parentNode._right = currentNode._left;
				}
			}
			else {
				if(currentNode._left == null) {
					if(currentNode == this._root)
						this._root = currentNode._right;
					else {
						if(isHaveLeftChild)
							parentNode._left = currentNode._right;
						else
							parentNode._right = currentNode._right;
					}
				}
				else 
				{
					newNode = getNewNode(currentNode);
					if(currentNode == this._root)
						this._root = newNode;
					else {
						if(isHaveLeftChild)
							parentNode._left = newNode;
						else
							parentNode._right = newNode;
					}		
				}
			}
		}
	}
	return this;
}
function getNewNode(node) { 
	let nodeParent = node;
	let newNode = node;
	let current = node._right;
	while(current != null) {
		nodeParent = newNode;
		newNode = current;
		current = current._left;
	}
	if(newNode != node._right) { 
		nodeParent._left = newNode._right;
		newNode._right = node._right;	
	}
return newNode;
}
function traverseValue (node, arr) {
	if (!!node) {
		traverseValue(node._left, arr);
		arr.push(node.value);
		traverseValue(node._right, arr);
	}
}
function traverseKey (node, arr) {
	if (!!node) {
		traverseKey(node._left, arr);
		arr.push(node.key);
		traverseKey(node._right, arr);
	}
}
function traverseAll (node, arr) {
	if (!!node) {
		traverseAll(node._left, arr);
		arr.push(node);
		traverseAll(node._right, arr);
	}
}
function insert (node, newNode) {
	if (!node.key) {
		node.key = newNode.key;
		node.value = newNode.value;
		return;
	}
	if (node.key > newNode.key) {
		if (!node._left) node._left = new Node (null,null);
		insert(node._left, newNode);
	}	
	if (node.key <= newNode.key) {
		if (!node._right) node._right = new Node (null,null);
		insert(node._right, newNode);
	}
}
// You can comment this block for testing in the browser but final solution MUST contains this module.exports code
module.exports = {
  BinarySearchTree,
  student: 'marinovich'
};
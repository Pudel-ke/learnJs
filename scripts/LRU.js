/**
 * @param {number} capacity
 */
function Node(key, value) {
  this.value = value;
  this.key = key;
  this.prev = null;
  this.next = null;
}
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
  this.head = new Node();
  this.tail = new Node();
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */

LRUCache.prototype.goTail = function (node) {
  this.tail.prev.next = node;
  node.prev = this.tail.prev;
  node.next = this.tail;
  this.tail.prev = node;
};

LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    let node = this.cache.get(key);
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.goTail(node);
    return node.value;
  } else {
    return -1;
  }
};
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    let resNode = this.cache.get(key);
    resNode.value = value;
    resNode.prev.next = resNode.next;
    resNode.next.prev = resNode.prev;
    this.goTail(resNode);
  } else {
    if (this.cache.size === this.capacity) {
      let removeNode = this.head.next;
      this.head.next = this.head.next.next;
      this.head.next.prev = this.head;
      this.cache.delete(removeNode.key);
    }
    let node = new Node(key, value);
    this.goTail(node);
    this.cache.set(key, node);
  }
};

let lru = new LRUCache(2);
let res = [];
res.push(lru.put(2, 1));
res.push(lru.put(2, 2));
res.push(lru.get(2));
res.push(lru.put(1, 1));
res.push(lru.put(4, 1));
res.push(lru.get(2));
// res.push(lru.get(3));
// res.push(lru.get(4));
console.log(res);

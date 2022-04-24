/**
 * @param {number} capacity
 */
 var LRUCache = function (capacity) {
  this.map = new Map();
  this.capacity = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if(this.map.has(key)) {
    let value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value)
    return value;
  }else {
    return -1;
  }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if(this.map.has(key)) {
    this.map.delete(key);
  }
  this.map.set(key, value);
  if(this.map.size > this.capacity) {
    this.map.delete(this.map.keys().next().value);
  }
};

var obj = new LRUCache(2);
obj.put(4, 4);
obj.put(3, 3);
obj.put(1, 1);
obj.put(2, 2);
obj.get(1)
console.log(obj)
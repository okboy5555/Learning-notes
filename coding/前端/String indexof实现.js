String.prototype.substring = function(start, length) {
  var array = [];
  for (var i = start; i < start + length; i++) {
      array.push(this.charAt(i));
  }
  return array.join();
};
String.prototype.indexOf = function(s) {
  for (var i = 0; i < this.length - s.length; i++) {
      if (this.charAt(i) === s.charAt(0) &&
          this.substring(i, s.length) === s) {
          return i;
      }
  }
  return -1;
};
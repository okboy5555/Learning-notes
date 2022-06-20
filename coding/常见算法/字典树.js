const Trie = function() {
  this.data = {};
}

// 通过isEnd属性标记一下，是不是一个完整的单词，方便后续的查询
Trie.prototype.insert = function(word) {
  let current = this.data;
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    if (!current[char]) {
      current[char] = {};
    }
    current = current[char];
  }
  current.isWord = true;
}

// 查找trie里是否存在一个完整的单词，通过isEnd属性判断
Trie.prototype.search = function(word) {
  let current = this.data;
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    if (!current[char]) {
      return false;
    }
    current = current[char];
  }
  return !!current.isWord;
}

// 查找trie中是否存在word的前缀,匹配则返回匹配的节点，方便后续的查找。
Trie.prototype.startsWith = function(prefix) {
  let current = this.data;
  for (let i = 0; i < prefix.length; i++) {
    let char = prefix[i];
    if (!current[char]) {
      return false;
    }
    current = current[char];
  }
  return true;
}

Trie.prototype.findSuffix = function(word) {
  let current = this.data;
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    if (!current[char]) {
      return false;
    }
    current = current[char];
  }
  return current;
}

let trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // 返回 True
console.log(trie.search("app"));     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
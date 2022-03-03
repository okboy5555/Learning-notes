const s = 'abcabcbb';
  const handleString = (str) => {
    // 双指针
    let one = 0;
    let two = 0;
    // 保存所有可能性的数组
    let arr = [];
    while (two < str.length) {
      if (!(str.slice(one, two)).includes(str[two])) {
        two++;
      } else {
        arr.push(two - one);
        one++;
        two = one + 1;
      }
    }
    arr.push(two - one);
    return Math.max(...arr);
  }
  console.log(handleString(s));
function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = [];
  const executing = [];
  const enqueue = function () {
      // 边界处理，array为空数组
      if (i === array.length) {
          return Promise.resolve();
      }
      // 每调一次enqueue，初始化一个promise
      const item = array[i++];
      const p = Promise.resolve().then(() => iteratorFn(item, array));
      // 放入promises数组
      ret.push(p);
      // promise执行完毕，从executing数组中删除
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      // 插入executing数字，表示正在执行的promise
      executing.push(e);
      // 使用Promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
      let r = Promise.resolve();
      if (executing.length >= poolLimit) {
          r = Promise.race(executing);
      }
      // 递归，直到遍历完array
      return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}


// 从array第1个元素开始，初始化promise对象，同时用一个executing数组保存正在执行的promise
// 不断初始化promise，直到达到poolLimt
// 使用Promise.race，获得executing中promise的执行情况，当有一个promise执行完毕，继续初始化promise并放入executing中
// 所有promise都执行完了，调用Promise.all返回

// const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
// return asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
//     ...
// });